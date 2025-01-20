import axios, { AxiosInstance } from 'axios';
import {ApiErrorHandler} from './errorHandler';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      // Important for cookie-based auth
      withCredentials: true,
      timeout: 10000,
    });

    // Response interceptor for handling unauthorized access
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 Unauthorized globally
        if (error.response?.status === 401) {
          // Redirect to login page
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async getData<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.api.get<T>(endpoint);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  }

  async postData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await this.api.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  }

  async updateData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await this.api.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  }

  async deleteData<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.api.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  }
}

export const apiService = new ApiService();