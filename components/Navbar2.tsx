'use client';

import { useState, useEffect } from 'react';
import Cart from "../components/Cart";
import { useBooleanValue } from '../app/context/CartBoolContext';
import { useCart } from '../app/context/CartContext';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const { isBooleanValue, setBooleanValue } = useBooleanValue();

  const [points, setPoints] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("userPoints") || "0");
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const current = parseInt(localStorage.getItem("userPoints") || "0");
        if (current !== points) {
          setPoints(current);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [points]);

  const handleClickc = () => {
    const cartb2 = document.getElementById("cartid2");
    setBooleanValue(!isBooleanValue);
    if (cartb2) {
      if (isBooleanValue) {
        cartb2.className += " MiniCart_Cart-visible";
      } else {
        cartb2.classList.remove("MiniCart_Cart-visible");
      }
    }
  };

  return (
    <>
      <Cart />

      <header
        className="w-full sticky top-8 z-40"
        style={{ background: '#f1ede7' }}
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex px-4 py-7 items-center justify-between relative">

          {/* Left: Logo */}
          <div className="flex-shrink-0 mr-10">
            <a href="/">
              <img
                src="https://res.cloudinary.com/dhgtlwqax/image/upload/v1765392845/skincare-logo-design-with-luxury-style-vector-graphics_719626-54-removebg-preview_1_byhk9x.png"
                alt="Logo"
                className="h-16"
                style={{ maxHeight: '80px' }}
              />
            </a>
          </div>

          {/* Nav beside logo (Right of logo) */}
          <nav className="flex space-x-10 text-lg font-lighter">
            <a href="/" style={{ color: '#222' }}>Home</a>
            <a href="/shop" style={{ color: '#222' }}>Shop</a>
            <a href="/about" style={{ color: '#222' }}>About</a>
            <a href="/contact" style={{ color: '#222' }}>Contact Us</a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 ml-auto">
            <button onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="w-6 h-6" strokeWidth={2.5} color="#222" />
            </button>

            <span onClick={handleClickc} className="menuicon relative cursor-pointer">
<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#222">
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    <path 
      d="M3.74181 20.5545C4.94143 22 7.17414 22 11.6395 22H12.3607C16.8261 22 19.0589 22 20.2585 20.5545M3.74181 20.5545C2.54219 19.1091 2.95365 16.9146 3.77657 12.5257C4.36179 9.40452 4.65441 7.84393 5.7653 6.92196M3.74181 20.5545C3.74181 20.5545 3.74181 20.5545 3.74181 20.5545ZM20.2585 20.5545C21.4581 19.1091 21.0466 16.9146 20.2237 12.5257C19.6385 9.40452 19.3459 7.84393 18.235 6.92196M20.2585 20.5545C20.2585 20.5545 20.2585 20.5545 20.2585 20.5545ZM18.235 6.92196C17.1241 6 15.5363 6 12.3607 6H11.6395C8.46398 6 6.8762 6 5.7653 6.92196M18.235 6.92196C18.235 6.92196 18.235 6.92196 18.235 6.92196ZM5.7653 6.92196C5.7653 6.92196 5.7653 6.92196 5.7653 6.92196Z" 
      stroke="#222" 
      strokeWidth="2" 
    />
    <path 
      d="M9 6V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V6" 
      stroke="#222" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </g>
</svg>

              {cart && cart.length > 0 && (
                <span className="MiniCart_CartIndicator_Badge1"></span>
              )}
            </span>
          </div>

        </div>


        {/* Mobile Nav */}
        <div className="flex md:hidden px-4 py-4 items-center justify-between relative mobnavnew123">
          {/* Left: Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center"
          >
            <Menu className="w-6 h-6" strokeWidth={1} color="#222" />
          </button>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/">
              <img
                src="https://res.cloudinary.com/dhgtlwqax/image/upload/v1765392845/skincare-logo-design-with-luxury-style-vector-graphics_719626-54-removebg-preview_1_byhk9x.png"
                alt="Logo"
                className="h-12"
              />
            </a>
          </div>

          {/* Right: Search + Cart */}
          <div className="flex items-center space-x-4 ml-auto">
            <button onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="w-6 h-6" strokeWidth={1} color="#222" />
            </button>
            <span onClick={handleClickc} className="menuicon relative cursor-pointer">
              <svg
                width="22px" height="22px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#222"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M3.74181 20.5545C4.94143 22 7.17414 22 11.6395 22H12.3607C16.8261 22 19.0589 22 20.2585 20.5545M3.74181 20.5545C2.54219 19.1091 2.95365 16.9146 3.77657 12.5257C4.36179 9.40452 4.65441 7.84393 5.7653 6.92196M3.74181 20.5545C3.74181 20.5545 3.74181 20.5545 3.74181 20.5545ZM20.2585 20.5545C21.4581 19.1091 21.0466 16.9146 20.2237 12.5257C19.6385 9.40452 19.3459 7.84393 18.235 6.92196M20.2585 20.5545C20.2585 20.5545 20.2585 20.5545 20.2585 20.5545ZM18.235 6.92196C17.1241 6 15.5363 6 12.3607 6H11.6395C8.46398 6 6.8762 6 5.7653 6.92196M18.235 6.92196C18.235 6.92196 18.235 6.92196 18.235 6.92196ZM5.7653 6.92196C5.7653 6.92196 5.7653 6.92196 5.7653 6.92196Z"
                    stroke="#222"
                    strokeWidth="1"
                  />
                  <path
                    d="M9 6V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V6"
                    stroke="#222"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              {cart && cart.length > 0 && (
                <span className="MiniCart_CartIndicator_Badge1"></span>
              )}
            </span>
          </div>
        </div>

        {/* Mobile Fullscreen Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 md:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close menu"
            >
              <X className="w-8 h-8 mt-5" strokeWidth={1} color="#222" />
            </button>
            <nav className="flex flex-col items-center gap-6 mt-12 text-3xl font-lighter">
              <a href="/" onClick={() => setMenuOpen(false)} style={{ color: '#222' }}>Home</a>
              <a href="/shop" onClick={() => setMenuOpen(false)} style={{ color: '#222' }}>Shop</a>
              <a href="/about" onClick={() => setMenuOpen(false)} style={{ color: '#222' }}>About</a>
              <a href="/contact" onClick={() => setMenuOpen(false)} style={{ color: '#222' }}>Contact Us</a>
            </nav>
          </div>
        )}

        {/* Search Overlay */}
        {searchOpen && (
          <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close search"
            >
              <X className="w-8 h-8 mt-5" strokeWidth={1} color="#222" />
            </button>

            <form
              action={'/search'}
              method="get"
              className="flex flex-col items-center justify-center"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-7 h-7" strokeWidth={1} color="#222" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search..."
                  className="w-3/4 max-w-md text-2xl border-b-2 border-gray-400 outline-none py-2 text-center"
                  autoFocus
                  style={{ color: '#222' }}
                />
              </div>
            </form>
          </div>
        )}

        {/* Cart Overlay */}
        {cartOpen && (
          <div className="fixed inset-0 bg-white text-black z-50 overflow-y-auto">
            <button
              onClick={() => setCartOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close cart"
            >
              <X className="w-8 h-8 mt-5" strokeWidth={1} color="#222" />
            </button>
            <div className="mt-20 px-4">
              <Cart />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
