"use client"
import Head from 'next/head';
import Image from 'next/image';
import { React,useState } from 'react';

function SelectStyle({ onUserSelect }) {
  const [selectedStyle, setSelectedStyle] = useState();

  const styleOptions = [
    { name: 'Realistic', image: '/realistic.jpg' },
    { name: 'Animated', image: '/anime.jpg' },
    { name: 'Comic', image: '/comic.jpg' },
    { name: 'Colors', image: '/colors.jpg' },
    { name: 'GTA', image: '/gta.jpg' },
    { name: 'Sports', image: '/sports.png' },
  ];

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/realistic.jpg"
          as="image"
          type="image/jpeg"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
        />
      </Head>
      <div className="mt-8">
        <h2 className="font-bold text-3xl text-purple-600">Style</h2>
        <p>Select your short-video style.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
          {styleOptions.map((item, index) => (
            <div
              key={index}
              className={`relative transition-all cursor-pointer ${
                selectedStyle === item.name && 'border-4 rounded-xl border-purple-700'
              }`}
              onClick={() => {
                setSelectedStyle(item.name);
                onUserSelect('imageStyle', item.name);
              }}
            >
              <div className="relative w-full h-48">
                <Image
                  className="rounded-lg object-cover"
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  priority={index === 0} // Prioritize the first image
                />
              </div>
              <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
                {item.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectStyle;
