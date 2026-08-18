import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { SectionHeader } from "../components/common/SectionHeader";
import { ServiceCard } from "../components/cards/ServiceCard";
import { FilterBar } from "../components/common/FilterBar";
import { Button } from "../components/common/Button";
import { serviceService } from "../services/serviceService";

export const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Office",
    "Kitchen",
    "Living",
    "Bedroom",
    "Bathroom",
    "Visualization",
    "Furniture",
    "Renovation",
    "Lighting",
    "Outdoor",
    "Entertainment",
    "Wellness",
    "Styling",
    "Smart Home"
  ];

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await serviceService.getServices();
        setServices(data || []);
      } catch (err) {
        setError("Unable to load services at this time. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category && s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div>
      <PageHeader
        title="Interior Design Services"
        subtitle="OUR EXPERTISE"
        breadcrumb={[{ name: "Services" }]}
        bgImage="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="TAILORED SOLUTIONS"
            title="Comprehensive Design Offerings"
            description="Explore our specialized interior design services crafted for residential estates, corporate headquarters, and luxury commercial venues."
            className="mb-10"
          />

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <FilterBar
              categories={categories}
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {loading && (
            <div className="text-center py-12 text-[#8A837C] font-light">
              Loading services...
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-rose-600 bg-rose-50 rounded-2xl max-w-md mx-auto mb-8 border border-rose-200 text-xs">
              {error}
            </div>
          )}

          {/* Services Grid */}
          {!loading && filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E5DED5]">
                <p className="text-[#8A837C] font-light">No services available for category "{selectedCategory}".</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* DESIGN APPROACH */}
      <section className="py-20 sm:py-24 bg-[#FCFBF9] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="METHODOLOGY"
            title="Our Bespoke Design Approach"
            description="We balance artistic creativity with rigorous engineering precision."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-xs">
              <span className="font-serif text-3xl font-normal text-[#B08D57] block mb-3">01</span>
              <h3 className="font-serif text-xl font-normal text-[#26221F] mb-2">Discovery &amp; Spatial Audit</h3>
              <p className="text-xs text-[#6F6861] leading-relaxed font-light">
                Understanding lighting orientations, room flows, architectural constraints, and lifestyle preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-xs">
              <span className="font-serif text-3xl font-normal text-[#B08D57] block mb-3">02</span>
              <h3 className="font-serif text-xl font-normal text-[#26221F] mb-2">4K 3D Visualization</h3>
              <p className="text-xs text-[#6F6861] leading-relaxed font-light">
                Simulating exact surface textures, joinery cuts, and ambient lighting before any physical construction begins.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-xs">
              <span className="font-serif text-3xl font-normal text-[#B08D57] block mb-3">03</span>
              <h3 className="font-serif text-xl font-normal text-[#26221F] mb-2">White-Glove Turnkey Handover</h3>
              <p className="text-xs text-[#6F6861] leading-relaxed font-light">
                Managing every civil sub-contractor, material import, and final artwork placement for a seamless delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#EDE8E1] text-[#26221F] text-center border-b border-[#E5DED5]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-4">Have a Specific Project Requirement?</h2>
          <p className="text-base text-[#6F6861] font-light mb-8">Let's discuss how we can tailor our services for your property.</p>
          <Button variant="primary" size="lg" onClick={() => navigate("/contact")}>
            Request Service Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};
