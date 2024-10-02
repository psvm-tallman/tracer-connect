import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { exec } from 'child_process';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const departments: string[] = JSON.parse(searchParams.get('department') || '[]');
        console.log(departments);
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        const aggregationPipeline = [
            ...(departments.length > 0 ? [
                {
                    $match: {
                        $expr: {
                            $or: departments.map((dept: string) => ({
                                $regexMatch: {
                                    input: "$school",
                                    regex: dept,
                                    options: "i"
                                }
                            }))
                        }
                    }
                }
            ] : []),
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
                    school: 1,
                    photoURL: 1,
                    name: 1,
                }
            }
        ];

        const formattedScores = await usersCollection.aggregate(aggregationPipeline).toArray();

        return NextResponse.json({ data: { userDocuments: formattedScores } }, { status: 200 });
    } catch (error: any) {
        console.error('Error in GET function:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}