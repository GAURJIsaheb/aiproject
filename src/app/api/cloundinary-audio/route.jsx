import {cloudinary } from '../../../../configs/CloudinaryConfig';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File not found in request" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "aiproject-audio-folder", resource_type: "video" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }

      );
      if (!cloudinary.uploader || !cloudinary.uploader.upload_stream) {
        throw new Error("Cloudinary uploader or upload_stream is undefined");
      }
      
      audioStream.pipe(uploadStream); // Replace `audioStream` with your actual stream
    });
    

    return NextResponse.json({ public_id: result.public_id, secure_url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Audio Upload Failed:", error);
    return NextResponse.json({ error: "Audio Upload Failed" }, { status: 500 });
  }
}
