import React, { useState } from "react";

const LoginForm = ({
  initialUsername = "",
  initialPassword = "",
  onSubmit,
  role,
  setUsername,
  setPassword,
  message,
}) => {
  const [username, setLocalUsername] = useState(initialUsername);
  const [password, setLocalPassword] = useState(initialPassword);

  const handleUsernameChange = (e) => {
    setLocalUsername(e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setLocalPassword(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="text-white card-title justify-center font-bold mt-5">LOGIN {role}</h2>
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Masukkan username"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Masukkan password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
