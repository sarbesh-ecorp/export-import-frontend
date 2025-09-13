import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface sectionPageProps {
  params: Promise<{ section: string} >;
}  

export async function GET(req: NextRequest, { params }: sectionPageProps) {
  const { section } = await params;

  try {
    const client = await clientPromise;
    const db = client.db("tax-site");

    const sectionData = await db.collection("section").findOne({
      slug: section,
      status: true,
    });

    if (!sectionData) {
      return NextResponse.json(
        { success: false, message: "Section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: sectionData });
  } catch (error) {
    console.error("GET /api/section/[section] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
