import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-xl",
  showClose = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`relative w-full ${maxWidth} bg-[#FAF9F7] rounded-2xl shadow-2xl border border-[#E5E0DA] overflow-hidden my-auto z-10`}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0DA] bg-white">
                <h3 className="font-serif text-xl font-medium text-[#2F2A26]">{title}</h3>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-1 text-gray-400 hover:text-[#2F2A26] rounded-lg transition-colors"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
