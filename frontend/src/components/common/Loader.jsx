import React from "react";

export const Loader = ({ size = "md", text = "Loading..." }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div
        className={`${sizes[size]} border-[#E5E0DA] border-t-[#B08D57] rounded-full animate-spin`}
      />
      {text && <span className="text-xs uppercase tracking-widest text-[#6B625B]">{text}</span>}
    </div>
  );
};
