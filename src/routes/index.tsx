import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ContactCallout,
  FaqSection,
  ProcessSteps,
  SectionHeading,
  ServiceGrid,
  ServicesLink,
  SolutionsPreview,
  WhyFinMy3,
} from "@/components/finmytri-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinMy3 | Smarter Financial Decisions" },
      { name: "description", content: "Financial consulting and virtual CFO support to help businesses plan with clarity and make stronger financial decisions." },
      { property: "og:title", content: "FinMy3 | Smarter Financial Decisions" },
      { property: "og:description", content: "Financial consulting and virtual CFO support to help businesses plan with clarity and make stronger financial decisions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [dashboardSlide, setDashboardSlide] = useState(0);

  const dashboardSlides = [
    { title: "FinMy3 Dashboard", value: "+24.8%", label: "Revenue Growth", series: [22, 35, 30, 44, 39, 53, 49, 66, 58, 78] },
    { title: "Cash Flow View", value: "+18.4%", label: "Cash Position", series: [26, 32, 38, 42, 48, 56, 52, 64, 70, 76] },
    { title: "Planning Snapshot", value: "92%", label: "Forecast Accuracy", series: [34, 40, 47, 45, 57, 61, 68, 64, 72, 84] },
  ];

  const slide = dashboardSlides[dashboardSlide] ?? dashboardSlides[0]!;
  const series = slide.series;

  const previousSlide = () => setDashboardSlide((current) => (current === 0 ? dashboardSlides.length - 1 : current - 1));
  const nextSlide = () => setDashboardSlide((current) => (current + 1) % dashboardSlides.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDashboardSlide((current) => (current + 1) % dashboardSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [dashboardSlides.length]);

  return (
    <>
      <section className="hero-section">
        <div className="page-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Financial clarity for your next move</p>
            <h1 className="display-title mt-5">Smarter Financial Decisions. <span className="text-brand">Stronger Businesses.</span></h1>
            <p className="hero-description mt-5">Empowering businesses with smarter financial insights, strategic planning, and expert financial management.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg" className="!text-white"><a href="/services">Explore Our Services <ArrowRight aria-hidden="true" /></a></Button>
              <Button asChild variant="outline" size="lg"><a href="/contact">Get Started <ArrowUpRight aria-hidden="true" /></a></Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-mint" aria-hidden="true" /> Thoughtful financial guidance</span>
              <span className="inline-flex items-center gap-2"><TrendingUp size={17} className="text-brand" aria-hidden="true" /> Built around your business</span>
            </div>
          </div>

          <div className="hero-artwork" aria-label="Financial dashboard carousel">
            <div className="dashboard-carousel">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2>{slide.title}</h2>
                  <div className="dashboard-growth">
                    <strong>{slide.value}</strong>
                    <span>{slide.label}</span>
                  </div>
                </div>
                <div className="dashboard-chart-area">
                  <div className="chart-y-axis" aria-hidden="true">
                    <span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span>
                  </div>
                  <div className="dashboard-chart" aria-label={`${slide.label}: ${slide.value}`}>
                    <svg viewBox="0 0 600 260" role="img" aria-hidden="true" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6475a8" stopOpacity="0.88" />
                          <stop offset="55%" stopColor="#25317d" stopOpacity="0.72" />
                          <stop offset="100%" stopColor="#10165e" stopOpacity="0.98" />
                        </linearGradient>
                      </defs>
                      <g className="chart-grid-lines">
                        <line x1="0" y1="20" x2="600" y2="20" /><line x1="0" y1="70" x2="600" y2="70" /><line x1="0" y1="120" x2="600" y2="120" /><line x1="0" y1="170" x2="600" y2="170" /><line x1="0" y1="220" x2="600" y2="220" />
                      </g>
                      <path className="chart-area" d={`M0,${260 - series[0]! * 2.2} C55,${260 - series[1]! * 2.4} 95,${260 - series[2]! * 2.1} 140,${260 - series[3]! * 2.25} S235,${260 - series[5]! * 2.2} 280,${260 - series[6]! * 2.35} S380,${260 - series[7]! * 2.25} 430,${260 - series[8]! * 2.35} S525,${260 - series[9]! * 2.15} 600,${260 - series[9]! * 2.45} L600,260 L0,260 Z`} />
                      <path className="chart-line" d={`M0,${260 - series[0]! * 2.2} C55,${260 - series[1]! * 2.4} 95,${260 - series[2]! * 2.1} 140,${260 - series[3]! * 2.25} S235,${260 - series[5]! * 2.2} 280,${260 - series[6]! * 2.35} S380,${260 - series[7]! * 2.25} 430,${260 - series[8]! * 2.35} S525,${260 - series[9]! * 2.15} 600,${260 - series[9]! * 2.45}`} />
                    </svg>
                    <div className="chart-x-axis" aria-hidden="true"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span></div>
                  </div>
                </div>
              </div>

              <div className="dashboard-carousel-footer">
                <div className="dashboard-dots" aria-label="Choose dashboard slide">
                  {dashboardSlides.map((item, index) => (
                    <button key={item.title} type="button" className={index === dashboardSlide ? "active" : ""} onClick={() => setDashboardSlide(index)} aria-label={`Show ${item.title}`} aria-current={index === dashboardSlide ? "true" : undefined} />
                  ))}
                </div>
                <div className="dashboard-arrows">
                  <button type="button" onClick={previousSlide} aria-label="Previous dashboard"><ArrowRight className="rotate-180" size={18} /></button>
                  <button type="button" onClick={nextSlide} aria-label="Next dashboard"><ArrowRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block bg-background">
        <div className="page-container">
          <SectionHeading eyebrow="Financial support that fits" title="Good decisions start with a clear picture" description="From day-to-day visibility to long-range planning, FinMy3 helps make financial information useful in the moments that matter." />
          <div className="mt-12"><ServiceGrid limit={3} /></div>
          <div className="mt-8 flex justify-center"><ServicesLink /></div>
        </div>
      </section>

      <section className="section-block feature-band">
        <div className="page-container">
          <SectionHeading eyebrow="Why FinMy3" title="Financial expertise, grounded in your business" description="Build a stronger view of your finances with support shaped around your goals and working reality." />
          <div className="mt-12"><WhyFinMy3 /></div>
        </div>
      </section>

      <section className="section-block bg-muted/50">
        <div className="page-container">
          <SectionHeading eyebrow="Who we help" title="Support for every stage of business" description="Financial needs change as businesses evolve. The right support should change with them." />
          <div className="mt-12"><SolutionsPreview /></div>
          <div className="mt-8 text-center"><Button asChild variant="outline"><a href="/solutions">Explore solutions <ArrowRight aria-hidden="true" /></a></Button></div>
        </div>
      </section>

      <section className="section-block bg-background">
        <div className="page-container">
          <SectionHeading eyebrow="How we work" title="A considered way forward" description="A collaborative process that starts with your questions and stays focused on practical next steps." />
          <div className="mt-12"><ProcessSteps /></div>
        </div>
      </section>

      <FaqSection />
      <ContactCallout />
    </>
  );
}
