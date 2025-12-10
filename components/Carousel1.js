'use client';

import React from 'react';

const MyCarousel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden mb-20 mt-20">
      {/* Responsive Background Image */}
      <picture>
        {/* Desktop */}
        <source
          media="(min-width: 768px)"
          srcSet="https://res.cloudinary.com/dnucihygt/image/upload/v1761833971/image_g8zez5.webp"
        />
        {/* Mobile */}
        <img
          src="https://res.cloudinary.com/dnucihygt/image/upload/v1761833971/image_g8zez5.webp"
          alt="Sunny-Day Sale Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </picture>

      {/* Overlay Content */}
      <div
        className="
          relative z-10 flex flex-col justify-center h-full px-4
          text-white
          
          /* Center by default */
          items-center text-center

          /* On PC: push to right side but KEEP text & button centered */
          lg:items-end lg:pr-16
        "
      >
        <div className="flex flex-col items-center text-center">
<h1 className="text-5xl font-bold uppercase animate-slideInLeft">
  See in Style: glasses for every look
</h1>

<p className="text-[14px] mt-4 animate-slideInLeft delay-200 max-w-md">
  Elevate your vision with premium eyewear that blends fashion and function perfectly!
</p>

          <a
            href="/shop"
            className="mt-10 px-12 py-4 bg-white text-black font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MyCarousel;
