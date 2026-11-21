import { createFileRoute } from "@tanstack/react-router";

import { ContactCallout, PageIntro, ServiceGrid } from "@/components/finmytri-sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Financial Services | FinMyTri" },
      { name: "description", content: "Explore financial consulting, forecasting, cash flow, reporting, virtual CFO, finance process, accounting systems, and cross-border tax research support." },
      { property: "og:title", content: "Financial Services | FinMyTri" },
      { property: "og:description", content: "Explore financial consulting, forecasting, cash flow, reporting, virtual CFO, finance process, accounting systems, and cross-border tax research support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Our services" title="Financial support for clearer business decisions" description="From focused financial analysis to ongoing virtual CFO support, explore practical ways to strengthen your financial view." />
      <section className="page-content">
        <div className="page-container">
          <ServiceGrid />
        </div>
      </section>
      <ContactCallout />
    </>
  );
}