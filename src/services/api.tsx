import axios from 'axios';
import { Storage } from '@capacitor/storage';
// import AsyncStorage from '@capacitor/storage';

let baseURL = 'https://nailbiting-server.vercel.app/api/v1';

const api = axios.create({
  baseURL, // Use this for Android Emulator
  headers: {
    'Content-Type': 'application/json'
  }
});
api.interceptors.request.use(
  async config => {
    try {
      const userLocal = await Storage.get({ key: 'userValue' });
      const accessToken = userLocal.value ? JSON.parse(userLocal.value).user.accessToken : null;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.log('Error fetching access token from Storage', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const userLocal = await Storage.get({ key: 'userValue' });
      const user = userLocal.value ? JSON.parse(userLocal.value) : null;
      const refreshToken = JSON.parse(user).user.refreshToken;
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${baseURL}/auth/refresh-access-token`,
            { refreshToken }
          );
          const newAccessToken = response.data.accessToken;
          let userData = {
            ...user,
            accessToken: newAccessToken
          };
          await Storage.set({ key: 'userValue', value: JSON.stringify(userData) });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (error) {
          // location.reload();
          await Storage.remove({ key: 'userValue' });
        }
      } else {
        // location.reload();
        await Storage.remove({ key: 'userValue' });
      }
    }
    return Promise.reject(error);
  }
);

export { api };
