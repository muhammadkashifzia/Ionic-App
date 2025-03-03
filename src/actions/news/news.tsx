import { api } from '../../services/api';
export interface News {
  id: string;
  title: string;
  body: string;
}

export interface NewsResponse {
  data: News[];
}

export const getAllNews = async (id: string): Promise<NewsResponse> => {
  const response = await api.get(`/news/user/${id}`);
  return response.data;
};
export interface NewsByIdResponse {
  data: News;
}

export const getNewsById = async (id: string): Promise<NewsByIdResponse> => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};
export interface AddNewsValues {
  title: string;
  content: string;
}

export interface AddNewsResponse {
  data: News;
}

export const addNews = async (values: AddNewsValues): Promise<AddNewsResponse> => {
  const response = await api.post('/news/add', {
    title: values.title,
    body: values.content
  });
  return response.data;
};
export interface DeleteNewsResponse {
  data: News;
}

export const deleteNews = async (id: string): Promise<DeleteNewsResponse> => {
  const response = await api.delete(`/news/delete/${id}`);

  return response.data;
};
export interface UpdateNewsValues {
  title: string;
  content: string;
}

export interface UpdateNewsResponse {
  data: News;
}

export const updateNews = async (id: string, values: UpdateNewsValues): Promise<UpdateNewsResponse> => {
  const response = await api.put(`/news/update/${id}`, {
    title: values.title,
    body: values.content
  });

  return response.data;
};


