"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import VideoPlayer from "@/components/VideoPlayer";
import VideoInfo from "@/components/VideoInfo";
import Comments from "@/components/Comments";
import RelatedVideos from "@/components/RelatedVideos";

const WatchPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get(`/video/${id}`);
        setVideo(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!video) return <div className="p-4">Video not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer video={video} />
            <VideoInfo video={video} />
            <Comments videoId={id} />
          </div>
          <div className="space-y-4">
            <RelatedVideos videos={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;