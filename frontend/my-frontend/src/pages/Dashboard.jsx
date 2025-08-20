import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import quoteList from "../quotes";

function Dashboard() {
  const { token, API_URL } = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [futureTasks, setFutureTasks] = useState([]);
  const [dailyMinutes, setDailyMinutes] = useState(0);
  const [completedSesisons, setCompletedSessions] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [hovered, setHovered] = useState(false);

  const fetchTodayTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/today`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      const uncompletedList = data.filter((t) => t.is_done == false);
      const completedList = data.filter((t) => t.is_done == true);
      setTasks(uncompletedList);
      setCompletedTasks(completedList.length);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const fetchFutureTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/future`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      setFutureTasks(data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getSessionDailyStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/pomodoro/daily`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      setDailyMinutes((prev) => prev + data.total);
      setCompletedSessions(data.sessions);
    } catch (err) {
      console.log(err);
    }
  };

  // Today's stats
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    fetchTodayTasks();
    fetchFutureTasks();
    getSessionDailyStats();
  }, []);

  // Quote of the day
  const getDailyIndex = (seedArray) => {
    const today = new Date();
    const daySeed =
      today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDay();
    return daySeed % seedArray.length;
  };
  const dailyQuote = quoteList[getDailyIndex(quoteList)];

  const panelStyle = {
    backgroundColor: "rgba(15,23,20,0.55)",
    backdropFilter: "blur(6px)",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  const formatDueDate = (dueDateIso) => {
    const now = new Date();
    const target = new Date(dueDateIso + "Z");

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const day = new Date(
      target.getFullYear(),
      target.getMonth(),
      target.getDate()
    );

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.round((day - today) / msPerDay);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1 && diffDays <= 7) {
      return `In ${diffDays} days`;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(day);
  };

  // common transition style
  const transition = "opacity 0.2s ease, transform 0.2s ease";

  return (
    <div className="container">
      <div
        className="has-text-centered mb-5"
        style={{ textShadow: "0px 0px 10px #19241cff" }}
      >
        <h1 className="title is-size-2 has-text-light">
          What's on your mind today?
        </h1>
      </div>

      {/* Motivational Quote */}
      <div
        className="has-text-centered my-5"
        style={{ textShadow: "0px 0px 10px #19241cff" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p
          className="is-size-5 has-text-light has-text-weight-medium"
          aria-live="polite"
          style={{
            transform: hovered ? "translateY(0px)" : "translateY(4px)",
            transition,
          }}
        >
          {dailyQuote.quote}
        </p>

        <p
          className="is-size-6 has-text-grey-lighter mt-3"
          style={{
            opacity: hovered ? 1 : 0,
            visibility: hovered ? "visible" : "hidden",
            transform: hovered ? "translateY(0)" : "translateY(-4px)",
            transition,
          }}
        >
          {dailyQuote.credit}
        </p>
      </div>

      {/* Sessions Review */}
      <div className="columns">
        <div className="column">
          <div className="box p-5" style={panelStyle}>
            <p className="has-text-grey-light mb-5">Today at a glance</p>
            <div className="content">
              <p className="has-text-light">
                <span className="icon has-text-info mr-2">
                  <i className="fas fa-chart-line"></i>
                </span>
                Focused {dailyMinutes} min
              </p>
              <p className="has-text-light">
                <span className="icon has-text-success mr-2">
                  <i className="fas fa-check-circle"></i>
                </span>
                {completedSesisons} sessions completed
              </p>
              <p className="has-text-light">
                <span className="icon has-text-warning mr-2">
                  <i className="fas fa-fire"></i>
                </span>
                {completedTasks} tasks completed
              </p>
            </div>
          </div>
        </div>

        {/* Tasks Review */}
        <div className="column">
          <div className="box p-5" style={panelStyle}>
            <div className="level">
              <div className="level-left">
                <p className="has-text-grey-light">Next up</p>
              </div>
              <div className="level-right">
                <Link
                  to="/tasks"
                  className="button is-small is-link is-rounded is-light"
                >
                  Open Tasks
                </Link>
              </div>
            </div>
            {tasks.length === 0 ? (
              <p className="has-text-grey-lighter ml-5">No tasks dues today.</p>
            ) : (
              <ul>
                {tasks.map((t) => (
                  <li key={t.id} className="mb-2">
                    <span
                      className={`tag is-rounded ${
                        t.priority === "High"
                          ? "is-danger"
                          : t.priority === "Medium"
                          ? "is-warning"
                          : "is-success"
                      } mr-3`}
                    >
                      {t.priority}
                    </span>
                    <span className="has-text-light">{t.title}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="level mt-5">
              <p className="has-text-grey-light">Upcoming soon (Next 7 days)</p>
            </div>

            {futureTasks.length === 0 ? (
              <p className="has-text-light ml-5">You're all caught up! 🎉</p>
            ) : (
              <ul>
                {futureTasks.map((t) => (
                  <li key={t.id} className="mb-2">
                    <span
                      className={`tag is-rounded ${
                        t.priority === "High"
                          ? "is-danger"
                          : t.priority === "Medium"
                          ? "is-warning"
                          : "is-success"
                      } mr-3`}
                    >
                      {t.priority}
                    </span>
                    <span className="has-text-light">{t.title}</span>
                    <span className="has-text-grey-light is-pulled-right">
                      {formatDueDate(t.due_date)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
