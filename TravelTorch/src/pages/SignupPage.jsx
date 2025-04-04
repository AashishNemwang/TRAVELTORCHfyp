import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import SignupImage from '../assets/signup.jpg';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('traveler');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        role,
      });

      console.log('Signup successful:', res.data);
      
      alert('Signup successful! Redirecting to login...');
      navigate('/login'); // Redirect user after successful signup

    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col items-center justify-center bg-blue-100">
        <div className="flex justify-center mb-6">
          <img
            src={SignupImage}
            alt="Signup Illustration"
            className="rounded-lg shadow-lg"
            style={{ maxHeight: '600px', width: 'auto' }}
          />
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/4 border border-gray-300 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            
            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Sign up as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="traveler">Traveler</option>
                <option value="travel-agency">Travel Agency</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-gray-600 hover:underline font-medium">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
