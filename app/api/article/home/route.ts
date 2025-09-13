import clientPromise from "../../../../lib/mongodb";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const section = url.searchParams.get("section");
    const client = await clientPromise;
    const db = client.db("tax-site");
    const articleCollection = db.collection("articles");

    const query: any = { status: true, home_status: true };
    if (section) query.section = section;

    const articles = await articleCollection
      .find(query, {
        projection: {
          _id: 1,
          heading: 1,
          slug: 1,
          category: 1,
          section: 1,
          status: 1,
          home_status: 1,
          latest_status: 1,
          createdAt: 1,
          updatedAt: 1,
          priority: 1,
          images: 1,
          author: 1,
          smallContent: 1,
          metaTitle: 1,
          metaDescription: 1,
        },
      })
      .sort({ priority: 1, createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify({ success: true, articles }), { status: 200 });
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch articles" }), { status: 500 });
  }
}