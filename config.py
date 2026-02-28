import os

class Config:
    # Gemini key for Google Generative AI
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    # other configuration values can go here
