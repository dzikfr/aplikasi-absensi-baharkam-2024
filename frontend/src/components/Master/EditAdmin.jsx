import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditForm from "../EditForm";

const EditAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [division, setDivision] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/api/admin/${id}`)
      .then((response) => {
        const admin = response.data;
        setUsername(admin.admin_username);
        setPassword(admin.admin_password);
        setDivision(admin.admin_division?._id || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/api/division`)
      .then((response) => {
        setDivisions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching divisions:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAdmin = {
      admin_username: username,
      admin_password: password,
      admin_division: division,
    };

    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_BACKEND_PORT}/api/admin/${id}`, updatedAdmin)
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/master");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating admin:", error);
        alert("Terjadi kesalahan saat memperbarui data.");
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-gray-800 shadow-lg p-6 sm:p-8 w-full sm:w-96 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Edit Admin
        </h2>

        <EditForm
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <EditForm
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" // Add type="password" for password masking
          required
        />

        <div className="form-control mb-4">
          <label className="label text-white">Divisi:</label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Pilih Divisi</option>
            {divisions && divisions.length > 0 ? (
              divisions.map((div) => (
                <option key={div._id} value={div._id}>
                  {div.division_name}
                </option>
              ))
            ) : (
              <option disabled>Loading Divisions...</option>
            )}
          </select>
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;
