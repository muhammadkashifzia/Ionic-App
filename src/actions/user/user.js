import { api } from '../../services/api';


export const getAllUsers = async page => {
  const response = await api.get(`/user/all?page=${page}`);
  return response.data.data;
};

export const deleteUser = async id => {
  const response = await api.delete(`/user/delete/${id}`);
  return response.data;
};
export const getUserById = async id => {
  const response = await api.get(`/user/${id}`);
  return response.data.data;
};
export const searchUsers = async (search, page) => {
  const response = await api.get(`/user/search?q=${search}&page=${page}`);
  return response?.data?.data;
};

export const updateUserById = async (id, user) => {
  const response = await api.put(`/user/update/${id}`, user);
  return response?.data;
};
export const changeEmail = async email => {
  const response = await api.put('/user/change-email', email);
  return response.data;
};

export const verifyEmail = async data => {
  try {
    const payload = { email: data.email,newEmail:data.newEmail, otp: data.otp };
    const response = await api.post('/auth/change-email-verify', payload);
    return response.data;
  } catch (error) {
    console.log('❌ Verify Email API Error:', error.response?.data || error);
    throw error;
  }
};

export const updatePassword = async data => {
  try {
    await AsyncStorage.getItem('userValue');
    const response = await api.put('/user/change-password', {
      password: data.password,
      newPassword: data.newPassword
    });

    return response.data;
  } catch (error) {
    console.log('❌ Password change api error API Error:',error.response?.data || error);
    throw error;
  }
};
