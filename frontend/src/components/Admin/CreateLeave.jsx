import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../../components/CreateForm";
import Navbar from "../Navbar";

const CreateLeave = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
    status: "Pending", // Default status
  });

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentDivision, setCurrentDivision] = useState(null); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedEmployee = employees.find(
        (employee) => employee._id === formData.employee_id
      );

      if (!selectedEmployee) {
        alert("Pegawai tidak ditemukan.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/api/leave`,
        formData
      );

      if (response.status === 200) {
        alert("Data cuti berhasil ditambahkan");
        console.log("Data berhasil dikirim:", response.data);
      } else {
        console.error("Gagal menambahkan data cuti:", response.data);
      }

      setFormData({
        employee_id: "",
        start_date: "",
        end_date: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    }
  };

  useEffect(() => {
    const storedDivision = localStorage.getItem("division_name");
    setCurrentDivision(storedDivision);

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/employee`
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Gagal mengambil data pegawai:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (currentDivision && employees.length > 0) {
      const filtered = employees.filter(
        (employee) =>
          employee.employee_division &&
          employee.employee_division.division_name === currentDivision
      );
      setFilteredEmployees(filtered);
    }
  }, [currentDivision, employees]);

  const fields = [
    {
      label: "Pegawai",
      name: "employee_id",
      type: "select",
      required: true,
      options: filteredEmployees.map((employee) => ({
        value: employee._id,
        label: `${employee.employee_nrp} - ${employee.employee_name}`,
      })),
    },
    {
      label: "Tanggal Mulai",
      name: "start_date",
      type: "date",
      required: true,
    },
    {
      label: "Tanggal Selesai",
      name: "end_date",
      type: "date",
      required: true,
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      required: true,
      options: [
        { value: "Pending", label: "Pending" },
        { value: "Approved", label: "Approved" },
        { value: "Rejected", label: "Rejected" },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="w-full flex flex-col items-center">
        <CreateForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          fields={fields}
        />
      </div>
    </div>
  );
};

export default CreateLeave;
