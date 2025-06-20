import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Title from '../components/Title';
import CommonPropertyFields from '../components/forms/CommonPropertyFields';
import StandaloneAccommodationFields from '../components/forms/StandaloneAccomodationFields';
import { usePropertyCreation } from '../context/PropertyCreationContext';

const CONTAINER_TYPES = ['Hotel', 'Hostel', 'Riad'];
const PROPERTY_TYPES = ['Hotel', 'Appartement', 'Villa', 'Riad', 'Cottage', 'Hostel'];
const STANDALONE_TYPES = ['Appartement', 'Villa', 'Cottage', 'Riad'];
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
       images: [
            { id: 1, file: null },
            { id: 2, file: null },
            { id: 3, file: null },
            { id: 4, file: null },
        ],
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleImageChange = (id, file) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.map(img => img.id === id ? { ...img, file: file } : img)
        }));
    };
    const handleImageRemove = (idToRemove) => {
    setFormData(prev => ({
        ...prev,
        // Use filter to create a new array that EXCLUDES the image with the matching id.
        images: prev.images.filter(image => image.id !== idToRemove)
    }));
    };
    const handleAddImageSlot = () => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, { id: Date.now(), file: null }] // Use timestamp for unique ID
        }));
    };

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
    
    const renderSpecificFields = () => {
        switch (propertyType) {
            case 'Hotel': case 'Hostel': return ( <div className="mt-6"> <label htmlFor="starRating" className="block text-gray-700 font-medium mb-1">Star Rating</label> <input type="number" id="starRating" name="starRating" value={formData.starRating} onChange={handleInputChange} min="1" max="5" className={textInputStyle}/> </div> );
            case 'Appartement': case 'Villa': case 'Cottage': return ( <div className="grid md:grid-cols-2 gap-6 mt-6"> <div> <label htmlFor="numberOfBedrooms" className="block text-gray-700 font-medium mb-1">Number of Bedrooms</label> <input type="number" id="numberOfBedrooms" name="numberOfBedrooms" value={formData.numberOfBedrooms} onChange={handleInputChange} className={textInputStyle}/> </div> <div> <label htmlFor="numberOfBathrooms" className="block text-gray-700 font-medium mb-1">Number of Bathrooms</label> <input type="number" id="numberOfBathrooms" name="numberOfBathrooms" value={formData.numberOfBathrooms} onChange={handleInputChange} className={textInputStyle}/> </div> {propertyType === 'Appartement' && ( <div> <label htmlFor="floorNumber" className="block text-gray-700 font-medium mb-1">Floor Number (Optional)</label> <input type="number" id="floorNumber" name="floorNumber" value={formData.floorNumber} onChange={handleInputChange} className={textInputStyle}/> </div> )} {propertyType === 'Cottage' && ( <> <div className="flex items-center gap-2 mt-2 col-span-2"> <input type="checkbox" id="isDetached" name="isDetached" checked={formData.isDetached} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="isDetached">Is Detached</label> </div> <div className="flex items-center gap-2 col-span-2"> <input type="checkbox" id="hasFireplace" name="hasFireplace" checked={formData.hasFireplace} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="hasFireplace">Has Fireplace</label> </div> </> )} </div> );
            case 'Riad': return ( <div className="flex items-center gap-4 mt-6"> <div className="flex items-center gap-2"><input type="checkbox" id="hasCourtyard" name="hasCourtyard" checked={formData.hasCourtyard} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="hasCourtyard">Has Courtyard</label></div> <div className="flex items-center gap-2"><input type="checkbox" id="traditionalDecor" name="traditionalDecor" checked={formData.traditionalDecor} onChange={handleInputChange} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/> <label htmlFor="traditionalDecor">Traditional Decor</label></div> </div> );
            default: return null;
        }
    };



const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const propertyDetails = { type: propertyType, ...formData };
    const apiEndpoints = {
        'Appartement': 'http://localhost:5073/api/appartment',
        'Villa': 'http://localhost:5073/api/villa',
        'Cottage': 'http://localhost:5073/api/cottage',
        'Riad': 'http://localhost:5073/api/riad',
        'Hotel': 'http://localhost:5073/api/hotel',
        'Hostel': 'http://localhost:5073/api/hostel',
    };

    const API_URL = apiEndpoints[propertyType];

    if (!API_URL) {
        alert(`API submission for '${propertyType}' is not yet implemented.`);
        setIsLoading(false);
        return;
    }

 
    const submissionData = new FormData();
    submissionData.append('Name', propertyDetails.name);
    submissionData.append('Description', propertyDetails.description);
    submissionData.append('Address.Street', propertyDetails.address.street);
    submissionData.append('Address.City', propertyDetails.address.city);
    submissionData.append('Address.Country', propertyDetails.address.country);
    submissionData.append('Address.PostalCode', propertyDetails.address.postalCode || '');

   
    propertyDetails.images.forEach(img => {
        if (img.file) submissionData.append('Photos', img.file);
    });

  
    switch (propertyType) {
        case 'Appartement':
            submissionData.append('Id', "B4FE4FA2-8F1C-42A4-8FCE-6ED3B40EFE37");
            submissionData.append('BasePricePerNight', propertyDetails.basePricePerNight);
            submissionData.append('Capacity', propertyDetails.capacity);
            submissionData.append('NumberOfBedrooms', propertyDetails.numberOfBedrooms);
            submissionData.append('NumberOfBathrooms', propertyDetails.numberOfBathrooms);
            if (propertyDetails.floorNumber) {
                submissionData.append('FloorNumber', propertyDetails.floorNumber);
            }
            propertyDetails.amenities.forEach(id => submissionData.append('AmenityIds', id));
            break;
            
        case 'Villa':
             submissionData.append('Id', "B4FE4FA2-8F1C-42A4-8FCE-6ED3B40EFE37");
            submissionData.append('BasePricePerNight', propertyDetails.basePricePerNight);
            submissionData.append('Capacity', propertyDetails.capacity);
            submissionData.append('NumberOfBedrooms', propertyDetails.numberOfBedrooms);
            submissionData.append('NumberOfBathrooms', propertyDetails.numberOfBathrooms);
            propertyDetails.amenities.forEach(id => submissionData.append('AmenityIds', id));
            break;

        case 'Cottage':
            submissionData.append('Id', "B4FE4FA2-8F1C-42A4-8FCE-6ED3B40EFE37");
            submissionData.append('BasePricePerNight', propertyDetails.basePricePerNight);
            submissionData.append('Capacity', propertyDetails.capacity);
            submissionData.append('NumberOfBedrooms', propertyDetails.numberOfBedrooms);
            submissionData.append('NumberOfBathrooms', propertyDetails.numberOfBathrooms);
            submissionData.append('IsDetached', propertyDetails.isDetached);
            submissionData.append('HasFireplace', propertyDetails.hasFireplace);
            propertyDetails.amenities.forEach(id => submissionData.append('AmenityIds', id));
            break;
        
        case 'Riad':
             submissionData.append('Id', "B4FE4FA2-8F1C-42A4-8FCE-6ED3B40EFE37");
            submissionData.append('BasePricePerNight', propertyDetails.basePricePerNight);
            submissionData.append('Capacity', propertyDetails.capacity);
            submissionData.append('HasCourtyard', propertyDetails.hasCourtyard);
            submissionData.append('TraditionalDecor', propertyDetails.traditionalDecor);
            propertyDetails.amenities.forEach(id => submissionData.append('AmenityIds', id));
            break;

        case 'Hotel':
             submissionData.append('HotelId', "B4FE4FA2-8F1C-42A4-8FCE-6ED3B40EFE37");
            submissionData.append('StarRating', propertyDetails.starRating);
            propertyDetails.amenities.forEach(id => submissionData.append('AmenityIds', id));
            break;

        case 'Hostel':
             submissionData.append('HostelId', "B4FE4FA2-8F1C-42A4-8FCE-6ED3B40EFE37")
            submissionData.append('StarRating', propertyDetails.starRating);
            propertyDetails.amenities.forEach(id => submissionData.append('AmenityIds', id));
            break;

        default:
            break;
    }
    
   
    try {
        await axios.post(API_URL, submissionData);
        alert(`${propertyType} created successfully!`);
        navigate('/properties');

    } catch (err) {
        console.error('API Error:', err.response || err);
        const errorMessage = err.response?.data?.errors 
            ? Object.values(err.response.data.errors).flat().join(' ') // Handles .NET validation errors
            : err.response?.data?.title || err.response?.data?.error || err.message || 'An unknown error occurred.';
        setError(`Submission failed: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
};
    
    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-12">
             <Title
                align='left'
                font='outfit'
                 title={`${isEditing ? 'Edit' : 'Add New'} Property`}
                subtitle="Provide the details for your property."
            
            />

            <div className="mt-8">
                <label htmlFor="propertyType" className="block text-gray-700 font-medium mb-1">Property Type</label>
                <select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={selectInputStyle}>
                    {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div className="mt-6">
                <CommonPropertyFields 
                    formData={formData} 
                    propertyType={propertyType} 
                    handleInputChange={handleInputChange} 
                    handleAddressChange={handleAddressChange} 
                    onImageChange={handleImageChange}
                    onImageRemove={handleImageRemove}
                    onAddImageSlot={handleAddImageSlot}
                    onToggleAmenity={handleToggleAmenity} 
                  

                />
                
                {STANDALONE_TYPES.includes(propertyType) && (
                    <StandaloneAccommodationFields formData={formData} handleInputChange={handleInputChange} />
                )}

                {renderSpecificFields()}
            </div>

            <div className="pt-8 mt-8 border-t border-gray-200">
                <button type="submit" disabled={isLoading} className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium ...'>
                    {isLoading ? 'Submitting...' : (isEditing ? 'Save Changes' : 'Add Property')}
                </button>
                {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
            </div>
        </form>
    );
};

export default AddProperty;