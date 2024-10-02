import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const db = mongoose.connection.db;

        const collegeConfigurationsCollection = db.collection('collegeconfigurations');
        const collegeConfigurationsCollectionData = await collegeConfigurationsCollection.find({}).project({ _id: 0, name: 1, officialWebsite: 1 }).toArray();
        return NextResponse.json({ collegeConfigurationsCollectionData, success: true }, { status: 200 });
    } catch (error: any) {
        // Handle error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}