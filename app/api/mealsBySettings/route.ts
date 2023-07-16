import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let data = null;
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("mealsGenerator");
    const body = await request.json();
    const { mealsCount, mealItems } = body;

    // data = { mealsCount: mealsCount, mealItems: mealItems };

    data = await db
      .collection("meals")
      .aggregate([
        {
          $lookup: {
            from: "users", // Specify the collection to join
            localField: "author", // Field from the articles collection
            foreignField: "_id", // Field from the users collection
            as: "user", // Output array field
          },
        },
        {
          $unwind: "$user", // Deconstruct user array
        },
        {
          $project: {
            // Choose fields to include
            _id: 1,
            title: 1,
            authorName: "$user.userName",
          },
        },
        {
          $sample: { size: Number(mealsCount) },
        },
      ])
      .toArray();
  } catch (e) {
    data = {
      error: "Error",
      apa: request,
    };
  }
  return NextResponse.json(data);
}
