import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginImage from '../assets/login.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:5000/api/auth/login', 
        { email, password },
        { withCredentials: true }
      );
      //console.log(res)

      if (res?.data?.user) {
        localStorage.setItem('token', res.data.token); // Store JWT
        localStorage.setItem('role', res.data?.user?.role); // Store role
        redirectUser(res.data.role); // Redirect user
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  const redirectUser = (role) => {
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'travel-agency') navigate('/agency/dashboard');
    else navigate('/travhome'); // Traveler homepage
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side (Image) */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-blue-100">
        <img src={LoginImage} alt="Login" className="rounded-lg shadow-lg max-h-[600px]" />
      </div>

      {/* Right Side (Form) */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/4 border border-gray-300 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
          
          {/* Show Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Log In
            </button>
          </form>

          {/* Forgot Password & Sign Up Links */}
          <p className="text-sm text-center mt-4">
            <a href="/forgot-password" className="text-blue-600 hover:underline font-medium">
              Forgot Password?
            </a>
          </p>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
