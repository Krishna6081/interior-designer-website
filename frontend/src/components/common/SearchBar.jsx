import React from "react";
import { HiSearch, HiX } from "react-icons/hi";

export const SearchBar = ({ value, onChange, placeholder = "Search...", onClear }) => {
  return (
    <div className="relative flex items-center w-full max-w-md">
      <HiSearch className="absolute left-3.5 text-gray-400 w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-[#E5E0DA] rounded-lg pl-10 pr-9 py-2 text-sm text-[#1F1F1F] placeholder-gray-400 focus:outline-none focus:border-[#B08D57] transition-all"
      />
      {value && (
        <button
          onClick={onClear || (() => onChange(""))}
          className="absolute right-3 text-gray-400 hover:text-gray-600 p-0.5"
        >
          <HiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
