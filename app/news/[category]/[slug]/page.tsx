export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsDetail from './client';
import publicURL from '@/app/constant/domainURL';

interface articlePageProps {
  params: Promise<{ slug: string; category: string} >;
}  

export async function generateMetadata({ params }: articlePageProps): Promise<Metadata> {
  const { category, slug } = await params;  
  if (!slug) {
    return {
      title: "Article Page",
      description: "Browse Articles",
    };
  };  

  const response = await fetch(`${publicURL}/api/article/${category}/${slug}`, { cache: 'no-store' });
  const data = await response.json(); 
  const articleDetails = data.data
  if(articleDetails.length===0) {notFound();}

  return {
    title: articleDetails?.metaTitle,
    description: articleDetails?.metaDescription,
    keywords: articleDetails?.metaKeyword,
    openGraph: {
      title: articleDetails?.metaTitle,
      description: articleDetails?.metaDescription,
      url: `${publicURL}/news/${category}/${slug}`,
      images: [
        {
          url: `${publicURL}/${articleDetails.images.mobile}`,
        },
      ],
      type: "website",
    },
    // twitter: {
    //   title: articleDetails?.metaTitle,
    //   description: articleDetails?.metaDescription,
    //   images: [`${publicURL}/${articleDetails.images.mobile}`],
    //   card: "summary_large_image",
    // },
    alternates: {
      canonical: `${publicURL}/news/${category}/${slug}`,
    },
  };
};

export default async function articleContent({ params }: articlePageProps) {
  const {category, slug } = await params;

  const response = await fetch(`${publicURL}/api/article/${category}/${slug}`, { cache: 'no-store' });
  const data = await response.json(); 
  const article = data.data
  if(article.length===0) {notFound();}

  const response1 = await fetch(`${publicURL}/api/article`, { cache: 'no-store' });
  const data1 = await response1.json(); 
  const article1 = data1.articles

  const currentIndex = article1.findIndex((b :any) => b.slug === slug);
  const prevArticles = article1[currentIndex - 1] || null;
  const nextArticles = article1[currentIndex + 1] || null;

  const recentArticles = article1.filter((res: { trendingArticles: Boolean; }) => res.trendingArticles === true)

  const add = await fetch(`${publicURL}/api/ads/insidePage/inside`, { cache: "no-store" });
  const advertisement = await add.json();

  return <>
  <NewsDetail article={article} 
  recentArticle={recentArticles} 
  nextArticle={nextArticles} prevArticle={prevArticles} advertisement={advertisement.data}/>
  </>;
}