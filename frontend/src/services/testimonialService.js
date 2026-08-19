import api, { getFullImageUrl } from "./api";

const formatAvatarUrl = (url) => {
  if (!url) return null;
  return getFullImageUrl(url);
};

const mapTestimonial = (t) => {
  if (!t) return null;
  const name = t.customer_name || t.name || "Client";
  return {
    ...t,
    id: t.id,
    name,
    customer_name: name,
    role: t.role || "Home Owner",
    avatar:
      formatAvatarUrl(t.customer_image || t.avatar) ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=B08D57&color=fff&size=128`,
    customer_image:
      formatAvatarUrl(t.customer_image || t.avatar) ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=B08D57&color=fff&size=128`,
    rating: t.rating || 5,
    projectName: t.projectName || t.project_name || "",
    review: t.review || "",
    status: t.status
      ? t.status.charAt(0).toUpperCase() + t.status.slice(1)
      : "Approved",
    date: t.created_at ? t.created_at.split("T")[0] : ""
  };
};

export const testimonialService = {
  getTestimonials: async () => {
    const response = await api.get("/testimonials");
    const data = response.data.data;
    if (Array.isArray(data)) {
      return data.map(mapTestimonial);
    }
    return [];
  },

  getTestimonialById: async (id) => {
    const response = await api.get(`/testimonials/${id}`);
    const data = response.data.data;
    if (data) return mapTestimonial(data);
    return null;
  },

  createTestimonial: async (data) => {
    const isFormData = data instanceof FormData;
    const response = await api.post(
      "/testimonials",
      data,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return mapTestimonial(response.data.data);
  },

  updateTestimonial: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(
      `/testimonials/${id}`,
      data,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return mapTestimonial(response.data.data);
  },

  updateTestimonialStatus: async (id, status) => {
    const response = await api.put(`/testimonials/${id}`, {
      status: status.toLowerCase()
    });
    return mapTestimonial(response.data.data);
  },

  deleteTestimonial: async (id) => {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  }
};
