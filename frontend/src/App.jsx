import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AttendanceEmployee from "./pages/AttendanceEmployee";
import MasterDashboard from "./pages/MasterDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ADMIN ROUTE */}
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute>
              <AttendanceEmployee />
            </ProtectedRoute>
          }
        />

        {/* Master Route */}
        <Route path="/master" element={<MasterDashboard/>} />

      </Routes>
    </Router>
  );
};

export default App;