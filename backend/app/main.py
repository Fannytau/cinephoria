from datetime import date, timedelta
from typing import Optional
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .db import Base, engine, SessionLocal
from .models import Movie, Reservation, ContactMessage
from .schemas import MovieOut, ReservationIn, ReservationOut, ContactIn, ContactOut

app = FastAPI(title="Cinephoria API")

# CORS pour le front
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crée les tables si besoin (inclut ContactMessage)
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

# ----- Movies -----
@app.get("/movies", response_model=list[MovieOut])
def list_movies(
    added: Optional[str] = None,
    q: Optional[str] = None,
    min_rating: Optional[float] = None,
    fav_only: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Movie)
    if added == "last_wednesday":
        query = query.filter(Movie.date_added == last_wednesday(date.today()))
    if q:
        query = query.filter(Movie.title.ilike(f"%{q}%"))
    if min_rating is not None:
        query = query.filter(Movie.rating >= float(min_rating))
    if fav_only:
        query = query.filter(Movie.is_favorite.is_(True))
    return query.order_by(Movie.id.desc()).all()

# ----- Reservations -----
@app.post("/reservations", response_model=ReservationOut, status_code=201)
def create_reservation(payload: ReservationIn, db: Session = Depends(get_db)):
    r = Reservation(**payload.model_dump())
    db.add(r)
    db.commit()
    db.refresh(r)
    return r

# ----- Contact -----
@app.post("/contact", response_model=ContactOut, status_code=201)
def create_contact(payload: ContactIn, db: Session = Depends(get_db)):
    msg = ContactMessage(**payload.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
