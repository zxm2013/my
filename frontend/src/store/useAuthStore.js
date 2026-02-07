@ -3,7 +3,11 @@ import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (API_BASE_URL ? API_BASE_URL.replace(/\/api\/?$/, "") : null) ||
  (import.meta.env.MODE === "development" ? "http://localhost:5001" : "/");

export const useAuthStore = create((set, get) => ({
  authUser: null,
