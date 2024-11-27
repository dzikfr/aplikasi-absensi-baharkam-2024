import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableRead from "../TableRead";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";

const ReadLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const columns = [
    { header: "NIP", accessor: (item) => item.employee_id?.employee_nrp },
    { header: "Nama", accessor: (item) => item.employee_id?.employee_name },
    {
      header: "Mulai",
      accessor: (item) => new Date(item.start_date).toLocaleDateString(),
    },
    {
      header: "Selesai",
      accessor: (item) => new Date(item.end_date).toLocaleDateString(),
    },
    { header: "Status", accessor: (item) => item.status },
  ];

  useEffect(() => {
    const divisionName = localStorage.getItem("division_name");

    const getLeaves = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/leave`
        );
        const filteredLeaves = response.data.filter(
          (leave) =>
            leave.employee_id?.employee_division?.division_name === divisionName
        );
        setLeaves(filteredLeaves);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    getLeaves();
  }, []); 

  const handleEdit = (id) => {
    navigate(`/admin/leave/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ingin menghapus data cuti?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_PORT}/api/leave/${id}`
        );

        if (response.status === 200) {
          setLeaves((prev) => prev.filter((leave) => leave._id !== id));
          alert("Data cuti telah dihapus.");
        } else {
          alert("Gagal menghapus data cuti.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus data cuti.");
      }
    }
  };

  const filteredLeaves = Array.isArray(leaves)
    ? leaves.filter((leave) => {
        return (
          leave.employee_id?.employee_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          leave.status?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeaves.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold text-center mb-6 pt-3">Data Cuti</h1>
      <Link to={"/admin/create/leave"} className="btn">
        Tambah Cuti +
      </Link>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        labels={["Nama", "Status"]} // Disesuaikan
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

export default ReadLeave;
