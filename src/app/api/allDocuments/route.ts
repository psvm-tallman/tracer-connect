import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db/connectDB';

export async function GET() {
    try {
      await connectDB();
      const db = mongoose.connection.db;
      const collections = await db!.listCollections().toArray();
      console.log('Collections:', collections); 
  
      if (collections.length === 0) {
        throw new Error("No collections found.");
      }
  
      const allData: { [key: string]: any[] } = {};
      for (const collection of collections) {
        const collectionName = collection.name;
        const model = mongoose.models[collectionName] || mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }));
        const data = await model.find({}).lean();
        allData[collectionName] = data;
      }
  
      console.log('All Data:', allData); 
      return NextResponse.json({ success: true, data: allData });
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      return NextResponse.json({ success: false, error: `An error occurred while fetching data: ${error.message}` }, { status: 500 });
    }
  }
