
import React from 'react';

const HeroSection = ({ handleFilterChange, scrollToPackages }) => {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(/src/assets/pakHero.jpg)` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
        <h1 className="text-5xl font-bold">Find Your Perfect Destination</h1>
        <p className="mt-2 text-lg">Discover new places and experiences</p>
        <div className="bg-gray-400 bg-opacity-25 p-6 rounded-lg mt-6 shadow-lg flex flex-wrap justify-center space-x-4 w-full max-w-3xl">
          <input 
            type="text"
            name="destination"
            placeholder="Destination"
            onChange={handleFilterChange}
            className="border border-gray-500 p-3 rounded w-40 focus:ring-2 focus:ring-green-500 text-gray-900"
          />
          <select 
            name="category"
            onChange={handleFilterChange}
            className="border border-gray-300 p-3 rounded w-40 focus:ring-2 focus:ring-green-500 text-gray-900"
          >
            <option value="">All Categories</option>
            <option value="Adventure">Adventure</option>
            <option value="Trek">Trek</option>
            <option value="Sight-seeing">Sight-seeing</option>
            <option value="Cultural">Cultural</option>
            <option value="Nature">Nature</option>
          </select>
          <button className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-gray-600">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
