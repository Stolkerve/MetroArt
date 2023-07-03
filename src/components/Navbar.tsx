import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { homeURL,
    profileURL,
    dashboardURL, 
    userReservesURL,
    calendarURL,
} from "../constants/urls";

import { logout } from "../firebase/auth-service";
import { UserContext, useUser } from "../contexts/UserContext";
import { getProfilePicture } from "../firebase/users-service";
import defaultIcon from "../assets/userIcon.png"
import Calendar from "react-calendar";

export function Navbar() {
  const navigate = useNavigate();
  const { user, isLoadingUser } = useUser() as UserContext;
  const [profilePicture, setProfilePicture] = useState("");


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

  async function fetchProfilePicture() {
    try {

      const downloadURL = await getProfilePicture(user.id);
      setProfilePicture(downloadURL);
    } catch (error) {
      console.error("Error al obtener la foto de perfil:", error);
    }
  }  

  useEffect(() => {
    if (!isLoadingUser) {
      fetchProfilePicture();
      console.log("llego y actualizo")
    }
    
    
    
  }, [isLoadingUser])



  

  return (
    <nav className="pt-14 h-screen max-w-40 max-h-screen w-40 bg-[#F77F00] flex flex-row justify-center font-semibold text-center">

      {!isLoadingUser && (
        <ul className="flex flex-col items-center list-none gap-2">
            <>
              <Link to={profileURL}>
                <li className="rounded-md hover:scale-105">
                  {profilePicture == "" ? (
                    <div className="mt-5 justify-center w-[80px] h-[80px] rounded-full bg-[#F77F00] mb-4 drop-shadow-sm">
                    <img className="h-full w-full rounded-full border-white border" src={defaultIcon} alt="" />
                    </div>
                  ): (
                    <div className="mt-5 justify-center w-[80px] h-[80px] rounded-full bg-[#F77F00] mb-4 drop-shadow-sm">
                    <img className="h-full w-full rounded-full border-white border" src={profilePicture} alt="" />
                    </div>
                  )}
                  
                    <span>{displayName(user.username)}</span>  
                </li>
              </Link>
              <div className="mt-2 content-none w-28 bg-white h-1" />
              <li className="mt-6 rounded-md hover:scale-105">
                <Link to={dashboardURL}>
                  <span>Tours</span>
                </Link>
              </li>
              {/* <li className="rounded-md hover:scale-105">
                <Link to={toursURL}>
                  <span>Tours</span>
                </Link>
              </li> */}
              <li className="mb-4 rounded-md hover:scale-105">
                <Link to={userReservesURL}>
                  <span>Reservaciones</span>
                </Link>
              </li>

              <li className="mb-4 rounded-md hover:scale-105">
                <Link to={calendarURL}>
                  <span>Calendario</span>
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