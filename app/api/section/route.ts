import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tax-site");
    const sectionCollection = db.collection("section");

    const section = await sectionCollection
      .find( { status: true }, {
        projection: {
          _id: 1,
          slug: 1,
          section: 1,
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

    return new Response(JSON.stringify({ success: true, section }), { status: 200 });
  } catch (error) {
    console.error("GET /api/section error:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch section" }), { status: 500 });
  }
}
