import React from "react";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";
import { BiSolidQuoteLeft } from "react-icons/bi";

export const TestimonialCard = ({ testimonial, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-7 sm:p-8 border border-[#E5DED5] shadow-[0_10px_30px_rgba(38,34,31,0.06)] hover:shadow-[0_20px_40px_rgba(38,34,31,0.1)] transition-all duration-300 flex flex-col justify-between relative"
    >
      <BiSolidQuoteLeft className="w-10 h-10 text-[#B08D57]/20 absolute top-6 right-6 pointer-events-none" />

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4 text-[#B08D57]">
          {Array.from({ length: 5 }).map((_, i) => (
            <HiStar
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? "text-[#B08D57]" : "text-[#E5DED5]"
              }`}
            />
          ))}
        </div>

        {/* Review Content */}
        <p className="text-sm sm:text-base text-[#26221F] leading-relaxed font-light italic mb-6">
          "{testimonial.review}"
        </p>
      </div>

      {/* Author Section */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#E5DED5]">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border border-[#E5DED5]"
        />
        <div>
          <h4 className="font-serif text-base font-normal text-[#26221F]">
            {testimonial.name}
          </h4>
          <p className="text-xs text-[#6F6861]">{testimonial.role}</p>
          {testimonial.projectName && (
            <span className="text-[11px] font-semibold text-[#B08D57] block mt-0.5">
              Project: {testimonial.projectName}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

