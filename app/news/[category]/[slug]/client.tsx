'use client'
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import NewsletterSignup from "@/app/widgets/signup";
import BannerADD from "@/app/widgets/popUp-inside";
import { useEffect, useState } from "react";

interface Article {
  _id: string;
  heading: string;
  slug: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  images: {
    mobile: string;
    desktop: string;
    tab?: string;
    [key: string]: any;
  };
  contentSection1: string;
  contentSection2: string;
  contentSection3: string;
  contentSection4: string;
  contentSection5: string;
  contentSection6: string;
}

interface Advertisement {
  adName: string;
  priority: number;
  images: {
    smallScreenImage: string;
    largeScreenImage: string;
  };
  link: string;
}

export default function NewsDetail({
  article,
  recentArticle,
  nextArticle,
  prevArticle,
  advertisement,
}: {
  article: Article;
  recentArticle: Article[];
  nextArticle?: Article;
  prevArticle?: Article;
  advertisement: Advertisement[];
}) {
    const [imageSrc, setImageSrc] = useState(article.images.desktop);

    useEffect(() => {
        const width = window.innerWidth;

        if (width <= 768) {
            setImageSrc(article.images.mobile);
        } else if (width <= 1024) {
            setImageSrc(article.images.tab || article.images.desktop);
        } else {
            setImageSrc(article.images.desktop);
        }
    }, []);

  return (
    <>
      <BannerADD />

      {/* Article Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <span className="font-small text-gray-600">
          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
          {article.heading}
        </h1>

        <div className="text-sm text-gray-500 mb-4">
          {article.author} | Author
        </div>

        <hr className="border-t border-gray-200 mb-4" />

        <div className="text-black-500 mb-4">
          Updated {format(new Date(article.updatedAt), "PP")}
        </div>

        {/* Responsive Hero Image */}
        <div className="relative h-[100vh] w-full mb-10 overflow-hidden shadow-lg">
            <Image
                src={imageSrc}
                alt={article.heading}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content with Ads */}
        <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed mb-16">
          {Array.from({ length: 6 }).map((_, idx) => {
            const section = article[`contentSection${idx + 1}` as keyof Article];
            const ad = advertisement[idx];

            return (
              <div key={idx} className="mb-12 space-y-6">
                {ad && (
                  <div className="bg-white p-2 border rounded-md shadow text-center">
                    <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">
                      Advertisement
                    </span>
                    <a
                      href={ad.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <img
                        src={
                          ad.images?.largeScreenImage ||
                          ad.images?.smallScreenImage
                        }
                        alt={ad.adName || ""}
                        className="w-full mx-auto max-h-[150px] object-contain"
                      />
                    </a>
                  </div>
                )}
                {typeof section === "string" && section && (
                  <div
                    className="article"
                    dangerouslySetInnerHTML={{ __html: section }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Next & Previous Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-20">
          {prevArticle ? (
            <Link
              href={`/news/${prevArticle.category}/${prevArticle.slug}`}
              className="group flex items-center gap-3 hover:text-blue-800 transition-colors"
            >
              <span className="text-2xl">←</span>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Previous Article
                </p>
                <p className="font-semibold group-hover:underline">
                  {prevArticle.heading.slice(0, 40)}...
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextArticle ? (
            <Link
              href={`/news/${nextArticle.category}/${nextArticle.slug}`}
              className="group flex items-center gap-3 hover:text-blue-800 transition-colors text-right"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Next Article
                </p>
                <p className="font-semibold group-hover:underline">
                  {nextArticle.heading.slice(0, 40)}...
                </p>
              </div>
              <span className="text-2xl">→</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Spacing Block */}
      <div className="h-[20px] bg-gray-50" />

      {/* Recent Articles */}
      {recentArticle.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticle.map((item) => (
              <Link
                key={item._id}
                href={`/news/${item.category}/${item.slug}`}
                className="group bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56">
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={item.images.mobile}
                    />
                    <source
                      media="(min-width: 769px)"
                      srcSet={item.images.desktop}
                    />
                    <Image
                      src={item.images.mobile}
                      alt={item.heading}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </picture>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(item.createdAt), "PP")}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.heading}
                  </h3>
                  <p className="text-blue-600 mt-2 font-medium">
                    Read More →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
