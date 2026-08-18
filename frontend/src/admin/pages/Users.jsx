import React, { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { useNotification } from "../../context/NotificationContext";
import { userService } from "../../services/userService";
import { authService } from "../../services/authService";
import { HiPencilAlt, HiTrash, HiUserAdd, HiCheckCircle, HiBan } from "react-icons/hi";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useNotification();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "Client",
    status: "Active"
  });

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data || []);
    } catch (err) {
      setError("Failed to load users list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "Client",
      status: "Active"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (u) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      mobile: u.mobile,
      password: "",
      role: u.role,
      status: u.status
    });
    setModalOpen(true);
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    try {
      await userService.updateUser(user.id, { status: newStatus });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
      );
      showToast(`User status updated to ${newStatus}`, "info");
    } catch (err) {
      showToast(err.message || "Failed to update status", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showToast("User record deleted", "error");
    } catch (err) {
      showToast(err.message || "Failed to delete user", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, formData);
        showToast("User profile updated", "success");
      } else {
        await authService.register({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password || "password123"
        });
        showToast("New user created successfully", "success");
      }
      await loadUsers();
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || "Operation failed", "error");
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    {
      header: "User Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover border border-[#E5DED5]" />
          <span className="font-semibold text-[#26221F]">{row.name}</span>
        </div>
      )
    },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile" },
    {
      header: "Role",
      render: (row) => (
        <Badge variant={row.role === "Super Admin" ? "gold" : row.role === "Admin" ? "gold" : "default"}>
          {row.role}
        </Badge>
      )
    },
    {
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "Active" ? "success" : "danger"}>{row.status}</Badge>
      )
    },
    { header: "Created Date", accessor: "createdDate" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-[#26221F]">Users Management</h1>
          <p className="text-xs text-[#6F6861] font-light">View and moderate registered client and admin accounts.</p>
        </div>

        <Button variant="primary" icon={HiUserAdd} onClick={handleOpenAdd}>
          Add New User
        </Button>
      </div>

      {loading && <div className="text-center py-6 text-xs text-[#8A837C]">Loading users list...</div>}
      {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs">{error}</div>}

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search users by name, email, role..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleToggleStatus(row)}
              className="p-1.5 rounded text-[#8A837C] hover:text-emerald-600 transition-colors"
              title={row.status === "Active" ? "Deactivate User" : "Activate User"}
            >
              {row.status === "Active" ? <HiBan className="w-4 h-4" /> : <HiCheckCircle className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 rounded text-[#8A837C] hover:text-[#B08D57] transition-colors"
              title="Edit User"
            >
              <HiPencilAlt className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded text-[#8A837C] hover:text-rose-600 transition-colors"
              title="Delete User"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? "Edit User Record" : "Add New User"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Mobile Phone"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
          />

          {!editingUser && (
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Role"
              options={["Client", "Admin"]}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />

            <Select
              label="Account Status"
              options={["Active", "Inactive"]}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DED5]">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
