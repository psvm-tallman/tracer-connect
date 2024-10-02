import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";

export async function GET() {
  try {
    console.log("Connecting to DB...");
    const db =  await connectDB();
    console.log("Connected successfully to MongoDB");


    const journalCollection = db!.collection("journals");
    const bookChapterCollection = db!.collection("bookchapters");
    const conferenceCollection = db!.collection("conference");
    const bookCollection = db!.collection("books");
    const userCollection = db!.collection("users");
    const patentCollection = db!.collection("patents");
    const designPatentCollection = db!.collection("designpatents");

    const journals = await journalCollection.find().toArray();
    const bookChapters = await bookChapterCollection.find().toArray();
    const conferences = await conferenceCollection.find().toArray();
    const books = await bookCollection.find().toArray();
    const users = await userCollection.find().toArray();
    const techPatents = await patentCollection.find().toArray();
    const designPatents = await designPatentCollection.find().toArray();

    console.log("Journals:", JSON.stringify(journals, null, 2));
    console.log("Book Chapters:", JSON.stringify(bookChapters, null, 2));
    console.log("Conferences:", JSON.stringify(conferences, null, 2));
    console.log("Books:", JSON.stringify(books, null, 2));
    console.log("Users:", JSON.stringify(users, null, 2));
    console.log("Tech Patents:", JSON.stringify(techPatents, null, 2));
    console.log("Design Patents:", JSON.stringify(designPatents, null, 2));

    return NextResponse.json({
      data: {
        journals,
        bookChapters,
        conferences,
        books,
        users,
        techPatents,
        designPatents,
      },
      success: true
    }, { status: 200 });
  } catch (e: any) {
    console.error("Internal Error Occurred:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
