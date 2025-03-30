import React, { useState } from 'react';
import LoginImage from '../assets/login.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, password });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col items-center justify-center bg-blue-100">
        <div className="flex justify-center mb-6">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="rounded-lg shadow-lg"
            style={{ maxHeight: '600px', width: 'auto' }}
          />
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/4 border border-gray-300 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
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
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </p>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
