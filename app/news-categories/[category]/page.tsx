export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import publicURL from '@/app/constant/domainURL';
import CategoryPage from './client';

interface categoryPageProps {
  params: Promise<{category: string} >;
}  

export async function generateMetadata({ params }: categoryPageProps): Promise<Metadata> {
  const { category } = await params;  
  if (!category) {
    return {
      title: "Category Page",
      description: "Browse Category",
    };
  };  

  const response = await fetch(`${publicURL}/api/category/${category}`, { cache: 'no-store' });
  const data = await response.json(); 
  const categoryDetails = data.data
  if(categoryDetails.length===0) {notFound();}

  return {
    title: categoryDetails?.metaTitle,
    description: categoryDetails?.metaDescription,
    keywords: categoryDetails?.metaKeyword,
    openGraph: {
      title: categoryDetails?.metaTitle,
      description: categoryDetails?.metaDescription,
      url: `${publicURL}/news-categories/${category}`,
      images: [
        {
          url: `${publicURL}/fgfgf`,
        },
      ],
      type: "website",
    },
    // twitter: {
    //   title: categoryDetails?.metaTitle,
    //   description: categoryDetails?.metaDescription,
    //   images: [`${publicURL}/fgfgf`,],
    //   card: "summary_large_image",
    // },
    alternates: {
      canonical: `${publicURL}/news-categories/${category}`,
    },
  };
};

export default async function categoryContent({ params }: categoryPageProps) {
  const {category } = await params;

  const response = await fetch(`${publicURL}/api/category/${category}`, { cache: 'no-store' });
  const data = await response.json(); 
  const categoryData = data.data
  if(categoryData.length===0) {notFound();}
  // const articles = await fetch(`${publicURL}/api/article/cat/${category}`, { cache: 'no-store' });
  // const articlesD = await articles.json(); 
  // const articlesData = articlesD.data

  return <>
  <CategoryPage categoryData={categoryData}/>
  </>;
}