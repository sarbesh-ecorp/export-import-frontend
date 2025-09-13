import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tax-site");
    const notificationCollection = db.collection("notifications");

    const notifications = await notificationCollection
      .find( { status: true },)
      .sort({ priority: 1, createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify({ success: true, notifications }), { status: 200 });
  } catch (error) {
    console.error("GET /api/notifications error:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch notifications" }), { status: 500 });
  }
}
