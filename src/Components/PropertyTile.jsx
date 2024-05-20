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
        <div className="col-span-12 md:col-span-4 rounded border p-3">
            <img className="w-full h-64 object-cover" src={property.image} alt={property.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{property.name}</div>
                <p className="text-gray-700 text-base">{property.place}</p>
                <p className="text-gray-700 text-base">Area: {property.area} sq ft</p>
                <p className="text-gray-700 text-base">Bedrooms: {property.bedrooms}</p>
                <p className="text-gray-700 text-base">Bathrooms: {property.bathrooms}</p>
                <p className="text-gray-700 text-base">Likes: {likes}</p>
                {allowLike && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={handleLike}
                    >
                        Like
                    </button>
                )}
            </div>
            <div className="px-6 pt-4 pb-2">
                <p className="text-gray-700 text-base">Hospitals Nearby:</p>
                <ul className="list-disc list-inside">
                    {property.hospitalsNearby.map((hospital, index) => (
                        <li key={index}>{hospital}</li>
                    ))}
                </ul>
                <p className="text-gray-700 text-base">Colleges Nearby:</p>
                <ul className="list-disc list-inside">
                    {property.collegesNearby.map((college, index) => (
                        <li key={index}>{college}</li>
                    ))}
                </ul>
            </div>
            {
                role() === 'seller' && <div className="flex justify-between px-6 pt-4 pb-2">
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
            }
            {
                role() !== 'seller' && <div className="flex justify-between px-6 pt-4 pb-2">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-medium w-full py-2 px-4 rounded"
                        onClick={interested}
                    >
                        Interested
                    </button>
                </div>
            }
        </div>
    );
};

export default PropertyTile;
