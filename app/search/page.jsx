"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import CarCard from '../../components/CarCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';






const SlidingPagination = ({ page, totalPages, setPage }) => {
  const windowSize = 9;
  const shift = 4; // how much to slide each time

  // Calculate visible range
  let start = Math.max(1, Math.min(page - shift, totalPages - windowSize + 1));
  let end = Math.min(start + windowSize - 1, totalPages);

  // Jump to FIRST page
  const jumpToStart = () => {
    setPage(1);
  };

  // Jump to LAST page
  const jumpToEnd = () => {
    setPage(totalPages);
  };

  return (
    <div className="flex items-center gap-2 justify-center my-6">

      {/* Jump to START */}
      {page > 1 && (

<button
  className="w-8 h-8 flex items-center justify-center"
  onClick={jumpToStart}
>
  <svg
    className="w-6 h-6 text-gray-400"
    viewBox="0 0 10 10"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="10,0 0,5 10,10" />
  </svg>
</button>



      )}

      {/* Page Buttons */}
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`w-8 h-8  flex items-center justify-center ${
            p === page ? "myGrayp" : "myGrayp1"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Jump to END */}
      {page < totalPages && (
<button
  className="w-8 h-8 flex items-center justify-center"
  onClick={jumpToEnd} // or your "next" handler
>
  <svg
    className="w-6 h-6 text-gray-400"
    viewBox="0 0 10 10"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="0,0 10,5 0,10" />
  </svg>
</button>

      )}
    </div>
  );
};




const Body = () => {
  const searchParams = useSearchParams()
  const [allTemp, setTemp] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search query parameters from URL
  const search = searchParams.get('q');
  const search2 = searchParams.get('cat');
  const search3 = searchParams.get('sub');
  const search4 = searchParams.get('brnd');








  const fetchProducts = async (pageNum = 1) => {
    try {
      const params = new URLSearchParams();
      params.append('page', pageNum);
      params.append('limit', 10); // or any number you want

      if (search) params.append('q', search);
      if (search2) params.append('cat', search2);
      if (search3) params.append('sub', search3);
      if (search4) params.append('brnd', search4);

      const res = await fetch(`/api/productsz1?${params.toString()}`);
      const data = await res.json();

      setTemp(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    fetchProducts(page);
  }, [search, search2, search3, search4, page]);


  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };



  useEffect(() => {
    // Scroll to top whenever page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);



  return (


    <>

      <div className="br_min-h-screen br_relative mt-20">

        <header className="br_text-white  br_p-3 br_pt-11 md:br_py-20 br_flex md:br_justify-center">
          <div className="br_text-left md:br_max-w-[600px] lg:br_max-w-[800px] md:br_text-center br_flex br_flex-col br_gap-2  md:br_gap-4 md:br_items-center">
            <h5 className="br_text-md md:br_text-md  myGray">
              Are you looking for one of these?
            </h5>
          </div>
        </header>
        <div className="br_flex">






          <div className="br_flex-1">





            <div className="br_@container"> 
              <div
                className="br_group/tile-grid br_grid br_grid-flow-dense br_gap-1 br_py-1 br_grid-cols-2 sm:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:br_px-1 lg:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))] supports-[container-type]:sm:br_grid-cols-2 supports-[container-type]:sm:@[640px]:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] supports-[container-type]:lg:@[1024px]:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))]"

              >








                {allTemp && allTemp.length > 0 ? (
                  allTemp.map((item, index) => (
                    <CarCard temp={item} index={index} />
                  ))
                ) : (
                  <div className="home___error-container">
                    <h2 className="text-black text-xl dont-bold">...</h2>
                  </div>
                )}















              </div>

              <SlidingPagination page={page} totalPages={totalPages} setPage={setPage} />

            </div>
          </div>
        </div>
      </div>


      <div>

      </div>








    </>








  )
}

export default Body