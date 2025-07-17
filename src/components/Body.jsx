import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () =>{
    if(user) return

    try {
      const res = await axios.get('http://localhost:3000/api/profile', {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      console.error("Failed to fetch user:", err?.response?.data || err.message);

      // Redirect only if unauthorized (401 or 403)
      if(err.response && (err.response.status === 401 || err.response.status === 403)){
        navigate('/login')
      }
      
    } finally {
      setLoading(false); // Finish loading whether success or fail
    }
  };

  useEffect(() => {
    
    fetchUser();
  }, []);

  // Don't render anything while user data is being fetched
  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-base-content text-neutral-content">
      <NavBar /> {/* Only render NavBar if user is set */}
      <main className="flex-grow flex items-center justify-center bg-gray-900 text-white px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
