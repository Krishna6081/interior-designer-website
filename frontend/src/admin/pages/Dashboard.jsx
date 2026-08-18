import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
  HiOutlineFolder,
  HiOutlineChatBubbleLeftRight,
  HiOutlineInbox,
  HiOutlineClock,
  HiPlus,
  HiEye,
  HiArrowPath
} from "react-icons/hi2";
import { DashboardCard } from "../components/DashboardCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { adminService } from "../../services/adminService";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalProjects: 0,
    totalTestimonials: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    recentProjects: [],
    recentInquiries: []
  });

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.getDashboardStats();
      if (data) {
        setDashboardData({
          totalUsers: data.totalUsers ?? 0,
          totalServices: data.totalServices ?? 0,
          totalProjects: data.totalProjects ?? 0,
          totalTestimonials: data.totalTestimonials ?? 0,
          totalInquiries: data.totalInquiries ?? 0,
          pendingInquiries: data.pendingInquiries ?? 0,
          recentProjects: Array.isArray(data.recentProjects) ? data.recentProjects : [],
          recentInquiries: Array.isArray(data.recentInquiries) ? data.recentInquiries : []
        });
      }
    } catch (err) {
      setError(err.message || "Unable to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const {
    totalUsers,
    totalServices,
    totalProjects,
    totalTestimonials,
    totalInquiries,
    pendingInquiries,
    recentProjects,
    recentInquiries
  } = dashboardData;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-[#26221F]">Studio Overview</h1>
          <p className="text-xs text-[#6F6861] font-light">Welcome back to the executive management panel.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" icon={HiArrowPath} onClick={fetchDashboardData} disabled={loading}>
            Refresh Data
          </Button>
          <Button variant="secondary" size="sm" icon={HiPlus} onClick={() => navigate("/admin/projects")}>
            New Project
          </Button>
          <Button variant="primary" size="sm" icon={HiPlus} onClick={() => navigate("/admin/services")}>
            New Service
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={fetchDashboardData}
            className="px-3 py-1 bg-red-600 text-white text-[11px] rounded-md hover:bg-red-700 font-medium cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <DashboardCard title="Total Users" value={loading ? "—" : totalUsers} icon={HiOutlineUsers} color="gold" index={0} />
        <DashboardCard title="Total Services" value={loading ? "—" : totalServices} icon={HiOutlineWrenchScrewdriver} color="dark" index={1} />
        <DashboardCard title="Total Projects" value={loading ? "—" : totalProjects} icon={HiOutlineFolder} color="emerald" index={2} />
        <DashboardCard title="Testimonials" value={loading ? "—" : totalTestimonials} icon={HiOutlineChatBubbleLeftRight} color="blue" index={3} />
        <DashboardCard title="Total Inquiries" value={loading ? "—" : totalInquiries} icon={HiOutlineInbox} color="gold" index={4} />
        <DashboardCard title="Pending Inquiries" value={loading ? "—" : pendingInquiries} icon={HiOutlineClock} color="amber" index={5} />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects Card */}
        <div className="bg-white rounded-2xl border border-[#E5DED5] shadow-xs p-6">
          <div className="flex items-center justify-between border-b border-[#E5DED5] pb-4 mb-4">
            <h3 className="font-serif text-xl text-[#26221F] font-normal">Recent Projects</h3>
            <Link to="/admin/projects" className="text-xs font-semibold text-[#B08D57] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#E5DED5]">
            {loading ? (
              <div className="py-4 text-xs text-[#8A837C] text-center">Loading recent projects...</div>
            ) : recentProjects.length === 0 ? (
              <div className="py-4 text-xs text-[#8A837C] text-center">No projects available.</div>
            ) : (
              recentProjects.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="w-12 h-10 rounded-lg object-cover border border-[#E5DED5]"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=60";
                      }}
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-[#26221F]">{p.title}</h4>
                      <span className="text-[11px] text-[#8A837C]">{p.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">{p.category}</Badge>
                    <Link to={`/admin/projects/${p.id}/images`} className="p-1.5 text-[#8A837C] hover:text-[#B08D57]">
                      <HiEye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries Card */}
        <div className="bg-white rounded-2xl border border-[#E5DED5] shadow-xs p-6">
          <div className="flex items-center justify-between border-b border-[#E5DED5] pb-4 mb-4">
            <h3 className="font-serif text-xl text-[#26221F] font-normal">Recent Client Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-[#B08D57] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#E5DED5]">
            {loading ? (
              <div className="py-4 text-xs text-[#8A837C] text-center">Loading recent inquiries...</div>
            ) : recentInquiries.length === 0 ? (
              <div className="py-4 text-xs text-[#8A837C] text-center">No inquiries available.</div>
            ) : (
              recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-[#26221F]">{inq.name}</h4>
                    <span className="text-[11px] text-[#8A837C]">{inq.projectType} • {inq.budget}</span>
                  </div>
                  <Badge
                    variant={
                      (inq.status || "").toLowerCase() === "pending"
                        ? "warning"
                        : (inq.status || "").toLowerCase() === "contacted"
                        ? "info"
                        : "success"
                    }
                  >
                    {inq.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
