import { createFileRoute } from "@tanstack/react-router";

import { appsScriptUrl } from "@/lib/finmytri";
import { validateEnquiry, type EnquiryFields } from "@/lib/enquiry-validation";

type AppsScriptResult = {
  ok?: boolean;
  message?: string;
  teamEmailStatus?: string;
  confirmationEmailStatus?: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

export const Route = createFileRoute("/api/enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin && origin !== new URL(request.url).origin) {
          return jsonResponse({ ok: false, message: "Cross-origin form submission is not allowed." }, 403);
        }

        if (!appsScriptUrl) {
          return jsonResponse({ ok: false, message: "The enquiry service is not configured. Please contact us directly." }, 503);
        }

        let input: Record<string, unknown>;
        try {
          const parsed: unknown = await request.json();
          if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
            return jsonResponse({ ok: false, message: "Invalid enquiry data." }, 400);
          }
          input = parsed as Record<string, unknown>;
        } catch {
          return jsonResponse({ ok: false, message: "Invalid enquiry data." }, 400);
        }

        if (typeof input.website === "string" && input.website.trim()) {
          return jsonResponse({ ok: false, message: "Enquiry could not be submitted." }, 400);
        }

        const fields: EnquiryFields = {
          fullName: typeof input.fullName === "string" ? input.fullName.trim() : "",
          email: typeof input.businessEmail === "string" ? input.businessEmail.trim() : "",
          phone: typeof input.phoneNumber === "string" ? input.phoneNumber.trim() : "",
          company: typeof input.companyName === "string" ? input.companyName.trim() : "",
          country: typeof input.country === "string" ? input.country.trim() : "",
          service: typeof input.serviceRequired === "string" ? input.serviceRequired.trim() : "",
          message: typeof input.message === "string" ? input.message.trim() : "",
        };
        const errors = validateEnquiry(fields);
        if (Object.keys(errors).length > 0) {
          return jsonResponse({ ok: false, message: "Please check the enquiry details and try again.", errors }, 400);
        }

        try {
          const response = await fetch(appsScriptUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              fullName: fields.fullName,
              businessEmail: fields.email,
              phoneNumber: fields.phone,
              companyName: fields.company,
              country: fields.country,
              serviceRequired: fields.service,
              message: fields.message,
              website: "",
            }),
          });

          const result = await response.json() as AppsScriptResult;
          if (!response.ok || result.ok !== true) {
            return jsonResponse({
              ok: false,
              message: result.message || "The enquiry service could not save your request. Please try again.",
            }, 502);
          }

          return jsonResponse({
            ok: true,
            teamEmailStatus: result.teamEmailStatus,
            confirmationEmailStatus: result.confirmationEmailStatus,
          });
        } catch {
          return jsonResponse({
            ok: false,
            message: "We couldn't reach the enquiry service. Please try again or contact us on WhatsApp.",
          }, 502);
        }
      },
    },
  },
});
