import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableRead from "../TableRead";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";

const ReadAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const columns = [
    { header: "Admin Username", accessor: (item) => item.admin_username },
    { header: "Admin Password", accessor: (item) => item.admin_password },
    { header: "Divisi Admin", accessor: (item) => item.admin_division.division_name },
  ];

  const searchableFields = ["admin_username", "admin_division.division_name"];

  const labels = ["admin username", "divisi admin"];

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/admin`
        );
        setAdmins(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getAdmins();
  }, []);

  const handleEdit = (id) => {
    navigate(`/master/admin/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ingin menghapus admin?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_PORT}/api/admin/${id}`
        );

        if (response.status === 200) {
          setAdmins((prev) =>
            prev.filter((admin) => admin._id !== id)
          );
          alert("Admin telah dihapus.");
        } else {
          alert("Gagal menghapus admin.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus admin.");
      }
    }
  };

  const filteredAdmins = Array.isArray(admins)
    ? admins.filter((admin) => {
        return searchableFields.some((field) => {
          const fieldValue = admin[field]?.toString().toLowerCase() || "";
          return fieldValue.includes(searchTerm.toLowerCase());
        });
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdmins.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold text-center mb-6 pt-3">Admin</h1>
      <Link to={"/master/create/admin"} className="btn">
        Add +
      </Link>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        labels={labels}
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

export default ReadAdmin;
