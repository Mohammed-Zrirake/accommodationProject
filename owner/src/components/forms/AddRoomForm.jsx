import React, { useState } from 'react';
import { assets } from '../../assets/assets';

// --- Reusable Styles ---
const textInputStyle = "w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
const selectInputStyle = "w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white";

// --- Sub-component for Room Amenities ---
const RoomAmenitiesSelector = ({ selectedAmenities, onToggleAmenity }) => {
    // In a real app, this list would be fetched from your backend API
    const ALL_ROOM_AMENITIES = [
        { id: 'wifi', name: 'Wi-Fi' },
        { id: 'ac', name: 'Air Conditioning' },
        { id: 'tv', name: 'TV' },
        { id: 'minibar', name: 'Minibar' },
        { id: 'balcony', name: 'Balcony/Patio' },
        { id: 'ensuite', name: 'Ensuite Bathroom' },
        { id: 'safe', name: 'In-room Safe' },
        { id: 'desk', name: 'Work Desk' },
    ];

    return (
        <div>
            <h5 className="font-medium text-gray-800 mb-3">Room Amenities</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                {ALL_ROOM_AMENITIES.map(amenity => (
                     <div key={amenity.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`room-amenity-${amenity.id}`}
                            checked={selectedAmenities.includes(amenity.id)}
                            onChange={() => onToggleAmenity(amenity.id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`room-amenity-${amenity.id}`} className="ml-2 text-sm text-gray-700">{amenity.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Sub-component for Room Photos ---
const RoomImageUploader = ({ photos, onImageChange }) => (
    <div>
        <h5 className="font-medium text-gray-800 mb-3">Room Photos</h5>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
             {Object.keys(photos).map((key) => (
                <label 
                    htmlFor={`roomImage${key}`} 
                    key={key} 
                    className="relative group cursor-pointer border-2 border-dashed rounded-lg h-28 flex items-center justify-center bg-gray-100 hover:border-blue-400 transition-colors"
                >
                     {photos[key] ? (
                        <img className='w-full h-full object-cover rounded-md' src={URL.createObjectURL(photos[key])} alt={`Room photo ${key}`} />
                    ) : (
                        <div className="text-center text-gray-500">
                             <img src={assets.uploadArea} alt="Upload icon" className="mx-auto h-8 w-8 mb-1" />
                             <span className="text-xs font-medium">Upload</span>
                        </div>
                    )}
                    <input type="file" accept="image/*" id={`roomImage${key}`} hidden onChange={e => onImageChange(key, e.target.files[0])} />
                </label>
            ))}
        </div>
    </div>
);


// --- Main Form Component ---
const AddRoomForm = ({ onAddRoom, onCancel }) => {
    const [formData, setFormData] = useState({
        // Properties from BookableUnit
        name: '',
        description: '',
        capacity: '',
        rules: '',
        amenities: [],
        photos: { 1: null, 2: null, 3: null, 4: null },
        
        // Properties specific to the Room model
        roomType: '',
        pricePerNight: '',
        isAvailable: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };
    
    const handleToggleAmenity = (amenityId) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenityId)
                ? prev.amenities.filter(id => id !== amenityId)
                : [...prev.amenities, amenityId]
        }));
    };

    const handleImageChange = (key, file) => {
        setFormData(prev => ({ ...prev, photos: { ...prev.photos, [key]: file } }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRoom(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border border-dashed rounded-lg mt-4 space-y-6 bg-gray-50/70">
            <h4 className="text-lg font-semibold text-gray-800">Add New Room</h4>
            
            {/* Basic Info */}
            <div className="grid md:grid-cols-3 gap-4">
                <input type="text" name="name" placeholder="Room Name (e.g., Deluxe King)" value={formData.name} onChange={handleInputChange} className={textInputStyle} required />
                <input type="number" name="pricePerNight" placeholder="Price per night ($)" value={formData.pricePerNight} onChange={handleInputChange} className={textInputStyle} min="0" required />
                <input type="number" name="capacity" placeholder="Capacity (guests)" value={formData.capacity} onChange={handleInputChange} className={textInputStyle} min="1" required />
            </div>

            {/* Room Type Dropdown */}
            <div>
                 <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                 <select 
                    id="roomType" 
                    name="roomType" 
                    value={formData.roomType} 
                    onChange={handleInputChange} 
                    className={selectInputStyle}
                    required
                >
                    <option value="" disabled>Select a room type...</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Twin">Twin</option>
                    <option value="Suite">Suite</option>
                    <option value="Family">Family</option>
                    <option value="Connecting Rooms">Connecting Rooms</option>
                </select>
            </div>

            {/* Description and Rules */}
            <div>
                <textarea name="description" placeholder="Describe the room, its view, and features..." value={formData.description} onChange={handleInputChange} className={textInputStyle} rows="3" required></textarea>
            </div>
             <div>
                <textarea name="rules" placeholder="Room rules (e.g., No smoking, Not suitable for pets)..." value={formData.rules} onChange={handleInputChange} className={textInputStyle} rows="2"></textarea>
            </div>
            
            {/* Is Available Toggle */}
            <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={handleInputChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">Is Available for Booking</span>
                </label>
            </div>

            <RoomAmenitiesSelector selectedAmenities={formData.amenities} onToggleAmenity={handleToggleAmenity} />

            <RoomImageUploader photos={formData.photos} onImageChange={handleImageChange} />

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors">Add Room</button>
                <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors">Cancel</button>
            </div>
        </form>
    );
};

export default AddRoomForm;