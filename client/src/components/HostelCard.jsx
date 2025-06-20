import React from 'react';
import { Link } from 'react-router-dom';

const HostelCard = ({ hostel }) => {
  // Handle missing photos gracefully
  const mainPhoto = hostel.photos?.length > 0 
    ? `https://localhost:7263/images/${hostel.photos[0]}`
    : 'https://via.placeholder.com/400x300?text=No+Image';
  
  // Calculate starting price from dorms
  const startingPrice = hostel.dorms?.length > 0
    ? Math.min(...hostel.dorms.map(dorm => dorm.basePricePerNight))
    : null;

  return (
    <Link 
      to={`/hostels/${hostel.hostelId}`} 
      onClick={() => window.scrollTo(0, 0)}
      className="block max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative">
        <div className="overflow-hidden h-64">
          <img 
            src={mainPhoto}
            alt={`${hostel.name} hostel`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
            }}
          />
        </div>
        
        <div className="absolute top-3 w-full flex justify-between items-center gap-2">
          <span className="absolute top-0 left-3.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-md">
            Popular Choice
          </span>
          <span className="absolute top-0 right-3.5 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
            {hostel.address.city}
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-semibold text-gray-800">
            {hostel.starRating || 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors truncate">
            {hostel.name}
          </h3>
          
          <div className="flex items-center gap-1 text-gray-500 mt-1 mb-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">
              {hostel.address.street}, {hostel.address.city}, {hostel.address.country}
            </span>
          </div>
          
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
            {hostel.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4 mb-2">
            {hostel.dorms?.length > 0 && (
              <div className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                <span>{hostel.dorms.length} Dorm Types</span>
              </div>
            )}
            
            
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            <span>View Dorms</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HostelCard;