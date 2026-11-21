export type EnquiryFields = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  service: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export function validateEnquiry(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const labels: Record<keyof EnquiryFields, string> = {
    fullName: "Full name",
    email: "Business email",
    phone: "Phone number",
    company: "Company name",
    country: "Country",
    service: "Service required",
    message: "Message",
  };

  for (const key of Object.keys(labels) as (keyof EnquiryFields)[]) {
    if (!fields[key].trim()) errors[key] = `${labels[key]} is required.`;
  }

  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid business email address.";
  }

  if (fields.phone.trim()) {
    const digits = fields.phone.replace(/\D/g, "");
    if (!/^\+?[\d\s().-]+$/.test(fields.phone.trim()) || digits.length < 7 || digits.length > 15) {
      errors.phone = "Enter a phone number with 7 to 15 digits.";
    }
  }

  return errors;
}