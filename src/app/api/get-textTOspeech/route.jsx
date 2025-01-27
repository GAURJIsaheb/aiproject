import path from "path";
import say from "say";
import { promises as fs } from "fs";
import {cloudinary } from "../../../../configs/CloudinaryConfig";

export async function POST(req) {
  const { script, id } = await req.json();

  if (!script) {
    return new Response(JSON.stringify({ error: "No script provided" }), { status: 400 });
  }

  try {
    // Generate audio locally
    const fileName = `${id}.mp3`;
    const filePath = path.join(process.cwd(), "public", fileName);

    await new Promise((resolve, reject) => {
      say.export(script, "Microsoft Zira Desktop", 1.0, filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Read generated audio file
    const audioBuffer = await fs.readFile(filePath);
    // Log cloudinary to check if it's properly initialized
    console.log(cloudinary);  // Add this log to check the object

 // Upload audio to Cloudinary
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "aiproject-audio-folder", resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(audioBuffer);
  });

    // Delete local audio file after upload
    await fs.unlink(filePath);

    return new Response(
      JSON.stringify({
        message: "Audio generated and uploaded",
        audioUrl: result.secure_url,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in audio generation/upload:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate and upload audio" }),
      { status: 500 }
    );
  }
}
