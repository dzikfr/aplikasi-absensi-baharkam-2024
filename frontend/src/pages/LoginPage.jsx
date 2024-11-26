import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/auth/admin/login`, {
        admin_username: adminUsername,
        admin_password: adminPassword,
      });

      if (response.status === 200) {
        const { admin_division } = response.data.admin;
        if (admin_division && admin_division.division_name) {
          localStorage.setItem("division_name", admin_division.division_name);
          navigate("/admin"); // Redirect to admin page
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login gagal, coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md shadow-lg bg-base-200">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Admin Login</h2>
          {errorMessage && (
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan username"
                className="input input-bordered"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="input input-bordered"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
