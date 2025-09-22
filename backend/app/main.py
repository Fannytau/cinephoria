from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, timedelta
from typing import Optional  # << important pour Python 3.9
from .db import Base, engine, SessionLocal
from .models import Movie
from .schemas import MovieOut

app = FastAPI(title="Cinephoria API")

# Autoriser le front Angular en local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def last_wednesday(today: date) -> date:
    # Monday=0 ... Wednesday=2
    return today - timedelta(days=(today.weekday() - 2) % 7)

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/movies", response_model=list[MovieOut])
def list_movies(added: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Movie)
    if added == "last_wednesday":
        q = q.filter(Movie.date_added == last_wednesday(date.today()))
    return q.order_by(Movie.id.desc()).all()
