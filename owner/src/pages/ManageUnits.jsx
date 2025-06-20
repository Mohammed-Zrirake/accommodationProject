import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Title from '../components/Title';
import AddRoomForm from '../components/forms/AddRoomForm';
import AddDormForm from '../components/forms/AddDormForm';
import { FiTrash2, FiPlusCircle, FiChevronDown, FiChevronUp, FiEdit2 } from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';

const UnitDetailsCard = ({ unit, unitType }) => {
    const priceLabel = unitType === 'Room' ? 'Price/Night' : 'Price/Bed';
    const priceValue = unitType === 'Room' ? unit.pricePerNight : unit.basePricePerNight;
    const capacityLabel = unitType === 'Room' ? 'Capacity' : 'Beds';
    
    return (
        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-b-lg border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Unit Information</h4>
                    <div className="space-y-1 text-sm">
                        <p className="flex justify-between">
                            <span className="text-gray-500">{priceLabel}:</span>
                            <span className="font-medium text-blue-600">${priceValue}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-500">{capacityLabel}:</span>
                            <span className="font-medium">{unit.capacity}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-500">Type:</span>
                            <span className="font-medium">{unit.roomType || 'N/A'}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-500">Available:</span>
                            <span className={`font-medium ${unit.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                {unit.isAvailable ? 'Yes' : 'No'}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Description</h4>
                    <p className="text-sm text-gray-700">{unit.description || 'No description provided'}</p>
                    
                    {unit.rules && (
                        <div className="mt-2">
                            <h4 className="font-semibold text-gray-800 text-sm">Rules</h4>
                            <p className="text-sm text-gray-700">{unit.rules}</p>
                        </div>
                    )}

                    {unit.amenities?.length > 0 && (
                        <div className="mt-2">
                            <h4 className="font-semibold text-gray-800 text-sm">Amenities</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {unit.amenities.map((a, index) => (
                                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                                        {a.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const UnitCard = ({ 
    unit, 
    unitType, 
    isExpanded, 
    onToggleDetails, 
    onDelete 
}) => {
    const priceLabel = unitType === 'Room' ? 'Price/Night' : 'Price/Bed';
    const priceValue = unitType === 'Room' ? unit.pricePerNight : unit.basePricePerNight;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => onToggleDetails(unit.id)}
            >
                <div>
                    <h3 className="font-semibold text-gray-800">{unit.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {unit.roomType || 'N/A'}
                        </span>
                        <span className="text-sm text-gray-600">
                            {unit.capacity} {unitType === 'Room' ? 'guests' : 'beds'}
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                            ${priceValue}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(unit.id, unitType);
                        }} 
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete unit"
                    >
                        <FiTrash2 size={18}/>
                    </button>
                    <span className="text-blue-600">
                        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
            </div>
            
            {isExpanded && <UnitDetailsCard unit={unit} unitType={unitType} />}
        </div>
    );
};

const ManageUnits = () => {
    const { propertyId } = useParams();
    const [searchParams] = useSearchParams();
    const propertyType = searchParams.get('type');

    const [property, setProperty] = useState(null);
    const [units, setUnits] = useState({ rooms: [], dorms: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingRoom, setIsAddingRoom] = useState(false);
    const [isAddingDorm, setIsAddingDorm] = useState(false);
    const [expandedUnitId, setExpandedUnitId] = useState(null);

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
        
        submissionData.append('Name', dormData.name);
        submissionData.append('Description', dormData.description);
        submissionData.append('Capacity', dormData.capacity);
        submissionData.append('BasePricePerNight', dormData.basePricePerNight);
        submissionData.append('IsAvailable', dormData.isAvailable);
        if (dormData.rules) submissionData.append('Rules', dormData.rules);
        
        dormData.amenities.forEach(id => {
            submissionData.append('AmenityIds', id);
        });
        
        dormData.photos.forEach(file => {
            submissionData.append('Photos', file);
        });
        
        submissionData.append('HostelId', propertyId);

        try {
            const API_URL = 'http://localhost:5073/api/dorms';
            const response = await axios.post(API_URL, submissionData);

            setUnits(prev => ({ ...prev, dorms: [...prev.dorms, response.data] }));
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

            setUnits(prev => ({ ...prev, rooms: [...prev.rooms, response.data] }));
            setIsAddingRoom(false);
        } catch (err) {
            console.error("Failed to create room:", err.response || err);
            const errorMessage = err.response?.data?.error || err.response?.data?.title || 'Failed to add room.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUnit = async (unitId, unitType) => {
        if (!window.confirm(`Are you sure you want to delete this ${unitType}? This action cannot be undone.`)) {
            return;
        }

        const API_URL = unitType === 'Room' 
            ? `http://localhost:5073/api/room/${unitId}` 
            : `http://localhost:5073/api/dorms/${unitId}`;

        try {
            await axios.delete(API_URL);
            if (unitType === 'Room') {
                setUnits(prev => ({ ...prev, rooms: prev.rooms.filter(r => r.id !== unitId) }));
            } else { 
                setUnits(prev => ({ ...prev, dorms: prev.dorms.filter(d => d.id !== unitId) }));
            }
        } catch (err) {
            console.error(`Failed to delete ${unitType}:`, err.response || err);
            alert(`Error: Could not delete the ${unitType}. Please try again.`);
        }
    };

    const handleToggleDetails = (unitId) => {
        setExpandedUnitId(prevId => (prevId === unitId ? null : unitId));
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <PulseLoader color="#3B82F6" size={15} />
                <p className="mt-4 text-gray-600">Loading property details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg inline-block">
                    <p className="text-yellow-700">Property not found.</p>
                </div>
            </div>
        );
    }

    const roomSectionTitle = propertyType === 'Hostel' ? 'Private Rooms' : 'Rooms';

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <Title 
                        align="left" 
                        font="outfit" 
                        title={`Manage ${property.name}`}
                        subtitle={`${propertyType} units management`}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {units.rooms.length + units.dorms.length} units registered
                    </p>
                </div>
                
                <Link 
                    to="/properties" 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-colors flex items-center gap-2"
                >
                    ← Back to Properties
                </Link>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Rooms Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">{roomSectionTitle}</h3>
                    {!isAddingRoom && (
                        <button 
                            onClick={() => setIsAddingRoom(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            <FiPlusCircle size={18} />
                            Add {roomSectionTitle.slice(0, -1)}
                        </button>
                    )}
                </div>

                {isAddingRoom ? (
                    <AddRoomForm 
                        onAddRoom={handleAddRoom} 
                        onCancel={() => setIsAddingRoom(false)} 
                    />
                ) : units.rooms.length === 0 ? (
                    <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <h4 className="mt-2 text-sm font-medium text-gray-700">No {roomSectionTitle.toLowerCase()}</h4>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by adding a new {roomSectionTitle.slice(0, -1).toLowerCase()}.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {units.rooms.map(room => (
                            <UnitCard
                                key={room.id}
                                unit={room}
                                unitType="Room"
                                isExpanded={expandedUnitId === room.id}
                                onToggleDetails={handleToggleDetails}
                                onDelete={handleDeleteUnit}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Dorms Section */}
            {propertyType === 'Hostel' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">Dorms</h3>
                        {!isAddingDorm && !isAddingRoom && (
                            <button 
                                onClick={() => setIsAddingDorm(true)}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                <FiPlusCircle size={18} />
                                Add Dorm
                            </button>
                        )}
                    </div>

                    {isAddingDorm ? (
                        <AddDormForm 
                            onAddDorm={handleAddDorm} 
                            onCancel={() => setIsAddingDorm(false)} 
                        />
                    ) : units.dorms.length === 0 ? (
                        <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                            <h4 className="mt-2 text-sm font-medium text-gray-700">No dorms</h4>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by adding a new dormitory.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {units.dorms.map(dorm => (
                                <UnitCard
                                    key={dorm.id}
                                    unit={dorm}
                                    unitType="Dorm"
                                    isExpanded={expandedUnitId === dorm.id}
                                    onToggleDetails={handleToggleDetails}
                                    onDelete={handleDeleteUnit}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageUnits;