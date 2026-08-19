import api, { getFullImageUrl } from "./api";

const formatImageUrl = (url) => {
  if (!url) return null;
  return getFullImageUrl(url);
};

const mapService = (srv) => {
  if (!srv) return null;
  return {
    ...srv,
    id: srv.id,
    title: srv.title || "",
    description: srv.description || "",
    shortDescription: srv.description || "",
    fullDescription: srv.description || "",
    image: formatImageUrl(srv.image) ||
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    icon: srv.icon || "HiOutlineHome",
    category: srv.category || "Residential",
    startingPrice: srv.startingPrice || srv.starting_price || "Contact for Quote",
    estimatedTime: srv.estimatedTime || srv.estimated_time || "4 - 12 Weeks",
    features: srv.features || [],
    benefits: srv.benefits || [],
    status: srv.status
      ? srv.status.charAt(0).toUpperCase() + srv.status.slice(1)
      : "Active",
    createdDate: srv.created_at ? srv.created_at.split("T")[0] : ""
  };
};

export const serviceService = {
  getServices: async () => {
    const response = await api.get("/services");
    const data = response.data.data;
    if (Array.isArray(data)) {
      return data.map(mapService);
    }
    return [];
  },

  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    const data = response.data.data;
    if (data) return mapService(data);
    return null;
  },

  createService: async (data) => {
    const isFormData = data instanceof FormData;
    const response = await api.post(
      "/services",
      data,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return mapService(response.data.data);
  },

  updateService: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(
      `/services/${id}`,
      data,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return mapService(response.data.data);
  },

  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  }
};
