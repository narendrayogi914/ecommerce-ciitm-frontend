import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000", // ✅ set base URL here
  baseURL: "https://ecommer-ciitm-project-backend.onrender.com/",
  withCredentials: true, // if you're using cookies for auth
});

export default axiosInstance;
