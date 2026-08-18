import api from "./api";

const mapUser = (u) => {
  if (!u) return null;
  const roleCap =
    u.role
      ? u.role.charAt(0).toUpperCase() + u.role.slice(1).replace(/_/g, " ")
      : "User";
  const statusCap = u.status
    ? u.status.charAt(0).toUpperCase() + u.status.slice(1)
    : "Active";
  return {
    ...u,
    id: u.id,
    name: u.name,
    email: u.email,
    mobile: u.mobile || "",
    role: roleCap,
    status: statusCap,
    createdDate: u.created_at ? u.created_at.split("T")[0] : "",
    avatar:
      u.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "User")}&background=B08D57&color=fff&size=128`
  };
};

export const userService = {
  getUsers: async () => {
    const response = await api.get("/users");
    const data = response.data.data;
    if (Array.isArray(data)) {
      return data.map(mapUser);
    }
    return [];
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return mapUser(response.data.data);
  },

  updateUser: async (id, data) => {
    const payload = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      role: data.role ? data.role.toLowerCase() : undefined,
      status: data.status ? data.status.toLowerCase() : undefined
    };
    const response = await api.put(`/users/${id}`, payload);
    return mapUser(response.data.data);
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
