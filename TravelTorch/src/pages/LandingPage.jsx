import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hero1 from '../assets/Ilam.jpg';
import hero2 from '../assets/Lhotse.jpg';
import hero3 from '../assets/Bardiya.jpg';

const images = [hero1, hero2, hero3];

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHoveredTraveler, setIsHoveredTraveler] = useState(false);
  const [isHoveredAgency, setIsHoveredAgency] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const interval = setInterval(() => { 
      setCurrentImage((prev) => (prev + 1) % images.length);  
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Image Slideshow */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${image})`,
              zIndex: 0
            }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
      </div>
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 py-2 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-9 py-4">
          <h1 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-300">
            TravelTorch
          </h1>
          <nav className="space-x-4 md:space-x-6 flex">
            <a 
              href="/destinations" 
              className="text-white hover:text-blue-300 transition-colors duration-300 font-medium"
            >
              Destinations
            </a>
            <a 
              href="/travhome" 
              className="text-white hover:text-blue-300 transition-colors duration-300 font-medium"
            >
              Travel Packages
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-10 text-center">
        <div className="max-w-2xl w-full space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
            Discover <span className="text-blue-300">Breathtaking</span> Adventures
          </h2>
          <p className="text-lg sm:text-xl opacity-90 leading-relaxed text-white">
            Whether you're a traveler seeking unforgettable experiences or an agency ready to showcase the world's wonders, your journey begins here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button 
              onClick={() => navigate('/travhome')}
              onMouseEnter={() => setIsHoveredTraveler(true)}
              onMouseLeave={() => setIsHoveredTraveler(false)}
              className={`relative px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 overflow-hidden ${
                isHoveredTraveler 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span className="relative z-10">I'm a Traveler</span>
              {isHoveredTraveler && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 opacity-80"></span>
              )}
            </button>

            <button 
              onClick={() => navigate('/agencyDash')} 
              onMouseEnter={() => setIsHoveredAgency(true)}
              onMouseLeave={() => setIsHoveredAgency(false)}
              className={`relative px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 overflow-hidden ${
                isHoveredAgency 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <span className="relative z-10">I'm a Travel Agency</span>
              {isHoveredAgency && (
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-400 opacity-80"></span>
              )}
            </button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 py-4 text-center text-white/80 text-sm">
        <p>© {new Date().getFullYear()} TravelTorch. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;