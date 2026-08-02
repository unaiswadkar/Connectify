import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://connectify-hu48.onrender.com",
  withCredentials: true,
});
