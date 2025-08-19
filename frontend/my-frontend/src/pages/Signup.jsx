import { useContext, useState } from "react";
import { AppContext } from "../App";
import { Navigate } from "react-router-dom";

async function signupUser(userInfo) {
  try {
    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    console.log(response.json());
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function Signup() {
  const { token } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signupUser({ username, email, password });
    setSuccess(result);
  };

  if (token != null) {
    return <Navigate to="/dashboard" replace />;
  }

  if (success) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container">
      <h1
        className="title has-text-light"
        style={{ textShadow: "0px 0px 10px #19241cff" }}
      >
        Sign Up
      </h1>
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
          <label className="label has-text-light" htmlFor="email">
            Email
          </label>
          <div className="control">
            <input
              className="input"
              type="email"
              name={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email"
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

        <button className="button is-info" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
