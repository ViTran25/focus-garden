import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "./assets/logo.jpg";
import { useState } from "react";

function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <section className="hero has-background-success is-fullheight">
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
                  <Link
                    to="dashboard"
                    className="navbar-item has-text-success-25"
                  >
                    <strong>Dashboard</strong>
                  </Link>
                  <Link to="tasks" className="navbar-item has-text-success-25">
                    <strong>Tasks</strong>
                  </Link>
                </div>

                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons ">
                      <Link to="signup" className="button is-primary is-normal">
                        <strong>Sign Up</strong>
                      </Link>
                      <Link
                        to="login"
                        className="button is-success is-light is-normal"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
