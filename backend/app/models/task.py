from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Text, DateTime, Boolean, ForeignKey

from . import db

class Task( db.Model ):
    __tablename__ = "task"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(Text)
    due_date: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    priority: Mapped[str] = mapped_column(String(20))
    tags: Mapped[str] = mapped_column(String(100))
    is_done: Mapped[bool] = mapped_column(Boolean, default=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="tasks")
