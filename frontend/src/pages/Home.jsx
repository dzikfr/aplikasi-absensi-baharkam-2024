import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.jpeg";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <div className="relative hero min-h-screen">
        <div
          className="hero-background absolute inset-0"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(5px)",
          }}
        />
        <div className="hero-overlay bg-opacity-60"></div>

        <div className="hero-content text-neutral-content text-center relative z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">BaharkamAbsensi</h1>
            <p className="mb-5 font-bold text-gray-100">
              Kelola dan pantau kehadiran pegawai dengan cepat, praktis, dan
              mudah langsung dari perangkat manapun dan visual yang dapat
              disesuaikan.
            </p>
            <Link to="/login" className="btn hover:bg-white hover:text-gray-500">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
