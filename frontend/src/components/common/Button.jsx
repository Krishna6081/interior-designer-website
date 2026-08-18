import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#B08D57] text-white hover:bg-[#7A6240] shadow-sm hover:shadow-md focus:ring-[#B08D57]",
    secondary: "bg-transparent border border-[#B08D57] text-[#7A6240] hover:bg-[#B08D57] hover:text-white shadow-xs focus:ring-[#B08D57]",
    outline: "border border-[#E5DED5] bg-white text-[#26221F] hover:border-[#B08D57] hover:text-[#B08D57] focus:ring-[#B08D57]",
    ghost: "text-[#26221F] hover:bg-[#F1EEE9] hover:text-[#B08D57] focus:ring-[#B08D57]",
    dark: "bg-[#26221F] text-white hover:bg-[#7A6240] shadow-sm hover:shadow-md focus:ring-[#26221F]"
  };

  const sizes = {
    sm: "px-3.5 py-2 text-xs gap-1.5 font-semibold uppercase tracking-wider",
    md: "px-5 py-2.5 text-xs gap-2 font-semibold uppercase tracking-widest",
    lg: "px-7 py-3.5 text-sm gap-2.5 font-semibold uppercase tracking-widest"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
};

