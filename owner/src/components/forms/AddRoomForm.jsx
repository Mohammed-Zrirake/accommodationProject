import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';

// --- Reusable Styles ---
const textInputStyle = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-700";
const selectInputStyle = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-700 bg-white";
const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
const sectionTitleStyle = "text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200";
const checkboxStyle = "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500";
const buttonPrimary = "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
const buttonSecondary = "bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium border border-gray-300 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

// --- Sub-component for Room Amenities ---
const RoomAmenitiesSelector = ({ selectedAmenities, onToggleAmenity }) => {
    const [allAmenities, setAllAmenities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const API_URL = 'http://localhost:5073/api/amenities';
                const response = await axios.get(API_URL);
                setAllAmenities(response.data);
            } catch (err) {
                console.error("Failed to fetch amenities:", err);
                setError("Could not load amenities.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAmenities();
    }, []);

    if (isLoading) return (
        <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    if (error) return <p className="text-sm font-medium text-red-500 bg-red-50 p-2 rounded">{error}</p>;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h5 className={labelStyle}>Room Amenities</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3 mt-2">
                {allAmenities.map(amenity => (
                    <div key={amenity.amenityId} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`room-amenity-${amenity.amenityId}`}
                            checked={selectedAmenities.includes(amenity.amenityId)}
                            onChange={() => onToggleAmenity(amenity.amenityId)}
                            className={checkboxStyle}
                        />
                        <label htmlFor={`room-amenity-${amenity.amenityId}`} className="ml-2 text-sm text-gray-700">
                            {amenity.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Sub-component for Room Photos ---
const RoomImageUploader = ({ photos, onImageChange }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h5 className={labelStyle}>Room Photos</h5>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2'>
            {Object.keys(photos).map((key) => (
                <label 
                    htmlFor={`roomImage${key}`} 
                    key={key} 
                    className="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-28 flex items-center justify-center bg-gray-50 hover:border-blue-400 transition-colors overflow-hidden"
                >
                    {photos[key] ? (
                        <>
                            <img 
                                className='w-full h-full object-cover rounded-md' 
                                src={URL.createObjectURL(photos[key])} 
                                alt={`Room photo ${key}`} 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">Change</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-400">
                            <img src={assets.uploadArea} alt="Upload icon" className="mx-auto h-8 w-8 mb-1 opacity-70" />
                            <span className="text-xs font-medium">Upload</span>
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        id={`roomImage${key}`} 
                        hidden 
                        onChange={e => onImageChange(key, e.target.files[0])} 
                    />
                </label>
            ))}
        </div>
    </div>
);

// --- Main Form Component ---
const AddRoomForm = ({ onAddRoom, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        capacity: '',
        rules: '',
        amenities: [],
        photos: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
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
        const photoFiles = Object.values(formData.photos).filter(file => file instanceof File);
        onAddRoom({ ...formData, photos: photoFiles });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-white shadow-md border border-gray-200 space-y-6">
            <h4 className={sectionTitleStyle}>Add New Room</h4>
            
            {/* Basic Info */}
            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="name" className={labelStyle}>Room Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        placeholder="Deluxe King Room" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className={textInputStyle} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="pricePerNight" className={labelStyle}>Price Per Night ($)</label>
                    <input 
                        type="number" 
                        name="pricePerNight" 
                        id="pricePerNight"
                        placeholder="150.00" 
                        value={formData.pricePerNight} 
                        onChange={handleInputChange} 
                        className={textInputStyle} 
                        min="0" 
                        step="0.01"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="capacity" className={labelStyle}>Capacity</label>
                    <input 
                        type="number" 
                        name="capacity" 
                        id="capacity"
                        placeholder="2" 
                        value={formData.capacity} 
                        onChange={handleInputChange} 
                        className={textInputStyle} 
                        min="1" 
                        required 
                    />
                </div>
            </div>

            {/* Room Type Dropdown */}
            <div>
                <label htmlFor="roomType" className={labelStyle}>Room Type</label>
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
            <div className="space-y-4">
                <div>
                    <label htmlFor="description" className={labelStyle}>Description</label>
                    <textarea 
                        name="description" 
                        id="description"
                        placeholder="Describe the room, its view, and features..." 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        className={textInputStyle} 
                        rows="3" 
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="rules" className={labelStyle}>House Rules</label>
                    <textarea 
                        name="rules" 
                        id="rules"
                        placeholder="No smoking, Not suitable for pets, etc..." 
                        value={formData.rules} 
                        onChange={handleInputChange} 
                        className={textInputStyle} 
                        rows="2"
                    ></textarea>
                </div>
            </div>
            
            {/* Is Available Toggle */}
            <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="isAvailable"
                        id="isAvailable"
                        checked={formData.isAvailable}
                        onChange={handleInputChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    <span className="ml-3 text-sm text-gray-600">
                        {formData.isAvailable ? 'Available for booking' : 'Currently unavailable'}
                    </span>
                </label>
            </div>

            <RoomAmenitiesSelector selectedAmenities={formData.amenities} onToggleAmenity={handleToggleAmenity} />
            <RoomImageUploader photos={formData.photos} onImageChange={handleImageChange} />

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200 justify-end">
                <button type="button" onClick={onCancel} className={buttonSecondary}>
                    Cancel
                </button>
                <button type="submit" className={buttonPrimary}>
                    Add Room
                </button>
            </div>
        </form>
    );
};

export default AddRoomForm;