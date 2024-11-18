import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Master from "./pages/MasterDashboard.jsx";
import "./App.css";
import MasterDashboard from "./pages/MasterDashboard.jsx";
import CreateEmployee from "./components/Admin/CreateEmployee";
import EditEmployee from "./components/Admin/EditEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
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
    path: "/admin/employee/edit/:id",
    element: <EditEmployee/>,
  },
  {
    path: "/master",
    element: <MasterDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
