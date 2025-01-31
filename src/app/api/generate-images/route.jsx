import Replicate from "replicate";
import { NextResponse } from "next/server";
import { cloudinary } from "../../../../configs/CloudinaryConfig"; // Ensure correct path

export async function POST(req) {
  try {
    const { promptdata } = await req.json();

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: promptdata,
      width: 1024,
      height: 1024,
      num_outputs: 1,
    };

    // Generate Image from Replicate
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    if (!output || !output[0]) {
      throw new Error("Replicate AI did not return a valid image URL");
    }

    const imageUrl = output[0]; // Extract the correct URL string
    console.log("Generated Image URL:", imageUrl);

    // Generate a unique filename using Date.now()
    const uniqueFilename = `ai-image-${Date.now()}`;

    // Upload Image to Cloudinary with a unique filename
    const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl.toString(), {
      folder: "aiproject-images",
      resource_type: "image",
      public_id: uniqueFilename, // Assign unique name
    });

    console.log("Cloudinary Upload Response:", cloudinaryResponse);

    return NextResponse.json({
      result: cloudinaryResponse.secure_url, // Return Cloudinary image URL
      public_id: cloudinaryResponse.public_id, // Return public ID for reference
    });
  } catch (error) {
    console.error("Error in generating & uploading image:", error);
    return NextResponse.json(
      { error: "Image generation & upload failed: " + error.message },
      { status: 500 }
    );
  }
}
