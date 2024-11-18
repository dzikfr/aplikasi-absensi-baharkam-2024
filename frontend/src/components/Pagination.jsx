import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="join flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`join-item btn ${currentPage === 1 ? "btn-disabled" : ""}`}
      >
        «
      </button>
      <button className="join-item btn">
        Page {currentPage} of {totalPages}
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`join-item btn ${currentPage === totalPages ? "btn-disabled" : ""}`}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
