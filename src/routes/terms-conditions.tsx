import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | FinMyTri" },
      { name: "description", content: "Review the terms for using the FinMyTri website and its general financial consulting information." },
      { property: "og:title", content: "Terms and Conditions | FinMyTri" },
      { property: "og:description", content: "Review the terms for using the FinMyTri website and its general financial consulting information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="page-content">
      <div className="page-container max-w-4xl">
        <p className="eyebrow">FinMyTri</p>
        <h1 className="section-title mt-3">Terms and Conditions</h1>
        <p className="mt-5 leading-7 text-muted-foreground">These terms describe basic conditions for using this website. A separate written agreement may apply to any professional services.</p>
        <div className="mt-8 grid gap-7">
          <section>
            <h2 className="text-lg font-extrabold text-foreground">Website information</h2>
            <p className="mt-2 leading-7 text-muted-foreground">Website content is provided for general information about FinMyTri’s services. It is not a substitute for advice based on your particular circumstances.</p>
          </section>
          <section>
            <h2 className="text-lg font-extrabold text-foreground">Enquiries and services</h2>
            <p className="mt-2 leading-7 text-muted-foreground">Sending an enquiry does not itself create a professional engagement. The scope, timing, and terms of any services will be agreed separately with FinMyTri.</p>
          </section>
          <section>
            <h2 className="text-lg font-extrabold text-foreground">Third-party services</h2>
            <p className="mt-2 leading-7 text-muted-foreground">This website may link to third-party services such as WhatsApp. Those services operate under their own terms and privacy practices.</p>
          </section>
          <section>
            <h2 className="text-lg font-extrabold text-foreground">Use of this website</h2>
            <p className="mt-2 leading-7 text-muted-foreground">Please use the website lawfully and do not submit information that you are not authorized to share.</p>
          </section>
        </div>
      </div>
    </section>
  );
}