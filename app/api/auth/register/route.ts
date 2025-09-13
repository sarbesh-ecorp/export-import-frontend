
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password} = await request.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("tax-site");
    const usersCollection = db.collection("website_users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,      
      status: "Active",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return new Response(
      JSON.stringify({ success: true, userId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /register error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
