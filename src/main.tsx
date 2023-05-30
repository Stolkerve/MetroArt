import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./views/Landing";
import Login from "./views/Login";
import Signin from "./views/Signin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing />}>
      <Route path="login" element={<Login />} />
      <Route path="signin" element={<Signin />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
