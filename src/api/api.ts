import {
  ApiErrorToast,
  showApiErrorToast,
} from "@/components/toast/errorToast";
import { BASE_API_URL } from "@/utils/constants";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // Optional: Set request timeout
});

// Optional: Add request interceptor (e.g., for auth tokens)
api.interceptors.request.use(
  (config) => {
    // Example: Attach token if needed
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI1MmYxMDZiMWQ2ZjMzZjk0ODMwMTAzNGEyODk5ZmY0NzM1YzBmYjRkZmRmZTE2NWVmMDY4NzA3ZTk0NmY1OGZlODUyZDVlNDZmMjBkY2QxIn0.eyJhdWQiOiIxMTA2IiwianRpIjoiYjUyZjEwNmIxZDZmMzNmOTQ4MzAxMDM0YTI4OTlmZjQ3MzVjMGZiNGRmZGZlMTY1ZWYwNjg3MDdlOTQ2ZjU4ZmU4NTJkNWU0NmYyMGRjZDEiLCJpYXQiOjE3Mjc5NDgzOTAsIm5iZiI6MTcyNzk0ODM5MCwiZXhwIjoxNzU5NDg0MzkwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.apqdzw0PY3a3E44emHJnXV2HIML1YDix8X0d6Cg0Usrahcezuk_78CUUuCbcEVcYfT8qAgS25nZOD2jfQQ7mTxbdlaouf0KsTxocv0DLEuhitU3RKr4ahOHTf_7hNdFLUtvim1JTdSKJdI6EpXDUGI7r8Btc8n9VzfxqCdJO7zRnBloSJwtxfghnWo9uo2yhLLRmXuuOUtP7OrsFw47agNgnppyEZwEVF2gS4yN5lWOITgSMTTZI-Q-K9aXOsEM4sgNNnXKUfR-Ut1G_VCkOUda7uvBBb1Vst2JPBGc7DFDiWxpgKQOjFAaiq_liiw9lVf5v2ClvIaipNwbo7XL1kqQxrHY5--5sTfFGhc6hswVSSJZVYwU-NIVQQd7XAgaJquZFXZ4mcAke3DP3hpULSlK9CWMO-kej4haS2HuSbTORhukzLeIeRzyfkfvOXbArd2gR0HASgyYoTAF9_yl0GqmhiKa9Aqwg4-5BbZY6SHUEyf3pfdU28G_i6d2UBRxKhMHjrA2a9x7zGZJhFTDBeILaxCQ3M_3Z6oO_AlqTywz9e97q7bhissThs8-hZrufEcjZp3Rmgiy97cNocS6lfjQNl72wHj_6X28M6CyibBz1vFMz7z78w4vhB4A3qVTlnNcIloAuFbag6snhBw36eqkXIqCNfTcERPlnmVK8EhI";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor (e.g., for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const axiosRequestWrapper = async <T>(
  requestFn: (...args: any[]) => Promise<{ data: T }>,
  ...args: any[]
): Promise<T> => {
  try {
    const response = await requestFn(...args);
    return response.data;
  } catch (error) {
    let errorMessage = "An unexpected error occurred";
    let statusCode;
    let endpoint;

    if (error instanceof AxiosError) {
      statusCode = error.response?.status;
      errorMessage = error.message || error.response?.data?.message;
      endpoint = error.config?.url; // Get the endpoint
    }
    showApiErrorToast(errorMessage, statusCode, endpoint);
    throw error; // Rethrow error for further handling
  }
};
export default api;
