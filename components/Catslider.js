"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ResponsiveVideo = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        setCategories(data.slice(0, 5)); // ✅ Limit to 5
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <h1 className="uppercase text-center my-6 px-4 myGrayCat1 mt-20 mb-10">
        SHOP BY CATEGORIES
      </h1>

      {/* ✅ Horizontal scroll on mobile, wrap on desktop */}
      <div
        className="
          flex 
          sm:flex-wrap sm:justify-center sm:items-center 
          gap-6 sm:gap-10 px-4
          overflow-x-auto sm:overflow-x-visible
          flex-nowrap sm:flex-wrap
          scrollbar-hide
        "
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 flex flex-col items-center cursor-pointer"
            onClick={() => router.push("/search?cat=" + category.name)}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* ✅ Smaller circle on mobile, larger on desktop */}
            <div className="w-28 h-28 sm:w-48 sm:h-48 rounded-full overflow-hidden">
              {category.img[0].endsWith(".mp4") ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={category.img[0]} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={category.img[0]}
                  alt={category.name}
                />
              )}
            </div>

            {/* Category Name */}
            <h3 className="mt-3 uppercase text-center myGrayCat text-sm sm:text-base">
              {category.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ResponsiveVideo;
