export const services = [
  {
    name: "Financial Consulting",
    short: "Practical financial guidance for the decisions that shape your business.",
    description:
      "Work through business priorities with clear financial context, practical options, and a plan that fits the way your company operates.",
    benefit: "Make decisions with a clearer view of the financial trade-offs.",
  },
  {
    name: "Financial Analysis",
    short: "Understand the story behind your numbers and what to do next.",
    description:
      "Review financial performance, identify meaningful trends, and turn complex figures into straightforward insights for your next decision.",
    benefit: "See where performance is changing and why it matters.",
  },
  {
    name: "Budgeting and Forecasting",
    short: "Plan ahead with flexible budgets and forward-looking forecasts.",
    description:
      "Build budgets and forecasts around your operating plans, then revisit assumptions as your business and market conditions change.",
    benefit: "Align financial plans with real business priorities.",
  },
  {
    name: "Cash Flow Management",
    short: "Bring more visibility to cash timing, needs, and opportunities.",
    description:
      "Improve visibility into expected inflows and outflows so you can anticipate cash requirements and plan with greater confidence.",
    benefit: "Spot upcoming cash needs earlier and act deliberately.",
  },
  {
    name: "MIS Reporting",
    short: "Get management information that supports timely decisions.",
    description:
      "Create a useful reporting rhythm with concise management information tailored to the questions your leadership team needs answered.",
    benefit: "Keep decision-makers focused on the measures that matter.",
  },
  {
    name: "Virtual CFO Services",
    short: "Access ongoing financial leadership without a full-time CFO role.",
    description:
      "Add strategic financial planning, performance reviews, and leadership support to your team through a flexible virtual CFO relationship.",
    benefit: "Bring senior financial thinking into regular business conversations.",
  },
  {
    name: "Financial Reporting",
    short: "Make business performance easier to understand and communicate.",
    description:
      "Prepare clear, consistent financial reporting that helps owners and leaders understand results and communicate financial performance.",
    benefit: "Make results easier to review and discuss.",
  },
  {
    name: "Finance Process Improvement",
    short: "Make finance workflows clearer, more consistent, and efficient.",
    description:
      "Review finance workflows, clarify responsibilities, and identify practical ways to improve consistency, control, and turnaround time.",
    benefit: "Reduce avoidable friction in day-to-day finance work.",
  },
  {
    name: "Accounting System Implementation",
    short: "Set up accounting systems that suit your business operations.",
    description:
      "Plan and support accounting system implementation with attention to business requirements, reporting needs, and practical team workflows.",
    benefit: "Build a stronger foundation for reliable financial information.",
  },
  {
    name: "Cross-border Tax Research",
    short: "Get research support for questions involving multiple markets.",
    description:
      "Organize research around cross-border tax questions and identify relevant considerations to discuss with the appropriate local tax professionals.",
    benefit: "Approach international tax questions with clearer context.",
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

const configuredWhatsApp = import.meta.env["VITE_WHATSAPP_NUMBER"]?.trim() || "918897085834";
export const whatsappNumber = configuredWhatsApp.replace(/\D/g, "");
export const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hello FinMyTri, I would like to know more about your financial services.",
)}`;

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