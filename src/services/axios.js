// Importing Axios library
import axios from "axios";

// Base URL for API requests
const baseURL = "http://localhost:8000";

// Creating an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL,
});

// Adding an interceptor to the Axios instance to handle responses
axiosInstance.interceptors.response.use(
  // Success handler: returning the response directly
  (response) => response,
  // Error handler: returning a rejected promise with the error
  (error) => {
    return Promise.reject(error);
  }
);

// Exporting the configured Axios instance as a default export
export default axiosInstance;
