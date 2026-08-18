import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowNarrowRight, HiLocationMarker } from "react-icons/hi";

export const ProjectCard = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5DED5] hover:border-[#B08D57]/60 shadow-[0_10px_30px_rgba(38,34,31,0.06)] hover:shadow-[0_20px_40px_rgba(38,34,31,0.12)] transition-all duration-500 flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1EEE9]">
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26221F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-semibold uppercase tracking-widest text-[#26221F] shadow-xs border border-[#E5DED5]">
            {project.category}
          </span>
        </div>

        {/* Floating View Link */}
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Link
            to={`/projects/${project.id}`}
            aria-label={`View ${project.title}`}
            className="w-10 h-10 rounded-full bg-[#B08D57] text-white flex items-center justify-center shadow-md hover:bg-[#7A6240] transition-colors"
          >
            <HiArrowNarrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#B08D57] font-medium mb-2">
            <HiLocationMarker className="w-3.5 h-3.5 shrink-0" />
            <span>{project.location}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#26221F] group-hover:text-[#B08D57] transition-colors mb-2 leading-snug">
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </h3>
          <p className="text-xs text-[#6F6861] line-clamp-2 leading-relaxed font-light mb-4">
            {project.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-[#E5DED5] flex items-center justify-between text-xs text-[#8A837C]">
          <span className="font-medium">{project.style}</span>
          <Link
            to={`/projects/${project.id}`}
            className="font-semibold text-[#26221F] hover:text-[#B08D57] transition-colors uppercase tracking-widest text-[11px]"
          >
            View Project
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

