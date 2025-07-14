import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [emailId, setEmailId] = useState("travis@head.com")
  const [password, setPassword] = useState("Akhil@123")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLoginSubmit = async (e) => {

    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password
      },{
        withCredentials:true
      });

      // Handle successful login
      dispatch(addUser(res.data))
       navigate('/')
      
    } catch (err) {
      if (err.response) {
        // Server responded with a status outside 2xx
        console.error("Server error:", err.response.status, err.response.data);

        // Optional: Show user-friendly messages
        if (err.response.status === 401) {
          alert("Invalid email or password.");
        } else if (err.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("Something went wrong. Please try again.");
        }

      } else if (err.request) {
        // Request was made but no response received
        console.error("No response from server:", err.request);
        alert("No response from server. Check your internet connection.");

      } else {
        // Something else happened while setting up the request
        console.error("Error setting up request:", err.message);
        alert("Unexpected error occurred.");
      }
    }

  }
  return (
    <div className="w-full max-w-md px-4 py-6 sm:px-6 sm:py-8 bg-gray-800 rounded-lg shadow-2xl">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Dev Tinder <span role="img" aria-label="emoji">👨‍💻🔥👩‍💻</span>
      </h1>
      <form className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text text-neutral  ">Email</span>
          </label>
          <input
            type="email"
            value={emailId} // to use with UseState
            placeholder="you@example.com"
            className="input input-bordered w-full text-neutral"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-neutral">Password</span>
          </label>
          <input
            type="password"
            value={password}  // To use with Usestate
            placeholder="••••••••"
            className="input input-bordered w-full text-neutral"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-primary mr-2" />
            <span className="label-text text-neutral">Remember me</span>
          </label>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          onClick={handleLoginSubmit}
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-neutral">
        Don&apos;t have an account?{' '}
        <a href="#" className="text-primary hover:underline">
          Sign up
        </a>
      </p>

    </div>
  );
};

export default Login;
