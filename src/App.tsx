import { Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";
import { Login } from "./views/Login";
import { calendarURL, adminURL, dashboardURL, homeURL, loginURL, profileURL, registerURL, tourURL, userReservesURL } from "./constants/urls";
import { Register } from "./views/Register";
import { Tour } from "./views/Tour";
import Modal from 'react-modal';
import { Layout } from "./views/Layout";
import { Dashboard } from "./views/Dashboard";
import { Profile } from "./views/Profile";
import { PrivateRoute } from "./components/PrivateRoute";
import { UserReserves }  from "./views/UserReserves";
import { Calendario } from "./components/Calendario";
import { AdminRoute } from "./components/AdminRoute";
import { Admin } from "./views/Admin";

Modal.setAppElement('#root');

export const App = () => {
  return (
      <Routes>
        <Route path={homeURL} element={<Landing />} />
        <Route path={registerURL} element={<Register />} />
        <Route path={loginURL} element={<Login />} />    
        
        <Route element={<Layout />} >
          <Route path={dashboardURL} element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
          } />

          <Route path={profileURL} element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
          } />
          
          <Route path={tourURL} element={
          <PrivateRoute>
            <Tour />
          </PrivateRoute>
          } />

          <Route path={userReservesURL} element={
          <PrivateRoute>
            <UserReserves />
          </PrivateRoute>
          } />
          
          <Route path={adminURL} element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
          } />

          <Route path={calendarURL} element={
          <PrivateRoute>
            <Calendario />
          </PrivateRoute>
          } />
        </Route>
      </Routes>
  );
};
