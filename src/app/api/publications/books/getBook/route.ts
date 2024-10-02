import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const db = mongoose.connection.db;
    const booksCollection = db.collection('books');

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
          paperTitle: { $first: '$bookTitle' },
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
          publisherName: { $first: '$publisher' },
          publisherType: { $first: '$country' },
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

    const books = await booksCollection.aggregate(pipeline).toArray();

    return NextResponse.json({ data: { books }, success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching book chapters:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}