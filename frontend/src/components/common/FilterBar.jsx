import React from "react";

export const FilterBar = ({ categories = [], activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full whitespace-nowrap transition-all duration-300 ${
              isActive
                ? "bg-[#2F2A26] text-white shadow-sm"
                : "bg-white text-[#6B625B] border border-[#E5E0DA] hover:border-[#B08D57] hover:text-[#2F2A26]"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
