// import React from 'react'
import { useNavigate } from 'react-router'
import { adminCreateURL, adminToursURL, adminUsersURL } from '../constants/urls';

export function Admin() {
    const navigate = useNavigate();

    const handleGestTours = (event: any) => {
        event.preventDefault();
        navigate(adminToursURL);
    }

    const handleGestUsers = (event: any) => {
        event.preventDefault();
        navigate(adminUsersURL);
    }

    const handleCreateTours = (event: any) => {
        event.preventDefault();
        navigate(adminCreateURL);
    }




  return (
    <div className='flex flex-col min-h-screen min-w-screen h-full w-full gap-2'>
        <button type="button" className="btn-primary self-center mt-10" onClick={handleGestTours}>
            Gestionar Tours
        </button>
        <button type="button" className="btn-primary self-center" onClick={handleGestUsers}>
            Gestionar Usuarios
        </button>
        <button type="button" className="btn-primary self-center" onClick={handleCreateTours}>
            Crear Tours
        </button>
    
    </div>
  )
}
