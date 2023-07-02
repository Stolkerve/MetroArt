import { Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";
import { Login } from "./views/Login";
import { dashboardURL, homeURL, loginURL, registerURL, tourURL } from "./constants/urls";
import { Register } from "./views/Register";
import { Tour } from "./views/Tour";
import Modal from 'react-modal';
import { Layout } from "./views/Layout";
import { Dashboard } from "./views/Dashboard";

Modal.setAppElement('#root');

export const App = () => {
  return (
      <Routes>
        <Route path={homeURL} element={<Landing />} />
        <Route path={registerURL} element={<Register />} />
        <Route path={loginURL} element={<Login />} />
        <Route path={tourURL} element={<Tour />} />
        
        <Route element={<Layout />} >
          <Route path={dashboardURL} element={<Dashboard />} />
        </Route>
      </Routes>
  );
};
