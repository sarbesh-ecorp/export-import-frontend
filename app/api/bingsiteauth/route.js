import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const xml = `<?xml version="1.0"?>
<users>
  <user>119F131DADF65C2C9AFEFEFEF5783A66</user>
</users>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
