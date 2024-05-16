import axiosInstance from "../services/axios";

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export const resetSession = () => {
  localStorage.removeItem("accessToken");
  delete axiosInstance.defaults.headers.common["Authorization"];
};