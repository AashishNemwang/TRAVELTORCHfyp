// components/PackageList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PackageList = ({ packages, refProp }) => {
  return (
    <section ref={refProp} className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Available Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={`http://localhost:5000/uploads/${pkg.photo}`}
              alt={pkg.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="text-gray-700"><strong>Location:</strong> {pkg.destination}</p>
              <p className="text-gray-700"><strong>Type:</strong> {pkg.type}</p>
              <p className="text-gray-700">{pkg.description}</p>
              <p className="text-gray-400 font-bold mt-4"><strong>Price:</strong> ${pkg.price}</p>
              <p className="text-gray-400 font-bold"><strong>Date:</strong> {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}</p>
              <Link to={`/package/${pkg.id}`} className="inline-block bg-gray-600 text-white px-4 py-2 mt-4 rounded hover:bg-gray-200 hover:text-gray-700 transition">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackageList;
