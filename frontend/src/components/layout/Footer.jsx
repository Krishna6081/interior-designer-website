import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP
} from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";
import { settingsService } from "../../services/settingsService";

export const Footer = () => {
  const [settings, setSettings] = useState({
    companyName: "AURA & SPACES",
    phone: "+91 (020) 2612-8899",
    email: "concierge@auraspaces.com",
    address: "Suite 401, Grand Atelier Tower, Koregaon Park, Pune, Maharashtra 411001",
    businessHours: "Monday - Saturday: 09:30 AM - 07:00 PM (Closed Sundays)",
    instagram: "https://instagram.com/auraspaces.design",
    facebook: "https://facebook.com/auraspaces",
    linkedin: "https://linkedin.com/company/auraspaces",
    pinterest: "https://pinterest.com/auraspaces"
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (err) {
        // Fallback initialized in state
      }
    };
    loadSettings();
  }, []);

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Portfolio Projects", path: "/projects" },
    { name: "Client Reviews", path: "/testimonials" },
    { name: "Contact Studio", path: "/contact" }
  ];

  const servicesList = [
    { name: "Residential Interior Design", path: "/services/residential-design" },
    { name: "Commercial Interior Design", path: "/services/commercial-design" },
    { name: "Office Workspaces", path: "/services/office-design" },
    { name: "Modular Kitchens", path: "/services/modular-kitchen" },
    { name: "3D Visualization", path: "/services/3d-visualization" },
    { name: "Turnkey Renovation", path: "/services/renovation-services" }
  ];

  return (
    <footer className="bg-[#26221F] text-white pt-16 sm:pt-20 pb-10 border-t border-[#B08D57]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#B08D57] text-white flex items-center justify-center font-serif text-lg font-bold">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wider font-semibold text-white">
                  {settings.companyName || "AURA & SPACES"}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B08D57] font-medium">
                  Interior Architecture
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Crafting bespoke residential and commercial environments through warm minimalism, precision joinery, and architectural elegance.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#B08D57] hover:border-[#B08D57] transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#B08D57] hover:border-[#B08D57] transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#B08D57] hover:border-[#B08D57] transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href={settings.pinterest}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#B08D57] hover:border-[#B08D57] transition-all"
                aria-label="Pinterest"
              >
                <FaPinterestP className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-[#B08D57] mb-5">
              Quick Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-xs text-gray-300 hover:text-[#B08D57] transition-colors font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-serif text-lg font-medium text-[#B08D57] mb-5">
              Design Expertise
            </h4>
            <ul className="flex flex-col gap-2.5">
              {servicesList.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-xs text-gray-300 hover:text-[#B08D57] transition-colors font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-lg font-medium text-[#B08D57] mb-1">
              Studio Atelier
            </h4>
            
            <div className="flex items-start gap-3 text-xs text-gray-300 leading-relaxed font-light">
              <HiLocationMarker className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-300 font-light">
              <HiPhone className="w-4 h-4 text-[#B08D57] shrink-0" />
              <span>{settings.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-300 font-light">
              <HiMail className="w-4 h-4 text-[#B08D57] shrink-0" />
              <span>{settings.email}</span>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                Business Hours
              </span>
              <p className="text-xs text-gray-300 font-light">{settings.businessHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-light">
          <p>© {new Date().getFullYear()} {settings.companyName || "AURA & SPACES"}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/admin/login" className="text-[#B08D57] hover:underline font-semibold">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
