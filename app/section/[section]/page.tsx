export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import publicURL from '@/app/constant/domainURL';
import SectionPage from './client';

interface sectionPageProps {
  params: Promise<{section: string} >;
}  

export async function generateMetadata({ params }: sectionPageProps): Promise<Metadata> {
  const { section } = await params;  
  if (!section) {
    return {
      title: "Section Page",
      description: "Browse Section",
    };
  };  

  const response = await fetch(`${publicURL}/api/section/${section}`, { cache: 'no-store' });
  const data = await response.json(); 
  const sectionDetails = data.data
  if(sectionDetails.length===0) {notFound();}

  return {
    title: sectionDetails?.metaTitle,
    description: sectionDetails?.metaDescription,
    keywords: sectionDetails?.metaKeyword,
    openGraph: {
      title: sectionDetails?.metaTitle,
      description: sectionDetails?.metaDescription,
      url: `${publicURL}/section/${section}`,
      images: [
        {
          url: `${publicURL}/fgfgf`,
        },
      ],
      type: "website",
    },
    // twitter: {
    //   title: sectionDetails?.metaTitle,
    //   description: sectionDetails?.metaDescription,
    //   images: [`${publicURL}/fgfgf`,],
    //   card: "summary_large_image",
    // },
    alternates: {
      canonical: `${publicURL}/section/${section}`,
    },
  };
};

export default async function sectionContent({ params }: sectionPageProps) {
  const {section } = await params;

  const response = await fetch(`${publicURL}/api/section/${section}`, { cache: 'no-store' });
  const data = await response.json(); 
  const sectionData = data.data
  if(sectionData.length===0) {notFound();}
  // const articles = await fetch(`${publicURL}/api/article/sec/${section}`, { cache: 'no-store' });
  // const articlesD = await articles.json(); 
  // const articlesData = articlesD.data

  return <>
  <SectionPage sectionData={sectionData}/>
  </>;
}