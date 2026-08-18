import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCheck, HiAcademicCap, HiBadgeCheck, HiHeart } from "react-icons/hi";
import { PageHeader } from "../components/layout/PageHeader";
import { SectionHeader } from "../components/common/SectionHeader";
import { Button } from "../components/common/Button";
import { initialContentData } from "../data/content";

export const About = () => {
  const navigate = useNavigate();
  const content = initialContentData;

  const milestones = [
    { year: "2012", title: "Atelier Founded", desc: "Established in Pune as a boutique residential interior consultancy." },
    { year: "2016", title: "Commercial Expansion", desc: "Expanded into high-end retail, hospitality, and corporate headquarters." },
    { year: "2020", title: "3D Virtualization Lab", desc: "Integrated state-of-the-art 4K rendering and VR walkthrough technology." },
    { year: "2025", title: "National Excellence Award", desc: "Awarded Best Luxury Interior Studio for Modern Residential Architecture." }
  ];

  return (
    <div>
      <PageHeader
        title="About Our Studio"
        subtitle="OUR STORY & PHILOSOPHY"
        breadcrumb={[{ name: "About" }]}
        bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
      />

      {/* 1. COMPANY INTRODUCTION (#F7F5F2) */}
      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-3 block">
                WHO WE ARE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#26221F] leading-tight mb-6">
                Crafting Environments Where Life Unfolds Beautifully
              </h2>
              <div className="w-12 h-[2px] bg-[#B08D57] mb-6" />
              <p className="text-base text-[#6F6861] leading-relaxed font-light mb-6">
                At AURA &amp; SPACES, we view interior design as the harmonious bridge between architectural structure and human emotion. Founded over a decade ago, our studio has delivered more than 180 bespoke penthouses, private villas, corporate suites, and boutique spaces across India and abroad.
              </p>
              <p className="text-base text-[#6F6861] leading-relaxed font-light mb-8">
                Our approach rejects transient trends in favor of warm minimalism, enduring tactile materials, and spatial proportion. Every project is approached as an original piece of living art.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center shrink-0">
                    <HiCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-[#26221F]">Bespoke Joinery Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center shrink-0">
                    <HiCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-[#26221F]">Turnkey Project Control</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center shrink-0">
                    <HiCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-[#26221F]">4K Virtual 3D Renders</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center shrink-0">
                    <HiCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-[#26221F]">Fixed BOQ Transparency</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5DED5]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Interior Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DESIGNER INTRODUCTION (#FCFBF9) */}
      <section className="py-20 sm:py-28 bg-[#FCFBF9] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E5DED5] shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E5DED5] shadow-md">
              <img
                src={content.designerMessage.avatar}
                alt={content.designerMessage.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-2 flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-2">
                LEADERSHIP
              </span>
              <h3 className="font-serif text-3xl font-normal text-[#26221F] mb-1">
                {content.designerMessage.name}
              </h3>
              <span className="text-xs text-[#6F6861] uppercase tracking-wider mb-6 block font-medium">
                {content.designerMessage.title}
              </span>

              <blockquote className="font-serif text-xl sm:text-2xl text-[#26221F] font-normal leading-relaxed italic mb-6 border-l-4 border-[#B08D57] pl-6">
                "{content.designerMessage.quote}"
              </blockquote>

              <p className="text-sm text-[#6F6861] leading-relaxed font-light mb-6">
                With a Master's degree in Interior Architecture from Domus Academy Milan and over 14 years of hands-on practice, Aarav leads our creative studio with an unyielding devotion to texture, light balance, and ergonomic comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (#F1EEE9) */}
      <section className="py-20 sm:py-28 bg-[#F1EEE9] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="OUR PURPOSE"
            title="Mission & Vision"
            description="The core values that guide every drawing, material choice, and client interaction."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DED5] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#B08D57]/15 text-[#B08D57] flex items-center justify-center mb-6">
                <HiAcademicCap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#26221F] mb-4">Our Mission</h3>
              <p className="text-sm text-[#6F6861] leading-relaxed font-light">
                {content.missionVision.mission}
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DED5] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#B08D57]/15 text-[#B08D57] flex items-center justify-center mb-6">
                <HiBadgeCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#26221F] mb-4">Our Vision</h3>
              <p className="text-sm text-[#6F6861] leading-relaxed font-light">
                {content.missionVision.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS / MILESTONES (#F7F5F2) */}
      <section className="py-20 sm:py-28 bg-[#F7F5F2] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="OUR JOURNEY"
            title="Studio Milestones"
            description="A decade of continuous innovation and architectural growth."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white border border-[#E5DED5] p-6 rounded-2xl shadow-xs">
                <span className="font-serif text-3xl font-normal text-[#B08D57] block mb-2">{m.year}</span>
                <h4 className="font-serif text-lg font-normal text-[#26221F] mb-2">{m.title}</h4>
                <p className="text-xs text-[#6F6861] font-light leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (#EDE8E1) */}
      <section className="py-20 bg-[#EDE8E1] text-[#26221F] text-center border-b border-[#E5DED5]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-4">Ready to Transform Your Living Space?</h2>
          <p className="text-base text-[#6F6861] font-light mb-8">Schedule an in-person design consultation at our studio or online.</p>
          <Button variant="primary" size="lg" onClick={() => navigate("/contact")}>
            Schedule Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

