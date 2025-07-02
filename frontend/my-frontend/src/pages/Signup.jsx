import { useState } from "react";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ userName, email, password });
  };

  return (
    <div>
      <h1 className="title">Sign Up</h1>
      <form action="">
        <div className="field has-text-left">
          <label className="label" htmlFor="username">
            Username
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={userName}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              placeholder="Username"
              required
            />
          </div>
        </div>

        <div className="field has-text-left">
          <label className="label" htmlFor="email">
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
          <label className="label" htmlFor="password">
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

        <button className="button is-info" type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
