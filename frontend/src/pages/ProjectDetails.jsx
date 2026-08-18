import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiArrowLeft, HiLocationMarker, HiCalendar, HiSparkles, HiViewGrid } from "react-icons/hi";
import { PageHeader } from "../components/layout/PageHeader";
import { GalleryGrid } from "../components/gallery/GalleryGrid";
import { ProjectCard } from "../components/cards/ProjectCard";
import { Button } from "../components/common/Button";
import { projectService } from "../services/projectService";

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjectDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [projData, allProj] = await Promise.all([
          projectService.getProjectById(id),
          projectService.getProjects()
        ]);

        if (projData) {
          setProject(projData);
        } else {
          setError("Project not found.");
        }

        if (allProj) {
          setRelatedProjects(allProj.filter((p) => String(p.id) !== String(id)).slice(0, 3));
        }
      } catch (err) {
        setError("Unable to load project details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProjectDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-28 bg-[#F7F5F2] text-center text-[#8A837C] font-light">
        Loading project details...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-28 bg-[#F7F5F2] text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E5DED5]">
          <h3 className="font-serif text-2xl font-normal text-[#26221F] mb-3">{error || "Project Not Found"}</h3>
          <p className="text-xs text-[#6F6861] mb-6">The requested project could not be found or has been removed.</p>
          <Button variant="primary" onClick={() => navigate("/projects")}>
            Back to Projects Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={project.title}
        subtitle={`PROJECT / ${(project.category || 'RESIDENTIAL').toUpperCase()}`}
        breadcrumb={[{ name: "Projects", path: "/projects" }, { name: project.title }]}
        bgImage={project.heroImage}
      />

      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#6F6861] hover:text-[#B08D57] transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Key Specifications Grid Banner */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E5DED5] shadow-lg mb-14 grid grid-cols-2 md:grid-cols-5 gap-6 text-left">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                Category
              </span>
              <span className="text-sm font-semibold text-[#26221F]">{project.category}</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                Location
              </span>
              <span className="text-sm font-semibold text-[#26221F] flex items-center gap-1">
                <HiLocationMarker className="w-3.5 h-3.5 text-[#B08D57]" />
                {project.location}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                Total Area
              </span>
              <span className="text-sm font-semibold text-[#26221F] flex items-center gap-1">
                <HiViewGrid className="w-3.5 h-3.5 text-[#B08D57]" />
                {project.area}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                Design Style
              </span>
              <span className="text-sm font-semibold text-[#26221F] flex items-center gap-1">
                <HiSparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                {project.style}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                Completed
              </span>
              <span className="text-sm font-semibold text-[#26221F] flex items-center gap-1">
                <HiCalendar className="w-3.5 h-3.5 text-[#B08D57]" />
                {project.completionDate}
              </span>
            </div>
          </div>

          {/* Project Hero Image & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl font-normal text-[#26221F] mb-4">
                Design Concept &amp; Architectural Brief
              </h2>
              <p className="text-base text-[#6F6861] leading-relaxed font-light mb-6">
                {project.description}
              </p>
              <p className="text-base text-[#6F6861] leading-relaxed font-light">
                Our architectural team oversaw spatial reconfiguration, bespoke millwork manufacturing, lighting design, and soft furnishings curation. Every detail was executed to achieve maximum acoustic tranquility and visual harmony.
              </p>
            </div>

            <div className="bg-[#26221F] text-white p-8 rounded-2xl flex flex-col justify-between border border-[#B08D57]/30">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block mb-2">
                  CLIENT HIGHLIGHT
                </span>
                <h4 className="font-serif text-xl font-normal mb-4">{project.client}</h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                  "Working with AURA &amp; SPACES brought immense clarity and refinement to our vision. The resulting space is a joy to experience every day."
                </p>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate("/contact")}
              >
                Inquire Similar Space
              </Button>
            </div>
          </div>

          {/* PROJECT GALLERY */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#26221F]">
                Project Gallery ({project.gallery ? project.gallery.length : 1} High-Res Shots)
              </h3>
              <span className="text-xs text-[#8A837C]">Click any image for full-screen view</span>
            </div>

            <GalleryGrid images={project.gallery || [project.heroImage]} columns={3} />
          </div>

          {/* RELATED PROJECTS */}
          {relatedProjects.length > 0 && (
            <div className="pt-16 border-t border-[#E5DED5]">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#26221F] mb-8">
                Explore More Featured Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((proj, idx) => (
                  <ProjectCard key={proj.id} project={proj} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
