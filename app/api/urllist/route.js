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

      // ✅ Correct: flat arrays of strings, NOT arrays of arrays
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

    const urllist = urls.map(route => `${webUrl}${route}`).join('\n');

    return new Response(urllist, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error) {
    console.error("Error generating urllist:", error);
    return new Response(
      `Failed to generate urllist`,
      {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      }
    );
  }
}
