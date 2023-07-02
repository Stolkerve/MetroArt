import { Outlet } from 'react-router'
import { Navbar } from '../components/Navbar';
import { UserContextProvider } from '../contexts/UserContext';
import banner from '../assets/banner.png';

export function Layout() {
  return (
    <UserContextProvider>
      <main className="flex flex-row min-h-screen h-full min-w-screen">
        <Navbar />
        <div className="flex flex-col min-h-screen h-full min-w-screen">
          <img className='w-screen h-32' src={banner}/>
          <div className="w-full h-full bg-[#1D3557]">
            <Outlet />
          </div>
        </div>
 
      </main>
    </UserContextProvider>
  );
}