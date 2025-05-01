import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        return Promise.reject({
          message: error.response.data?.error || 'Request failed',
          status: error.response.status,
        });
      }
      return Promise.reject({ message: 'Network error', status: 500 });
    }
  );

export default apiClient;