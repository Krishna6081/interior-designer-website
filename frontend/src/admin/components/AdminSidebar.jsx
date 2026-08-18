import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
  HiOutlineFolder,
  HiOutlineChatBubbleLeftRight,
  HiOutlineInbox,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineArrowLeftOnRectangle,
  HiXMark
} from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";

export const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: HiOutlineSquares2X2 },
    { name: "Users", path: "/admin/users", icon: HiOutlineUsers },
    { name: "Services", path: "/admin/services", icon: HiOutlineWrenchScrewdriver },
    { name: "Projects", path: "/admin/projects", icon: HiOutlineFolder },
    { name: "Testimonials", path: "/admin/testimonials", icon: HiOutlineChatBubbleLeftRight },
    { name: "Inquiries", path: "/admin/inquiries", icon: HiOutlineInbox },
    { name: "Website Content", path: "/admin/content", icon: HiOutlineDocumentText },
    { name: "Settings", path: "/admin/settings", icon: HiOutlineCog },
    { name: "My Profile", path: "/admin/profile", icon: HiOutlineUser }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#FCFBF9] text-[#26221F] border-r border-[#E5DED5] flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5DED5]">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B08D57] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider font-semibold text-[#26221F]">
                  AURA ADMIN
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#B08D57]">
                  Control Panel
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-[#8A837C] hover:text-[#26221F]"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                    isActive
                      ? "bg-[#B08D57] text-white shadow-xs font-semibold"
                      : "text-[#6F6861] hover:bg-[#F1EEE9] hover:text-[#26221F]"
                  }`}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-[#E5DED5]">
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
          >
            <HiOutlineArrowLeftOnRectangle className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

