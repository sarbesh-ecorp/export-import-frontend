import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface articlePageProps {
  params: Promise<{ slug: string; category: string} >;
}  

export async function GET(req: NextRequest, { params }: articlePageProps) {
  const { slug } = await params;

  try {
    const client = await clientPromise;
    const db = client.db("tax-site");

    const article = await db.collection("articles").findOne({
      slug: slug,
      status: true,
    });

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("GET /api/article/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
