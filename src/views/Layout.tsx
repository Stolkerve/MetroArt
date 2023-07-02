import { Outlet } from 'react-router'
import { Navbar } from '../components/Navbar';
import { UserContextProvider } from '../contexts/UserContext';
import campusBackground from '../assets/campus.jpg';

export function Layout() {
  return (
    <UserContextProvider>
      <main className="flex flex-row min-h-screen min-w-screen">
        <Navbar />
        <div className="flex flex-col min-h-screen min-w-screen">
          <img className='w-screen h-32' src={campusBackground}/>
          <div className="w-full h-screen bg-[#1D3557]">
            <Outlet />
          </div>
        </div>
 
      </main>
    </UserContextProvider>
  );
}