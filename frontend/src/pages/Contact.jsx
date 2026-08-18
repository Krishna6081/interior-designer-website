import React, { useState, useEffect } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Input } from "../components/common/Input";
import { Select } from "../components/common/Select";
import { Textarea } from "../components/common/Textarea";
import { Button } from "../components/common/Button";
import { useNotification } from "../context/NotificationContext";
import { settingsService } from "../services/settingsService";
import { inquiryService } from "../services/inquiryService";
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiCheckCircle } from "react-icons/hi";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

export const Contact = () => {
  const [settings, setSettings] = useState({
    phone: "+91 (020) 2612-8899",
    mobile: "+91 98220 99000",
    email: "concierge@auraspaces.com",
    address: "Suite 401, Grand Atelier Tower, Koregaon Park, Pune, Maharashtra 411001",
    businessHours: "Monday - Saturday: 09:30 AM - 07:00 PM (Closed Sundays)",
    instagram: "https://instagram.com/auraspaces.design",
    facebook: "https://facebook.com/auraspaces",
    linkedin: "https://linkedin.com/company/auraspaces",
    pinterest: "https://pinterest.com/auraspaces"
  });

  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    projectType: "Residential Interior Design",
    location: "",
    budget: "$10,000 - $25,000",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (err) {
        // Fallback to default state
      }
    };
    loadSettings();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.mobile.trim()) errs.mobile = "Mobile number is required";
    if (!formData.location.trim()) errs.location = "Project location is required";
    if (!formData.message.trim()) errs.message = "Message details are required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        await inquiryService.createInquiry({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          projectType: formData.projectType,
          location: formData.location,
          budget: formData.budget,
          message: formData.message
        });
        setSubmitted(true);
        showToast("Thank you! Your inquiry has been received.", "success");
      } catch (err) {
        showToast(err.message || "Failed to submit inquiry. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      showToast("Please fill out all required fields.", "error");
    }
  };

  return (
    <div>
      <PageHeader
        title="Contact Our Atelier"
        subtitle="GET IN TOUCH"
        breadcrumb={[{ name: "Contact" }]}
        bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT COLUMN: Company Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-3 block">
                  TALK TO US
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#26221F] mb-6">
                  Let's Begin Your Interior Transformation
                </h2>
                <p className="text-sm text-[#6F6861] leading-relaxed font-light mb-8">
                  Whether you are embarking on a new architectural build, penthouse refurbishment, or corporate workspace design, our studio is ready to consult.
                </p>

                <div className="flex flex-col gap-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#B08D57] flex items-center justify-center shrink-0 border border-[#E5DED5] shadow-xs">
                      <HiPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block">Phone / Mobile</span>
                      <p className="text-sm font-semibold text-[#26221F]">{settings.phone}</p>
                      <p className="text-xs text-[#6F6861]">{settings.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#B08D57] flex items-center justify-center shrink-0 border border-[#E5DED5] shadow-xs">
                      <HiMail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block">Inquiries Email</span>
                      <p className="text-sm font-semibold text-[#26221F]">{settings.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#B08D57] flex items-center justify-center shrink-0 border border-[#E5DED5] shadow-xs">
                      <HiLocationMarker className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block">Studio Address</span>
                      <p className="text-xs font-semibold text-[#26221F] leading-relaxed">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#B08D57] flex items-center justify-center shrink-0 border border-[#E5DED5] shadow-xs">
                      <HiClock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block">Business Hours</span>
                      <p className="text-xs font-semibold text-[#26221F]">{settings.businessHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6 border-t border-[#E5DED5]">
                <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block mb-3">
                  Follow Our Design Journey
                </span>
                <div className="flex items-center gap-3">
                  <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-[#E5DED5] flex items-center justify-center text-[#26221F] hover:text-[#B08D57] hover:border-[#B08D57] transition-all">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-[#E5DED5] flex items-center justify-center text-[#26221F] hover:text-[#B08D57] hover:border-[#B08D57] transition-all">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href={settings.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-[#E5DED5] flex items-center justify-center text-[#26221F] hover:text-[#B08D57] hover:border-[#B08D57] transition-all">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a href={settings.pinterest} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-[#E5DED5] flex items-center justify-center text-[#26221F] hover:text-[#B08D57] hover:border-[#B08D57] transition-all">
                    <FaPinterestP className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5DED5] shadow-xl">
                {submitted ? (
                  <div className="py-12 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                      <HiCheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-3xl font-normal text-[#26221F]">
                      Thank You!
                    </h3>
                    <p className="text-base text-[#6F6861] max-w-md font-light">
                      Your inquiry has been received successfully. Our principal designer will review your details and reach out within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: "",
                          email: "",
                          mobile: "",
                          projectType: "Residential Interior Design",
                          location: "",
                          budget: "$10,000 - $25,000",
                          message: ""
                        });
                      }}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <h3 className="font-serif text-2xl font-normal text-[#26221F] mb-2">
                      Submit Your Project Inquiry
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        id="fullName"
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        error={errors.fullName}
                        required
                      />

                      <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="eleanor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Mobile Number"
                        id="mobile"
                        placeholder="+91 98200 00000"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        error={errors.mobile}
                        required
                      />

                      <Select
                        label="Project Type"
                        id="projectType"
                        options={[
                          "Residential Interior Design",
                          "Commercial Interior Design",
                          "Office Interior Design",
                          "Modular Kitchen Design",
                          "Living Room Design",
                          "Bedroom Design",
                          "3D Visualization",
                          "Renovation Services"
                        ]}
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Location"
                        id="location"
                        placeholder="e.g. Worli, Mumbai / Pune"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        error={errors.location}
                        required
                      />

                      <Select
                        label="Approximate Budget"
                        id="budget"
                        options={[
                          "Under $10,000",
                          "$10,000 - $25,000",
                          "$25,000 - $50,000",
                          "$50,000+"
                        ]}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>

                    <Textarea
                      label="Project Message & Space Description"
                      id="message"
                      rows={4}
                      placeholder="Tell us about your property square footage, timeline, and vision..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      error={errors.message}
                      required
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="mt-2"
                      disabled={loading}
                    >
                      {loading ? "Submitting Inquiry..." : "Send Inquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
