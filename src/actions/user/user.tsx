import { api } from '../../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export const getAllUsers = async (page: number): Promise<User[]> => {
  const response = await api.get(`/user/all?page=${page}`);
  return response.data.data;
};

export const deleteUser = async (id: string): Promise<any> => {
  const response = await api.delete(`/user/delete/${id}`);
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/user/${id}`);
  return response.data.data;
};

export const searchUsers = async (search: string, page: number): Promise<User[]> => {
  const response = await api.get(`/user/search?q=${search}&page=${page}`);
  return response.data?.data;
};

export const updateUserById = async (id: string, user: Partial<User>): Promise<any> => {
  const response = await api.put(`/user/update/${id}`, user);
  return response.data;
};

export const changeEmail = async (email: { email: string; newEmail: string }): Promise<any> => {
  const response = await api.put('/user/change-email', email);
  return response.data;
};

export const verifyEmail = async (data: { email: string; newEmail: string; otp: string }): Promise<any> => {
  try {
    const response = await api.post('/auth/change-email-verify', data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Verify Email API Error:', error.response?.data || error);
    throw error;
  }
};

export const updatePassword = async (data: { password: string; newPassword: string }): Promise<any> => {
  try {
    const response = await api.put('/user/change-password', data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Password change API Error:', error.response?.data || error);
    throw error;
  }
};
