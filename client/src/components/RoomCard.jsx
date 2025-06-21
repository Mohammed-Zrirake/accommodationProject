import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating'; // Assuming you have this component

const RoomCard = ({ room, hotelData }) => {
  const navigate = useNavigate();

  return (
    <div 
      key={room.id} 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-0.5 border border-gray-100 "
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-2/5 relative overflow-hidden">
          <img 
            onClick={() => navigate(`/roomDetails/${room.id}`)}
            src={`https://localhost:7263/images/${room.photos[0]}`} 
            alt={room.name}
            className="w-full h-64 md:h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{room.averageRating || 'New'}</span>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>{room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}</span>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="md:w-3/5 p-6 flex flex-col h-full">
          <div className="mb-3">
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {hotelData.address.city}
            </span>
          </div>
          
          <h3 
            onClick={() => navigate(`/roomDetails/${room.id}`)}
            className="text-2xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
          >
            {room.name}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {room.description}
          </p>
          
          <div className="flex items-center gap-1 text-gray-500 mb-4 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className='text-amber-400'>{hotelData.address.street}, {hotelData.address.city}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {room.amenities.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs">
                <span>{item.name}</span>
              </div>
            ))}
            {room.amenities.length > 4 && (
              <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                +{room.amenities.length - 4} more
              </div>
            )}
          </div>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-2xl font-bold text-indigo-600">{room.basePricePerNight} Dh</p>
              <p className="text-gray-500 text-sm">per night</p>
            </div>
            
            <button 
              onClick={() => navigate(`/roomDetails/${room.id}`)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-colors duration-300"
            >
              <span>View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;