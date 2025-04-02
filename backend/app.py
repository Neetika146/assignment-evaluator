from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import time
import json
from assignment_processor import AssignmentProcessor

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
BASE_PATH = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')
RESULTS_FOLDER = os.path.join(BASE_PATH, 'results')
ALLOWED_EXTENSIONS = {'pdf'}

# Load API key from client_secrets.json
try:
    with open(os.path.join(BASE_PATH, 'client_secrets.json')) as f:
        secrets = json.load(f)
        GEMINI_API_KEY = secrets.get('gemini_api_key', '')
except Exception as e:
    print(f"Error loading client secrets: {e}")
    GEMINI_API_KEY = "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74"

# Configure app
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max-limit

# Make sure directories exist
for folder in [UPLOAD_FOLDER, 
               RESULTS_FOLDER, 
               os.path.join(RESULTS_FOLDER, 'extracted_text'), 
               os.path.join(RESULTS_FOLDER, 'reports'),
               os.path.join(RESULTS_FOLDER, 'visualizations')]:
    os.makedirs(folder, exist_ok=True)

# Initialize processor
processor = AssignmentProcessor(
    base_path=UPLOAD_FOLDER,
    output_dir=RESULTS_FOLDER,
    config={
        "llm_provider": "gemini",
        "api_key": "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74",
        "cache_llm_results": True,
        "cache_dir": os.path.join(BASE_PATH, '.cache')
    }
)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    # If user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Determine assignment type from the request
        assignment_type = request.form.get('type', 'typed')
        
        # Process the assignment
        try:
            # Create document info structure needed by processor
            doc_info = {
                'pdf_path': file_path,
                'type': assignment_type
            }
            
            # Process the assignment
            text_analysis, evaluation, report_path = processor.process_assignment(filename, doc_info)
            
            return jsonify({
                'success': True,
                'filename': filename,
                'grade': evaluation.get('grade', 0),
                'report_path': report_path,
                'summary': evaluation.get('summary', 'No summary available.')[:100] + '...'
            }), 200
            
        except Exception as e:
            print(f"Error processing assignment: {str(e)}")
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/get_report/<filename>', methods=['GET'])
def get_report(filename):
    # Clean filename to avoid path traversal
    filename = secure_filename(filename)
    report_path = os.path.join(RESULTS_FOLDER, 'reports', f"{filename}_report.md")
    
    if not os.path.exists(report_path):
        return jsonify({'error': 'Report not found'}), 404
    
    with open(report_path, 'r') as f:
        report_content = f.read()
    
    return jsonify({
        'filename': filename,
        'report': report_content
    }), 200

@app.route('/get_text', methods=['GET'])
def get_text():
    # Get the most recent text file from extracted_text directory
    extracted_dir = os.path.join(RESULTS_FOLDER, 'extracted_text')
    
    if not os.path.exists(extracted_dir):
        return jsonify({'text': '', 'filename': ''}), 200
    
    files = [f for f in os.listdir(extracted_dir) if f.endswith('.txt')]
    
    if not files:
        return jsonify({'text': '', 'filename': ''}), 200
    
    # Sort by modification time (most recent first)
    latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(extracted_dir, f)))
    
    with open(os.path.join(extracted_dir, latest_file), 'r') as f:
        text_content = f.read()
    
    return jsonify({
        'text': text_content,
        'filename': latest_file
    }), 200

@app.route('/assignments', methods=['GET'])
def list_assignments():
    assignments = []
    
    # List all reports in results/reports directory
    reports_dir = os.path.join(RESULTS_FOLDER, 'reports')
    if os.path.exists(reports_dir):
        for filename in os.listdir(reports_dir):
            if filename.endswith('_report.md'):
                assignment_name = filename.replace('_report.md', '')
                report_path = os.path.join(reports_dir, filename)
                
                # Get basic info from report
                with open(report_path, 'r') as f:
                    content = f.read()
                    # Extract grade using regex
                    import re
                    grade_match = re.search(r'Overall Grade: (\d+)/100', content)
                    grade = int(grade_match.group(1)) if grade_match else 0
                    
                    # Extract status based on grade
                    status = "Completed"
                    if grade < 60:
                        status = "Needs Review"
                    elif grade < 75:
                        status = "Satisfactory"
                    
                    # Extract subject if available
                    subject_match = re.search(r'Type:\s*(\w+)', content)
                    subject = subject_match.group(1) if subject_match else "General"
                
                assignments.append({
                    'id': len(assignments) + 1,
                    'title': assignment_name,
                    'subject': subject,
                    'grade': grade,
                    'status': status,
                    'feedback': content.split('## Summary')[-1].split('##')[0].strip() if '## Summary' in content else "",
                    'dueDate': '15/3/2025',  # Placeholder due date
                    'date_processed': time.ctime(os.path.getmtime(report_path))
                })
    
    return jsonify(assignments), 200

if __name__ == '__main__':
    app.run(debug=True)