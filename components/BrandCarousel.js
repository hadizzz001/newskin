'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Marquee from 'react-fast-marquee';

const NewsTicker = () => {
  const [brands, setBrands] = useState([]);
  const router = useRouter();

  const fetchBrands = async () => {
    try {
      const response = await fetch('api/brand');
      const data = await response.json();
      // Only keep brands with an image
      const validBrands = data.filter(item => item.img?.[0]);
      setBrands(validBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Duplicate array for seamless loop
  const loopedBrands = [...brands, ...brands];

  return (
    <div className="w-full py-2 mt-10 overflow-hidden mb-20">
      <Marquee speed={60} gradient={false} pauseOnHover={false} direction="left">
        {loopedBrands.map((item, index) => {
          const isLast = index === loopedBrands.length - 1;

          return (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: isLast ? '70px' : '70px',
              }}
              onClick={() => router.push(`/search?brnd=${encodeURIComponent(item.name)}`)}
            >
              <img
                src={item.img[0]}
                alt={item.name || `brand-${index}`}
                style={{
                  height: '80px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default NewsTicker;
