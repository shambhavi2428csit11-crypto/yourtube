import React, { useState, useEffect } from "react";
import Link from "next/link";

const SearchResult = ({ query }: any) => {
  const [video, setvideos] = useState(null);

  const videos = async () => {
    const allVideos = [
      {
        _id: "1",
        videotitle: "Amazing Nature Documentary",
        filename: "nature-doc.mp4",
        filetype: "video/mp4",
        filepath: "/videos/nature-doc.mp4",
        filesize: "500MB",
        videochanel: "Nature Channel",
        Like: 1250,
        views: 45000,
        uploader: "nature_lover",
        description:
          "Sample video description that would show search-relevant content and help users understand what the video is about before clicking.",
        duration: "10:24",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        videotitle: "Cooking Tutorial: Perfect Pasta",
        filename: "pasta-tutorial.mp4",
        filetype: "video/mp4",
        filepath: "/videos/pasta-tutorial.mp4",
        filesize: "300MB",
        videochanel: "Chef's Kitchen",
        Like: 890,
        views: 23000,
        uploader: "chef_master",
        description: "Learn how to make perfect pasta from scratch.",
        duration: "8:15",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      // add more videos here if you have them
    ];

    const results = allVideos.filter(
      (vid) =>
        vid.videotitle.toLowerCase().includes(query.toLowerCase()) ||
        vid.videochanel.toLowerCase().includes(query.toLowerCase())
    );
    setvideos(results);
  };

  useEffect(() => {
    videos();
  }, [query]);

  if (!query.trim()) {
    return (
      <div>
        <p>Enter a search term to find videos</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-gray-600">
          Try different keywords or remove search filters
        </p>
      </div>
    );
  }

  const hasResults = video.length > 0;

  if (!hasResults) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-gray-600">
          Try different keywords or remove search filters
        </p>
      </div>
    );
  }

  const timeAgo = (dateString: string) => {
    const seconds = Math.floor(
      (Date.now() - new Date(dateString).getTime()) / 1000
    );
    if (seconds < 60) return "less than a minute ago";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-lg mb-2">Search results for "{query}"</h1>

      {/* Video Results */}
      <div className="space-y-4">
        {video.map((v: any) => (
          <div key={v._id} className="flex gap-4 group">
            <Link href={`/watch/${v._id}`} className="flex-shrink-0">
              <div className="relative w-80 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={v.filepath}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  muted
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {v.duration}
                </span>
              </div>
            </Link>

            <div className="flex flex-col">
              <Link href={`/watch/${v._id}`}>
                <h3 className="text-base font-medium hover:text-blue-600">
                  {v.videotitle}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 mt-1">
                {v.views.toLocaleString()} views • {timeAgo(v.createdAt)}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                  {v.videochanel.charAt(0)}
                </div>
                <span className="text-sm text-gray-700">{v.videochanel}</span>
              </div>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {v.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;