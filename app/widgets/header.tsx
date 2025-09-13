'use client';

import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthDrawer from './login';
import MobileMenu from './mobileMenu';
import Cookies from 'js-cookie';
import publicURL from '../constant/domainURL';

interface Category {
  _id: string;
  category: string;
  slug: string;
  priority: string;
}

interface Article {
  _id: string;
  heading: string;
  slug: string;
  category: string;
}

interface Image {
  adName: string;
  images: {
    smallScreenImage: string;
    largeScreenImage: string;
  };
  link: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setOpenMenu] = useState(false);
  const [category, setData] = useState<Category[]>([]);
  const [article, setArticle] = useState<Article[]>([]);
  const [suggestions, setSuggestions] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesBelowHeader, setBelowImages] = useState<Image[]>([]);
  const [currentIndexBelow, setBelowCurrentIndex] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('/api/category/header', { cache: 'no-store' });
        const data = await res.json();
        setData(data.categories);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
      setLoadingCategories(false);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchArticles = async () => {
        try {
          const res = await fetch('/api/article', { cache: 'no-store' });
          const data = await res.json(); 
          setArticle(data.articles);
        } catch (error) {
          console.error("Failed to fetch articles:", error);
        }
      };
      fetchArticles();
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      if (!value.trim() || !Array.isArray(article)) {
        setSuggestions([]);
        return;
      }
      const filtered = article.filter(a =>
        a.heading.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }, 300);
    setTimeoutId(newTimeout);
  };

  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedName = Cookies.get('name');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  useEffect(() => {
    const fetchHeaderAd = async () => {
      try {
        const response = await fetch(`/api/ads/home/header`, { cache: "no-store" });
        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setImages(data.data);
        } else if (data?.success && data.data) {
          setImages([data.data]);
        }
      } catch (err) {
        console.error("Failed to fetch header data:", err);
      }
    };
    fetchHeaderAd();
  }, []);

  useEffect(() => {
    const fetchHeaderAd = async () => {
      try {
        const response = await fetch(`/api/ads/home/belowHeader`, { cache: "no-store" });
        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setBelowImages(data.data);
        } else if (data?.success && data.data) {
          setBelowImages([data.data]);
        }
      } catch (err) {
        console.error("Failed to fetch header data:", err);
      }
    };
    fetchHeaderAd();
  }, []);

  useEffect(() => {
    const updateScreenType = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateScreenType();
    window.addEventListener("resize", updateScreenType);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", updateScreenType);
    };
  }, [imagesBelowHeader, images]);  

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  useEffect(() => {
    if (imagesBelowHeader.length > 1) {
      const interval = setInterval(() => {
        setBelowCurrentIndex((prevIndex) => (prevIndex + 1) % imagesBelowHeader.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [imagesBelowHeader]);


  return (
    <>
      <header className={`max-w-7xl mx-auto flex flex-row-reverse md:flex-row items-center justify-between px-4 md:px-8 text-black sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg top-4 rounded-xl backdrop-blur-md' : 'py-4'}`}>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer md:hidden" onClick={() => setOpenMenu(true)} />
          <div className="relative hidden md:flex items-center border px-3 py-2 rounded-md w-[180px] bg-white z-50">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search News"
              className="w-full bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md text-sm z-50">
              {suggestions.map((s) => (
                <li
                  key={s._id}
                  onClick={() => {
                    setQuery('');
                    setSuggestions([]);
                    window.location.href = `/news/${s.category}/${s.slug}`;
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {s.heading}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link href="/" className="text-primary text-3xl font-['Pacifico'] tracking-wider flex-grow lg:text-center sm:text-left">
          ExportImportNews
        </Link>
        <div className="hidden md:flex items-center gap-4">
         {username ? (
            <span className="text-sm text-gray-700">Welcome, {username}</span>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm"
            >
              Login
            </button>
          )}
          <button
            onClick={() => {
              const el = document.getElementById("subscribe");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm"
          >
            Subscribe
          </button>
        </div>
      </header>
      {images.length > 0 && (
        <div className="max-w-7xl mx-auto w-full bg-white relative flex justify-center py-2 shadow z-40">
          <span className="absolute top-0 left-4 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-white px-2 py-1 rounded-b-md shadow-sm">
            Advertisement
          </span>
          <a
            href={images[currentIndex]?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4"
          >
            <img
              src={
                isMobile
                  ? images[currentIndex]?.images?.smallScreenImage
                  : images[currentIndex]?.images?.largeScreenImage
              }
              alt={images[currentIndex]?.adName || ""}
              className="w-full h-auto max-h-[150px]"
            />
          </a>
        </div>
      )}
      <hr className="border-t border-gray-300" />
      <nav className="flex overflow-x-auto whitespace-nowrap scrollbar-hide items-center justify-start px-8 py-4 text-black w-full lg:justify-center">
        <ul className="flex justify-center space-x-8 text-sm font-medium text-gray-800">
          <li><Link href='/'>Home</Link></li>
          {loadingCategories && (
            <div className="hidden lg:flex space-x-8">
              {[...Array(10)].map((_, i) => (
                <li key={i} className="animate-pulse bg-gray-200 rounded h-6 w-20"></li>
              ))}
            </div>
          )}
          {!loadingCategories && (
            <>
              {category.map((cat) => (
                <li key={cat._id}>
                  <Link href={`/news-categories/${cat.slug}`}>{cat.category}</Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
      <hr className="hidden md:block border-t border-gray-300 lg:block border-t border-gray-300" />
      {imagesBelowHeader.length > 0 && (
        <div className="max-w-7xl mx-auto w-full bg-white relative flex justify-center py-2 shadow z-40">
          <span className="absolute top-0 left-4 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-white px-2 py-1 rounded-b-md shadow-sm">
            Advertisement
          </span>
          <a
            href={imagesBelowHeader[currentIndexBelow]?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4"
          >
            <img
              src={
                isMobile
                  ? imagesBelowHeader[currentIndexBelow]?.images?.smallScreenImage
                  : imagesBelowHeader[currentIndexBelow]?.images?.largeScreenImage
              }
              alt={imagesBelowHeader[currentIndexBelow]?.adName || ""}
              className="w-full h-auto max-h-[150px]"
            />
          </a>
        </div>
      )}
      <MobileMenu open={menu} onClose={() => setOpenMenu(false)}/>
      <AuthDrawer open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
