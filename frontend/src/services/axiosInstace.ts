import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://kitchenflowapi.azurewebsites.net",
  timeout: 1000000,
});

export default axiosInstance;
