import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        const userDocument = await usersCollection.findOne({ _id: new mongoose.Types.ObjectId(id) }, { projection: { project_id: 1, name: 1, designation: 1, school: 1, profilePhoto: 1 } });
        if (!userDocument) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

        return NextResponse.json({ data: userDocument, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}