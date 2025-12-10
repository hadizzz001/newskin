'use client';

import { useState, useEffect } from 'react';
import { FaChevronDown, FaEnvelope, FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const [showPolicies, setShowPolicies] = useState(false);
  const [showCustomerCare, setShowCustomerCare] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/category');
        const data = await res.json();
        setServices(data);  // ✅ store the whole array
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);


  return (
    <footer className="bg-[#f8f8f8] text-[#222] py-10 px-4">

      {/* PC FOOTER */}
      <div className="hidden md:block">
        {/* Top Row */}
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm border-b border-[#c5c5c5] pb-8 items-center mt-20">
          <div className="flex flex-col items-center">
            <div className="text-left">
              <p className="mb-3 myfp">Policies</p>
              <ul className="space-y-2">
                <li><a href="/privacy" className="colorp">Privacy Policy</a></li>
                <li><a href="/term" className="colorp">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-left">
              <p className="myfp mb-3">Customer Care</p>
              <ul className="space-y-2">
                <li><a href="/contact" className="colorp">Contact us</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-left">
              <p className="myfp mb-3">Categories</p>
              <ul className="space-y-2">
                {services.length > 0 ? (
                  services.map((item) => (
                    <li key={item._id}>
                      <a href={`/search?cat=${item.name}`} className="colorp  ">
                        {item.name}
                      </a>
                    </li>

                  ))
                ) : (
                  <li className="text-gray-400 italic">Loading...</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <hr id="myhrbar" className="my-6" />

        {/* Social Icons Above Footer Text */}
        <div className="max-w-7xl mx-auto flex justify-center gap-5 text-lg mt-10">
          {/* <a href="mailto:example@example.com"><FaEnvelope className="text-[#333] cursor-pointer" /></a> */}
          <a href="https://wa.me/96181047532"><FaWhatsapp className="text-[#333] cursor-pointer" /></a>
          <a href="https://www.instagram.com/poptical_sunglasses/"><FaInstagram className="text-[#333] cursor-pointer" /></a>
          <a href="https://www.facebook.com/profile.php?id=100095316781172"><FaFacebook className="text-[#333] cursor-pointer" /></a>
        </div>

        {/* Bottom */}
        <div className="text-center mt-10 mb-20">
          <p className="text-sm uppercase">poptical sunwear 2025 ALL RIGHTS RESERVED</p>
        </div>
      </div>

      {/* MOBILE FOOTER */}
      <div id="mymobfoot" className="block md:hidden text-sm space-y-6 mt-20 mb-20">
        {[{
          label: 'Policies',
          isOpen: showPolicies,
          setOpen: setShowPolicies,
          items: [
            { href: '/privacy', text: 'Privacy Policy' },
            { href: '/term', text: 'Terms of Service' },
          ],
        },
        {
          label: 'Customer Care',
          isOpen: showCustomerCare,
          setOpen: setShowCustomerCare,
          items: [
            { href: '/contact', text: 'Contact Us' },
          ],
        },
        {
          label: 'Categories',
          isOpen: showServices,
          setOpen: setShowServices,
          dynamic: true,
        }].map(({ label, isOpen, setOpen, items, dynamic }, index) => (
          <div key={index}>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpen(!isOpen)}
            >
              <p className="myfp">{label}</p>
              <div
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              >
                <FaChevronDown />
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <ul className="mt-2 space-y-2 ">
                {dynamic ? (
                  services.length > 0 ? (
                    services.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`/search?cat=${item.name}`}
                          className="colorp capitalize"
                        >
                          {item.title
                            ?.toLowerCase()
                            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())}
                        </a>

                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 italic">Loading...</li>
                  )
                ) : (
                  items.map((item, i) => (
                    <li key={i}>
                      <a href={item.href} className="colorp">
                        {item.text}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <hr id="myhrbar1" className="my-4" />
          </div>
        ))}

        {/* Social Icons Above Footer Text */}
        <div className="flex flex-wrap justify-center gap-5 text-lg mt-10">
          {/* <a href="mailto:example@example.com"><FaEnvelope className="text-[#333] cursor-pointer" /></a> */}
          <a href="https://wa.me/96181047532"><FaWhatsapp className="text-[#333] cursor-pointer" /></a>
          <a href="https://www.instagram.com/poptical_sunglasses/"><FaInstagram className="text-[#333] cursor-pointer" /></a>
          <a href="https://www.facebook.com/profile.php?id=100095316781172"><FaFacebook className="text-[#333] cursor-pointer" /></a>

        </div>

        {/* Bottom */}
        <div className="text-center mt-10 mb-20">
          <p className="text-sm uppercase">poptical sunwear 2025 ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
