import axios from 'axios';
import store from '@/redux/store';
import { setAccessToken, setRefreshToken } from '@/redux/authSlice';

const getClient = (baseUrl = null)=> {

  const options = {
    baseURL: baseUrl
  };
  const client = axios.create(options);
  // Add a request interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = store.getState().auth.refreshToken;
      
      if (error.response.status === 401 && refreshToken) {
        
        try {
          const headers = { Authorization: `Bearer ${refreshToken}` };
          const response = await client.get('/auth/refresh', { headers });
          console.log(response.data)
          const { accessToken, newRefreshToken } = response.data;
          store.dispatch(setAccessToken(accessToken));
          store.dispatch(setRefreshToken(newRefreshToken));
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error) {
          console.error('Error refreshing tokens:', error);
          // Redirect to login or handle the error as needed
          throw error;
        }
      }

      return Promise.reject(error);
    }
  );
  
 
  return client;
};






class ApiClient {
  client: any;
  constructor() {
    this.client = getClient('http://localhost:8080');
  }

  async signUp(signUpData: { name: string; username: string; email: string; password: string }) {
    return this.client.post('/auth/signup/', signUpData);
  }

  async signin(loginData:{username: string; password: string }) {
    return this.client.post('/auth/signin', loginData);
  }

  async logout() {
    const accessToken = store.getState().auth.accessToken;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.client.get(`/auth/logout/`, { headers });
  }

  async getUserById(userId: string) {
    return this.client.get(`/users/${userId}`);
  }

  async getMe() {
    const accessToken = store.getState().auth.accessToken;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.client.get(`/users/me`, { headers });
  }

  async createExercise(exerciceData: { name: string; muscles: string[] }) {
    const accessToken = store.getState().auth.accessToken;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.client.post(`/exercises`, exerciceData, { headers });
  }

  async getExercices() {
    const accessToken = store.getState().auth.accessToken;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.client.get(`/exercises/me`, { headers });
  }



  

  // Add more API functions as needed

  
}

export default ApiClient;