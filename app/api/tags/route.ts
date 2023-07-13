import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let data = null;
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("mealsGenerator");
    data = await db.collection("tags").find({}).toArray();
  } catch (e) {
    data = { error: e };
  }
  return NextResponse.json(data);
}
