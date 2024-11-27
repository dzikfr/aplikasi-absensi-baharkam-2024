import React from "react";

const EditForm = ({ label, value, onChange, type = "text", required = true }) => {
  return (
    <div className="form-control mb-4">
      <label className="label text-base">{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full"
        required={required}
      />
    </div>
  );
};

export default EditForm;
