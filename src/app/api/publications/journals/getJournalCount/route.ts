import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const db = mongoose.connection.db;
        const journalCollection = db.collection('journals');

        const journalCount = await journalCollection.countDocuments({})
        console.log(journalCount);
        return NextResponse.json({ data: { journalCount }, success: true }, { status: 200 });
    } catch (e: any) {
        console.error("Internal Error Occurred:", e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}