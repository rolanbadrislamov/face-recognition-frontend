// Importing the Axios instance from "../services/axios"
import axiosInstance from "../services/axios";

// Function to set the user session with the access token
export const setSession = (accessToken) => {
  // Checking if the access token is provided
  if (accessToken) {
    // Setting the access token in the local storage
    localStorage.setItem("accessToken", accessToken);

    // Setting the Authorization header for all Axios requests
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    // If no access token is provided, remove it from the local storage
    localStorage.removeItem("accessToken");

    // Also, delete the Authorization header from the Axios instance
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Function to reset the user session by removing the access token
export const resetSession = () => {
  // Removing the access token from the local storage
  localStorage.removeItem("accessToken");

  // Also, deleting the Authorization header from the Axios instance
  delete axiosInstance.defaults.headers.common["Authorization"];
};
