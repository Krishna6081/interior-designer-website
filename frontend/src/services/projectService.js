import api from "./api";

const formatImageUrl = (url) => {
  if (!url) return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
  if (url.startsWith("/uploads")) {
    return `http://localhost:5000${url}`;
  }
  return url;
};

const mapProject = (p) => {
  if (!p) return null;
  const imageList =
    p.images && p.images.length > 0
      ? p.images.map((img) => formatImageUrl(img.image_url || img))
      : [];
  const hero = imageList.length > 0 ? imageList[0] : formatImageUrl(p.heroImage || p.image);

  return {
    ...p,
    id: p.id,
    title: p.title,
    category: p.category || "Residential",
    style: p.design_style || p.style || "Modern Luxury",
    design_style: p.design_style || p.style || "Modern Luxury",
    location: p.location || "",
    area: p.area || "",
    completionDate: p.completion_date || p.completionDate || "",
    client: p.client || "Private Client",
    heroImage: hero,
    shortDescription: p.description
      ? p.description.slice(0, 150) + (p.description.length > 150 ? "..." : "")
      : "",
    description: p.description || "",
    featured: p.featured !== undefined ? p.featured : false,
    status: p.status
      ? p.status.charAt(0).toUpperCase() + p.status.slice(1)
      : "Active",
    gallery: imageList.length > 0 ? imageList : [hero],
    images: p.images || [],
    createdDate: p.created_at ? p.created_at.split("T")[0] : ""
  };
};

export const projectService = {
  getProjects: async (category = null) => {
    const url = category
      ? `/projects?category=${encodeURIComponent(category)}`
      : "/projects";
    const response = await api.get(url);
    const data = response.data.data;
    if (Array.isArray(data)) {
      return data.map(mapProject);
    }
    return [];
  },

  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    const data = response.data.data;
    if (data) return mapProject(data);
    return null;
  },

  createProject: async (data) => {
    const isFormData = data instanceof FormData;
    const response = await api.post(
      "/projects",
      data,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return mapProject(response.data.data);
  },

  updateProject: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(
      `/projects/${id}`,
      data,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return mapProject(response.data.data);
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  uploadProjectImages: async (projectId, formData) => {
    const response = await api.post(`/projects/${projectId}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data.data;
  },

  deleteProjectImage: async (imageId) => {
    const response = await api.delete(`/projects/images/${imageId}`);
    return response.data;
  }
};
