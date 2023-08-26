import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  }
};
