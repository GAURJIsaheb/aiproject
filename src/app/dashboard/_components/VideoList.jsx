import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import axios from 'axios';
import { Trash2, Play } from 'lucide-react'; // Import icons from lucide-react
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ VideoListData, SetVideoListData }) {
  const [openPlayerDialog, setopenPlayerDialog] = useState(false);
  const [videoId, setvideoId] = useState();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDelete = async (video) => {
    try {
      const response = await axios.delete('/api/deleteOption', { data: { id: video.id } });
  
      if (response.status === 200) {
        SetVideoListData(VideoListData.filter((item) => item.id !== video.id));
      } else {
        console.error("Failed to delete video");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {VideoListData.map((video, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
              <div className="aspect-[5/7] relative">
                <Thumbnail
                  component={RemotionVideo}
                  compositionWidth={250}
                  compositionHeight={350}
                  frameToDisplay={30}
                  durationInFrames={120}
                  fps={30}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  inputProps={{
                    ...video,
                    setTotalduration: (v) => console.log(v),
                  }}
                />
                
                {/* Overlay with actions */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <button
                    onClick={() => {
                      setopenPlayerDialog(Date.now());
                      setvideoId(video?.id);
                    }}
                    className="bg-white/90 text-black p-4 rounded-full transform hover:scale-110 transition-all duration-300"
                    aria-label="Play video"
                  >
                    <Play className="w-6 h-6" />
                  </button>
                </div>

                {/* Delete button */}
                <button
                  className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(video);
                  }}
                  aria-label="Delete video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Video title or additional info can go here */}
              {video.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-sm font-medium truncate">
                    {video.title}
                  </h3>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  );
}

export default VideoList;