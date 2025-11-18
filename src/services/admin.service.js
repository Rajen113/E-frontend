import { adminRegisterAPI } from "../api/admin/admin.api";

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
