# Cinephoria

Mini app vitrine **Angular 19 (standalone)** + **FastAPI** + **SQLite**.

## Démarrage rapide

### Prérequis
- Node 20 + npm  
- Python 3.9+ (venv)  
- macOS / Linux

### Installation

    # Cloner
    git clone https://github.com/Fannytau/cinephoria.git
    cd cinephoria

    # Backend (Python)
    /usr/bin/python3 -m venv .venv
    source .venv/bin/activate
    pip install --upgrade pip
    pip install "fastapi[standard]" "uvicorn[standard]" "sqlalchemy>=2.0" python-dotenv passlib bcrypt

    # Seed de démo (si besoin)
    python -c "from backend.app.seed import run; run()"

    # Frontend (Angular)
    cd cinephoria-web
    npm ci || npm install
    cd ..

### Lancer en dev

Dans **2 terminaux** :

    # Terminal A (backend)
    ./run-back.sh

    # Terminal B (frontend)
    ./run-front.sh

- API : http://127.0.0.1:8000/docs  
- Front : http://localhost:4200/

## Fonctionnalités
- **/movies** : liste + filtres (`q`, `min_rating`, `fav_only`)  
- **/reservations** : POST (form Réservation branché)  
- **/contact** : POST (form Contact branché)

## Structure

    backend/
      app/
        main.py        # endpoints FastAPI
        models.py      # SQLAlchemy
        schemas.py     # Pydantic
        db.py          # engine/session
        seed.py        # données de démo
    cinephoria-web/     # Angular (standalone components)

## Scripts utiles
- `./run-back.sh` — lance le backend (uvicorn --reload)  
- `./run-front.sh` — lance l’Angular dev server

