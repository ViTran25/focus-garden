import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Pomodoro() {
  // Get token
  const { token, playSound, pauseSound, stopSound } = useContext(AppContext);

  const [time, setTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(null);
  const [scale, setScale] = useState(1);
  const [dailyTime, setDailyTime] = useState(0);
  const [sessionType, setSessionType] = useState("focus"); // "focus" or "break"
  let elapsed = 0;
  const durations = {
    focus: 10, // 25 minutes
    break: 5, // 5 minutes
  };

  // Fetching Functions----------------------------
  const getSession = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/pomodoro/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getDailyMinutes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/pomodoro/daily", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      console.log(data.total);
      setDailyTime((prev) => prev + data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const startFetch = async (type, duration) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/pomodoro/start", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          session_type: type,
          duration: duration,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      console.log(
        `New sessiond. Id: ${data.session_id}, Type: ${sessionType}, duration: ${durations[sessionType]}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const endFetch = async (id, duration) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/pomodoro/end/${id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ duration: duration }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pauseOrResumeFetch = async (id, action, time) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/pomodoro/${action}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ time: time }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelFetch = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/pomodoro/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // --------------------------------------
  // Function for counting down the clock
  const startCountdown = (sessionId) => {
    if (intervalId) return;

    let newIntervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(newIntervalId);
          setIntervalId(null);
          setIsActive(false);

          // Notify backend that session ended
          endFetch(sessionId, durations[sessionType]).then(() => {
            // Auto-start break if focus ended
            const nextType = sessionType === "focus" ? "break" : "focus";
            setSessionType(nextType);
          });
          setScale(1);
          stopSound();

          return 0;
        }
        return prevTime - 1;
      });

      elapsed += 1;
      // Every 1 minute, increment dailyTime
      if (elapsed % 60 === 0) {
        setDailyTime((prev) => prev + 1);
      }
    }, 1000);
    setIntervalId(newIntervalId);
  };

  // Functions for sessions---------------------------
  const startSession = async () => {
    if (isActive || intervalId) return;

    startRef.current = true;

    try {
      const duration = durations[sessionType];
      const data = await startFetch(sessionType, duration);
      setSessionId(data.session_id);
      setTime(duration); // 25 minutes session
      startCountdown(data.session_id);
      setIsActive(true);
      setScale(1.3);
      if (sessionType === "focus") playSound();
    } catch (err) {
      console.log("Failed to start session:", err);
    }
  };

  const pauseSession = (id) => {
    pauseOrResumeFetch(id, "pause", durations[sessionType] - time);
    clearInterval(intervalId);
    setIntervalId(null);
    setIsPaused(true);
    setPauseTime(Date.now());
    pauseSound();
  };

  const resumeSession = async (id) => {
    const timeBetween = Math.floor((Date.now() - pauseTime) / 1000);
    pauseOrResumeFetch(id, "resume", timeBetween);
    startCountdown(sessionId);
    setIsPaused(false);
    if (sessionType === "focus") playSound();
  };

  const stopSession = (id) => {
    cancelFetch(id);
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
    setIsPaused(false);
    setIsActive(false);
    setScale(1);
    stopSound();
    startRef.current = false;
    setSessionType("focus");
  };

  // Fetching active session when refreshing the page
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    async function fetchActiveSession() {
      const session = await getSession();
      if (!session?.session_id || intervalId) return;

      setSessionId(session.session_id);
      const duration = durations[session.session_type] || "focus";
      setSessionType(session.session_type || "focus");
      setTime(duration - session.time);
      setIsActive(true);
      setScale(1.3);

      if (session.last_pause) {
        const lastPauseTime = new Date(session.last_pause).getTime();
        setPauseTime(lastPauseTime);
      }

      if (session.status === "active") {
        startCountdown(session.session_id);
      }

      setIsPaused(session.status !== "active");
      setDailyTime((prev) => prev + Math.floor(session.time / 60));
    }

    getDailyMinutes();
    fetchActiveSession();
  }, []);

  // Auto-start break session after a focus session ended
  const startRef = useRef(false);
  useEffect(() => {
    if (startRef.current == true) {
      startSession();
    }
  }, [sessionType]);

  // Variable for the display
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  const progress =
    ((durations[sessionType] - time) / durations[sessionType]) * 100;

  return (
    <div>
      {/* Stop Button at Top */}
      <div
        className="has-text-centered mb-6"
        style={{
          height: "10px",
          position: "relative",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {isActive && (
          <button
            className="button is-small is-light is-danger"
            onClick={() => stopSession(sessionId)}
          >
            Stop
          </button>
        )}
        <p
          className="is-size-4 has-text-light has-text-right has-text-weight-semibold"
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          {dailyTime}m
        </p>
      </div>

      {/* Main Timer Section */}
      <section
        className="section is-flex 
      is-flex-direction-column 
      is-align-items-center is-justify-content-center"
        style={{ position: "relative" }}
      >
        <p
          className="is-size-5 has-text-light has-text-weight-semibold"
          style={{ position: "absolute", top: 100 }}
        >
          {sessionType === "focus" ? "Focus" : "Break"}
        </p>
        {/* Progress Bar */}
        <div
          className="containter has-text-centered mb-6"
          style={{
            width: 300,
            height: 300,
            transform: `scale(${scale})`,
            transition: "transform 0.5s ease-in-out",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <CircularProgressbar
            value={progress}
            text={`${minutes < 10 ? "0" + minutes : minutes} :
            ${seconds < 10 ? "0" + seconds : seconds}`}
            strokeWidth={3}
            styles={buildStyles({
              textSize: "25px",
              textColor: "#e4fae4ff",
              pathColor: "#eaf5eeff",
              trailColor: "rgba(255, 255, 255, 0.3)",
              rotation: 0.625,
              pathTransitionDuration: 0.5,
              backgroundColor: "transparent",
            })}
            circleRatio={0.75}
          />
        </div>

        {/* Buttons below the timer */}
        <div
          className="buttons"
          style={{
            position: "absolute",
            bottom: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {isActive ? null : (
            <button className="button is-info is-medium" onClick={startSession}>
              Focus
            </button>
          )}
          {!isActive ? null : isPaused ? (
            <button
              className="button has-background-success-45"
              onClick={() => resumeSession(sessionId)}
            >
              Resume
            </button>
          ) : (
            <button
              className="button is-warning"
              onClick={() => pauseSession(sessionId)}
            >
              Pause
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default Pomodoro;
