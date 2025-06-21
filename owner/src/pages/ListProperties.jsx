import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Title from '../components/Title.jsx';
import { FiTrash2, FiGrid, FiChevronDown, FiChevronUp, FiEdit2, FiPlus } from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';

const getStatusDetails = (status) => {
    const statusMap = {
        0: { text: 'Available', color: 'bg-green-100 text-green-800', icon: '🟢' },
        1: { text: 'Unavailable', color: 'bg-red-100 text-red-800', icon: '🔴' },
        2: { text: 'Maintenance', color: 'bg-blue-100 text-blue-800', icon: '🔧' },
        3: { text: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
        4: { text: 'Rejected', color: 'bg-gray-200 text-gray-800', icon: '❌' },
        'AVAILABLE': { text: 'Available', color: 'bg-green-100 text-green-800', icon: '🟢' },
        'UNAVAILABLE': { text: 'Unavailable', color: 'bg-red-100 text-red-800', icon: '🔴' },
        'MAINTENANCE': { text: 'Maintenance', color: 'bg-blue-100 text-blue-800', icon: '🔧' },
        'PENDING_APPROVAL': { text: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
        'REJECTED': { text: 'Rejected', color: 'bg-gray-200 text-gray-800', icon: '❌' }
    };
    
    return statusMap[status] || { text: 'N/A', color: 'bg-gray-100 text-gray-700', icon: '❓' };
};

const PropertyDetailsCard = ({ property }) => {
    const id = property.hotelId || property.hostelId || property.id;
    const statusDetails = getStatusDetails(property.status);
    
    return (
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm mt-2 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <span className="mr-2">{statusDetails.icon}</span>
                        Property Details
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                            <span className="text-gray-500">ID:</span>
                            <span className="font-mono text-gray-700">{id}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusDetails.color}`}>
                                {statusDetails.text}
                            </span>
                        </p>
                        {property.basePricePerNight && (
                            <p className="flex justify-between">
                                <span className="text-gray-500">Price/Night:</span>
                                <span className="font-medium text-blue-600">${property.basePricePerNight}</span>
                            </p>
                        )}
                        {property.capacity && (
                            <p className="flex justify-between">
                                <span className="text-gray-500">Capacity:</span>
                                <span className="font-medium">{property.capacity} guests</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-800">Location</h3>
                    <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                            <span className="text-gray-500">Address:</span>
                            <span className="text-gray-700 text-right">
                                {property.address?.street || 'N/A'}, {property.address?.city || 'N/A'}
                            </span>
                        </p>
                        {property.starRating && (
                            <p className="flex justify-between">
                                <span className="text-gray-500">Rating:</span>
                                <span className="flex items-center text-yellow-500">
                                    {'★'.repeat(property.starRating)}{'☆'.repeat(5 - property.starRating)}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-800">Features</h3>
                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="text-gray-500">Description:</span>{' '}
                            <span className="text-gray-700">{property.description || 'N/A'}</span>
                        </p>
                        {property.amenities?.length > 0 && (
                            <div>
                                <span className="text-gray-500">Amenities:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {property.amenities.map((a, index) => (
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
        </div>
    );
};

const PropertyCard = ({ property, onDelete, onToggleDetails, isExpanded }) => {
    const id = property.hotelId || property.hostelId || property.id;
    const statusDetails = getStatusDetails(property.status);
    const containerTypes = ['Hotel', 'Hostel', 'Riad'];

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{property.name || 'Unnamed Property'}</h3>
                        <div className="flex items-center mt-1 space-x-3">
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {property.propertyType || 'Unknown'}
                            </span>
                            <span className="text-sm text-gray-500">
                                {property.address?.city || 'N/A'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs ${statusDetails.color}`}>
                            {statusDetails.text}
                        </span>
                    </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        {property.basePricePerNight && (
                            <p className="text-sm text-gray-700">
                                <span className="font-medium text-blue-600">${property.basePricePerNight}</span>
                                <span className="text-gray-500 ml-1">/night</span>
                            </p>
                        )}
                    </div>
                    
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onToggleDetails(id)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title={isExpanded ? 'Hide details' : 'View details'}
                        >
                            {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                        </button>
                        
                        {containerTypes.includes(property.propertyType) && (
                            <Link 
                                to={`/properties/${id}/manage-units?type=${property.propertyType}`}
                                className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                                title="Manage units"
                            >
                                <FiGrid size={18} />
                            </Link>
                        )}
                        
                        <Link 
                            to={`/properties/edit/${id}?type=${property.propertyType}`}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Edit property"
                        >
                            <FiEdit2 size={18} />
                        </Link>
                        
                        <button 
                            onClick={() => onDelete(id, property.propertyType)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete property"
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
            
            {isExpanded && <PropertyDetailsCard property={property} />}
        </div>
    );
};

const ListProperties = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterType, setFilterType] = useState('ALL');

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
            
            try {
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
            } catch (err) {
                console.error('Failed to fetch properties:', err);
                setError('Failed to load properties. Please try again later.');
            } finally {
                setIsLoading(false);
            }
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
            
            // Show a success notification instead of alert
            console.log(`${propertyType} deleted successfully.`);
        } catch (err) {
            console.error(`Failed to delete ${propertyType}:`, err);
            alert(`Error: Could not delete the ${propertyType}. Please check the console for details.`);
        }
    };

    const handleToggleDetails = (propertyId) => {
        setExpandedPropertyId(prevId => (prevId === propertyId ? null : propertyId));
    };

    const filteredProperties = properties.filter(property => {
        // Search filter
        const matchesSearch = property.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             property.address?.city?.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Status filter
        const matchesStatus = filterStatus === 'ALL' || 
                            (property.status === filterStatus) || 
                            (getStatusDetails(property.status).text.toUpperCase() === filterStatus);
        
        // Type filter
        const matchesType = filterType === 'ALL' || 
                          property.propertyType?.toUpperCase() === filterType;
        
        return matchesSearch && matchesStatus && matchesType;
    });

    const statusOptions = ['ALL', 'AVAILABLE', 'UNAVAILABLE', 'MAINTENANCE', 'PENDING_APPROVAL', 'REJECTED'];
    const typeOptions = ['ALL', ...Object.keys(API_ENDPOINTS).map(type => type.toUpperCase())];

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <PulseLoader color="#3B82F6" size={15} />
                <p className="mt-4 text-gray-600">Loading your properties...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
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

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <Title 
                        align="left" 
                        font="outfit" 
                        title="My Properties" 
                        subtitle="Manage all your listings in one place"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {properties.length} {properties.length === 1 ? 'property' : 'properties'} registered
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Link 
                        to="/properties/add" 
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all flex items-center justify-center gap-2"
                    >
                        <FiPlus size={18} />
                        Add New Property
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by name or city..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            id="status"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            {statusOptions.map(option => (
                                <option key={option} value={option}>
                                    {option === 'ALL' ? 'All Statuses' : option.replace('_', ' ').toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            id="type"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            {typeOptions.map(option => (
                                <option key={option} value={option}>
                                    {option === 'ALL' ? 'All Types' : option.toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Properties List */}
            <div className="space-y-4">
                {filteredProperties.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No properties found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchTerm || filterStatus !== 'ALL' || filterType !== 'ALL' 
                                ? 'Try adjusting your search or filter criteria.'
                                : 'Get started by adding a new property.'}
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/properties/add"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                                Add Property
                            </Link>
                        </div>
                    </div>
                ) : (
                    filteredProperties.map(property => {
                        const id = property.hotelId || property.hostelId || property.id;
                        if (!id) return null;
                        
                        return (
                            <PropertyCard
                                key={id}
                                property={property}
                                onDelete={handleDelete}
                                onToggleDetails={handleToggleDetails}
                                isExpanded={expandedPropertyId === id}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ListProperties;