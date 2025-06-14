import os

class Config:
    SECRET_KEY = "development key"
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///focus_garden.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "wind-breeze")