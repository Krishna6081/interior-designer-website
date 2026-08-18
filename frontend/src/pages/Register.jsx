import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email address format";
    }
    if (!formData.mobile.trim()) errs.mobile = "Mobile number is required";
    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);
      const res = await register({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      });
      setLoading(false);

      if (res.success) {
        showToast("Account created successfully! Welcome to AURA & SPACES.", "success");
        navigate("/profile");
      } else {
        showToast(res.error || "Registration failed.", "error");
      }
    }
  };

  return (
    <div>
      <PageHeader
        title="Create Client Account"
        subtitle="JOIN OUR ATELIER"
        breadcrumb={[{ name: "Register" }]}
      />

      <section className="py-20 sm:py-24 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DED5] shadow-xl">
            <h2 className="font-serif text-3xl font-normal text-[#26221F] mb-2 text-center">
              Register Account
            </h2>
            <p className="text-xs text-[#6F6861] text-center mb-8 font-light">
              Create an account to track your spatial consultations and design files.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Full Name"
                id="name"
                placeholder="e.g. Eleanor Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                required
              />

              <Input
                label="Mobile Phone"
                id="mobile"
                placeholder="+1 (555) 000-0000"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                error={errors.mobile}
                required
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                required
              />

              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E5DED5] text-center text-xs text-[#6F6861]">
              <span>Already have an account? </span>
              <Link to="/login" className="text-[#B08D57] font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

