import publicURL from '../../constant/domainURL';

export async function GET() {
  try {
    const webUrl = 'https://www.exportimportnews.com';

    const staticRoutes = [
      { path: '/', title: 'Export Import News | India Latest News Today, Breaking News', description: 'Breaking News in India: Export Import News offers Latest News in Business, Sports, Entertainment, Politics, Finance, Travel News. Trending News.' },
      { path: '/about-us', title: 'About Us | Export Import News | Indian & Global Trade News', description: 'Learn about ExportImportNews, a trusted platform delivering the latest news, insights, and resources on international trade, export-import policies.' },
      { path: '/privacy-policy', title: 'Export Import News | Privacy Policy | Data Protection', description: 'Learn how ExportImportNews.com collects, uses, and protects your data. We prioritize your privacy and ensure transparency in all our practices.' },
      { path: '/terms-and-conditions', title: 'Terms and Conditions | User Agreement and Policies', description: 'Read the terms and conditions for using ExportImportNews. Understand our user agreement, policies, disclaimers before accessing our website.' },
    ];

    async function fetchDynamicRoutes() {
      const [articlesRes, categoryRes, sectionRes] = await Promise.all([
        fetch(`${publicURL}/api/article`, { cache: 'no-store' }),
        fetch(`${publicURL}/api/category`, { cache: 'no-store' }),
        fetch(`${publicURL}/api/section`, { cache: 'no-store' }),
      ]);

      if (!articlesRes.ok || !categoryRes.ok || !sectionRes.ok) {
        throw new Error("Failed to fetch one or more resources");
      }

      const articlesData = await articlesRes.json();
      const categoryData = await categoryRes.json();
      const sectionsData = await sectionRes.json();

      const articles = articlesData.articles.map(article => ({
        path: `/news/${article.category}/${article.slug}`,
        title: article.metaTitle || article.heading || 'Export Import Article',
        description: article.metaDescription || article.summary || 'Read the latest on export-import news.',
      }));

      const categories = categoryData.categories.map(cat => ({
        path: `/news-categories/${cat.slug}`,
        title: cat.metaTitle || cat.name || 'News Category',
        description: cat.metaDescription || 'Articles under this category.',
      }));

      const sections = sectionsData.section.map(section => ({
        path: `/section/${section.slug}`,
        title: section.metaTitle || section.name || 'Section',
        description: section.metaDescription || 'Explore this section of articles.',
      }));

      return [...articles, ...categories, ...sections];
    }

    const dynamicRoutes = await fetchDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:ror="http://rorweb.com/0.1/">\n<channel>
  <title>ROR Sitemap for ${webUrl}</title>
  <description>ROR Sitemap for ${webUrl}</description>
  <link>${webUrl}</link>\n${allRoutes
    .map(
      route => `    <item>
      <link>${webUrl}${route.path}</link>
      <title>${escapeXml(route.title || '')}</title>
      <description>${escapeXml(route.description || '')}</description>
      <ror:updatePeriod>daily</ror:updatePeriod>
      <ror:sortOrder>0</ror:sortOrder>
      <ror:resourceOf>sitemap</ror:resourceOf>
    </item>`
    )
    .join('\n')}
</channel>\n</rss>`;

    return new Response(sitemap, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>Failed to generate sitemap</message>
</error>`,
      {
        status: 500,
        headers: { 'Content-Type': 'application/xml' },
      }
    );
  }
}

// Safely escape XML characters
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
