import { useId, useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceNames } from "@/lib/finmytri";
import { validateEnquiry, type EnquiryErrors, type EnquiryFields } from "@/lib/enquiry-validation";

const countries = [
  "Australia",
  "Canada",
  "France",
  "Germany",
  "India",
  "Ireland",
  "Singapore",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Other",
];

const countryCallingCodes = [
  { country: "Australia", code: "+61", flag: "AU" },
  { country: "Canada", code: "+1", flag: "CA" },
  { country: "France", code: "+33", flag: "FR" },
  { country: "Germany", code: "+49", flag: "DE" },
  { country: "India", code: "+91", flag: "IN" },
  { country: "Ireland", code: "+353", flag: "IE" },
  { country: "Singapore", code: "+65", flag: "SG" },
  { country: "United Arab Emirates", code: "+971", flag: "AE" },
  { country: "United Kingdom", code: "+44", flag: "GB" },
  { country: "United States", code: "+1", flag: "US" },
  { country: "Other", code: "+", flag: "GL" },
];

type FormStatus = { kind: "success" | "error"; message: string } | null;

export function EnquiryForm() {
  const formId = useId().replace(/:/g, "");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [submitting, setSubmitting] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");

  function setFieldErrorMessages(nextErrors: EnquiryErrors) {
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) document.getElementById(`field-${firstInvalid}`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const nationalPhone = String(data.get("phone") ?? "").trim();
    const phone = nationalPhone ? `${phoneCountryCode} ${nationalPhone}` : "";
    const fields: EnquiryFields = {
      fullName: String(data.get("fullName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone,
      company: String(data.get("company") ?? "").trim(),
      country: String(data.get("country") ?? "").trim(),
      service: String(data.get("service") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors = validateEnquiry(fields);
    setFieldErrorMessages(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fields.fullName,
          businessEmail: fields.email,
          phoneNumber: fields.phone,
          companyName: fields.company,
          country: fields.country,
          serviceRequired: fields.service,
          message: fields.message,
          website: String(data.get("website") ?? ""),
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        confirmationEmailStatus?: string;
      };

      if (!response.ok || result.ok !== true) {
        throw new Error(result.message || "We couldn't submit your enquiry. Please try again.");
      }

      const confirmationMessage =
        result.confirmationEmailStatus === "Sent"
          ? "Thank you for contacting FinMy3. We have received your application, and our team will reach out to you within 2 business days."
          : "Your enquiry was received, but we couldn't send the confirmation email. Our team will reach out to you within 2 business days.";
      setStatus({ kind: "success", message: confirmationMessage });
      setErrors({});
      document.getElementById(`enquiry-form-${formId}`)?.dispatchEvent(new Event("reset"));
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "We couldn't submit your enquiry. Please try again or contact us on WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function fieldError(field: keyof EnquiryFields) {
    const error = errors[field];
    return error ? (
      <p id={`error-${field}`} className="text-xs font-semibold text-destructive">
        {error}
      </p>
    ) : null;
  }

  return (
    <>
      <form
        id={`enquiry-form-${formId}`}
        className="grid gap-5"
        noValidate
        onSubmit={handleSubmit}
        onReset={() => setErrors({})}
      >
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`field-website-${formId}`}>Leave this field empty</label>
          <input id={`field-website-${formId}`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="field-fullName" className="text-sm font-bold text-foreground">
              Full Name
            </label>
            <Input
              id="field-fullName"
              name="fullName"
              autoComplete="name"
              maxLength={120}
              className="form-control"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "error-fullName" : undefined}
            />
            {fieldError("fullName")}
          </div>
          <div className="form-field">
            <label htmlFor="field-email" className="text-sm font-bold text-foreground">
              Business Email
            </label>
            <Input
              id="field-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              className="form-control"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "error-email" : undefined}
            />
            {fieldError("email")}
          </div>
          <div className="form-field">
            <label htmlFor="field-phone" className="text-sm font-bold text-foreground">
              Phone Number
            </label>
            <div className="phone-input-group">
              <select
                id="field-country-code"
                name="countryCode"
                className="phone-country-code"
                value={phoneCountryCode}
                onChange={(event) => setPhoneCountryCode(event.target.value)}
                aria-label="Country calling code"
              >
                {countryCallingCodes.map((item) => (
                  <option key={item.country} value={item.code}>
                    {item.code} {item.country}
                  </option>
                ))}
              </select>
              <Input
                id="field-phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                maxLength={15}
                placeholder="Phone number"
                className="phone-number-input"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "error-phone" : undefined}
              />
            </div>
            {fieldError("phone")}
          </div>
          <div className="form-field">
            <label htmlFor="field-company" className="text-sm font-bold text-foreground">
              Company Name
            </label>
            <Input
              id="field-company"
              name="company"
              autoComplete="organization"
              maxLength={160}
              className="form-control"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "error-company" : undefined}
            />
            {fieldError("company")}
          </div>
          <div className="form-field">
            <label htmlFor="field-country" className="text-sm font-bold text-foreground">
              Country
            </label>
            <select
              id="field-country"
              name="country"
              className="form-control"
              defaultValue=""
              aria-invalid={Boolean(errors.country)}
              aria-describedby={errors.country ? "error-country" : undefined}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {fieldError("country")}
          </div>
          <div className="form-field">
            <label htmlFor="field-service" className="text-sm font-bold text-foreground">
              Service Required
            </label>
            <select
              id="field-service"
              name="service"
              className="form-control"
              defaultValue=""
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "error-service" : undefined}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceNames.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {fieldError("service")}
          </div>
          <div className="form-field md:col-span-2">
            <label htmlFor="field-message" className="text-sm font-bold text-foreground">
              Message
            </label>
            <Textarea
              id="field-message"
              name="message"
              maxLength={3000}
              rows={5}
              className="form-control min-h-32 resize-y"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "error-message" : undefined}
            />
            {fieldError("message")}
          </div>
        </div>
        {status && (
          <p
            role={status.kind === "error" ? "alert" : "status"}
            className={`form-status ${status.kind === "error" ? "form-error" : ""}`}
          >
            {status.message}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            variant="brand"
            size="lg"
            disabled={submitting}
            className="!text-white [&_svg]:!text-white"
          >
            {submitting ? (
              <>
                <LoaderCircle className="animate-spin" aria-hidden="true" /> Sending enquiry…
              </>
            ) : (
              <>
                Submit Enquiry <Send aria-hidden="true" />
              </>
            )}
          </Button>
          <p className="max-w-sm text-xs leading-5 text-muted-foreground">
            Please don’t include account passwords or sensitive payment details.
          </p>
        </div>
      </form>
    </>
  );
}
