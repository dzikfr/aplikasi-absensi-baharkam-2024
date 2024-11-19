import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../../components/CreateForm";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    admin_username: "",
    admin_password: "",
    admin_division: "",
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
        `${import.meta.env.VITE_BACKEND_PORT}/api/admin/register`,
        formData
      );

      if (response.status === 200) {
        alert("Data admin berhasil ditambahkan");
        console.log("Data berhasil dikirim:", response.data);
      } else {
        console.error("Gagal menambahkan data admin:", response.data);
      }

      setFormData({
        admin_username: "",
        admin_password: "",
        admin_division: "",
      });

      navigate("/master");
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
    { label: "Admin Username", name: "admin_username", type: "text", required: true },
    { label: "Admin Password", name: "admin_password", type: "text", required: true },
    {
      label: "Divisi",
      name: "admin_division",
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

export default CreateAdmin;
