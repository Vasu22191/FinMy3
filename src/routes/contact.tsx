import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";

import { EnquiryForm } from "@/components/enquiry-form";
import { PageIntro } from "@/components/finmytri-sections";
import { whatsappUrl } from "@/lib/finmytri";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FinMy3 | Start a Financial Conversation" },
      { name: "description", content: "Send FinMy3 an enquiry about financial consulting, business planning, cash flow, reporting, or virtual CFO services." },
      { property: "og:url", content: "https://www.finmy3global.com/contact" },
      { property: "og:title", content: "Contact FinMy3 | Start a Financial Conversation" },
      { property: "og:description", content: "Send FinMy3 an enquiry about financial consulting, business planning, cash flow, reporting, or virtual CFO services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.finmy3global.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact FinMy3" title="Tell us what your business is working through" description="Share a little about your financial priorities and the kind of support you are looking for." />
      <section className="page-content">
        <div className="page-container contact-layout">
          <aside>
            <p className="eyebrow">Start a conversation</p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-foreground">A clearer next step begins with a conversation.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Choose the service you are interested in and tell us what would be most useful. We’ll use your details to respond to this enquiry.</p>
            {/* WhatsApp contact card kept temporarily disabled for later use:
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm font-bold text-foreground transition-colors hover:border-brand">
              <span className="icon-tile !h-10 !w-10"><MessageCircle size={19} aria-hidden="true" /></span>
              <span>Prefer WhatsApp?<br /><span className="font-medium text-muted-foreground">Message FinMy3 directly</span></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            */}
            <p className="mt-8 flex items-start gap-2 text-xs leading-6 text-muted-foreground"><ShieldCheck className="mt-0.5 shrink-0 text-mint" size={16} aria-hidden="true" />Please don’t include passwords, bank details, or sensitive payment information.</p>
          </aside>
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm md:p-7">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}