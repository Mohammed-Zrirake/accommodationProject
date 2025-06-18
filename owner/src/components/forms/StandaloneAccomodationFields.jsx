import React from 'react';

const textInputStyle = "w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

const StandaloneAccommodationFields = ({ formData, handleInputChange }) => (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
            <label htmlFor="basePricePerNight" className="block text-gray-700 font-medium mb-1">Price <span className='text-sm font-normal text-gray-500'>/night</span></label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input type="number" id="basePricePerNight" name="basePricePerNight" value={formData.basePricePerNight} onChange={handleInputChange} placeholder='0.00' className={`${textInputStyle} pl-8`} min="0" step="0.01"/>
            </div>
        </div>
        <div>
            <label htmlFor="capacity" className="block text-gray-700 font-medium mb-1">Max Guests (Capacity)</label>
            <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleInputChange} className={textInputStyle} min="1"/>
        </div>
    </div>
);

export default StandaloneAccommodationFields;