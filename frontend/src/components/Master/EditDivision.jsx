import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditForm from "../EditForm";

const EditDivision = () => {
  const [divId, setDivId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/api/division/${id}`)
      .then((response) => {
        const division = response.data;
        setDivId(division.division_id);
        setName(division.division_name);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDivision = {
      division_id: divId,
      division_name: name,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_PORT}/api/division/${id}`,
        updatedDivision
      )
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/master");
      })
      .catch((error) => {
        console.error("Error updating division:", error);
        alert("Terjadi kesalahan saat memperbarui data.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-base-200 shadow-lg p-6 sm:p-8 w-full sm:w-96 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-baase">
          Edit Divisi
        </h2>

        <EditForm
          label="ID Divisi"
          value={divId}
          onChange={(e) => setDivId(e.target.value)}
          required
        />
        <EditForm
          label="Nama Divisi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-base w-full">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDivision;
