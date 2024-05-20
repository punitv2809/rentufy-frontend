import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import { isLoggedIn } from '../Utils/auth';
import Nav from '../Components/Nav';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'seller', // Default role to seller
    });
    const [errors, setErrors] = useState({}); // To store any validation errors
    const [registrationError, setRegistrationError] = useState(''); //

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/'); // Redirect if already logged in
        }
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user`, formData); // Replace with your API endpoint
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration error:', error.response.data); // Handle API errors
            if (error.response.data.error) {
                setRegistrationError(error.response.data.error); // Set registration error message if provided by the API
            } else {
                setErrors(error.response.data.errors || {}); // Set form validation errors if provided by the API
            }
        }
    };
    const handleRoleChange = (role) => {
        setFormData({ ...formData, role });
    };
    return (
        <div className="bg-stone-200 w-screen h-screen flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className='w-10/12 md:w-3/12 p-6'>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-stone-500"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-stone-500"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-stone-500"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-stone-500"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
                        Phone Number (Optional)
                    </label>
                    <input
                        type="tel" // Use tel input type for phone numbers
                        name="phoneNumber"
                        id="phoneNumber"
                        className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-stone-500"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Role</label>
                    <div className='flex w-full'>
                        <button
                            type="button"
                            className={`grow mr-2 px-4 py-2 rounded ${formData.role === 'seller' ? 'bg-stone-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                            onClick={() => handleRoleChange('seller')}
                        >
                            Seller
                        </button>
                        <button
                            type="button"
                            className={`grow px-4 py-2 rounded ${formData.role === 'buyer' ? 'bg-stone-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                            onClick={() => handleRoleChange('buyer')}
                        >
                            Buyer
                        </button>
                    </div>
                </div>
                {Object.keys(errors).length > 0 && ( // Check for any errors
                    <div className="mb-4">
                        <h3 className="text-red-500 text-sm font-bold">Registration Errors:</h3>
                        <ul className="list-disc pl-4 text-red-500 text-sm">
                            {Object.entries(errors).map(([field, error]) => (
                                <li key={field}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {registrationError && ( // Check for registration error
                    <div className="mb-4">
                        <p className="text-red-500 text-sm">{registrationError}</p>
                    </div>
                )}

                {Object.keys(errors).length > 0 && ( // Check for any form validation errors
                    <div className="mb-4">
                        <h3 className="text-red-500 text-sm font-bold">Registration Errors:</h3>
                        <ul className="list-disc pl-4 text-red-500 text-sm">
                            {Object.entries(errors).map(([field, error]) => (
                                <li key={field}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium py-2 px-4 rounded"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
