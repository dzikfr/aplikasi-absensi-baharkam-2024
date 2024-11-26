import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AttendanceEmployee from "./pages/AttendanceEmployee";
import MasterDashboard from "./pages/MasterDashboard";
import CreateEmployee from "./components/Admin/CreateEmployee";
import EditEmployee from "./components/Admin/EditEmployee";
import CreateAdmin from "./components/Master/CreateAdmin";
import EditDivision from "./components/Master/EditDivision";
import CreateDivision from "./components/Master/CreateDivision";
import EditAdmin from "./components/Master/EditAdmin";

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

        <Route
          path="/admin/create/employee"
          element={
            <ProtectedRoute>
              <CreateEmployee/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employee/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployee/>
            </ProtectedRoute>
          }
        />

        {/* Master Route */}
        <Route path="/master" element={<MasterDashboard/>} />
        <Route path="/master/create/admin" element={<CreateAdmin/>} />
        <Route path="/master/create/division" element={<CreateDivision/>} />
        <Route path="/master/division/edit/:id" element={<EditDivision/>} />
        <Route path="/master/admin/edit/:id" element={<EditAdmin/>} />

      </Routes>
    </Router>
  );
};

export default App;