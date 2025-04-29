// pages/TravHome.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import HeroSection from './HeroSection';
import TrendingDestinations from './TrendingDestinations';
import PackageList from './PackageList';
import Contact from '../components/ui/Contact';
import Testimonial from '../components/ui/Testimonial';
import BlogSection from '../components/BlogList';
import Footer from './Footer';
import Gallery from '../components/ui/Gallery';

const TravHome = () => {
  const [filters, setFilters] = useState({ destination: '', date: '', category: '' });
  const [packages, setPackages] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const packagesRef = useRef(null);

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, blogRes] = await Promise.all([
          axios.get('http://localhost:5000/api/packages')
  //         axios.get('http://localhost:5000/api/blogs'),
        ]);
        setPackages(pkgRes.data);
  //       setBlogPosts(blogRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <>
      <NavBar func={scrollToPackages} />
      <HeroSection handleFilterChange={handleFilterChange} scrollToPackages={scrollToPackages} />
      <TrendingDestinations />
      <PackageList packages={packages} refProp={packagesRef} />
      <Testimonial/>
      <Gallery/>
      <Contact/>
      <BlogSection blogPosts={blogPosts} />
      <Footer/>
    </>
  );
};

export default TravHome;
