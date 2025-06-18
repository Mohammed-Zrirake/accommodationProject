import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePropertyCreation } from '../context/PropertyCreationContext';
import Title from '../components/Title';
import AddRoomForm from '../components/forms/AddRoomForm';
import AddDormForm from '../components/forms/AddDormForm'; // 1. Import the new dorm form
import { FiTrash2, FiPlusCircle } from 'react-icons/fi';

const ManageUnits = () => {
    const navigate = useNavigate();
    // 2. Destructure the dorm-related functions from the context
    const { propertyData, rooms, addRoom, removeRoom, dorms, addDorm, removeDorm, resetCreationProcess } = usePropertyCreation();
    
    // State to control form visibility
    const [isAddingRoom, setIsAddingRoom] = useState(false);
    const [isAddingDorm, setIsAddingDorm] = useState(false); // 3. Add state for the dorm form

    useEffect(() => {
        if (!propertyData) {
            navigate('/properties/add');
        }
    }, [propertyData, navigate]);

    // Handlers for adding units
    const handleAddRoom = (roomData) => {
        addRoom(roomData);
        setIsAddingRoom(false); // Hide form after adding
    };

    const handleAddDorm = (dormData) => {
        addDorm(dormData);
        setIsAddingDorm(false); // Hide form after adding
    };

    // Final submission handler
    const handleFinalSubmit = () => {
        const finalPayload = {
            ...propertyData,
            // 4. Clean tempId from both rooms and dorms before submission
            rooms: rooms.map(({ tempId, ...rest }) => rest), 
            dorms: dorms.map(({ tempId, ...rest }) => rest),
        };

        console.log("--- FINAL SUBMISSION PAYLOAD ---");
        console.log(JSON.stringify(finalPayload, null, 2));
        alert("Check the console for the final combined data!");
        resetCreationProcess();
        navigate('/properties');
    };

    if (!propertyData) return null;

    // A small helper for better UI text
    const roomSectionTitle = propertyData.type === 'Hostel' ? 'Private Rooms' : 'Rooms';

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-12">
            <Title
                align='left'
                font='outfit'
                title={`Manage Units for: ${propertyData.name}`}
                subtitle={`You are adding units for a ${propertyData.type}.`}
            />

            {/* --- Room Management Section (now also for Hostel private rooms) --- */}
            {(propertyData.type === 'Hotel' || propertyData.type === 'Riad' || propertyData.type === 'Hostel') && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">{roomSectionTitle}</h3>
                        {!isAddingRoom && !isAddingDorm && (
                            <button onClick={() => setIsAddingRoom(true)} className="flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <FiPlusCircle />
                                Add New {propertyData.type === 'Hostel' ? 'Private Room' : 'Room'}
                            </button>
                        )}
                    </div>
                    {rooms.length === 0 && !isAddingRoom ? (
                        <p className="text-gray-500 mt-2">No {roomSectionTitle.toLowerCase()} added yet.</p>
                    ) : (
                        <ul className="mt-4 space-y-3">
                            {rooms.map(room => (
                                <li key={room.tempId} className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{room.name}</p>
                                            <p className="text-sm text-green-700">${room.basePricePerNight}/night</p>
                                            <p className="text-sm text-gray-600">{room.capacity} guests max</p>
                                        </div>
                                        <button onClick={() => removeRoom(room.tempId)} className="text-red-500 hover:text-red-700 p-1"><FiTrash2 size={18}/></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {isAddingRoom && <AddRoomForm onAddRoom={handleAddRoom} onCancel={() => setIsAddingRoom(false)} />}
                </div>
            )}
            
            {/* --- Dorm Management Section (only for Hostels) --- */}
            {propertyData.type === 'Hostel' && (
                 <div className="mt-8 border-t pt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Dorms</h3>
                        {!isAddingDorm && !isAddingRoom && (
                            <button onClick={() => setIsAddingDorm(true)} className="flex items-center gap-2 text-sm bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                <FiPlusCircle />
                                Add New Dorm
                            </button>
                        )}
                    </div>
                    {dorms.length === 0 && !isAddingDorm ? (
                        <p className="text-gray-500 mt-2">No dorms added yet.</p>
                    ) : (
                        <ul className="mt-4 space-y-3">
                            {dorms.map(dorm => (
                                <li key={dorm.tempId} className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{dorm.name}</p>
                                            <p className="text-sm text-green-700">${dorm.basePricePerNight}/bed</p>
                                            <p className="text-sm text-gray-600">{dorm.capacity} beds</p>
                                        </div>
                                        <button onClick={() => removeDorm(dorm.tempId)} className="text-red-500 hover:text-red-700 p-1"><FiTrash2 size={18}/></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {isAddingDorm && <AddDormForm onAddDorm={handleAddDorm} onCancel={() => setIsAddingDorm(false)} />}
                 </div>
            )}

            {/* --- Final Actions --- */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                <Link to="/properties/add" className="text-gray-600 hover:underline">
                    ← Back to Property Details
                </Link>
                <button onClick={handleFinalSubmit} className='bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium shadow-md'>
                    Finish & Add Property
                </button>
            </div>
        </div>
    );
};

export default ManageUnits;