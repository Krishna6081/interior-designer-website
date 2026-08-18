import React from "react";

export const Select = ({
  label,
  id,
  options = [],
  value,
  onChange,
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#2F2A26]">
          {label} {required && <span className="text-[#B08D57]">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-white border ${
          error ? "border-red-400" : "border-[#E5E0DA] focus:border-[#B08D57]"
        } rounded-lg px-4 py-2.5 text-sm text-[#1F1F1F] focus:outline-none focus:ring-1 focus:ring-[#B08D57] transition-all`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value !== undefined ? opt.value : opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};
