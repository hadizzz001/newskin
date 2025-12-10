"use client"

import { Test, CarCard } from '../../components'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useBooleanValue } from '../context/CartBoolContext';
import QuantitySelector from '../../components/QuantitySelector';
import OutOfStockComponent from '../../components/OutOfStockComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs, Autoplay, Controller, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";


const Page = () => {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [zoomSwiper, setZoomSwiper] = useState(null);
  const [translateXValue, setTranslateXValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const custom = searchParams.get('custom');
  const imgg = searchParams.get('imgg');
  let imgs, title, price, desc, cat, brand, discount, id, stock, type,  sub, fact, views, orders   ;
  const { cart, addToCart, quantities } = useCart();
  const { isBooleanValue, setBooleanValue } = useBooleanValue();
  const isInCart = cart?.some((item) => item._id === search);
  const router = useRouter();
  const [allTemp1, setAllTemps1] = useState();
  const [allTemp2, setAllTemps2] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [hasSizes, setHasSizes] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const hasRun = useRef(false);
  const [zoomedImg, setZoomedImg] = useState(null);
  const color = allTemp1?.color ?? []; // ✅ assure color is always an array
 




useEffect(() => {
  if (!color || color.length === 0) return;

  const firstColor = color.find(c => c.sizes?.some(s => s.qty > 0)) || color[0];

  if (firstColor) {
    setSelectedColor(firstColor.code);  // ✅ use code
    if (firstColor.sizes && firstColor.sizes.length > 0) {
      const firstSize = firstColor.sizes.find(s => s.qty > 0);
      if (firstSize) {
        setSelectedSize(firstSize.size);
        setDisplayedPrice(firstSize.price);
      }
    } else {
      setDisplayedPrice(firstColor.price ?? null);
      setSelectedSize(null);
    }
  }
}, [allTemp1]);


// ✅ Colors with sizes
const availableColorsWithSizes = color?.filter(c =>
  c.sizes?.some(size => size.qty > 0)
);

// ✅ Colors without sizes
const availableColorsWithoutSizes = color?.filter(
  c => (!c.sizes || c.sizes.length === 0) && c.qty > 0
);

// ✅ Detect if collection has sizes
useEffect(() => {
  setHasSizes(Array.isArray(color) && color.some(c => c.sizes?.length > 0));
}, [color]);





 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/products/${search}`);
        const data = await response.json();
        console.log("data: ", data);

        setAllTemps1(data[0]);
      } catch (error) {
        console.error("Error fetching the description:", error);
      }
    };

    fetchData();
  }, []);









  if (allTemp1) {
    id = allTemp1._id;
    imgs = allTemp1.img;
    brand = allTemp1.brand;
    cat = allTemp1.category;
    title = allTemp1.title;
    price = allTemp1.price;
    discount = allTemp1.discount;
    desc = allTemp1.description;
    stock = allTemp1.stock;
    type = allTemp1.type; 
    sub = allTemp1.sub;
    fact = allTemp1.factory;
    views = allTemp1.views;
    orders = allTemp1.orders;
  }


  useEffect(() => {
    if (cat) {
      const fetchData = async () => {
        try {
          const response = await fetch(`api/products1/${cat}`);
          const data = await response.json();
          setAllTemps2(data.slice(0, 5));  // Only take first 5 items
        } catch (error) {
          console.error("Error fetching the description:", error);
        }
      };

      fetchData();
    }
  }, [cat]);







  const fetchPrice = async () => {
    const response = await fetchTemp4(search);
    setTemp1(response);
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  const sv = -8.3333333;

  const handleClick = (idx) => {
    setTranslateXValue(idx * sv);
  };







  function handleClickc() {
    var cartb = document.getElementById("cartid");
    var cartb2 = document.getElementById("cartid2");
    setBooleanValue(!isBooleanValue);
    if (cartb && cartb2) {
      if (isBooleanValue) {
        cartb2.className += " MiniCart_Cart-visible";
      } else {
        cartb2.classList.remove("MiniCart_Cart-visible");
      }
    }
  };






 


const handleSubmit = (e) => {
  e.preventDefault();

  console.log("====== ADD TO CART CLICKED ======");

  console.log("Product Object (allTemp1):", allTemp1);
  console.log("Selected Quantity:", quantity);
  console.log("Selected Color (title):", selectedColor);

  const selectedColorObj = color?.find((c) => c.title === selectedColor);
  console.log("Selected Color Object:", selectedColorObj);

  console.log("Selected Size:", selectedSize);

  // VALIDATIONS
  if (isCollection && !selectedColor) {
    console.warn("No color selected – blocking add to cart.");
    alert("Please select a color.");
    return;
  }

  if (selectedColorObj?.sizes?.length > 0 && !selectedSize) {
    console.warn("No size selected – blocking add to cart.");
    alert("Please select a size.");
    return;
  }

  // LOG BEFORE ADD
  console.log("Cart BEFORE adding:", cart);

  // DO ADD
  addToCart(allTemp1, quantity, selectedColor, selectedSize);

  // LOG AFTER ADD
  setTimeout(() => {
    console.log("Cart AFTER adding:", cart);
  }, 50);

  handleClickc();
  incrementViews123();
};




  const gotocart = () => {
    router.push('/checkout');
  };


  const isCollection = type === 'collection';
  const isSingle = type === 'single';

  const isCollectionOutOfStock = isCollection && (!color || color.every(c => c.qty === 0));
  const isCollectionOutOfStock1 = isCollection && color?.every(color => color.sizes?.every(size => parseInt(size.qty) === 0));
  const isSingleOutOfStock = isSingle && Number(stock) === 0;
  const isOutOfStock = isCollectionOutOfStock || isSingleOutOfStock || isCollectionOutOfStock1;

 




  useEffect(() => {
    if (Array.isArray(color) && color.some(c => Array.isArray(c.sizes) && c.sizes.length > 0)) {
      setHasSizes(true);
    } else {
      setHasSizes(false);
    }
  }, [color]);



useEffect(() => {
  if (!allTemp1 || !color || color.length === 0) return;

  // Get first available color (with size if available)
  const firstColor = color.find((c) =>
    c.sizes?.some((s) => s.qty > 0)
  ) || color[0];

  if (firstColor) {
    setSelectedColor(firstColor.title); // <-- store title now
    
    if (firstColor.sizes && firstColor.sizes.length > 0) {
      const firstSize = firstColor.sizes.find((s) => s.qty > 0);
      if (firstSize) {
        setSelectedSize(firstSize.size);
        setDisplayedPrice(firstSize.price);
      }
    } else {
      setDisplayedPrice(firstColor.price ?? null);
    }
  }
}, [allTemp1]);


 



  useEffect(() => {
    if (mainSwiper && zoomSwiper) {
      mainSwiper.controller.control = zoomSwiper;
      zoomSwiper.controller.control = mainSwiper;
    }
  }, [mainSwiper, zoomSwiper]);






  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: "\n\n.uploadcare--widget__button, .uploadcare--widget__button:hover {\n\tpadding: 10px;\n\tbackground-color: #d7d7d7; \n  color: #212529;\n  width:100%;\n}\n\n.uploadcare--widget__button:hover {\n\tbackground-color: #c1c1c1;\n  \n}\n\n\n"
        }}
      />

      {/* Zoom Modal */}



      {zoomedImg && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setZoomedImg(null)}
          style={{ cursor: "zoom-out", zIndex: 9999 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[90vw] max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setZoomedImg(null)}
              className="absolute top-4 right-4 text-white text-4xl font-light z-50 hover:scale-110 transition"
              style={{ cursor: "pointer" }}
            >
              ×
            </button>

            <Swiper
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full h-full"
              modules={[Pagination, Controller, Navigation]}
              onSwiper={setZoomSwiper}
              controller={{ control: mainSwiper }}
            >
              {imgs.map((item, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex justify-center items-center"
                >
                  <img
                    src={item.replace("/upload/", "/upload/q_80/")}
                    alt=""
                    className="max-w-[90vw] max-h-[90vh] object-contain select-none"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Left Arrow */}
            <button
              className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 text-white text-5xl font-light z-50 transition hover:scale-110"
            >
              ‹
            </button>

            {/* Right Arrow */}
            <button
              className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 text-white text-5xl font-light z-50 transition hover:scale-110"
            >
              ›
            </button>
          </div>
        </div>
      )}



      <div className="ProductDetailWrapper  md:mt-20  mt-20">
        <div className="BreadcrumbsWrapper">
          <div className="br_flex br_px-6 xl:br_px-0 br_text-xs-sans-bold-stretched br_text-[12px] br_text-grey-400 br_h-12 br_items-center">
          </div>
        </div>
        <bellroy-product-detail data-filter-dimensions-style="WSSB,WSSB-CHA-213,WSSD-MIB-124,WSSB-BSH-102" data-default-sku="WSSB-BLACK" style={{}} data-updated-url="null">
          <div className="ProductDetail">
            <div className="Layout br_contents">
              <unsafe-html style={{ display: "none" }} />
              <events-enabled data-events="custom.product.view" />
              <div className=" container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* LEFT: Swipe gallery */}
                  <div className="w-full">
                    {imgs && imgs.length > 0 ? (
                      <>
                        {/* Main Swiper */}
                        <Swiper
                          pagination={{ clickable: true }}
                          spaceBetween={10}
                          slidesPerView={1}
                          thumbs={{ swiper: thumbsSwiper }}
                          className="rounded-lg overflow-hidden"
                          modules={[Pagination, Thumbs, Controller]}
                          onSwiper={setMainSwiper}   // ✅ Capture instance
                          controller={{ control: zoomSwiper }} // ✅ Link to zoom swiper later
                        >
                          {imgs.map((item, idx) => (
                            <SwiperSlide key={idx} className="flex justify-center items-center  ">
                              <div className="w-full aspect-square flex justify-center items-center">
                                <img
                                  src={item.replace("/upload/", "/upload/q_80/")}
                                  alt=""
                                  className="w-full h-full object-contain cursor-zoom-in"
                                  onClick={() => setZoomedImg(item.replace("/upload/", "/upload/q_80/"))}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        {/* Thumbnails Swiper */}
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          modules={[Thumbs]}
                          spaceBetween={10}
                          slidesPerView={4}
                          watchSlidesProgress
                          className="mt-3"
                        >
                          {imgs.map((item, idx) => (
                            <SwiperSlide key={idx} className="cursor-pointer">
                              <div className="w-full aspect-square overflow-hidden rounded-md border border-gray-300">
                                <img
                                  src={item}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </>
                    ) : (
                      <div className="text-gray-600">No images available</div>
                    )}
                  </div>


                  {/* RIGHT: ProductSelector (your data block) */}
                  <section className="ProductSelector">
                    <span className="ProvidersSingleProduct--selected">
                      <h4 className="myGray">
                        {title}
                        <span
                          className="ProductSelector_EditionLabel"
                          style={{ margin: "0 0 0 3px" }}
                        />
                      </h4>
                      <p className="mb-2 myGray">Brand: {fact}</p>
                      <p className="mb-2 myGray">Category: {cat}</p> 
                    </span>

                    <div className="ApexPriceAndFreeShippingWrapper">
                      <div>
                        <div className="FreeShippingMessage FreeShippingMessage--empty" />
                      </div>
                    </div>

                    <hr />

                    <div className="ProductSelector_IntroBlurb">
{isCollection && (
  <div className="mb-4">
    <h2 className="color-label myGray">Choose a Color:</h2>
    <div className="color-options flex flex-wrap">
{availableColorsWithSizes?.map((c, index) => (
  <div
    key={index}
    onClick={() => {
      setSelectedColor(c.title);  // store title instead of code
      setSelectedSize(null);
      setDisplayedPrice(null);
    }}
    className={`relative flex items-center justify-center cursor-pointer m-2 rounded-full transition-all duration-200 ${
      selectedColor === c.title ? 'myboo scale-95' : 'border-2 border-gray-300'
    }`}
    style={{
      width: selectedColor === c.title ? '44px' : '48px',
      height: selectedColor === c.title ? '44px' : '48px',
    }}
    title={c.title} // still show tooltip
  >
    <div
      className="rounded-full transition-all duration-200"
      style={{
        backgroundColor: c.code, // still use hex for display
        width: selectedColor === c.title ? '28px' : '36px',
        height: selectedColor === c.title ? '28px' : '36px',
      }}
    />
  </div>
))}


    </div>

{selectedColor && availableColorsWithSizes.find(c => c.title === selectedColor) && (
  <div className="mt-2">
    <h2 className="size-label myGray">Choose a Size:</h2>
    <div className="size-options flex flex-wrap">
      {availableColorsWithSizes
        .find(c => c.title === selectedColor) // ✅ use title
        .sizes?.filter(s => s.qty > 0)
        .map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedSize(s.size);
              setDisplayedPrice(s.price);
            }}
            className={`px-3 py-1 m-1 rounded ${selectedSize === s.size ? 'myboo22' : 'myboo2'}`}
          >
            {s.size}
          </button>
        ))}
    </div>
  </div>
)}



 
  </div>
)}

{/* --- price logic --- */}
{hasSizes ? (
  selectedSize ? (
    (() => {
      const original = parseFloat(displayedPrice);
      return (
        <div className="flex items-center space-x-2">
          <h3 className="mb-2 myRed font-bold myPrice123">
            ${original.toFixed(2)}
          </h3>
        </div>
      );
    })()
  ) : null
) : (() => {
  const originalPrice = parseFloat(price || "0");
  const discountPrice = parseFloat(discount || "0");

  // If discount is the same as price, show only price
  if (originalPrice === discountPrice || discountPrice === 0) {
    return (
      <div className="flex items-center space-x-2">
        <h3 className="mb-2 myRed font-regular myPrice1234">
          ${originalPrice.toFixed(2)}
        </h3>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((originalPrice - discountPrice) / originalPrice) * 100
  );

  return (
    <div className="flex items-center space-x-2">
      <h3 className="mb-2 myRed font-bold myPrice1234">
        ${discountPrice.toFixed(2)}
      </h3>
      <h2 className="mb-2 myGray line-through myPrice123">
        ${originalPrice.toFixed(2)}
      </h2>

      {discountPercent !== null && (
        <span className="text-xs text-gray-500">({discountPercent}% off)</span>
      )}
    </div>
  );
})()}



                    </div>

                    {/* --- add to cart / in bag --- */}
                    <div className="bagsFeaturesGrid__gridWrapper">
                      {isInCart ? (
                        <>
                          <p
                            style={{
                              color: "#222",
                              textAlign: "center",
                              fontSize: "2em",
                              fontWeight: "bolder",
                            }}
                          >
                            It's In cart!
                          </p>
                          <div>
                            <span className="ProvidersSingleProduct--selected">
                              <button
                                type="button"
                                className="AddToCart HtmlProductAddToCart"
                                style={{ borderRadius: "0" }}
                                onClick={gotocart}
                              >
                                <span>CHECKOUT NOW</span>
                              </button>
                            </span>
                          </div>
                          <br />
                        </>
                      ) : (
                        <div>
                          <form onSubmit={handleSubmit}>
                            <QuantitySelector
                              initialQty={quantity}
                              onChange={setQuantity}
                              productId={id}
                              type={type}
                              selectedColor={selectedColor}
                              selectedSize={selectedSize}
                            />

                            <span className="ProvidersSingleProduct--selected">
                              {!isOutOfStock ? (
                                <button
                                  type="submit"
                                  className="AddToCart HtmlProductAddToCart"
                                  style={{ borderRadius: "0" }}
                                  disabled={isCollection && !selectedColor}
                                >
                                  <span>ADD TO CART</span>
                                </button>
                              ) : (
                                <OutOfStockComponent itemName={title} />
                              )}
                            </span>
                          </form>

                          <span className="ProvidersIfSelectedProductMatchesFilter">
                            <p
                              className="myGray"
                              dangerouslySetInnerHTML={{ __html: desc }}
                            />
                            <br />
                          </span>
                        </div>
                      )}
                      <br />
                    </div>
                  </section>
                </div>
              </div>
              <span className="ProvidersIfSelectedProductMatchesFilter">
                <content-block slug="product-page-wssb">
                  <style dangerouslySetInnerHTML={{
                    __html: ".bagsFeaturesGrid{margin:0 auto;padding:30px 5%;background:#111622}.bagsFeaturesGrid__gridWrapper{max-width:1150px;margin:0 auto}.bagsFeaturesGrid__title{-webkit-font-smoothing:antialiased;text-align:center;padding:0 0 25px;margin:0 auto;color:#fff}.bagsFeaturesGrid__feature{background:inherit;display:grid;grid-template-s:auto;align-items:center;padding:5px 0}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:center;padding:15px 0 20px;grid-:2}.bagsFeaturesGrid__feature--text a{color:inherit}.bagsFeaturesGrid__feature--text h3{color:#fff;padding-bottom:10px}.bagsFeaturesGrid__feature--text p{color:#eee}.bagsFeaturesGrid__feature--image{position:relative;width:100%;min-height:62vw}@media (min-width: 811px){.bagsFeaturesGrid__feature--image{min-height:28vw}}@media (min-width: 1460px){.bagsFeaturesGrid__feature--image{min-height:409px}}.bagsFeaturesGrid__feature--image img{width:100%;display:block}.bagsFeaturesGrid__feature--image--logo{position:absolute;bottom:3.5%;right:8%;width:15vw}.bagsFeaturesGrid__feature--image--logo img{width:100%}.bagsFeaturesGrid__feature--text--logo{width:100px;padding-top:30px}.bagsFeaturesGrid__feature--text--logo img{width:100%}@media (min-width: 811px){.bagsFeaturesGrid{padding:75px 10%}.bagsFeaturesGrid__title{padding:0 0 60px}.bagsFeaturesGrid__feature{display:grid;grid-template-columns:1fr 1fr;grid-template-s:auto;padding:30px 0}.bagsFeaturesGrid__feature--image--logo{width:7vw}.bagsFeaturesGrid__feature .left{padding-right:15%}.bagsFeaturesGrid__feature .right{padding-left:15%}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:left;padding:0;grid-:auto}}"
                  }} />
                  <style dangerouslySetInnerHTML={{
                    __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center;padding-bottom:10px}.ProductTile-SliderContainer--YMAL.ProductTile-SliderContainer{padding:40px 0 10px;background-color:#fff ;display:flex;flex-direction:column;align-items:center}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{height:25px;width:25px;border-top:2px solid #999;border-right:2px solid #999}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{transform:rotate(45deg);margin:0 15px 0 0}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar{transform:rotate(225deg);margin:0 0 0 15px}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{height:430px;width:80px;cursor:pointer;background-color:transparent;transition:opacity .3s ease;display:none;border:none;padding:0;appearance:none;-webkit-appearance:none}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev[disabled],.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next[disabled]{opacity:0;pointer-events:none}@media (min-width: 700px){.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{display:flex;align-items:center;justify-content:center}}@media (min-width: 811px){.ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{padding-bottom:30px}}.ProductTile-SliderContainer--YMAL .productRangeSlider{display:flex;align-items:center;max-width:1340px;width:100%;padding:5px;justify-content:space-between;margin:0 auto;min-height:145px}"
                  }} />
                  <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL" data-product-list-category="ymal-slider">
                    <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-white myGray">RELATED PRODUCTS:</div>
                    {allTemp2 && allTemp2?.length > 0 ? (
                      <section style={{ maxWidth: "100%" }}>
<Swiper
  spaceBetween={20}
  loop
  dir="rtl" // This makes the slider right-to-left
  modules={[Autoplay]}
  autoplay={{
    delay: 2000,
    stopOnLastSlide: false,
    reverseDirection: true, // optional, for autoplay reverse
  }}
  breakpoints={{
    150: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
  }}
>
  {allTemp2.map((temp, index) => (
    <SwiperSlide key={temp._id}>
      <CarCard temp={temp} index={index} />
    </SwiperSlide>
  ))}
</Swiper>

                      </section>
                    ) : (
                      <div className='home___error-container'>
                        <h2 className='text-black text-xl dont-bold'>...</h2>
                      </div>
                    )}
                  </div>
                </content-block>
              </span>
            </div>
          </div>
        </bellroy-product-detail>
      </div>
    </>
  );
}

export default Page;
