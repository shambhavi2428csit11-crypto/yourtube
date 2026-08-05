import React from "react";
import VideoCard from "./videocard";

const ChannelVideos = ({ videos }: any) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No videos uploaded yet</p>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-8 py-4">
      <h2 className="text-lg font-semibold mb-4">Videos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videos.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default ChannelVideos;