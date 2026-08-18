import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineBuildingStorefront,
  HiOutlineBriefcase,
  HiOutlineSquare3Stack3D,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineCube,
  HiOutlineSwatch,
  HiOutlineWrenchScrewdriver,
  HiOutlineLightBulb,
  HiOutlineFilm,
  HiOutlineHeart,
  HiOutlineTrophy,
  HiOutlineCpuChip,
  HiArrowRight
} from "react-icons/hi2";

const iconMap = {
  HiOutlineHome,
  HiOutlineBuildingStorefront,
  HiOutlineBriefcase,
  HiOutlineSquare3Stack3D,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineCube,
  HiOutlineSwatch,
  HiOutlineWrenchSwdriver: HiOutlineWrenchScrewdriver,
  HiOutlineWrenchScrewdriver,
  HiOutlineLightBulb,
  HiOutlineFilm,
  HiOutlineHeart,
  HiOutlineTrophy,
  HiOutlineCpuChip
};

export const ServiceCard = ({ service, index = 0 }) => {
  const IconComponent = iconMap[service.icon] || HiOutlineSparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E5DED5] hover:border-[#B08D57]/60 shadow-[0_10px_30px_rgba(38,34,31,0.06)] hover:shadow-[0_20px_40px_rgba(38,34,31,0.12)] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Service Image Header */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#F1EEE9]">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26221F]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-semibold uppercase tracking-widest text-[#26221F] shadow-xs border border-[#E5DED5]">
              {service.category}
            </span>
          </div>

          {/* Floating Icon Badge */}
          <div className="absolute -bottom-5 left-6 z-10 w-12 h-12 rounded-xl bg-white border border-[#E5DED5] text-[#B08D57] group-hover:bg-[#B08D57] group-hover:text-white group-hover:border-[#B08D57] flex items-center justify-center transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
        </div>

        {/* Content Container */}
        <div className="pt-8 px-6 pb-6 sm:px-7">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#26221F] group-hover:text-[#B08D57] transition-colors mb-3 leading-snug">
            <Link to={`/services/${service.id}`}>{service.title}</Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#6F6861] leading-relaxed mb-4 font-light line-clamp-3">
            {service.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="px-6 pb-6 sm:px-7 pt-4 border-t border-[#E5DED5] flex items-center justify-between mt-auto bg-white">
        <span className="text-xs text-[#8A837C] font-medium">Starting {service.startingPrice}</span>
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#26221F] group-hover:text-[#B08D57] transition-colors"
        >
          <span>Learn More</span>
          <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

