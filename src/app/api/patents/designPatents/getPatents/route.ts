import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    try {
//         const db = mongoose.connection.db;
//         const designPatentsCollection = db.collection('designpatents');

//         const pipeline = [
//             { $match: { status: 'Verified' } },
//             {
//                 $addFields: {
//                     userID: {
//                         $map: {
//                             input: '$userID',
//                             as: 'id',
//                             in: { $toObjectId: '$$id' }
//                         }
//                     }
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'userID',
//                     foreignField: '_id',
//                     as: 'authorDetails'
//                 }
//             },
//             {
//                 $addFields: {
//                     authors: {
//                         $map: {
//                             input: '$authorDetails',
//                             as: 'applicants',
//                             in: {
//                                 _id: '$$applicants._id', now if id is pres
//                                 name: '$$applicants.name'
//                             }
//                         }
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: '$_id',
//                     paperTitle: { $first: '$designPatentTitle' },
//                     applicants: { $first: '$applicants' },
//                     category: { $first: '$category' },
//                     publisherName: { $first: '$publisherName' },
//                     patentType: { $first: '$publisherType' },
//                     publishedDate: { $first: '$publishedDate' },
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     paperTitle: 1,
//                     applicants: 1,
//                     category: 1,
//                     publisherName: 1,
//                     patentType: 1,
//                     publishedDate: 1
//                 }
//             },
//             {
//                 $sort: {
//                     publishedDate: -1,
//                 }
//             }
//         ];

//         const designPatents = await designPatentsCollection.aggregate(pipeline).toArray();

//         return NextResponse.json({ data: { designPatents }, success: true }, { status: 200 });
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching design patents:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}