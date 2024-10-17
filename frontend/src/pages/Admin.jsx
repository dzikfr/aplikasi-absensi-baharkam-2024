import React from "react";
import Navbar from "../components/Navbar";

const Admin = () => {
  return (
    <div>
      <Navbar />

      <div className="flex w-full flex-col lg:flex-row pt-20 px-10">
        <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
          kelola pegawai
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
          kelola absensi
        </div>
      </div>
    </div>
  );
};

export default Admin;
