import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ReadDivision from "../components/Master/ReadDivision";
import ReadAdmin from "../components/Master/ReadAdmin";

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
          onClick={() => setActiveComponent("divisi")}
          className="p-4 hover:bg-gray-200 cursor-pointer"
        >
          Kelola Divisi
        </li>
        <li
          onClick={() => setActiveComponent("cuti")}
          className="p-4 hover:bg-gray-200 cursor-pointer"
        >
          Kelola Cuti Pegawai
        </li>
        <li
          onClick={() => setActiveComponent("cetak")}
          className="p-4 hover:bg-gray-200 cursor-pointer"
        >
          Cetak
        </li>
      </ul>
    </div>
  );
};

const MainContent = ({ activeComponent }) => {
  switch (activeComponent) {
    case "admin":
      return <ReadAdmin/>;
    case "divisi":
      return <ReadDivision/>;
    case "cuti":
      return <ReadOrder/>;
    case "cetak":
      return <ReadUser/>;
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
