import { AUTH_COOKIE_KEY_TOKEN } from "@/contexts/authContext";
import { getCookieValue } from "@/utils/cookie";
import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const initInstance = (config: CreateAxiosDefaults): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000, // 5 seconds
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    ...config,
  });

  instance.interceptors.request.use((config) => {
    const authToken = getCookieValue(AUTH_COOKIE_KEY_TOKEN);
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiInstance = initInstance({
  baseURL: apiBaseUrl,
});
