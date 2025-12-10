import React, { useState, useEffect } from 'react'; 
import { useCart } from '../app/context/CartContext';
import { useBooleanValue } from '../app/context/CartBoolContext';
import { X } from 'lucide-react'; // Lucide icon import

const Cart = () => {
    const { cart, removeFromCart, quantities, subtotal } = useCart();
    const [localQuantities, setLocalQuantities] = useState(quantities);
    const { isBooleanValue, setBooleanValue } = useBooleanValue();
    const [selectedOptions, setSelectedOptions] = useState({}); 

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    };

    useEffect(() => {
        setLocalQuantities(quantities);
    }, [quantities]);

    // Initialize first color & size when cart loads
    useEffect(() => {
        const initialOptions = {};
        cart.forEach((item) => {
            if (item.color && item.color.length > 0) {
                initialOptions[item._id] = {
                    colorId: item.color[0].id,
                    size: item.color[0].sizes[0].size
                };
            }
        });
        setSelectedOptions(initialOptions);
    }, [cart]);

const parseNumber = (v) => {
  // handle numbers or numeric strings like "0.00"
  const n = typeof v === 'number' ? v : parseFloat(String(v || '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
};

const getItemPrice = (item, {
  localQuantities = {},
  selectedOptions = {}
} = {}) => {
  const qty = parseInt(localQuantities[item._id] ?? item.quantity ?? 1, 10) || 1;

  // Helper: get selected values from selectedOptions or from the item itself
  const sel = selectedOptions[item._id] || {
    // sometimes selected values are stored on the item (as in your sample)
    colorId: item.selectedColor ?? item.selectedColorId ?? null,
    size: item.selectedSize ?? null,
  };

  // COLLECTION case: look up color -> size -> price
  if (item.type === 'collection') {
    if (!Array.isArray(item.color) || !sel) return 0 * qty;

    // Try to find color by id first, then by title (case-insensitive)
    const colorObj = item.color.find(c =>
      (c.id && sel.colorId && String(c.id) === String(sel.colorId)) ||
      (c.title && sel.colorId && String(c.title).toLowerCase() === String(sel.colorId).toLowerCase())
    ) || item.color[0]; // fallback to first color if none matched

    if (!colorObj || !Array.isArray(colorObj.sizes)) return 0 * qty;

    // Find size object (some sizes may use `size` key, others `title` - handle both)
    const sizeObj = colorObj.sizes.find(s =>
      (s.size && sel.size && String(s.size) === String(sel.size)) ||
      (s.title && sel.size && String(s.title) === String(sel.size))
    ) || colorObj.sizes[0]; // fallback to first size if none matched

    const unitPrice = parseNumber(sizeObj?.price ?? sizeObj?.unitPrice ?? item.price);
    return unitPrice * qty;
  }

  // NON-COLLECTION case: prefer discount (when present and non-null), otherwise price
  const base = (item.discount != null && item.discount !== '') ? item.discount : item.price;
  const unit = parseNumber(base);
  return unit * qty;
};


    const handleCloseCart = () => {
        setBooleanValue(false);
        const cartb2 = document.getElementById("cartid2");
        if (cartb2) cartb2.classList.remove("MiniCart_Cart-visible");
    };


    console.log("Cart == ", cart);
    

    return (
        <>
            {/* Overlay */}
            <div className="MiniCart_Slider_Overlay" id="cartid" onClick={handleCloseCart} />

            {/* Mini Cart */}
            <div id="cartid2" className={`MiniCart_Cart ${isBooleanValue ? "MiniCart_Cart-visible" : ""}`} style={{ zIndex: 9999999999 }}>
                {/* Heading with Lucide close button */}
                <div className="MiniCart_Cart_Heading br_text-grey-500 mt-2 flex justify-between items-center">
                    <span className="myGray">Your shopping bag</span>
                    <button 
                        className="p-1 rounded hover:bg-gray-200" 
                        onClick={handleCloseCart}
                        aria-label="Close"
                    >
                        <X size={24} strokeWidth={2} color="black" />
                    </button>
                </div>

                <div data-render-if="!cart-is-empty" className="MiniCart_Cart_CheckoutCart">
                    <div className="Checkout_Cart_Wrapper Checkout_Cart_Wrapper--All">
                        <div className="Checkout_Cart_TableHeading">
                            <span className="Checkout_Cart_TableHeading_Quantity">Qty</span>
                            <span className="Checkout_Cart_TableHeading_Total">Total price</span>
                        </div>

                        <div className="Checkout_Cart_LineItems">
                            {cart && cart.length > 0 ? (
                                cart.map((obj) => (
                                    <div key={obj._id} className="Checkout_Cart_LineItems_LineItem">
                                        <div className="Checkout_Cart_LineItems_LineItem_Thumb">
                                            <img src={obj.img[0]} alt={obj.title} />
                                        </div>
                                        <div className="Checkout_Cart_LineItems_LineItem_Details myGray">
                                            {obj.title}
                                            <div>
                                                <span className="myGray">Category:</span>
                                                <span className="myGray">{obj.category}</span>
                                            </div>

{obj.selectedColor && obj.selectedSize && (
    <div className="flex gap-2 mt-1">
        <span className="myGray">Color:</span>
        <span className="myGray font-bold">{obj.selectedColor}</span>

        <span className="myGray ml-4">Size:</span>
        <span className="myGray font-bold">{obj.selectedSize}</span>
    </div>
)}


                                            <div className="Checkout_Cart_LineItems_LineItem_Details_Quantity mt-1">
                                                <span className="myGray">Qty:</span>
                                                <span className="myGray font-bold ml-2">
                                                    {localQuantities[obj._id] || 1}
                                                </span>
                                            </div>

                                            <div className="Checkout_Cart_LineItems_LineItem_Price mt-1">
                                                <span className="Currency">
                                                    <span className="Currency_Monetary myGray">
                                                        {getItemPrice(obj)}
                                                    </span>
                                                    <span className="Currency_Code myGray">USD</span>
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            className="Checkout_Cart_LineItems_LineItem_Remove"
                                            onClick={() => handleRemoveFromCart(obj._id)}
                                        >
                                            <span className="Checkout_Cart_LineItems_LineItem_Remove_Cross">
                                                <span />
                                                <span />
                                            </span>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div data-render-if="cart-is-empty" className="MiniCart_Cart_EmptyCart">
                                    <span className="myGray">You have no items in your shopping bag.</span>
                                </div>
                            )}

                            <div className="mt-4">
                                <div className="Checkout_Cart_LineItems_LineItem Checkout_Cart_LineItems_LineItem-SalesPromotion Checkout_Cart_LineItems_LineItem-SalesPromotion-Custom">
                                    <div className="Checkout_Cart_LineItems_LineItem_Details">
                                        <div className="Checkout_Cart_LineItems_LineItem_Price">
                                            <span className="Currency">
                                                <span className="Currency_Monetary">Total: ${subtotal.toFixed(2)}</span>
                                                <span className="Currency_Code">USD</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a className="Common_Button Common_Button--short MiniCart_Cart_CtaButton mt-2" href="/checkout" rel="nofollow">
                            <span>Go to checkout</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
