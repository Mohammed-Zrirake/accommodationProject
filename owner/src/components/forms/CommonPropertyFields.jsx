import React from 'react';
import { assets } from '../../assets/assets';
import AmenitiesSelector from './AmenitiesSelector';
import { FiX } from 'react-icons/fi'; 
import { FiPlus } from 'react-icons/fi'; 


const textInputStyle = "w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

const ImageSlot = ({ image, onImageChange, onImageRemove }) => {
    return (
        <div className="relative group">
            <label 
                htmlFor={`propertyImage-${image.id}`}
                className="cursor-pointer border-2 border-dashed rounded-lg h-32 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
            >
                {image.file ? (
                    <img className='w-full h-full object-cover rounded-md' src={URL.createObjectURL(image.file)} alt="Property upload" />
                ) : (
                    <div className="text-center text-gray-500">
                        <img src={assets.uploadArea} alt="Upload" className="mx-auto h-8 w-8 mb-1" />
                        <span className="text-xs font-medium">Click to upload</span>
                    </div>
                )}
                <input 
                    type="file" 
                    accept='image/*' 
                    id={`propertyImage-${image.id}`} 
                    hidden 
                    onChange={e => onImageChange(image.id, e.target.files[0])} 
                />
            </label>
            {/* Show remove button only if there is an image */}
            {image.file && (
                 <button 
                    type="button"
                    onClick={() => onImageRemove(image.id)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                 >
                    <FiX size={14} />
                 </button>
            )}
        </div>
    );
};

const DynamicImageUploader = ({ images, onImageChange, onImageRemove, onAddSlot }) => (
    <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Property Images</h3>
        <p className='text-sm text-gray-500 mb-4'>Upload at least one high-quality image of your property.</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {images.map((img) => (
                <ImageSlot
                    key={img.id}
                    image={img}
                    onImageChange={onImageChange}
                    onImageRemove={onImageRemove}
                />
            ))}
             {/* Add more button */}
            <button
                type="button"
                onClick={onAddSlot}
                className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
                <FiPlus size={24} />
                <span className="text-sm mt-1">Add Image</span>
            </button>
        </div>
    </div>
);

const CommonPropertyFields = ({ 
    formData, 
    propertyType, 
    handleInputChange, 
    onImageChange,
    onImageRemove,
    onAddImageSlot,
    handleAddressChange,  
    onToggleAmenity
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
              <DynamicImageUploader 
                images={formData.images} 
                onImageChange={onImageChange}
                onImageRemove={onImageRemove}
                onAddSlot={onAddImageSlot}
            />
            
            {propertyType !== 'Hostel' && (
                <AmenitiesSelector 
                    selectedAmenities={formData.amenities}
                    onToggleAmenity={onToggleAmenity}
                />
            )}
        </div>
    );
};

export default CommonPropertyFields;