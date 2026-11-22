import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { EnquiryForm } from "@/components/enquiry-form";

describe("enquiry form", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("submits a valid enquiry with the selected country", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, confirmationEmailStatus: "Sent" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<EnquiryForm />);

    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Asha Rao" } });
    fireEvent.change(screen.getByLabelText("Business Email"), {
      target: { value: "asha@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "8897012345" } });
    fireEvent.change(screen.getByLabelText("Company Name"), {
      target: { value: "Northstar Works" },
    });
    fireEvent.change(screen.getByLabelText("Country"), { target: { value: "India" } });
    fireEvent.change(screen.getByLabelText("Service Required"), {
      target: { value: "Accounting & Bookkeeping" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "We need help preparing a financial forecast." },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit enquiry/i }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/enquiry",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining('"country":"India"'),
        }),
      ),
    );
  });
});
