import { adminRegisterAPI } from "../api/admin/admin.api";
import {AdminLoginAPI} from "../api/admin/adminLogin";

export const adminLoginService = async ({ Email, password }) => {
  try {
    const payload = { Email, password };

    const res = await AdminLoginAPI(payload);

    const token = res.data?.access_token;

    if (token) {
      localStorage.setItem("token", token);
    }

    return {
      success: true,
      token,
      message: res.data?.message || "Login successful",
      data: res.data,
    };

  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Invalid credentials!",
    };
  }
};


export const adminRegisterService = async (adminData) => {
  try {
    const res = await adminRegisterAPI(adminData);

    return {
      success: true,
      message: res.data.message || "Admin registration successful!",
    };

  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Registration failed!",
    };
  }
};


