import axios, { AxiosError } from 'axios';
import { ApiError } from '../models/error';

export class ApiErrorHandler {
  static handle(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      
      // Handle validation errors
      if (axiosError.response?.status === 422) {
        return {
          message: axiosError.response.data.detail || 'Validation failed',
          code: 'VALIDATION_ERROR',
          status: 422
        };
      }

      // Handle backend errors
      if (axiosError.response?.data) {
        return {
          message: axiosError.response.data.detail || 'An error occurred',
          code: axiosError.response.data.code || 'UNKNOWN_ERROR',
          status: axiosError.response.status || 500
        };
      }

      // Handle network errors
      if (axiosError.code === 'ERR_NETWORK') {
        return {
          message: 'Network error - please check your connection',
          code: 'NETWORK_ERROR',
          status: 0
        };
      }
    }

    return {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      status: 500
    };
  }
}