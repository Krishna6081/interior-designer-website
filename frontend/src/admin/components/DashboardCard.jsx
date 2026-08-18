import React from "react";
import { motion } from "framer-motion";

export const DashboardCard = ({ title, value, change, icon: Icon, color = "gold", index = 0 }) => {
  const colorMap = {
    gold: "text-[#B08D57] bg-[#B08D57]/10 border-[#B08D57]/30",
    dark: "text-[#26221F] bg-[#26221F]/10 border-[#26221F]/30",
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-200",
    blue: "text-blue-700 bg-blue-50 border-blue-200",
    amber: "text-amber-700 bg-amber-50 border-amber-200"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white p-6 rounded-2xl border border-[#E5DED5] shadow-xs flex items-center justify-between hover:shadow-md transition-shadow"
    >
      <div>
        <span className="text-xs uppercase tracking-wider text-[#6F6861] font-medium block mb-1">
          {title}
        </span>
        <span className="font-serif text-3xl font-normal text-[#26221F] block">
          {value}
        </span>
        {change && (
          <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">
            {change}
          </span>
        )}
      </div>

      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color] || colorMap.gold}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </motion.div>
  );
};

