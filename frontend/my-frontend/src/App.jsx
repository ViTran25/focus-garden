import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "./assets/logo.jpg";
import { createContext, useEffect, useRef, useState } from "react";
import useToken from "./useToken";
import "@fortawesome/fontawesome-free/css/all.min.css";
import imageList from "./backgroundImages.js";

export const AppContext = createContext({
  token: "",
  setToken: () => {},
  playSound: () => {},
  pauseSound: () => {},
  stopSound: () => {},
  API_URL: "",
});

function App() {
  // Token for authorization
  const { token, setToken } = useToken();
  const API_URL = import.meta.env.VITE_API_URL;

  // isActive for Nav-burger
  const [isActive, setIsActive] = useState(false);

  // Background Image managing
  const getDailyIndex = (seedArray) => {
    const today = new Date();
    const daySeed =
      today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDay();
    return daySeed % seedArray.length;
  };
  const dailyImage = imageList[getDailyIndex(imageList)];

  // Sound managing
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/rain.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 1;
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${dailyImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <section
        className="hero is-fullheight"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="hero-head">
          <nav className="navbar">
            <div className="navbar-brand ">
              <Link to="">
                <figure className="image is-64x64 m-2">
                  <img src={logo} className="is-rounded" alt="Logo" />
                </figure>
              </Link>

              <a
                role="button"
                className={`navbar-burger burger ${
                  isActive ? "is-active" : ""
                } has-text-light`}
                aria-label="menu"
                aria-expanded="false"
                data-target="navMenu"
                onClick={() => setIsActive(!isActive)}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div className="container">
              <div
                className={`navbar-menu ${isActive ? "is-active" : ""}`}
                id="navMenu"
                style={{ textShadow: "0px 0px 5px #323634ff" }}
              >
                <div className="navbar-start">
                  {token ? (
                    <>
                      <Link
                        to="dashboard"
                        className="navbar-item has-text-light"
                        onClick={() => setIsActive(!isActive)}
                      >
                        <strong>Dashboard</strong>
                      </Link>
                      <Link
                        to="tasks"
                        className="navbar-item has-text-light"
                        onClick={() => setIsActive(!isActive)}
                      >
                        <strong>Tasks</strong>
                      </Link>
                      <Link
                        to="pomodoro"
                        className="navbar-item has-text-light"
                        onClick={() => setIsActive(!isActive)}
                      >
                        <strong>Focus Mode</strong>
                      </Link>
                    </>
                  ) : null}
                </div>

                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons ">
                      {token ? (
                        <>
                          <button
                            onClick={() => setToken({ access_token: null })}
                            className="button is-outlined is-rounded is-danger is-small"
                            style={{ backdropFilter: "blur(5px)" }}
                          >
                            Log Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="signup"
                            className="button is-primary is-outlined is-rounded"
                            style={{ backdropFilter: "blur(5px)" }}
                          >
                            <strong>Sign Up</strong>
                          </Link>
                          <Link
                            to="login"
                            className="button is-light is-outlined is-rounded"
                            style={{ backdropFilter: "blur(5px)" }}
                          >
                            Login
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/*Main page section*/}
        <div className="hero-body">
          <AppContext.Provider
            value={{
              token,
              setToken,
              playSound,
              pauseSound,
              stopSound,
              API_URL,
            }}
          >
            <Outlet />
          </AppContext.Provider>
        </div>

        {/*Background Image Credit section*/}
        <div
          className="has-text-light is-size-7"
          style={{
            position: "fixed",
            bottom: "0.2rem",
            left: "0.5rem",
            backgroundColor: "transparent",
            textShadow: "0px 0px 5px #19241cff",
          }}
        >
          <p>
            Photo by{" "}
            <a
              href={dailyImage.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f3f4f6", textDecoration: "underline" }}
            >
              {dailyImage.credit}
            </a>{" "}
            on{" "}
            <a
              href={dailyImage.picLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f3f4f6", textDecoration: "underline" }}
            >
              {dailyImage.from}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
