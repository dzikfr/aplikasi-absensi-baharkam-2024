import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableRead from "../TableRead";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";

const ReadDivision = () => {
  const [divisions, setDivisions] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const columns = [
    { header: "ID Divisi", accessor: (item) => item.division_id },
    { header: "Nama Divisi", accessor: (item) => item.division_name },
  ];

  const searchableFields = ["division_id", "division_name"];

  const labels = ["ID divisi", "nama divisi"];

  useEffect(() => {
    const getDivisions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/division`
        );
        setDivisions(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getDivisions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/master/division/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ingin menghapus divisi?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_PORT}/api/division/${id}`
        );

        if (response.status === 200) {
          setDivisions((prev) =>
            prev.filter((division) => division._id !== id)
          );
          alert("Divisi telah dihapus.");
        } else {
          alert("Gagal menghapus divisi.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus divisi.");
      }
    }
  };

  const filteredDivisions = Array.isArray(divisions)
    ? divisions.filter((divisi) => {
        return searchableFields.some((field) => {
          const fieldValue = divisi[field]?.toString().toLowerCase() || "";
          return fieldValue.includes(searchTerm.toLowerCase());
        });
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDivisions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredDivisions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold text-center mb-6 pt-3">Divisi</h1>
      <Link to={"/master/create/division"} className="btn">
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

export default ReadDivision;
