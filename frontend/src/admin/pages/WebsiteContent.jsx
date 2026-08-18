import React, { useState } from "react";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Button } from "../../components/common/Button";
import { useNotification } from "../../context/NotificationContext";
import { initialContentData } from "../../data/content";

export const WebsiteContent = () => {
  const { showToast } = useNotification();

  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem("aura_content");
    return saved ? JSON.parse(saved) : initialContentData;
  });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("aura_content", JSON.stringify(content));
    showToast("Homepage & CMS content saved to state!", "success");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-normal text-[#26221F]">Website Content CMS</h1>
        <p className="text-xs text-[#6F6861] font-light">
          Edit headlines, hero banners, mission statements, and call-to-action copy.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Homepage Hero */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-3">
            Homepage Hero Section
          </h3>

          <Input
            label="Hero Heading Title"
            value={content.hero.heading}
            onChange={(e) =>
              setContent({ ...content, hero: { ...content.hero, heading: e.target.value } })
            }
          />

          <Textarea
            label="Hero Subheading / Supporting Text"
            rows={2}
            value={content.hero.subheading}
            onChange={(e) =>
              setContent({ ...content, hero: { ...content.hero, subheading: e.target.value } })
            }
          />

          <Input
            label="Hero Background Image URL"
            value={content.hero.heroImage}
            onChange={(e) =>
              setContent({ ...content, hero: { ...content.hero, heroImage: e.target.value } })
            }
          />
        </div>

        {/* About Preview */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-3">
            About Section Preview ("Our Philosophy")
          </h3>

          <Input
            label="Section Title"
            value={content.aboutPreview.title}
            onChange={(e) =>
              setContent({
                ...content,
                aboutPreview: { ...content.aboutPreview, title: e.target.value }
              })
            }
          />

          <Textarea
            label="Philosophy Description"
            rows={3}
            value={content.aboutPreview.description}
            onChange={(e) =>
              setContent({
                ...content,
                aboutPreview: { ...content.aboutPreview, description: e.target.value }
              })
            }
          />
        </div>

        {/* Lead Designer Quote */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-3">
            Principal Designer Profile
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Designer Name"
              value={content.designerMessage.name}
              onChange={(e) =>
                setContent({
                  ...content,
                  designerMessage: { ...content.designerMessage, name: e.target.value }
                })
              }
            />

            <Input
              label="Title"
              value={content.designerMessage.title}
              onChange={(e) =>
                setContent({
                  ...content,
                  designerMessage: { ...content.designerMessage, title: e.target.value }
                })
              }
            />
          </div>

          <Textarea
            label="Designer Quote"
            rows={3}
            value={content.designerMessage.quote}
            onChange={(e) =>
              setContent({
                ...content,
                designerMessage: { ...content.designerMessage, quote: e.target.value }
              })
            }
          />
        </div>

        {/* CTA Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DED5] shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-normal text-[#26221F] border-b border-[#E5DED5] pb-3">
            Bottom CTA Banner Content
          </h3>

          <Input
            label="CTA Heading"
            value={content.cta.heading}
            onChange={(e) =>
              setContent({ ...content, cta: { ...content.cta, heading: e.target.value } })
            }
          />

          <Textarea
            label="CTA Description"
            rows={2}
            value={content.cta.description}
            onChange={(e) =>
              setContent({ ...content, cta: { ...content.cta, description: e.target.value } })
            }
          />
        </div>

        <Button type="submit" variant="primary" size="lg">
          Save Website Content
        </Button>
      </form>
    </div>
  );
};

