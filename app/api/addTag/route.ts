import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let data = null;

  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("mealsGenerator");
    const body = await request.json();
    const { tagName } = body;

    const response = await db.collection("tags").insertOne({
      tagName: tagName,
    });
    data = { tagId: response.insertedId };
  } catch (e) {
    data = "Failed to add meal";
  }
  return NextResponse.json(data);
}
