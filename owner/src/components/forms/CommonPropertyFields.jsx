import React from 'react';
import { assets } from '../../assets/assets';
import AmenitiesSelector from './AmenitiesSelector';
import { FiX } from 'react-icons/fi'; 


const textInputStyle = "w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
const ImageUploader = ({ images, onImageAdd, onImageRemove }) => {
    const MAX_IMAGES = 15;

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onImageAdd(e.target.files[0]);
        }
    };

    return (
        <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Property Images</h3>
            <p className='text-sm text-gray-500 mb-4'>Upload up to {MAX_IMAGES} high-quality images of your property.</p>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
               
                {images.map((image, index) => (
                    <div key={index} className="relative group h-32">
                        <img 
                            className='w-full h-full object-cover rounded-lg' 
                            src={URL.createObjectURL(image)} 
                            alt={`Property upload ${index + 1}`} 
                        />
                        <button
                            type="button"
                            onClick={() => onImageRemove(index)}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                            aria-label="Remove image"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                ))}

               
                {images.length < MAX_IMAGES && (
                    <label 
                        htmlFor="image-upload"
                        className="cursor-pointer border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <img src={assets.uploadArea} alt="Upload" className="h-8 w-8 mb-1" />
                        <span className="text-xs font-medium text-gray-600">Click to upload</span>
                        <input 
                            type="file" 
                            id="image-upload"
                            accept='image/*' 
                            hidden 
                            onChange={handleFileChange}
                        />
                    </label>
                )}
            </div>
        </div>
    );
};


const CommonPropertyFields = ({ 
    formData, 
    propertyType, 
    handleInputChange, 
    handleAddressChange, 
    handleImageChange, 
    handleToggleAmenity,
    handleImageAdd,     // <-- NEW
    handleImageRemove,
}) => {
    return (
        <div className="space-y-6">
          
            <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Property Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={textInputStyle} placeholder="e.g., Grand Hyatt Hotel" required />
            </div>
            <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="4" className={textInputStyle} placeholder="Describe the unique features of your property..." required></textarea>
            </div>
            
        
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
            <ImageUploader images={formData.images} onImageChange={handleImageChange} />
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