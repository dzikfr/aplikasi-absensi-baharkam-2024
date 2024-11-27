import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditForm from "../EditForm";

const EditLeave = () => {
  const [employee, setEmployee] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/api/leave/${id}`)
      .then((response) => {
        const leave = response.data;
        setEmployee(leave.employee_id?.employee_name || "");
        setStart(leave.start_date);
        setEnd(leave.end_date);
        setStatus(leave.status);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/api/employee`)
      .then((response) => {
        const allEmployees = response.data;
        const divisionName = localStorage.getItem("division_name"); 

        if (divisionName) {
          const filteredEmployees = allEmployees.filter(
            (emp) => emp.employee_division?.division_name === divisionName
          );
          setEmployees(filteredEmployees);
        } else {
          setEmployees(allEmployees);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedLeave = {
      employee,
      start,
      end,
      status,
    };

    axios
      .put(`${import.meta.env.VITE_BACKEND_PORT}/api/leave/${id}`, updatedLeave)
      .then(() => {
        alert("Data cuti berhasil diperbarui!");
        navigate("/admin/leaves");
      })
      .catch((error) => {
        console.error("Error updating leave:", error);
        alert("Terjadi kesalahan saat memperbarui data cuti.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-base-200 shadow-lg p-6 sm:p-8 w-full sm:w-96 max-w-md my-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-base">
          Edit Cuti
        </h2>

        <div className="form-control mb-4">
          <label className="label text-base">Pegawai:</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Pilih Pegawai</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employee_name}
              </option>
            ))}
          </select>
        </div>

        <EditForm
          label="Tanggal Mulai"
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <EditForm
          label="Tanggal Berakhir"
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />

        <div className="form-control mb-4">
          <label className="label text-base">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Pilih Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-base w-full">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLeave;
