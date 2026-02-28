from fastapi import FastAPI
from pydantic import BaseModel
from firebase_config import db
from datetime import datetime

app = FastAPI()

class CurriculumRequest(BaseModel):
    user_id: str
    title: str
    domain: str
    level: str

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/generate-curriculum")
async def generate_curriculum(data: CurriculumRequest):

    ai_generated = {
        "title": data.title,
        "lectures": [
            {
                "title": "Introduction",
                "content": "Generated lecture content",
                "duration": "2 hours"
            }
        ]
    }

    db.collection("curriculums").add({
        "userId": data.user_id,
        "title": data.title,
        "domain": data.domain,
        "level": data.level,
        "content": ai_generated,
        "createdAt": datetime.utcnow()
    })

    return {
        "message": "Curriculum generated and stored",
        "data": ai_generated
    }