import axios, {AxiosInstance} from 'axios';
import {store, persistor}from '@/redux/store';
import { setAccessToken, setRefreshToken } from '@/redux/slice/authSlice';

const getClient = (baseUrl: null | string = null, accessToken: string | null = null):AxiosInstance => {
  const headers: Record<string, string> = {};

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  
  const options = {
    baseURL: baseUrl,
    headers: headers, // Pass the headers object to the Axios options
  };


  const client = axios.create(options);




  // Add a request interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const orefreshToken = store.getState().auth.refreshToken;
      
      if (error.response.status === 401 && orefreshToken) {
        
        try {
          const headers = { Authorization: `Bearer ${orefreshToken}` };
          const response = await client.get('/auth/refresh', { headers });
          console.log('refresh token response', response)
          const { accessToken, refreshToken }:any = response.data;
          store.dispatch(setAccessToken(accessToken));
          store.dispatch(setRefreshToken(refreshToken));
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
  //accessToken;
  client: any;
  constructor(token: string | null = null) {
   // this.accessToken = token;
    this.client = getClient(process.env.NEXT_PUBLIC_API_URL, store.getState()?.auth?.accessToken);
  }

  async signUp(signUpData: { name: string; username: string; email: string; password: string }) {
    return this.client.post('/auth/signup/', signUpData);
  }

  async signin(loginData:{username: string; password: string }) {
    return this.client.post('/auth/signin', loginData);
  }

  async logout() {
    return this.client.get(`/auth/logout/`);
  }

  async getUserById(userId: string) {
    return this.client.get(`/users/${userId}`);
  }

  async getMe() {
    return this.client.get(`/users/me`);
  }

  async createExercise(exerciceData: { name: string; muscles: string[] }) {
    return this.client.post(`/exercises`, exerciceData);
  }

  async getExercices() {
    return this.client.get(`/exercises/me`);
  }


  async createSeance(seanceData:any) {
    return this.client.post(`/seances`, seanceData);
  }

  async getSeances() {
    return this.client.get(`/seances/me`);
  }

  async getSeance(id:string) {
    const data = this.client.get(`/seances/${id}`);
    //console.log('seance', data)
    return data;
  }
  

  // Add more API functions as needed

  
}

export default ApiClient;