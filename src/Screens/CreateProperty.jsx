import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Components/Nav';

const CreateProperty = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        hospitalsNearby: [''],
        collegesNearby: ['']
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHospitalsChange = (index, value) => {
        const updatedHospitals = [...formData.hospitalsNearby];
        updatedHospitals[index] = value;
        setFormData({ ...formData, hospitalsNearby: updatedHospitals });
    };

    const handleCollegesChange = (index, value) => {
        const updatedColleges = [...formData.collegesNearby];
        updatedColleges[index] = value;
        setFormData({ ...formData, collegesNearby: updatedColleges });
    };

    const addField = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], '']
        });
    };

    const removeField = (field, index) => {
        const updatedFields = [...formData[field]];
        updatedFields.splice(index, 1);
        setFormData({ ...formData, [field]: updatedFields });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/seller/property`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuccessMessage('Property created successfully');
            setFormData({
                name: '',
                image: '',
                place: '',
                area: '',
                bedrooms: '',
                bathrooms: '',
                hospitalsNearby: [''],
                collegesNearby: ['']
            });
        } catch (error) {
            console.error('Error creating property:', error);
            setErrorMessage('Error creating property. Please try again.');
        }
    };

    return (
        <div className="">
            <Nav />
            <div className="flex items-center justify-center p-3">
                <h1 className="text-2xl font-bold mb-4">Create New Property</h1>
            </div>
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-3">
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
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image Url</label>
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
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Hospitals Nearby</label>
                    {formData.hospitalsNearby.map((hospital, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                value={hospital}
                                onChange={(e) => handleHospitalsChange(index, e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {index === formData.hospitalsNearby.length - 1 && (
                                <button type="button" onClick={() => addField('hospitalsNearby')} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    +
                                </button>
                            )}
                            {index !== formData.hospitalsNearby.length - 1 && (
                                <button type="button" onClick={() => removeField('hospitalsNearby', index)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    -
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Colleges Nearby</label>
                    {formData.collegesNearby.map((college, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                value={college}
                                onChange={(e) => handleCollegesChange(index, e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {index === formData.collegesNearby.length - 1 && (
                                <button type="button" onClick={() => addField('collegesNearby')} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    +
                                </button>
                            )}
                            {index !== formData.collegesNearby.length - 1 && (
                                <button type="button" onClick={() => removeField('collegesNearby', index)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    -
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Property
                </button>
            </form>
        </div>
    );
};

export default CreateProperty;

