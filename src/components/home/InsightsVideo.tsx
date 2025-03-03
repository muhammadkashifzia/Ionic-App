import { useState, useEffect } from "react";
import {

  IonImg,
  IonSpinner,
} from "@ionic/react";
import YouTube from "react-youtube";
import { useGetAllVideos } from "../../hooks/useVideos";
import  PlayIconSvg from "../../assets/svgs/playIcon.svg";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?fm=jpg&q=60&w=3000";

const InsightsVideo: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = useGetAllVideos(); // Ensure you use mutateAsync for async calls
  const [videoItems, setVideoItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await mutateAsync();
        if (response?.data) {
          const sortedVideos = response.data
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3);
          setVideoItems(sortedVideos);
        }
      } catch (err) {
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [mutateAsync]);

  const getYouTubeId = (url: string): string | null => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/.*[?&]v=|youtube\.com\/embed\/|youtube\.com\/v\/)([^?&]+)/
    );
    return match ? match[1] : null;
  };

  return (
    <div className="px-6">
        <div className="mb-[16px]">
          <h2>エクササイズビデオ</h2>
        </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <IonSpinner name="crescent" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          videoItems.map((video) => {
            const videoId = getYouTubeId(video.url);
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : FALLBACK_IMAGE;

            return (
              <div key={video._id} className="mb-4 relative">
                {playingVideo !== videoId ? (
                 <div className="relative"> 
                   <IonImg
                    src={thumbnailUrl}
                    className="rounded-t-lg cursor-pointer thumbnail-image"
                 
                  />
                  <IonImg src={PlayIconSvg} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px]"    onClick={() => setPlayingVideo(videoId)}/>
                  </div>
                ) : (
                  <div className="relative">
                    <YouTube videoId={videoId!} className="youtube-view" />
                    <button
                      color="light"
                      className="absolute top-2 right-2"
                      onClick={() => setPlayingVideo(null)}
                    >
                      ✖
                    </button>
                  </div>
                )}
                <div>
                  <h3>{video.title}</h3>
                </div>
                <p>{video.description}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default InsightsVideo;
