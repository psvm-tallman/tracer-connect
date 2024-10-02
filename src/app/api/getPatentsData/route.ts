import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

type Country = 'India' | 'USA' | 'UK' | 'South Africa' | 'Australia' | 'Germany';

interface JournalDocument {
  _id: mongoose.Types.ObjectId;
  patentType?: Country;
}

export async function GET() {
  try {
    const db = mongoose.connection.db;
    const patentsCollection = db.collection('patents');
    const designPatentsCollection = db.collection('designpatents');

    const SORT_ORDER = {
      'South Africa': 1,
      'Germany': 2,
      'Australia': 3,
      'UK': 4,
      'USA': 5,
      'India': 6
    };

    const createPatentPipeline = () => [
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$patentType", "India"] }, then: 1 },
                { case: { $eq: ["$patentType", "USA"] }, then: 2 },
                { case: { $eq: ["$patentType", "UK"] }, then: 3 },
                { case: { $eq: ["$patentType", "Australia"] }, then: 4 },
                { case: { $eq: ["$patentType", "Germany"] }, then: 5 },
                { case: { $eq: ["$patentType", "South Africa"] }, then: 6 },
              ],
              default: 7
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { inventors: { $map: { input: '$inventors', as: 'id', in: { $toObjectId: '$$id' } } } },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$inventors'] } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'inventors',
        },
      },
      {
        $sort: {
          sortOrder: 1,
          category: 1,
          grantedDate: 1,
          publishedDate: 1,
        }
      },
      { $limit: 10 },
      {
        $project: {
          _id: 1,
          category: 1,
          grantedDate: 1,
          publishedDate: 1,
          filedDate: 1,
          patentType: 1,
          inventors: 1
        }
      }
    ];

    const createDesignPatentPipeline = (typeField: string) => [
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: Object.entries(SORT_ORDER).map(([country, order]) => ({
                case: { $eq: [`$${typeField}`, country] },
                then: order
              })),
              default: 7
            }
          }
        }
      },
      {
        $sort: {
          sortOrder: -1,
          registrationDate: 1
        }
      },
      { $limit: 5 },
      {
        $project: {
          [typeField]: 1,
          _id: 1,
          category: 1,
          registrationDate: 1
        }
      }
    ];

    const [patents, designPatents] = await Promise.all([
      patentsCollection.aggregate(createPatentPipeline()).toArray(),
      designPatentsCollection.aggregate(createDesignPatentPipeline('designPatentType')).toArray()
    ]);

    const data = { patents, designPatents };
    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching patents:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}