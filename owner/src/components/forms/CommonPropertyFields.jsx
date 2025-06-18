import React from 'react';
import { assets } from '../../assets/assets';

// --- Reusable Styles ---
const textInputStyle = "w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

// --- Sub-component for Image Uploading (No changes needed) ---
const ImageUploader = ({ images, onImageChange }) => (
    <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Property Images</h3>
        <p className='text-sm text-gray-500 mb-4'>Upload up to 4 high-quality images of your property.</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {Object.keys(images).map((key) => (
                <label 
                    htmlFor={`propertyImage${key}`} 
                    key={key} 
                    className="relative group cursor-pointer border-2 border-dashed rounded-lg h-32 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                    {images[key] ? (
                        <img 
                            className='w-full h-full object-cover rounded-md' 
                            src={URL.createObjectURL(images[key])} 
                            alt={`Upload ${key}`} 
                        />
                    ) : (
                        <div className="text-center text-gray-500">
                            <img src={assets.uploadArea} alt="Upload" className="mx-auto h-8 w-8 mb-1" />
                            <span className="text-xs font-medium">Click to upload</span>
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept='image/*' 
                        id={`propertyImage${key}`} 
                        hidden 
                        onChange={e => onImageChange(key, e.target.files[0])} 
                    />
                </label>
            ))}
        </div>
    </div>
);

// --- Sub-component for Amenities Selection (No changes needed) ---
const AmenitiesSelector = ({ selectedAmenities, onToggleAmenity }) => {
    const ALL_AMENITIES = [
        { amenityId: 'pool', name: 'Pool' },
        { amenityId: 'gym', name: 'Gym' },
        { amenityId: 'parking', name: 'Free Parking' },
        { amenityId: 'restaurant', name: 'Restaurant on-site' },
        { amenityId: 'wifi', name: 'Wi-Fi' },
        { amenityId: 'ac', name: 'Air Conditioning' },
        { amenityId: 'tv', name: 'TV' },
        { amenityId: 'kitchen', name: 'Kitchen' },
    ];

    return (
        <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Property Amenities</h3>
            <p className="text-sm text-gray-500 mb-4">Select all amenities available at the property.</p>
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


// --- Main Component ---
// UPDATED to accept and use the `propertyType` prop.
const CommonPropertyFields = ({ 
    formData, 
    propertyType, // <-- NEW PROP
    handleInputChange, 
    handleAddressChange, 
    handleImageChange, 
    handleToggleAmenity 
}) => {
    return (
        <div className="space-y-6">
            {/* --- Property Name & Description Section --- */}
            <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Property Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={textInputStyle} placeholder="e.g., Grand Hyatt Hotel" required />
            </div>
            <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="4" className={textInputStyle} placeholder="Describe the unique features of your property..." required></textarea>
            </div>
            
            {/* --- Address Section --- */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="street" className="block text-gray-700 font-medium mb-1">Street</label>
                        <input type="text" id="street" name="street" value={formData.address.street} onChange={handleAddressChange} className={textInputStyle} required />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-gray-700 font-medium mb-1">City</label>
                        <input type="text" id="city" name="city" value={formData.address.city} onChange={handleAddressChange} className={textInputStyle} required />
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
                        <input type="text" id="country" name="country" value={formData.address.country} onChange={handleAddressChange} className={textInputStyle} required />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1">Postal Code (Optional)</label>
                        <input type="text" id="postalCode" name="postalCode" value={formData.address.postalCode} onChange={handleAddressChange} className={textInputStyle} />
                    </div>
                </div>
            </div>

            {/* --- Image Uploader Section --- */}
            <ImageUploader images={formData.images} onImageChange={handleImageChange} />

            {/* --- CONDITIONAL Amenities Selector Section --- */}
            {/* This now checks the propertyType before rendering the amenities selector */}
            {propertyType !== 'Hostel' && (
                <AmenitiesSelector 
                    selectedAmenities={formData.amenities}
                    onToggleAmenity={handleToggleAmenity}
                />
            )}
        </div>
    );
};

export default CommonPropertyFields;