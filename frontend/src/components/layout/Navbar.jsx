import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3, HiX, HiUser, HiLogout } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../common/Button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F5F2]/95 backdrop-blur-md border-b border-[#E5DED5] py-3 shadow-xs"
          : "bg-[#F7F5F2]/80 backdrop-blur-sm border-b border-[#E5DED5]/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#B08D57] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:bg-[#7A6240] transition-colors">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-wider font-semibold text-[#26221F]">
                AURA &amp; SPACES
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] font-medium text-[#8A837C]">
                Interior Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-[#B08D57] font-semibold"
                      : "text-[#26221F] hover:text-[#B08D57]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B08D57] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA / User Controls */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#E5DED5] bg-white text-[#26221F] hover:border-[#B08D57] transition-all shadow-xs"
                >
                  <HiUser className="w-4 h-4 text-[#B08D57]" />
                  <span>{user.name}</span>
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E5DED5] py-2 z-50 text-left"
                    >
                      <div className="px-4 py-2.5 border-b border-[#E5DED5]">
                        <p className="text-xs font-semibold text-[#26221F]">{user.name}</p>
                        <p className="text-[11px] text-[#6F6861] truncate">{user.email}</p>
                      </div>

                      {isAdmin ? (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-xs font-semibold text-[#B08D57] hover:bg-[#F7F5F2] transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-xs font-medium text-[#26221F] hover:bg-[#F7F5F2] transition-colors"
                        >
                          My Profile
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left transition-colors font-medium"
                      >
                        <HiLogout className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs uppercase tracking-widest font-semibold px-3 py-2 text-[#26221F] hover:text-[#B08D57] transition-colors"
              >
                Login
              </Link>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/contact")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-[#26221F] hover:bg-[#F1EEE9] border border-[#E5DED5] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FCFBF9] border-b border-[#E5DED5] shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-widest py-3 border-b border-[#E5DED5]/60 flex items-center justify-between font-medium ${
                    location.pathname === link.path
                      ? "text-[#B08D57] font-semibold"
                      : "text-[#26221F] hover:text-[#B08D57]"
                  }`}
                >
                  <span>{link.name}</span>
                  {location.pathname === link.path && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                  )}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="pt-3 flex flex-col gap-2.5">
                  <div className="p-3 bg-[#F1EEE9] rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#26221F]">{user.name}</p>
                      <p className="text-[10px] text-[#6F6861]">{user.email}</p>
                    </div>
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        className="text-xs font-semibold text-[#B08D57] px-2.5 py-1 bg-white rounded-lg border border-[#E5DED5]"
                      >
                        Admin
                      </Link>
                    ) : (
                      <Link
                        to="/profile"
                        className="text-xs font-semibold text-[#26221F] px-2.5 py-1 bg-white rounded-lg border border-[#E5DED5]"
                      >
                        Profile
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="text-xs font-semibold text-rose-600 py-2 text-left hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-3">
                  <Link
                    to="/login"
                    className="text-center py-2.5 text-xs uppercase tracking-widest font-semibold text-[#26221F] bg-white border border-[#E5DED5] rounded-xl"
                  >
                    Login
                  </Link>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => navigate("/contact")}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

