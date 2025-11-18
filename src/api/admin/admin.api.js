import axiosInstance from "../axiosConfig";

export const adminRegisterAPI = (data) => {
  return axiosInstance.post("/admin/register", data);
};
