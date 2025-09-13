'use client'
import Link from "next/link";
import Image from "next/image";
import ScrollingBanner from "./scrolling-banner";
import NewsletterSignup from "../widgets/signup";
import { useEffect, useRef, useState } from "react";
import { format } from 'date-fns';

interface Article {
  _id: string;
  heading: string;
  slug: string;
  category: string;
  section: string;
  home_status: boolean;
  latest_status: boolean;
  createdAt: Date;
  priority: number;
  author: string;
  images: {
    mobile: string;
    desktop: string;
    [key: string]: any;
  };
  smallContent: string;
}

interface Section {
  _id: string;
  section: string;
  slug: string;
  priority: number;
}

interface Image {
  adName: string;
  images: {
    smallScreenImage: string;
    largeScreenImage: string;
  };
  link: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [imagesSection, setImagesSection] = useState<Image[]>([]);
  const [imagesBetween, setImagesBetween] = useState<Image[]>([]);
  const [imagesSticky, setImagesSticky] = useState<Image[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesSectionCurrentIndex, setImagesSectionCurrentIndex] = useState(0);
  const [currentBetweenIndex, setCurrentBetweenIndex] = useState(0);
  const [currentStickyIndex, setCurrentStickyIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedSections, setLoadedSections] = useState<string[]>([]);
  const [sectionArticles, setSectionArticles] = useState<Record<string, Article[]>>({});
  const [initialLoaded, setInitialLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Export", "Import", "Travel", "World", "Business", "Technology", "Sports",
    "Entertainment", "Science", "Health", "Politics", "Finance",
    "Indian Custom Duty", "Automobile"
  ];
  // const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // useEffect(() => {
  //   if (loading) {
  //     const interval = setInterval(() => {
  //       setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
  //     }, 100);
  //     return () => clearInterval(interval);
  //   }
  // }, [loading]);

  useEffect(() => {
    fetchSections();
  }, []);

  // useEffect(() => {
  //   fetchSections();
  //   fetchArticles();
  // }, []);

  // const fetchArticles = async () => {
  //   setLoading(true)
  //   try {
  //     const res = await fetch("/api/article", { cache: 'no-store' });
  //     const data = await res.json();
  //     if (res.ok && data.success) {
  //       setArticles(data.articles);
  //     }
  //   } catch (error) {
  //     console.error("Fetch data error:", error);        
  //   } 
  //   setLoading(false)
  // };

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/section", { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.success) {
        setSections(data.section);
      }
    } catch (error) {
      console.error("Fetch data error:", error);        
    } 
  };

   // Fetch top-news and first section articles initially
    useEffect(() => {
    if (sections.length > 0 && !initialLoaded) {
      // Fetch top-news first
      fetchArticlesBySection('top-news').then(() => {
        // Then fetch each section one by one with interval
        let idx = 0;
        const sectionSlugs = sections.map(s => s.slug);
        function fetchNextSection() {
          if (idx < sectionSlugs.length) {
            fetchArticlesBySection(sectionSlugs[idx]);
            setLoadedSections(prev => [...prev, sectionSlugs[idx]]);
            idx++;
            setTimeout(fetchNextSection, 1000); // 1 seconds interval
          }
        }
        fetchNextSection();
      });
      setLoadedSections(['top-news']);
      setInitialLoaded(true);
    }
  }, [sections, initialLoaded]);

  // Fetch articles for a section
  const fetchArticlesBySection = async (sectionSlug: string) => {
    try {
      const res = await fetch(`/api/article/home?section=${sectionSlug}`, { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.success) {
        setSectionArticles(prev => ({ ...prev, [sectionSlug]: data.articles }));
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

  // Lazy load next section on scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Find next unloaded section
        const nextSection = sections
          .map(s => s.slug)
          .find(slug => !loadedSections.includes(slug));
        if (nextSection) {
          fetchArticlesBySection(nextSection);
          setLoadedSections(prev => [...prev, nextSection]);
        }
      }
    }, { root: null, rootMargin: '20px', threshold: 1.0 });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [sections, loadedSections]);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`/api/ads/home/aboveFooter`, { cache: "no-store" });
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
    fetchAd();
  }, []);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`/api/ads/home/afterFirstSection`, { cache: "no-store" });
        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setImagesSection(data.data);
        } else if (data?.success && data.data) {
          setImagesSection([data.data]);
        }
      } catch (err) {
        console.error("Failed to fetch header data:", err);
      }
    };
    fetchAd();
  }, []);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`/api/ads/home/inBetween`, { cache: "no-store" });
        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setImagesBetween(data.data);
        } else if (data?.success && data.data) {
          setImagesBetween([data.data]);
        }
      } catch (err) {
        console.error("Failed to fetch header data:", err);
      }
    };
    fetchAd();
  }, []);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`/api/ads/home/rightSide`, { cache: "no-store" });
        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setImagesSticky(data.data);
        } else if (data?.success && data.data) {
          setImagesSticky([data.data]);
        }
      } catch (err) {
        console.error("Failed to fetch header data:", err);
      }
    };
    fetchAd();
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
  }, [images, imagesSection, imagesBetween, imagesSticky]);  

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  useEffect(() => {
    if (imagesSection.length > 1) {
      const interval = setInterval(() => {
        setImagesSectionCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSection.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [imagesSection]);

  useEffect(() => {
    if (imagesBetween.length > 1) {
      const interval = setInterval(() => {
        setCurrentBetweenIndex((prevIndex) => (prevIndex + 1) % imagesBetween.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [imagesBetween]);

  useEffect(() => {
    if (imagesSticky.length > 1) {
      const interval = setInterval(() => {
        setCurrentStickyIndex((prevIndex) => (prevIndex + 1) % imagesSticky.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [imagesSticky]);
  
  return (
  <>
  {/* {loading && (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black text-white">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-8 border-t-transparent border-blue-500 rounded-full animate-spin" />
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

  <div className="px-6 pt-5 max-w-7xl mx-auto">
    <h1 className="text-3xl font-semibold">Global News</h1>
    <h2 className="italic text-gray-600">Stay Updated with the Latest Export and Import News</h2>
  </div>

  {!sectionArticles['top-news'] && (
  <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-10 max-w-7xl mx-auto">
    <div className="lg:col-span-2 space-y-6">
      {/* Main skeleton */}
      <div className="animate-pulse space-y-4">
        <div className="w-full h-64 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="space-y-8">
      {/* Side skeletons */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4 pb-4">
          <div className="w-[140px] h-[100px] bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </section>
)}
  {sectionArticles['top-news'] &&
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-10 max-w-7xl mx-auto">
      <div className="lg:col-span-2 space-y-6 overflow-hidden group">
        {sectionArticles['top-news']?.filter(
            (data) => data.priority === 1
          ).map((data) => (
          <div key={data._id}>
          <Link href={`/news/${data.category}/${data.slug}`}>
            <div className="relative overflow-hidden">
              <Image
                src={data.images.mobile}
                alt={data.heading}
                width={1200}
                height={800}
                className="transition-transform duration-500 group-hover:scale-105 w-full object-cover h-auto"
              />
            </div>
            <h1 className="text-4xl leading-snug mt-8">
              {data.heading}
            </h1>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-500 text-lg sm:max-w-[70%]">
              {data.smallContent}
            </p>
            <div className="flex items-center space-x-4">
              <Image
              src="/images/author.jpg"
              alt="Michael Brown"
              width={40}
              height={40}
              className="rounded-full"
              />
              <div>
                <p className="font-medium">{data.author}</p>
                <p className="text-gray-500 text-sm">{format(data.createdAt, 'PP')}</p>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
      <div className="space-y-8">
       {sectionArticles['top-news']?.filter(
            (data) => data.priority > 1
          ).slice(0,4).map((data) => (
          <div key={data._id}>
            <div className="flex space-x-4 pb-4 overflow-hidden group">
              <Link href={`/news/${data.category}/${data.slug}`}>
                <div className="w-[140px] h-[100px] overflow-hidden relative">
                  <Image
                    src={data.images.mobile}
                    alt={data.heading}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-col justify-between">
                <Link href={`/news/${data.category}/${data.slug}`} className="font-semibold hover:underline">
                  {data.heading}
                </Link>
                <p className="text-sm text-gray-500">
                  {data.category.charAt(0).toUpperCase() + data.category.slice(1).toLowerCase()} &nbsp; | &nbsp; {format(data.createdAt, 'PP')}
                </p>
              </div>
            </div>
            <hr className="border-t border-gray-200" />
          </div>
        ))}
      </div>
    </section>
  }

  {imagesSection.length > 0 && (
    <div className="max-w-7xl mx-auto w-full bg-white relative flex justify-center py-2 shadow z-40">
      <span className="absolute top-0 left-4 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-white px-2 py-1 rounded-b-md shadow-sm">
        Advertisement
      </span>
      <a
        href={imagesSection[imagesSectionCurrentIndex]?.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-4"
      >
        <img
          src={
            isMobile
              ? imagesSection[imagesSectionCurrentIndex]?.images?.smallScreenImage
              : imagesSection[imagesSectionCurrentIndex]?.images?.largeScreenImage
          }
          alt={imagesSection[imagesSectionCurrentIndex]?.adName || ""}
          className="w-full h-auto max-h-[150px]"
        />
      </a>
    </div>
  )}

  {sections
  .filter((sectionData) => sectionData.priority === 2)
  .map((sectionData) => (
    <section className="max-w-7xl mx-auto px-6 py-12" key={sectionData._id}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">{sectionData.section}</h2>
        <Link
          href={`/section/${sectionData.slug}`}
          className="text-red-600 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* LEFT FEATURED ARTICLE */}
        <div className="md:col-span-2 group">
          {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority === 1
          )
            .map((data) => (
              <div key={data._id} className="space-y-4">
                <Link href={`/news/${data.category}/${data.slug}`}>
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={data.images.mobile}
                      alt={data.heading}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <p className="text-sm text-gray-500">
                  {data.category.charAt(0).toUpperCase() +
                    data.category.slice(1).toLowerCase()}
                  &nbsp; | &nbsp; {format(data.createdAt, "PP")}
                </p>

                <Link href={`/news/${data.category}/${data.slug}`}>
                  <h3 className="text-xl font-semibold leading-snug">
                    {data.heading}
                  </h3>
                </Link>
              </div>
            ))}
        </div>

        {/* RIGHT SMALL ARTICLES */}
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
          {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority > 2
          )
            .slice(0, 4)
            .map((data) => (
              <div key={data._id} className="group space-y-3">
                <Link href={`/news/${data.category}/${data.slug}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={data.images.mobile}
                      alt={data.heading}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <p className="text-sm text-gray-500">
                  {data.category.charAt(0).toUpperCase() +
                    data.category.slice(1).toLowerCase()}
                  &nbsp; | &nbsp; {format(data.createdAt, "PP")}
                </p>

                <Link href={`/news/${data.category}/${data.slug}`}>
                  <h4 className="font-medium">{data.heading}</h4>
                </Link>

                <hr className="border-gray-200" />
              </div>
            ))}
        </div>
      </div>
    </section>
  ))}  

  {Object.values(sectionArticles)
  .flat()
  .filter((article) => article.latest_status === true)
  .map((article) => (
    <ScrollingBanner key={article._id} article={article} />
))}
  
  {sections
  .filter((sectionData) => sectionData.priority === 3)
  .map((sectionData) => (
    <section
      className="max-w-7xl mx-auto px-6 py-16"
      key={sectionData._id}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">{sectionData.section}</h2>
        <Link
          href={`/section/${sectionData.slug}`}
          className="text-red-600 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* ➤ Featured Article */}
      {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority === 1
          )
        .map((data) => (
          <div
            className="grid md:grid-cols-2 gap-10 mb-12 items-center"
            key={data._id}
          >
            <div>
              <Link href={`/news/${data.category}/${data.slug}`}>
                <h3 className="text-2xl font-semibold mb-4">
                  {data.heading}
                </h3>
              </Link>
              <hr className="border-gray-300 mb-4 w-80" />
              <p className="text-gray-600 text-lg">{data.smallContent}</p>
            </div>

            <div className="relative overflow-hidden aspect-[16/9] group">
              <Link href={`/news/${data.category}/${data.slug}`}>
                <Image
                  src={data.images.desktop}
                  alt={data.heading}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>
        ))}

      {/* ➤ Additional Articles */}
      <div className="grid md:grid-cols-3 gap-8">
        {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority > 1
          )
          .slice(0, 4)
          .map((data) => (
            <div key={data._id} className="group space-y-2">
              <div className="relative overflow-hidden aspect-[4/3]">
                <Link href={`/news/${data.category}/${data.slug}`}>
                  <Image
                    src={data.images.mobile}
                    alt={data.heading}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>

              <div className="text-sm text-gray-500">
                {data.category.charAt(0).toUpperCase() +
                  data.category.slice(1).toLowerCase()}{" "}
                <span className="mx-1">|</span>{" "}
                {format(data.createdAt, "PP")}
              </div>

              <Link href={`/news/${data.category}/${data.slug}`}>
                <h4 className="text-lg font-medium">{data.heading}</h4>
              </Link>
            </div>
          ))}
      </div>
    </section>
  ))}

  {sections
  .filter((sectionData) => sectionData.priority === 4)
  .map((sectionData) => (
    <section
      className="max-w-7xl mx-auto px-6 py-16"
      key={sectionData._id}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">
          {sectionData.section}
        </h2>
        <Link
          href={`/section/${sectionData.slug}`}
          className="text-red-500 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority > 0
          )
          .slice(0, 3)
          .map((data) => (
            <div
              key={data._id}
              className="relative group overflow-hidden"
            >
              <Link href={`/news/${data.category}/${data.slug}`}>
                <Image
                  src={data.images.mobile}
                  alt={data.heading}
                  width={500}
                  height={320}
                  className="transition-transform duration-500 group-hover:scale-105 w-full h-64 object-cover"
                />
              </Link>
              <div className="mt-3">
                <div className="text-sm text-gray-500">
                  {data.author}
                  <span className="mx-1">|</span>
                  {format(data.createdAt, "PP")}
                </div>
                <Link href={`/news/${data.category}/${data.slug}`}>
                  <h3 className="text-lg font-medium mt-1">
                    {data.heading}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  ))}

  {sections
        .filter((sectionData) => sectionData.priority === 5)
        .map((sectionData) => (
          <section
            className="max-w-7xl mx-auto px-6 py-16"
            key={sectionData._id}
          >
            <h2 className="text-3xl font-semibold mb-12">
              {sectionData.section}
            </h2>
            <div className="space-y-12">
              {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority > 0
          )
                .slice(0, 3)
                .map((data, index, arr) => (
                  <div key={data._id}>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                      {/* Content Block */}
                      <div className="md:w-2/5">
                        <div className="text-sm text-gray-500 mb-2">
                          {data.category.charAt(0).toUpperCase() +
                            data.category.slice(1).toLowerCase()}{" "}
                          | {format(new Date(data.createdAt), "PP")}
                        </div>
                        <h3 className="text-xl font-medium mb-2">
                          {data.heading}
                        </h3>
                        <Link
                          href={`/news/${data.category}/${data.slug}`}
                          className="text-red-500 text-sm font-medium hover:underline"
                        >
                          Read More →
                        </Link>
                      </div>

                      {/* Image Block */}
                      <div className="md:w-2/4 overflow-hidden group shadow-sm">
                        <Link href={`/news/${data.category}/${data.slug}`}>
                          <Image
                            src={data.images.mobile}
                            alt={data.heading}
                            width={600}
                            height={350}
                            className="transition-transform duration-500 group-hover:scale-105 w-full h-72 object-cover"
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Divider (not after last item) */}
                    {index !== arr.length - 1 && (
                      <hr className="mt-10 border-gray-200" />
                    )}
                  </div>
                ))}
            </div>
          </section>
        ))}

  {imagesBetween.length > 0 && (
    <div className="max-w-7xl mx-auto w-full bg-white relative flex justify-center py-2 shadow z-40">
      <span className="absolute top-0 left-4 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-white px-2 py-1 rounded-b-md shadow-sm">
        Advertisement
      </span>
      <a
        href={imagesBetween[currentBetweenIndex]?.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-4"
      >
        <img
          src={
            isMobile
              ? imagesBetween[currentBetweenIndex]?.images?.smallScreenImage
              : imagesBetween[currentBetweenIndex]?.images?.largeScreenImage
          }
          alt={imagesBetween[currentBetweenIndex]?.adName || ""}
          className="w-full h-auto max-h-[150px]"
        />
      </a>
    </div>
  )}

  <NewsletterSignup/>
  <div className="h-[20px] bg-gray-50"></div>

  {sections
  .filter((sectionData) => sectionData.priority === 6)
  .map((sectionData) => (
    <section className="max-w-7xl mx-auto px-6 py-16" key={sectionData._id}>
      {/* Section Heading and View All Link */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          {sectionData.section}
        </h2>
        <Link
          href={`/section/${sectionData.slug}`}
          className="text-red-600 text-sm md:text-base font-medium hover:underline flex items-center gap-1"
        >
          View All <span className="text-lg">→</span>
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
       {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority > 0
          )
          .slice(0, 4)
          .map((data, index) => (
            <div
              key={data._id}
              className="group overflow-hidden shadow hover:shadow-xl transition duration-300"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden">
                <Link href={`/news/${data.category}/${data.slug}`}>
                  <img
                    src={data.images.mobile}
                    alt={data.heading}
                    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs text-gray-200 mb-1 tracking-wide uppercase">
                    {data.category.charAt(0).toUpperCase() + data.category.slice(1).toLowerCase()} &nbsp;|&nbsp;{' '}
                    {format(data.createdAt, 'PP')}
                  </div>
                  <Link href={`/news/${data.category}/${data.slug}`}>
                    <h3 className="text-lg font-semibold leading-tight">
                      {data.heading}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  ))}

  {sections.filter((sectionData) => ![1, 2, 3, 4, 5, 6].includes(sectionData.priority)).map((sectionData) => (
    <section className="max-w-7xl mx-auto px-6 py-16" key={sectionData._id}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">{sectionData.section}</h2>
        <Link href={`/section/${sectionData.slug}`} className="text-red-600 font-medium hover:underline">
          View All →
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {sectionArticles[sectionData.slug]?.filter(
            (data) => data.priority > 1
          ).slice(0,3).map((data) => (
          <div key={data._id} className="overflow-hidden group">
            <Link href={`/news/${data.category}/${data.slug}`}>
              <Image
              src={data.images.mobile}
              alt={data.heading}
              width={400}
              height={300}
              className="transition-transform duration-500 group-hover:scale-105 w-full object-cover"
              />
            </Link>
            <div className="text-sm text-gray-500 mt-2">
              {data.category.charAt(0).toUpperCase() + data.category.slice(1).toLowerCase()} <span className="mx-1">|</span> {format(data.createdAt, 'PP')}
            </div>
            <Link href={`/news/${data.category}/${data.slug}`}>
              <h4 className="text-lg font-medium mt-1">{data.heading}</h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  ))}

    {loadedSections.length < sections.length && (
      <div ref={loaderRef} className="h-10 flex items-center justify-center">
        <span>Loading more...</span>
      </div>
    )}


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

  {imagesSticky.length > 0 && (
    <div className="hidden lg:block fixed top-1/2 right-4 -translate-y-1/2 w-[300px] z-50 bg-white shadow-lg rounded-md overflow-hidden border">
      <span className="block text-center text-xs font-semibold text-gray-500 uppercase tracking-wide bg-white px-2 py-1 border-b">
        Advertisement
      </span>
      <a
        href={imagesSticky[currentStickyIndex]?.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <img
          src={
            isMobile
              ? imagesSticky[currentStickyIndex]?.images?.smallScreenImage
              : imagesSticky[currentStickyIndex]?.images?.largeScreenImage
          }
          alt={imagesSticky[currentStickyIndex]?.adName || ""}
          className="w-full h-auto max-h-[600px]"
        />
      </a>
    </div>
  )}

  </>
  );
}
