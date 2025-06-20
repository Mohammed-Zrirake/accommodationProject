import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Title from '../components/Title.jsx';
import { FiTrash2, FiGrid, FiChevronDown, FiChevronUp } from 'react-icons/fi';


const getStatusDetails = (status) => {
    switch (status) {
        case 0: case 'AVAILABLE': return { text: 'Available', color: 'bg-green-100 text-green-800' };
        case 1: case 'UNAVAILABLE': return { text: 'Unavailable', color: 'bg-red-100 text-red-800' };
        case 2: case 'MAINTENANCE': return { text: 'Maintenance', color: 'bg-blue-100 text-blue-800' };
        case 3: case 'PENDING_APPROVAL': return { text: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800' };
        case 4: case 'REJECTED': return { text: 'Rejected', color: 'bg-gray-200 text-gray-800' };
        default: return { text: 'N/A', color: 'bg-gray-100 text-gray-700' };
    }
};

const PropertyDetailsCard = ({ property }) => {
    const id = property.hotelId || property.hostelId || property.id;
    return (
        <tr className="bg-gray-50/50">
            <td colSpan="5" className="px-6 py-4">
                <div className="p-4 bg-white border rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{property.name} - Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                        <p><strong>ID:</strong> <span className="font-mono text-xs">{id}</span></p>
                        <p><strong>Location:</strong> {property.address?.street}, {property.address?.city}</p>
                        {property.basePricePerNight && <p><strong>Price/Night:</strong> ${property.basePricePerNight}</p>}
                        {property.capacity && <p><strong>Capacity:</strong> {property.capacity} guests</p>}
                        {property.starRating && <p><strong>Star Rating:</strong> {property.starRating} stars</p>}
                        <p className="col-span-full"><strong>Description:</strong> {property.description || 'N/A'}</p>
                        {property.amenities?.length > 0 && (
                             <p className="col-span-full"><strong>Amenities:</strong> {property.amenities.map(a => a.name).join(', ')}</p>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
};

const ListProperties = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);

    const API_ENDPOINTS = {
        'Hotel': 'http://localhost:5073/api/hotel',
        'Appartement': 'http://localhost:5073/api/appartment',
        'Villa': 'http://localhost:5073/api/villa',
        'Cottage': 'http://localhost:5073/api/cottage',
        'Riad': 'http://localhost:5073/api/riad',
        'Hostel': 'http://localhost:5073/api/hostel',
    };

  
    useEffect(() => {
        const fetchAllProperties = async () => {
            setIsLoading(true);
            setError(null);
            
            const requests = Object.entries(API_ENDPOINTS).map(([type, url]) => 
                axios.get(url).then(response => {
                    if (Array.isArray(response.data)) {
                        return response.data.map(item => ({ ...item, propertyType: type }));
                    }
                    return [];
                }).catch(err => {
                    console.warn(`Failed to fetch from ${url}:`, err.message);
                    return [];
                })
            );

            const results = await Promise.all(requests);
            setProperties(results.flat());
            setIsLoading(false);
        };

        fetchAllProperties();
    }, []); 

    
    const handleDelete = async (propertyId, propertyType) => {
        if (!window.confirm(`Are you sure you want to delete this ${propertyType}? This action cannot be undone.`)) {
            return;
        }
        const deleteUrl = `${API_ENDPOINTS[propertyType]}/${propertyId}`;
        try {
            await axios.delete(deleteUrl);
            setProperties(prev => prev.filter(p => {
                const currentId = p.hotelId || p.hostelId || p.id;
                return currentId !== propertyId;
            }));
            alert(`${propertyType} deleted successfully.`);
        } catch (err) {
            console.error(`Failed to delete ${propertyType}:`, err);
            alert(`Error: Could not delete the ${propertyType}.`);
        }
    };

    const handleToggleDetails = (propertyId) => {
        setExpandedPropertyId(prevId => (prevId === propertyId ? null : propertyId));
    };

    
    if (isLoading) return <div className="text-center p-10">Loading properties...</div>;
    if (error) return <div className="text-center p-10 text-red-500 font-semibold">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center">
                <Title align='left' font='outfit' title='My Properties' subtitle='Manage all your listings from here.' />
                <Link to="/properties/add" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-colors">
                    + Add New Property
                </Link>
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {properties.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-10 text-gray-500">No properties found. Click 'Add New Property' to get started.</td></tr>
                            ) : (
                                properties.map((prop) => {
                                    const id = prop.hotelId || prop.hostelId || prop.id;
                                    if (!id) return null;
                                    
                                    const statusDetails = getStatusDetails(prop.status);
                                    const containerTypes = ['Hotel', 'Hostel', 'Riad'];
                                    const isExpanded = expandedPropertyId === id;

                                    return (
                                        <React.Fragment key={id}>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prop.name ?? 'Unnamed Property'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.propertyType ?? 'Unknown'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.address?.city ?? 'N/A'}</td>
                                                <td className="px-6 py-4 text-center text-sm">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>{statusDetails.text}</span>
                                                </td>
                                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    <div className="flex justify-end space-x-3 items-center">
        <button onClick={() => handleToggleDetails(id)} title="View Details" className="text-blue-600 hover:text-blue-800">
            {isExpanded ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
        </button>
        
      
        {containerTypes.includes(prop.propertyType) && (
            <Link to={`/properties/${id}/manage-units?type=${prop.propertyType}`} title="Manage Rooms/Dorms" className="text-purple-600 hover:text-purple-800">
                <FiGrid className="h-5 w-5" />
            </Link>
        )}

        <button onClick={() => handleDelete(id, prop.propertyType)} title="Delete" className="text-red-600 hover:text-red-800">
            <FiTrash2 className="h-5 w-5" />
        </button>
    </div>
</td>
</tr>
{isExpanded && <PropertyDetailsCard property={prop} />}
</React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListProperties;