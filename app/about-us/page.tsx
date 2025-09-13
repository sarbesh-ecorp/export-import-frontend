import { Metadata } from "next";
import AboutPage from "./client";
import publicURL from "../constant/domainURL";

export const metadata: Metadata = {
  title: 'About Us | Export Import News | Indian & Global Trade News',
  description: 'Learn about ExportImportNews, a trusted platform delivering the latest news, insights, and resources on international trade, export-import policies.',
  keywords: 'about exportImportNews, export import news platform, global trade news, international business news, trade policy news, logistics news, export-import analysis news, global market trends news, about global trade nes website',
  alternates: {
    canonical: "https://www.exportimportnews.com/about-us",
  },
  openGraph: {
    title: 'About Us | Export Import News | Indian & Global Trade News',
    description:  'Learn about ExportImportNews, a trusted platform delivering the latest news, insights, and resources on international trade, export-import policies.',
    url: `${publicURL}/about-us`,
    images: [
      {
        url: "https://www.exportimportnews.com/images/logo.png"
      },
    ],
    type: "website",
  },
};

export default function About() {
    return <AboutPage/>
}