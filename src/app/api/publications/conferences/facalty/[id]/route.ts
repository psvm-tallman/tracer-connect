import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const db = mongoose.connection.db;
        const conferenceCollection = db.collection('conferences');

        const pipeline = [
            {
                $match: { userID: id }
            },
            {
                $addFields: {
                    userID: {
                        $map: {
                            input: '$userID',
                            as: 'id',
                            in: { $toObjectId: '$$id' }
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: '$userID',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userID',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    paperTitle: 1,
                    authors: {
                        $map: {
                            input: '$authorDetails',
                            as: 'author',
                            in: {
                                _id: '$$author._id',
                                name: '$$author.name'
                            }
                        }
                    },
                    conferenceIndexedIn: 1,
                    conferenceType: 1,
                    publicationYear: 1,
                    publicationMonth: 1
                }
            }
        ];

        const conferenceDocuments = await conferenceCollection.aggregate(pipeline).toArray();

        return NextResponse.json({ data: { conferenceDocuments }, success: true }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching conference documents:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}