import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiHome } from 'react-icons/fi';

const Sidebar = () => {
    const sidebarLinks = [
        { 
            name: "My Properties", 
            path: "/properties", 
            IconComponent: FiHome 
        },
    ];

    return (
        <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 shrink-0'>
            {sidebarLinks.map((item, index) => (
                <NavLink
                    to={item.path}
                    key={index}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                        `flex items-center py-3 px-4 md:px-8 gap-4 transition-colors duration-200 ${isActive ?
                            "border-r-4 md:border-r-[6px] bg-blue-100/50 border-blue-600 text-blue-600 font-medium" :
                            "border-r-4 md:border-r-[6px] border-transparent hover:bg-gray-100/90 text-gray-700"}`
                    }
                >
                   
                    {item.IconComponent ? (
                      
                        <item.IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                       
                        <img src={item.iconAsset} alt="" className="h-5 w-5 md:h-6 md:w-6" />
                    )}

                    <p className='md:block hidden'>{item.name}</p>
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;