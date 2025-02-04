import { NextResponse } from "next/server";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import RemotionVideo from "@/components/RemotionVideo"; // Adjust this path as needed

export async function POST(req) {
  try {
    const { videoId, frameValues, fetchedData } = await req.json();

    const outputPath = path.join(process.cwd(), "public", `video-${videoId}.mp4`);

    // Render video
    await renderMedia({
      composition: {
        component: RemotionVideo,
        durationInFrames: frameValues,
        fps: 30,
        width: 300,
        height: 450,
        inputProps: fetchedData,
      },
      outputLocation: outputPath,
      codec: "h264",
    });

    return NextResponse.json({ success: true, url: `/video-${videoId}.mp4` });
  } catch (error) {
    console.error("Rendering error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
