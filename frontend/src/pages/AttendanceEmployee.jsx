import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AttendanceEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const currentDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/employee`
        );
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEmployees();
  }, []);

  const fetchAttendanceData = async (employeeId, year, month) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/attendance/${employeeId}/${year}/${month}`
      );
      const attendanceMap = {};
      response.data.forEach((attendance) => {
        const day = new Date(attendance.date).getDate();
        attendanceMap[day] = attendance.status;
      });
      setAttendanceData((prevState) => ({
        ...prevState,
        [employeeId]: attendanceMap,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = (employeeId, status, day) => {
    setAttendanceData((prevState) => ({
      ...prevState,
      [employeeId]: {
        ...prevState[employeeId],
        [day]: status,
      },
    }));
  };

  const saveAttendance = async () => {
    try {
      const allChanges = [];
      for (const employeeId in attendanceData) {
        const statusData = attendanceData[employeeId];
        for (const day in statusData) {

          const date = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            day
          );

          allChanges.push({
            employee_id: employeeId,
            status: statusData[day],
            date: date.toISOString(),
          });
        }
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_PORT}/api/attendance/bulk-update`,
        {
          attendance: allChanges,
        }
      );
      alert("Data absensi berhasil diperbarui!");

      fetchAllAttendanceData();
    } catch (error) {
      console.error(
        "Error saving attendance:",
        error.response?.data || error.message
      );
      console.log("Sending attendance data:", allChanges);

      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const fetchAllAttendanceData = async () => {
    try {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1; // Bulan 1-12
      for (const employee of employees) {
        await fetchAttendanceData(employee._id, year, month);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const tableData = employees.map((employee) => {
      let presentDays = 0;
      let sickDays = 0;
      let leaveDays = 0;
      let alphaDays = 0;

      Array.from({ length: currentDay }).forEach((_, index) => {
        const day = index + 1;
        const status = attendanceData[employee._id]?.[day] || "Alpha";

        if (status === "Present") presentDays++;
        else if (status === "Sick") sickDays++;
        else if (status === "Leave") leaveDays++;
        else if (status === "Alpha") alphaDays++;
      });

      const attendancePercentage = ((presentDays / currentDay) * 100).toFixed(
        0
      );

      return [
        employee.employee_name,
        presentDays,
        sickDays,
        leaveDays,
        alphaDays,
        `${attendancePercentage}%`,
      ];
    });

    doc.autoTable({
      head: [
        [
          "Nama",
          "Jumlah Hadir",
          "Jumlah Sakit",
          "Jumlah Izin",
          "Jumlah Alpha",
          "Persentase Kehadiran",
        ],
      ],
      body: tableData,
    });

    doc.save("attendance_report.pdf");
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-4">Tabel Absensi</h1>
      <button className="btn btn-primary mt-4" onClick={saveAttendance}>
        Perbarui
      </button>
      <button className="btn btn-success mt-4 ml-4" onClick={downloadPDF}>
        Unduh PDF
      </button>
      <table className="table w-full border border-base-300">
        <thead className="bg-base-200 sticky top-0 text-center">
          <tr>
            <th className="bg-base-300 sticky left-0 z-10">Nama</th>
            {Array.from({ length: currentDay }).map((_, index) => (
              <th key={index + 1}>{index + 1}</th>
            ))}
            <th className="bg-base-300">Persentase Kehadiran</th>{" "}
            {/* Kolom status */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            let presentDays = 0;

            return (
              <tr key={employee._id}>
                <td className="bg-base-100 sticky left-0 z-10">
                  {employee.employee_name}
                </td>
                {Array.from({ length: currentDay }).map((_, index) => {
                  const day = index + 1;
                  const status = attendanceData[employee._id]?.[day] || "Alpha";

                  if (status === "Present") presentDays++;

                  const isDateInThePast = day <= currentDate.getDate();

                  return (
                    <td key={day} className="text-center">
                      <select
                        className={`select select-bordered w-full ${
                          status === "Present"
                            ? "bg-green-500"
                            : status === "Sick"
                            ? "bg-yellow-300"
                            : status === "Leave"
                            ? "bg-blue-500"
                            : "bg-red-900"
                        }`}
                        style={{ minWidth: "120px", color: "white" }}
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(employee._id, e.target.value, day)
                        }
                        disabled={!isDateInThePast}
                      >
                        <option value="Present">Hadir</option>
                        <option value="Sick">Sakit</option>
                        <option value="Leave">Izin</option>
                        <option value="Alpha">Alpha</option>
                      </select>
                    </td>
                  );
                })}
                <td className="text-center">
                  {(() => {
                    const attendancePercentage =
                      (presentDays / currentDay) * 100;
                    return `${attendancePercentage.toFixed(0)}%`;
                  })()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceEmployee;
