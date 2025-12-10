"use client";

import { TempProps } from "../types";

interface CarCardProps {
    temp: TempProps;
}

const CarCard = ({ temp }: CarCardProps) => {
    const { _id, title, price, discount, img, type, stock, color } = temp;

    const isOutOfStock =
        (type === "single" && parseInt(stock) === 0) ||
        (type === "collection" &&
            color?.every(c => parseInt(c.qty) === 0));

    const discountPercentage = Math.round(((price - discount) / price) * 100);

    return (
        <a href={`/product?id=${_id}`}>
            <div className="flex flex-col items-start w-full sm:w-[300px] mb-6 sm:mb-8">
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                    <img
                        src={img[0]}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />

                    {/* Discount flag */}
                    {discount > 0 && (
                        <div
                            className="absolute top-2 left-2 bg-[#222] text-white text-xs font-regular px-3 py-1 z-20"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                            }}
                        >
                            {discountPercentage}% OFF
                        </div>
                    )}

                    {/* Out of stock overlay */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10 rounded">
                            Out of Stock
                        </div>
                    )}
                </div>

{/* Text under image */}
<div className="flex flex-col items-start mt-3 w-full">
  <h2 className="myGrayTP uppercase py-1">{title}</h2>

  {/* Price display */}
  <div className="price-container inline-flex flex-wrap gap-x-2 items-baseline text-white">

    {type === "collection" ? (
      // ✅ For collection, calculate min/max price from sizes
      (() => {
        const allPrices = color
          ?.flatMap(c => c.sizes.map(s => s.price))  // extract all size prices
          .filter(p => p > 0);                        // remove 0 or invalid prices

        if (allPrices?.length > 0) {
          const min = Math.min(...allPrices);
          const max = Math.max(...allPrices);

          return (
            <span className="py-1 myRed1">
              ${min.toFixed(2)} - ${max.toFixed(2)}
            </span>
          );
        } else {
          return (
            <span className="py-1 myRed1">No Price</span>
          );
        }
      })()
    ) : (
      // ✅ Normal product (single type)
      discount && discount > 0 ? (
        <>
          <span className="py-1 myRed1">
            ${parseFloat(discount).toFixed(2)}
          </span>
          <span className="font-light text-[13px] py-1 line-through text-gray-400">
            ${parseFloat(price).toFixed(2)}
          </span>
        </>
      ) : (
        <span className="py-1 myRed1">
          ${parseFloat(price).toFixed(2)}
        </span>
      )
    )}

  </div>
</div>

            </div>
        </a>
    );
};

export default CarCard;
