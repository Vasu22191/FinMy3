import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ContactCallout,
  FaqSection,
  ProcessSteps,
  SectionHeading,
  ServiceGrid,
  ServicesLink,
  SolutionsPreview,
  WhyFinMyTri,
} from "@/components/finmytri-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinMyTri | Smarter Financial Decisions" },
      { name: "description", content: "Financial consulting and virtual CFO support to help businesses plan with clarity and make stronger financial decisions." },
      { property: "og:title", content: "FinMyTri | Smarter Financial Decisions" },
      { property: "og:description", content: "Financial consulting and virtual CFO support to help businesses plan with clarity and make stronger financial decisions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="hero-section">
        <div className="page-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Financial clarity for your next move</p>
            <h1 className="display-title mt-5">Smarter Financial Decisions. <span className="text-brand">Stronger Businesses.</span></h1>
            <p className="hero-description mt-5">Empowering businesses with smarter financial insights, strategic planning, and expert financial management.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg"><a href="/services">Explore Our Services <ArrowRight aria-hidden="true" /></a></Button>
              <Button asChild variant="outline" size="lg"><a href="/contact">Get Started <ArrowUpRight aria-hidden="true" /></a></Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-mint" aria-hidden="true" /> Thoughtful financial guidance</span>
              <span className="inline-flex items-center gap-2"><TrendingUp size={17} className="text-brand" aria-hidden="true" /> Built around your business</span>
            </div>
          </div>
          <div className="hero-artwork" aria-label="Illustrative financial dashboard showing revenue, expenses, and cash flow">
            <div className="float-note left-0 top-10"><span className="icon-tile !h-9 !w-9"><TrendingUp size={17} aria-hidden="true" /></span><span>Plan with perspective</span></div>
            <div className="dashboard-visual">
              <div className="dashboard-topbar">
                <div>
                  <p className="text-sm font-extrabold text-foreground">Financial snapshot</p>
                  <p className="mt-1 text-xs text-muted-foreground">Illustrative view</p>
                </div>
                <span className="rounded-full bg-mint-soft px-3 py-1 text-xs font-bold text-foreground">Overview</span>
              </div>
              <div className="dashboard-content">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground">Business performance</p>
                    <p className="mt-1 text-lg font-extrabold text-foreground">A clearer view of the numbers</p>
                  </div>
                  <div className="flex gap-3 text-xs font-semibold text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-brand" />Revenue</span>
                    <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-mint" />Cash flow</span>
                  </div>
                </div>
                <div className="chart-canvas" aria-hidden="true">
                  <span className="chart-bar bar-1" /><span className="chart-bar bar-2" /><span className="chart-bar bar-3" />
                  <span className="chart-bar bar-4" /><span className="chart-bar bar-5" /><span className="chart-bar bar-6" />
                  <span className="chart-bar bar-7" /><span className="chart-bar bar-8" /><span className="chart-bar bar-9" /><span className="chart-bar bar-10" />
                </div>
                <div className="flex justify-between px-1 text-[0.68rem] font-semibold text-muted-foreground" aria-hidden="true">
                  <span>Planning</span><span>Cash flow</span><span>Reporting</span><span>Forecast</span><span>Review</span>
                </div>
                <div className="dashboard-foot">
                  <div><p className="metric-label">Performance</p><p className="metric-value mt-1">Insight-led</p></div>
                  <div><p className="metric-label">Planning</p><p className="metric-value mt-1">Forward-looking</p></div>
                  <div><p className="metric-label">Reporting</p><p className="metric-value mt-1">Decision-ready</p></div>
                </div>
              </div>
            </div>
            <div className="float-note bottom-0 right-0"><span className="text-mint">●</span><span>Clarity, without the clutter</span></div>
          </div>
        </div>
      </section>

      <section className="section-block bg-background">
        <div className="page-container">
          <SectionHeading eyebrow="Financial support that fits" title="Good decisions start with a clear picture" description="From day-to-day visibility to long-range planning, FinMyTri helps make financial information useful in the moments that matter." />
          <div className="mt-12"><ServiceGrid limit={3} /></div>
          <div className="mt-8 flex justify-center"><ServicesLink /></div>
        </div>
      </section>

      <section className="section-block feature-band">
        <div className="page-container">
          <SectionHeading eyebrow="Why FinMyTri" title="Financial expertise, grounded in your business" description="Build a stronger view of your finances with support shaped around your goals and working reality." />
          <div className="mt-12"><WhyFinMyTri /></div>
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
