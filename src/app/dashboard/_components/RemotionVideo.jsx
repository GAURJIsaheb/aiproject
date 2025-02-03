import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

function RemotionVideo({ audiofileUrl, captions, imagesUrl, videoScript, setTotalduration }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  useEffect(() => {
    if (captions?.length > 0) {
      const totalDuration = (captions[captions.length - 1]?.end / 1000) * fps;
      setTotalduration(totalDuration);
    }
  }, [captions, fps, setTotalduration]);

  const getDurationFrames = () => {
    return captions?.length > 0 ? (captions[captions.length - 1]?.end / 1000) * fps : 100;
  };

  const GetCorrectCaptions = () => {
    const currentTime = frame / 30 * 1000;
    const currentCaptions = captions.find((word) => currentTime >= word.start && currentTime <= word.end);
    return currentCaptions ? currentCaptions?.text : '';
  };

  return (
    <AbsoluteFill className="bg-black">
      {imagesUrl?.map((item, index) => {
        const sequenceStart = (index * getDurationFrames()) / imagesUrl?.length;
        const sequenceDuration = getDurationFrames() / imagesUrl?.length;
        
        return (
          <Sequence
            key={index}
            from={sequenceStart}
            durationInFrames={sequenceDuration}
          >
            <AbsoluteFill>
              {/* Image with Ken Burns effect */}
              <div style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative"
              }}>
                <img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${interpolate(
                      frame - sequenceStart,
                      [0, sequenceDuration],
                      [1.1, 1.2],
                      { extrapolateRight: "clamp" }
                    )})`,
                    transition: "transform 0.5s ease-out"
                  }}
                />
              </div>

              {/* Animated captions */}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center items-end">
                <div
                  style={{
                    opacity: spring({
                      frame: frame - sequenceStart,
                      fps,
                      config: { damping: 100, mass: 0.5 }
                    }),
                    transform: `translateY(${interpolate(
                      spring({
                        frame: frame - sequenceStart,
                        fps,
                        config: { damping: 100, mass: 0.5 }
                      }),
                      [0, 1],
                      [20, 0]
                    )}px)`,
                  }}
                  className="bg-black/50 px-6 py-3 rounded-lg backdrop-blur-sm"
                >
                  <h2 className="text-white font-bold text-2xl text-center">
                    {GetCorrectCaptions()}
                  </h2>
                </div>
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {audiofileUrl && (
        <Audio src={audiofileUrl} />
      )}
    </AbsoluteFill>
  );
}

export default RemotionVideo;