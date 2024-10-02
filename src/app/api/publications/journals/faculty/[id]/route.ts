import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = mongoose.connection.db;
    const journalsCollection = db.collection('journals');

    const journalDocument = await journalsCollection.find({ userID: id }).project({ _id: 1, paperTitle: 1, journalTitle: 1, authors: 1, quartile: 1, quartileProvider: 1, impactFactor: 1, journalType: 1, publicationYear: 1, publicationMonth: 1, }).toArray();
    return NextResponse.json({ data: { journalDocument }, success: true }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};