import React from "react";
import { motion } from "framer-motion";

export const SectionHeader = ({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
  className = ""
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col max-w-2xl ${alignClasses[align]} ${className}`}
    >
      {subtitle && (
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B08D57] mb-2.5">
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight ${
          light ? "text-white" : "text-[#26221F]"
        }`}>
          {title}
        </h2>
      )}
      <div className="w-12 h-[2px] bg-[#B08D57] my-4 rounded-full" />
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed font-light ${
          light ? "text-gray-300" : "text-[#6F6861]"
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

