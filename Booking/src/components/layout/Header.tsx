
import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  title: string;
};

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, title }) => {
  return (
    <header className="bg-white border-b border-gray-300 h-16 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
            <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800">
              {title}
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-hotel-500 focus:border-hotel-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="relative ml-3"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </Button>
            
            {/* Avatar */}
            <div className="ml-3 relative">
              <Button className="h-8 w-8 rounded-full bg-hotel-500 flex items-center justify-center">
                EN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
