import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface categoryPageProps {
  params: Promise<{ category: string} >;
}  

export async function GET(req: NextRequest, { params }: categoryPageProps) {
  const { category } = await params;

  try {
    const client = await clientPromise;
    const db = client.db("tax-site");

    const categoryData = await db.collection("categories").findOne({
      slug: category,
      status: true,
    });

    if (!categoryData) {
      return NextResponse.json(
        { success: false, message: "Categories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: categoryData });
  } catch (error) {
    console.error("GET /api/category/[category] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
