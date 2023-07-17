import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let data = null;

  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("mealsGenerator");
    const body: {
      meal: string;
      author: string;
      difficulityLevel: string;
      tags: string[];
    } = await request.json();
    const { meal, author, difficulityLevel, tags } = body;

    const authorId = new ObjectId(author);
    const difficulityLevelId = new ObjectId(difficulityLevel);

    const tagsAsObjectId = tags.map((tag) => {
      return new ObjectId(tag);
    });

    await db.collection("meals").insertOne({
      author: authorId,
      title: meal,
      difficultyLevel: difficulityLevelId,
      tags: tagsAsObjectId,
    });
    data = {};
  } catch (e) {
    data = "Failed to add meal";
  }
  return NextResponse.json(data);
}
