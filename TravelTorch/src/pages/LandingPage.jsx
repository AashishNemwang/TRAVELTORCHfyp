import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hero1 from '../assets/Ilam.jpg';
import hero2 from '../assets/Lhotse.jpg';
import hero3 from '../assets/Bardiya.jpg';
import FeatureImage from '../assets/feature.png'; 

const images = [hero1, hero2, hero3];

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const interval = setInterval(() => { 
      setCurrentImage((prev) => (prev + 1) % images.length);  
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      ></div>
      
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

     
      <header className="absolute bg-black bg-opacity-60 top-0 left-0 right-0 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-9 py-4">
          <h1 className="text-2xl font-bold">TravelTorch</h1>
          <nav className="space-x-6 flex">
            <a href="/destinations" className="hover:text-blue-300">Destinations</a>
            <a href="/travhome" className="hover:text-blue-300">Travel Packages</a>
          </nav>
        </div>
      </header>

   
      <main className="relative z-10 flex min-h-screen items-center px-10">
        
        <div className="w-1/2 text-white p-10">
          <h2 className="text-5xl font-bold mb-6">Welcome to TravelTorch</h2>
          <p className="text-lg mb-8">
            Are you a traveler looking for exciting travel packages? Or are you an agency ready to showcase amazing destinations? Select your role to get started.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            
            <button 
              onClick={() => navigate('/travhome')}
              className="bg-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
            >
              I’m a Traveler
            </button>

         
            <button 
              onClick={() => navigate('/agencyDash')} 
              className="bg-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
            >
              I’m a Travel Agency
            </button>
          </div>
        </div>

        
        
      </main>
    </div>
  );
};

export default LandingPage;
