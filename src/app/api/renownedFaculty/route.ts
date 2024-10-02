import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const db = mongoose.connection.db;
    const usersCollection = db?.collection('users');

    const aggregationPipeline = [
      {
        $addFields: {
          totalScore: {
            $sum: [
              { $ifNull: ["$score.journal", 0] },
              { $ifNull: ["$score.bookChapter", 0] },
              { $ifNull: ["$score.book", 0] },
              { $ifNull: ["$score.conference", 0] },
              { $ifNull: ["$score.eventAttended", 0] },
              { $ifNull: ["$score.eventConducted", 0] },
              { $ifNull: ["$score.consultancy", 0] },
              { $ifNull: ["$score.fundedProject", 0] },
              { $ifNull: ["$score.techPatent", 0] },
              { $ifNull: ["$score.designPatent", 0] },
              { $ifNull: ["$score.copyright", 0] },
              { $ifNull: ["$score.award", 0] }
            ]
          }
        }
      },
      {
        $sort: {
          totalScore: -1
        }
      },
      {
        $project: {
          _id: 1,
          designation: 1,
          name: 1
        }
      }
    ];

    const formattedScores = await usersCollection?.aggregate(aggregationPipeline).toArray();

    return NextResponse.json({ data: formattedScores, success: true }, { status: 200 });
  } catch (error: any) {
    // Handle error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// score
// Object
// journal
// 0
// bookChapter
// 0
// book
// 90
// conference
// 0
// eventAttended
// 0
// eventConducted
// 0
// consultancy
// 0
// fundedProject
// 0
// techPatent
// 0
// designPatent
// 24
// copyright
// 0
// award
// 0