import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calculator, Eye, Landmark, LineChart, ShieldCheck, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FinMy3 | Financial Clarity for Business" },
      { name: "description", content: "Learn about FinMy3's mission, vision, and professional financial solutions for growing businesses." },
      { property: "og:url", content: "https://www.finmy3global.com/about" },
      { property: "og:title", content: "About FinMy3 | Financial Clarity for Business" },
      { property: "og:description", content: "Learn about FinMy3's mission, vision, and professional financial solutions for growing businesses." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.finmy3global.com/about" }],
  }),
  component: AboutPage,
});

const serviceHighlights = [
  { title: "Accounting & Bookkeeping", Icon: Calculator },
  { title: "Virtual CFO Services", Icon: Landmark },
  { title: "Tax Compliance & Support", Icon: ShieldCheck },
  { title: "Financial Reporting", Icon: LineChart },
  { title: "Financial Modelling & Financial Strategy", Icon: Target },
];

function AboutPage() {
  const [serviceSlide, setServiceSlide] = useState(0);
  const serviceTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setServiceSlide((current) => (current + 1) % serviceHighlights.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const track = serviceTrackRef.current;
    if (!track || window.matchMedia("(min-width: 641px)").matches) return;

    const card = track.querySelector<HTMLElement>(".about-service-card");
    if (!card) return;

    track.scrollTo({ left: serviceSlide * (card.offsetWidth + 12), behavior: "smooth" });
  }, [serviceSlide]);

  return (
    <>
      <section className="about-hero">
        <div className="page-container about-hero-grid">
          <div className="about-hero-copy">
            <p className="about-pill">About FinMy3</p>
            <h1>Simplifying Finance.<br /><span>Empowering Growth.</span></h1>
            <p className="about-lead">At FinMy3, we believe that effective financial management is the foundation of every successful business.</p>
            <p>We provide comprehensive financial solutions designed to help startups, small businesses, and growing enterprises manage their finances with confidence.</p>
            <p>Our services cover Accounting &amp; Bookkeeping, Virtual CFO Services, Tax Compliance &amp; Support, Financial Reporting, and Financial Modelling &amp; Financial Strategy.</p>
            <p>Our focus is to simplify complex financial processes, support informed decision-making, and help businesses build a stronger financial future.</p>
            <Button asChild variant="brand" size="lg" className="about-cta !text-white">
              <a href="/services">Explore Our Services <ArrowRight size={18} aria-hidden="true" /></a>
            </Button>
          </div>
          <div className="about-hero-image">
            <img src="/about-finance.svg" alt="Financial dashboard with a laptop, calculator, and growth chart" />
          </div>
        </div>
      </section>

      <section className="about-mission-section">
        <div className="page-container about-mission-grid">
          <article className="about-value-card">
            <span className="about-value-icon"><Target size={24} aria-hidden="true" /></span>
            <div><h2>Our Mission</h2><p>To make professional financial management accessible, reliable, and straightforward for businesses of all sizes.</p></div>
          </article>
          <article className="about-value-card">
            <span className="about-value-icon"><Eye size={24} aria-hidden="true" /></span>
            <div><h2>Our Vision</h2><p>To become a trusted financial services partner, empowering businesses to achieve sustainable growth through smarter financial decisions.</p></div>
          </article>
        </div>
      </section>

      <section className="about-services-section">
        <div className="page-container">
          <div className="about-section-heading">
            <p className="about-pill">Why Choose FinMy3?</p>
            <h2>Your Trusted Financial Partner</h2>
            <p>We are committed to delivering value through professional, transparent, and business-focused solutions.</p>
          </div>
          <div className="about-service-carousel">
            <div ref={serviceTrackRef} className="about-service-grid">
              {serviceHighlights.map(({ title, Icon }) => (
                <article key={title} className="about-service-card">
                  <span><Icon size={24} aria-hidden="true" /></span>
                  <h3>{title}</h3>
                </article>
              ))}
            </div>
            <div className="about-service-dots" aria-label="Choose a service">
              {serviceHighlights.map((item, index) => (
                <button key={item.title} type="button" className={index === serviceSlide ? "active" : ""} onClick={() => setServiceSlide(index)} aria-label={`Show ${item.title}`} aria-current={index === serviceSlide ? "true" : undefined} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-bottom-cta">
        <div className="page-container">
          <div className="about-cta-band">
            <div className="about-cta-icon" aria-hidden="true">🤝</div>
            <div className="about-cta-copy">
              <h2>Let&apos;s Build a Stronger Financial Future Together</h2>
              <p>Get in touch with us today for personalized financial solutions.</p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <a href="/contact">Contact Us <ArrowRight size={17} aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}