import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
const vid = "/video/file_example_MP4_480_1_5MG.mp4";
const RelatedVideos = ({ videos }: any) => {
  return (
    <div>
      {videos.map((video: any) => (
        <Link key={video._id} href={`/watch/${video._id}`}>
          <div>
            <video src={vid} />
          </div>
          <div>
            <h3>{video.videotitle}</h3>
            <p>{video.videochanel}</p>
            <p>{video.views.toLocaleString()} views {formatDistanceToNow(new Date(video.createdAt))}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideos;