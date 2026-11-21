import { createFileRoute } from "@tanstack/react-router";
import { Compass, Handshake, Scale, Sparkles } from "lucide-react";

import { AboutIntro, ContactCallout, PageIntro } from "@/components/finmytri-sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FinMyTri | Financial Clarity for Business" },
      { name: "description", content: "Learn about FinMyTri's mission, vision, values, and practical approach to financial consulting and virtual CFO support." },
      { property: "og:title", content: "About FinMyTri | Financial Clarity for Business" },
      { property: "og:description", content: "Learn about FinMyTri's mission, vision, values, and practical approach to financial consulting and virtual CFO support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    { title: "Clarity", text: "Make financial information easier to understand and act on.", Icon: Compass },
    { title: "Partnership", text: "Listen closely and shape support around each business.", Icon: Handshake },
    { title: "Practicality", text: "Focus on useful guidance and thoughtful next steps.", Icon: Sparkles },
    { title: "Integrity", text: "Approach financial questions with care and transparency.", Icon: Scale },
  ];

  return (
    <>
      <PageIntro eyebrow="About FinMyTri" title="A more thoughtful relationship with your finances" description="FinMyTri provides financial consulting and virtual CFO support to help businesses see their numbers more clearly and make considered plans." />
      <section className="page-content">
        <div className="page-container grid gap-12">
          <AboutIntro />
          <div>
            <div className="max-w-2xl">
              <p className="eyebrow">Our values</p>
              <h2 className="section-title mt-3">How we approach the work</h2>
            </div>
            <div className="content-grid mt-8">
              {values.map(({ title, text, Icon }) => (
                <article key={title} className="content-item">
                  <Icon size={22} className="text-brand" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-extrabold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-brand-soft p-6 md:p-8">
            <p className="eyebrow">Why choose FinMyTri</p>
            <h2 className="mt-3 text-2xl font-extrabold text-foreground">Financial thinking that stays close to the business.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">FinMyTri brings financial planning, analysis, reporting, and advisory support together around the decisions your business needs to make. The focus is on useful insight and practical support, not complexity for its own sake.</p>
          </div>
        </div>
      </section>
      <ContactCallout />
    </>
  );
}