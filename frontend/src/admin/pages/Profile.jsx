import React, { useState } from "react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useNotification();

  const [name, setName] = useState(user?.name || "Admin User");
  const [email, setEmail] = useState(user?.email || "admin@example.com");

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email });
    showToast("Admin profile updated!", "success");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-serif text-3xl font-normal text-[#26221F]">Admin Profile</h1>
        <p className="text-xs text-[#6F6861] font-light">
          Manage administrator profile credentials and credentials.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-xs space-y-6">
        <div className="flex items-center gap-5 border-b border-[#E5DED5] pb-6">
          <img
            src={
              user?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            }
            alt="Admin Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#B08D57]"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-serif text-xl text-[#26221F] font-medium">{user?.name || "Admin User"}</h3>
              <Badge variant="gold">System Administrator</Badge>
            </div>
            <p className="text-xs text-[#8A837C]">{user?.email || "admin@example.com"}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Admin Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Admin Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button type="submit" variant="primary">
              Update Admin Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

