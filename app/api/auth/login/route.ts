
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Username and password are required" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("tax-site");
    const usersCollection = db.collection("website_users");

    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid username" }), {
        status: 401,
      });
    }

    if (user.status !== 'Active') {
      return new Response(JSON.stringify({ error: "Account is not active" }), {
        status: 403,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    const sessionToken = crypto.randomBytes(32).toString("hex");

    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { sessionToken, lastLogin: new Date() } }
    );

    const { password: _, ...userData } = user;

    return new Response(
      JSON.stringify({
        success: true,
        token: sessionToken,
        user: {
          ...userData,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /login error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
