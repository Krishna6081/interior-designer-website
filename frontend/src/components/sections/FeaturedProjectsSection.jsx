import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiArrowRight, HiLocationMarker } from "react-icons/hi";
import { projectService } from "../../services/projectService";
import { SectionHeader } from "../common/SectionHeader";
import { Button } from "../common/Button";

export const FeaturedProjectsSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getProjects();
        if (data && data.length > 0) {
          const featured = data.filter((p) => p.featured || p.status === "Active");
          setProjects(featured.length > 0 ? featured : data);
        }
      } catch (err) {
        console.error("Error loading projects from database:", err);
      }
    };
    loadProjects();
  }, []);

  // Responsive items per page:
  // Desktop (>= 1024px): 4 columns x 2 rows = 8 cards
  // Tablet (>= 768px): 2 columns x 2 rows = 4 cards
  // Mobile (< 768px): 1 column x 2 rows = 2 cards
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

  const totalPages = Math.ceil(projects.length / cardsPerPage) || 1;

  // Ensure current page is valid on window resize
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  // Auto-sliding interval timer
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

  // Touch Swipe Handlers for mobile / tablet
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

  const visibleProjects = projects.slice(
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
      className="py-20 sm:py-28 bg-white border-b border-[#E5DED5] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-3 block">
              SELECTED PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#26221F] leading-tight mb-4">
              Featured Projects
            </h2>
            <div className="w-12 h-[2px] bg-[#B08D57] mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-[#6F6861] font-light leading-relaxed max-w-xl">
              A curated showcase of our finest residential penthouses, corporate offices, and modern living spaces.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start md:self-end">
            <Button variant="primary" onClick={() => navigate("/projects")}>
              View Full Portfolio
            </Button>

            {totalPages > 1 && (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous project page"
                  className="w-11 h-11 rounded-full border border-[#E5DED5] bg-white text-[#26221F] hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-all flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <HiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next project page"
                  className="w-11 h-11 rounded-full border border-[#E5DED5] bg-white text-[#26221F] hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-all flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Projects Slider Track */}
        <div
          className="relative min-h-[540px] overflow-hidden"
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
              {visibleProjects.map((project, idx) => (
                <motion.div
                  key={project.id || idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5DED5] hover:border-[#B08D57]/70 shadow-[0_8px_25px_rgba(38,34,31,0.05)] hover:shadow-[0_18px_38px_rgba(38,34,31,0.12)] transition-all duration-300 flex flex-col justify-between h-full"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F1EEE9]">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26221F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#26221F] shadow-xs border border-[#E5DED5]">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      {project.location && (
                        <div className="flex items-center gap-1 text-[11px] text-[#B08D57] font-medium mb-1.5">
                          <HiLocationMarker className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>
                      )}
                      <h3 className="font-serif text-lg font-normal text-[#26221F] group-hover:text-[#B08D57] transition-colors mb-2 leading-snug">
                        <Link to={`/projects/${project.id}`}>{project.title}</Link>
                      </h3>
                      <p className="text-xs text-[#6F6861] line-clamp-2 leading-relaxed font-light mb-4">
                        {project.shortDescription || project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5DED5] flex items-center justify-between text-xs mt-auto">
                      <span className="text-[11px] text-[#8A837C] font-medium truncate max-w-[50%]">
                        {project.style}
                      </span>
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 font-semibold text-[#26221F] group-hover:text-[#B08D57] transition-colors uppercase tracking-wider text-[11px]"
                      >
                        <span>Explore</span>
                        <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="mt-10 lg:mt-12 flex items-center justify-center gap-2.5 select-none">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                aria-label={`Go to project page ${idx + 1}`}
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
