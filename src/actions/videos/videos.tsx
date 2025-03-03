import { api } from "../../services/api";
export const getAllVideos = async () => {
  const response = await api.get("/video/all");
  return response.data;
};
interface Video {
  title: string;
  description: string;
  youtubeLink: string;
  createdBy: string;
}

interface VideoResponse {
  data: any;
}

export const deleteVideo = async (id: string): Promise<VideoResponse> => {
  const response = await api.delete(`/video/delete/${id}`);
  return response.data.data;
};
interface AddVideoValues {
  title: string;
  description: string;
  youtubeLink: string;
  createdBy: string;
}

interface AddVideoResponse {
  data: any;
}

export const addVideo = async (values: AddVideoValues): Promise<AddVideoResponse> => {
  const response = await api.post("/video/add", { title: values.title, description: values.description, url: values.youtubeLink, createdBy: values.createdBy });
  return response.data;
};
interface VideoOrder {
  id: string;
  order: number;
}

interface SaveVideoOrderResponse {
  data: any;
}

export const saveVideoOrder = async (videos: VideoOrder[]): Promise<SaveVideoOrderResponse> => {
  const response = await api.put("/video/order", { videos: videos });
  return response.data;
};