import Axios from "axios";

export const api = Axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 10 * 1000, // seconds
});

api.interceptors.request.use(function (config) {
  config.headers.Authorization = "nice-token";
  return config;
});
