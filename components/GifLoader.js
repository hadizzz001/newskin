"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const SLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null; // Hide component after animation

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fff] z-[9999]">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <img
          src="https://res.cloudinary.com/dwzizbcht/image/upload/v1759577194/ba4eeed06a8f9efb0d7b5ad26f1f8d45_w200_himzc9.gif"
          alt="S Loader"
          width={700}
          height={700}
          className="w-100 h-100 object-contain"
        />
      </motion.div>
    </div>
  );
};

export default SLoader;
