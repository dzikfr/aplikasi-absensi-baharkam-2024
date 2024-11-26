import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import Navbar from "../components/Navbar";

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

  const divisionName = localStorage.getItem("division_name");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/employee`
        );

        // Filter employees by division_name
        const filteredEmployees = response.data.filter(
          (employee) =>
            employee.employee_division.division_name === divisionName
        );

        setEmployees(filteredEmployees);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEmployees();
  }, [divisionName]);

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
      const month = new Date().getMonth() + 1;
      for (const employee of employees) {
        await fetchAttendanceData(employee._id, year, month);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Tanggal Cetak
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  
    // Nama Bulan Tabel
    const tableMonth = currentDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });
  
    // Tambahkan Header atau Informasi Tanggal Cetak
    doc.setFontSize(12);
    doc.text(`Laporan Kehadiran`, 14, 10); // Judul
    doc.text(`Bulan: ${tableMonth}`, 14, 20); // Bulan tabel
    doc.text(`Tanggal Cetak: ${formattedDate}`, 14, 30); // Tanggal cetak
  
    // Data Tabel
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
  
      const attendancePercentage = ((presentDays / currentDay) * 100).toFixed(0);
  
      return [
        employee.employee_name,
        presentDays,
        sickDays,
        leaveDays,
        alphaDays,
        `${attendancePercentage}%`,
      ];
    });
  
    // Tambahkan Tabel
    doc.autoTable({
      startY: 40, // Mulai setelah header
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
  
    // Simpan PDF
    doc.save(`attendance_report_${tableMonth}.pdf`);
  };
  

  const downloadExcel = () => {
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

      return {
        Nama: employee.employee_name,
        Hadir: presentDays,
        Sakit: sickDays,
        Izin: leaveDays,
        Alpha: alphaDays,
        "Persentase Kehadiran": `${attendancePercentage}%`,
      };
    });

    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kehadiran");

    XLSX.writeFile(wb, "attendance_report.xlsx");
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <Navbar />
      </div>
      <div className="flex gap-4 p-4">
        <button className="btn btn-primary" onClick={saveAttendance}>
          Perbarui
        </button>
        <button className="btn btn-success" onClick={downloadPDF}>
          Unduh PDF
        </button>
        <button className="btn btn-info" onClick={downloadExcel}>
          Unduh Excel
        </button>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table border border-base-300 w-full">
          <thead className="bg-base-200 sticky top-0 text-center">
            <tr>
              <th className="bg-base-300 sticky left-0 z-10">Nama</th>
              {Array.from({ length: currentDay }).map((_, index) => (
                <th key={index + 1}>{index + 1}</th>
              ))}
              <th className="bg-base-300">Persentase Kehadiran</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              let presentDays = 0;

              return (
                <tr key={employee._id}>
                  <td className="bg-base-100 sticky left-0">
                    {employee.employee_name}
                  </td>
                  {Array.from({ length: currentDay }).map((_, index) => {
                    const day = index + 1;
                    const status =
                      attendanceData[employee._id]?.[day] || "Alpha";

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
                            handleStatusChange(
                              employee._id,
                              e.target.value,
                              day
                            )
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
    </div>
  );
};

export default AttendanceEmployee;