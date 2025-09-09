import api from "./axiosInstance";

export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  verifyOTP: (otpData) => api.post("/auth/verify-otp", otpData),
  login: (credentials) => api.post("/auth/login", credentials),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (resetData) => api.post("/auth/reset-password", resetData),
};
