import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, ChartNoAxesCombined, Globe2, Rocket } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { ContactCallout, PageIntro } from "@/components/finmytri-sections";
import { solutions } from "@/lib/finmytri";

const icons = [Rocket, BriefcaseBusiness, ChartNoAxesCombined, Globe2];

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Business Solutions | FinMy3" },
      { name: "description", content: "See how FinMy3 supports startups, small businesses, growing companies, and international businesses with practical financial guidance." },
      { property: "og:title", content: "Business Solutions | FinMy3" },
      { property: "og:description", content: "See how FinMy3 supports startups, small businesses, growing companies, and international businesses with practical financial guidance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageIntro eyebrow="Solutions" title="Financial guidance shaped around your stage" description="Every business has different questions. FinMy3 helps connect the financial work to the needs and opportunities in front of you." />
      <section className="page-content">
        <div className="page-container grid gap-4">
          {solutions.map((solution, index) => {
            const Icon = icons[index] ?? BriefcaseBusiness;
            return (
              <article key={solution.name} className="content-item grid items-start gap-5 md:grid-cols-[3rem_1fr_auto] md:items-center">
                <span className="icon-tile"><Icon size={21} aria-hidden="true" /></span>
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">{solution.name}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{solution.detail}</p>
                </div>
                <Button asChild variant="link" className="justify-self-start md:justify-self-end">
                  <Link to="/contact">Discuss your needs <ArrowRight aria-hidden="true" /></Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>
      <ContactCallout />
    </>
  );
}