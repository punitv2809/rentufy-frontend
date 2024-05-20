import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../Utils/auth';

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]); // State for validation errors

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Frontend validation
        setErrors([]); // Clear previous errors
        let validationErrors = [];
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!email || !emailRegex.test(email)) {
            validationErrors.push('Please enter a valid email address.');
        }
        if (!password || password.length < 6) {
            validationErrors.push('Password must be at least 6 characters long.');
        }

        setErrors(validationErrors); // Set validation errors

        if (validationErrors.length === 0) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/login`, {
                    email,
                    password,
                });

                // Handle successful login response
                console.log('Login successful:', response.data);

                // Assuming you have logic to store tokens or user data
                // (replace with your specific logic)
                localStorage.setItem('accessToken', response.data.token);
                // Extract role from decoded token (assuming JWT)
                const decodedToken = JSON.parse(atob(response.data.token.split('.')[1])); // Base64 decode and parse payload
                const role = decodedToken.role; // Assuming role is stored in the 'role' property of the payload

                // Store role in localStorage
                localStorage.setItem('userRole', role);
                navigate('/');
                // Redirect or navigate to a different page after successful login
            } catch (error) {
                console.error('Login error:', error);
                // Handle login errors (e.g., display error message to user)
                console.log(error.response?.data?.error);
                setErrors([error.response?.data?.error || 'Login failed']); // Set error message from response (if available) or generic message
            }
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-stone-200">
            <form onSubmit={handleSubmit} className="w-10/12 md:w-3/12">
                <div className="flex items-center flex-col capitalize">
                    <p className='text-3xl font-medium mb-3'>Rentify</p>
                    <p className='text-4xl mb-2'>Welcome back</p>
                    <p className='text-black/60'>please enter your details</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="appearance-none border border-stone-500/50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                        id="email"
                        type="email"
                        placeholder="youremail@example.com"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    {errors.find((error) => error.includes('email')) && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.find((error) => error.includes('email'))}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="appearance-none border border-stone-500/50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                        id="password"
                        type="password"
                        placeholder="********"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    {errors.find((error) => error.includes('password')) && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.find((error) => error.includes('password'))}</p>
                    )}
                </div>
                <div className="flex flex-col gap-4 items-center justify-between">
                    <button
                        className="bg-stone-800 w-full hover:bg-stone-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        type="submit"
                    >
                        Login
                    </button>
                    <div className="flex gap-1 capitalize">
                        <p className='text-black/60'>don't have an account?</p>
                        <Link to={'/register'} className='font-medium underline'>
                            Register
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
