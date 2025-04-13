import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

// Import Images (keep only the ones used for UI elements)
import HeroImg from '../assets/pakHero.jpg';
import Trending1 from '../assets/trending1.jpg';
import Trending2 from '../assets/trending2.jpg';
import Trending3 from '../assets/trending3.jpg';

const TravHome = () => {
  const [filters, setFilters] = useState({ destination: '', date: '', category: '' });
  const [packages, setPackages] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const packagesSectionRef = useRef(null);
  const navigate = useNavigate();

  // Trending destinations (could also be fetched from API)
  const trendingDestinations = [
    { id: 1, name: 'Annapurna Base Camp', image: Trending1 },
    { id: 2, name: 'Boudhanath Stupa', image: Trending2 },
    { id: 3, name: 'Phewa Lake', image: Trending3 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch packages
        const packagesResponse = await axios.get('http://localhost:5000/api/packages');
        setPackages(packagesResponse.data);

        // Fetch blog posts
        const blogsResponse = await axios.get('http://localhost:5000/api/blogs');
        setBlogPosts(blogsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const scrollToPackages = () => {
    packagesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

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
              <option value="">All Categories</option>
              <option value="Adventure">Adventure</option>
              <option value="Trek">Trek</option>
              <option value="Sight-seeing">Sight-seeing</option>
              <option value="Cultural">Cultural</option>
              <option value="Nature">Nature</option>
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
                <p className="text-gray-600 mb-4">{post.excerpt || post.content.substring(0, 100)}...</p>
                <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                <Link to={`/blog/${post.id}`} className="mt-4 text-green-600 hover:text-green-800 font-medium inline-block">Read More →</Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/blog" className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition">
            View All Blog Posts
          </Link>
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