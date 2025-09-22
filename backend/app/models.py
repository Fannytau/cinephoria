from sqlalchemy import Column, Integer, String, Float, Boolean, Date
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
