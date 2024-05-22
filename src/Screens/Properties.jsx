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

    const [filters, setFilters] = useState({
        name: '',
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        hospitalsNearby: '',
        collegesNearby: ''
    });

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filterProperties = () => {
        const filtered = properties.filter(property => {
            return (
                (filters.name === '' || property.name.toLowerCase().includes(filters.name.toLowerCase())) &&
                (filters.place === '' || property.place.toLowerCase().includes(filters.place.toLowerCase())) &&
                (filters.area === '' || property.area.toString().includes(filters.area)) &&
                (filters.bedrooms === '' || property.bedrooms.toString().includes(filters.bedrooms)) &&
                (filters.bathrooms === '' || property.bathrooms.toString().includes(filters.bathrooms)) &&
                (filters.hospitalsNearby === '' || property.hospitalsNearby.some(hospital => hospital.toLowerCase().includes(filters.hospitalsNearby.toLowerCase()))) &&
                (filters.collegesNearby === '' || property.collegesNearby.some(college => college.toLowerCase().includes(filters.collegesNearby.toLowerCase())))
            );
        });
        setFilteredProperties(filtered);
    };

    useEffect(() => {
        filterProperties();
    }, [filters, properties]);

    return (
        <div className="">
            <Nav />
            <div className="flex items-center justify-center flex-wrap w-full gap-4 bg-gray-800 p-3 border-t border-gray-500">
                <input
                    type="text"
                    name="name"
                    placeholder="Filter by name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-auto"
                />
                <input
                    type="text"
                    name="place"
                    placeholder="Filter by place"
                    value={filters.place}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-auto"
                />
                <input
                    type="number"
                    name="area"
                    placeholder="Filter by area"
                    value={filters.area}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-auto"
                />
                <input
                    type="number"
                    name="bedrooms"
                    placeholder="Filter by bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-auto"
                />
                <input
                    type="number"
                    name="bathrooms"
                    placeholder="Filter by bathrooms"
                    value={filters.bathrooms}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-auto"
                />
                <input
                    type="text"
                    name="hospitalsNearby"
                    placeholder="Filter by hospitals nearby"
                    value={filters.hospitalsNearby}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-auto"
                />
                <input
                    type="text"
                    name="collegesNearby"
                    placeholder="Filter by colleges nearby"
                    value={filters.collegesNearby}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-auto"
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
                                    axios.get(`${import.meta.env.VITE_BACKEND_API}/user/send-property/${property._id}`, {
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    });
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
