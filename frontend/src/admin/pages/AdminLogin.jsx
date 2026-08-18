import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useNotification();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }

    // Clear any stale cached tokens before attempting a fresh login
    localStorage.removeItem("aura_token");
    localStorage.removeItem("aura_user");

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (
      res.success &&
      (res.user.role === "Admin" ||
        res.user.role === "Super Admin" ||
        res.user.role?.toLowerCase().includes("admin"))
    ) {
      showToast(`Signed in as ${res.user.role}!`, "success");
      navigate("/admin");
    } else if (res.success && !res.user.role?.toLowerCase().includes("admin")) {
      setError("Access denied. This account does not have admin privileges.");
    } else {
      setError(res.error || "Invalid admin credentials.");
      showToast(res.error || "Access denied.", "error");
    }
  };


  return (
    <div className="pt-28 pb-16 sm:py-28 bg-[#F7F5F2] bg-radial-subtle flex-1 flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#E5DED5]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#B08D57] text-white font-serif text-2xl font-bold flex items-center justify-center mx-auto mb-3 shadow-xs">
            A
          </div>
          <h1 className="font-serif text-3xl text-[#26221F] font-normal">Admin Portal</h1>
          <p className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold mt-1">
            Studio Management Login
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-[#FAF0F0] border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminSubmit} className="flex flex-col gap-5">
          <Input
            label="Admin Email"
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </Button>
        </form>

        <div className="mt-8 p-3 bg-[#F1EEE9] rounded-xl border border-[#E5DED5] text-[11px] text-[#6F6861] text-center">
          <p className="font-semibold text-[#26221F]">Admin Credentials (MySQL):</p>
          <p>Email: <code className="text-[#B08D57] font-semibold">admin@example.com</code></p>
          <p>Password: <code className="text-[#B08D57] font-semibold">Admin@123</code></p>
        </div>
      </div>
    </div>
  );
};

