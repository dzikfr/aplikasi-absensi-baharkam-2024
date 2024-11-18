import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../../components/CreateForm";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    employee_nrp: "",
    employee_name: "",
    employee_rank: "",
    employee_position: "",
    employee_division: "",
  });

  const [divisions, setDivisions] = useState([]);

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
        `${import.meta.env.VITE_BACKEND_PORT}/api/employee`,
        formData
      );

      if (response.status === 200) {
        alert("Data pegawai berhasil ditambahkan");
        console.log("Data berhasil dikirim:", response.data);
      } else {
        console.error("Gagal menambahkan data pegawai:", response.data);
      }

      setFormData({
        employee_nrp: "",
        employee_name: "",
        employee_rank: "",
        employee_position: "",
        employee_division: "",
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    }
  };

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/api/division`);
        setDivisions(response.data);
      } catch (error) {
        console.error("Gagal mengambil data divisi:", error);
      }
    };

    fetchDivisions();
  }, []);

  const fields = [
    { label: "NIP", name: "employee_nrp", type: "number", required: true },
    { label: "Nama", name: "employee_name", type: "text", required: true },
    { label: "Pangkat", name: "employee_rank", type: "text", required: true },
    { label: "Jabatan", name: "employee_position", type: "text", required: true },
    {
      label: "Divisi",
      name: "employee_division",
      type: "select",
      required: true,
      options: divisions.map((division) => ({
        value: division._id,
        label: division.division_name,
      })),
    },
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

export default CreateEmployee;
