// components/TrendingDestinations.jsx
import React from 'react';
import Trending1 from '../assets/trending1.jpg';
import Trending2 from '../assets/trending2.jpg';
import Trending3 from '../assets/trending3.jpg';

const trendingDestinations = [
  { id: 1, name: 'Annapurna Base Camp', image: Trending1 },
  { id: 2, name: 'Boudhanath Stupa', image: Trending2 },
  { id: 3, name: 'Phewa Lake', image: Trending3 },
];

const TrendingDestinations = () => {
  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Trending Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingDestinations.map((place) => (
          <div key={place.id} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
            <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-3 text-white text-center">
              <h3 className="text-lg font-bold">{place.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingDestinations;
