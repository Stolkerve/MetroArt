import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./views/Landing";
import { Login } from "./views/Login";
import { homeURL, loginURL, registerURL } from "./constants/urls";
import { Register } from "./views/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={homeURL} element={<Landing />}>
    <Route path={loginURL} element={<Login />} />
    <Route path={registerURL} element={<h1>Register</h1>} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path = {homeURL} element = {<Landing />} />
        <Route path = {registerURL} element = {<Register />} />
        <Route path = {loginURL} element = {<Login />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
