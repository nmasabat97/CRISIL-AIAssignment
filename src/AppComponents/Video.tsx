import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Indicator from "../ReusableComponents/Indicator";

// Sample Transcript Data (This can come from an API or static data)
const transcriptData = [
  { time: 0, text: "Welcome to this video tutorial!" },
  { time: 10, text: "In this video, we will learn how to use React." },
  { time: 30, text: "Now, let's dive into components and props." },
  { time: 50, text: "Next, we will look at state and hooks in React." },
  { time: 70, text: "Finally, we will wrap up the tutorial with some best practices." },
];

const VideoTutorial: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [watchedSections, setWatchedSections] = useState<number[]>([]);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const watched = transcriptData.filter(item => item.time <= currentTime).map(item => item.time);
    setWatchedSections(watched);
  }, [currentTime]);

  const onReady = (event: any) => {
    const playerInstance = event.target;
    setPlayer(playerInstance);
    const duration = playerInstance.getDuration();
    setVideoDuration(duration);
    playerInstance.playVideo();
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const progressPercentage = (currentTime / videoDuration) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const current = player.getCurrentTime();
        setCurrentTime(current);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [player]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row">
        {/* Video Section */}
        <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
          <YouTube
            videoId="M7lc1UVf-VE"
            onReady={onReady}
            opts={{
              height: "390",
              width: "640",
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </div>

        {/* Transcript Section */}
        <div className="w-full lg:w-1/3 lg:pl-6">
          <h2 className="text-xl font-semibold">Your Notes</h2>
          <textarea
            value={notes}
            onChange={handleNoteChange}
            rows={6}
            className="w-full p-4 border rounded-lg mt-2"
            placeholder="Write your notes here..."
          />
        </div>
      </div>

      {/* Video Progress Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Video Progress</h2>
        <Indicator progress={progressPercentage} unhide={false}/>
        <p className="text-sm mt-2">Progress: {Math.round(progressPercentage)}%</p>
      </div>

      {/* Note-taking Section */}
      <div className="mt-6">


        <h2 className="text-xl font-semibold mb-4">Transcript</h2>
        <div className="overflow-y-auto h-96 p-4 border rounded-lg">
          {transcriptData.map((item, index) => (
            <p
              key={index}
              className={`p-2 mb-2 rounded-md ${watchedSections.includes(item.time) ? "bg-green-100" : "bg-white"
                }`}
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoTutorial;
