import api, { getFullImageUrl } from "./api";
import { initialSettingsData } from "../data/settings";

const mapSettings = (s) => {
  if (!s || Object.keys(s).length === 0) return initialSettingsData;
  return {
    ...initialSettingsData,
    companyName: s.company_name || s.companyName || initialSettingsData.companyName,
    logo: s.logo ? getFullImageUrl(s.logo) : initialSettingsData.logo,
    phone: s.phone || initialSettingsData.phone,
    email: s.email || initialSettingsData.email,
    address: s.address || initialSettingsData.address,
    about: s.about || initialSettingsData.about,
    facebook: s.facebook || initialSettingsData.facebook,
    instagram: s.instagram || initialSettingsData.instagram,
    linkedin: s.linkedin || initialSettingsData.linkedin,
    stats: s.stats || initialSettingsData.stats
  };
};

export const settingsService = {
  getSettings: async () => {
    try {
      const response = await api.get("/settings");
      const data = response.data.data;
      if (data && Object.keys(data).length > 0) {
        return mapSettings(data);
      }
      return initialSettingsData;
    } catch (err) {
      return initialSettingsData;
    }
  },

  updateSettings: async (data) => {
    try {
      const payload = {
        company_name: data.companyName || data.company_name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        about: data.about,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin
      };
      const response = await api.put("/settings", payload);
      return mapSettings(response.data.data);
    } catch (err) {
      throw err;
    }
  }
};
