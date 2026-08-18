import api from "./api";

const mapInquiry = (inq) => {
  if (!inq) return null;
  const capitalizedStatus = inq.status
    ? inq.status.charAt(0).toUpperCase() + inq.status.slice(1)
    : "Pending";
  return {
    ...inq,
    id: inq.id,
    name: inq.name,
    email: inq.email,
    mobile: inq.mobile || "",
    projectType: inq.project_type || inq.projectType || "Residential Interior",
    location: inq.location || "",
    budget: inq.budget || "",
    message: inq.message || "",
    status: capitalizedStatus,
    date: inq.created_at ? inq.created_at.split("T")[0] : ""
  };
};

export const inquiryService = {
  getInquiries: async (statusFilter = null) => {
    const url = statusFilter
      ? `/inquiries?status=${encodeURIComponent(statusFilter.toLowerCase())}`
      : "/inquiries";
    const response = await api.get(url);
    const data = response.data.data;
    if (Array.isArray(data)) {
      return data.map(mapInquiry);
    }
    return [];
  },

  getInquiryById: async (id) => {
    const response = await api.get(`/inquiries/${id}`);
    return mapInquiry(response.data.data);
  },

  createInquiry: async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      mobile: data.mobile || data.phone,
      project_type: data.projectType || data.project_type || "Residential Interior",
      location: data.location || "",
      budget: data.budget || "",
      message: data.message || ""
    };
    const response = await api.post("/inquiries", payload);
    return mapInquiry(response.data.data);
  },

  updateInquiryStatus: async (id, status) => {
    const response = await api.put(`/inquiries/${id}`, {
      status: status.toLowerCase()
    });
    return mapInquiry(response.data.data);
  },

  deleteInquiry: async (id) => {
    const response = await api.delete(`/inquiries/${id}`);
    return response.data;
  }
};
