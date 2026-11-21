import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | FinMyTri" },
      { name: "description", content: "Read how FinMyTri handles information shared through its business enquiry form and contact channels." },
      { property: "og:title", content: "Privacy Policy | FinMyTri" },
      { property: "og:description", content: "Read how FinMyTri handles information shared through its business enquiry form and contact channels." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <section className="page-content">
      <div className="page-container max-w-4xl">
        <p className="eyebrow">FinMyTri</p>
        <h1 className="section-title mt-3">Privacy Policy</h1>
        <p className="mt-5 leading-7 text-muted-foreground">This page explains how information shared through the FinMyTri website enquiry form is intended to be handled.</p>
        <div className="mt-8 grid gap-7">
          <section>
            <h2 className="text-lg font-extrabold text-foreground">Information you provide</h2>
            <p className="mt-2 leading-7 text-muted-foreground">The enquiry form requests your name, business email, phone number, company, country, service interest, and message so FinMyTri can understand and respond to your enquiry.</p>
          </section>
          <section>
            <h2 className="text-lg font-extrabold text-foreground">How information is used</h2>
            <p className="mt-2 leading-7 text-muted-foreground">The information is used to review and respond to your request. When the form is connected, submissions are sent to the Google Sheet configured by FinMyTri through its Apps Script Web App. The spreadsheet is not intended to be publicly accessible.</p>
          </section>
          <section>
            <h2 className="text-lg font-extrabold text-foreground">External services</h2>
            <p className="mt-2 leading-7 text-muted-foreground">If you choose to contact FinMyTri through WhatsApp, that conversation is handled by WhatsApp and subject to its own privacy terms.</p>
          </section>
          <section>
            <h2 className="text-lg font-extrabold text-foreground">Sensitive information</h2>
            <p className="mt-2 leading-7 text-muted-foreground">Please do not send passwords, bank account credentials, payment card details, or other sensitive financial records through this website form.</p>
          </section>
        </div>
      </div>
    </section>
  );
}