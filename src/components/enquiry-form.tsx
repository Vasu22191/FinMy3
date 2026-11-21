import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { appsScriptUrl, serviceNames } from "@/lib/finmytri";
import { validateEnquiry, type EnquiryErrors, type EnquiryFields } from "@/lib/enquiry-validation";

const countries = [
  "Australia", "Canada", "France", "Germany", "India", "Ireland", "Singapore", "United Arab Emirates", "United Kingdom", "United States", "Other",
];

type FormStatus = { kind: "success" | "error"; message: string } | null;
type ScriptResponse = { type?: unknown; requestId?: unknown; ok?: unknown; message?: unknown };

export function EnquiryForm() {
  const formId = useId().replace(/:/g, "");
  const frameName = `finmytri-enquiry-frame-${formId}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pendingRequest = useRef<{ id: string; timeoutId: number } | null>(null);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data == null || typeof event.data !== "object") return;
      const response = event.data as ScriptResponse;
      const pending = pendingRequest.current;
      if (
        response.type !== "finmytri-enquiry-result" ||
        typeof response.requestId !== "string" ||
        !pending ||
        response.requestId !== pending.id
      ) return;

      window.clearTimeout(pending.timeoutId);
      pendingRequest.current = null;
      setSubmitting(false);

      if (response.ok === true) {
        setStatus({ kind: "success", message: "Your enquiry has been received. Thank you for contacting FinMyTri." });
        setErrors({});
        document.getElementById(`enquiry-form-${formId}`)?.dispatchEvent(new Event("reset"));
      } else {
        const message = typeof response.message === "string" ? response.message : "We couldn't submit your enquiry. Please try again.";
        setStatus({ kind: "error", message });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [formId]);

  useEffect(() => () => {
    if (pendingRequest.current) window.clearTimeout(pendingRequest.current.timeoutId);
  }, []);

  function setFieldErrorMessages(nextErrors: EnquiryErrors) {
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) document.getElementById(`field-${firstInvalid}`)?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const fields: EnquiryFields = {
      fullName: String(data.get("fullName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      country: String(data.get("country") ?? "").trim(),
      service: String(data.get("service") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors = validateEnquiry(fields);
    setFieldErrorMessages(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    if (!appsScriptUrl) {
      setStatus({
        kind: "error",
        message: "The enquiry form is not connected yet. Deploy the Google Apps Script and add its Web App URL as VITE_GOOGLE_APPS_SCRIPT_URL to enable submissions.",
      });
      return;
    }

    const requestId = window.crypto.randomUUID();
    const submission = document.createElement("form");
    submission.method = "POST";
    submission.action = appsScriptUrl;
    submission.target = frameName;
    submission.acceptCharset = "UTF-8";
    submission.hidden = true;

    const payload = { ...fields, website: "", requestId };
    for (const [name, value] of Object.entries(payload)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      submission.append(input);
    }

    const timeoutId = window.setTimeout(() => {
      if (pendingRequest.current?.id !== requestId) return;
      pendingRequest.current = null;
      setSubmitting(false);
      setStatus({ kind: "error", message: "We couldn't confirm that your enquiry reached FinMyTri. Please try again or contact us on WhatsApp." });
    }, 15000);
    pendingRequest.current = { id: requestId, timeoutId };
    setSubmitting(true);
    document.body.append(submission);
    submission.submit();
    window.setTimeout(() => submission.remove(), 1000);
  }

  function fieldError(field: keyof EnquiryFields) {
    const error = errors[field];
    return error ? <p id={`error-${field}`} className="text-xs font-semibold text-destructive">{error}</p> : null;
  }

  return (
    <>
      <form id={`enquiry-form-${formId}`} className="grid gap-5" noValidate onSubmit={handleSubmit} onReset={() => setErrors({})}>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`field-website-${formId}`}>Leave this field empty</label>
          <input id={`field-website-${formId}`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="field-fullName" className="text-sm font-bold text-foreground">Full Name</label>
            <Input id="field-fullName" name="fullName" autoComplete="name" maxLength={120} className="form-control" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "error-fullName" : undefined} />
            {fieldError("fullName")}
          </div>
          <div className="form-field">
            <label htmlFor="field-email" className="text-sm font-bold text-foreground">Business Email</label>
            <Input id="field-email" name="email" type="email" autoComplete="email" maxLength={254} className="form-control" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined} />
            {fieldError("email")}
          </div>
          <div className="form-field">
            <label htmlFor="field-phone" className="text-sm font-bold text-foreground">Phone Number</label>
            <Input id="field-phone" name="phone" type="tel" autoComplete="tel" maxLength={24} placeholder="Include country code" className="form-control" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "error-phone" : undefined} />
            {fieldError("phone")}
          </div>
          <div className="form-field">
            <label htmlFor="field-company" className="text-sm font-bold text-foreground">Company Name</label>
            <Input id="field-company" name="company" autoComplete="organization" maxLength={160} className="form-control" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "error-company" : undefined} />
            {fieldError("company")}
          </div>
          <div className="form-field">
            <label htmlFor="field-country" className="text-sm font-bold text-foreground">Country</label>
            <select id="field-country" name="country" className="form-control" defaultValue="" aria-invalid={Boolean(errors.country)} aria-describedby={errors.country ? "error-country" : undefined}>
              <option value="" disabled>Select country</option>
              {countries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
            {fieldError("country")}
          </div>
          <div className="form-field">
            <label htmlFor="field-service" className="text-sm font-bold text-foreground">Service Required</label>
            <select id="field-service" name="service" className="form-control" defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "error-service" : undefined}>
              <option value="" disabled>Select a service</option>
              {serviceNames.map((service) => <option key={service} value={service}>{service}</option>)}
            </select>
            {fieldError("service")}
          </div>
          <div className="form-field md:col-span-2">
            <label htmlFor="field-message" className="text-sm font-bold text-foreground">Message</label>
            <Textarea id="field-message" name="message" maxLength={3000} rows={5} className="form-control min-h-32 resize-y" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "error-message" : undefined} />
            {fieldError("message")}
          </div>
        </div>
        {status && (
          <p role={status.kind === "error" ? "alert" : "status"} className={`form-status ${status.kind === "error" ? "form-error" : ""}`}>
            {status.message}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant="brand" size="lg" disabled={submitting}>
            {submitting ? <><LoaderCircle className="animate-spin" aria-hidden="true" /> Sending enquiry…</> : <>Submit Enquiry <Send aria-hidden="true" /></>}
          </Button>
          <p className="max-w-sm text-xs leading-5 text-muted-foreground">Please don’t include account passwords or sensitive payment details.</p>
        </div>
      </form>
      <iframe ref={iframeRef} name={frameName} title="FinMyTri enquiry submission" className="hidden" />
    </>
  );
}