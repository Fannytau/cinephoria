from typing import Optional

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, timedelta
from .db import Base, engine, SessionLocal
from .models import Movie, Reservation
from .schemas import MovieOut, ReservationIn, ReservationOut

app = FastAPI(title="Cinephoria API")

# CORS pour Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Init tables
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
def list_movies(
    q: Optional[str] = None,
    min_rating: Optional[float] = None,
    fav_only: Optional[bool] = None,
    added: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Movie)
    if added == "last_wednesday":
        query = query.filter(Movie.date_added == last_wednesday(date.today()))
    if q:
        like = f"%{q.strip()}%"
        query = query.filter(Movie.title.ilike(like))
    if min_rating is not None:
        query = query.filter(Movie.rating >= float(min_rating))
    if fav_only:
        query = query.filter(Movie.is_favorite.is_(True))
    return query.order_by(Movie.id.desc()).all()

@app.post("/reservations", response_model=ReservationOut, status_code=201)
def create_reservation(payload: ReservationIn, db: Session = Depends(get_db)):
    # Pydantic v2 => model_dump()
    r = Reservation(**payload.model_dump())
    db.add(r)
    db.commit()
    db.refresh(r)
    return r
