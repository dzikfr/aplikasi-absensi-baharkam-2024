import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditForm from "../EditForm"; 

const EditEmployee = () => {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [position, setPosition] = useState("");
  const [division, setDivision] = useState("");
  const [divisions, setDivisions] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/api/employee/${id}`)
      .then((response) => {
        const employee = response.data;
        setNip(employee.employee_nrp);
        setName(employee.employee_name);
        setRank(employee.employee_rank);
        setPosition(employee.employee_position);
        setDivision(employee.employee_division?._id || "");
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
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
    const updatedEmployee = {
      employee_nrp: nip,
      employee_name: name,
      employee_rank: rank,
      employee_position: position,
      employee_division: division,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_PORT}/api/employee/${id}`,
        updatedEmployee
      )
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        alert("Terjadi kesalahan saat memperbarui data.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-base-200 shadow-lg p-6 sm:p-8 w-full sm:w-96 max-w-md my-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-base">Edit Pegawai</h2>
        
        <EditForm label="NIP" value={nip} onChange={(e) => setNip(e.target.value)} required />
        <EditForm label="Nama" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <div className="form-control mb-4">
          <label className="label text-base">Divisi:</label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Pilih Divisi</option>
            {divisions.map((div) => (
              <option key={div._id} value={div._id}>
                {div.division_name}
              </option>
            ))}
          </select>
        </div>

        <EditForm label="Pangkat" value={rank} onChange={(e) => setRank(e.target.value)} required />
        <EditForm label="Jabatan" value={position} onChange={(e) => setPosition(e.target.value)} required />

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-base w-full">Simpan</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
