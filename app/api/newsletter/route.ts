
import clientPromise from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, createdAt, pageURL } = await req.json();

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    let location = 'unknown';
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const geo = await res.json();
      if (geo) {
        location = `${geo}`;
      }
    } catch {
      // Fail gracefully on location fetch
    }

    const client = await clientPromise;
    const db = client.db("tax-site");
    const collection = db.collection("subscribers");

    await collection.insertOne({
      email,
      createdAt: new Date(createdAt),
      pageURL,
      ip,
      location,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
