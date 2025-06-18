import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CommonPropertyFields from '../components/forms/CommonPropertyFields';
import StandaloneAccommodationFields from '../components/forms/StandaloneAccomodationFields';
import { usePropertyCreation } from '../context/PropertyCreationContext';

// --- Define which types need the second step ---
const CONTAINER_TYPES = ['Hotel', 'Hostel', 'Riad'];
const PROPERTY_TYPES = ['Hotel', 'Appartement', 'Villa', 'Riad', 'Cottage', 'Hostel'];
const STANDALONE_TYPES = ['Appartement', 'Villa', 'Cottage', 'Riad'];

// --- Reusable Styles ---
const textInputStyle = "w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
const selectInputStyle = "w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white";

const AddProperty = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(propertyId);
    const { setPropertyData, resetCreationProcess } = usePropertyCreation();

    const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
    const [formData, setFormData] = useState({
        name: '', 
        description: '', 
        address: { street: '', city: '', country: '', postalCode: '' }, 
        images: { 1: null, 2: null, 3: null, 4: null },
        amenities: [],
        basePricePerNight: '', 
        capacity: '',
        starRating: '', 
        numberOfBedrooms: '', 
        numberOfBathrooms: '', 
        floorNumber: '',
        isDetached: false, 
        hasFireplace: false, 
        hasCourtyard: false, 
        traditionalDecor: false,
    });

    useEffect(() => {
        if (!isEditing) {
            resetCreationProcess();
        }
        if (isEditing) {
            console.log(`Fetching data for property ID: ${propertyId}`);
        }
    }, [isEditing, resetCreationProcess, propertyId]);

    const handleInputChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
    const handleAddressChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } })); };
    const handleImageChange = (key, file) => { setFormData(prev => ({ ...prev, images: { ...prev.images, [key]: file } })); };
    const handleToggleAmenity = (amenityId) => {
        setFormData(prev => {
            const currentAmenities = prev.amenities;
            if (currentAmenities.includes(amenityId)) {
                return { ...prev, amenities: currentAmenities.filter(id => id !== amenityId) };
            } else {
                return { ...prev, amenities: [...currentAmenities, amenityId] };
            }
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const propertyDetails = { type: propertyType, ...formData };
        setPropertyData(propertyDetails);
        if (CONTAINER_TYPES.includes(propertyType)) {
            const destination = isEditing ? `/properties/edit/${propertyId}/manage-units` : '/properties/add/manage-units';
            navigate(destination);
        } else {
            console.log("Submitting final data for STANDALONE property:", propertyDetails);
            alert('Standalone Property Ready for API Submission! Check console.');
            resetCreationProcess();
            navigate('/properties');
        }
    };
    const renderSpecificFields = () => {
        switch (propertyType) {
            case 'Hotel': case 'Hostel': return ( <div className="mt-6"> <label htmlFor="starRating" className="block text-gray-700 font-medium mb-1">Star Rating</label> <input type="number" id="starRating" name="starRating" value={formData.starRating} onChange={handleInputChange} min="1" max="5" className={textInputStyle}/> </div> );
            case 'Appartement': case 'Villa': case 'Cottage': return ( <div className="grid md:grid-cols-2 gap-6 mt-6"> <div> <label htmlFor="numberOfBedrooms" className="block text-gray-700 font-medium mb-1">Number of Bedrooms</label> <input type="number" id="numberOfBedrooms" name="numberOfBedrooms" value={formData.numberOfBedrooms} onChange={handleInputChange} className={textInputStyle}/> </div> <div> <label htmlFor="numberOfBathrooms" className="block text-gray-700 font-medium mb-1">Number of Bathrooms</label> <input type="number" id="numberOfBathrooms" name="numberOfBathrooms" value={formData.numberOfBathrooms} onChange={handleInputChange} className={textInputStyle}/> </div> {propertyType === 'Appartement' && ( <div> <label htmlFor="floorNumber" className="block text-gray-700 font-medium mb-1">Floor Number (Optional)</label> <input type="number" id="floorNumber" name="floorNumber" value={formData.floorNumber} onChange={handleInputChange} className={textInputStyle}/> </div> )} {propertyType === 'Cottage' && ( <> <div className="flex items-center gap-2 mt-2 col-span-2"> <input type="checkbox" id="isDetached" name="isDetached" checked={formData.isDetached} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="isDetached">Is Detached</label> </div> <div className="flex items-center gap-2 col-span-2"> <input type="checkbox" id="hasFireplace" name="hasFireplace" checked={formData.hasFireplace} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="hasFireplace">Has Fireplace</label> </div> </> )} </div> );
            case 'Riad': return ( <div className="flex items-center gap-4 mt-6"> <div className="flex items-center gap-2"><input type="checkbox" id="hasCourtyard" name="hasCourtyard" checked={formData.hasCourtyard} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="hasCourtyard">Has Courtyard</label></div> <div className="flex items-center gap-2"><input type="checkbox" id="traditionalDecor" name="traditionalDecor" checked={formData.traditionalDecor} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="traditionalDecor">Traditional Decor</label></div> </div> );
            default: return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-12">
             <Title
                align='left'
                font='outfit'
                title={`${isEditing ? 'Edit' : 'Add New'} Property${CONTAINER_TYPES.includes(propertyType) ? ' (Step 1 of 2)' : ''}`}
                subtitle={CONTAINER_TYPES.includes(propertyType) 
                    ? "First, provide the main details for your property." 
                    : "Provide the details for your property."
                }
            />

            <div className="mt-8">
                <label htmlFor="propertyType" className="block text-gray-700 font-medium mb-1">Property Type</label>
                <select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={selectInputStyle}>
                    {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div className="mt-6">
                {/* --- UPDATED: Pass the `propertyType` state as a prop --- */}
                <CommonPropertyFields 
                    formData={formData} 
                    propertyType={propertyType} 
                    handleInputChange={handleInputChange} 
                    handleAddressChange={handleAddressChange} 
                    handleImageChange={handleImageChange}
                    handleToggleAmenity={handleToggleAmenity} 
                />
                
                {STANDALONE_TYPES.includes(propertyType) && (
                    <StandaloneAccommodationFields formData={formData} handleInputChange={handleInputChange} />
                )}

                {renderSpecificFields()}
            </div>

            <div className="pt-8 mt-8 border-t border-gray-200">
                <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg'>
                    {CONTAINER_TYPES.includes(propertyType) ? 'Next: Add Rooms/Dorms' : (isEditing ? 'Save Changes' : 'Add Property')}
                </button>
            </div>
        </form>
    );
};

export default AddProperty;