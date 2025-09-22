from datetime import date, timedelta
from .db import SessionLocal, Base, engine
from .models import Movie

def last_wednesday(d: date) -> date:
    return d - timedelta(days=(d.weekday() - 2) % 7)

def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    lw = last_wednesday(date.today())
    items = [
        Movie(
            title="Eau & Feu",
            description="Drame franco-belge.",
            age_min=12,
            is_favorite=True,
            rating=4.2,
            poster_url="https://via.placeholder.com/600x800?text=Eau+%26+Feu",
            date_added=lw,
        ),
        Movie(
            title="Rires du Soir",
            description="Comédie.",
            age_min=0,
            is_favorite=False,
            rating=3.8,
            poster_url="https://via.placeholder.com/600x800?text=Rires+du+Soir",
            date_added=lw,
        ),
    ]
    db.query(Movie).delete()   # reset simple
    for it in items:
        db.add(it)
    db.commit()
    db.close()
    print("Seed OK avec date dernier mercredi:", lw)

if __name__ == "__main__":
    run()
