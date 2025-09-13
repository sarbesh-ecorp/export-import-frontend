import publicURL from '../../constant/domainURL';

export async function GET() {
  try {
    const webUrl = 'https://www.exportimportnews.com';

    const staticRoutes = [
      '/',
      '/about-us',
      '/privacy-policy',
      '/terms-and-conditions'
    ];

    async function fetchDynamicRoutes() {
      const articles = await fetch(`${publicURL}/api/article`, { cache: 'no-store' });
      const articlesData = await articles.json();

      const category = await fetch(`${publicURL}/api/category`, { cache: 'no-store' });
      const categoryData = await category.json();

      const sections = await fetch(`${publicURL}/api/section`, { cache: 'no-store' });
      const sectionsData = await sections.json();

      // ❌ WRONG: Creates array of arrays
      // const allArticles = articlesData.articles.map(article => [
      //   `/news/${article.category}/${article.slug}`,
      // ]);

      // ✅ FIX: Flat array of strings
      const allArticles = articlesData.articles.map(
        article => `/news/${article.category}/${article.slug}`
      );

      const allCategory = categoryData.categories.map(
        data => `/news-categories/${data.slug}`
      );

      const allSections = sectionsData.section.map(
        data => `/section/${data.slug}`
      );

      return {
        articles: allArticles,
        category: allCategory,
        sections: allSections,
      };
    }

    const dynamicRoutes = await fetchDynamicRoutes();

    const urls = [
      ...staticRoutes,
      ...dynamicRoutes.articles,
      ...dynamicRoutes.category,
      ...dynamicRoutes.sections,
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(route => `
    <url>
        <loc>${webUrl}${route}</loc>
        <changefreq>daily</changefreq>
        <lastmod>${new Date().toISOString().slice(0,10)}</lastmod>
        <priority>0.8</priority>
    </url>`).join('')}
    </urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });

  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
        <error>
          <message>Failed to generate sitemap</message>
        </error>`,
      {
        status: 500,
        headers: { "Content-Type": "application/xml" },
      }
    );
  }
}
