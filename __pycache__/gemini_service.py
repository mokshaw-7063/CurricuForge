import google.generativeai as genai
from config import Config
import json
import logging
import re

genai.configure(api_key=Config.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')


def generate_curriculum(course_title, domain, level, duration):
    prompt = f"""
Generate a structured academic curriculum in valid JSON format with:
- course_title: {course_title}
- domain: {domain}
- level: {level}
- duration: {duration}
- modules: 6-10 modules

Each module must include:
   - module_title
   - topics (4-6 items)
   - learning_outcomes
   - recommended_tools

Return ONLY valid JSON.
"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        match = re.search(r'\{.*\}', text, re.DOTALL)
        if not match:
            raise ValueError("No valid JSON found in Gemini response")

        curriculum = json.loads(match.group())

        if 'modules' not in curriculum:
            raise ValueError("Missing 'modules' field")

        return curriculum

    except Exception as e:
        logging.error(f"Gemini API error: {e}")
        raise