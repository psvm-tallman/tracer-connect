import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

type Quartile = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface JournalDocument {
  quartile?: Quartile;
  journalType?: string;
  impactFactor?: number;
  publicationYear?: number;
  publicationMonth?: number;
}

export async function GET() {
  try {
    const db = mongoose.connection.db;
    const journalsCollection = db?.collection('journals');

    const pipeline = [
      {
        $match: { status: 'Verified', category: 'Published' },
      },
      {
        $addFields: {
          userID: {
            $map: {
              input: '$userID',
              as: 'id',
              in: { $toObjectId: '$$id' },
            },
          },
        
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
        $unwind: {
          path: '$userID',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userID',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      {
        $group: {
          _id: '$_id',
          paperTitle: { $first: '$paperTitle' },
          journalTitle: { $first: '$journalTitle' },
          authors: {
            $push: {
              $cond: {
                if: { $gt: [{ $size: '$authorDetails' }, 0] },
                then: {
                  _id: { $arrayElemAt: ['$authorDetails._id', 0] },
                  name: { $arrayElemAt: ['$authorDetails.name', 0] },
                },
                else: null,
              },
            },
          },
          quartile: { $first: '$quartile' },
          quartileProvider: { $first: '$quartileProvider' },
          impactFactor: { $first: '$impactFactor' },
          journalType: { $first: '$journalType' },
          publicationYear: { $first: '$publicationYear' },
          publicationMonth: { $first: '$publicationMonth' },
          quartileValue: { $first: '$quartileValue' },
        },
      },
      {
        $addFields: {
          authors: {
            $filter: {
              input: '$authors',
              as: 'author',
              cond: { $ne: ['$$author', null] },
            },
          },
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
      {
        $limit: 10,
      },
    ];

    const topJournals = await journalsCollection?.aggregate(pipeline).toArray();

    return NextResponse.json({ data: { topJournals }, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}