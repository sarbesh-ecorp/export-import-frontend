import { Metadata } from "next";
import TermsAndConditionsPage from "./client";
import publicURL from "../constant/domainURL";

export const metadata: Metadata = {
  title: 'Terms and Conditions | User Agreement and Policies',
  description: 'Read the terms and conditions for using ExportImportNews. Understand our user agreement, policies, disclaimers before accessing our website.',
  keywords: 'terms and conditions, user agreement, website policies, legal terms, content usage, disclaimers, exportimportnews terms, privacy and policy, site terms, exportimportnews',
  alternates: {
    canonical: "https://www.exportimportnews.com/terms-and-conditions",
  },
  openGraph: {
    title: 'Terms and Conditions | User Agreement and Policies',
    description:  'Read the terms and conditions for using ExportImportNews. Understand our user agreement, policies, disclaimers before accessing our website.',
    url: `${publicURL}/terms-and-conditions`,
    images: [
      {
        url: "https://www.exportimportnews.com/images/logo.png"
      },
    ],
    type: "website",
  },
};

export default function TermsConditions() {
    return <TermsAndConditionsPage/>
}