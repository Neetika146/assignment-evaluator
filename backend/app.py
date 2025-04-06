# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import os
# from werkzeug.utils import secure_filename
# import time
# import json
# from assignment_processor import AssignmentProcessor

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Configuration
# BASE_PATH = os.path.dirname(os.path.abspath(__file__))
# UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')
# RESULTS_FOLDER = os.path.join(BASE_PATH, 'results')
# ALLOWED_EXTENSIONS = {'pdf'}

# # Load API key from client_secrets.json
# try:
#     with open(os.path.join(BASE_PATH, 'client_secrets.json')) as f:
#         secrets = json.load(f)
#         GEMINI_API_KEY = secrets.get('gemini_api_key', '')
# except Exception as e:
#     print(f"Error loading client secrets: {e}")
#     GEMINI_API_KEY = "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74"

# # Configure app
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max-limit

# # Make sure directories exist
# for folder in [UPLOAD_FOLDER, 
#                RESULTS_FOLDER, 
#                os.path.join(RESULTS_FOLDER, 'extracted_text'), 
#                os.path.join(RESULTS_FOLDER, 'reports'),
#                os.path.join(RESULTS_FOLDER, 'visualizations')]:
#     os.makedirs(folder, exist_ok=True)

# # Initialize processor
# processor = AssignmentProcessor(
#     base_path=UPLOAD_FOLDER,
#     output_dir=RESULTS_FOLDER,
#     config={
#         "llm_provider": "gemini",
#         "api_key": "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74",
#         "cache_llm_results": True,
#         "cache_dir": os.path.join(BASE_PATH, '.cache')
#     }
# )

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     # Check if the post request has the file part
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400
    
#     file = request.files['file']
    
#     # If user does not select file, browser also
#     # submit an empty part without filename
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
    
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(file_path)
        
#         # Determine assignment type from the request
#         assignment_type = request.form.get('type', 'typed')
        
#         # Process the assignment
#         try:
#             # Create document info structure needed by processor
#             doc_info = {
#                 'pdf_path': file_path,
#                 'type': assignment_type
#             }
            
#             # Process the assignment
#             text_analysis, evaluation, report_path = processor.process_assignment(filename, doc_info)
            
#             return jsonify({
#                 'success': True,
#                 'filename': filename,
#                 'grade': evaluation.get('grade', 0),
#                 'report_path': report_path,
#                 'summary': evaluation.get('summary', 'No summary available.')[:100] + '...'
#             }), 200
            
#         except Exception as e:
#             print(f"Error processing assignment: {str(e)}")
#             return jsonify({'error': str(e)}), 500
    
#     return jsonify({'error': 'File type not allowed'}), 400

# @app.route('/get_report/<filename>', methods=['GET'])
# def get_report(filename):
#     # Clean filename to avoid path traversal
#     filename = secure_filename(filename)
#     report_path = os.path.join(RESULTS_FOLDER, 'reports', f"{filename}_report.md")
    
#     if not os.path.exists(report_path):
#         return jsonify({'error': 'Report not found'}), 404
    
#     with open(report_path, 'r') as f:
#         report_content = f.read()
    
#     return jsonify({
#         'filename': filename,
#         'report': report_content
#     }), 200

# @app.route('/get_text', methods=['GET'])
# def get_text():
#     # Get the most recent text file from extracted_text directory
#     extracted_dir = os.path.join(RESULTS_FOLDER, 'extracted_text')
    
#     if not os.path.exists(extracted_dir):
#         return jsonify({'text': '', 'filename': ''}), 200
    
#     files = [f for f in os.listdir(extracted_dir) if f.endswith('.txt')]
    
#     if not files:
#         return jsonify({'text': '', 'filename': ''}), 200
    
#     # Sort by modification time (most recent first)
#     latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(extracted_dir, f)))
    
#     with open(os.path.join(extracted_dir, latest_file), 'r') as f:
#         text_content = f.read()
    
#     return jsonify({
#         'text': text_content,
#         'filename': latest_file
#     }), 200

# @app.route('/assignments', methods=['GET'])
# def list_assignments():
#     assignments = []
    
#     # List all reports in results/reports directory
#     reports_dir = os.path.join(RESULTS_FOLDER, 'reports')
#     if os.path.exists(reports_dir):
#         for filename in os.listdir(reports_dir):
#             if filename.endswith('_report.md'):
#                 assignment_name = filename.replace('_report.md', '')
#                 report_path = os.path.join(reports_dir, filename)
                
#                 # Get basic info from report
#                 with open(report_path, 'r') as f:
#                     content = f.read()
#                     # Extract grade using regex
#                     import re
#                     grade_match = re.search(r'Overall Grade: (\d+)/100', content)
#                     grade = int(grade_match.group(1)) if grade_match else 0
                    
#                     # Extract status based on grade
#                     status = "Completed"
#                     if grade < 60:
#                         status = "Needs Review"
#                     elif grade < 75:
#                         status = "Satisfactory"
                    
#                     # Extract subject if available
#                     subject_match = re.search(r'Type:\s*(\w+)', content)
#                     subject = subject_match.group(1) if subject_match else "General"
                
#                 assignments.append({
#                     'id': len(assignments) + 1,
#                     'title': assignment_name,
#                     'subject': subject,
#                     'grade': grade,
#                     'status': status,
#                     'feedback': content.split('## Summary')[-1].split('##')[0].strip() if '## Summary' in content else "",
#                     'dueDate': '15/3/2025',  # Placeholder due date
#                     'date_processed': time.ctime(os.path.getmtime(report_path))
#                 })
    
#     return jsonify(assignments), 200

# if __name__ == '__main__':
#     app.run(debug=True)

# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import os
# import time
# import json
# import re
# from werkzeug.utils import secure_filename
# from assignment_processor import AssignmentProcessor

# app = Flask(__name__)
# CORS(app)

# # Configuration
# BASE_PATH = os.path.dirname(os.path.abspath(__file__))
# UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')
# RESULTS_FOLDER = os.path.join(BASE_PATH, 'results')
# ALLOWED_EXTENSIONS = {'pdf'}

# # Load API Key
# CLIENT_SECRET_PATH = os.path.join(BASE_PATH, 'client_secrets.json')
# try:
#     with open(CLIENT_SECRET_PATH) as f:
#         secrets = json.load(f)
#         GEMINI_API_KEY = secrets.get('gemini_api_key', '')
# except Exception as e:
#     print(f"Error loading client secrets: {e}")
#     GEMINI_API_KEY = ""

# # Ensure directories exist
# for folder in [
#     UPLOAD_FOLDER, 
#     RESULTS_FOLDER, 
#     os.path.join(RESULTS_FOLDER, 'extracted_text'), 
#     os.path.join(RESULTS_FOLDER, 'reports'),
#     os.path.join(RESULTS_FOLDER, 'visualizations')
# ]:
#     os.makedirs(folder, exist_ok=True)

# # Initialize processor
# processor = AssignmentProcessor(
#     base_path=UPLOAD_FOLDER,
#     output_dir=RESULTS_FOLDER,
#     config={
#         "llm_provider": "gemini",
#         "api_key": "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74",
#         "cache_llm_results": True,
#         "cache_dir": os.path.join(BASE_PATH, '.cache')
#     }
# )

# def allowed_file(filename):
#     """ Check if file is allowed based on extension """
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     """ Handle file uploads """
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']
    
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(UPLOAD_FOLDER, filename)
#         file.save(file_path)
        
#         assignment_type = request.form.get('type', 'typed')

#         try:
#             doc_info = {
#                 'pdf_path': file_path,
#                 'type': assignment_type
#             }
#             text_analysis, evaluation, report_path = processor.process_assignment(filename, doc_info)
            
#             return jsonify({
#                 'success': True,
#                 'filename': filename,
#                 'grade': evaluation.get('grade', 0),
#                 'report_path': report_path,
#                 'summary': evaluation.get('summary', 'No summary available.')[:100] + '...'
#             }), 200
#         except Exception as e:
#             print(f"Error processing assignment: {str(e)}")
#             return jsonify({'error': str(e)}), 500

#     return jsonify({'error': 'File type not allowed'}), 400

# @app.route('/get_report/<filename>', methods=['GET'])
# def get_report(filename):
#     """ Retrieve report for a given file """
#     filename = secure_filename(filename)
#     report_path = os.path.join(RESULTS_FOLDER, 'reports', f"{filename}_report.md")

#     if not os.path.exists(report_path):
#         return jsonify({'error': 'Report not found'}), 404

#     with open(report_path, 'r', encoding='utf-8') as f:
#         report_content = f.read()

#     return jsonify({'filename': filename, 'report': report_content}), 200

# @app.route('/get_text', methods=['GET'])
# def get_text():
#     """ Fetch the latest extracted text file """
#     extracted_dir = os.path.join(RESULTS_FOLDER, 'extracted_text')

#     if not os.path.exists(extracted_dir):
#         return jsonify({'text': '', 'filename': ''}), 200

#     files = [f for f in os.listdir(extracted_dir) if f.endswith('.txt')]

#     if not files:
#         return jsonify({'text': '', 'filename': ''}), 200

#     latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(extracted_dir, f)))

#     with open(os.path.join(extracted_dir, latest_file), 'r', encoding='utf-8') as f:
#         text_content = f.read()

#     return jsonify({'text': text_content, 'filename': latest_file}), 200

# @app.route('/assignments', methods=['GET'])
# def list_assignments():
#     """ List processed assignments """
#     assignments = []
#     reports_dir = os.path.join(RESULTS_FOLDER, 'reports')

#     if os.path.exists(reports_dir):
#         for filename in os.listdir(reports_dir):
#             if filename.endswith('_report.md'):
#                 assignment_name = filename.replace('_report.md', '')
#                 report_path = os.path.join(reports_dir, filename)

#                 with open(report_path, 'r', encoding='utf-8') as f:
#                     content = f.read()
                    
#                     grade_match = re.search(r'Overall Grade: (\d+)/100', content)
#                     grade = int(grade_match.group(1)) if grade_match else 0
                    
#                     status = "Completed"
#                     if grade < 60:
#                         status = "Needs Review"
#                     elif grade < 75:
#                         status = "Satisfactory"
                    
#                     subject_match = re.search(r'Type:\s*(\w+)', content)
#                     subject = subject_match.group(1) if subject_match else "General"
                
#                 assignments.append({
#                     'id': len(assignments) + 1,
#                     'title': assignment_name,
#                     'subject': subject,
#                     'grade': grade,
#                     'status': status,
#                     'feedback': content.split('## Summary')[-1].split('##')[0].strip() if '## Summary' in content else "",
#                     'dueDate': '15/3/2025',
#                     'date_processed': time.ctime(os.path.getmtime(report_path))
#                 })

#     return jsonify(assignments), 200

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import time
import json
import re
import traceback
import pandas as pd
from werkzeug.utils import secure_filename
from assignment_processor import AssignmentProcessor
from tqdm import tqdm
import logging 

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)


# Configuration
BASE_PATH = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR= BASE_PATH
UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')
RESULTS_FOLDER = os.path.join(BASE_PATH, 'results')
ALLOWED_EXTENSIONS = {'pdf'}

# Load API Key
CLIENT_SECRET_PATH = os.path.join(BASE_PATH, 'client_secrets.json')
GEMINI_API_KEY = "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74"
try:
    if os.path.exists(CLIENT_SECRET_PATH):
        with open(CLIENT_SECRET_PATH) as f:
            secrets = json.load(f)
            GEMINI_API_KEY = secrets.get('gemini_api_key', '')
    else:
        print("Client secrets file not found. Using default API key.")
        # GEMINI_API_KEY = "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74"
except Exception as e:
    print(f"Error loading client secrets: {e}")
    # GEMINI_API_KEY = "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74"

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(BASE_PATH, 'assignment-evaluator-454818-44816401150c.json')

# Ensure directories exist
for folder in [
    UPLOAD_FOLDER, 
    RESULTS_FOLDER, 
    os.path.join(RESULTS_FOLDER, 'extracted_text'), 
    os.path.join(RESULTS_FOLDER, 'reports'),
    os.path.join(RESULTS_FOLDER, 'visualizations')
]:
    os.makedirs(folder, exist_ok=True)

# Initialize processor
processor = AssignmentProcessor(
    base_path=UPLOAD_FOLDER,
    output_dir=RESULTS_FOLDER,
    config={
        "llm_provider": "gemini",
        "model_name": "gemini-2.0-flash",
        "api_key": "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74",
        "max_tokens": 3000,
        "cache_llm_results": True,
        "cache_dir": os.path.join(BASE_PATH, '.cache')
    }
)

def allowed_file(filename):
    """ Check if file is allowed based on extension """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    """ Handle file uploads """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    student_name = request.form.get('student_name')
    roll_no = request.form.get('roll_no')
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        assignment_type = request.form.get('type', 'typed')
        if not student_name or not roll_no:
            return jsonify({'error': 'Student name and roll number are required'}), 400
        try:
            doc_info = {
                'pdf_path': file_path,
                'type': assignment_type,
                'student_name': student_name,
                'roll_no': roll_no
            }
            
            # Debug print
            print(f"Processing assignment: {filename}, type: {assignment_type}, path: {file_path}")
            
            text_analysis, evaluation, report_path = processor.process_assignment(filename, doc_info)
            
            # Verify the report was created
            if os.path.exists(report_path):
                print(f"Report generated successfully at: {report_path}")
            else:
                print(f"Warning: Report file not created at {report_path}")
            
            return jsonify({
                "student_name": student_name,
                "roll_no": roll_no,
                'success': True,
                'filename': filename,
                'grade': evaluation.get('grade', 0),
                'report_path': report_path,
                'summary': evaluation.get('summary', 'No summary available.')[:100] + '...',
                'word_count': text_analysis.get('word_count', 0),
                'readability': text_analysis.get('readability_score', 0)
            }), 200
            
        except Exception as e:
            print(f"Error processing assignment: {str(e)}")
            print(traceback.format_exc())
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/get_report/<filename>', methods=['GET'])
def get_report(filename):
    """ Retrieve JSON report for a given file """
    filename = secure_filename(filename)
    # Updated path to point to your specific JSON file
    report_path = os.path.join(RESULTS_FOLDER, 'reports', f"{filename}_parsed_evaluation.json")
    
    if not os.path.exists(report_path):
        print(f"Report not found at: {report_path}")
        return jsonify({'error': 'Report not found'}), 404
    
    try:
        with open(report_path, 'r', encoding='utf-8') as f:
            # Parse JSON content instead of reading as plain text
            report_content = json.load(f)
        
        # Return the JSON data directly
        return jsonify({
            'filename': filename, 
            'report': report_content
        }), 200
    
    except json.JSONDecodeError as je:
        print(f"Invalid JSON in report file: {str(je)}")
        return jsonify({'error': f'Invalid JSON format: {str(je)}'}), 500
    except Exception as e:
        print(f"Error reading report: {str(e)}")
        return jsonify({'error': f'Error reading report: {str(e)}'}), 500

# @app.route('/get_report/<filename>', methods=['GET'])
# def get_report(filename):
#     filename = secure_filename(filename)
#     report_path = os.path.join(RESULTS_FOLDER, 'reports', f"{filename}_parsed_evaluation.json")
    
#     if not os.path.exists(report_path):
#         print(f"Report not found at: {report_path}")
#         return jsonify({'error': 'Report not found'}), 404
    
#     try:
#         with open(report_path, 'r', encoding='utf-8') as f:
#             report_content = json.load(f)
        
#         return jsonify({
#             'filename': filename,
#             'report': report_content,
#             'student_name': report_content.get("student_name", "Unknown"),
#             'roll_no': report_content.get("roll_no", "Unknown")
#         }), 200
    
#     except json.JSONDecodeError as je:
#         print(f"Invalid JSON in report file: {str(je)}")
#         return jsonify({'error': f'Invalid JSON format: {str(je)}'}), 500
#     except Exception as e:
#         print(f"Error reading report: {str(e)}")
#         return jsonify({'error': f'Error reading report: {str(e)}'}), 500

        
@app.route('/get_text', methods=['GET'])
def get_text():
    """ Fetch the latest extracted text file """
    extracted_dir = os.path.join(RESULTS_FOLDER, 'extracted_text')

    if not os.path.exists(extracted_dir):
        return jsonify({'text': '', 'filename': ''}), 200

    files = [f for f in os.listdir(extracted_dir) if f.endswith('.txt')]

    if not files:
        return jsonify({'text': '', 'filename': ''}), 200

    latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(extracted_dir, f)))

    with open(os.path.join(extracted_dir, latest_file), 'r', encoding='utf-8') as f:
        text_content = f.read()

    return jsonify({'text': text_content, 'filename': latest_file}), 200

@app.route('/assignments', methods=['GET'])
def list_assignments():
    """ List processed assignments """
    assignments = []
    reports_dir = os.path.join(RESULTS_FOLDER, 'reports')

    if os.path.exists(reports_dir):
        for filename in os.listdir(reports_dir):
            if filename.endswith('.pdf_raw_evaluation.txt'):
                assignment_name = filename.replace('.pdf_raw_evaluation.txt', '')
                raw_path = os.path.join(reports_dir, filename)
                parsed_path = os.path.join(reports_dir, f"{assignment_name}_parsed_evaluation.json")

                grade = 0
                summary = ""
                subject = "General"

                try:
                    # Read from parsed evaluation JSON if available
                    if os.path.exists(parsed_path):
                        with open(parsed_path, 'r', encoding='utf-8') as pf:
                            parsed_data = json.load(pf)
                            grade = parsed_data.get("grade", 0)
                            print(f"Parsed grade for {assignment_name}: {grade}")
                            summary = parsed_data.get("summary", "")
                            subject = parsed_data.get("subject", "General")
                    else:
                        print(f"Warning: Parsed report not found for {assignment_name}")

                    # Fallback to raw content for date
                    date_processed = time.ctime(os.path.getmtime(raw_path))

                    original_filename = assignment_name + ".pdf"

                    # Inside list_assignments()
                    assignments.append({
                        'id': len(assignments) + 1,
                        'title': assignment_name,
                        'filename': original_filename,
                        'subject': subject,
                        'grade': grade,
                        'status': (
                            "Needs Review" if grade < 60 else
                            "Satisfactory" if grade < 75 else
                            "Completed"
                        ),
                        'feedback': summary,
                        'dueDate': '15/4/2025',
                        'date_processed': date_processed,
                        'student_name': parsed_data.get("student_name", "Unknown"),  # ✅
                        'student_roll': parsed_data.get("roll_no", "Unknown"),       # ✅
                        'evaluation': parsed_data                                     # ✅ optional if used in frontend
                    })


                except Exception as e:
                    print(f"Error reading report for {filename}: {e}")

    return jsonify(assignments), 200
# @app.route('/assignments', methods=['GET'])
# def list_assignments():
#     """ List processed assignments """
#     assignments = []
#     reports_dir = os.path.join(RESULTS_FOLDER, 'reports')

#     if os.path.exists(reports_dir):
#         for filename in os.listdir(reports_dir):
#             if filename.endswith('.pdf_raw_evaluation.txt'):
#                 assignment_name = filename.replace('.pdf_raw_evaluation.txt', '')
#                 raw_path = os.path.join(reports_dir, filename)
#                 parsed_path = os.path.join(reports_dir, f"{assignment_name}_parsed_evaluation.json")

#                 grade = 0
#                 summary = ""
#                 subject = "General"
#                 student_name = "Unknown"
#                 student_roll = "Unknown"

#                 try:
#                     # Read from parsed evaluation JSON if available
#                     if os.path.exists(parsed_path):
#                         with open(parsed_path, 'r', encoding='utf-8') as pf:
#                             parsed_data = json.load(pf)
#                             grade = parsed_data.get("grade", 0)
#                             summary = parsed_data.get("summary", "")
#                             subject = parsed_data.get("subject", "General")
#                             student_name = parsed_data.get("student_name", "Unknown")
#                             student_roll = parsed_data.get("student_roll", "Unknown")
#                     else:
#                         print(f"Warning: Parsed report not found for {assignment_name}")

#                     # Fallback to raw content for date
#                     date_processed = time.ctime(os.path.getmtime(raw_path))

#                     original_filename = assignment_name + ".pdf"

#                     assignments.append({
#                         'id': len(assignments) + 1,
#                         'title': assignment_name,
#                         'filename': original_filename,
#                         'subject': subject,
#                         'grade': grade,
#                         'status': (
#                             "Needs Review" if grade < 60 else
#                             "Satisfactory" if grade < 75 else
#                             "Completed"
#                         ),
#                         'feedback': summary,
#                         'dueDate': '15/4/2025',
#                         'date_processed': date_processed,
#                         'student_name': student_name,
#                         'student_roll': student_roll,
#                         'evaluation': parsed_data  # include full parsed JSON too
#                     })

#                 except Exception as e:
#                     print(f"Error reading report for {filename}: {e}")

#     return jsonify(assignments), 200



@app.route('/download_report/<filename>', methods=['GET'])
def download_report(filename):
    filename = secure_filename(filename)
    report_filename = f"{filename}_parsed_evaluation.json"
    report_dir = os.path.join(RESULTS_FOLDER, 'reports')
    report_path = os.path.join(report_dir, report_filename)

    if not os.path.exists(report_path):
        return jsonify({'error': 'File not found'}), 404

    return send_from_directory(
        report_dir,
        report_filename,
        as_attachment=True,
        download_name=f"{filename}_evaluation.json"
    )

    
@app.route('/process_all', methods=['GET'])
def process_all_assignments():
    """Process all assignments in the dataset"""
    try:
        # Load the dataset
        dataset = processor.load_dataset()
        results = []
        
        for doc_name, doc_info in tqdm(dataset.items(), desc="Processing assignments"):
            try:
                # Process the assignment
                text_analysis, parsed_evaluation, report_path = processor.process_assignment(doc_name, doc_info)
                
                # Store results
                results.append({
                    'doc_name': doc_name,
                    'type': doc_info['type'],
                    'grade': parsed_evaluation['grade'],
                    'word_count': text_analysis['word_count'],
                    'readability': text_analysis['readability_score'],
                    'student_name':doc_info['student_name'],
                    'roll_no':doc_info['roll_no']
                })
                
                logger.info(f"Processed {doc_name}: Grade {parsed_evaluation['grade']}/100")
                
            except Exception as e:
                logger.error(f"Error processing {doc_name}: {str(e)}")
                processor.stats["errors"] += 1
        
        # Create summary CSV
        if results:
            summary_df = pd.DataFrame(results)
            summary_path = os.path.join(OUTPUT_DIR, "evaluation_summary.csv")
            summary_df.to_csv(summary_path, index=False)
            
        return jsonify({
            'success': True,
            'total_processed': len(dataset),
            'typed_assignments': processor.stats.get('typed', 0),
            'handwritten_assignments': processor.stats.get('handwritten', 0),
            'errors': processor.stats.get('errors', 0),
            'processing_time': f"{(time.time() - processor.stats.get('start_time', time.time())):.2f} seconds",
            'summary_path': os.path.join(OUTPUT_DIR, "evaluation_summary.csv") if results else None
        }), 200
        
    except Exception as e:
        logger.error(f"Error in batch processing: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/')
def index():
    return "Teacher Assistant API is running!"

def main():
    """Main function to process all assignments in batch mode"""
    # Make sure directories exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Load the dataset
    dataset = processor.load_dataset()
    
    # Process each assignment
    results = []
    for doc_name, doc_info in tqdm(dataset.items(), desc="Processing assignments"):
        try:
            # Process the assignment
            text_analysis, parsed_evaluation, report_path = processor.process_assignment(doc_name, doc_info)
            
            # Print results
            logger.info(f"Grade: {parsed_evaluation['grade']}/100")
            logger.info(f"Summary: {parsed_evaluation['summary'][:100]}...")
            logger.info(f"Text Stats: {text_analysis['word_count']} words, {text_analysis['readability_score']:.1f} readability score")
            logger.info(f"Report saved to: {report_path}")
            
            # Store results for summary
            results.append({
                'doc_name': doc_name,
                'type': doc_info['type'],
                'grade': parsed_evaluation['grade'],
                'word_count': text_analysis['word_count'],
                'readability': text_analysis['readability_score'],
                'student_name':doc_info['student_name'],
                'roll_no':doc_info['roll_no']
            })
        except Exception as e:
            logger.error(f"Error processing {doc_name}: {str(e)}")
            processor.stats["errors"] += 1
    
    # Print summary statistics
    logger.info("\n--- Processing Summary ---")
    logger.info(f"Total processed: {len(dataset)} files")
    logger.info(f"Typed assignments: {processor.stats['typed']}")
    logger.info(f"Handwritten assignments: {processor.stats['handwritten']}")
    logger.info(f"Errors encountered: {processor.stats['errors']}")
    logger.info(f"Processing time: {(time.time() - processor.stats['start_time']):.2f} seconds")
    
    # Create a summary dataframe and save to CSV
    if results:
        summary_df = pd.DataFrame(results)
        summary_path = os.path.join(OUTPUT_DIR, "evaluation_summary.csv")
        summary_df.to_csv(summary_path, index=False)
        logger.info(f"Evaluation summary saved to: {summary_path}")

if __name__ == '__main__':
    # To run in batch processing mode
    if os.environ.get('BATCH_MODE', '').lower() == 'true':
        main()
    # To run as web server
    else:
        app.run(debug=True)

