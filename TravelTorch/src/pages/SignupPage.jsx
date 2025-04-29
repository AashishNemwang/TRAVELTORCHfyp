import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupImage from '../assets/signup.jpg'; // Make sure this path is correct
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agencyName: '',
    role: 'traveler'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (formData.role === 'agency' && !formData.agencyName.trim()) {
        setError("Agency name is required");
        return;
      }
      const response=await axios.post('http://localhost:5000/api/auth/signup',formData,{withCredentials:true});
      if(response?.status===200){
        setLoading(true);
          alert(`Account created as ${formData.role}! `);
          setLoading(false);
          navigate('/login');
      }
    }
    catch(error){
      console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex w-full max-w-md bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Image Column - Hidden on mobile */}
        <div className="hidden sm:block sm:w-1/3 bg-blue-100">
          <img
            src={SignupImage}
            alt="Signup illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Column */}
        <div className="w-full sm:w-2/3 p-4">
          <h2 className="text-xl font-bold text-center mb-3 text-gray-800">Sign Up</h2>
          
          {error && (
            <div className="mb-2 p-2 bg-red-50 text-red-600 rounded text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              required
              minLength="6"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              required
            />

            <div className="flex space-x-1 pt-1">
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'traveler'})}
                className={`flex-1 py-1 px-1 rounded text-xs ${formData.role === 'traveler' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 border border-gray-200'}`}
              >
                Traveler
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'agency'})}
                className={`flex-1 py-1 px-1 rounded text-xs ${formData.role === 'agency' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 border border-gray-200'}`}
              >
                Agency
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'admin'})}
                className={`flex-1 py-1 px-1 rounded text-xs ${formData.role === 'admin' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 border border-gray-200'}`}
              >
                Admin
              </button>
            </div>

            {formData.role === 'agency' && (
              <input
                type="text"
                name="agencyName"
                placeholder="Agency Name"
                value={formData.agencyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-2 text-center text-xs text-gray-600">
            Have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;