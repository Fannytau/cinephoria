from sqlalchemy import Column, Integer, String, Float, Boolean, Date, DateTime, func
from .db import Base

class Movie(Base):
    __tablename__ = "movies"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(String, default="")
    age_min = Column(Integer, default=0)
    is_favorite = Column(Boolean, default=False)
    rating = Column(Float, default=0.0)
    poster_url = Column(String, default="")
    date_added = Column(Date, nullable=False)

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(60), nullable=False)
    email = Column(String(120), nullable=False)
    movie = Column(String(150), nullable=False)
    date = Column(Date, nullable=False)
    seats = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

from sqlalchemy import DateTime, func  # (déjà importé plus haut pour Reservation)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(60), nullable=False)
    email = Column(String(120), nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
