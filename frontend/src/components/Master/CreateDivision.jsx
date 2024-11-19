import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../../components/CreateForm";

const CreateDivison = () => {
  const [formData, setFormData] = useState({
    division_id: "",
    division_name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/api/division`,
        formData
      );

      if (response.status === 200) {
        alert("Data divisi berhasil ditambahkan");
        console.log("Data berhasil dikirim:", response.data);
      } else {
        console.error("Gagal menambahkan data divisi:", response.data);
      }

      setFormData({
        division_id: "",
        division_name: "",
      });

      navigate("/master");
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    }
  };

  const fields = [
    { label: "ID Divisi", name: "division_id", type: "number", required: true },
    { label: "Nama Divisi", name: "division_name", type: "text", required: true },
  ];

  return (
    <div className="justify-center items-center flex">
      <CreateForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  );
};

export default CreateDivison;
