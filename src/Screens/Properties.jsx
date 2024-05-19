import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyTile from '../Components/PropertyTile';
import Nav from '../Components/Nav';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);

    const fetchProperties = async (page) => {
        const token = localStorage.getItem('accessToken');
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/seller/property`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page: page,
                    limit: 10 // Adjust the limit as needed
                }
            });
            const data = response.data;
            setProperties(data.docs);
            setTotalPages(data.totalPages);
            setFilteredProperties(data.docs); // Set filtered properties initially to all properties
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties(currentPage);
    }, [currentPage]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_API}/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchProperties(currentPage);
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleUpdate = (id) => {
        // Handle update logic here, possibly opening a modal or redirecting to an update page
        console.log('Update property with id:', id);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = properties.filter(property => {
            return (
                property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.bedrooms.toString().includes(searchTerm) ||
                property.bathrooms.toString().includes(searchTerm)
                // Add more filters for other properties if needed
            );
        });
        setFilteredProperties(filtered);
    };

    return (
        <div className="container mx-auto">
            <Nav />
            <div className="mt-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by name, place, bedrooms, bathrooms..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />
            </div>
            {loading ? (
                <p className="text-center text-gray-500">Loading properties...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProperties.map(property => (
                            <PropertyTile
                                key={property._id}
                                property={property}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                allowLike={true}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l disabled:opacity-50"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">{currentPage} of {totalPages}</span>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r disabled:opacity-50"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Properties;
