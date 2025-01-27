"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function SelectStyle({onUserSelect}) {
  const [selectedStyle, setSelectedStyle] = useState(); 

  const styleOptions = [
    {
      name: 'Realistic',
      image: '/realistic.jpg',
    },
    {
      name: 'Animated',
      image: '/anime.jpg', // Corrected image path
    },
    {
      name: 'Comic',
      image: '/comic.jpg',
    },
    {
      name: 'Colors',
      image: '/colors.jpg', // Corrected image path
    },
    {
      name: 'GTA',
      image: '/gta.jpg',
    },
    {
      name: 'Sports',
      image: '/sports.png',
    },
  ];

  return (
    <div className="mt-8 ">
      <h2 className="font-bold text-3xl text-purple-600">Style</h2>
      <p>Select your short-video style.</p>
      <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div 
            key={index} // Added key prop for better performance

            className={`relative transition-all cursor-pointer  ${selectedStyle===item.name && `border-4 rounded-xl border-purple-700`}`}
          > 
            <Image 
            className="h-48 object-cover rounded-lg w-full "
              src={item.image} 
              width={100} 
              height={100} 
              alt={item.name} // Added alt attribute for accessibility
              onClick={() => {
                            setSelectedStyle(item.name)
                            onUserSelect('imageStyle',item.name)
              }}
                 
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-lg">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;