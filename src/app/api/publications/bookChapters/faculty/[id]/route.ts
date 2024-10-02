import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const db = mongoose.connection.db;
        const bookChaptersCollection = db.collection('bookchapters');

        const bookChaptersDocument = await bookChaptersCollection.find({ userID: id }).toArray();
        return NextResponse.json({ data: { bookChaptersDocument }, success: true }, { status: 200 });

    } catch (error) {

    }
};
