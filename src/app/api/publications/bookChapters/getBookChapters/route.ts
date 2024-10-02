import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const db = mongoose.connection.db;
    const bookChaptersCollection = db.collection('bookchapters');

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
        $group: {
          _id: '$_id',
          title: { $first: '$bookTitle' },
          paperTitle: { $first: '$bookChapterTitle' },
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
          copyrightRegistered: { $first: '$copyrightRegistered' },
          publisherName: { $first: '$publisherName' },
          publisherType: { $first: '$publisherType' },
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
          publicationYear: -1,
          publicationMonth: -1
        }
      }
    ];

    const bookChapters = await bookChaptersCollection.aggregate(pipeline).toArray();

    return NextResponse.json({ data: { bookChapters }, success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching book chapters:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}