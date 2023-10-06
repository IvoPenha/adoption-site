import axios from "axios";
import { Cache } from "../core";
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = Cache.get({ key: "userToken" });
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
