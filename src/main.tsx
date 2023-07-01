import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";
import { Login } from "./views/Login";
import { dashboardURL, homeURL, loginURL, registerURL } from "./constants/urls";
import { Register } from "./views/Register";
import { Dashboard } from "./views/Dashboard";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={homeURL} element={<Landing />} />
        <Route path={registerURL} element={<Register />} />
        <Route path={loginURL} element={<Login />} />
        <Route path={dashboardURL} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
