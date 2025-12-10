import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard from './CarCard';
import { useRouter } from "next/navigation";

const YourComponent = () => {
  const [allTemps, setAllTemps] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setAllTemps(data.slice(-4));
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="ProvidersIfSelectedProductMatchesFilter mt-4 px-4 sm:px-6 md:px-8">

      <content-block slug="product-page-wssb">
        <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL">

          {allTemps && allTemps.length > 0 ? (
            <>

              <h1 className="uppercase text-center  my-6  px-4 myGrayCat1 mt-20 mb-10">
                BEST SELLERS

              </h1>

              <section className='mb-5' style={{ maxWidth: "100%" }}>
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    150: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                  }}
                >
                  {allTemps.map((temp) => (
                    <SwiperSlide key={temp.id}>
                      <CarCard temp={temp} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </section>

              <div className="text-center">
                <button
                  className='myinsidebtn'
                  onClick={() => router.push("/shop")}
                >
                  Shop All
                </button>
              </div>
            </>
          ) : (
            <div className="home___error-container text-center">
              <h2 className="text-black text-xl font-bold">No products available</h2>
            </div>
          )}
        </div>
      </content-block>
    </div>
  );
};

export default YourComponent;
