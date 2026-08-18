import React from "react";

export const Input = ({
  label,
  id,
  type = "text",
  error,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#2F2A26]">
          {label} {required && <span className="text-[#B08D57]">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-white border ${
            error ? "border-red-400" : "border-[#E5E0DA] focus:border-[#B08D57]"
          } rounded-lg ${
            Icon ? "pl-11" : "px-4"
          } py-2.5 text-sm text-[#1F1F1F] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#B08D57] transition-all`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};
