import React, { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { Badge } from "../../components/common/Badge";
import { Modal } from "../../components/common/Modal";
import { Select } from "../../components/common/Select";
import { useNotification } from "../../context/NotificationContext";
import { inquiryService } from "../../services/inquiryService";
import { HiEye, HiTrash, HiFilter } from "react-icons/hi";

export const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useNotification();

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const loadInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inquiryService.getInquiries(statusFilter === "All" ? null : statusFilter);
      setInquiries(data || []);
    } catch (err) {
      setError("Failed to load client inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await inquiryService.updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      showToast(`Inquiry status updated to ${newStatus}`, "info");
    } catch (err) {
      showToast(err.message || "Failed to update inquiry status", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await inquiryService.deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      showToast("Inquiry deleted", "error");
    } catch (err) {
      showToast(err.message || "Failed to delete inquiry", "error");
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    {
      header: "Client Name",
      render: (row) => <span className="font-semibold text-[#26221F]">{row.name}</span>
    },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Project Type", accessor: "projectType" },
    { header: "Location", accessor: "location" },
    { header: "Budget", accessor: "budget" },
    {
      header: "Status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`text-xs px-2.5 py-1 rounded-full font-semibold border cursor-pointer focus:outline-none ${
            row.status === "Pending"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : row.status === "Contacted"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          <option value="Pending">Pending</option>
          <option value="Contacted">Contacted</option>
          <option value="Completed">Completed</option>
        </select>
      )
    },
    { header: "Date", accessor: "date" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-[#26221F]">Client Inquiries</h1>
          <p className="text-xs text-[#6F6861] font-light">Review and update consultation requests submitted from the contact page.</p>
        </div>

        <div className="flex items-center gap-3">
          <HiFilter className="w-4 h-4 text-[#B08D57]" />
          <Select
            options={["All", "Pending", "Contacted", "Completed"]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {loading && <div className="text-center py-6 text-xs text-[#8A837C]">Loading client inquiries...</div>}
      {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs">{error}</div>}

      <DataTable
        columns={columns}
        data={inquiries}
        searchPlaceholder="Search inquiries by client name, email, project type..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setSelectedInquiry(row)}
              className="p-1.5 rounded text-[#8A837C] hover:text-[#B08D57] transition-colors"
              title="View Full Message"
            >
              <HiEye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded text-[#8A837C] hover:text-rose-600 transition-colors"
              title="Delete Inquiry"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* View Details Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry Details: #${selectedInquiry.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E5DED5]">
              <div>
                <span className="text-[#8A837C] font-medium block mb-1">Client Name</span>
                <p className="font-semibold text-sm text-[#26221F]">{selectedInquiry.name}</p>
              </div>
              <div>
                <span className="text-[#8A837C] font-medium block mb-1">Submission Date</span>
                <p className="font-semibold text-sm text-[#26221F]">{selectedInquiry.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E5DED5]">
              <div>
                <span className="text-[#8A837C] font-medium block mb-1">Email</span>
                <p className="font-medium text-[#26221F]">{selectedInquiry.email}</p>
              </div>
              <div>
                <span className="text-[#8A837C] font-medium block mb-1">Mobile</span>
                <p className="font-medium text-[#26221F]">{selectedInquiry.mobile}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#E5DED5]">
              <div>
                <span className="text-[#8A837C] font-medium block mb-1">Project Type</span>
                <p className="font-medium text-[#26221F]">{selectedInquiry.projectType}</p>
              </div>
              <div>
                <span className="text-[#8A837C] font-medium block mb-1">Location</span>
                <p className="font-medium text-[#26221F]">{selectedInquiry.location}</p>
              </div>
              <div>
                <span className="text-[#8A837C] font-medium block mb-1">Budget</span>
                <p className="font-medium text-[#B08D57]">{selectedInquiry.budget}</p>
              </div>
            </div>

            <div>
              <span className="text-[#8A837C] font-medium block mb-2">Message Body</span>
              <div className="p-4 bg-[#F7F5F2] rounded-xl border border-[#E5DED5] text-[#26221F] leading-relaxed">
                "{selectedInquiry.message}"
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
