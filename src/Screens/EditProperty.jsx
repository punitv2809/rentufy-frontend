import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Nav';

const EditProperty = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);
    const [isOk, setIsOk] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        place: '',
        area: 0,
        bedrooms: 0,
        bathrooms: 0,
        hospitalsNearby: [],
        collegesNearby: []
    });

    // Fetch property details upon component mount
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/seller/property/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setProperty(response.data);
                setFormData(response.data); // Set form data with fetched property details
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchProperty();
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_API}/seller/property/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setIsOk(true);
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto">
            <Nav />
            <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="place" className="block text-gray-700 font-bold mb-2">Place</label>
                    <input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="area" className="block text-gray-700 font-bold mb-2">Area (sq ft)</label>
                    <input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bedrooms" className="block text-gray-700 font-bold mb-2">Bedrooms</label>
                    <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bathrooms" className="block text-gray-700 font-bold mb-2">Bathrooms</label>
                    <input
                        type="number"
                        id="bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Add input fields for hospitalsNearby */}
                <div className="mb-4">
                    <label htmlFor="hospitalsNearby" className="block text-gray-700 font-bold mb-2">Hospitals Nearby</label>
                    <input
                        type="text"
                        id="hospitalsNearby"
                        name="hospitalsNearby"
                        value={formData.hospitalsNearby.join(', ')}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Add input fields for collegesNearby */}
                <div className="mb-4">
                    <label htmlFor="collegesNearby" className="block text-gray-700 font-bold mb-2">Colleges Nearby</label>
                    <input
                        type="text"
                        id="collegesNearby"
                        name="collegesNearby"
                        value={formData.collegesNearby.join(', ')}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
                {isOk && <p className='capitalize text-green-600 font-medium mt-3'>property saved Successfully</p>}
            </form>
        </div>
    );
};

export default EditProperty;
