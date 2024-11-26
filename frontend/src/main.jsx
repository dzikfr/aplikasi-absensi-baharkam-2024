import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Master from "./pages/MasterDashboard.jsx";
import "./App.css";
import MasterDashboard from "./pages/MasterDashboard.jsx";
import CreateEmployee from "./components/Admin/CreateEmployee";
import CreateDivision from "./components/Master/CreateDivision";
import CreateAdmin from "./components/Master/CreateAdmin";
import EditEmployee from "./components/Admin/EditEmployee";
import EditDivision from "./components/Master/EditDivision";
import AttendanceEmployee from "./pages/AttendanceEmployee.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
  },
  {
    path: "/admin/create/employee",
    element: <CreateEmployee/>,
  },
  {
    path: "/master/create/division",
    element: <CreateDivision/>,
  },
  {
    path: "/master/create/admin",
    element: <CreateAdmin/>,
  },
  {
    path: "/admin/employee/edit/:id",
    element: <EditEmployee/>,
  },
  {
    path: "/master/division/edit/:id",
    element: <EditDivision/>,
  },
  {
    path: "/master",
    element: <MasterDashboard />,
  },
  {
    path: "/admin/attendance",
    element: <AttendanceEmployee/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
