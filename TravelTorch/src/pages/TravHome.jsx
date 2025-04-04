import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import Images
import ChitwanImg from '../assets/Chitwan.jpg';
import PokharaImg from '../assets/Pokhara.jpg';
import EverestImg from '../assets/MountEverest.jpg';
import HeroImg from '../assets/pakHero.jpg';
import Trending1 from '../assets/trending1.jpg';
import Trending2 from '../assets/trending2.jpg';
import Trending3 from '../assets/trending3.jpg';
import AnnapurnaImg from '../assets/Annapurna.jpg';
import LumbiniImg from '../assets/Lumbini.jpg';
import RaraImg from '../assets/Rara.jpg';
import BhaktapurImg from '../assets/Bhaktapur.jpg';
import LangtangImg from '../assets/Lamtang.jpg';
import MustangImg from '../assets/Mustang.jpg';
import GosaikundaImg from '../assets/Gosaikunda.jpg';
import IlamImg from '../assets/Illam.jpg';
import JanakpurImg from '../assets/Janakpur.jpg';
import NavBar from '../components/NavBar';

const TravHome = () => {
  const [filters, setFilters] = useState({ destination: '', date: '', category: '' });
  const packagesSectionRef = useRef(null);
  const navigate = useNavigate();

  const packages = [
    { id: 1, name: 'Jungle Safari', location: 'Chitwan National Park', type: 'Adventure', price: '$500', date: '2025-06-15', description: 'Explore the rich biodiversity with a 3-day jungle safari.', image: ChitwanImg },
    { id: 2, name: 'Pokhara Getaway', location: 'Pokhara', type: 'Sight-seeing', price: '$400', date: '2025-07-10', description: 'Enjoy serene lakes and breathtaking mountain views.', image: PokharaImg },
    { id: 3, name: 'Everest Base Camp Trek', location: 'Mount Everest', type: 'Trek', price: '$1000', date: '2025-08-05', description: 'Experience the grandeur of the world’s tallest mountain.', image: EverestImg },
    { id: 4, name: 'Annapurna Circuit Trek', location: 'Annapurna', type: 'Trek', price: '$1200', date: '2025-09-12', description: 'Challenge yourself with this stunning high-altitude trek.', image: AnnapurnaImg },
    { id: 5, name: 'Spiritual Journey', location: 'Lumbini', type: 'Cultural', price: '$300', date: '2025-10-20', description: 'Visit the birthplace of Buddha and explore its serene monasteries.', image: LumbiniImg },
    { id: 6, name: 'Rara Lake Escape', location: 'Rara National Park', type: 'Nature', price: '$600', date: '2025-11-08', description: 'Discover the pristine beauty of Nepal’s largest lake.', image: RaraImg },
    { id: 7, name: 'Bhaktapur Heritage Walk', location: 'Bhaktapur', type: 'Cultural', price: '$250', date: '2025-12-15', description: 'Explore ancient temples and traditional Newari culture.', image: BhaktapurImg },
    { id: 8, name: 'Langtang Valley Trek', location: 'Langtang', type: 'Trek', price: '$850', date: '2026-01-10', description: 'Immerse yourself in breathtaking Himalayan landscapes.', image: LangtangImg },
    { id: 9, name: 'Mustang Adventure', location: 'Upper Mustang', type: 'Adventure', price: '$1500', date: '2026-02-05', description: 'Experience the mystique of the hidden kingdom of Mustang.', image: MustangImg },
    { id: 10, name: 'Gosaikunda Pilgrimage', location: 'Gosaikunda', type: 'Spiritual', price: '$550', date: '2026-03-15', description: 'A sacred trek to a high-altitude alpine lake.', image: GosaikundaImg },
    { id: 11, name: 'Tea Garden Tour', location: 'Ilam', type: 'Nature', price: '$350', date: '2026-04-20', description: 'Stroll through lush tea gardens and enjoy scenic landscapes.', image: IlamImg },
    { id: 12, name: 'Ramayan Circuit Tour', location: 'Janakpur', type: 'Cultural', price: '$400', date: '2026-05-30', description: 'Explore the sacred land of Sita and its rich history.', image: JanakpurImg }
  ];

  const trendingDestinations = [
    { id: 1, name: 'Annapurna Base Camp', image: Trending1 },
    { id: 2, name: 'Boudhanath Stupa', image: Trending2 },
    
    { id: 3, name: 'Phewa Lake', image: Trending3 },
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const scrollToPackages = () => {
    packagesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Navbar */}
      <NavBar func={scrollToPackages}/>

      {/* Hero Section with Search Filter */}
      <section className="relative h-screen bg-cover bg-center flex items-center" style={{ backgroundImage: `url(${HeroImg})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl font-bold">Find Your Perfect Destination</h1>
          <p className="mt-2 text-lg">Discover new places and experiences</p>

          {/* Filter/Search Section */}
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
              <option value="adventure">Adventure</option>
              <option value="trek">Trek</option>
              <option value="sight-seeing">Sight-seeing</option>
            </select>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-gray-600">Search</button>
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Trending Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingDestinations.map((place) => (
            <div key={place.id} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
              <img src={place.image} alt={place.name} className="w-full h-48 object-cover"/>
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-3 text-white text-center">
                <h3 className="text-lg font-bold">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={packagesSectionRef} className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Available Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className="text-gray-700"><strong>Location:</strong> {pkg.location}</p>
                <p className="text-gray-700"><strong>Type:</strong> {pkg.type}</p>
                <p className="text-gray-700">{pkg.description}</p>
                <p className="text-gray-400 font-bold mt-4"><strong>Price:</strong> {pkg.price}</p>
                <p className="text-gray-400 font-bold"><strong>Date:</strong> {pkg.date}</p>
                <Link to={`/package/${pkg.id}`} className="inline-block bg-gray-600 text-white text-center px-4 py-2 mt-4 rounded hover:bg-gray-200 hover:text-gray-700 transition">Book Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 TravelTorch. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <button onClick={() => navigate('/')} className="hover:text-gray-400">Home</button>
            <button onClick={scrollToPackages} className="hover:text-gray-400">Packages</button>
            <button onClick={() => navigate('/contact')} className="hover:text-gray-400">Contact</button>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravHome;
