import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineBuildingStorefront,
  HiOutlineBriefcase,
  HiOutlineSquare3Stack3D,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineCube,
  HiOutlineSwatch,
  HiOutlineWrenchScrewdriver,
  HiOutlineLightBulb,
  HiOutlineFilm,
  HiOutlineHeart,
  HiOutlineTrophy,
  HiOutlineCpuChip,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight
} from "react-icons/hi2";
import { serviceService } from "../../services/serviceService";
import { servicesData } from "../../data/services";

const iconMap = {
  HiOutlineHome,
  HiOutlineBuildingStorefront,
  HiOutlineBriefcase,
  HiOutlineSquare3Stack3D,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineCube,
  HiOutlineSwatch,
  HiOutlineWrenchSwdriver: HiOutlineWrenchScrewdriver,
  HiOutlineWrenchScrewdriver,
  HiOutlineLightBulb,
  HiOutlineFilm,
  HiOutlineHeart,
  HiOutlineTrophy,
  HiOutlineCpuChip
};

export const ExpertiseSection = () => {
  const [expertiseItems, setExpertiseItems] = useState(servicesData);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await serviceService.getServices();
        if (data && data.length > 0) {
          setExpertiseItems(data);
        } else {
          setExpertiseItems(servicesData);
        }
      } catch (err) {
        setExpertiseItems(servicesData);
      }
    };
    loadServices();
  }, []);

  // Responsive items per page calculation:
  // Desktop (>=1024px): 4 columns x 2 rows = 8 cards
  // Tablet (>=768px): 2 columns x 2 rows = 4 cards
  // Mobile (<768px): 1 column x 2 rows = 2 cards
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsPerPage(8);
      } else if (width >= 768) {
        setCardsPerPage(4);
      } else {
        setCardsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(expertiseItems.length / cardsPerPage) || 1;

  // Ensure active page stays within bounds when resizing
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  // Automatic slide interval when there are multiple pages
  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => clearInterval(interval);
  }, [totalPages, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Slice visible items for current page
  const visibleItems = expertiseItems.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const getGridColsClass = () => {
    if (cardsPerPage === 8) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    if (cardsPerPage === 4) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 max-w-md mx-auto";
  };

  return (
    <section
      className="py-20 sm:py-24 lg:py-28 bg-[#F7F5F2] border-b border-[#E5DED5] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#B08D57]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-[#B08D57]/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-3 block">
              WHAT WE DO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#26221F] leading-tight mb-4">
              Our Expertise
            </h2>
            <div className="w-12 h-[2px] bg-[#B08D57] mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-[#6F6861] font-light leading-relaxed">
              From residential spaces to commercial environments, we create interiors that combine beauty, functionality and timeless design.
            </p>
          </div>

          {/* Navigation Arrows for Slider */}
          {totalPages > 1 && (
            <div className="flex items-center gap-3 self-start md:self-end">
              <button
                onClick={handlePrev}
                aria-label="Previous services page"
                className="w-11 h-11 rounded-full border border-[#E5DED5] bg-white text-[#26221F] hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-all flex items-center justify-center shadow-xs cursor-pointer"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next services page"
                className="w-11 h-11 rounded-full border border-[#E5DED5] bg-white text-[#26221F] hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-all flex items-center justify-center shadow-xs cursor-pointer"
              >
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel / Cards Track */}
        <div
          className="relative min-h-[500px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className={`grid ${getGridColsClass()} gap-5 lg:gap-6 items-stretch`}
            >
              {visibleItems.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || HiOutlineSparkles;
                return (
                  <motion.div
                    key={item.id || idx}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group bg-white rounded-[18px] border border-[#E5DED5] hover:border-[#B08D57]/70 shadow-[0_8px_25px_rgba(38,34,31,0.05)] hover:shadow-[0_16px_35px_rgba(38,34,31,0.12)] transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 lg:p-6 h-full"
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F1EEE9] border border-[#E5DED5] text-[#B08D57] group-hover:bg-[#B08D57] group-hover:text-white group-hover:border-[#B08D57] flex items-center justify-center transition-all duration-300 shadow-xs mb-4">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-[#26221F] group-hover:text-[#B08D57] transition-colors mb-2.5 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#6F6861] font-light leading-relaxed mb-4 line-clamp-2">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* Bottom Action / Arrow */}
                    <div className="pt-3.5 border-t border-[#E5DED5] flex items-center justify-between mt-auto">
                      <span className="text-[11px] sm:text-xs text-[#8A837C] font-medium">
                        Starting {item.startingPrice}
                      </span>
                      <Link
                        to={`/services/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#26221F] group-hover:text-[#B08D57] transition-colors"
                      >
                        <span>Explore</span>
                        <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Navigation Bar (Slide Indicators) */}
        {totalPages > 1 && (
          <div className="mt-10 lg:mt-12 flex items-center justify-center gap-2.5 select-none">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === idx
                    ? "w-8 h-2.5 bg-[#B08D57]"
                    : "w-2.5 h-2.5 bg-[#E5DED5] hover:bg-[#B08D57]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

