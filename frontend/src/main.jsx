import * as React from "react"
import * as ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home.jsx"
import "./App.css";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import Master from "./pages/Master.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/master",
    element: <Master/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
