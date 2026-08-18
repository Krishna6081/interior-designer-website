import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowsExpand } from "react-icons/hi";
import { LightboxModal } from "./LightboxModal";

export const GalleryGrid = ({ images = [], columns = 3 }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const colClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <>
      <div className={`grid ${colClasses[columns] || colClasses[3]} gap-4 sm:gap-6`}>
        {images.map((imgUrl, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-[#E5E0DA] bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={imgUrl}
              alt={`Project gallery ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 text-[#2F2A26] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <HiArrowsExpand className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <LightboxModal
        isOpen={lightboxOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};
