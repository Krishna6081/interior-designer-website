import api from "./api";

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get("/admin/dashboard");
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error("Invalid response from dashboard API.");
  }
};
