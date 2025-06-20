import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Title from '../components/Title';
import AddRoomForm from '../components/forms/AddRoomForm';
import AddDormForm from '../components/forms/AddDormForm';
import { FiTrash2, FiPlusCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const UnitDetailsCard = ({ unit, unitType }) => {
    // Determine the correct price and capacity labels based on unit type
    const priceLabel = unitType === 'Room' ? 'Price/Night' : 'Price/Bed';
    const priceValue = unitType === 'Room' ? unit.pricePerNight : unit.pricePerBed;
    const capacityLabel = unitType === 'Room' ? 'Capacity' : 'Beds';
    const capacityValue = unitType === 'Room' ? unit.capacity : unit.numberOfBeds;

    return (
        <div className="p-4 border-t border-gray-200">
            <h5 className="font-semibold text-gray-700 mb-2">Details</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700">
                <p><strong>{priceLabel}:</strong> ${priceValue}</p>
                <p><strong>{capacityLabel}:</strong> {capacityValue}</p>
                <p><strong>Type:</strong> {unit.roomType || 'N/A'}</p>
                <p><strong>Available:</strong> {unit.isAvailable ? 'Yes' : 'No'}</p>
                {unit.rules && <p className="col-span-full mt-1"><strong>Rules:</strong> {unit.rules}</p>}
                <p className="col-span-full mt-1"><strong>Description:</strong> {unit.description}</p>
                {unit.amenities?.length > 0 && (
                     <p className="col-span-full mt-1"><strong>Amenities:</strong> {unit.amenities.map(a => a.name).join(', ')}</p>
                )}
            </div>
        </div>
    );
};

const ManageUnits = () => {
    // 1. Get the property ID and type from the URL
    const { propertyId } = useParams();
    const [searchParams] = useSearchParams();
    const propertyType = searchParams.get('type');

    // 2. State is now local to this component
    const [property, setProperty] = useState(null);
    const [units, setUnits] = useState({ rooms: [], dorms: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingRoom, setIsAddingRoom] = useState(false);
    const [isAddingDorm, setIsAddingDorm] = useState(false);
    const [expandedUnitId, setExpandedUnitId] = useState(null);

    // Endpoint mapping
    const API_ENDPOINTS = {
        'Hotel': 'http://localhost:5073/api/hotel',
        'Riad': 'http://localhost:5073/api/riad',
        'Hostel': 'http://localhost:5073/api/hostel',
    };

    
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            if (!propertyId || !propertyType || !API_ENDPOINTS[propertyType]) {
                setError("Invalid property details provided.");
                setIsLoading(false);
                return;
            }

            const url = `${API_ENDPOINTS[propertyType]}/${propertyId}`;
            try {
                const response = await axios.get(url);
                setProperty(response.data);
                
                
                if (propertyType === 'Hostel') {
                    setUnits({ rooms: response.data.privateRooms || [], dorms: response.data.dorms || [] });
                } else {
                    setUnits({ rooms: response.data.rooms || [], dorms: [] });
                }

            } catch (err) {
                console.error("Failed to fetch property details:", err);
                setError("Could not load property details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [propertyId, propertyType]);

    
     const handleAddDorm = async (dormData) => {
        setIsLoading(true);
        setError(null);

        const submissionData = new FormData();
        
        // Append all fields for the dorm
        submissionData.append('Name', dormData.name);
        submissionData.append('Description', dormData.description);
        submissionData.append('NumberOfBeds', dormData.numberOfBeds);
        submissionData.append('PricePerBed', dormData.pricePerBed);
        submissionData.append('IsAvailable', dormData.isAvailable);
        if (dormData.rules) submissionData.append('Rules', dormData.rules);
        
        dormData.amenities.forEach(id => {
            submissionData.append('AmenityIds', id);
        });
        
        
        dormData.images.forEach(imageObj => {
            if (imageObj.file instanceof File) {
                submissionData.append('Photos', imageObj.file);
            }
        });
        
        submissionData.append('HostelId', propertyId);

        try {
            const API_URL = 'http://localhost:5073/api/dorms';
            const response = await axios.post(API_URL, submissionData);

            setUnits(prev => ({ ...prev, dorms: [...prev.dorms, response.data] }));
            alert('Dorm added successfully!');
            setIsAddingDorm(false); 

        } catch (err) {
            console.error("Failed to create dorm:", err.response || err);
            const errorMessage = err.response?.data?.error || err.response?.data?.title || 'Failed to add dorm.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
   
     const handleAddRoom = async (roomData) => {
        setIsLoading(true); 
        setError(null);

        
        const submissionData = new FormData();
        
        
        submissionData.append('Name', roomData.name);
        submissionData.append('Description', roomData.description);
        submissionData.append('Capacity', roomData.capacity);
        submissionData.append('PricePerNight', roomData.pricePerNight);
        submissionData.append('RoomType', roomData.roomType);
        submissionData.append('IsAvailable', roomData.isAvailable);
        if (roomData.rules) {
            submissionData.append('Rules', roomData.rules);
        }
        roomData.amenities.forEach(id => {
            submissionData.append('AmenityIds', id);
        });
        roomData.photos.forEach(file => {
            submissionData.append('Photos', file);
        });

    
        
        if (propertyType === 'Hotel') {
            submissionData.append('HotelId', propertyId);
        } else if (propertyType === 'Riad') {
            submissionData.append('RiadId', propertyId);
        } else if (propertyType === 'Hostel') {
            submissionData.append('HostelId', propertyId);
        }

        try {
            const API_URL = 'http://localhost:5073/api/room';
            const response = await axios.post(API_URL, submissionData);

            // Add the new room to the state to update the UI instantly
            setUnits(prev => ({ ...prev, rooms: [...prev.rooms, response.data] }));
            
            alert('Room added successfully!');
            setIsAddingRoom(false); // Hide the form

        } catch (err) {
            console.error("Failed to create room:", err.response || err);
            const errorMessage = err.response?.data?.error || err.response?.data?.title || 'Failed to add room.';
            setError(errorMessage);
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };
        const handleDeleteUnit = (unitId, unitType) => {
        if (window.confirm(`Are you sure you want to delete this ${unitType}?`)) {
            // TODO: Implement API DELETE request to `/api/room/{unitId}` or `/api/dorm/{unitId}`
            console.log(`Requesting to delete ${unitType} with ID: ${unitId}`);
            alert(`Delete functionality for ${unitType} not yet implemented.`);
        }
    };

     const handleToggleDetails = (unitId) => {
        setExpandedUnitId(prevId => (prevId === unitId ? null : unitId));
    };

  

    if (isLoading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center p-10 text-red-500 font-semibold">{error}</div>;
    if (!property) return <div className="text-center p-10">Property not found.</div>;

    const roomSectionTitle = propertyType === 'Hostel' ? 'Private Rooms' : 'Rooms';

    return (
         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-12">
            <Title align='left' font='outfit' title={`Manage Units for: ${property.name}`} subtitle={`You are managing units for a ${propertyType}.`} />
            {error && <p className="my-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</p>}

            {/* --- Room Management Section --- */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{roomSectionTitle}</h3>
                    {!isAddingRoom && <button onClick={() => setIsAddingRoom(true)} className="flex ..."><FiPlusCircle /> Add New {roomSectionTitle.slice(0, -1)}</button>}
                </div>
                {units.rooms?.length === 0 && !isAddingRoom ? (
                    <p className="text-gray-500 mt-2">No {roomSectionTitle.toLowerCase()} added yet.</p>
                ) : (
                    <ul className="mt-4 space-y-3">
                        {units.rooms?.map(room => {
                            // 3. Check if the current room is the one that's expanded
                            const isExpanded = expandedUnitId === room.id;
                            return (
                                <li key={room.id} className="bg-gray-50 rounded-lg border">
                                    <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => handleToggleDetails(room.id)}>
                                        <div>
                                            <p className="font-semibold">{room.name}</p>
                                            <p className="text-sm text-gray-600">{room.roomType} - {room.capacity} guests</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteUnit(room.id, 'Room'); }} className="text-red-500 hover:text-red-700 p-1"><FiTrash2 size={18}/></button>
                                            <span className="text-blue-600">
                                                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                            </span>
                                        </div>
                                    </div>
                                    {isExpanded && <UnitDetailsCard unit={room} unitType="Room" />}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {isAddingRoom && <AddRoomForm onAddRoom={handleAddRoom} onCancel={() => setIsAddingRoom(false)} />}
            </div>
            
            {/* --- Dorm Management Section with List --- */}
             {propertyType === 'Hostel' && (
                 <div className="mt-8 border-t pt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Dorms</h3>
                        {/* --- Corrected visibility logic --- */}
                        {!isAddingDorm && !isAddingRoom && (
                            <button onClick={() => setIsAddingDorm(true)} className="flex items-center gap-2 text-sm bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                <FiPlusCircle /> Add New Dorm
                            </button>
                        )}
                    </div>
                    {units.dorms?.length === 0 && !isAddingDorm ? (
                        <p className="text-gray-500 mt-2">No dorms added yet.</p>
                    ) : (
                        <ul className="mt-4 space-y-3">
                            {units.dorms?.map(dorm => {
                                const isExpanded = expandedUnitId === dorm.id;
                                return (
                                    <li key={dorm.id} className="bg-gray-50 rounded-lg border">
                                         <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => handleToggleDetails(dorm.id)}>
                                            <div>
                                                <p className="font-semibold">{dorm.name}</p>
                                                <p className="text-sm text-gray-600">{dorm.numberOfBeds} beds - ${dorm.pricePerBed}/bed</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                 <button onClick={(e) => { e.stopPropagation(); handleDeleteUnit(dorm.id, 'Dorm'); }} className="text-red-500 hover:text-red-700 p-1"><FiTrash2 size={18}/></button>
                                                 <span className="text-blue-600">
                                                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                                 </span>
                                            </div>
                                        </div>
                                        {isExpanded && <UnitDetailsCard unit={dorm} unitType="Dorm" />}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {isAddingDorm && <AddDormForm onAddDorm={handleAddDorm} onCancel={() => setIsAddingDorm(false)} />}
                 </div>
            )}

            {/* Back Button */}
            <div className="flex justify-end pt-8 mt-8 border-t border-gray-200">
                <Link to="/properties" className='bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium shadow-md'>
                    Back to Properties
                </Link>
            </div>
        </div>
    );

};
export default ManageUnits;