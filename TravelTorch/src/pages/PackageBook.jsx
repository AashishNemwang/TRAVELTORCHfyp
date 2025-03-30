import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = ({ packages }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedPackage = packages.find(pkg => pkg.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfPeople: 1,
    specialRequests: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Details:', formData);
    alert('Booking Successful!');
    navigate('/');
  };

  if (!selectedPackage) {
    return <div className="text-center text-xl mt-10">Package not found.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Book Your Trip: {selectedPackage.name}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone Number:</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Number of People:</label>
            <input 
              type="number" 
              name="numberOfPeople" 
              value={formData.numberOfPeople} 
              onChange={handleChange} 
              required 
              min="1" 
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Special Requests (Optional):</label>
            <textarea 
              name="specialRequests" 
              value={formData.specialRequests} 
              onChange={handleChange} 
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded mt-4 hover:bg-gray-700 transition">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
