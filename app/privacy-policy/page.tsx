import { Metadata } from "next";
import PrivacyPolicyPage from "./client";
import publicURL from "../constant/domainURL";

export const metadata: Metadata = {
  title: 'Export Import News | Privacy Policy | Data Protection',
  description: 'Learn how ExportImportNews.com collects, uses, and protects your data. We prioritize your privacy and ensure transparency in all our practices.',
  keywords: 'privacy policy, data protection, user privacy, personal information security, data usage policy, cookies policy, exportimportnews privacy, GDPR compliance, online data safety, website privacy terms',
  alternates: {
    canonical: "https://www.exportimportnews.com/privacy-policy",
  },
  openGraph: {
    title: 'Export Import News | Privacy Policy | Data Protection',
    description: 'Learn how ExportImportNews.com collects, uses, and protects your data. We prioritize your privacy and ensure transparency in all our practices.',
    url: `${publicURL}/privacy-policy`,
    images: [
      {
        url: "https://www.exportimportnews.com/images/logo.png"
      },
    ],
    type: "website",
  },
};

export default function PrivacyPolicy() {
    return <PrivacyPolicyPage/>
}