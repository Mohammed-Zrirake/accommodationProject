import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
  
    <div className='flex flex-col h-full'>
        <Navbar />
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar />
          <main className='flex-1 p-4 pt-10 md:px-10 overflow-y-auto'>
            <Outlet />
          </main>
        </div>
    </div>
  )
}

export default Layout;