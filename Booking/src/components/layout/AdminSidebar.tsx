import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Hotel, 
  CalendarCheck, 
  Users, 
  DollarSign, 
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/' },
    { icon: Hotel, label: 'Chambres', path: '/chambres' },
    { icon: CalendarCheck, label: 'Réservations', path: '/reservations' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: DollarSign, label: 'Paiements', path: '/paiements' },
    
  ];

  return (
    <div className='w-64 bg-hotel-800 text-white hidden md:block'>
      <div className="flex items-center justify-center h-16 border-b bg-white border-gray-300">
        <h1 className="text-2xl font-bold text-black">Hotel Admin</h1>
      </div>
      
      <nav className="mt-5 px-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link 
              key={index} 
              to={item.path}
              className={`group flex items-center px-4 py-3 mb-1 rounded-md transition-colors ${
                isActive
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
