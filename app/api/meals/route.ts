import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let data = null;
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("mealsGenerator");

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
          $lookup: {
            from: "difficultyLevels",
            localField: "difficultyLevel",
            foreignField: "_id",
            as: "difficultyLevel",
          },
        },
        {
          $unwind: "$difficultyLevel",
        },
        {
          $lookup: {
            from: "tags", // Specify the collection to join
            localField: "tags", // Field from the meals collection
            foreignField: "_id", // Field from the tags collection
            as: "tagsData", // Output array field
          },
        },
        {
          $unwind: "$tagsData", // Deconstruct tagsData array
          //preserveNullAndEmptyArrays: true, // Include meals with no tags
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            authorName: { $first: "$user.userName" },
            difficultyLevel: { $first: "$difficultyLevel.level" },
            tags: { $push: "$tagsData" },
          },
        },
        // {
        //   $project: {
        //     // Choose fields to include
        //     _id: 1,
        //     title: 1,
        //     authorName: "$user.userName",
        //   },
        // },
      ])
      .toArray();
  } catch (e) {
    data = { error: e };
  }
  return NextResponse.json(data);
}
