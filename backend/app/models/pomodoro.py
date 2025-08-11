from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Text, DateTime, Boolean, ForeignKey

from . import db

class PomodoroSession( db.Model ):
    __tablename__ = "pomodoro_sesssions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    start_time: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    end_time: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    last_pause: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    duration: Mapped[int] = mapped_column(Integer) # in minutes
    pause_time: Mapped[int] = mapped_column(Integer) # in seconds
    session_type: Mapped[str] = mapped_column(String(20)) # "focus" or "break"
    status: Mapped[str] = mapped_column(String(20), default="active") # "active" or "completed"
