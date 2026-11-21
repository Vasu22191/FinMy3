export const services = [
  {
    name: "Accounting & Bookkeeping",
    short: "Accurate financial records, transaction management, and organized bookkeeping to keep your business financially healthy.",
    description:
      "Maintain accurate financial records with transaction management, account reconciliation, reporting support, and organized bookkeeping built around your business operations.",
    benefit: "Keep your financial records accurate, organized, and ready for informed decisions.",
  },
  {
    name: "Virtual CFO Services",
    short: "Strategic financial guidance, budgeting, cash flow management, and financial planning to support business growth.",
    description:
      "Receive senior financial direction through strategic planning, performance reviews, budgeting, forecasting, and ongoing cash flow guidance.",
    benefit: "Turn financial information into clear direction for growth and performance.",
  },
  {
    name: "Tax Compliance & Support",
    short: "Assistance with tax planning, regulatory compliance, tax documentation, and timely filing support.",
    description:
      "Prepare for tax obligations with practical planning, regulatory guidance, organized documentation, and dependable filing support.",
    benefit: "Stay organized and compliant with tax requirements and deadlines.",
  },
  {
    name: "Financial Reporting",
    short: "Clear and insightful financial reports that help you understand business performance and make informed decisions.",
    description:
      "Create useful management reports with clear summaries of performance, trends, cash flow, and key financial indicators.",
    benefit: "Understand business performance with reporting that supports timely decisions.",
  },
  {
    name: "Financial Modelling & Financial Strategy",
    short: "Financial forecasting, scenario analysis, and strategic planning to help businesses prepare for the future.",
    description:
      "Build practical financial models and forward-looking scenarios that support funding, growth, budgeting, and strategic planning.",
    benefit: "Prepare for future decisions with a clearer view of opportunities and risks.",
  },
] as const;

export const solutions = [
  {
    name: "Startups",
    detail:
      "Build the financial basics for your next stage: practical planning, cash visibility, and reporting that helps founders make informed choices.",
  },
  {
    name: "Small Businesses",
    detail:
      "Get day-to-day financial clarity with budgeting, cash flow support, and management reporting shaped around your operations.",
  },
  {
    name: "Growing Businesses",
    detail:
      "Strengthen financial planning and processes as teams, markets, and operating requirements become more complex.",
  },
  {
    name: "International Businesses",
    detail:
      "Bring structure to cross-border financial questions, reporting needs, and planning across different business environments.",
  },
] as const;

const configuredWhatsApp = import.meta.env["VITE_WHATSAPP_NUMBER"]?.trim() ?? "";
export const whatsappNumber = configuredWhatsApp.replace(/\D/g, "");
export const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hello FinMy3, I would like to know more about your financial services.",
    )}`
  : "";

export const appsScriptUrl = import.meta.env["VITE_GOOGLE_APPS_SCRIPT_URL"]?.trim() ?? "";

const socialEntries = [
  ["LinkedIn", import.meta.env["VITE_LINKEDIN_URL"]],
  ["Instagram", import.meta.env["VITE_INSTAGRAM_URL"]],
  ["Facebook", import.meta.env["VITE_FACEBOOK_URL"]],
] as const;

export const socialLinks = socialEntries.flatMap(([label, value]) => {
  if (!value) return [];
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return [];
    return [{ label, href: url.toString() }];
  } catch {
    return [];
  }
});

export const serviceNames = services.map((service) => service.name);