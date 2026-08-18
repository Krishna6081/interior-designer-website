import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Select } from "../../components/common/Select";
import { useNotification } from "../../context/NotificationContext";
import { projectService } from "../../services/projectService";
import { HiPlus, HiPencilAlt, HiTrash, HiPhotograph } from "react-icons/hi";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useNotification();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    style: "Modern Luxury",
    location: "Pune",
    area: "3,500 sq.ft",
    completionDate: "October 2025",
    heroImage: "",
    shortDescription: "",
    description: "",
    featured: true
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjects();
      setProjects(data || []);
    } catch (err) {
      setError("Failed to load projects portfolio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProj(null);
    setSelectedFiles([]);
    setFormData({
      title: "",
      category: "Residential",
      style: "Modern Luxury",
      location: "Pune",
      area: "3,500 sq.ft",
      completionDate: "October 2025",
      heroImage: "",
      shortDescription: "",
      description: "",
      featured: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProj(p);
    setSelectedFiles([]);
    setFormData({
      title: p.title,
      category: p.category || "Residential",
      style: p.style || p.design_style || "Modern Luxury",
      location: p.location || "",
      area: p.area || "",
      completionDate: p.completionDate || p.completion_date || "",
      heroImage: p.heroImage || "",
      shortDescription: p.shortDescription || p.description || "",
      description: p.description || "",
      featured: p.featured !== undefined ? p.featured : true
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Project removed from portfolio", "error");
    } catch (err) {
      showToast(err.message || "Failed to delete project", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload;
      if (selectedFiles && selectedFiles.length > 0) {
        payload = new FormData();
        payload.append("title", formData.title);
        payload.append("category", formData.category);
        payload.append("design_style", formData.style);
        payload.append("location", formData.location);
        payload.append("area", formData.area);
        payload.append("completion_date", formData.completionDate);
        payload.append("description", formData.description || formData.shortDescription);
        payload.append("status", "active");
        for (let i = 0; i < selectedFiles.length; i++) {
          payload.append("images", selectedFiles[i]);
        }
      } else {
        payload = {
          title: formData.title,
          category: formData.category,
          design_style: formData.style,
          location: formData.location,
          area: formData.area,
          completion_date: formData.completionDate,
          description: formData.description || formData.shortDescription,
          image_url: formData.heroImage,
          status: "active"
        };
      }

      if (editingProj) {
        await projectService.updateProject(editingProj.id, payload);
        showToast("Project details updated", "success");
      } else {
        await projectService.createProject(payload);
        showToast("New project added to portfolio", "success");
      }
      await loadProjects();
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || "Operation failed", "error");
    }
  };

  const columns = [
    {
      header: "Project Title",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.heroImage} alt={row.title} className="w-12 h-10 rounded-lg object-cover border border-[#E5DED5] shrink-0" />
          <span className="font-semibold text-[#26221F]">{row.title}</span>
        </div>
      )
    },
    { header: "Category", accessor: "category" },
    { header: "Location", accessor: "location" },
    { header: "Design Style", accessor: "style" },
    {
      header: "Featured",
      render: (row) => (
        <Badge variant={row.featured ? "gold" : "default"}>{row.featured ? "Featured" : "Standard"}</Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-[#26221F]">Projects Portfolio</h1>
          <p className="text-xs text-[#6F6861] font-light">Add and manage featured residential and commercial projects.</p>
        </div>

        <Button variant="primary" icon={HiPlus} onClick={handleOpenAdd}>
          Add New Project
        </Button>
      </div>

      {loading && <div className="text-center py-6 text-xs text-[#8A837C]">Loading projects portfolio...</div>}
      {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs">{error}</div>}

      <DataTable
        columns={columns}
        data={projects}
        searchPlaceholder="Search projects by title, location, category..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <Link
              to={`/admin/projects/${row.id}/images`}
              className="p-1.5 rounded text-[#8A837C] hover:text-blue-600 transition-colors"
              title="Manage Gallery Images"
            >
              <HiPhotograph className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 rounded text-[#8A837C] hover:text-[#B08D57] transition-colors"
              title="Edit Project"
            >
              <HiPencilAlt className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded text-[#8A837C] hover:text-rose-600 transition-colors"
              title="Delete Project"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProj ? "Edit Project" : "Add Project"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={["Residential", "Commercial", "Office", "Kitchen", "Bedroom", "Living Room", "Luxury", "Modern"]}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />

            <Input
              label="Design Style"
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />

            <Input
              label="Total Area"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Completion Date"
              value={formData.completionDate}
              onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
            />

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#26221F]">Project Cover Images</label>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                className="w-full text-xs text-[#6F6861] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#F2ECE4] file:text-[#B08D57]"
              />
              {(!selectedFiles || selectedFiles.length === 0) && (
                <Input
                  placeholder="Or paste Hero Cover Image URL"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                />
              )}
            </div>
          </div>

          <Textarea
            label="Short Summary"
            rows={2}
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />

          <Textarea
            label="Full Architectural Description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DED5]">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingProj ? "Save Project" : "Add Project"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
