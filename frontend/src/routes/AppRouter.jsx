import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserLayout } from "../components/layout/UserLayout";
import { AdminLayout } from "../admin/components/AdminLayout";

// Public Pages
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Services } from "../pages/Services";
import { ServiceDetails } from "../pages/ServiceDetails";
import { Projects } from "../pages/Projects";
import { ProjectDetails } from "../pages/ProjectDetails";
import { Testimonials } from "../pages/Testimonials";
import { Contact } from "../pages/Contact";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile as UserProfile } from "../pages/Profile";
import { NotFound } from "../pages/NotFound";

// Admin Pages
import { AdminLogin } from "../admin/pages/AdminLogin";
import { Dashboard as AdminDashboard } from "../admin/pages/Dashboard";
import { Users as AdminUsers } from "../admin/pages/Users";
import { Services as AdminServices } from "../admin/pages/Services";
import { Projects as AdminProjects } from "../admin/pages/Projects";
import { ProjectImages as AdminProjectImages } from "../admin/pages/ProjectImages";
import { Testimonials as AdminTestimonials } from "../admin/pages/Testimonials";
import { Inquiries as AdminInquiries } from "../admin/pages/Inquiries";
import { WebsiteContent as AdminContent } from "../admin/pages/WebsiteContent";
import { Settings as AdminSettings } from "../admin/pages/Settings";
import { Profile as AdminProfile } from "../admin/pages/Profile";

export const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC CLIENT ROUTES (Wrapped in UserLayout) */}
      <Route path="/" element={<UserLayout><Home /></UserLayout>} />
      <Route path="/about" element={<UserLayout><About /></UserLayout>} />
      <Route path="/services" element={<UserLayout><Services /></UserLayout>} />
      <Route path="/services/:id" element={<UserLayout><ServiceDetails /></UserLayout>} />
      <Route path="/projects" element={<UserLayout><Projects /></UserLayout>} />
      <Route path="/projects/:id" element={<UserLayout><ProjectDetails /></UserLayout>} />
      <Route path="/testimonials" element={<UserLayout><Testimonials /></UserLayout>} />
      <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
      <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
      <Route path="/register" element={<UserLayout><Register /></UserLayout>} />
      <Route path="/profile" element={<UserLayout><UserProfile /></UserLayout>} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<UserLayout><AdminLogin /></UserLayout>} />
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
      <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
      <Route path="/admin/projects/:id/images" element={<AdminLayout><AdminProjectImages /></AdminLayout>} />
      <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
      <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
      <Route path="/admin/content" element={<AdminLayout><AdminContent /></AdminLayout>} />
      <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
      <Route path="/admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />

      {/* 404 CATCH ALL */}
      <Route path="*" element={<UserLayout><NotFound /></UserLayout>} />
    </Routes>
  );
};
