from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer

from . import db

class User( db.Model ):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(120), unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    tasks: Mapped[list["Task"]] = relationship("Task", back_populates="user")

