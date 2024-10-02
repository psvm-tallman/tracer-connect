import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const db = mongoose.connection.db;

        const bookChapterCollection = db.collection('bookchapters');
        const bookChapterCount = bookChapterCollection.countDocuments({ status: "Verified", category: "Published" })

        return NextResponse.json({ bookChapterCount }, { status: 200 });
    } catch (e: any) {
        console.error("Internal Error Occurred:", e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}