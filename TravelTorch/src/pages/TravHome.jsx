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
    { id: 3, name: 'Everest Base Camp Trek', location: 'Mount Everest', type: 'Trek', price: '$1000', date: '2025-08-05', description: 'Experience the grandeur of the worlds tallest mountain.', image: EverestImg },
    { id: 4, name: 'Annapurna Circuit Trek', location: 'Annapurna', type: 'Trek', price: '$1200', date: '2025-09-12', description: 'Challenge yourself with this stunning high-altitude trek.', image: AnnapurnaImg },
    { id: 5, name: 'Spiritual Journey', location: 'Lumbini', type: 'Cultural', price: '$300', date: '2025-10-20', description: 'Visit the birthplace of Buddha and explore its serene monasteries.', image: LumbiniImg },
    { id: 6, name: 'Rara Lake Escape', location: 'Rara National Park', type: 'Nature', price: '$600', date: '2025-11-08', description: 'Discover the pristine beauty of Nepals largest lake.', image: RaraImg },
    { id: 7, name: 'Bhaktapur Heritage Walk', location: 'Bhaktapur', type: 'Cultural', price: '$250', date: '2025-12-15', description: 'Explore ancient temples and traditional Newari culture.', image: BhaktapurImg },
    { id: 8, name: 'Ramayan Circuit Tour', location: 'Janakpur', type: 'Cultural', price: '$400', date: '2026-05-30', description: 'Explore the sacred land of Sita and its rich history.', image: JanakpurImg }
  ];

  const trendingDestinations = [
    { id: 1, name: 'Annapurna Base Camp', image: Trending1 },
    { id: 2, name: 'Boudhanath Stupa', image: Trending2 },
    { id: 3, name: 'Phewa Lake', image: Trending3 },
  ];

  const blogPosts = [
    { id: 1, title: 'Top 5 Trekking Routes in Nepal', excerpt: 'Discover the most breathtaking trekking routes that Nepal has to offer...', date: 'May 15, 2025' },
    { id: 2, title: 'Cultural Heritage of Kathmandu Valley', excerpt: 'Explore the rich cultural heritage and ancient temples of Kathmandu...', date: 'April 28, 2025' },
    { id: 3, title: 'Wildlife Adventures in Chitwan', excerpt: 'Everything you need to know about jungle safaris and wildlife spotting...', date: 'June 2, 2025' },
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

      {/* Available Packages */}
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

      {/* Contact Us Section */}
      <section className="bg-gray-100 py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="mb-4">Have questions about our packages or need help with your booking? Reach out to us!</p>
              
              <div className="space-y-3">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +977 9801234567
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@traveltornepal.com
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Thamel, Kathmandu, Nepal
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <textarea placeholder="Your Message" rows="4" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"></textarea>
                </div>
                <button type="submit" className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Travel Blog</h2>
        <p className="text-center mb-8 max-w-2xl mx-auto">Read our latest travel tips, destination guides, and adventure stories to inspire your next trip.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <p className="text-gray-400 text-sm">{post.date}</p>
                <button className="mt-4 text-green-600 hover:text-green-800 font-medium">Read More →</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition">
            View All Blog Posts
          </button>
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
            <button onClick={() => navigate('/blog')} className="hover:text-gray-400">Blog</button>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravHome;