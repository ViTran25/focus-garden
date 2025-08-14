import { useContext, useState } from "react";
import { AppContext } from "../App";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

async function loginUser(credentials) {
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.log(err);
    return "";
  }
}

function Login() {
  // Get props from the App
  const { token, setToken } = useContext(AppContext);

  // States for login information
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Error for wrong credential information
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenResponse = await loginUser({
      username,
      password,
      remember,
    });

    if (!tokenResponse || !tokenResponse.access_token) {
      setError("Invalid username or password");
      return;
    }

    setToken(tokenResponse);
  };

  if (token != null) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h1
        className="title has-text-light"
        style={{ textShadow: "0px 0px 10px #19241cff" }}
      >
        Login
      </h1>
      {error && <div className="notification is-danger">{error}</div>}
      <form
        action=""
        onSubmit={handleSubmit}
        style={{
          backdropFilter: "brightness(60%)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="field has-text-left">
          <label className="label has-text-light" htmlFor="username">
            Username
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="Username"
              required
            />
          </div>
        </div>

        <div className="field has-text-left">
          <label className="label has-text-light" htmlFor="password">
            Password
          </label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div className="field has-text-left">
          <label className="label checkbox has-text-light" htmlFor="remember">
            <input
              type="checkbox"
              name="remember"
              onChange={(e) => setRemember(e.target.checked)}
              id="remember"
            />{" "}
            Remember me
          </label>
        </div>

        <button className="button is-info" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
