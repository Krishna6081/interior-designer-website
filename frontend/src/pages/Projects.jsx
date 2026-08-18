import React, { useState, useEffect } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { SectionHeader } from "../components/common/SectionHeader";
import { ProjectCard } from "../components/cards/ProjectCard";
import { FilterBar } from "../components/common/FilterBar";
import { SearchBar } from "../components/common/SearchBar";
import { projectService } from "../services/projectService";
export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Office",
    "Kitchen",
    "Bedroom",
    "Living Room",
    "Luxury",
    "Modern"
  ];

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await projectService.getProjects(selectedCategory === "All" ? null : selectedCategory);
        setProjects(data || []);
      } catch (err) {
        setError("Unable to load portfolio projects from database.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [selectedCategory]);

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (proj.category && proj.category.toLowerCase() === selectedCategory.toLowerCase()) ||
      (proj.style && proj.style.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      (proj.title && proj.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (proj.location && proj.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (proj.style && proj.style.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Portfolio &amp; Selected Works"
        subtitle="OUR GALLERY"
        breadcrumb={[{ name: "Projects" }]}
        bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="CURATED SPACES"
            title="Explore Completed Residences &amp; Workspaces"
            description="Browse through our portfolio of penthouses, minimalist kitchens, corporate suites, and coastal villas."
            className="mb-10"
          />

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <FilterBar
              categories={categories}
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title, style or location..."
            />
          </div>

          {loading && (
            <div className="text-center py-12 text-[#8A837C] font-light">
              Loading portfolio projects...
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-rose-600 bg-rose-50 rounded-2xl max-w-md mx-auto mb-8 border border-rose-200 text-xs">
              {error}
            </div>
          )}

          {/* Projects Grid */}
          {!loading && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E5DED5]">
                <h4 className="font-serif text-xl text-[#26221F] mb-2">No Projects Match Your Search</h4>
                <p className="text-sm text-[#8A837C] font-light">Try adjusting your category filter or search query.</p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};
