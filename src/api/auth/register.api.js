import axiosInstance from "../axiosConfig";

export const registerAPI = (data) => {
  return axiosInstance.post("/user/register", data);
};
