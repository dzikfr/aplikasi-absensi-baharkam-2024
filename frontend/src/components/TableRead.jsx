// TableRead.js
import React from "react";

const TableRead = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra rounded-none">
        <thead className="text-center">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item) => (
            <tr key={item._id || item.id}>
              {columns.map((col, index) => (
                <td key={index}>{col.accessor(item)}</td>
              ))}
              <td>
                <button
                  onClick={() => onEdit(item._id || item.id)}
                  className="btn btn-sm"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => onDelete(item._id || item.id)}
                  className="btn btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRead;
