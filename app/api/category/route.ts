import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tax-site");
    const categoriesCollection = db.collection("categories");

    const categories = await categoriesCollection
      .find( { status: true }, {
        projection: {
          _id: 1,
          slug: 1,
          category: 1,
          status: 1,
          priority: 1,
          createdAt: 1,
          updatedAt: 1,
          metaTitle: 1,
          metaDescription: 1
        },
      })
      .sort({ priority: 1, createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify({ success: true, categories }), { status: 200 });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch categories" }), { status: 500 });
  }
}
