import axios from "axios";

export const client = axios.create({
  baseURL: `http://${process.env.REACT_APP_RESTAPI_IP}`,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
