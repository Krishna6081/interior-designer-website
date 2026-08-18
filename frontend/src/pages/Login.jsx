import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    // Clear stale tokens before each login attempt
    localStorage.removeItem("aura_token");
    localStorage.removeItem("aura_user");

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, "success");
      if (
        res.user.role === "Admin" ||
        res.user.role === "Super Admin" ||
        res.user.role?.toLowerCase().includes("admin")
      ) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } else {
      setError(res.error || "Login failed.");
      showToast(res.error || "Login failed.", "error");
    }
  };

  return (
    <div>
      <PageHeader
        title="Client &amp; Admin Sign In"
        subtitle="PORTAL ACCESS"
        breadcrumb={[{ name: "Sign In" }]}
      />

      <section className="py-20 sm:py-24 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DED5] shadow-xl">
            <h2 className="font-serif text-3xl font-normal text-[#26221F] mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-xs text-[#6F6861] text-center mb-8 font-light">
              Sign in to manage your project consultations, invoices, and profile.
            </p>

            {error && (
              <div className="mb-6 p-3 bg-[#FAF0F0] border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#6F6861]">
                  <input type="checkbox" className="rounded text-[#B08D57] focus:ring-[#B08D57]" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => showToast("Password reset link sent to your email.", "info")}
                  className="text-[#B08D57] hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Login"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E5DED5] text-center text-xs text-[#6F6861]">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-[#B08D57] font-semibold hover:underline">
                Create Account
              </Link>
            </div>

            <div className="mt-4 p-3 bg-[#F1EEE9] rounded-xl border border-[#E5DED5] text-[11px] text-[#6F6861]">
              <p className="font-semibold text-[#26221F] mb-1">Admin Credentials (MySQL):</p>
              <p>Email: <code className="text-[#B08D57] font-semibold">admin@example.com</code></p>
              <p>Password: <code className="text-[#B08D57] font-semibold">Admin@123</code></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

