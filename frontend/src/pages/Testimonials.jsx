import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { SectionHeader } from "../components/common/SectionHeader";
import { TestimonialCard } from "../components/cards/TestimonialCard";
import { Button } from "../components/common/Button";
import { testimonialService } from "../services/testimonialService";

export const Testimonials = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await testimonialService.getTestimonials();
        setTestimonials(data || []);
      } catch (err) {
        setError("Unable to load testimonials at this time.");
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  return (
    <div>
      <PageHeader
        title="Client Reviews &amp; Testimonials"
        subtitle="VERIFIED REVIEWS"
        breadcrumb={[{ name: "Testimonials" }]}
        bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="CLIENT SATISFACTION"
            title="Stories of Transformed Spaces"
            description="Read firsthand experiences from homeowners, corporate leaders, and art collectors who partnered with our studio."
            className="mb-16"
          />

          {loading && (
            <div className="text-center py-12 text-[#8A837C] font-light">
              Loading client testimonials...
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-rose-600 bg-rose-50 rounded-2xl max-w-md mx-auto mb-8 border border-rose-200 text-xs">
              {error}
            </div>
          )}

          {!loading && testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <TestimonialCard key={t.id} testimonial={t} index={idx} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E5DED5]">
                <p className="text-[#8A837C] font-light">No approved testimonials to display yet.</p>
              </div>
            )
          )}

          {/* Rating Summary Banner */}
          <div className="mt-16 bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-serif text-3xl font-normal text-[#26221F] block">4.98 / 5.0 Rating</span>
              <p className="text-xs text-[#6F6861] font-light">Based on 180+ completed turnkey luxury projects across India &amp; global clients.</p>
            </div>
            <Button variant="primary" onClick={() => navigate("/contact")}>
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
