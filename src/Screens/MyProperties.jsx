import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropertyTile from '../Components/PropertyTile'
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav';

const Properties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchProperties = async (page) => {
        const token = localStorage.getItem('accessToken')
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/seller/property`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page: page,
                    limit: 10 // Adjust the limit as needed
                }
            })
            const data = response.data
            setProperties(data.docs)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error('Error fetching properties:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProperties(currentPage)
    }, [currentPage])

    const handleDelete = async (id) => {
        const token = localStorage.getItem('accessToken')
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_API}/seller/property/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchProperties(currentPage)
        } catch (error) {
            console.error('Error deleting property:', error)
        }
    }

    const handleUpdate = (id) => {
        navigate('/property/' + id, id)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className="">
            <Nav />
            {loading ? (
                <p className="text-center text-gray-500">Loading properties...</p>
            ) : (
                <>
                    <div className="grid grid-cols-12 gap-4 p-3">
                        {properties.map(property => (
                            <PropertyTile
                                key={property._id}
                                property={property}
                                onDelete={() => handleDelete(property._id)}
                                onUpdate={() => handleUpdate(property._id)}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center my-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l disabled:opacity-50"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 bg-stone-300">{currentPage} of {totalPages}</span>
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
    )
}

export default Properties
