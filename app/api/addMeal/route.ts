import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let data = null;

  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("mealsGenerator");
    const body = await request.json();
    const { meal, author, difficulityLevel } = body;

    const authorId = new ObjectId(author);
    const difficulityLevelId = new ObjectId(difficulityLevel);

    await db.collection("meals").insertOne({
      author: authorId,
      title: meal,
      difficultyLevel: difficulityLevelId,
    });
    data = {};
  } catch (e) {
    data = "Failed to add meal";
  }
  return NextResponse.json(data);
}
