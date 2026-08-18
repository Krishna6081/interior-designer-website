import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

export const PageHeader = ({ title, subtitle, breadcrumb = [], bgImage }) => {
  const defaultBg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 bg-[#26221F] text-white overflow-hidden border-b border-[#B08D57]/20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage || defaultBg}
          alt={title}
          className="w-full h-full object-cover opacity-25 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26221F] via-[#26221F]/80 to-[#26221F]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B08D57] mb-4 font-medium">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {breadcrumb.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <HiChevronRight className="w-3.5 h-3.5 text-gray-400" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-white transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-gray-200 font-semibold">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {subtitle && (
          <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-2">
            {subtitle}
          </span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight max-w-3xl"
        >
          {title}
        </motion.h1>

        <div className="w-16 h-[2px] bg-[#B08D57] my-5 rounded-full" />
      </div>
    </section>
  );
};

