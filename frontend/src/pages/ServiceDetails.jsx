import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiCheckCircle, HiArrowLeft, HiOutlineClock, HiOutlineCurrencyDollar } from "react-icons/hi";
import { PageHeader } from "../components/layout/PageHeader";
import { Button } from "../components/common/Button";
import { ProjectCard } from "../components/cards/ProjectCard";
import { serviceService } from "../services/serviceService";
import { projectService } from "../services/projectService";

export const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [srvData, projData] = await Promise.all([
          serviceService.getServiceById(id),
          projectService.getProjects()
        ]);

        if (srvData) {
          setService(srvData);
        } else {
          setError("Service not found.");
        }

        if (projData) {
          setRelatedProjects(
            projData.filter((p) => (srvData && p.category && srvData.category && p.category.toLowerCase() === srvData.category.toLowerCase()) || p.featured).slice(0, 3)
          );
        }
      } catch (err) {
        setError("Unable to load service details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-28 bg-[#F7F5F2] text-center text-[#8A837C] font-light">
        Loading service details...
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="py-28 bg-[#F7F5F2] text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E5DED5]">
          <h3 className="font-serif text-2xl font-normal text-[#26221F] mb-3">{error || "Service Not Found"}</h3>
          <p className="text-xs text-[#6F6861] mb-6">The requested interior service could not be found.</p>
          <Button variant="primary" onClick={() => navigate("/services")}>
            Back to All Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={service.title}
        subtitle={`SERVICE / ${(service.category || 'RESIDENTIAL').toUpperCase()}`}
        breadcrumb={[{ name: "Services", path: "/services" }, { name: service.title }]}
        bgImage={service.image}
      />

      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#6F6861] hover:text-[#B08D57] transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-[#E5DED5] mb-10 bg-white">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#26221F] mb-6">
                Overview &amp; Design Scope
              </h2>
              <p className="text-base text-[#6F6861] leading-relaxed font-light mb-8">
                {service.fullDescription || service.shortDescription || service.description}
              </p>

              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] mb-10 shadow-xs">
                  <h3 className="font-serif text-2xl font-normal text-[#26221F] mb-6">
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <HiCheckCircle className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#26221F] font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] mb-10 shadow-xs">
                  <h3 className="font-serif text-2xl font-normal text-[#26221F] mb-6">
                    Key Client Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((ben, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6F6861] font-light">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Sticky Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-xl sticky top-28 flex flex-col gap-6">
                <h3 className="font-serif text-2xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-4">
                  Service Snapshot
                </h3>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F1EEE9] text-[#B08D57] flex items-center justify-center border border-[#E5DED5]">
                    <HiOutlineCurrencyDollar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block">Starting Price</span>
                    <span className="text-base font-semibold text-[#26221F]">{service.startingPrice || "$5,000"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F1EEE9] text-[#B08D57] flex items-center justify-center border border-[#E5DED5]">
                    <HiOutlineClock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block">Estimated Timeline</span>
                    <span className="text-base font-semibold text-[#26221F]">{service.estimatedTime || "4 - 12 Weeks"}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5DED5]">
                  <Button
                    variant="primary"
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/contact")}
                  >
                    Request Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[#E5DED5]">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#26221F] mb-8 text-center">
                Related Featured Projects
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
