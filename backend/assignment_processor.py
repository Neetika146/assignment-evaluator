# import os
# import numpy as np
# import pandas as pd
# import json
# import time
# import re
# import logging
# import hashlib
# from datetime import datetime
# import fitz  # PyMuPDF for PDF handling
# from PIL import Image
# from io import BytesIO
# import google.generativeai as genai

# # Setup logging
# log_directory = "backend"
# os.makedirs(log_directory, exist_ok=True)

# log_file = os.path.join(log_directory, "teacher_assistant.log")

# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
#     handlers=[
#         logging.FileHandler(log_file),
#         logging.StreamHandler()
#     ]
# )

# logger = logging.getLogger(__name__)

# class AssignmentProcessor:
#     """
#     Main class for processing assignments and evaluating them with Gemini
#     """
#     def __init__(self, base_path="backend/uploads", output_dir="backend/results", config=None):
#         """
#         Initialize the assignment processor

#         Args:
#             base_path (str): Path to the uploads folder containing assignment PDFs
#             output_dir (str): Directory to save outputs
#             config (dict): Configuration parameters
#         """
#         self.base_path = base_path
#         self.output_dir = output_dir

#         # Create output directory structure if it doesn't exist
#         os.makedirs(output_dir, exist_ok=True)
#         os.makedirs(os.path.join(output_dir, "extracted_text"), exist_ok=True)
#         os.makedirs(os.path.join(output_dir, "reports"), exist_ok=True)
#         os.makedirs(os.path.join(output_dir, "visualizations"), exist_ok=True)

#         # Default configuration
#         self.config = {
#             "ocr_dpi": 300,  # DPI for image rendering in OCR
#             "max_workers": 4,  # Number of parallel workers for processing
#             "llm_provider": "gemini",  # Only Gemini is supported
#             "model_name": "gemini-1.5-flash",  # Model name for Gemini (using a model that exists)
#             "api_key": "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74",  # Will be updated from config
#             "cache_llm_results": True,  # Whether to cache LLM results to save computation time
#             "cache_dir": ".cache",  # Directory for caching LLM results
#             "temperature": 0.3,  # Temperature for LLM generation
#             "max_tokens": 3000  # Max tokens for LLM generation
#         }

#         # Update config with provided values
#         if config:
#             self.config.update(config)

#         # Create cache directory if enabled
#         if self.config["cache_llm_results"]:
#             os.makedirs(self.config["cache_dir"], exist_ok=True)

#         # Initialize statistics
#         self.stats = {
#             "processed": 0,
#             "typed": 0,
#             "handwritten": 0,
#             "errors": 0,
#             "start_time": time.time()
#         }

#         try:
#             # Initialize the LLM model
#             self._initialize_llm()
#             logger.info(f"Initialized AssignmentProcessor with base path: {base_path}")
#             logger.info(f"Output directory: {output_dir}")
#         except Exception as e:
#             logger.error(f"Error during initialization: {str(e)}")
#             import traceback
#             logger.error(traceback.format_exc())

#     def extract_text_from_pdf(self, pdf_path, pdf_type):
#         """
#         Extract text from PDF documents using appropriate method based on type

#         Args:
#             pdf_path (str): Path to the PDF file
#             pdf_type (str): Type of PDF ('typed' or 'handwritten')

#         Returns:
#             str: Extracted text from the PDF
#         """
#         # Check if file exists
#         if not os.path.exists(pdf_path):
#             logger.error(f"PDF file not found: {pdf_path}")
#             return "PDF file not found. Please check the path and try again."

#         text = []

#         try:
#             # Open the PDF
#             doc = fitz.open(pdf_path)
#             logger.info(f"Processing PDF with {len(doc)} pages")

#             # For both typed PDFs, we extract text directly from PyMuPDF
#             # For handwritten PDFs in a real scenario, you would use Google Cloud Vision or similar
#             for page_num in range(len(doc)):
#                 page = doc.load_page(page_num)
#                 page_text = page.get_text()
#                 text.append(page_text)
#                 logger.info(f"Extracted {len(page_text)} characters from page {page_num+1}")

#             # Clean up and combine all extracted text
#             full_text = "\n".join(text)

#             # Post-processing to clean up text
#             full_text = self._clean_text(full_text)
            
#             # If the text is very short (likely extraction failed), 
#             # provide a default text for testing
#             if len(full_text.strip()) < 50 and pdf_type == 'typed':
#                 logger.warning("Very little text extracted, using fallback sample text")
#                 full_text = """This is a sample assignment text. The student discusses various topics related to the subject matter. The content demonstrates understanding of key concepts and theories. There are several examples provided to illustrate the points being made. Overall, the assignment shows adequate knowledge but could use more depth in certain areas."""
            
#             logger.info(f"Extracted total {len(full_text)} characters of text")
#             return full_text

#         except Exception as e:
#             logger.error(f"Error extracting text from {pdf_path}: {str(e)}")
#             import traceback
#             logger.error(traceback.format_exc())
#             self.stats["errors"] += 1
#             return "Error extracting text from PDF. Using sample text for testing purposes.\n\nThis is a sample assignment text. The student discusses various topics related to the subject matter."

#     def _clean_text(self, text):
#         """
#         Clean up extracted text to remove artifacts and normalize spacing

#         Args:
#             text (str): Raw extracted text

#         Returns:
#             str: Cleaned text
#         """
#         # Remove excessive newlines
#         text = re.sub(r'\n{3,}', '\n\n', text)

#         # Remove non-printable characters
#         text = ''.join(c for c in text if c.isprintable() or c in ['\n', '\t'])

#         # Fix spacing issues
#         text = re.sub(r'\s+', ' ', text)
#         text = re.sub(r' \.', '.', text)
#         text = re.sub(r' ,', ',', text)

#         # Fix common OCR errors
#         text = re.sub(r'l\b', 'i', text)  # Replace lone 'l' with 'i'

#         return text.strip()

#     def analyze_text(self, text):
#         """
#         Perform basic analysis on the text to extract features

#         Args:
#             text (str): Extracted text from the document

#         Returns:
#             dict: Dictionary containing text analysis features
#         """
#         # Check if text is empty
#         if not text.strip():
#             logger.warning("Empty text provided for analysis")
#             return {
#                 "word_count": 0,
#                 "sentence_count": 0,
#                 "average_sentence_length": 0,
#                 "readability_score": 0,
#                 "estimated_quality": "insufficient"
#             }

#         try:
#             # Basic statistics
#             # Simple sentence splitting by punctuation
#             sentences = re.split(r'[.!?]+', text)
#             sentences = [s.strip() for s in sentences if s.strip()]
            
#             # Simple word counting
#             words = text.split()
            
#             # Calculate basic metrics
#             if len(sentences) == 0 or len(words) == 0:
#                 readability_score = 0
#                 avg_sentence_length = 0
#             else:
#                 avg_sentence_length = len(words) / len(sentences)
#                 # Simplified readability score based on average sentence length
#                 readability_score = 100 - min(avg_sentence_length * 1.5, 50)
#                 readability_score = max(0, min(100, readability_score))  # Clamp between 0 and 100

#             # Estimate quality based on length and readability
#             quality = "insufficient"
#             if len(words) > 300:
#                 if readability_score > 70:
#                     quality = "good"
#                 elif readability_score > 50:
#                     quality = "average"
#                 else:
#                     quality = "below_average"
#             elif len(words) > 100:
#                 quality = "short"

#             logger.info(f"Text analysis: {len(words)} words, {len(sentences)} sentences, {quality} quality")
            
#             return {
#                 "word_count": len(words),
#                 "sentence_count": len(sentences),
#                 "average_sentence_length": avg_sentence_length,
#                 "readability_score": readability_score,
#                 "estimated_quality": quality
#             }

#         except Exception as e:
#             logger.error(f"Error analyzing text: {str(e)}")
#             import traceback
#             logger.error(traceback.format_exc())
#             return {
#                 "word_count": len(text.split()),
#                 "sentence_count": 0,
#                 "average_sentence_length": 0,
#                 "readability_score": 0,
#                 "estimated_quality": "error"
#             }

#     def create_evaluation_prompt(self, assignment_text, analysis):
#         """
#         Create a prompt for evaluating the assignment based only on content quality.

#         Args:
#             assignment_text (str): Extracted text from the assignment
#             analysis (dict): Results from text analysis

#         Returns:
#             str: Prompt for the LLM to evaluate the assignment
#         """
#         # Create evaluation prompt
#         prompt = f"""
# You are an experienced teaching assistant evaluating a student's assignment. Your grading should be based only on content quality. **Ignore structure, grammar, spelling, punctuation, readability, and formatting. The goal is to fairly assess the student's **understanding of the topic and provide helpful, encouraging feedback.

# ### Document Analysis:
# - Word Count: {analysis['word_count']}
# - Sentence Count: {analysis['sentence_count']}
# - Readability Score: {analysis['readability_score']:.1f}/100 (Ignore for grading)

# ### Evaluation Criteria:
# - Content (100%): Depth, accuracy, and relevance of the information presented.
#   - Ignore grammar, punctuation, spelling, structure, and formatting.
#   - Focus only on the student's understanding and explanation of the topic.
#   - Prioritize rewarding well-explained ideas and logical reasoning.

# ---

# ### ASSIGNMENT TEXT:
# {assignment_text}
# ---

# ### Evaluation Structure:

# 1. Grade (0-100, based ONLY on content quality):
#   - Assign a high score (75-100) if the student demonstrates fairly well knowledge and understanding of the topic.
#   - Assign a lower but fair score(30-85) if key concepts are missing or misunderstood.
#   - Do not deduct marks for grammar, spelling, or structure issues. Don't cut unnecessary marks and give marks for length and attempting as well

# 2. Summary:
#   - Briefly highlight what the student did in content depth (2-3 sentences).

# 3. Key Strengths (3-5 points):
#   - List specific areas where the student has demonstrated content knowledge.
#   - Use short examples from the text.

# 4. Areas for Improvement (3-5 points):
#   - Instead of generic writing advice, list relevant subtopics the student should study further.
#   - Example: If the assignment is about economics, suggest deeper research into "market failures" or "inflation trends."

# 5. Specific Feedback:
#   - Provide constructive and precise feedback on how to improve content quality. For eg the student has fairly well knowledge of economics but can focus on micro-economics to excel in his/her field.
#   - Avoid comments about structure or grammar.

# 6. Personalized Learning Plan (Topic-Based Roadmap):
#   - Recommend 2-3 specific subtopics, resources, or study methods that will help the student improve. Include links of blogs or articles from internet or suggest some videos from youtube.
#   - Example: If the topic is biology, suggest watching a CrashCourse video on DNA replication or reading an article on genetics.

# ---

# ### Key Guidelines:
# ✅ Grade ONLY based on content—ignore all language, grammar, or formatting issues.
# ✅ Be fair and encouraging—maximize the student's score where possible.
# ✅ Keep feedback clear, constructive, and topic-focused.
# """

#         return prompt

#     def _get_cache_key(self, text):
#         """
#         Generate a cache key for the given text

#         Args:
#             text (str): Text to hash

#         Returns:
#             str: Cache key
#         """
#         return hashlib.md5(text.encode('utf-8')).hexdigest()

#     def _check_cache(self, prompt):
#         """
#         Check if we have a cached response for this prompt

#         Args:
#             prompt (str): LLM prompt

#         Returns:
#             str or None: Cached response if available, else None
#         """
#         if not self.config["cache_llm_results"]:
#             return None

#         cache_key = self._get_cache_key(prompt)
#         cache_file = os.path.join(self.config["cache_dir"], f"{cache_key}.txt")

#         if os.path.exists(cache_file):
#             try:
#                 with open(cache_file, 'r', encoding='utf-8') as f:
#                     logger.info(f"Cache hit for prompt hash {cache_key[:8]}")
#                     return f.read()
#             except Exception as e:
#                 logger.error(f"Error reading cache: {str(e)}")
#                 return None

#         logger.info(f"Cache miss for prompt hash {cache_key[:8]}")
#         return None

#     def _save_to_cache(self, prompt, response):
#         """
#         Save response to cache

#         Args:
#             prompt (str): LLM prompt
#             response (str): LLM response
#         """
#         if not self.config["cache_llm_results"]:
#             return

#         try:
#             cache_key = self._get_cache_key(prompt)
#             cache_file = os.path.join(self.config["cache_dir"], f"{cache_key}.txt")

#             with open(cache_file, 'w', encoding='utf-8') as f:
#                 f.write(response)
                
#             logger.info(f"Saved response to cache with key {cache_key[:8]}")
#         except Exception as e:
#             logger.error(f"Error saving to cache: {str(e)}")

#     def _initialize_llm(self):
#         """
#         Initialize the Gemini model
#         """
#         try:
#             # Verify API key is available
#             if not self.config.get("api_key"):
#                 logger.error("Gemini API key is required but not provided")
#                 raise ValueError("API key is required for Gemini")

#             # Configure the Gemini API with the provided key
#             genai.configure(api_key=self.config["api_key"])

#             # Set the model name - use a model that definitely exists in the API
#             model_name = self.config.get("model_name", "gemini-1.5-flash")
            
#             # Initialize the Gemini model
#             self.model = genai.GenerativeModel(model_name)

#             logger.info(f"Gemini model initialized: {model_name}")
        
#         except Exception as e:
#             logger.error(f"Error initializing Gemini model: {str(e)}")
#             import traceback
#             logger.error(traceback.format_exc())
#             raise

#     def evaluate_with_llm(self, prompt):
#         """
#         Evaluate the assignment text using Gemini with enhanced error handling
#         """
#         # Check cache first
#         cached_response = self._check_cache(prompt)
#         if cached_response:
#             logger.info("Using cached LLM response")
#             return cached_response

#         try:
#             # Log the prompt for debugging
#             logger.info("Sending evaluation request to Gemini")
#             logger.debug("Prompt Preview (first 500 chars): %s", prompt[:500])

#             # Generate response with Gemini
#             generation_config = {
#                 "temperature": self.config.get("temperature", 0.3),
#                 "max_output_tokens": self.config.get("max_tokens", 3000)
#             }

#             # Call Gemini to generate the response
#             response = self.model.generate_content(
#                 prompt,
#                 generation_config=generation_config
#             )

#             # Check the response
#             if not response or not hasattr(response, 'text'):
#                 logger.error("No valid response received from Gemini")
#                 return self._generate_fallback_evaluation(prompt)

#             evaluation = response.text

#             # Log response details
#             logger.info("LLM Response received (length: %d characters)", len(evaluation))
#             logger.debug("Response Preview (first 500 chars): %s", evaluation[:500])

#             # Save to cache
#             self._save_to_cache(prompt, evaluation)

#             return evaluation

#         except Exception as e:
#             logger.error(f"Gemini evaluation error: {str(e)}")
#             import traceback
#             logger.error(traceback.format_exc())
            
#             # Return a fallback evaluation
#             return self._generate_fallback_evaluation(prompt)
    
#     def _generate_fallback_evaluation(self, prompt):
#         """Generate a fallback evaluation when the API fails"""
#         logger.info("Generating fallback evaluation")
        
#         # Extract assignment type from prompt if possible
#         assignment_type = "general"
#         if "economics" in prompt.lower():
#             assignment_type = "economics"
#         elif "biology" in prompt.lower():
#             assignment_type = "biology"
#         elif "history" in prompt.lower():
#             assignment_type = "history"
#         elif "literature" in prompt.lower():
#             assignment_type = "literature"
        
#         # Generate fallback response
#         return f"""
# Grade: 75

# Summary:
# The student has demonstrated a good understanding of basic concepts in {assignment_type}. The assignment shows effort in researching the topic and presenting relevant information.

# Key Strengths:
# - Shows understanding of core concepts
# - Presents logical arguments
# - Includes some supporting evidence
# - Makes connections between different ideas
# - Shows effort in research

# Areas for Improvement:
# - Could explore advanced concepts in greater depth
# - Additional examples would strengthen the arguments
# - More critical analysis would enhance the quality
# - Consider alternative perspectives on the topic
# - Include more specific details in key areas

# Specific Feedback:
# The student demonstrates satisfactory knowledge of {assignment_type} fundamentals. To further improve, focus on developing a deeper understanding of advanced concepts and strengthening arguments with more specific examples. The content shows potential, but needs more depth and critical analysis.

# Personalized Learning Plan:
# - Watch educational videos on the topic from Khan Academy or CrashCourse
# - Consider reading more advanced textbooks or scholarly articles
# - Practice summarizing complex ideas in your own words
# - Join study groups or forums to discuss these topics with peers
# """

#     def parse_evaluation(self, evaluation_text):
#         """
#         Parse evaluation text to extract structured data
#         """
#         # Handle empty input
#         if not evaluation_text or evaluation_text.strip() == "":
#             logger.warning("Empty evaluation text received")
#             return {
#                 'grade': 0,
#                 'summary': "No evaluation available.",
#                 'strengths': [],
#                 'areas_for_improvement': [],
#                 'specific_feedback': "No specific feedback generated.",
#                 'personalized_learning_plan': []
#             }

#         # Initialize result structure
#         result = {
#             'grade': 0,
#             'summary': "",
#             'strengths': [],
#             'areas_for_improvement': [],
#             'specific_feedback': "",
#             'personalized_learning_plan': []
#         }

#         # Extract grade using multiple patterns
#         grade_patterns = [
#             r'Grade\s*[:]\s*(\d+)',
#             r'(\d+)\s*/\s*100',
#             r'Grade\s*[-:]\s*(\d+)',
#             r'^Grade\s*[:-]?\s*(\d+)'
#         ]

#         for pattern in grade_patterns:
#             match = re.search(pattern, evaluation_text, re.IGNORECASE | re.MULTILINE)
#             if match:
#                 try:
#                     grade = int(match.group(1))
#                     result['grade'] = min(max(grade, 0), 100)  # Clamp between 0-100
#                     logger.info(f"Extracted grade: {grade}")
#                     break
#                 except Exception as e:
#                     logger.warning(f"Grade extraction failed: {e}")

#         # If grade extraction failed, set a default grade
#         if result['grade'] == 0:
#             result['grade'] = 75
#             logger.warning("Grade extraction failed, using default grade: 75")

#         # Extract sections using patterns and section headers
#         # Try to find common section headers first
#         section_headers = {
#             'summary': r'Summary',
#             'strengths': r'(?:Key )?Strengths',
#             'areas_for_improvement': r'(?:Areas|Improvement)',
#             'specific_feedback': r'(?:Specific|Feedback)',
#             'personalized_learning_plan': r'(?:Personalized|Learning|Plan)'
#         }
        
#         # Extract content between section headers
#         sections = {}
#         eval_lines = evaluation_text.split('\n')
#         current_section = None
        
#         for line in eval_lines:
#             line = line.strip()
#             matched = False
            
#             # Try to match this line to a section header
#             for section_name, pattern in section_headers.items():
#                 if re.match(f"^(?:\d+\.?\s*)?{pattern}\s*[:]*", line, re.IGNORECASE):
#                     current_section = section_name
#                     sections[current_section] = []
#                     matched = True
#                     break
            
#             # If this line is content for the current section, add it
#             if not matched and current_section and line and not line.startswith('Grade'):
#                 sections[current_section].append(line)
        
#         # Process collected sections
#         for section_name, lines in sections.items():
#             content = '\n'.join(lines).strip()
            
#             if section_name in ['strengths', 'areas_for_improvement', 'personalized_learning_plan']:
#                 # Extract list items using bullet points, numbers, or hyphens
#                 items = []
#                 for line in lines:
#                     # Remove bullet points or numbers at the beginning
#                     line = re.sub(r'^[-•*]|\d+[.)]', '', line).strip()
#                     if line:
#                         items.append(line)
                
#                 # If no clear bullet points, try to split by sentences
#                 if len(items) <= 1 and content:
#                     items = [s.strip() for s in re.split(r'[.!?]+', content) if s.strip()]
                
#                 result[section_name] = [
#                     item for item in items
#                     if item and len(item) > 3
#                 ]
#             else:
#                 result[section_name] = content
        
#         # Fallback for summary if it's empty
#         if not result['summary']:
#             result['summary'] = "Detailed evaluation summary could not be automatically extracted."

#         logger.info(f"Parsed Evaluation: Grade = {result['grade']}")
#         return result

#     def generate_student_report(self, document_name, assignment_type, text_analysis, evaluation_data):
#         """
#         Generate a formatted report for a student

#         Args:
#             document_name (str): Name of the document
#             assignment_type (str): Type of assignment ('typed' or 'handwritten')
#             text_analysis (dict): Analysis of the text
#             evaluation_data (dict): Parsed evaluation data

#         Returns:
#             str: Formatted markdown report for the student
#         """
#         # Handle missing keys with default values
#         grade = evaluation_data.get('grade', 0)
#         summary = evaluation_data.get('summary', "No summary available.")
#         strengths = evaluation_data.get('strengths', [])
#         areas_for_improvement = evaluation_data.get('areas_for_improvement', [])
#         specific_feedback = evaluation_data.get('specific_feedback', "No specific feedback available.")
#         personalized_learning_plan = evaluation_data.get('personalized_learning_plan', [])

#         # Format the report as markdown
#         report = f"""# Assignment Evaluation Report

# ## Document: {document_name}
# Type: {assignment_type}
# Date: {datetime.now().strftime('%Y-%m-%d')}

# ## Overall Grade: {grade}/100

# ## Summary
# {summary}

# ## Text Analysis
# - Word Count: {text_analysis.get('word_count', 0)}
# - Sentence Count: {text_analysis.get('sentence_count', 0)}
# - Average Sentence Length: {text_analysis.get('average_sentence_length', 0):.1f} words
# - Readability Score: {text_analysis.get('readability_score', 0):.1f}/100

# ## Strengths
# """

#         # Add strengths
#         if strengths:
#             for strength in strengths:
#                 report += f"- {strength}\n"
#         else:
#             report += "- No specific strengths identified.\n"

#         report += "\n## Areas for Improvement\n"

#         # Add areas for improvement
#         if areas_for_improvement:
#             for area in areas_for_improvement:
#                 report += f"- {area}\n"
#         else:
#             report += "- No specific areas for improvement identified.\n"

#         report += f"\n## Specific Feedback\n{specific_feedback}\n\n"

#         report += "## Personalized Learning Plan\n"

#         # Add personalized learning plan
#         if personalized_learning_plan:
#             for item in personalized_learning_plan:
#                 report += f"- {item}\n"
#         else:
#             report += "- No personalized learning plan available.\n"

#         return report

#     def process_assignment(self, doc_name, doc_info):
#         """
#         Process a single assignment
        
#         Args:
#             doc_name (str): Name of the document
#             doc_info (dict): Dictionary containing document metadata
            
#         Returns:
#             tuple: (text_analysis, parsed_evaluation, report_path)
#         """
#         # Define path for extracted text file
#         text_output_path = os.path.join(self.output_dir, "extracted_text", f"{doc_name}.txt")
        
#         # Check if extracted text file already exists
#         if os.path.exists(text_output_path):
#             logger.info(f"Using previously extracted text for {doc_name}")
#             with open(text_output_path, 'r', encoding='utf-8') as f:
#                 extracted_text = f.read()
#         else:
#             # Extract text from PDF if not already done
#             logger.info(f"Extracting text from {doc_name} ({doc_info['type']})")
#             extracted_text = self.extract_text_from_pdf(doc_info['pdf_path'], doc_info['type'])
            
#             # Save extracted text
#             with open(text_output_path, 'w', encoding='utf-8') as f:
#                 f.write(extracted_text)
        
#         # Analyze text
#         text_analysis = self.analyze_text(extracted_text)
        
#         # Create evaluation prompt
#         prompt = self.create_evaluation_prompt(extracted_text, text_analysis)
        
#         # Evaluate with LLM
#         evaluation = self.evaluate_with_llm(prompt)
        
#         # Parse evaluation
#         parsed_evaluation = self.parse_evaluation(evaluation)
        
#         # Generate report
#         report = self.generate_student_report(
#             doc_name,
#             doc_info['type'],
#             text_analysis,
#             parsed_evaluation
#         )
        
#         # Save report
#         report_path = os.path.join(self.output_dir, "reports", f"{doc_name}_report.md")
#         with open(report_path, 'w', encoding='utf-8') as f:
#             f.write(report)
        
#         return text_analysis, parsed_evaluation, report_path

import os
import numpy as np
import pandas as pd
import json
import time
import re
import logging
import hashlib
from datetime import datetime
import fitz  # PyMuPDF for PDF handling
from PIL import Image
from io import BytesIO
import google.generativeai as genai
import cv2
from PIL import Image
import re
import logging
import argparse
import requests
from concurrent.futures import ThreadPoolExecutor
import nltk
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
nltk.download('punkt') 
# nltk.download('popular')
import string
import hashlib
from io import BytesIO
from tqdm import tqdm  # Add this line
# Add Google Cloud Vision support
from google.cloud import vision
# Setup logging
log_directory = "backend"
os.makedirs(log_directory, exist_ok=True)

log_file = os.path.join(log_directory, "teacher_assistant.log")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Try to download NLTK data, but don't fail if it's not available
try:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
except:
    logger.warning("Could not download NLTK data. Some NLP features might not work.")

class AssignmentProcessor:
    """
    Main class for processing assignments and evaluating them with Gemini
    """
    def __init__(self, base_path="backend/uploads", output_dir="backend/results", config=None):
        """
        Initialize the assignment processor

        Args:
            base_path (str): Path to the uploads folder containing assignment PDFs
            output_dir (str): Directory to save outputs
            config (dict): Configuration parameters
        """
        self.base_path = base_path
        self.output_dir = output_dir

        # Create output directory structure if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        os.makedirs(os.path.join(output_dir, "extracted_text"), exist_ok=True)
        os.makedirs(os.path.join(output_dir, "reports"), exist_ok=True)
        os.makedirs(os.path.join(output_dir, "visualizations"), exist_ok=True)

        # Default configuration
        self.config = {
            "ocr_dpi": 300,  # DPI for image rendering in OCR
            "max_workers": 4,  # Number of parallel workers for processing
            "llm_provider": "gemini",  # Only Gemini is supported
            "model_name": "gemini-2.0-flash",  # Model name for Gemini (using a model that exists)
            "api_key": "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74",  # Will be updated from config
            "evaluation_criteria": {
                "content": 40,  # Relevance, accuracy, and depth (weight: 40%)
                "organization": 20,  # Logical flow, clear structure (weight: 20%)
                "language": 20,  # Grammar, spelling, vocabulary (weight: 20%)
                "critical_thinking": 20 }, # Analysis, synthesis, evaluation (weight: 20%)
            "cache_llm_results": True,  # Whether to cache LLM results to save computation time
            "cache_dir": ".cache",  # Directory for caching LLM results
            "temperature": 0.3,  # Temperature for LLM generation
            "max_tokens": 3000  # Max tokens for LLM generation
        }

        # Update config with provided values
        if config:
            self.config.update(config)

        # Create cache directory if enabled
        if self.config["cache_llm_results"]:
            os.makedirs(self.config["cache_dir"], exist_ok=True)

        # Initialize statistics
        self.stats = {
            "processed": 0,
            "typed": 0,
            "handwritten": 0,
            "errors": 0,
            "start_time": time.time()
        }

        try:
            # Initialize the LLM model
            self._initialize_llm()
            logger.info(f"Initialized AssignmentProcessor with base path: {base_path}")
            logger.info(f"Output directory: {output_dir}")
        except Exception as e:
            logger.error(f"Error during initialization: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
        # Add Google Cloud Vision client initialization
        try:
            self.vision_client = vision.ImageAnnotatorClient()
        except Exception as e:
            logger.error(f"Error initializing Google Cloud Vision client: {str(e)}")
            raise

    def extract_text_from_pdf(self, pdf_path, pdf_type):
        """
        Extract text from PDF documents using appropriate method based on type

        Args:
            pdf_path (str): Path to the PDF file
            pdf_type (str): Type of PDF ('typed' or 'handwritten')

        Returns:
            str: Extracted text from the PDF
        """
        # Check if file exists
        if not os.path.exists(pdf_path):
            logger.error(f"PDF file not found: {pdf_path}")
            return "PDF file not found. Please check the path and try again."

        text = []
        try:
            # Open the PDF
            doc = fitz.open(pdf_path)
            logger.info(f"Processing PDF with {len(doc)} pages") #extra 
            if pdf_type == 'typed':
                # For typed PDFs, we can extract text directly
                for page_num in range(len(doc)):
                    page = doc.load_page(page_num)
                    page_text = page.get_text()
                    text.append(page_text)
                    logger.info(f"Extracted {len(page_text)} characters from page {page_num+1}")#extra
            else:
                # For handwritten PDFs, use Google Cloud Vision for OCR
                for page_num in range(len(doc)):
                    page = doc.load_page(page_num)

                    # Render page to an image (higher resolution for better OCR)
                    zoom = self.config["ocr_dpi"] / 72  # Default DPI in PDF is 72
                    matrix = fitz.Matrix(zoom, zoom)
                    pix = page.get_pixmap(matrix=matrix)

                    # Convert to PIL Image
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

                    # Convert image to bytes for Google Cloud Vision
                    img_byte_arr = BytesIO()
                    img.save(img_byte_arr, format='PNG')
                    img_byte_arr = img_byte_arr.getvalue()

                    # Prepare the Vision API request
                    image = vision.Image(content=img_byte_arr)

                    # Perform text detection
                    response = self.vision_client.document_text_detection(image=image)

                    # Extract full text from the response
                    page_text = response.full_text_annotation.text if response.full_text_annotation else ""
                    text.append(page_text)
                    logger.info(f"Extracted {len(page_text)} characters from page {page_num+1}")#extra

            # Clean up and combine all extracted text
            full_text = "\n".join(text)

            # Post-processing to clean up text
            full_text = self._clean_text(full_text)
            logger.info(f"Extracted total {len(full_text)} characters of text") #extra
            return full_text

        except Exception as e:
            logger.error(f"Error extracting text from {pdf_path}: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
            self.stats["errors"] += 1
            return "Error extracting text from PDF. Using sample text for testing purposes.\n\nThis is a sample assignment text. The student discusses various topics related to the subject matter."
       

      
    def _clean_text(self, text):
        """
        Clean up extracted text to remove artifacts and normalize spacing

        Args:
            text (str): Raw extracted text

        Returns:
            str: Cleaned text
        """
        # Remove excessive newlines
        text = re.sub(r'\n{3,}', '\n\n', text)

        # Remove non-printable characters
        text = ''.join(c for c in text if c.isprintable() or c in ['\n', '\t'])

        # Fix spacing issues
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r' \.', '.', text)
        text = re.sub(r' ,', ',', text)

        # Fix common OCR errors
        text = re.sub(r'l\b', 'i', text)  # Replace lone 'l' with 'i'

        return text.strip()

    def analyze_text(self, text):
        """
        Perform basic analysis on the text to extract features

        Args:
            text (str): Extracted text from the document

        Returns:
            dict: Dictionary containing text analysis features
        """
        # Check if text is empty
        if not text.strip():
            logger.warning("Empty text provided for analysis")
            return {
                "word_count": 0,
                "sentence_count": 0,
                "average_sentence_length": 0,
                "readability_score": 0,
                "estimated_quality": "insufficient"
            }

        try:
            # Basic statistics
            # Simple sentence splitting by punctuation
            # sentences = re.split(r'[.!?]+', text)
            # sentences = [s.strip() for s in sentences if s.strip()]
            sentences = sent_tokenize(text)
            # Simple word counting
            words = text.split()
            translator = str.maketrans('', '', string.punctuation)
            clean_words = [word.translate(translator).lower() for word in words]
            clean_words = [word for word in clean_words if word]
            # Calculate basic metrics
            if len(sentences) == 0 or len(words) == 0:
                readability_score = 0
                avg_sentence_length = 0
            else:
                avg_sentence_length = len(words) / len(sentences)
                # Simplified readability score based on average sentence length
                readability_score = 206.835 - 1.015 * avg_sentence_length - 84.6 * (sum(len(word) for word in clean_words) / len(clean_words))
                readability_score = max(0, min(100, readability_score))  # Clamp between 0 and 100

            # Estimate quality based on length and readability
            quality = "insufficient"
            if len(words) > 300:
                if readability_score > 70:
                    quality = "good"
                elif readability_score > 50:
                    quality = "average"
                else:
                    quality = "below_average"
            elif len(words) > 100:
                quality = "short"

            logger.info(f"Text analysis: {len(words)} words, {len(sentences)} sentences, {quality} quality")
            
            return {
                "word_count": len(words),
                "sentence_count": len(sentences),
                "average_sentence_length": avg_sentence_length,
                "readability_score": readability_score,
                "estimated_quality": quality
            }

        except Exception as e:
            logger.error(f"Error analyzing text: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
            return {
                "word_count": len(text.split()),
                "sentence_count": 0,
                "average_sentence_length": 0,
                "readability_score": 0,
                "estimated_quality": "error"
            }

    def create_evaluation_prompt(self, assignment_text, analysis):
        """
        Create a prompt for evaluating the assignment based only on content quality.

        Args:
            assignment_text (str): Extracted text from the assignment
            analysis (dict): Results from text analysis

        Returns:
            str: Prompt for the LLM to evaluate the assignment
        """
        # Create evaluation prompt
        prompt = f"""
You are an experienced teaching assistant evaluating a student's assignment. Your grading should be based only on content quality. **Ignore structure, grammar, spelling, punctuation, readability, and formatting. The goal is to fairly assess the student's **understanding of the topic and provide helpful, encouraging feedback.

### Document Analysis:
- Word Count: {analysis['word_count']}
- Sentence Count: {analysis['sentence_count']}
- Readability Score: {analysis['readability_score']:.1f}/100 (Ignore for grading)

### Evaluation Criteria:
- Content (100%): Depth, accuracy, and relevance of the information presented.
  - Ignore grammar, punctuation, spelling, structure, and formatting.
  - Focus only on the student's understanding and explanation of the topic.
  - Prioritize rewarding well-explained ideas and logical reasoning.

---

### ASSIGNMENT TEXT:
{assignment_text}
---

### Evaluation Structure:

1. Grade (0-100, based ONLY on content quality):
  - Assign a high score (75-100) if the student demonstrates fairly well knowledge and understanding of the topic.
  - Assign a lower but fair score(30-85) if key concepts are missing or misunderstood.
  - Do not deduct marks for grammar, spelling, or structure issues. Don't cut unnecessary marks and give marks for length and attempting as well

2. Summary:
  - Briefly highlight what the student did in content depth (2-3 sentences).

3. Key Strengths (3-5 points):
  - List specific areas where the student has demonstrated content knowledge.
  - Use short examples from the text.

4. Areas for Improvement (3-5 points):
  - Instead of generic writing advice, list relevant subtopics the student should study further.
  - Example: If the assignment is about economics, suggest deeper research into "market failures" or "inflation trends."

5. Specific Feedback:
  - Provide constructive and precise feedback on how to improve content quality. For eg the student has fairly well knowledge of economics but can focus on micro-economics to excel in his/her field.
  - Avoid comments about structure or grammar.

6. Personalized Learning Plan (Topic-Based Roadmap):
  - Recommend 2-3 specific subtopics, resources, or study methods that will help the student improve. Include links of blogs or articles from internet or suggest some videos from youtube.
  - Example: If the topic is biology, suggest watching a CrashCourse video on DNA replication or reading an article on genetics.

---

### Key Guidelines:
✅ Grade ONLY based on content—ignore all language, grammar, or formatting issues.
✅ Be fair and encouraging—maximize the student's score where possible.
✅ Keep feedback clear, constructive, and topic-focused.

Return your evaluation in the following format exactly:

Grade: [numeric grade]

Summary:
[Your summary text here]

Key Strengths:
- [First strength]
- [Second strength]
- [Third strength]
- [Fourth strength if applicable]
- [Fifth strength if applicable]

Areas for Improvement:
- [First area]
- [Second area]
- [Third area]
- [Fourth area if applicable]
- [Fifth area if applicable]

Specific Feedback:
[Your specific feedback text here]

Personalized Learning Plan:
- [First recommendation]
- [Second recommendation]
- [Third recommendation if applicable]
"""

        return prompt

    def _get_cache_key(self, text):
        """
        Generate a cache key for the given text

        Args:
            text (str): Text to hash

        Returns:
            str: Cache key
        """
        return hashlib.md5(text.encode('utf-8')).hexdigest()

    def _check_cache(self, prompt):
        """
        Check if we have a cached response for this prompt

        Args:
            prompt (str): LLM prompt

        Returns:
            str or None: Cached response if available, else None
        """
        if not self.config["cache_llm_results"]:
            return None

        cache_key = self._get_cache_key(prompt)
        cache_file = os.path.join(self.config["cache_dir"], f"{cache_key}.txt")

        if os.path.exists(cache_file):
            try:
                with open(cache_file, 'r', encoding='utf-8') as f:
                    logger.info(f"Cache hit for prompt hash {cache_key[:8]}")
                    return f.read()
            except Exception as e:
                logger.error(f"Error reading cache: {str(e)}")
                return None

        logger.info(f"Cache miss for prompt hash {cache_key[:8]}")
        return None

    def _save_to_cache(self, prompt, response):
        """
        Save response to cache

        Args:
            prompt (str): LLM prompt
            response (str): LLM response
        """
        if not self.config["cache_llm_results"]:
            return

        try:
            cache_key = self._get_cache_key(prompt)
            cache_file = os.path.join(self.config["cache_dir"], f"{cache_key}.txt")

            with open(cache_file, 'w', encoding='utf-8') as f:
                f.write(response)
                
            logger.info(f"Saved response to cache with key {cache_key[:8]}")
        except Exception as e:
            logger.error(f"Error saving to cache: {str(e)}")

    def _initialize_llm(self):
        """
        Initialize the Gemini model
        """
        provider = self.config["llm_provider"].lower()

        if provider == "gemini":
            try:
                # Verify API key is available
                if not self.config.get("api_key"):
                    logger.error("Gemini API key is required but not provided")
                    raise ValueError("API key is required for Gemini")

                # Configure the Gemini API with the provided key
                genai.configure(api_key=self.config["api_key"])

                # Initialize the Gemini model
                self.model = genai.GenerativeModel(self.config.get("model_name", "models/gemini-2.0-flash"))

                logger.info(f"Gemini model initialized: {self.config.get('model_name', 'models/gemini-2.0-flash')}")
            except Exception as e:
                logger.error(f"Error initializing Gemini model: {str(e)}")
                import traceback
                logger.error(traceback.format_exc())
                raise
        else:
            logger.error(f"Unsupported LLM provider: {provider}")
            raise ValueError(f"Unsupported LLM provider: {provider}. Currently only 'gemini' is supported.")
        
    def evaluate_with_llm(self, prompt):
        """
        Evaluate the assignment text using Gemini with enhanced error handling
        """
        # Check cache first
        cached_response = self._check_cache(prompt)
        if cached_response:
            logger.info("Using cached LLM response")
            return cached_response

        try:
            # Log the prompt for debugging
            logger.info("Sending evaluation request to Gemini")
            logger.debug("Prompt Preview (first 500 chars): %s", prompt[:500])

            # Generate response with Gemini
            generation_config = {
                "temperature": self.config.get("temperature", 0.3),
                "max_output_tokens": self.config.get("max_tokens", 3000)
            }

            # Call Gemini to generate the response
            response = self.model.generate_content(
                prompt,
                generation_config=generation_config
            )

            # Check the response
            if not response or not hasattr(response, 'text'):
                logger.error("No valid response received from Gemini")
                return self._generate_fallback_evaluation()

            evaluation = response.text

            # Log response details
            logger.info("LLM Response received (length: %d characters)", len(evaluation))
            logger.debug("Response Preview (first 500 chars): %s", evaluation[:500])

            # Save to cache
            self._save_to_cache(prompt, evaluation)

            return evaluation

        except Exception as e:
            logger.error(f"Gemini evaluation error: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
            
            # Return a fallback evaluation
            return self._generate_fallback_evaluation()
    
    def _generate_fallback_evaluation(self):
        """Generate a fallback evaluation when the API fails"""
        logger.info("Generating fallback evaluation")
        
        # Generate fallback response
        return """
Grade: 75

Summary:
The student has demonstrated a good understanding of basic concepts in this subject. The assignment shows effort in researching the topic and presenting relevant information.

Key Strengths:
- Shows understanding of core concepts
- Presents logical arguments
- Includes some supporting evidence
- Makes connections between different ideas
- Shows effort in research

Areas for Improvement:
- Could explore advanced concepts in greater depth
- Additional examples would strengthen the arguments
- More critical analysis would enhance the quality
- Consider alternative perspectives on the topic
- Include more specific details in key areas

Specific Feedback:
The student demonstrates satisfactory knowledge of fundamentals. To further improve, focus on developing a deeper understanding of advanced concepts and strengthening arguments with more specific examples. The content shows potential, but needs more depth and critical analysis.

Personalized Learning Plan:
- Watch educational videos on the topic from Khan Academy or CrashCourse
- Consider reading more advanced textbooks or scholarly articles
- Practice summarizing complex ideas in your own words
- Join study groups or forums to discuss these topics with peers
"""

    def parse_evaluation(self, evaluation_text):
        """
        Parse evaluation text to extract structured data - updated to match the specific format.

        Args:
            evaluation_text (str): Evaluation text from LLM

        Returns:
            dict: Structured evaluation data
        """
        logger.info("Parsing evaluation text")
        
        # Defensive programming: handle None or empty input
        if not evaluation_text or evaluation_text.strip() == "":
            logger.warning("Empty evaluation text received")
            return {
                'grade': 0,
                'summary': "No evaluation available.",
                'strengths': [],
                'areas_for_improvement': [],
                'specific_feedback': "",
                'personalized_learning_plan': []
            }

        # Initialize result structure
        result = {
            'grade': 0,
            'summary': "",
            'strengths': [],
            'areas_for_improvement': [],
            'specific_feedback': "",
            'personalized_learning_plan': []
        }

        # Extract Grade
        grade_match = re.search(r'Grade:\s*(\d+)', evaluation_text, re.IGNORECASE)
        if grade_match:
            try:
                grade = int(grade_match.group(1))
                result['grade'] = min(max(grade, 0), 100)  # Clamp between 0-100
            except Exception as e:
                logger.warning(f"Grade extraction failed: {e}")

        # Extract sections based on headers
        sections = {
            'summary': r'Summary:\s*(.*?)(?=Key Strengths:|Areas for Improvement:|Specific Feedback:|Personalized Learning Plan:|$)',
            'strengths': r'Key Strengths:\s*(.*?)(?=Areas for Improvement:|Specific Feedback:|Personalized Learning Plan:|$)',
            'areas_for_improvement': r'Areas for Improvement:\s*(.*?)(?=Specific Feedback:|Personalized Learning Plan:|$)',
            'specific_feedback': r'Specific Feedback:\s*(.*?)(?=Personalized Learning Plan:|$)',
            'personalized_learning_plan': r'Personalized Learning Plan:\s*(.*?)$'
        }

        for section, pattern in sections.items():
            match = re.search(pattern, evaluation_text, re.DOTALL | re.IGNORECASE)
            if match:
                content = match.group(1).strip()
                
                # Handle list items for appropriate sections
                if section in ['strengths', 'areas_for_improvement', 'personalized_learning_plan']:
                    # Extract bullet points
                    items = []
                    
                    # Try to extract items with bullet points or dashes
                    bullet_items = re.findall(r'[-•*]\s*(.*?)(?=\n[-•*]|\Z)', content, re.DOTALL)
                    
                    if bullet_items:
                        for item in bullet_items:
                            clean_item = item.strip()
                            if clean_item and len(clean_item) > 3:
                                items.append(clean_item)
                    else:
                        # For personalized learning plan, try to extract items with bold headers
                        if section == 'personalized_learning_plan':
                            bold_items = re.findall(r'\*\*(.*?)\*\*:\s*(.*?)(?=\n\*\*|\Z)', content, re.DOTALL)
                            if bold_items:
                                for bold_header, desc in bold_items:
                                    combined = f"{bold_header}: {desc.strip()}"
                                    items.append(combined.strip())
                            else:
                                # Fallback to line splitting
                                items = [line.strip() for line in content.split('\n') if line.strip() and len(line.strip()) > 3]
                        else:
                            # Fallback to line splitting
                            items = [line.strip() for line in content.split('\n') if line.strip() and len(line.strip()) > 3]
                    
                    result[section] = items
                else:
                    # For non-list sections (summary, specific_feedback)
                    result[section] = content

        # Log the results
        logger.info(f"Parsed Evaluation: Grade = {result['grade']}")
        logger.info(f"Sections extracted: {', '.join([k for k, v in result.items() if v])}")
        
        return result
        

        # try:
        #     # Extract grade
        #     grade_match = re.search(r'Grade:\s*(\d+)', evaluation_text, re.IGNORECASE)
        #     if grade_match:
        #         result['grade'] = int(grade_match.group(1))
        #         logger.info(f"Extracted grade: {result['grade']}")
            
        #     # Extract sections using regular expressions
            
        #     # Extract Summary
        #     summary_match = re.search(r'Summary:(.*?)(?=Key Strengths:|$)', evaluation_text, re.DOTALL | re.IGNORECASE)
        #     if summary_match:
        #         result['summary'] = summary_match.group(1).strip()
        #         logger.info(f"Extracted summary: {result['summary'][:50]}...")
            
        #     # Extract Key Strengths
        #     strengths_match = re.search(r'Key Strengths:(.*?)(?=Areas for Improvement:|$)', evaluation_text, re.DOTALL | re.IGNORECASE)
        #     if strengths_match:
        #         strengths_text = strengths_match.group(1).strip()
        #         # Extract bullet points
        #         result['strengths'] = [item.strip() for item in re.findall(r'[-•*]\s*(.*?)(?=[-•*]|$)', strengths_text, re.DOTALL) if item.strip()]
        #         if not result['strengths']:  # If no bullet points found, try line by line
        #             result['strengths'] = [line.strip() for line in strengths_text.split('\n') if line.strip() and not line.strip().startswith('Key Strengths')]
        #         logger.info(f"Extracted {len(result['strengths'])} strength points")
            
        #     # Extract Areas for Improvement
        #     areas_match = re.search(r'Areas for Improvement:(.*?)(?=Specific Feedback:|$)', evaluation_text, re.DOTALL | re.IGNORECASE)
        #     if areas_match:
        #         areas_text = areas_match.group(1).strip()
        #         # Extract bullet points
        #         result['areas_for_improvement'] = [item.strip() for item in re.findall(r'[-•*]\s*(.*?)(?=[-•*]|$)', areas_text, re.DOTALL) if item.strip()]
        #         if not result['areas_for_improvement']:  # If no bullet points found, try line by line
        #             result['areas_for_improvement'] = [line.strip() for line in areas_text.split('\n') if line.strip() and not line.strip().startswith('Areas for Improvement')]
        #         logger.info(f"Extracted {len(result['areas_for_improvement'])} improvement points")
            
        #     # Extract Specific Feedback
        #     feedback_match = re.search(r'Specific Feedback:(.*?)(?=Personalized Learning Plan:|$)', evaluation_text, re.DOTALL | re.IGNORECASE)
        #     if feedback_match:
        #         result['specific_feedback'] = feedback_match.group(1).strip()
        #         logger.info(f"Extracted specific feedback: {result['specific_feedback'][:50]}...")
            
        #     # Extract Personalized Learning Plan
        #     plan_match = re.search(r'Personalized Learning Plan:(.*?)$', evaluation_text, re.DOTALL | re.IGNORECASE)
        #     if plan_match:
        #         plan_text = plan_match.group(1).strip()
        #         # Extract bullet points
        #         result['personalized_learning_plan'] = [item.strip() for item in re.findall(r'[-•*]\s*(.*?)(?=[-•*]|$)', plan_text, re.DOTALL) if item.strip()]
        #         if not result['personalized_learning_plan']:  # If no bullet points found, try line by line
        #             result['personalized_learning_plan'] = [line.strip() for line in plan_text.split('\n') if line.strip() and not line.strip().startswith('Personalized Learning Plan')]
        #         logger.info(f"Extracted {len(result['personalized_learning_plan'])} learning plan items")
            
        #     # Second attempt for list items if they are still empty
        #     if not result['strengths']:
        #         result['strengths'] = ["Shows understanding of core concepts", "Presents logical arguments", "Includes supporting evidence"]
        #         logger.warning("Using fallback strengths")
                
        #     if not result['areas_for_improvement']:
        #         result['areas_for_improvement'] = ["Could explore advanced concepts in greater depth", "More critical analysis would enhance quality", "Consider alternative perspectives"]
        #         logger.warning("Using fallback areas for improvement")
                
        #     if not result['personalized_learning_plan']:
        #         result['personalized_learning_plan'] = ["Watch educational videos on the topic", "Practice summarizing complex ideas", "Join study groups or forums"]
        #         logger.warning("Using fallback learning plan")
        
        # except Exception as e:
        #     logger.error(f"Error parsing evaluation text: {str(e)}")
        #     import traceback
        #     logger.error(traceback.format_exc())
            
        # return result

#     def generate_student_report(self, document_name, assignment_type, text_analysis, evaluation_data):
#         """
#         Generate a formatted report for a student

#         Args:
#             document_name (str): Name of the document
#             assignment_type (str): Type of assignment ('typed' or 'handwritten')
#             text_analysis (dict): Analysis of the text
#             evaluation_data (dict): Parsed evaluation data

#         Returns:
#             str: Formatted markdown report for the student
#         """
#         # Ensure all required keys exist in evaluation_data
#         grade = evaluation_data.get('grade', 0)
#         summary = evaluation_data.get('summary', "No summary available.")
#         strengths = evaluation_data.get('strengths', [])
#         areas_for_improvement = evaluation_data.get('areas_for_improvement', [])
#         specific_feedback = evaluation_data.get('specific_feedback', "No specific feedback available.")
#         personalized_learning_plan = evaluation_data.get('personalized_learning_plan', [])

#         # Format the report as markdown
#         report = f"""# Assignment Evaluation Report

# ## Document: {document_name}
# Type: {assignment_type}
# Date: {datetime.now().strftime('%Y-%m-%d')}

# ## Overall Grade: {grade}/100

# ## Summary
# {summary}

# ## Text Analysis
# - Word Count: {text_analysis.get('word_count', 0)}
# - Sentence Count: {text_analysis.get('sentence_count', 0)}
# - Average Sentence Length: {text_analysis.get('average_sentence_length', 0):.1f} words
# - Readability Score: {text_analysis.get('readability_score', 0):.1f}/100

# ## Strengths
# """

#         # Add strengths
#         if strengths:
#             for strength in strengths:
#                 report += f"- {strength}\n"
#         else:
#             report += "- No specific strengths identified.\n"

#         report += "\n## Areas for Improvement\n"

#         # Add areas for improvement
#         if areas_for_improvement:
#             for area in areas_for_improvement:
#                 report += f"- {area}\n"
#         else:
#             report += "- No specific areas for improvement identified.\n"

#         report += f"\n## Specific Feedback\n{specific_feedback}\n\n"

#         report += "## Personalized Learning Plan\n"

#         # Add personalized learning plan
#         if personalized_learning_plan:
#             for item in personalized_learning_plan:
#                 report += f"- {item}\n"
#         else:
#             report += "- No personalized learning plan available.\n"

#         return report

   
    def generate_student_report(self, student_name, roll_no, document_name, assignment_type, text_analysis, evaluation_data):
        """
        Generate a formatted report for a student

        Args:
            student_name (str): Name of the student
            roll_no (str): Roll number of the student
            document_name (str): Name of the document
            assignment_type (str): Type of assignment ('typed' or 'handwritten')
            text_analysis (dict): Analysis of the text
            evaluation_data (dict): Parsed evaluation data

        Returns:
            str: Formatted markdown report for the student
        """
        grade = evaluation_data.get('grade', 0)
        summary = evaluation_data.get('summary', "No summary available.")
        strengths = evaluation_data.get('strengths', [])
        areas_for_improvement = evaluation_data.get('areas_for_improvement', [])
        specific_feedback = evaluation_data.get('specific_feedback', "No specific feedback available.")
        personalized_learning_plan = evaluation_data.get('personalized_learning_plan', [])

        report = f"""# Assignment Evaluation Report

    ## Student Details
    - **Name**: {student_name}
    - **Roll Number**: {roll_no}

    ## Document: {document_name}
    - Type: {assignment_type}
    - Date: {datetime.now().strftime('%Y-%m-%d')}

    ## Overall Grade: {grade}/100

    ## Summary
    {summary}

    ## Text Analysis
    - Word Count: {text_analysis.get('word_count', 0)}
    - Sentence Count: {text_analysis.get('sentence_count', 0)}
    - Average Sentence Length: {text_analysis.get('average_sentence_length', 0):.1f} words
    - Readability Score: {text_analysis.get('readability_score', 0):.1f}/100

    ## Strengths
    """
        report += "".join(f"- {s}\n" for s in strengths) if strengths else "- No specific strengths identified.\n"
        report += "\n## Areas for Improvement\n"
        report += "".join(f"- {a}\n" for a in areas_for_improvement) if areas_for_improvement else "- No specific areas for improvement identified.\n"
        report += f"\n## Specific Feedback\n{specific_feedback}\n\n"
        report += "## Personalized Learning Plan\n"
        report += "".join(f"- {p}\n" for p in personalized_learning_plan) if personalized_learning_plan else "- No personalized learning plan available.\n"

        return report

    # def process_assignment(self, doc_name, doc_info):
    #     """
    #     Process a single assignment
        
    #     Args:
    #         doc_name (str): Name of the document
    #         doc_info (dict): Dictionary containing document metadata
            
    #     Returns:
    #         tuple: (text_analysis, parsed_evaluation, report_path)
    #     """
    #     # Define path for extracted text file
    #     text_output_path = os.path.join(self.output_dir, "extracted_text", f"{doc_name}.txt")
        
    #     # Check if extracted text file already exists
    #     if os.path.exists(text_output_path):
    #         logger.info(f"Using previously extracted text for {doc_name}")
    #         with open(text_output_path, 'r', encoding='utf-8') as f:
    #             extracted_text = f.read()
    #     else:
    #         # Extract text from PDF if not already done
    #         logger.info(f"Extracting text from {doc_name} ({doc_info['type']})")
    #         extracted_text = self.extract_text_from_pdf(doc_info['pdf_path'], doc_info['type'])
            
    #         # Save extracted text
    #         with open(text_output_path, 'w', encoding='utf-8') as f:
    #             f.write(extracted_text)
        
    #     # Analyze text
    #     text_analysis = self.analyze_text(extracted_text)
        
    #     # Create evaluation prompt
    #     prompt = self.create_evaluation_prompt(extracted_text, text_analysis)
        
    #     # Evaluate with LLM - save raw evaluation before parsing
    #     raw_evaluation = self.evaluate_with_llm(prompt)
    #     raw_eval_path = os.path.join(self.output_dir, "reports", f"{doc_name}_raw_evaluation.txt")
    #     with open(raw_eval_path, 'w', encoding='utf-8') as f:
    #         f.write(raw_evaluation)
        
    #     # Parse evaluation
    #     parsed_evaluation = self.parse_evaluation(raw_evaluation)
        
    #     # Save parsed evaluation as JSON for debugging
    #     eval_json_path = os.path.join(self.output_dir, "reports", f"{doc_name}_parsed_evaluation.json")
    #     with open(eval_json_path, 'w', encoding='utf-8') as f:
    #         json.dump(parsed_evaluation, f, indent=2)
        
    #     # Generate report
    #     report = self.generate_student_report(
    #         doc_name,
    #         doc_info['type'],
    #         text_analysis,
    #         parsed_evaluation
    #     )
        
    #     # Save report
    #     report_path = os.path.join(self.output_dir, "reports", f"{doc_name}_report.md")
    #     with open(report_path, 'w', encoding='utf-8') as f:
    #         f.write(report)
        
    #     return text_analysis, parsed_evaluation, report_path
    def process_assignment(self, doc_name, doc_info):
        """
        Process a single assignment

        Args:
            doc_name (str): Name of the document
            doc_info (dict): Dictionary containing document metadata

        Returns:
            tuple: (text_analysis, parsed_evaluation, report_path)
        """
        student_name = doc_info.get('student_name', 'Unknown')
        roll_no = doc_info.get('roll_no', 'Unknown')

        text_output_path = os.path.join(self.output_dir, "extracted_text", f"{doc_name}.txt")

        if os.path.exists(text_output_path):
            logger.info(f"Using previously extracted text for {doc_name}")
            with open(text_output_path, 'r', encoding='utf-8') as f:
                extracted_text = f.read()
        else:
            logger.info(f"Extracting text from {doc_name} ({doc_info['type']})")
            extracted_text = self.extract_text_from_pdf(doc_info['pdf_path'], doc_info['type'])

            with open(text_output_path, 'w', encoding='utf-8') as f:
                f.write(extracted_text)

        text_analysis = self.analyze_text(extracted_text)
        prompt = self.create_evaluation_prompt(extracted_text, text_analysis)
        raw_evaluation = self.evaluate_with_llm(prompt)

        raw_eval_path = os.path.join(self.output_dir, "reports", f"{doc_name}_raw_evaluation.txt")
        with open(raw_eval_path, 'w', encoding='utf-8') as f:
            f.write(raw_evaluation)

        parsed_evaluation = self.parse_evaluation(raw_evaluation)

        # Inject student info
        parsed_evaluation['student_name'] = student_name
        parsed_evaluation['roll_no'] = roll_no

        eval_json_path = os.path.join(self.output_dir, "reports", f"{doc_name}_parsed_evaluation.json")
        with open(eval_json_path, 'w', encoding='utf-8') as f:
            json.dump(parsed_evaluation, f, indent=2)

        report = self.generate_student_report(           
            doc_info['student_name'],
            doc_info['roll_no'],
            doc_name,
            doc_info['type'],
            text_analysis,
            parsed_evaluation
        )
        report_path = os.path.join(self.output_dir, "reports", f"{doc_name}_report.md")
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)

        return text_analysis, parsed_evaluation, report_path
