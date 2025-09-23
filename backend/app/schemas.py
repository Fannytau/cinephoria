from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime

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

class ReservationIn(BaseModel):
    name: str = Field(min_length=2, max_length=60)
    email: EmailStr
    movie: str
    date: date
    seats: int = Field(ge=1, le=10)

class ReservationOut(ReservationIn):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=60)
    email: EmailStr
    message: str = Field(min_length=10, max_length=1000)

class ContactOut(ContactIn):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True
