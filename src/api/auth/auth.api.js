import axiosInstance from "../axiosConfig";

export const loginAPI = (formData) =>
  axiosInstance.post("/user/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
