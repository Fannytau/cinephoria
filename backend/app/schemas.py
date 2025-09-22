from pydantic import BaseModel
from datetime import date

class MovieOut(BaseModel):
    id: int
    title: str
    description: str
    age_min: int
    is_favorite: bool
    rating: float
    poster_url: str
    date_added: date
    class Config:
        from_attributes = True
