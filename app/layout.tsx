import type { Metadata } from "next";
import "./globals.css";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import PageTracker from "./PageTracker";
import Script from "next/script";
import BannerADD from "./widgets/popUp-home";

export const metadata: Metadata = {
  title: "Export Import News | India Latest News Today, Breaking News",
  description: "Breaking News in India: Export Import News offers Latest News in Business, Sports, Entertainment, Politics, Finance, Travel News. Trending News.",
  keywords: "export import news, news, latest news, breaking news, live news, entertainment news, politics news, global news, world news today, science news, travel news, indian custom duty news, latest business news, india news, news online, news headlines, news today, top stories, online news",
  // applicationName: "Export Import News",
  authors: [{ name: "Export Import News", url: "https://www.exportimportnews.com/" }],
  creator: "https://www.exportimportnews.com/",
  publisher: "Export Import News",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  metadataBase: new URL("https://www.exportimportnews.com"),
  alternates: {
    canonical: "https://www.exportimportnews.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.exportimportnews.com/",
    title: "Export Import News: Breaking News today from India and the World, Latest News, Top Headlines and Trending News Online",
    description: "Breaking News in India: Export Import News offers Latest News in Business, Sports, Entertainment, Politics, Finance, Travel News. Trending news and Latest News.",
    siteName: "Export Import News, News",
    images: [
      {
        url: "https://www.exportimportnews.com/images/logo.png"
      },
    ],
    locale: "en_US",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@httweets",
  //   creator: "@httweets",    
  //   title: "Export Import News: Breaking News today from India and the World, Latest News, Top Headlines and Trending News Online",
  //   description: "Breaking News in India: Export Import News offers Latest News in Business, Sports, Entertainment, Politics, Finance, Travel News. Trending news and Latest News.",
  //   images: ["https://www.hindustantimes.com/res/images/logo.png"],
  // },
  verification: {
    google: "otnNHRMOIy-1Tg_zXRwRRFJR_h4peL_kSO-cjTS6LbM",
  },
  other: {
    "language": "English",
    "audience": "all",
    "author": "https://www.exportimportnews.com/",
    "copyright": "https://www.exportimportnews.com/",
    "web_author": "https://www.exportimportnews.com/",
    "host": "https://www.exportimportnews.com/",
    "contactOrganization": "https://www.exportimportnews.com/",
    "contactStreetAddress1": "Latest News, India News, World News, Business, Policies & Sports News, Breaking News Today",
    "contactCountry": "India",
    "identifier-URL": "https://www.exportimportnews.com/",
    "distribution": "Global",
    "revisit-after": "Daily",
    "document-type": "Public",
    "Expires": "never",
    "allow-search": "yes",
    "rating": "General",
    "atdlayout": "Homepage",
    "al:android:url": "https://www.exportimportnews.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJ27FNRQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PageTracker/>
        <Header/>
        <BannerADD/>
        <main>
        {children}
        </main>
        <Footer/>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YX5LNQ7BMZ" />
        <Script id="gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YX5LNQ7BMZ');
          `}
        </Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RLHE8Z4K1R" />
        <Script id="gtag-1" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RLHE8Z4K1R');
          `}
        </Script>

        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KJ27FNRQ');
          `}
        </Script>
        
        <Script type="application/javascript" src="https://news.google.com/swg/js/v1/swg-basic.js" strategy="afterInteractive" />
        <Script strategy="afterInteractive">
          {`
            (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAow7_K8DA:openaccess",
                clientOptions: { theme: "light", lang: "en-GB" }
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}

