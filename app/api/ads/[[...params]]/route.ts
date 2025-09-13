import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface Context {
  params: Promise<{ params?: string[] }>;
}

export async function GET(req: NextRequest, { params }: Context) {
  const { params: paramsArray = [] } = await params;
  const [adLocation, adType] = paramsArray;

  try {
    const client = await clientPromise;
    const db = client.db("tax-site");

    const query: any = {
      displayLocation: adLocation,
      status: true,
    };

    if (adLocation === "home" && adType) {
      query.homeLocation = adType;
    } else if (adLocation === "insidePage" && adType) {
      query.insidePageLocation = adType;
    }

    const advertisement = await db.collection("advertisement").find(query).toArray();

    if (!advertisement) {
      return NextResponse.json(
        { success: false, message: "Advertisement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: advertisement });
  } catch (error) {
    console.error("GET /api/ads error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
