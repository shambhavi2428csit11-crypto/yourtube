import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://yourtube-backend-4g9s.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;