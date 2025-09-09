import api from "./axiosInstance";

export const userAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (profileData) => api.put("/user/update-profile", profileData),
  updateEmail: (emailData) => api.put("/user/update-email", emailData),
  updatePassword: (passwordData) => api.put("/user/update-password", passwordData),
};
