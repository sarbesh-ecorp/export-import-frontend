// 'use client'
// import Image from "next/image";
// import Link from "next/link";
// import { format } from "date-fns";
// import NewsletterSignup from "../../widgets/signup";

// interface Category {
//   _id: string;
//   category: string;
//   slug: string;
//   priority: string;
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

// export default function CategoryPage({
//   categoryData,
//   articlesData,
// }: {
//   categoryData: Category;
//   articlesData: Article[];
// }) {
//   const [featured, ...restArticles] = articlesData;

//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         {/* Category Heading */}
//         <div className="mb-10">
//           <h1 className="text-4xl md:text-5xl font-semibold capitalize">{categoryData.category}</h1>
//         </div>

//         {/* Featured Article */}
//         {featured && (
//           <div className="grid md:grid-cols-2 gap-10 mb-16 items-center group overflow-hidden">
//             <div>
//               <Link href={`/news/${featured.category}/${featured.slug}`}>
//                 <h2 className="text-2xl md:text-3xl font-bold mb-4 transition-all duration-300">
//                   {featured.heading}
//                 </h2>
//               </Link>
//               <hr className="border-t border-gray-200 mb-4" />
//               <p className="text-gray-600 text-lg">{featured.smallContent}</p>
//               <div className="flex items-center mt-6 space-x-4">
//                 <Image
//                   src="/images/author.jpg"
//                   alt={featured.author}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                 />
//                 <div>
//                   <p className="font-medium">{featured.author}</p>
//                   <p className="text-sm text-gray-500">{format(new Date(featured.createdAt), "PP")}</p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <Link href={`/news/${featured.category}/${featured.slug}`}>
//                 <Image
//                   src={featured.images.desktop || featured.images.mobile}
//                   alt={featured.heading}
//                   width={800}
//                   height={500}
//                   className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </Link>
//             </div>
//           </div>
//         )}

//         {/* Other Articles Grid */}
//         <div className="grid md:grid-cols-3 gap-10">
//           {restArticles.map((data) => (
//             <div key={data._id} className="group">
//               <Link href={`/news/${data.category}/${data.slug}`}>
//                 <Image
//                   src={data.images.mobile}
//                   alt={data.heading}
//                   width={400}
//                   height={250}
//                   className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               </Link>
//               <div className="text-sm text-gray-500 mt-2">
//                 {format(new Date(data.createdAt), "PPP")} <span className="mx-1">|</span> {data.author}
//               </div>
//               <Link href={`/news/${data.category}/${data.slug}`} className="block mt-2">
//                 <h4 className="text-lg font-semibold hover:underline line-clamp-2">{data.heading}</h4>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Newsletter Section */}
//       <NewsletterSignup />

//       {/* Padding below */}
//       <div className="h-[20px] bg-gray-50"></div>
//     </>
//   );
// }

'use client'
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import NewsletterSignup from "../../widgets/signup";
import { useState, useEffect } from "react";

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

export default function CategoryPage({
  categoryData,
}: {
  categoryData: Category;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // Fetch 4 articles at a time
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const res = await fetch(`/api/article/cat/${categoryData.slug}?skip=${page * 4}&limit=4`);
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
  }, [page, categoryData.slug]);

  // Skeleton loader for 4 articles
 const Skeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-16">
    <div className="mb-10 flex justify-center">
      <div className="h-12 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-full animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
        >
          <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-6"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6 mb-3"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 mb-6"></div>
          <div className="flex items-center space-x-4 mt-auto">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
            <div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-14"></div>
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
        {/* Category Heading */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold capitalize">{categoryData.category}</h1>
        </div>

        {/* Featured Article */}
        {featured && (
          <div className="grid md:grid-cols-2 gap-10 mb-16 items-center group overflow-hidden">
            <div>
              <Link href={`/news/${featured.category}/${featured.slug}`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 transition-all duration-300">
                  {featured.heading}
                </h2>
              </Link>
              <hr className="border-t border-gray-200 mb-4" />
              <p className="text-gray-600 text-lg">{featured.smallContent}</p>
              <div className="flex items-center mt-6 space-x-4">
                <Image
                  src="/images/author.jpg"
                  alt={featured.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{featured.author}</p>
                  <p className="text-sm text-gray-500">{format(new Date(featured.createdAt), "PP")}</p>
                </div>
              </div>
            </div>
            <div>
              <Link href={`/news/${featured.category}/${featured.slug}`}>
                <Image
                  src={featured.images.desktop || featured.images.mobile}
                  alt={featured.heading}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>
        )}

        {/* Other Articles Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {articles.map((data) => (
            <div key={data._id} className="group">
              <Link href={`/news/${data.category}/${data.slug}`}>
                <Image
                  src={data.images.mobile}
                  alt={data.heading}
                  width={400}
                  height={250}
                  className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="text-sm text-gray-500 mt-2">
                {format(new Date(data.createdAt), "PPP")} <span className="mx-1">|</span> {data.author}
              </div>
              <Link href={`/news/${data.category}/${data.slug}`} className="block mt-2">
                <h4 className="text-lg font-semibold hover:underline line-clamp-2">{data.heading}</h4>
              </Link>
            </div>
          ))}
          
        </div>
        {loading && <Skeleton />}
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

      {/* Newsletter Section */}
      <NewsletterSignup />

      {/* Padding below */}
      <div className="h-[20px] bg-gray-50"></div>
    </>
  );
}