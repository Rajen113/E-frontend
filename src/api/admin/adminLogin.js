import { authAPI } from "../instances";

export const AdminLoginAPI = (formData) =>
  authAPI.post("/admin/login", formData);

