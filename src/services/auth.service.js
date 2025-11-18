import { loginAPI } from "../api/auth/auth.api";
import { registerAPI } from "../api/auth/register.api";

export const loginService = async (formData) => {
  try {
    const res = await loginAPI(formData);
    console.log(res)

    const token = res.data?.access_token;

    if (token) {
      localStorage.setItem("authToken", token);
    }

    return { success: true, token, data: res.data };

  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Invalid credentials!",
    };
  }
};

export const registerService = async (userData) => {
  try {
    const res = await registerAPI(userData);

    return {
      success: true,
      message: res.data.message || "Registration successful!",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.detail || "Registration failed!",
    };
  }
};
