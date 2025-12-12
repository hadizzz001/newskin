"use client";
import React, { useState, useEffect } from "react";

const MyCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch dynamic banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();

        // Convert API data → existing slide format
        const formatted = data.map((item, index) => ({
          img: item.img[0],
          title: item.title,
          sub: item.sub,
          buttonText: "Shop Now",
          textPosition: index % 2 === 0 ? "right" : "left",
        }));

        setSlides(formatted);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBanners();
  }, []);

  // Auto-switch every 5s
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Image */}
          <img
            src={slide.img}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover ${
              index === 1 ? "object-[35%_center] md:object-center" : ""
            }`}
          />

          {/* Text & Button */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-full px-6 md:px-12 lg:px-24 text-white flex flex-col space-y-4 ${
              slide.textPosition === "right"
                ? "items-end text-right"
                : "items-start text-left"
            }`}
          >
     

            <h1 className="text-6xl md:text-4xl font-bold myGrayTit">{slide.title}</h1> 
            <p className="text-lg md:text-2xl myGraySub ">{slide.sub}</p>

            <a
              href="/shop"
              className="px-8 py-3 md:px-12 md:py-4 font-semibold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#222", color: "#fff", borderRadius: 0 }}
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCarousel;
