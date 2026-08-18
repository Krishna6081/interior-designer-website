import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-[#E5E0DA] text-[#2F2A26] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
      >
        <HiChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-sm font-medium rounded-lg transition-all ${
            currentPage === p
              ? "bg-[#2F2A26] text-white shadow-sm"
              : "bg-white text-[#2F2A26] border border-[#E5E0DA] hover:border-[#B08D57]"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-[#E5E0DA] text-[#2F2A26] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
      >
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
