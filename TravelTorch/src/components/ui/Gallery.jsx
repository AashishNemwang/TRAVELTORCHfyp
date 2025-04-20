import React from 'react'
import gallery1 from '../../assets/gallery-1.jpg'
import gallery2 from '../../assets/gallery-2.jpg'
import gallery3 from '../../assets/gallery-3.jpg'
import gallery4 from '../../assets/gallery-4.jpg'
import gallery5 from '../../assets/gallery-5.jpg'
import gallery6 from '../../assets/gallery-6.jpg'


const Gallery = () => {
  return (
    <div className='max-w-[90%] mx-auto my-20 text-center'>
        <h2 className='text-3xl font-bold mb-8 text-gray-800'>Gallery</h2>
        
        {/* Masonry-style gallery with no gaps and varied sizes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 mb-10">
            {/* Tall image */}
            <div className="relative group overflow-hidden">
                <img 
                    src={gallery1} 
                    alt="Workspace 1" 
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium text-lg">
                        Historical Monuments
                    </p>
                </div>
            </div>
            
            {/* Wide image spanning 2 columns */}
            <div className="relative group overflow-hidden md:col-span-2">
                <img 
                    src={gallery2} 
                    alt="Workspace 2" 
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium text-lg">
                        Valleys
                    </p>
                </div>
            </div>
            
            {/* Medium square image */}
            <div className="relative group overflow-hidden">
                <img 
                    src={gallery3} 
                    alt="Workspace 3" 
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium text-lg">
                        Adventure
                    </p>
                </div>
            </div>
            
            {/* Small square image */}
            <div className="relative group overflow-hidden">
                <img 
                    src={gallery4} 
                    alt="Workspace 4" 
                    className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium text-lg">
                        Homestays
                    </p>
                </div>
            </div>
            
            {/* Add more images with different sizes */}
            {/* Example additional images - duplicate and modify these */}
            <div className="relative group overflow-hidden">
                <img 
                    src={gallery6}  // Replace with your actual image import
                    alt="Workspace 5" 
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium text-lg">
                        Religious sites
                    </p>
                </div>
            </div>
            
            <div className="relative group overflow-hidden md:col-span-2">
                <img 
                    src={gallery5}  // Replace with your actual image import
                    alt="Workspace 6" 
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium text-lg">
                        Relaxation
                    </p>
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default Gallery