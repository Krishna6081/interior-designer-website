import api from "./api";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data.data;
    if (token) {
      localStorage.setItem("aura_token", token);
      localStorage.setItem("aura_user", JSON.stringify(user));
    }
    return { token, user };
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    const { token, user } = response.data.data;
    if (token) {
      localStorage.setItem("aura_token", token);
      localStorage.setItem("aura_user", JSON.stringify(user));
    }
    return { token, user };
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem("aura_token");
      if (!token) return null;
      const response = await api.get("/auth/profile");
      const user = response.data.data;
      localStorage.setItem("aura_user", JSON.stringify(user));
      return user;
    } catch (err) {
      const savedUser = localStorage.getItem("aura_user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem("aura_user");
      localStorage.removeItem("aura_token");
    }
    return { success: true };
  }
};
