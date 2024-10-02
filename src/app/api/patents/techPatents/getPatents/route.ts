import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const db = mongoose.connection.db;
    const patentsCollection = db.collection('patents');

    const pipeline = [
      { $match: { status: 'Verified' } },
      {
        $group: {
          _id: '$_id',
          paperTitle: { $first: '$patentTitle' },
          authors: { $first: '$authors' },
          category: { $first: '$category' },
          publisherName: { $first: '$publisherName' },
          patentType: { $first: '$publisherType' },
          publishedDate: { $first: '$publishedDate' },
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          paperTitle: 1,
          authors: 1,
          copyrightRegistered: 1,
          publisherName: 1,
          publisherType: 1,
          publicationYear: 1,
          publicationMonth: 1
        }
      },
      {
        $sort: {
          publishedDate: -1,
        }
      }
    ];

    const patents = await patentsCollection.aggregate(pipeline).toArray();

    return NextResponse.json({ data: { patents }, success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching book chapters:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}