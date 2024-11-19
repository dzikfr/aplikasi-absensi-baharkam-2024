import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableRead from "../TableRead";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";

const ReadEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const columns = [
    { header: "NIP", accessor: (item) => item.employee_nrp },
    { header: "Nama", accessor: (item) => item.employee_name },
    { header: "Pangkat", accessor: (item) => item.employee_rank },
    { header: "Jabatan", accessor: (item) => item.employee_position },
    {
      header: "Divisi",
      accessor: (item) => item.employee_division?.division_name,
    },
  ];

  const searchableFields = [
    "employee_nrp",
    "employee_name",
    "employee_rank",
    "employee_position",
    "employee_division",
  ];

  const labels = ["NIP", "Nama", "Pangkat", "Jabatan", "Divisi"];

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/employee`
        );
        console.log(response.data);
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    getEmployees();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/employee/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ingin menghapus pegawai?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_PORT}/api/employee/${id}`
        );

        if (response.status === 200) {
          setEmployees((prev) =>
            prev.filter((employee) => employee._id !== id)
          );
          alert("Pegawai telah dihapus.");
        } else {
          alert("Gagal menghapus pegawai.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus pegawai.");
      }
    }
  };

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((employee) => {
        return searchableFields.some((field) => {
          const fieldValue =
            field === "employee_division"
              ? employee.employee_division?.division_name?.toLowerCase()
              : employee[field]?.toString().toLowerCase() || "";
          return fieldValue.includes(searchTerm.toLowerCase());
        });
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold text-center mb-6 pt-3">Pegawai</h1>
      <Link to={"/admin/create/employee"} className="btn">
        Add +
      </Link>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        labels={labels} // Mengirim label deskriptif
      />
      <TableRead
        columns={columns}
        data={currentItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ReadEmployee;
