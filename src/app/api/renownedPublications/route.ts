import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const db = mongoose.connection.db;
        const journalsCollection = db.collection('journals');
        const booksCollection = db.collection('books');
        const bookChaptersCollection = db.collection('bookchapters');
        const conferencesCollection = db.collection('conferences');

        const JournalsPipeline = [
            { $match: { status: 'Verified', category: 'Published' } },
            {
                $addFields: {
                    quartileValue: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$quartile', 'Q1'] }, then: 1 },
                                { case: { $eq: ['$quartile', 'Q2'] }, then: 2 },
                                { case: { $eq: ['$quartile', 'Q3'] }, then: 3 },
                                { case: { $eq: ['$quartile', 'Q4'] }, then: 4 },
                            ],
                            default: 5,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    let: { userIDs: { $map: { input: '$userID', as: 'id', in: { $toObjectId: '$$id' } } } },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$userIDs'] } } },
                        { $project: { _id: 1, name: 1 } }
                    ],
                    as: 'authors',
                },
            },
            {
                $sort: {
                    quartileValue: 1,
                    impactFactor: -1,
                    publicationYear: -1,
                    publicationMonth: -1,
                },
            },
            {
                $project: {
                    _id: 1,
                    paperTitle: 1,
                    journalTitle: 1,
                    authors: 1,
                    quartile: 1,
                    quartileProvider: 1,
                    impactFactor: 1,
                    journalType: 1,
                    publicationYear: 1,
                    publicationMonth: 1,
                },
            },
            { $limit: 7 },
        ];
        const booksPipeline = [
            { $match: { status: 'Verified' } },
            {
                $lookup: {
                    from: 'users',
                    let: { userIDs: '$userID' },
                    pipeline: [
                        { $match: { $expr: { $in: [{ $toString: '$_id' }, '$$userIDs'] } } },
                        { $project: { _id: 1, name: 1 } }
                    ],
                    as: 'authors'
                }
            },
            {
                $project: {
                    paperTitle: '$bookTitle',
                    authors: 1,
                    publisherName: '$publisher',
                    publisherType: '$country',
                    publicationYear: 1,
                    publicationMonth: 1
                }
            },
            { $sort: { publicationYear: -1, publicationMonth: -1 } },
            { $limit: 3 }
        ];
        const bookChaptersPipeline = [
            { $match: { status: 'Verified' } },
            {
                $lookup: {
                    from: 'users',
                    let: { userIDs: '$userID' },
                    pipeline: [
                        { $match: { $expr: { $in: [{ $toString: '$_id' }, '$$userIDs'] } } },
                        { $project: { _id: 1, name: 1 } }
                    ],
                    as: 'authorDetails'
                }
            },
            {
                $project: {
                    title: '$bookTitle',
                    paperTitle: '$bookChapterTitle',
                    authors: '$authorDetails',
                    copyrightRegistered: 1,
                    publisherName: 1,
                    publisherType: 1,
                    publicationYear: 1,
                    publicationMonth: 1
                }
            },
            {
                $sort: {
                    publicationYear: -1,
                    publicationMonth: -1
                }
            },
            { $limit: 5 }
        ];
        const ConferencesPipeline = [
            { $match: { status: 'Verified' } },
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
            { $unwind: { path: '$userID', preserveNullAndEmptyArrays: true } },
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
                    publicationMonth: { $first: '$publicationMonth' }
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
                    conferenceType: -1, // Sort International first
                    publicationYear: -1,
                    publicationMonth: -1
                }
            },
            { $limit: 3 }
        ];

        const [journals, books, bookChapters, conferences] = await Promise.all([
            journalsCollection.aggregate(JournalsPipeline).toArray(),
            booksCollection.aggregate(booksPipeline).toArray(),
            bookChaptersCollection.aggregate(bookChaptersPipeline).toArray(),
            conferencesCollection.aggregate(ConferencesPipeline).toArray()
        ]);

        const publications = { books, journals, bookChapters, conferences };

        return NextResponse.json({ data: { publications }, success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}