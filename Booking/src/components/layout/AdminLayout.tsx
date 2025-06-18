import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Header from './Header';

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      
      <div>
           <AdminSidebar/>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title={title} />
        

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 border-l border-gray-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
