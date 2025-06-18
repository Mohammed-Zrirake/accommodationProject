import React from 'react';

// In a real app, you would fetch this list from your backend API
const ALL_AMENITIES = [
    { amenityId: '1', name: 'Wi-Fi', category: 'General' },
    { amenityId: '2', name: 'Pool', category: 'Recreation' },
    { amenityId: '3', name: 'Parking', category: 'General' },
    { amenityId: '4', name: 'Gym', category: 'Recreation' },
    { amenityId: '5', name: 'Restaurant', category: 'Food & Drink' },
    { amenityId: '7', name: 'Spa', category: 'Recreation' },
    { amenityId: '6', name: 'Air Conditioning', category: 'Room' },
];

const AmenitiesSelector = ({ selectedAmenities, onToggleAmenity }) => {
    return (
        <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Hotel Amenities</h3>
            <p className="text-sm text-gray-500 mb-4">Select all amenities available at the hotel.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ALL_AMENITIES.map(amenity => (
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