"use client";
import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db_VAR } from "../../../../configs/db";
import { videoDataTableName } from "../../../../configs/schema";
import { eq } from "drizzle-orm";

function PlayerDialog({ playVideo, videoId, onClose }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [fetchedData, setFetchedData] = useState();
  const [frameValues, setFrameValues] = useState(100);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playVideo) {
      setOpenDialog(true);
      if (videoId) GetVideoData();
    }
  }, [playVideo]);

  // Fetch video data from the database
  const GetVideoData = async () => {
    const result = await db_VAR
      .select()
      .from(videoDataTableName)
      .where(eq(videoDataTableName.id, videoId));

    console.log("Fetched Result is:", result);
    setFetchedData(result[0]);
  };

  // Handle cancel button
  const handleCancel = () => {
    setOpenDialog(false);
    setDownloadUrl(null);
    onClose?.(); // Call parent close function if provided
  };

  // Handle video export
  const handleExport = async () => {
    console.log("Exporting video...");
    setLoading(true);

    try {
      const res = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, frameValues, fetchedData }),
      });

      const data = await res.json();
      if (data.success) {
        setDownloadUrl(data.url);
        console.log("Video rendered successfully:", data.url);
      } else {
        console.error("Video rendering failed:", data.error);
      }
    } catch (error) {
      console.error("Error exporting video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className=" justify-center sm:p-4 rounded-lg bg-white shadow-lg max-w-md w-full">
        <DialogHeader className="p-0">
          <DialogTitle className="text-lg font-bold text-center my-2">
            Requested Video
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Player
          component={RemotionVideo}
          durationInFrames={Number(frameValues.toFixed(0))}
          compositionWidth={300}
          compositionHeight={450}
          fps={30}
          controls={true}
          inputProps={{
            ...fetchedData,
            setTotalduration: (Totalduration) => setFrameValues(Totalduration),
          }}
        />

        <div className="flex justify-center gap-5 mt-4">
          <Button onClick={handleCancel}  className="bg-black text-white">
            Cancel
          </Button>
          <Button onClick={handleExport} className="bg-purple-700" disabled={loading}>
            {loading ? "Exporting..." : "Export"}
          </Button>
        </div>

        {downloadUrl && (
          <div className="text-center mt-4">
            <a href={downloadUrl} download className="text-blue-500 font-bold">
              Download Video
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;

//npm install @remotion/renderer --> used in Exporting the video

