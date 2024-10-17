import React from "react";
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">BaharkamAbsensi</h1>
            <p className="mb-5 font-bold">
              Kelola dan pantau kehadiran pegawai dengan cepat, praktis dan mudah langsung dari
              perangkat manapun dan visual yang dapat disesuaikan
            </p>
            <Link to="/login" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
