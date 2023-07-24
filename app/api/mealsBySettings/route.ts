import { MealItem } from "@/app/components/RandomizedMealsForm/RandomizedMealsForm";
import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let data = null;
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("mealsGenerator");
    const body: { mealItems: MealItem[]; mealsCount: string } =
      await request.json();
    const { mealsCount, mealItems } = body;

    const dataToReturn = await mealItems.reduce(
      async (accumulator, mealItem, index) => {
        const tagsToMatch = mealItem.tags.map((tag) => new ObjectId(tag));

        const matchStage: { [key: string]: { $all?: ObjectId[] } | ObjectId } =
          {};

        if (tagsToMatch.length > 0) {
          matchStage.tags = {
            $all: tagsToMatch,
          };
        }

        matchStage.difficultyLevel = new ObjectId(
          mealItem.difficulityLevel._id
        );

        const results = await db
          .collection("meals")
          .aggregate([
            {
              $match: matchStage,
            },
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
            {
              $sample: { size: 1 },
            },
          ])
          .toArray();

        const matchedMealItem = results.length > 0 ? results[0] : null;

        let newAccumulator = await accumulator;
        newAccumulator[mealItem.temporaryMealId] = matchedMealItem;
        return newAccumulator;
      },
      {} as { [key: string]: any }
    );

    data = dataToReturn;

    // data = await db
    //   .collection("meals")
    //   .aggregate([
    //     {
    //       $match: {
    //         _id: { $ne: new ObjectId("64be7ab08389a81fdcfa4d94") },
    //         difficultyLevel: new ObjectId("64aff55e791f6e2dcb8e3d38"),
    //         tags: {
    //           $all: [
    //             new ObjectId("64b0328f0506b49616708134"),
    //             new ObjectId("64be7a658389a81fdcfa4d91"),
    //           ],
    //         },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "users", // Specify the collection to join
    //         localField: "author", // Field from the articles collection
    //         foreignField: "_id", // Field from the users collection
    //         as: "user", // Output array field
    //       },
    //     },
    //     {
    //       $unwind: "$user", // Deconstruct user array
    //     },
    //     {
    //       $lookup: {
    //         from: "difficultyLevels",
    //         localField: "difficultyLevel",
    //         foreignField: "_id",
    //         as: "difficultyLevel",
    //       },
    //     },
    //     {
    //       $unwind: "$difficultyLevel",
    //     },
    //     {
    //       $lookup: {
    //         from: "tags", // Specify the collection to join
    //         localField: "tags", // Field from the meals collection
    //         foreignField: "_id", // Field from the tags collection
    //         as: "tagsData", // Output array field
    //       },
    //     },
    //     {
    //       $unwind: "$tagsData", // Deconstruct tagsData array
    //     },
    //     {
    //       $group: {
    //         _id: "$_id",
    //         title: { $first: "$title" },
    //         authorName: { $first: "$user.userName" },
    //         difficultyLevel: { $first: "$difficultyLevel.level" },
    //         tags: { $push: "$tagsData" },
    //       },
    //     },
    //     {
    //       $sample: { size: 1 },
    //     },
    //   ])
    //   .toArray();

    // OLD QUERY
    // data = await db
    // .collection("meals")
    // .aggregate([
    //   {
    //     $lookup: {
    //       from: "users", // Specify the collection to join
    //       localField: "author", // Field from the articles collection
    //       foreignField: "_id", // Field from the users collection
    //       as: "user", // Output array field
    //     },
    //   },
    //   {
    //     $unwind: "$user", // Deconstruct user array
    //   },
    //   {
    //     $lookup: {
    //       from: "difficultyLevels",
    //       localField: "difficultyLevel",
    //       foreignField: "_id",
    //       as: "difficultyLevel",
    //     },
    //   },
    //   {
    //     $unwind: "$difficultyLevel",
    //   },
    //   {
    //     $lookup: {
    //       from: "tags", // Specify the collection to join
    //       localField: "tags", // Field from the meals collection
    //       foreignField: "_id", // Field from the tags collection
    //       as: "tagsData", // Output array field
    //     },
    //   },
    //   {
    //     $unwind: "$tagsData", // Deconstruct tagsData array
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       title: { $first: "$title" },
    //       authorName: { $first: "$user.userName" },
    //       difficultyLevel: { $first: "$difficultyLevel.level" },
    //       tags: { $push: "$tagsData" },
    //     },
    //   },
    //   {
    //     $sample: { size: Number(mealsCount) },
    //   },
    // ])
    // .toArray();
  } catch (e) {
    data = {
      error: "Error",
    };
  }
  return NextResponse.json(data);
}
