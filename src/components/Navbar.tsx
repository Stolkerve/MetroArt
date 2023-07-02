import { Link, useNavigate } from "react-router-dom";

import { homeURL,
    profileURL,
    dashboardURL } from "../constants/urls";

import { logout } from "../firebase/auth-service";
import { UserContext, useUser } from "../contexts/UserContext";

export function Navbar() {
  const navigate = useNavigate();
  const { user, isLoadingUser } = useUser() as UserContext;

  const displayName = (userName: string) => {
    if (user.username.includes(" ")) {
      userName = userName.split(" ")[0].charAt(0).toUpperCase() + userName.split(" ")[0].slice(1);
      return userName;
    } else {
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
      return userName;
    }
    
  }

  const handleLogout = async () => {
    await logout();
    navigate(homeURL)
  };

  return (
    <nav className="pt-14 h-screen max-w-40 max-h-screen w-40 bg-[#F77F00] flex flex-row justify-center font-semibold text-center">

      {!isLoadingUser && (
        <ul className="flex flex-col list-none gap-2">
            <>
              <li className="rounded-md hover:scale-105">
                <Link to={profileURL}>
                  
                  <span>{displayName(user.username)}</span>
                  
                </Link>
              </li>
              <div className="mt-2 content-none w-28 bg-white h-1" />
              <li className="mt-6 rounded-md hover:scale-105">
                <Link to={dashboardURL}>
                  <span>Home</span>
                </Link>
              </li>
              <li className="rounded-md hover:scale-105">
                <Link to={dashboardURL}>
                  <span>Tours</span>
                </Link>
              </li>
              <li className="mb-4 rounded-md hover:scale-105">
                <Link to={dashboardURL}>
                  <span>Reservaciones</span>
                </Link>
              </li>
              <li className="rounded-md hover:scale-105">
                <button
                  type="button"
                  className="rounded-xl text-[#F77F00] w-28 bg-white p-2"
                  onClick={handleLogout}
                >
                  <span>SALIR</span>
                </button>
              </li>
            </>
        </ul>
      )}
    </nav>
  );
}