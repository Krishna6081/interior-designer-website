import React, { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Select } from "../../components/common/Select";
import { useNotification } from "../../context/NotificationContext";
import { testimonialService } from "../../services/testimonialService";
import { HiPlus, HiPencilAlt, HiTrash, HiCheck, HiX, HiStar } from "react-icons/hi";

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useNotification();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "Client",
    avatar: "",
    rating: 5,
    projectName: "",
    review: "",
    status: "Approved"
  });

  const loadTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await testimonialService.getTestimonials();
      setTestimonials(data || []);
    } catch (err) {
      setError("Failed to load testimonials list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "Client",
      avatar: "",
      rating: 5,
      projectName: "",
      review: "",
      status: "Approved"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setFormData({
      name: t.name || t.customer_name,
      role: t.role || "Client",
      avatar: t.avatar || t.customer_image || "",
      rating: t.rating || 5,
      projectName: t.projectName || "",
      review: t.review || "",
      status: t.status || "Approved"
    });
    setModalOpen(true);
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      await testimonialService.updateTestimonialStatus(id, newStatus);
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      );
      showToast(`Testimonial status set to ${newStatus}`, "info");
    } catch (err) {
      showToast(err.message || "Failed to update status", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await testimonialService.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast("Testimonial deleted", "error");
    } catch (err) {
      showToast(err.message || "Failed to delete testimonial", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        customer_name: formData.name,
        customer_image: formData.avatar,
        rating: formData.rating,
        review: formData.review,
        status: formData.status.toLowerCase()
      };

      if (editingItem) {
        await testimonialService.updateTestimonial(editingItem.id, payload);
        showToast("Testimonial updated", "success");
      } else {
        await testimonialService.createTestimonial(payload);
        showToast("Testimonial created", "success");
      }
      await loadTestimonials();
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || "Operation failed", "error");
    }
  };

  const columns = [
    {
      header: "Customer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-9 h-9 rounded-full object-cover border border-[#E5DED5]" />
          <div>
            <h4 className="font-semibold text-[#26221F]">{row.name}</h4>
            <span className="text-[11px] text-[#8A837C]">{row.role}</span>
          </div>
        </div>
      )
    },
    { header: "Project Name", accessor: "projectName" },
    {
      header: "Rating",
      render: (row) => (
        <div className="flex items-center gap-1 text-[#B08D57]">
          <span>{row.rating}</span>
          <HiStar className="w-4 h-4" />
        </div>
      )
    },
    {
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "Approved" ? "success" : row.status === "Rejected" ? "danger" : "warning"}>
          {row.status || "Approved"}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-[#26221F]">Testimonials Moderation</h1>
          <p className="text-xs text-[#6F6861] font-light">Approve, edit, or reject customer feedback reviews.</p>
        </div>

        <Button variant="primary" icon={HiPlus} onClick={handleOpenAdd}>
          Add Testimonial
        </Button>
      </div>

      {loading && <div className="text-center py-6 text-xs text-[#8A837C]">Loading testimonials...</div>}
      {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs">{error}</div>}

      <DataTable
        columns={columns}
        data={testimonials}
        searchPlaceholder="Search reviews by customer, project name..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            {row.status !== "Approved" && (
              <button
                onClick={() => handleToggleStatus(row.id, "Approved")}
                className="p-1.5 rounded text-[#8A837C] hover:text-emerald-600 transition-colors"
                title="Approve"
              >
                <HiCheck className="w-4 h-4" />
              </button>
            )}
            {row.status !== "Rejected" && (
              <button
                onClick={() => handleToggleStatus(row.id, "Rejected")}
                className="p-1.5 rounded text-[#8A837C] hover:text-rose-600 transition-colors"
                title="Reject"
              >
                <HiX className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 rounded text-[#8A837C] hover:text-[#B08D57] transition-colors"
              title="Edit Testimonial"
            >
              <HiPencilAlt className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded text-[#8A837C] hover:text-rose-600 transition-colors"
              title="Delete Testimonial"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Customer Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Customer Role / Profession"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />

            <Select
              label="Rating (1 - 5)"
              options={[5, 4, 3, 2, 1]}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            />
          </div>

          <Input
            label="Associated Project Name"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          />

          <Input
            label="Avatar Image URL"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          />

          <Textarea
            label="Review Content"
            rows={4}
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            required
          />

          <Select
            label="Moderation Status"
            options={["Approved", "Pending", "Rejected"]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DED5]">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingItem ? "Save Testimonial" : "Add Testimonial"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
