import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tax-site');
    const collection = db.collection('page_visits');

    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const key = `${month}-${year}`;

    await collection.updateOne(
      { url, month: key },
      {
        $inc: { total_visitors: 1 },
        $setOnInsert: {
          createdAt: new Date(),
          url,
          month: key
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
