import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardList,
  Coins,
  FileBarChart,
  Globe2,
  Landmark,
  Lightbulb,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { services, solutions } from "@/lib/finmytri";

const serviceIcons: LucideIcon[] = [
  Lightbulb,
  ChartNoAxesCombined,
  ClipboardList,
  Wallet,
  FileBarChart,
  BriefcaseBusiness,
  BarChart3,
  Settings2,
  Building2,
  Globe2,
];

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow justify-center">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {description && <p className="mt-4 leading-7 text-muted-foreground">{description}</p>}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-container max-w-5xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title mt-3 max-w-4xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}

export function ServiceGrid({ limit }: { limit?: number }) {
  const shownServices = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="service-grid">
      {shownServices.map((service) => {
        const iconIndex = services.findIndex((item) => item.name === service.name);
        const Icon = serviceIcons[iconIndex] ?? CircleDollarSign;

        return (
          <article key={service.name} className="service-item">
            <span className="icon-tile"><Icon size={21} aria-hidden="true" /></span>
            <h3 className="mt-5 text-lg font-extrabold text-foreground">{service.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.short}</p>
            {limit == null && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm leading-6 text-foreground">{service.description}</p>
                <p className="mt-3 flex gap-2 text-sm font-bold text-brand">
                  <Sparkles className="mt-0.5 shrink-0" size={15} aria-hidden="true" />
                  <span>{service.benefit}</span>
                </p>
              </div>
            )}
            <Link to="/contact" className="service-card-link">
              Get Started <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function SolutionsPreview() {
  const solutionIcons: LucideIcon[] = [Coins, BriefcaseBusiness, ChartNoAxesCombined, Globe2];

  return (
    <div className="audience-grid">
      {solutions.map((solution, index) => {
        const Icon = solutionIcons[index] ?? Building2;
        return (
          <article key={solution.name} className="audience-item">
            <Icon size={22} className="text-brand" aria-hidden="true" />
            <h3 className="mt-4 text-base font-extrabold text-foreground">{solution.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{solution.detail}</p>
          </article>
        );
      })}
    </div>
  );
}

export function ContactCallout() {
  return (
    <section className="section-block feature-band">
      <div className="page-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary-foreground">A clearer financial picture starts here</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-primary-foreground md:text-4xl">
            Let’s make your next decision a more confident one.
          </h2>
        </div>
        <Button asChild variant="secondary" size="lg">
          <Link to="/contact">Talk to FinMy3 <ArrowRight aria-hidden="true" /></Link>
        </Button>
      </div>
    </section>
  );
}

export function FaqSection() {
  const questions = [
    {
      question: "What does a virtual CFO do?",
      answer:
        "A virtual CFO provides ongoing financial leadership such as planning, performance reviews, forecasting, and decision support, delivered flexibly for your business.",
    },
    {
      question: "Can FinMy3 support an early-stage business?",
      answer:
        "Yes. Support can be shaped around startup needs such as budgeting, cash flow visibility, financial reporting, and planning for the next stage.",
    },
    {
      question: "Can I ask about one specific service?",
      answer:
        "Yes. Use the enquiry form to select a service and share what your business needs. FinMy3 can then respond to your enquiry directly.",
    },
    {
      question: "Does FinMy3 provide cross-border tax support?",
      answer:
        "FinMy3 offers cross-border tax research support to help organize questions and considerations for discussion with relevant local tax professionals.",
    },
  ];

  return (
    <section className="section-block bg-background">
      <div className="page-container">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="A few useful starting points"
          description="Have another question? Send a note and tell us what you are working through."
        />
        <div className="faq-list mt-10">
          {questions.map((item) => (
            <details key={item.question} className="faq-item group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-extrabold text-foreground">
                {item.question}
                <span className="text-xl font-normal text-brand" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  const steps = [
    { number: "01", title: "Understand", description: "Start with your priorities, business context, and the questions you need answered." },
    { number: "02", title: "Bring clarity", description: "Review the financial picture and identify the information that will guide your choices." },
    { number: "03", title: "Move forward", description: "Turn the agreed priorities into practical financial actions and regular follow-through." },
  ];

  return (
    <div className="process-steps-grid">
      {steps.map((step, index) => (
        <article key={step.number} className="process-step-card">
          <div className="process-step-header">
            <span className="process-step-number">{step.number}</span>
            {index < steps.length - 1 && <span className="process-step-line" aria-hidden="true" />}
          </div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  );
}

export function WhyFinMy3() {
  const features = [
    { title: "Clearer information", text: "Translate financial detail into useful context for business decisions." },
    { title: "Practical support", text: "Focus on solutions that fit your goals, team, and operating reality." },
    { title: "Flexible expertise", text: "Choose focused project support or ongoing financial guidance." },
  ];

  return (
    <div className="feature-grid">
      {features.map((feature) => (
        <article key={feature.title} className="feature-item">
          <ShieldCheck size={22} className="text-mint" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-extrabold text-primary-foreground">{feature.title}</h3>
          <p className="mt-2 text-sm leading-7 text-primary-foreground/75">{feature.text}</p>
        </article>
      ))}
    </div>
  );
}

export function ServicesLink() {
  return (
    <Button asChild variant="outline">
      <Link to="/services">View all services <ArrowRight aria-hidden="true" /></Link>
    </Button>
  );
}

export function AboutIntro() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <article className="content-item">
        <Landmark className="text-brand" size={24} aria-hidden="true" />
        <h2 className="mt-4 text-xl font-extrabold text-foreground">Our mission</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Make financial insight more accessible and useful, so businesses can plan thoughtfully and move forward with clarity.
        </p>
      </article>
      <article className="content-item">
        <BookOpenCheck className="text-brand" size={24} aria-hidden="true" />
        <h2 className="mt-4 text-xl font-extrabold text-foreground">Our vision</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Help businesses build a stronger relationship with their finances through clear information, practical guidance, and considered planning.
        </p>
      </article>
    </div>
  );
}