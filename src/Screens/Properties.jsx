import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyTile from '../Components/PropertyTile';
import Nav from '../Components/Nav';
import { role } from '../Utils/auth';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [showModal, setShowModal] = useState(null);

    const fetchProperties = async (page) => {
        const token = localStorage.getItem('accessToken');
        setLoading(true);
        try {
            const ep = role() === 'seller' ? 'seller' : 'buyer';
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/${ep}/property`, {
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
        <div className="">
            <Nav />
            <div className="my-4 flex justify-center w-full">
                <input
                    type="text"
                    placeholder="Search by name, place, bedrooms, bathrooms..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-7/12"
                />
            </div>
            {loading ? (
                <p className="text-center text-gray-500">Loading properties...</p>
            ) : (
                <>
                    <div className="grid grid-cols-12 gap-4 p-3">
                        {filteredProperties.map(property => (
                            <PropertyTile
                                key={property._id}
                                property={property}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                allowLike={true}
                                interested={async () => {
                                    const token = localStorage.getItem('accessToken');
                                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/seller/${property.userId}`, {
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    });
                                    setShowModal(response.data[0]);
                                }}
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
            {showModal && (
                <div className='modal w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-stone-700/50'>
                    <div className="w-10/12 md:w-4/12 space-y-3 bg-white p-6 rounded-md font-medium">
                        <div className="w-full flex items-start justify-end">
                            <button className='bg-rose-500 text-white p-3 rounded-md' onClick={() => {
                                setShowModal(false);
                            }}>close</button>
                        </div>
                        <p>First Name: {showModal.firstName}</p>
                        <p>Last Name: {showModal.lastName}</p>
                        <p>Phone: {showModal.phoneNumber}</p>
                        <p>Email: {showModal.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Properties;
