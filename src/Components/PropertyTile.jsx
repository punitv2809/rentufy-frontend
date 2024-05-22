import axios from 'axios';
import React, { useState } from 'react';
import { role } from '../Utils/auth';

const PropertyTile = ({ property, onDelete, onUpdate, allowLike, interested }) => {
    const [likes, setLikes] = useState(property.likeCount);
    const handleLike = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_API}/buyer/property/${property._id}/like`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update the like count in the UI if needed
            setLikes(p => p + 1);
        } catch (error) {
            console.error('Error liking property:', error);
        }
    };

    return (
        <div className="col-span-12 md:col-span-4 rounded-lg shadow-lg overflow-hidden">
            <img className="w-full h-64 object-cover" src={property.image} alt={property.name} />
            {allowLike && (
                <div className="px-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleLike}
                    >
                        Like
                    </button>
                </div>
            )}
            <div className="p-6 bg-white">
                <div className="font-bold text-2xl mb-2 capitalize">{property.name}</div>
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Place</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.place}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Area</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.area} sq ft</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bedrooms</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.bedrooms}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bathrooms</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.bathrooms}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Likes</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{likes}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-4">
                    <p className="text-gray-700 text-base">Hospitals Nearby:</p>
                    <ul className="list-disc list-inside ml-4">
                        {property.hospitalsNearby.map((hospital, index) => (
                            <li key={index}>{hospital}</li>
                        ))}
                    </ul>
                    <p className="text-gray-700 text-base mt-2">Colleges Nearby:</p>
                    <ul className="list-disc list-inside ml-4">
                        {property.collegesNearby.map((college, index) => (
                            <li key={index}>{college}</li>
                        ))}
                    </ul>
                </div>
                {role() === 'seller' && (
                    <div className="flex justify-between mt-4">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={onUpdate}
                        >
                            Update
                        </button>
                    </div>
                )}
                {role() !== 'seller' && (
                    <div className="mt-4">
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-medium w-full py-2 px-4 rounded"
                            onClick={interested}
                        >
                            I'am Interested
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyTile;
