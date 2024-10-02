import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

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
                    schoolPermissions: 1,
                    photoURL: 1,
                    name: 1
                }
            },
            {
                $limit: 5
            }
        ];

        const formattedScores = await usersCollection.aggregate(aggregationPipeline).toArray();

        const data = { userDocuments: formattedScores };
        return NextResponse.json({ data: data, success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}