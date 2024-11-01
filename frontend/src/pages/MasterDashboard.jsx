import React, { useState } from "react";
import Navbar from "../components/Navbar";
import KelolaAdmin from "../components/KelolaAdmin";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="w-32 h-screen border-r border-gray-700">
      <ul>
        <li
          onClick={() => setActiveComponent("admin")}
          className="p-4 hover:bg-gray-200 cursor-pointer"
        >
          Kelola Admin
        </li>
        <li
          onClick={() => setActiveComponent("cuti")}
          className="p-4 hover:bg-gray-200 cursor-pointer"
        >
          Kelola Cuti Pegawai
        </li>
        <li
          onClick={() => setActiveComponent("rekap")}
          className="p-4 hover:bg-gray-200 cursor-pointer"
        >
          Rekap dan Cetak
        </li>
      </ul>
    </div>
  );
};

const MainContent = ({ activeComponent }) => {
  switch (activeComponent) {
    case "admin":
      return <KelolaAdmin/>;
    case "kehadiran":
      return <ReadCategory/>;
    case "cuti":
      return <ReadOrder/>;
    default:
      return <div className="p-4">Select a menu</div>;
  }
};

const MasterDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("");

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="flex-1">
          <MainContent activeComponent={activeComponent} />
        </div>
      </div>
    </div>
  );
};

export default MasterDashboard;
