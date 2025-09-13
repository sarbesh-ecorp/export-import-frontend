// import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// interface articlePageProps {
//   params: Promise<{ section: string} >;
// }  

// export async function GET(req: NextRequest, { params }: articlePageProps) {
//   const { section } = await params;

//   try {
//     const client = await clientPromise;
//     const db = client.db("tax-site");

//     const article = await db.collection("articles").find({
//       section: section,
//       status: true,
//     },
//         { projection: {
//             _id: 1,
//             heading: 1,
//             slug: 1,
//             createdAt: 1,
//             updatedAt: 1,
//             priority: 1,
//             images: 1,
//             author: 1,
//             smallContent: 1,
//           }
//         }).sort({ priority: 1, createdAt: -1 })
//       .toArray();

//     if (!article) {
//       return NextResponse.json(
//         { success: false, message: "Article not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: article });
//   } catch (error) {
//     console.error("GET /api/article/sec/[section] error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface articlePageProps {
  params: Promise<{ section: string} >;
}  

export async function GET(req: NextRequest, { params }: articlePageProps) {
  const { section } = await params;
  const url = new URL(req.url);
  const skip = parseInt(url.searchParams.get("skip") || "0");
  const limit = parseInt(url.searchParams.get("limit") || "4");

  try {
    const client = await clientPromise;
    const db = client.db("tax-site");

    const article = await db.collection("articles")
      .find({ section: section, status: true }, {
        projection: {
          _id: 1,
          heading: 1,
          slug: 1,
          createdAt: 1,
          updatedAt: 1,
          priority: 1,
          images: 1,
          author: 1,
          smallContent: 1,
        }
      })
      .sort({ priority: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("GET /api/article/sec/[section] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}