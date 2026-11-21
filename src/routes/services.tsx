import { createFileRoute } from "@tanstack/react-router";

import { ContactCallout, PageIntro, ServiceGrid } from "@/components/finmytri-sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Financial Services | FinMy3" },
      { name: "description", content: "Explore financial consulting, forecasting, cash flow, reporting, virtual CFO, finance process, accounting systems, and cross-border tax research support." },
      { property: "og:title", content: "Financial Services | FinMy3" },
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
      <PageIntro
        eyebrow="Our Services"
        title="Complete Financial Solutions to Help Your Business Grow"
        description="At FinMy3, we provide reliable financial services that help businesses simplify operations, maintain compliance, and make smarter financial decisions."
      />
      <section className="page-content">
        <div className="page-container">
          <ServiceGrid />
        </div>
      </section>
      <ContactCallout />
    </>
  );
}