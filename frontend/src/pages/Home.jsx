import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiCheckCircle,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock
} from "react-icons/hi";
import {
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineCheckBadge,
  HiOutlineDocumentCheck
} from "react-icons/hi2";

import { SectionHeader } from "../components/common/SectionHeader";
import { Button } from "../components/common/Button";
import { ServiceCard } from "../components/cards/ServiceCard";
import { ExpertiseSection } from "../components/sections/ExpertiseSection";
import { FeaturedProjectsSection } from "../components/sections/FeaturedProjectsSection";
import { ProjectCard } from "../components/cards/ProjectCard";
import { TestimonialCard } from "../components/cards/TestimonialCard";
import { serviceService } from "../services/serviceService";
import { projectService } from "../services/projectService";
import { testimonialService } from "../services/testimonialService";
import { settingsService } from "../services/settingsService";
import { initialContentData } from "../data/content";

export const Home = () => {
  const navigate = useNavigate();
  const content = initialContentData;
  const [settings, setSettings] = React.useState({
    companyName: "AURA & SPACES",
    phone: "+91 (020) 2612-8899",
    email: "concierge@auraspaces.com",
    address: "Suite 401, Grand Atelier Tower, Koregaon Park, Pune, Maharashtra 411001",
    businessHours: "Monday - Saturday: 09:30 AM - 07:00 PM (Closed Sundays)"
  });

  const [featuredProjects, setFeaturedProjects] = React.useState([]);
  const [sampleTestimonials, setSampleTestimonials] = React.useState([]);

  React.useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [pData, tData, sData] = await Promise.all([
          projectService.getProjects(),
          testimonialService.getTestimonials(),
          settingsService.getSettings()
        ]);
        if (pData) setFeaturedProjects(pData.filter((p) => p.featured).slice(0, 6));
        if (tData) setSampleTestimonials(tData.slice(0, 3));
        if (sData) setSettings(sData);
      } catch (err) {
        // Handled by service fallbacks
      }
    };
    loadHomeData();
  }, []);

  const whyChooseUsPillars = [
    {
      icon: HiOutlineUserGroup,
      title: "Experienced Designers",
      desc: "Architectural masters with over 14 years of award-winning interior design experience."
    },
    {
      icon: HiOutlineSparkles,
      title: "Personalized Designs",
      desc: "Bespoke spatial concepts customized exclusively around your personal lifestyle."
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Premium Materials",
      desc: "Curated Italian marbles, German hardware, and rare hardwood timber finishes."
    },
    {
      icon: HiOutlineCheckBadge,
      title: "Attention to Detail",
      desc: "Flawless joinery, hidden acoustic lighting, and millimeter-precise execution."
    },
    {
      icon: HiOutlineClock,
      title: "On-Time Delivery",
      desc: "Guaranteed project timelines with zero unapproved delay risks."
    },
    {
      icon: HiOutlineDocumentCheck,
      title: "Transparent Process",
      desc: "Clear itemized BOQ pricing, zero hidden costs, and daily progress reporting."
    }
  ];

  const designProcessSteps = [
    {
      step: "01",
      title: "Consultation",
      desc: "In-depth spatial evaluation, lifestyle analysis, and initial budget alignment."
    },
    {
      step: "02",
      title: "Concept & Planning",
      desc: "Architectural layout, mood boards, material selection, and 2D floor plans."
    },
    {
      step: "03",
      title: "3D Visualization",
      desc: "Photorealistic 4K renders and virtual walkthroughs before physical builds."
    },
    {
      step: "04",
      title: "Execution",
      desc: "Civil work, custom cabinetry fabrication, and on-site white-glove assembly."
    },
    {
      step: "05",
      title: "Final Reveal",
      desc: "Fine art placement, deep cleaning, and formal keys-over celebratory walkthrough."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION (#F7F5F2 with radial depth) */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-28 bg-[#F7F5F2] bg-radial-subtle text-[#26221F] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-4 bg-[#B08D57]/10 px-4 py-1.5 rounded-full border border-[#B08D57]/20 shadow-xs"
              >
                Luxury Interior Architecture
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] text-[#26221F] mb-6"
              >
                {content.hero.heading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-[#6F6861] leading-relaxed font-light max-w-2xl mb-10"
              >
                {content.hero.subheading}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/projects")}
                >
                  {content.hero.primaryBtnText}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/contact")}
                >
                  {content.hero.secondaryBtnText}
                </Button>
              </motion.div>

              {/* Quick Stat Pill Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-[#E5DED5] grid grid-cols-3 gap-6 w-full max-w-lg"
              >
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-[#26221F] block">14+</span>
                  <span className="text-[10px] sm:text-xs text-[#8A837C] uppercase tracking-wider font-medium">Years Practice</span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-[#26221F] block">180+</span>
                  <span className="text-[10px] sm:text-xs text-[#8A837C] uppercase tracking-wider font-medium">Projects Handed Over</span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-[#26221F] block">100%</span>
                  <span className="text-[10px] sm:text-xs text-[#8A837C] uppercase tracking-wider font-medium">Fixed BOQ Guarantee</span>
                </div>
              </motion.div>
            </div>

            {/* Right Hero Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#E5DED5] shadow-[0_20px_50px_rgba(38,34,31,0.12)] relative z-10 bg-white">
                <img
                  src={content.hero.heroImage}
                  alt="Luxury Architectural Living Space"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Background Accent */}
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-[#EDE8E1] rounded-3xl -z-0 border border-[#E5DED5] hidden sm:block" />

            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW (#FCFBF9) */}
      <section className="py-20 sm:py-28 bg-[#FCFBF9] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#E5DED5] shadow-[0_15px_35px_rgba(38,34,31,0.08)] bg-white">
                <img
                  src={content.aboutPreview.previewImage}
                  alt="Interior Design Studio"
                  className="w-full h-full object-cover"
                />
              </div>

            </motion.div>

            {/* Right Text Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-start"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-3">
                {content.aboutPreview.label}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#26221F] leading-tight mb-6">
                {content.aboutPreview.title}
              </h2>
              <div className="w-12 h-[2px] bg-[#B08D57] mb-6" />
              <p className="text-base sm:text-lg text-[#6F6861] leading-relaxed font-light mb-8">
                {content.aboutPreview.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8 w-full">
                <div className="border-l-2 border-[#B08D57] pl-4">
                  <span className="font-serif text-2xl font-normal text-[#26221F] block">180+</span>
                  <span className="text-xs text-[#6F6861] uppercase tracking-wider font-medium">Turnkey Projects</span>
                </div>
                <div className="border-l-2 border-[#B08D57] pl-4">
                  <span className="font-serif text-2xl font-normal text-[#26221F] block">22</span>
                  <span className="text-xs text-[#6F6861] uppercase tracking-wider font-medium">Design Accolades</span>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate("/about")}
                icon={HiArrowRight}
              >
                {content.aboutPreview.btnText}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR EXPERTISE SECTION */}
      <ExpertiseSection />

      {/* 4. FEATURED PROJECTS (#FFFFFF) */}
      <FeaturedProjectsSection />

      {/* 5. WHY CHOOSE US (#F7F5F2) */}
      <section className="py-20 sm:py-28 bg-[#F7F5F2] bg-radial-subtle-left border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="WHY AURA & SPACES"
            title="Excellence In Every Detail"
            description="We combine architectural discipline with high luxury customization to deliver stress-free interior transformations."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="bg-white border border-[#E5DED5] p-8 rounded-2xl hover:border-[#B08D57] shadow-[0_10px_30px_rgba(38,34,31,0.05)] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F1EEE9] border border-[#E5DED5] text-[#B08D57] flex items-center justify-center mb-6 group-hover:bg-[#B08D57] group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#26221F] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F6861] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. DESIGN PROCESS (#FCFBF9) */}
      <section className="py-20 sm:py-28 bg-[#FCFBF9] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="HOW WE WORK"
            title="Our Design Process"
            description="A seamless 5-step journey from initial concept vision to your final keys-over reveal."
            className="mb-16"
          />

          {/* Process Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {designProcessSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col bg-white p-6 rounded-2xl border border-[#E5DED5] shadow-xs relative group hover:border-[#B08D57] transition-all"
              >
                <span className="font-serif text-4xl font-bold text-[#B08D57]/30 group-hover:text-[#B08D57] transition-colors mb-4">
                  {step.step}
                </span>
                <h3 className="font-serif text-lg font-normal text-[#26221F] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#6F6861] leading-relaxed font-light">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (#F1EEE9) */}
      <section className="py-20 sm:py-28 bg-[#F1EEE9] border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="CLIENT TESTIMONIALS"
            title="What Our Clients Say"
            description="Real stories from homeowners and corporate directors who trusted us with their spaces."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleTestimonials.map((t, idx) => (
              <TestimonialCard key={t.id} testimonial={t} index={idx} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/testimonials"
              className="text-xs uppercase tracking-widest font-semibold text-[#26221F] hover:text-[#B08D57] transition-colors inline-flex items-center gap-2"
            >
              <span>Read All Verified Reviews</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION (#EDE8E1 Soft Beige / Gold tint) */}
      <section className="py-20 sm:py-24 bg-[#EDE8E1] text-[#26221F] relative overflow-hidden border-b border-[#E5DED5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A6240] font-semibold mb-3">
            START YOUR JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight mb-4 text-[#26221F]">
            {content.cta.heading}
          </h2>
          <p className="text-base sm:text-xl text-[#6F6861] font-light max-w-2xl mb-8">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/contact")}
            >
              {content.cta.primaryBtn}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/projects")}
            >
              {content.cta.secondaryBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* 9. CONTACT PREVIEW (#F7F5F2) */}
      <section className="py-20 sm:py-24 bg-[#F7F5F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DED5] shadow-xl grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1EEE9] text-[#B08D57] flex items-center justify-center shrink-0 border border-[#E5DED5]">
                <HiPhone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                  Call Us
                </span>
                <p className="text-sm font-semibold text-[#26221F]">{settings.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1EEE9] text-[#B08D57] flex items-center justify-center shrink-0 border border-[#E5DED5]">
                <HiMail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                  Email Us
                </span>
                <p className="text-sm font-semibold text-[#26221F]">{settings.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1EEE9] text-[#B08D57] flex items-center justify-center shrink-0 border border-[#E5DED5]">
                <HiLocationMarker className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A837C] font-medium block mb-1">
                  Visit Atelier
                </span>
                <p className="text-xs font-semibold text-[#26221F] leading-snug">{settings.address}</p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <Button
                variant="primary"
                className="w-full lg:w-auto"
                onClick={() => navigate("/contact")}
              >
                Contact Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

