// import Image from "next/image";
// import Link from "next/link";
// import { format } from 'date-fns';
// import NewsletterSignup from "@/app/widgets/signup";

// interface Section {
//   _id: string;
//   section: string;
//   slug: string;
//   priority: number;
// }

// interface Article {
//   _id: string;
//   heading: string;
//   slug: string;
//   category: string;
//   section: string;
//   home_status: boolean;
//   latest_status: boolean;
//   createdAt: Date;
//   priority: number;
//   author: string;
//   images: {
//     mobile: string;
//     desktop: string;
//     [key: string]: any;
//   };
//   smallContent: string;
// }

// export default function SectionPage({ sectionData, articlesData }: { sectionData: Section, articlesData: Article[] }) {
//   const [featured, ...restArticles] = articlesData;

//   return (
//     <>
//     <div className="max-w-7xl mx-auto px-4 py-16">
//       <div className="mb-10">
//         <h1 className="text-5xl font-semibold">{sectionData.section}</h1>
//       </div>
//       {featured && (
//         <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
//           <div>
//             <Link href={`/news/${featured.category}/${featured.slug}`}>
//                 <h2 className="text-2xl md:text-3xl font-bold mb-4">{featured.heading}</h2>
//             </Link>
//             <hr className="border-t border-gray-200 mb-4" />
//             <p className="text-gray-600 mb-4">{featured.smallContent}</p>           
//           </div>
//           <div>
//             <Link href={`/news/${featured.category}/${featured.slug}`}>
//                 <Image
//                 src={featured.images.desktop || featured.images.mobile}
//                 alt={featured.heading}
//                 width={800}
//                 height={500}
//                 className="w-full h-[90%] object-cover"
//                 />
//             </Link>
//           </div>
//         </div>
//       )}
//       <div className="grid md:grid-cols-3 gap-10">
//         {restArticles.map((data) => (
//           <div key={data._id}>
//             <Link href={`/news/${data.category}/${data.slug}`}>
//                 <Image
//                 src={data.images.mobile}
//                 alt={data.heading}
//                 width={400}
//                 height={250}
//                 className="w-full h-[70%] object-cover"
//                 />
//             </Link>
//             <div className="text-sm text-gray-500 mt-2">
//               {format(new Date(data.createdAt), 'PPP')} <span className="mx-1">|</span> {data.author}
//             </div>
//             <Link href={`/news/${data.category}/${data.slug}`} className="block mt-2">
//               <h4 className="text-lg font-semibold hover:underline">{data.heading}</h4>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//     <NewsletterSignup/>
//     <div className="h-[20px] bg-gray-50"></div>
//     </>
//   );
// }

'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';
import NewsletterSignup from "@/app/widgets/signup";

interface Section {
  _id: string;
  section: string;
  slug: string;
  priority: number;
}

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

export default function SectionPage({ sectionData }: { sectionData: Section }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // Fetch 4 articles at a time
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const res = await fetch(`/api/article/sec/${sectionData.slug}?skip=${page * 4}&limit=4`);
      const data = await res.json();
      if (data.data.length < 4) setHasMore(false);
      if (page === 0 && data.data.length > 0) {
        setFeatured(data.data[0]);
        setArticles(data.data.slice(1));
      } else {
        setArticles(prev => [...prev, ...data.data]);
      }
      setLoading(false);
    };
    fetchArticles();
  }, [page, sectionData.slug]);

  // Skeleton loader for 4 articles
  const Skeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-16">
  {/* Title Placeholder */}
  <div className="mb-12">
    <div className="h-8 w-1/4 bg-gray-200 rounded-full animate-pulse mx-auto sm:mx-0"></div>
  </div>

  {/* Grid Skeleton Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm animate-pulse flex flex-col space-y-4"
      >
        {/* Image Placeholder */}
        <div className="w-full h-44 bg-gray-200 rounded-lg" />

        {/* Title Lines */}
        <div className="h-5 w-3/4 bg-gray-200 rounded-md" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-md" />

        {/* Author + Meta Info */}
        <div className="flex items-center space-x-3 mt-auto pt-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="space-y-1">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold">{sectionData.section}</h1>
        </div>
        {featured && (
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <div>
              <Link href={`/news/${featured.category}/${featured.slug}`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{featured.heading}</h2>
              </Link>
              <hr className="border-t border-gray-200 mb-4" />
              <p className="text-gray-600 mb-4">{featured.smallContent}</p>
            </div>
            <div>
              <Link href={`/news/${featured.category}/${featured.slug}`}>
                <Image
                  src={featured.images.desktop || featured.images.mobile}
                  alt={featured.heading}
                  width={800}
                  height={500}
                  className="w-full h-[90%] object-cover"
                />
              </Link>
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-10">
          {articles.map((data) => (
            <div key={data._id}>
              <Link href={`/news/${data.category}/${data.slug}`}>
                <Image
                  src={data.images.mobile}
                  alt={data.heading}
                  width={400}
                  height={250}
                  className="w-full h-[70%] object-cover"
                />
              </Link>
              <div className="text-sm text-gray-500 mt-2">
                {format(new Date(data.createdAt), 'PPP')} <span className="mx-1">|</span> {data.author}
              </div>
              <Link href={`/news/${data.category}/${data.slug}`} className="block mt-2">
                <h4 className="text-lg font-semibold hover:underline">{data.heading}</h4>
              </Link>
            </div>
          ))}
          {loading && <Skeleton />}
        </div>
        {hasMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={() => setPage(page + 1)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <NewsletterSignup />
      <div className="h-[20px] bg-gray-50"></div>
    </>
  );
}