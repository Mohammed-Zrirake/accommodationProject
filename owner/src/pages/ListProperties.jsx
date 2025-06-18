import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title.jsx';
import { FiEdit2, FiTrash2, FiEye, FiGrid } from 'react-icons/fi';
import { propertyDummyData } from '../assets/assets.js'; 
const ListProperties = () => {
    const [properties, setProperties] = useState(propertyDummyData);
    const containerTypes = ['Hotel', 'Hostel', 'Riad'];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center">
                <Title
                    align='left'
                    font='outfit'
                    title='My Properties'
                    subtitle='Manage all your listings from here.'
                />
                <Link to="/properties/add" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md">
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
                            {properties.map((prop) => (
                                <tr key={prop.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prop.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.address.city}, {prop.address.country}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${prop.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {prop.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-3">
                                            {containerTypes.includes(prop.type) && (
                                                <button title="Manage Units" className="text-purple-600 hover:text-purple-800">
                                                    <FiGrid className="h-5 w-5" />
                                                </button>
                                            )}
                                            <Link to={`/properties/edit/${prop.id}`} title="Edit" className="text-yellow-600 hover:text-yellow-800">
                                                <FiEdit2 className="h-5 w-5" />
                                            </Link>
                                            <button title="Delete" className="text-red-600 hover:text-red-800">
                                                <FiTrash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListProperties;