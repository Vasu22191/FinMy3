import { describe, expect, it } from "vitest";

import { validateEnquiry, type EnquiryFields } from "@/lib/enquiry-validation";

const validEnquiry: EnquiryFields = {
  fullName: "Asha Rao",
  email: "asha@example.com",
  phone: "+91 88970 12345",
  company: "Northstar Works",
  country: "India",
  service: "Financial Consulting",
  message: "We would like help preparing a financial forecast.",
};

describe("enquiry validation", () => {
  it("requires every requested contact field", () => {
    expect(validateEnquiry({ fullName: "", email: "", phone: "", company: "", country: "", service: "", message: "" })).toEqual({
      fullName: "Full name is required.",
      email: "Business email is required.",
      phone: "Phone number is required.",
      company: "Company name is required.",
      country: "Country is required.",
      service: "Service required is required.",
      message: "Message is required.",
    });
  });

  it("accepts a valid business email and rejects a malformed one", () => {
    expect(validateEnquiry(validEnquiry).email).toBeUndefined();
    expect(validateEnquiry({ ...validEnquiry, email: "not-an-email" }).email).toBe("Enter a valid business email address.");
  });

  it("accepts international phone formatting and requires 7 to 15 digits", () => {
    expect(validateEnquiry(validEnquiry).phone).toBeUndefined();
    expect(validateEnquiry({ ...validEnquiry, phone: "12345" }).phone).toBe("Enter a phone number with 7 to 15 digits.");
  });
});