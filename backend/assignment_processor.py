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
from tqdm import tqdm
import google.generativeai as genai
import nltk
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

log_directory = "backend"
os.makedirs(log_directory, exist_ok=True)  # Ensure the directory exists

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
            "model_name": "gemini-2.0-flash",  # Model name for Gemini
            "api_key": "AIzaSyCnAGC37Feq2-00HINvP8rr40ScK4rt_74",  # Will be updated from config
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

        # Initialize the LLM model
        self._initialize_llm()

        logger.info(f"Initialized AssignmentProcessor with base path: {base_path}")
        logger.info(f"Output directory: {output_dir}")

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
            return ""

        text = []

        try:
            # Open the PDF
            doc = fitz.open(pdf_path)

            # For both typed PDFs, we extract text directly from PyMuPDF
            # For handwritten PDFs in a real scenario, you would use Google Cloud Vision or similar
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                page_text = page.get_text()
                text.append(page_text)

            # Clean up and combine all extracted text
            full_text = "\n".join(text)

            # Post-processing to clean up text
            full_text = self._clean_text(full_text)

            return full_text

        except Exception as e:
            logger.error(f"Error extracting text from {pdf_path}: {str(e)}")
            self.stats["errors"] += 1
            return ""

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
            sentences = re.split(r'[.!?]+', text)
            sentences = [s.strip() for s in sentences if s.strip()]
            
            # Simple word counting
            words = text.split()
            
            # Calculate basic metrics
            if len(sentences) == 0 or len(words) == 0:
                readability_score = 0
                avg_sentence_length = 0
            else:
                avg_sentence_length = len(words) / len(sentences)
                # Simplified readability score based on average sentence length
                readability_score = 100 - min(avg_sentence_length * 1.5, 50)
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

            return {
                "word_count": len(words),
                "sentence_count": len(sentences),
                "average_sentence_length": avg_sentence_length,
                "readability_score": readability_score,
                "estimated_quality": quality
            }

        except Exception as e:
            logger.error(f"Error analyzing text: {str(e)}")
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
            with open(cache_file, 'r', encoding='utf-8') as f:
                return f.read()

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

        cache_key = self._get_cache_key(prompt)
        cache_file = os.path.join(self.config["cache_dir"], f"{cache_key}.txt")

        with open(cache_file, 'w', encoding='utf-8') as f:
            f.write(response)

    def _initialize_llm(self):
        """
        Initialize the Gemini model
        """
        try:
            # Verify API key is available
            if not self.config.get("api_key"):
                logger.error("Gemini API key is required but not provided")
                raise ValueError("API key is required for Gemini")

            # Configure the Gemini API with the provided key
            genai.configure(api_key=self.config["api_key"])

            # Set the model name
            model_name = self.config.get("model_name", "gemini-2.0-flash")
            
            # Initialize the Gemini model
            self.model = genai.GenerativeModel(model_name)

            logger.info(f"Gemini model initialized: {model_name}")
        
        except Exception as e:
            logger.error(f"Error initializing Gemini model: {str(e)}")
            raise

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
                return "Error: No valid LLM response"

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
            return f"Error evaluating assignment: {str(e)}"

    def parse_evaluation(self, evaluation_text):
        """
        Parse evaluation text to extract structured data
        """
        # Handle empty input
        if not evaluation_text or evaluation_text.strip() == "":
            logger.warning("Empty evaluation text received")
            return {
                'grade': 0,
                'summary': "No evaluation available.",
                'strengths': [],
                'areas_for_improvement': [],
                'specific_feedback': "No specific feedback generated.",
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

        # Extract grade using multiple patterns
        grade_patterns = [
            r'Grade\s*[:]\s*(\d+)',
            r'(\d+)\s*/\s*100',
            r'Grade\s*[-:]\s*(\d+)'
        ]

        for pattern in grade_patterns:
            match = re.search(pattern, evaluation_text, re.IGNORECASE)
            if match:
                try:
                    grade = int(match.group(1))
                    result['grade'] = min(max(grade, 0), 100)  # Clamp between 0-100
                    break
                except Exception as e:
                    logger.warning(f"Grade extraction failed: {e}")

        # Extract sections using patterns
        sections = {
            'summary': r'Summary\s*[:]\s*(.?)(?=\n\s(?:Key )?Strengths\s*:|$)',
            'strengths': r'(?:Key )?Strengths\s*[:]\s*(.?)(?=\n\s(?:Areas|Improvement)\s*:|$)',
            'areas_for_improvement': r'(?:Areas|Improvement)\s*[:]\s*(.?)(?=\n\s(?:Specific|Feedback)\s*:|$)',
            'specific_feedback': r'(?:Specific|Feedback)\s*[:]\s*(.?)(?=\n\s(?:Personalized|Learning|Plan)\s*:|$)',
            'personalized_learning_plan': r'(?:Personalized|Learning|Plan)\s*[:]\s*(.*?)(?=$)'
        }

        for section, pattern in sections.items():
            match = re.search(pattern, evaluation_text, re.DOTALL | re.IGNORECASE)
            if match:
                content = match.group(1).strip()
                if section in ['strengths', 'areas_for_improvement', 'personalized_learning_plan']:
                    # Extract list items using bullet points, numbers, or hyphens
                    items = re.split(r'\n\s*[-•\d]+\.?\s', '\n' + content)
                    result[section] = [
                        item.strip() for item in items
                        if item.strip() and len(item.strip()) > 3
                    ]
                else:
                    result[section] = content

        # Fallback for summary if it's empty
        if not result['summary']:
            result['summary'] = "Detailed evaluation summary could not be automatically extracted."

        logger.info(f"Parsed Evaluation: Grade = {result['grade']}")
        return result

    def generate_student_report(self, document_name, assignment_type, text_analysis, evaluation_data):
        """
        Generate a formatted report for a student

        Args:
            document_name (str): Name of the document
            assignment_type (str): Type of assignment ('typed' or 'handwritten')
            text_analysis (dict): Analysis of the text
            evaluation_data (dict): Parsed evaluation data

        Returns:
            str: Formatted markdown report for the student
        """
        # Handle missing keys with default values
        grade = evaluation_data.get('grade', 0)
        summary = evaluation_data.get('summary', "No summary available.")
        strengths = evaluation_data.get('strengths', [])
        areas_for_improvement = evaluation_data.get('areas_for_improvement', [])
        specific_feedback = evaluation_data.get('specific_feedback', "No specific feedback available.")
        personalized_learning_plan = evaluation_data.get('personalized_learning_plan', [])

        # Format the report as markdown
        report = f"""# Assignment Evaluation Report

## Document: {document_name}
Type: {assignment_type}
Date: {datetime.now().strftime('%Y-%m-%d')}

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

        # Add strengths
        if strengths:
            for strength in strengths:
                report += f"- {strength}\n"
        else:
            report += "- No specific strengths identified.\n"

        report += "\n## Areas for Improvement\n"

        # Add areas for improvement
        if areas_for_improvement:
            for area in areas_for_improvement:
                report += f"- {area}\n"
        else:
            report += "- No specific areas for improvement identified.\n"

        report += f"\n## Specific Feedback\n{specific_feedback}\n\n"

        report += "## Personalized Learning Plan\n"

        # Add personalized learning plan
        if personalized_learning_plan:
            for item in personalized_learning_plan:
                report += f"- {item}\n"
        else:
            report += "- No personalized learning plan available.\n"

        return report

    def process_assignment(self, doc_name, doc_info):
        """
        Process a single assignment
        
        Args:
            doc_name (str): Name of the document
            doc_info (dict): Dictionary containing document metadata
            
        Returns:
            tuple: (text_analysis, parsed_evaluation, report_path)
        """
        # Define path for extracted text file
        text_output_path = os.path.join(self.output_dir, "extracted_text", f"{doc_name}.txt")
        
        # Check if extracted text file already exists
        if os.path.exists(text_output_path):
            logger.info(f"Using previously extracted text for {doc_name}")
            with open(text_output_path, 'r', encoding='utf-8') as f:
                extracted_text = f.read()
        else:
            # Extract text from PDF if not already done
            logger.info(f"Extracting text from {doc_name} ({doc_info['type']})")
            extracted_text = self.extract_text_from_pdf(doc_info['pdf_path'], doc_info['type'])
            
            # Save extracted text
            with open(text_output_path, 'w', encoding='utf-8') as f:
                f.write(extracted_text)
        
        # Analyze text
        text_analysis = self.analyze_text(extracted_text)
        
        # Create evaluation prompt
        prompt = self.create_evaluation_prompt(extracted_text, text_analysis)
        
        # Evaluate with LLM
        evaluation = self.evaluate_with_llm(prompt)
        
        # Parse evaluation
        parsed_evaluation = self.parse_evaluation(evaluation)
        
        # Generate report
        report = self.generate_student_report(
            doc_name,
            doc_info['type'],
            text_analysis,
            parsed_evaluation
        )
        
        # Save report
        report_path = os.path.join(self.output_dir, "reports", f"{doc_name}_report.md")
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)
        
        return text_analysis, parsed_evaluation, report_path