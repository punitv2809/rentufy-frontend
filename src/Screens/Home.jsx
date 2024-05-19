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

  if (role() === 'seller') {
    return (
      <div className="w-screen h-screen bg-teal-700 flex-col capitalize">
        <Nav />
        <div className="flex items-center justify-center h-60 text-6xl font-medium">
            <p>Rentify</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section>
        <h1>go see properties</h1>
      </section>
    </div>
  )
}

export default Home