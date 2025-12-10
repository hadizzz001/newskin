'use client';
import { useState, useEffect } from 'react';

export default function ImageGrid() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/off');
        const data = await res.json();

        if (Array.isArray(data)) {
          setOffers(data);
        } else {
          console.error("Invalid API data:", data);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-4 space-y-6">

      {/* ✅ Desktop: 3 rectangle images */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {offers.map((offer, index) => (
          <a
            key={index}
            href={`https://wa.me/96181047532?text=Hello, I am interested in this offer "${encodeURIComponent(offer.name)}"`}
            target="_blank"
            className="relative w-full aspect-[16/9] rounded-lg overflow-hidden cursor-pointer"
          >
            <img src={offer.img[0]} alt={offer.name} className="w-full h-full object-cover" />

            {/* 🔴 FLAG TAG */}
            <div className="absolute top-3 right-0 flex items-center z-10">
              <div className="w-0 h-0 border-t-[25px] border-b-[25px] border-r-[25px] border-transparent border-r-red-600"></div>
              <div className="bg-red-600 text-white font-extrabold text-[12px] md:text-[18px] px-6 py-3 whitespace-nowrap">
                {offer.name.toUpperCase()}
              </div>
              <div className="w-0 h-0 border-t-[25px] border-b-[25px] border-l-[25px] border-transparent border-l-red-600"></div>
            </div>
          </a>
        ))}
      </div>

{/* ✅ Mobile: 1 rectangle per row (horizontal scroll, forced crop) */}
<div className="overflow-x-auto md:hidden mt-4">
  <div className="flex space-x-4 snap-x snap-mandatory">
    {offers.map((offer, index) => (
      <a
        key={index}
        href={`https://wa.me/961456465?text=I am interested in this offer ${encodeURIComponent(offer.name)}`}
        target="_blank"
        className="min-w-[100%] h-[180px] relative rounded-lg overflow-hidden flex-shrink-0 cursor-pointer snap-start"
      >
        <img
          src={offer.img[0]}
          alt={offer.name}
          className="w-full h-full object-cover" // ✅ crops to rectangle
        />

        {/* 🔴 FLAG TAG */}
        <div className="absolute top-3 right-0 flex items-center z-10">
          <div className="w-0 h-0 border-t-[25px] border-b-[25px] border-r-[25px] border-transparent border-r-red-600"></div>
          <div className="bg-red-600 text-white font-extrabold text-[12px] md:text-[18px] px-6 py-3 whitespace-nowrap">
            {offer.name.toUpperCase()}
          </div>
          <div className="w-0 h-0 border-t-[25px] border-b-[25px] border-l-[25px] border-transparent border-l-red-600"></div>
        </div>
      </a>
    ))}
  </div>
</div>


    </div>
  );
}
