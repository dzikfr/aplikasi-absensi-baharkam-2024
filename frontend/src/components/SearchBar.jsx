import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, labels }) => {
  const label = labels.join(", "); // Menyusun label menjadi string

  return (
    <input
      type="text"
      placeholder={`Cari berdasarkan ${label}`} // Placeholder lebih deskriptif
      className="input input-bordered w-full mb-4"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
