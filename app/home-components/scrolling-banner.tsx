"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { format } from 'date-fns';
import Link from "next/link";

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

export default function ScrollingBanner({ article }: { article: Article }) {

  return (
    <section className="max-w-7xl mx-auto relative bg-[#D84727] text-white overflow-hidden min-h-[500px] items-center justify-center px-8">
      <div className="absolute top-0 left-0 min-w-[200%] text-[175px] font-bold text-black whitespace-nowrap opacity-10 z-0" 
      // animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        LATEST LATEST LATEST LATEST LATEST LATEST
      </div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto py-16">
        <div>
          <Link href={`/news/${article.category}/${article.slug}`}>
            <h2 className="text-3xl md:text-4xl font-semibold leading-snug mb-4">
              {article.heading}
            </h2>
          </Link>
          <hr className="border-white/50 w-60 mb-4" />
          <p className="text-lg leading-relaxed mb-6">
            {article.smallContent}
          </p>
          <div className="flex items-center gap-4 ">
            <Image
              src="/images/author.jpg"
              alt="Author"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">By {article.author}</p>
              <p className="text-sm text-white/80">Published {format(article.createdAt, 'PP')}</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Link href={`/news/${article.category}/${article.slug}`}>
            <Image
              src={article.images.desktop}
              alt={article.heading}
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
