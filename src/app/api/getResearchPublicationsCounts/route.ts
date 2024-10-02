import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const db = mongoose.connection.db;

    const journalCollection = db?.collection('journals');
    const bookChapterCollection = db?.collection('bookchapters');
    const conferenceCollection = db?.collection('conferences');
    const patentsCollection = db?.collection('patents');
    const designPatentsCollection = db?.collection('designpatents');
    const copyrightCollection = db?.collection('copyrights');

    const [journalDocuments, bookChapterDocuments, conferenceDocuments, patentsGrantedDocuments, patentsFiledDocuments, copyrightDocuments] = await Promise.all([
      journalCollection?.countDocuments({ status: "Verified", category: "Published" }),
      bookChapterCollection?.countDocuments({ status: "Verified", category: "Published" }),
      conferenceCollection?.countDocuments({ status: "Verified" }),
      Promise.all([
        patentsCollection?.countDocuments({ status: "Verified", category: "Granted" }),
        designPatentsCollection?.countDocuments({ status: "Verified", category: "Granted" })
      ]).then(([patents, designPatents]:any) => patents + designPatents),
      Promise.all([
        patentsCollection?.countDocuments({
          status: "Verified",
          $or: [
            { category: "Granted" },
            { category: "Published" },
            { category: "Filed" }
          ]
        }),
        designPatentsCollection?.countDocuments({
          status: "Verified",
          $or: [
            { category: "Granted" },
            { category: "Published" },
            { category: "Filed" }
          ]
        })
      ]).then(([patents, designPatents]:any) => patents + designPatents),
      copyrightCollection?.countDocuments({ status: "Verified" })
    ]);
    const data = { journalDocuments, bookChapterDocuments, conferenceDocuments, patentsGrantedDocuments, patentsFiledDocuments, copyrightDocuments };
    return NextResponse.json({ data, success: true }, { status: 200 });

  } catch (e: any) {
    console.error("Internal Error Occurred:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}