import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibtclilltkagqavb.public.blob.vercel-storage.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/urllist.txt",
        destination: "/api/urllist",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/ror.xml",
        destination: "/api/ror",
      },
      {
        source: "/bingsiteauth.xml",
        destination: "/api/bingsiteauth",
      },
    ];
  },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Frame-Options',
//             value: 'SAMEORIGIN',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'strict-origin-when-cross-origin',
//           },
//           {
//   key: 'Content-Security-Policy',
//   value: `
//     default-src 'self';
//     script-src 'self' 'unsafe-inline' 'unsafe-eval'
//       *.exportimportnews.com
//       https://www.googletagmanager.com
//       https://news.google.com
//       https://www.google-analytics.com;
//     style-src 'self' 'unsafe-inline'
//       *.exportimportnews.com
//       https://news.google.com;
//     img-src 'self' data: *.exportimportnews.com https://www.google-analytics.com;
//     font-src 'self' data: *.exportimportnews.com;
//     connect-src 'self'
//       https://www.google-analytics.com
//       https://news.google.com;
//     frame-ancestors 'self';
//   `.replace(/\s{2,}/g, ' ').trim(),
// }

//         ],
//       },
//     ];
//   },
};

export default nextConfig;
