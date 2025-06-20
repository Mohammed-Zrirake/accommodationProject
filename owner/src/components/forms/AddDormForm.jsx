import React, { useState,useEffect } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';

// --- Reusable Styles ---
const textInputStyle = "w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

// --- Sub-component for Dorm-specific Amenities ---
const DormAmenitiesSelector = ({ selectedAmenities, onToggleAmenity }) => {
    // 2. Add state for fetching amenities
    const [allAmenities, setAllAmenities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Fetch data when the component mounts
    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const API_URL = 'http://localhost:5073/api/amenities';
                const response = await axios.get(API_URL);
                // You could filter here for amenities with a 'Dorm' category if you add one
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

    if (isLoading) return <p className="mt-4 text-gray-500">Loading dorm amenities...</p>;
    if (error) return <p className="mt-4 font-semibold text-red-500">{error}</p>;

    return (
        <div>
            <h5 className="font-medium text-gray-800 mb-3">Dorm Amenities</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                {/* 4. Map over the fetched amenities state */}
                {allAmenities.map(amenity => (
                     <div key={amenity.amenityId} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`dorm-amenity-${amenity.amenityId}`}
                            checked={selectedAmenities.includes(amenity.amenityId)}
                            onChange={() => onToggleAmenity(amenity.amenityId)}
                            className="h-4 w-4 rounded border-gray-300 ..."
                        />
                        <label htmlFor={`dorm-amenity-${amenity.amenityId}`} className="ml-2 text-sm ...">{amenity.name}</label>
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
        photos: { 1: null, 2: null, 3: null, 4: null , 5: null , 6: null },
        
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