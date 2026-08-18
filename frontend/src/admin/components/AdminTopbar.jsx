import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt2, HiExternalLink } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

export const AdminTopbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-[#E5DED5] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg border border-[#E5DED5] text-[#26221F] hover:bg-[#F1EEE9]"
          aria-label="Toggle sidebar"
        >
          <HiMenuAlt2 className="w-5 h-5" />
        </button>

        <span className="text-xs font-semibold uppercase tracking-widest text-[#B08D57] hidden sm:block">
          Studio Management Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#26221F] hover:text-[#B08D57] transition-colors bg-[#F1EEE9] px-3 py-1.5 rounded-lg border border-[#E5DED5]"
        >
          <span>View Main Website</span>
          <HiExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-3 border-l border-[#E5DED5] pl-4">
          <img
            src={
              user?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            }
            alt={user?.name || "Admin"}
            className="w-8 h-8 rounded-full object-cover border border-[#B08D57]"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#26221F]">{user?.name || "Admin User"}</span>
            <span className="text-[10px] text-[#B08D57] uppercase font-bold">{user?.role || "Administrator"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};


