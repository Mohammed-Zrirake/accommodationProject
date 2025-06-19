import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AmenitiesSelector = ({ selectedAmenities, onToggleAmenity }) => {
  
    const [allAmenities, setAllAmenities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchAmenities = async () => {
            try {
              
                const API_URL = 'http://localhost:5073/api/amenities'; 
                
                const response = await axios.get(API_URL);
                
              
                setAllAmenities(response.data);
                setError(null); 

            } catch (err) {
                console.error("Failed to fetch amenities:", err);
                setError("Could not load amenities. Please try refreshing.");
            } finally {
              
                setIsLoading(false);
            }
        };

        fetchAmenities();
    }, []);

    
    if (isLoading) {
        return <p className="text-gray-500 mt-4">Loading amenities...</p>;
    }

    if (error) {
        return <p className="text-red-500 mt-4 font-semibold">{error}</p>;
    }

    return (
        <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Property Amenities</h3>
            <p className="text-sm text-gray-500 mb-4">Select all amenities available at the property.</p>
           
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {allAmenities.map(amenity => (
                    <div key={amenity.amenityId} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`amenity-${amenity.amenityId}`}
                          
                            checked={selectedAmenities.includes(amenity.amenityId)}
                            onChange={() => onToggleAmenity(amenity.amenityId)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`amenity-${amenity.amenityId}`} className="ml-2 text-sm text-gray-700">
                            {amenity.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmenitiesSelector;