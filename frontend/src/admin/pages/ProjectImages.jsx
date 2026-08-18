import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HiArrowLeft, HiTrash, HiUpload, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useNotification } from "../../context/NotificationContext";
import { projectService } from "../../services/projectService";

export const ProjectImages = () => {
  const { id } = useParams();
  const { showToast } = useNotification();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");

  const loadProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
    } catch (err) {
      setError("Failed to load project gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!selectedFile && !newImageUrl.trim()) return;

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("images", selectedFile);
        await projectService.uploadProjectImages(id, formData);
      } else if (newImageUrl.trim()) {
        await projectService.updateProject(id, { image_url: newImageUrl });
      }
      setSelectedFile(null);
      setNewImageUrl("");
      await loadProject();
      showToast("Image added to gallery!", "success");
    } catch (err) {
      showToast(err.message || "Failed to upload image", "error");
    }
  };

  const handleDeleteImage = async (imgObj, index) => {
    try {
      if (imgObj && imgObj.id) {
        await projectService.deleteProjectImage(imgObj.id);
      }
      await loadProject();
      showToast("Image removed from gallery", "info");
    } catch (err) {
      showToast(err.message || "Failed to delete image", "error");
    }
  };

  const galleryList = project?.images && project.images.length > 0
    ? project.images
    : (project?.gallery || []).map((url, i) => ({ id: i, image_url: url }));

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#6F6861] hover:text-[#B08D57] transition-colors mb-3"
        >
          <HiArrowLeft className="w-4 h-4" />
          <span>Back to Projects List</span>
        </Link>
        <h1 className="font-serif text-3xl font-normal text-[#26221F]">
          Gallery Manager: {project ? project.title : `Project #${id}`}
        </h1>
        <p className="text-xs text-[#6F6861] font-light">
          Upload and delete high-definition project gallery images.
        </p>
      </div>

      {loading && <div className="text-center py-6 text-xs text-[#8A837C]">Loading gallery...</div>}
      {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs">{error}</div>}

      {/* Upload Component */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs">
        <h3 className="font-serif text-xl text-[#26221F] font-normal mb-4">Add Gallery Image</h3>
        <form onSubmit={handleAddImage} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-semibold text-[#26221F]">Select Image File</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full text-xs text-[#6F6861] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#F2ECE4] file:text-[#B08D57]"
            />
            {!selectedFile && (
              <Input
                placeholder="Or paste Image URL (https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            )}
          </div>
          <Button type="submit" variant="primary" icon={HiUpload}>
            Upload Image
          </Button>
        </form>
      </div>

      {/* Gallery Grid Manager */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E5DED5] pb-4 mb-6">
          <h3 className="font-serif text-xl text-[#26221F] font-normal">
            Current Gallery ({galleryList.length} Images)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryList.map((imgObj, index) => {
            const imgUrl = imgObj.image_url ? (imgObj.image_url.startsWith("/uploads") ? `http://localhost:5000${imgObj.image_url}` : imgObj.image_url) : imgObj;
            return (
              <div
                key={imgObj.id || index}
                className="group relative bg-[#F7F5F2] rounded-xl border border-[#E5DED5] overflow-hidden shadow-xs flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F1EEE9] relative">
                  <img
                    src={imgUrl}
                    alt={`Project ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#26221F]/80 text-white rounded text-[10px] uppercase font-mono">
                    #{index + 1}
                  </span>
                </div>

                <div className="p-3 bg-white flex items-center justify-between border-t border-[#E5DED5]">
                  <span className="text-[11px] text-[#8A837C] truncate max-w-[180px]">{imgUrl}</span>
                  <button
                    onClick={() => handleDeleteImage(imgObj, index)}
                    className="p-1 text-rose-500 hover:text-rose-700 transition-colors"
                    title="Delete Image"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
