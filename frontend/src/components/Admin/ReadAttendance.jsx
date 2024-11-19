import React, { useState, useEffect } from "react";
import axios from "axios";

const ReadAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/employee`
        );
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getEmployees();
  }, []);

  const handleAttendanceChange = (id, field, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const formattedData = Object.entries(attendanceData).map(
        ([id, data]) => ({
          employee_id: id,
          status: data.present ? "Present" : data.status || "Absent",
        })
      );

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/api/attendance`,
        formattedData // Kirimkan array data
      );

      if (response.status === 201) {
        alert("Data kehadiran berhasil disimpan.");
      }
    } catch (err) {
      console.error(
        "Error saat menyimpan data:",
        err.response?.data?.message || err.message
      );
      alert("Terjadi kesalahan saat menyimpan data kehadiran.");
    }
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold text-center mb-6 pt-3">
        Kehadiran Pegawai
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">NIP</th>
            <th className="border border-gray-300 px-4 py-2">Nama</th>
            <th className="border border-gray-300 px-4 py-2">Pangkat</th>
            <th className="border border-gray-300 px-4 py-2">Jabatan</th>
            <th className="border border-gray-300 px-4 py-2">Divisi</th>
            <th className="border border-gray-300 px-4 py-2">Hadir</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="border border-gray-300 px-4 py-2">
                {employee.employee_nrp}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.employee_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.employee_rank}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.employee_position}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.employee_division?.division_name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={attendanceData[employee._id]?.present || false}
                  onChange={(e) =>
                    handleAttendanceChange(
                      employee._id,
                      "present",
                      e.target.checked
                    )
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={attendanceData[employee._id]?.status || "Alpha"}
                  onChange={(e) =>
                    handleAttendanceChange(
                      employee._id,
                      "status",
                      e.target.value
                    )
                  }
                  disabled={attendanceData[employee._id]?.present}
                  className="select select-bordered w-full"
                >
                  <option value="Alpha">Alpha</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button onClick={handleSave} className="btn btn-primary">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default ReadAttendance;
