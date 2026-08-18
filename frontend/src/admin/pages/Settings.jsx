import React, { useState, useEffect } from "react";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Button } from "../../components/common/Button";
import { useNotification } from "../../context/NotificationContext";
import { settingsService } from "../../services/settingsService";

export const Settings = () => {
  const { showToast } = useNotification();

  const [settings, setSettings] = useState({
    companyName: "",
    tagline: "",
    phone: "",
    email: "",
    address: "",
    businessHours: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    pinterest: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (err) {
        setError("Failed to load studio settings.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await settingsService.updateSettings(settings);
      showToast("Company settings updated successfully!", "success");
    } catch (err) {
      showToast(err.message || "Failed to update settings", "error");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-normal text-[#26221F]">Studio Settings</h1>
        <p className="text-xs text-[#6F6861] font-light">
          Configure company name, phone, email, office address, and social media handles.
        </p>
      </div>

      {loading && <div className="text-center py-6 text-xs text-[#8A837C]">Loading settings...</div>}
      {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs">{error}</div>}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Company Identity */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-3">
            Company Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Studio Name"
              value={settings.companyName || ""}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              required
            />

            <Input
              label="Tagline"
              value={settings.tagline || ""}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Phone"
              value={settings.phone || ""}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              required
            />

            <Input
              label="Contact Email"
              type="email"
              value={settings.email || ""}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              required
            />
          </div>

          <Textarea
            label="Atelier Office Address"
            rows={2}
            value={settings.address || ""}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            required
          />

          <Input
            label="Business Hours"
            value={settings.businessHours || ""}
            onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
          />
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-3">
            Social Media Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Instagram URL"
              value={settings.instagram || ""}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
            />

            <Input
              label="Facebook URL"
              value={settings.facebook || ""}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="LinkedIn URL"
              value={settings.linkedin || ""}
              onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
            />

            <Input
              label="Pinterest URL"
              value={settings.pinterest || ""}
              onChange={(e) => setSettings({ ...settings, pinterest: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg">
          Save Settings
        </Button>
      </form>
    </div>
  );
};
