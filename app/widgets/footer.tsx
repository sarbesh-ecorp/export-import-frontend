"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="w-full bg-[#1a1a1a] text-white px-8 lg:px-[100px]  pb-6"> 
        {/* //pt-16 */}
        {/* <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="lg:w-2/3">
            <Link href="/" className="text-primary text-3xl font-['Pacifico'] tracking-wider">
              ExportImportNews
            </Link>
            <p className="text-xl text-white mb-6 max-w-xl">
              Your trusted source for comprehensive tax and legal news, updates, and expert analysis. Keeping professionals informed since 2000.
            </p>
            <div className="flex flex-row gap-4">
              <img src="/images/footer1.jpg" className="w-[160px] h-[120px] object-cover" />
              <img src="/images/footer2.jpg" className="w-[160px] h-[120px] object-cover" />
            </div>
          </div>
          <div className="lg:w-1/3 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-gray-400 text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white">
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="#">News</Link></li>
                <li><Link href="#">Authors</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm font-semibold mb-4">Contact Us</h4>
              <p className="text-white mb-1">hello@exportimportnews.com</p>
              <p className="text-white mb-4">+1 (406) 555-0120</p>
              <hr className="border-gray-700 my-4" />
              <h4 className="text-gray-400 text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <Link href="#" className="w-10 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center hover:bg-[#444] transition">
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link href="#" className="w-10 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center hover:bg-[#444] transition">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
                <Link href="#" className="w-10 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center hover:bg-[#444] transition">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link href="#" className="w-10 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center hover:bg-[#444] transition">
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 ExportImportNews</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <Link href='/terms-and-conditions'>Terms & Conditions</Link>
            <Link href='/privacy-policy'>Privacy Policy</Link>
          </div>
        </div>
      </footer>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2c2c2c] text-white rounded-full shadow-lg hover:bg-[#444] transition-all duration-300 animate-bounce z-50 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
}
