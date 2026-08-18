import React, { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Select } from "../../components/common/Select";
import { useNotification } from "../../context/NotificationContext";
import { serviceService } from "../../services/serviceService";
import { HiPlus, HiPencilAlt, HiTrash, HiSwitchHorizontal } from "react-icons/hi";

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useNotification();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    shortDescription: "",
    fullDescription: "",
    startingPrice: "$5,000",
    image: "",
    status: "Active"
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceService.getServices();
      setServices(data || []);
    } catch (err) {
      setError("Failed to load services list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setSelectedFile(null);
    setFormData({
      title: "",
      category: "Residential",
      shortDescription: "",
      fullDescription: "",
      startingPrice: "$5,000",
      image: "",
      status: "Active"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingService(s);
    setSelectedFile(null);
    setFormData({
      title: s.title,
      category: s.category || "Residential",
      shortDescription: s.shortDescription || s.description || "",
      fullDescription: s.fullDescription || s.description || "",
      startingPrice: s.startingPrice || "$5,000",
      image: s.image || "",
      status: s.status || "Active"
    });
    setModalOpen(true);
  };

  const handleToggleStatus = async (service) => {
    const newStatus = service.status === "Active" ? "Inactive" : "Active";
    try {
      await serviceService.updateService(service.id, {
        title: service.title,
        description: service.shortDescription || service.description || service.title,
        status: newStatus.toLowerCase()
      });
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, status: newStatus } : s))
      );
      showToast("Service status updated", "info");
    } catch (err) {
      showToast(err.message || "Failed to update status", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await serviceService.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      showToast("Service deleted", "error");
    } catch (err) {
      showToast(err.message || "Failed to delete service", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload;
      if (selectedFile) {
        payload = new FormData();
        payload.append("title", formData.title);
        payload.append("description", formData.fullDescription || formData.shortDescription);
        payload.append("status", formData.status.toLowerCase());
        payload.append("image", selectedFile);
      } else {
        payload = {
          title: formData.title,
          description: formData.fullDescription || formData.shortDescription,
          status: formData.status.toLowerCase(),
          image: formData.image
        };
      }

      if (editingService) {
        await serviceService.updateService(editingService.id, payload);
        showToast("Service updated successfully", "success");
      } else {
        await serviceService.createService(payload);
        showToast("New service added successfully", "success");
      }
      await loadServices();
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || "Operation failed", "error");
    }
  };

  const columns = [
    {
      header: "Service",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.image} alt={row.title} className="w-12 h-10 rounded-lg object-cover border border-[#E5DED5] shrink-0" />
          <span className="font-semibold text-[#26221F]">{row.title}</span>
        </div>
      )
    },
    { header: "Category", accessor: "category" },
    { header: "Starting Price", accessor: "startingPrice" },
    {
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "Active" ? "success" : "danger"}>{row.status || "Active"}</Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-[#26221F]">Services Catalog</h1>
          <p className="text-xs text-[#6F6861] font-light">Manage interior design packages, pricing, and service details.</p>
        </div>

        <Button variant="primary" icon={HiPlus} onClick={handleOpenAdd}>
          Add New Service
        </Button>
      </div>

      {loading && <div className="text-center py-6 text-xs text-[#8A837C]">Loading services catalog...</div>}
      {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs">{error}</div>}

      <DataTable
        columns={columns}
        data={services}
        searchPlaceholder="Search services by title, category..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleToggleStatus(row)}
              className="p-1.5 rounded text-[#8A837C] hover:text-blue-600 transition-colors"
              title="Toggle Active Status"
            >
              <HiSwitchHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 rounded text-[#8A837C] hover:text-[#B08D57] transition-colors"
              title="Edit Service"
            >
              <HiPencilAlt className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded text-[#8A837C] hover:text-rose-600 transition-colors"
              title="Delete Service"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? "Edit Service" : "Add Service"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Service Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={["Residential", "Commercial", "Office", "Kitchen", "Living", "Bedroom", "Bathroom", "Visualization", "Furniture", "Renovation"]}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />

            <Input
              label="Starting Price"
              value={formData.startingPrice}
              onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#26221F]">Upload Image File or Provide URL</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full text-xs text-[#6F6861] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#F2ECE4] file:text-[#B08D57] hover:file:bg-[#E5DED5]"
            />
            {!selectedFile && (
              <Input
                placeholder="Or paste image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            )}
          </div>

          <Textarea
            label="Short Summary"
            rows={2}
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            required
          />

          <Textarea
            label="Full Design Description"
            rows={4}
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            required
          />

          <Select
            label="Status"
            options={["Active", "Inactive"]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DED5]">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingService ? "Save Service" : "Add Service"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
