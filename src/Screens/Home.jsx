import React, { useEffect } from 'react'
import { isLoggedIn, role } from '../Utils/auth'
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-teal-700 flex flex-col capitalize">
      <Nav />
      <div className="flex items-center justify-center h-60 text-6xl font-medium text-white">
        <p>Rent your dream place with Rentify</p>
      </div>
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2156&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="bg-teal-900 bg-opacity-50 h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl text-white font-bold mb-4">Find the perfect rental</h1>
          <p className="text-xl text-white mb-8">Explore apartments, houses, and more</p>
          <Link to={'/property'} className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-200">
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );

}

export default Home
