import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isLoggedIn, role } from '../Utils/auth';

const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    }
    return (
        <nav className="bg-gray-800 text-white px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Rentify</Link>
            <ul className="flex space-x-4">
                <li>
                    <NavLink to="/property" className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
                        Properties
                    </NavLink>
                </li>
                {
                    role() === 'seller' && <>
                        <li>
                            <NavLink to="/my-properties" className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
                                My Properties
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create-property" className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
                                Create Property
                            </NavLink>
                        </li></>
                }
                {
                    !isLoggedIn() && <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
                                Register
                            </NavLink>
                        </li></>
                }
                {
                    isLoggedIn() &&
                    <li onClick={logout}>
                        <button>Logout</button>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Nav;
