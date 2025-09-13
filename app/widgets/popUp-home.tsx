"use client";
import { useEffect, useState } from "react";
import publicURL from "../constant/domainURL";

interface Image {
  adName: string;
  images: {
    smallScreenImage: string;
    largeScreenImage: string;
  };
  link: string;
}

export default function BannerADD() {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // const categories = [
  //   "Export", "Import", "Travel", "World", "Business", "Technology", "Sports",
  //   "Entertainment", "Science", "Health", "Politics", "Finance",
  //   "Indian Custom Duty", "Automobile"
  // ];
  // const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/ads/popup`, { cache: "no-store" });
        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setImages(data.data);
        } else if (data?.success && data.data) {
          setImages([data.data]);
        }
      } catch (err) {
        console.error("Failed to fetch header data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateScreenType = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateScreenType();
    window.addEventListener("resize", updateScreenType);

    if (!loading && images.length > 0) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", updateScreenType);
    };
  }, [loading, images]);

  // useEffect(() => {
  //   if (loading) {
  //     const interval = setInterval(() => {
  //       setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
  //     }, 100);
  //     return () => clearInterval(interval);
  //   }
  // }, [loading]);

  const handleCloseModal = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowModal(false);
      document.body.style.overflow = "";
    }
  };

  return (
    <>
      {/* {loading && (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black text-white">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center text-sm font-bold">
              <span className="text-white">exportimportnews.com</span>
            </div>
          </div>
          <div className="text-2xl md:text-4xl font-semibold fade-category-text">
            {categories[currentCategoryIndex]}
          </div>

          <style jsx>{`
            .fade-category-text {
              animation: fadeInOut 1.2s ease-in-out infinite;
            }
            @keyframes fadeInOut {
              0%, 100% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )} */}

      {!loading && showModal && images.length > 0 && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
          <div className="relative w-full max-w-md bg-white rounded-lg overflow-hidden shadow-xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
            <div className="p-4">
              <a href={images[currentIndex]?.link || "#"} target="_blank" rel="noopener noreferrer">
                <img
                  src={
                    isMobile
                      ? images[currentIndex]?.images?.smallScreenImage
                      : images[currentIndex]?.images?.largeScreenImage
                  }
                  alt={`${images[currentIndex]?.adName}`}
                  className="w-full h-auto max-h-[70vh] object-contain rounded"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
