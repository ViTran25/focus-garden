import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "./assets/logo.jpg";
import { createContext, useEffect, useRef, useState } from "react";
import useToken from "./useToken";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const AppContext = createContext({
  token: "",
  setToken: () => {},
  playSound: () => {},
  pauseSound: () => {},
  stopSound: () => {},
});

function App() {
  // Token for authorization
  const { token, setToken } = useToken();

  // isActive for Nav-burger
  const [isActive, setIsActive] = useState(false);

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
    <div>
      <section
        className="hero has-background-success is-fullheight"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="hero-head has-background-success-light">
          <nav className="navbar ">
            <div className="navbar-brand ">
              <Link to="">
                <figure className="image is-64x64 m-2">
                  <img src={logo} className="is-rounded" alt="Logo" />
                </figure>
              </Link>

              <a
                role="button"
                className="navbar-burger burger"
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
              >
                <div className="navbar-start">
                  {token ? (
                    <>
                      <Link
                        to="dashboard"
                        className="navbar-item has-text-success-25"
                      >
                        <strong>Dashboard</strong>
                      </Link>
                      <Link
                        to="tasks"
                        className="navbar-item has-text-success-25"
                      >
                        <strong>Tasks</strong>
                      </Link>
                      <Link
                        to="pomodoro"
                        className="navbar-item has-text-success-25"
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
                            className="button is-primary is-danger"
                          >
                            Log Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="signup"
                            className="button is-primary is-normal"
                          >
                            <strong>Sign Up</strong>
                          </Link>
                          <Link
                            to="login"
                            className="button is-success is-light is-normal"
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

        <div className="hero-body">
          <div className="container">
            <AppContext.Provider
              value={{ token, setToken, playSound, pauseSound, stopSound }}
            >
              <Outlet />
            </AppContext.Provider>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
