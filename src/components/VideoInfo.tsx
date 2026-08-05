import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const VideoInfo = ({ video }: any) => {
  const [likes, setLikes] = useState(video.Like || 0);
  const [dislikes, setDislikes] = useState(video.Dislike || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const user: any = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    image: "https://github.com/shadcn.png?height=32&width=32",
  };

  useEffect(() => {
    setLikes(video.Like || 0);
    setDislikes(video.Dislike || 0);
    setIsLiked(false);
    setIsDisliked(false);
  }, [video]);

  const handleLike = () => {
    if (!user) return;
    if (isLiked) {
      setLikes((prev: any) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev: any) => prev + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes((prev: any) => prev - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!user) return;
    if (isDisliked) {
      setDislikes((prev: any) => prev - 1);
      setIsDisliked(false);
    } else {
      setDislikes((prev: any) => prev + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes((prev: any) => prev - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">{video.videotitle}</h1>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{video.videochanel[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{video.videochanel}</h3>
            <p className="text-sm text-gray-600">1.2M subscribers</p>
          </div>
          <Button className="ml-4">Subscribe</Button>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-100 rounded-full"
              onClick={handleLike}
            >
              <ThumbsUp className="w-5 h-5 mr-2" />
              {likes.toLocaleString()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-100 rounded-full"
              onClick={handleDislike}
            >
              <ThumbsDown className="w-5 h-5 mr-2" />
              {dislikes.toLocaleString()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-100 rounded-full"
            >
              <Share className="w-5 h-5 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-100 rounded-full"
            >
              <Download className="w-5 h-5 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-gray-100 rounded-full"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex gap-4 text-sm font-medium mb-2">
          <span>{video.views.toLocaleString()} views</span>
          <span>{formatDistanceToNow(new Date(video.createdAt))} ago</span>
        </div>
        <div className={`text-sm ${showFullDescription ? "" : "line-clamp-3"}`}>
          <p>
            Sample video description. This would contain the actual video
            description from the database.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 p-0 h-auto font-medium"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
};

export default VideoInfo;