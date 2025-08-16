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
  const [dailyTime, setDailyTime] = useState(0);
  const [sessionType, setSessionType] = useState("focus"); // "focus" or "break"
  const [totalTime, setTotalTime] = useState(1500);
  const [soundPlaying, setSoundPlaying] = useState(false);
  let elapsed = 0;
  const durations = {
    focus: totalTime,
    break: totalTime / 5, // 5 minutes
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
          duration: duration / 60,
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

  const endFetch = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/pomodoro/end/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          endFetch(sessionId).then(() => {
            // Auto-start break if focus ended
            const nextType = sessionType === "focus" ? "break" : "focus";
            setSessionType(nextType);
          });
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
      if (sessionType === "focus") {
        playSound();
        setSoundPlaying(true);
      }
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
    if (sessionType === "focus" && soundPlaying) playSound();
  };

  const stopSession = (id) => {
    cancelFetch(id);
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
    setIsPaused(false);
    setIsActive(false);
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
      setTotalTime(session.duration * 60);
      const duration = session.duration * 60;
      setSessionType(session.session_type || "focus");
      setTime(duration - session.time);
      setIsActive(true);

      if (session.last_pause) {
        const lastPauseTime = new Date(session.last_pause).getTime();
        setPauseTime(lastPauseTime);
      }

      if (session.status === "active") {
        startCountdown(session.session_id);
        if (sessionType === "focus") {
          playSound();
          setSoundPlaying(true);
        }
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
        {!isActive && (
          <div
            className="control has-icons-left"
            style={{ position: "absolute", left: "0", top: "0" }}
          >
            <div className="select is-success is-normal is-rounded">
              <select
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value)}
              >
                <option value={25 * 60}>25</option>
                <option value={50 * 60}>50</option>
              </select>
            </div>
            <div className="icon is-small is-left">
              <i className="fas fa-hourglass-end"></i>
            </div>
          </div>
        )}

        {isActive && (
          <>
            <div style={{ position: "absolute", left: "0", top: "0" }}>
              {soundPlaying ? (
                <button
                  className="button is-small is-dark is-rounded"
                  onClick={() => {
                    pauseSound();
                    setSoundPlaying(false);
                  }}
                  style={{ top: "0.3rem" }}
                  aria-label="stop-sound"
                >
                  <span className="icon">
                    <i className="fas fa-volume-high"></i>
                  </span>
                </button>
              ) : (
                <button
                  className="button is-small is-dark is-rounded"
                  onClick={() => {
                    playSound();
                    setSoundPlaying(true);
                  }}
                  style={{ top: "0.3rem" }}
                  aria-label="stop-sound"
                >
                  <span className="icon">
                    <i className="fas fa-volume-xmark"></i>
                  </span>
                </button>
              )}
            </div>

            <button
              className="button is-small is-dark is-rounded"
              onClick={() => stopSession(sessionId)}
              style={{ top: "0.3rem" }}
              aria-label="Stop"
            >
              <span className="icon">
                <i className="fas fa-stop"></i>
              </span>
            </button>
          </>
        )}
        <p
          className="is-size-4 has-text-light has-text-right has-text-weight-semibold"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            textShadow: "0px 0px 10px #19241cff",
          }}
        >
          {dailyTime}m
        </p>
      </div>

      {/* Main Timer Section */}
      <section
        className="section is-flex 
      is-flex-direction-column 
      is-align-items-center is-justify-content-center"
        style={{ position: "relative", textShadow: "0px 0px 10px #19241cff" }}
      >
        {isActive && (
          <p
            className="is-size-5 has-text-light has-text-weight-semibold"
            style={{ position: "absolute", top: 100 }}
          >
            {sessionType === "focus" ? "Focus" : "Break"}
          </p>
        )}
        {/* Progress Bar */}
        {isActive ? (
          <div
            className="containter has-text-centered mb-6"
            style={{
              width: 300,
              height: 300,
              transform: "scale(1.4)",
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
                textColor: "#ffffff",
                pathColor: "#ffffff",
                trailColor: "rgba(255, 255, 255, 0.3)",
                rotation: 0.625,
                pathTransitionDuration: 0.5,
                backgroundColor: "transparent",
              })}
              circleRatio={0.75}
            />
          </div>
        ) : (
          <div
            className="has-text-centered is-flex is-align-items-center is-justify-content-center"
            style={{
              width: "100%",
              height: 300,
              textShadow: "0px 0px 10px #19241cff",
            }}
          >
            {dailyTime === 0 ? (
              <p className="is-size-3 has-text-light has-text-weight-semibold">
                "The journey of a thousand miles begins with a single step."
              </p>
            ) : dailyTime <= 30 ? (
              <p className="is-size-3 has-text-light has-text-weight-semibold">
                Nice start! You've focused {dailyTime} minutes today.
              </p>
            ) : dailyTime <= 60 ? (
              <p className="is-size-3 has-text-light has-text-weight-semibold">
                You're making great progress! You've focused {dailyTime} minutes
                today.
              </p>
            ) : (
              <p className="is-size-3 has-text-light has-text-weight-semibold">
                That's a deep dive into focus. You've focused {dailyTime}{" "}
                minutes today. You're thriving!
              </p>
            )}
          </div>
        )}

        {/* Buttons below the timer */}
        <div
          className="buttons"
          style={{
            position: "absolute",
            bottom: "4.2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {isActive ? null : (
            <button
              className="button is-info is-medium is-rounded is-outlined"
              onClick={startSession}
              style={{ backgroundColor: "#19241cff" }}
            >
              Focus
            </button>
          )}
          {!isActive ? null : isPaused ? (
            <button
              className="button is-medium is-success is-rounded is-outlined"
              onClick={() => resumeSession(sessionId)}
              style={{ backgroundColor: "#19241cff" }}
              aria-label="resume"
            >
              <span className="icon">
                <i className="fas fa-play"></i>
              </span>
            </button>
          ) : (
            <button
              className="button is-medium is-warning is-rounded is-outlined"
              onClick={() => pauseSession(sessionId)}
              style={{ backgroundColor: "#19241cff" }}
              aria-label="pause"
            >
              <span className="icon">
                <i className="fas fa-pause"></i>
              </span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default Pomodoro;
