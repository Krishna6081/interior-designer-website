import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { HiUser, HiMail, HiPhone, HiShieldCheck, HiPencilAlt, HiLogout } from "react-icons/hi";

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile } = useAuth();
  const { showToast } = useNotification();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || "Client User");
  const [mobile, setMobile] = useState(user?.mobile || "+1 (555) 234-5678");

  if (!user) {
    return (
      <div className="py-32 text-center bg-[#F7F5F2]">
        <h2 className="font-serif text-2xl text-[#26221F] mb-4">You are not signed in</h2>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ name, mobile });
    setEditModalOpen(false);
    showToast("Profile information updated successfully!", "success");
  };

  return (
    <div>
      <PageHeader
        title="Client Dashboard &amp; Profile"
        subtitle="MY ACCOUNT"
        breadcrumb={[{ name: "Profile" }]}
      />

      <section className="py-20 sm:py-24 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5DED5] shadow-xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img
                src={
                  user.avatar ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                }
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#B08D57] shadow-md"
              />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#26221F]">
                    {user.name}
                  </h2>
                  <Badge variant="gold">{user.role || "Client"}</Badge>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="text-xs text-[#8A837C]">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={HiPencilAlt}
                onClick={() => setEditModalOpen(true)}
              >
                Edit Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:bg-rose-50"
                icon={HiLogout}
                onClick={() => {
                  logout();
                  navigate("/");
                  showToast("Signed out successfully", "info");
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Personal Information */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-xs">
              <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-4 mb-6">
                Personal Details
              </h3>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#F1EEE9]">
                  <span className="text-[#8A837C] font-medium">Full Name</span>
                  <span className="font-semibold text-[#26221F]">{user.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F1EEE9]">
                  <span className="text-[#8A837C] font-medium">Email Address</span>
                  <span className="font-semibold text-[#26221F]">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F1EEE9]">
                  <span className="text-[#8A837C] font-medium">Mobile Phone</span>
                  <span className="font-semibold text-[#26221F]">{user.mobile || "+1 (555) 234-5678"}</span>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-xs">
              <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-4 mb-6">
                Account Status &amp; Tier
              </h3>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#F1EEE9]">
                  <span className="text-[#8A837C] font-medium">User Role</span>
                  <span className="font-semibold text-[#B08D57]">{user.role || "Client"}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F1EEE9]">
                  <span className="text-[#8A837C] font-medium">Account Status</span>
                  <span className="font-semibold text-emerald-600">Verified Client</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F1EEE9]">
                  <span className="text-[#8A837C] font-medium">Member Since</span>
                  <span className="font-semibold text-[#26221F]">October 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Personal Profile"
      >
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Mobile Phone"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DED5]">
            <Button variant="ghost" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

