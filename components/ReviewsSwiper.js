"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    name: "John M.",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    text:
      "Amazing service! Fast delivery and great quality. The product arrived exactly as described. Highly satisfied!",
  },
  {
    name: "Emily S.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text:
      "Super smooth experience, will definitely come back. Customer support was fast and extremely professional.",
  },
  {
    name: "David K.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    text:
      "Excellent communication and the product is perfect. Really impressed with how fast it arrived.",
  },
  {
    name: "Sarah J.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text:
      "Loved everything about it. Great quality and amazing packing. Highly recommended for everyone!",
  },
  {
    name: "Adam P.",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    text:
      "Very professional and super fast service. Everything went so smoothly, I’m definitely ordering again.",
  },
];

const ReviewsSwiper = () => {
  return (
    <div className="w-full px-4 my-16">
          <h1 className="uppercase text-center  my-6  px-4 myGrayCat1 mt-20 mb-10">
     WHAT OUR CUSTOMERS SAY

    </h1>
      <Swiper
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          0: { slidesPerView: 1 }, // Mobile
          768: { slidesPerView: 3 }, // PC
        }}
        className="rounded-xl"
      >
        {reviews.map((review, index) => (
          <SwiperSlide
            key={index}
            className="bg-white p-6 rounded-xl text-center  "
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
            />

            {/* ⭐ 5-star image */}
            <img
              src="https://res.cloudinary.com/dnucihygt/image/upload/v1761851497/homepage_testimonial_rating_image_01_epng2v.svg"
              alt="5 stars"
              className="w-32 mx-auto mb-3"
            />

            {/* Comment — Limited to 3 lines */}
            <p className="myGrayR line-clamp-3 text-[15px] leading-relaxed">
              {review.text}
            </p>

            {/* Name */}
            <h3 className="myGrayR1 font-semibold mt-2">{review.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsSwiper;
