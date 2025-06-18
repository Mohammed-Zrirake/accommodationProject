import React, { useState } from 'react';
import { assets } from '../../assets/assets';

// --- Reusable Styles ---
const textInputStyle = "w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

// --- Sub-component for Dorm-specific Amenities ---
const DormAmenitiesSelector = ({ selectedAmenities, onToggleAmenity }) => {
    // This list should be tailored to dorms and ideally fetched from your backend
    const ALL_DORM_AMENITIES = [
        { id: 'wifi', name: 'Free Wi-Fi' },
        { id: 'ac', name: 'Air Conditioning' },
        { id: 'locker', name: 'Personal Locker' },
        { id: 'outlet', name: 'Power Outlet' },
        { id: 'reading-light', name: 'Reading Light' },
        { id: 'shared-bathroom', name: 'Shared Bathroom' },
        { id: 'kitchen-access', name: 'Kitchen Access' },
        { id: 'laundry', name: 'Laundry Facilities' },
    ];

    return (
        <div>
            <h5 className="font-medium text-gray-800 mb-3">Dorm Amenities</h5>
            {/* Corrected responsive grid classes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                {ALL_DORM_AMENITIES.map(amenity => (
                     <div key={amenity.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`dorm-amenity-${amenity.id}`}
                            checked={selectedAmenities.includes(amenity.id)}
                            onChange={() => onToggleAmenity(amenity.id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`dorm-amenity-${amenity.id}`} className="ml-2 text-sm text-gray-700">{amenity.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Sub-component for Dorm Photos ---
const DormImageUploader = ({ photos, onImageChange }) => (
    <div>
        <h5 className="font-medium text-gray-800 mb-3">Dorm Photos</h5>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
             {Object.keys(photos).map((key) => (
                <label htmlFor={`dormImage${key}`} key={key} className="relative group cursor-pointer border-2 border-dashed rounded-lg h-28 flex items-center justify-center bg-gray-100 hover:border-blue-400 transition-colors">
                     {photos[key] ? (
                        <img className='w-full h-full object-cover rounded-md' src={URL.createObjectURL(photos[key])} alt={`Dorm photo ${key}`} />
                    ) : (
                        <div className="text-center text-gray-500">
                             <img src={assets.uploadArea} alt="Upload icon" className="mx-auto h-8 w-8 mb-1" />
                             <span className="text-xs font-medium">Upload</span>
                        </div>
                    )}
                    <input type="file" accept="image/*" id={`dormImage${key}`} hidden onChange={e => onImageChange(key, e.target.files[0])} />
                </label>
            ))}
        </div>
    </div>
);

// --- Main Form Component ---
const AddDormForm = ({ onAddDorm, onCancel }) => {
    const [formData, setFormData] = useState({
        // Properties from BookableUnit
        name: '',
        description: '',
        rules: '',
        amenities: [],
        photos: { 1: null, 2: null, 3: null, 4: null },
        
        // --- CORRECTED: Using property names that EXACTLY match the Dorm C# model ---
        numberOfBeds: '',
        pricePerBed: '',
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
        onAddDorm(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border border-dashed rounded-lg mt-4 space-y-6 bg-gray-50/70">
            <h4 className="text-lg font-semibold text-gray-800">Add New Dorm</h4>
            
            {/* Basic Info */}
            <div className="grid md:grid-cols-3 gap-4">
                <input type="text" name="name" placeholder="Dorm Name (e.g., 8-Bed Female)" value={formData.name} onChange={handleInputChange} className={textInputStyle} required />
                
                {/* --- CORRECTED: The `name` and `value` attributes now match the state --- */}
                <input type="number" name="numberOfBeds" placeholder="Number of Beds" value={formData.numberOfBeds} onChange={handleInputChange} className={textInputStyle} min="1" required />
                <input type="number" name="pricePerBed" placeholder="Price per Bed ($)" value={formData.pricePerBed} onChange={handleInputChange} className={textInputStyle} min="0" required />
            </div>

            {/* Description and Rules */}
            <div>
                <textarea name="description" placeholder="Describe the dorm and its facilities..." value={formData.description} onChange={handleInputChange} className={textInputStyle} rows="3" required></textarea>
            </div>
             <div>
                <textarea name="rules" placeholder="Dorm rules (e.g., Quiet hours, Age restrictions)..." value={formData.rules} onChange={handleInputChange} className={textInputStyle} rows="2"></textarea>
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

            <DormAmenitiesSelector selectedAmenities={formData.amenities} onToggleAmenity={handleToggleAmenity} />

            <DormImageUploader photos={formData.photos} onImageChange={handleImageChange} />

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors">Add Dorm</button>
                <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors">Cancel</button>
            </div>
        </form>
    );
};

export default AddDormForm;