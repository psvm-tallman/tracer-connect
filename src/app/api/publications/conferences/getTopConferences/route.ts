import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const db = mongoose.connection.db;
        const conferencesCollection = db.collection('conferences');

        const pipeline = [
            { $match: { status: 'Verified' } },
            {
                $addFields: {
                    userID: {
                        $map: {
                            input: '$userID',
                            as: 'id',
                            in: { $toObjectId: '$$id' }
                        }
                    },
                    countryValue: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$conferenceType', 'International'] }, then: 1 },
                            ],
                            default: 2, 
                        },
                    },
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
                $group: {
                    _id: '$_id',
                    title: { $first: '$conferenceName' },
                    paperTitle: { $first: '$paperTitle' },
                    authors: {
                        $push: {
                            $cond: {
                                if: { $gt: [{ $size: '$authorDetails' }, 0] },
                                then: {
                                    _id: { $arrayElemAt: ['$authorDetails._id', 0] },
                                    name: { $arrayElemAt: ['$authorDetails.name', 0] }
                                },
                                else: null
                            }
                        }
                    },
                    conferenceIndexedIn: { $first: '$conferenceIndexedIn' },
                    conferenceType: { $first: '$conferenceType' },
                    publicationYear: { $first: '$publicationYear' },
                    publicationMonth: { $first: '$publicationMonth' },
                    countryValue: { $first: '$countryValue' } // Include countryValue in the group stage
                }
            },
            {
                $addFields: {
                    authors: {
                        $filter: {
                            input: '$authors',
                            as: 'author',
                            cond: { $ne: ['$$author', null] }
                        }
                    }
                }
            },
            {
                $sort: {
                    countryValue: 1,
                    publicationYear: -1,
                    publicationMonth: -1
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    paperTitle: 1,
                    authors: 1,
                    conferenceIndexedIn: 1,
                    conferenceType: 1,
                    publicationYear: 1,
                    publicationMonth: 1
                }
            },
            {
                $limit: 10,
            },
        ];
        const conferences = await conferencesCollection.aggregate(pipeline).toArray();

        return NextResponse.json({ data: { conferences }, success: true }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching book chapters:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}