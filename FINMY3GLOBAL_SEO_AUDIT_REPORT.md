# FinMy3Global Complete SEO Audit Report

**Audit date:** 24 November 2026  
**Website:** https://www.finmy3global.com/  
**Audit scope:** Source code, live deployment, public crawl responses, and available web information  
**Instruction compliance:** This was an audit only. No source code or website configuration was modified.

## A. Executive Summary

FinMy3Global has a technically usable SEO foundation: the website is server-rendered, important pages return HTTP 200 responses, the homepage and page types contain meaningful HTML content, URLs are clean, and the robots file permits crawling. The live domain also correctly redirects bare domain and HTTP requests to the `www` HTTPS hostname.

The most important weakness is deployment inconsistency. SEO improvements exist in the workspace source and the local build output, but the live deployment currently does not expose the sitemap or the new canonical/OG/schema metadata. This leaves the live site at a weaker indexing and sharing readiness state until the latest build is deployed.

Other priorities are:

- Publish and submit `/sitemap.xml`.
- Deploy canonical URLs and route-specific metadata.
- Deploy JSON-LD Organization, ProfessionalService, and WebSite schema.
- Split the combined `/services` route into individual service landing pages where feasible.
- Add India-specific and international-business search intent coverage.
- Add FAQ/schema only after visible FAQ content is finalized.
- Publish a visible business identity, email, phone, service area, and real social profiles.
- Run Core Web Vitals and indexation measurements after deployment.

## B. SEO Scorecard

These are audit assessment scores, not Google ranking scores.

| Category | Score | Assessment |
|---|---:|---|
| Technical SEO | 62/100 | Clean URLs, redirects, SSR, and robots are positive. Live sitemap/canonical/schema deployment is incomplete. |
| On-page SEO | 70/100 | Titles and descriptions exist, headings are meaningful, and content is crawlable. Service and location targeting are thin. |
| Content SEO | 58/100 | Useful service summaries exist, but there is limited depth, evidence, FAQs, service examples, and India-local intent. |
| Indexing readiness | 69/100 | Important public routes return 200 and are discoverable. Sitemap and canonical deployment need correction. |
| Performance | 55/100 | Server-rendered and mobile-responsive; actual field Core Web Vitals and Lighthouse scores were not available. |
| Mobile optimization | 75/100 | Responsive navigation and CSS are implemented; browser testing and field metrics are still required. |
| Structured data | 35/100 | Schema is present in workspace source but not verified live. No live JSON-LD was found during audit. |
| Trust and security | 72/100 | HTTPS, privacy, terms, origin checks, server-side validation, and a honeypot-like website field are positive. Public contact identity details are limited. |

## C. Issues Table

| Issue | Affected URL/File | Severity | Explanation | Recommended Fix |
|---|---|---|---|---|
| Live sitemap is missing | `/sitemap.xml`; `public/sitemap.xml`; live deployment | Critical | `/sitemap.xml` returned 404. The workspace file exists and local build output contains it, but it is not currently available on the live site. | Deploy the latest build so `/sitemap.xml` is publicly served, validate XML, and submit it in Search Console and Bing Webmaster Tools. |
| Live robots file lacks sitemap reference | `/robots.txt`; `public/robots.txt` | High | Robots permits crawling but does not direct crawlers to a sitemap. | Deploy the sitemap and add `Sitemap: https://www.finmy3global.com/sitemap.xml`. |
| Canonical metadata not live | All routes; route `head()` definitions and root | High | The live homepage response did not expose a canonical link. Route source files contain planned canonical links, but they are not verified live. | Deploy route-specific canonical links using the final `https://www.finmy3global.com` URLs. |
| Open Graph URL and image not live | Homepage and route pages; `__root.tsx` | High | Live sharing metadata did not show `og:url`, `og:image`, or `twitter:image`. | Deploy unique/page-specific social image metadata, with at least a 1200x630 default social image. |
| Live structured data missing | All pages; `src/routes/__root.tsx` | High | Workspace source has Organization, ProfessionalService, and WebSite JSON-LD, but live HTML did not expose JSON-LD. | Deploy and validate the JSON-LD. Confirm that values match visible business information. |
| Source and live deployment are out of sync | Entire website | Critical | Local source/build includes sitemap and schema changes, while the live domain serves the older build. | Redeploy the latest commit. Then recheck every live URL and the HTTP response headers. |
| Only one `/services` page | `/services`; `src/routes/services.tsx`; `src/lib/finmytri.ts` | High | Five different services are listed on one route. Most relevant search queries need dedicated intent-matched pages. | Create individual pages for accounting, virtual CFO, tax support, financial reporting, and financial modelling/strategy. |
| No visible FAQ schema live | `/`; `src/components/finmytri-sections.tsx` | Medium | The FAQ component is visible in rendered content, but live JSON-LD FAQPage schema is not confirmed. | Add FAQ schema only if the FAQ remains visible and content is stable. If eligible, keep schema and visible text exact. |
| BreadcrumbList absent | All interior pages | Medium | Route hierarchy has no breadcrumb trail or BreadcrumbList JSON-LD. | Add visible breadcrumbs where useful and matching BreadcrumbList schema. |
| Service page depth is limited | `/services`; `src/routes/services.tsx`; `src/lib/finmytri.ts` | High | Each service has only a short summary, a description, and a benefit. There is no process, audience, deliverables, pricing context, case study, or FAQ depth. | Expand each service page with search-intent sections, examples, process, audience, outcomes, CTA, and FAQs. |
| India-local SEO missing | Homepage and all service pages | High | India is present in the enquiry country list, but visible copy does not clearly state a supported service location or Indian compliance context. | Add India in visible business identity and relevant content if it is genuinely the target market. Use Indian accounting/tax terminology carefully and avoid unverified claims. |
| Business identity details missing | Header/footer/contact | High | No visible physical address, telephone number, registered business name, or main business email was found. | Add verifiable business identity details only if approved for public use, and keep them consistent across the site and external profiles. |
| Social profile links missing or unverified | Footer; `src/lib/finmytri.ts`; `src/components/site-chrome.tsx` | Medium | Social links are environment-driven and may be absent if variables are unset. No profile information is publicly verified here. | Configure real profiles and add sameAs Organization schema. |
| Social preview image is unsuitable | `/finmy3global-logo.png`; root head | Medium | A wide header logo is not a purpose-built 1200x630 social preview and may render poorly. | Create a dedicated social card. Use 1200x630, with safe margins and readable branding. |
| Favicon branding does not match current logo | `/favicon.svg`; `public/favicon.svg` | Low | The live favicon is a generic green `F`, separate from the current FinMy3Global brand image. | Add a square favicon derived from the official logo or approved brand mark. |
| Header logo alt text empty | `src/components/site-chrome.tsx` | Medium | The home link has an aria-label, but an `<img alt="">` is decorative. Decorative treatment is valid because the link name is present. | Passed. No change required unless the image is intended to convey brand meaning independently. |
| Content images lack lazy loading | `src/routes/about.tsx` | Medium | The about image may load eagerly and does not specify decoding or fetch priority. | Add `loading="lazy"` and `decoding="async"` unless it is above-the-fold. |
| No explicit H1 on solutions map | `/solutions`; `src/routes/solutions.tsx` | Passed | The shared `PageIntro` component supplies one H1. | Preserve exactly one H1 per page. |
| Heading hierarchy | Homepage and content routes | Passed | The sampled pages use H1 then H2/H3, without any major skipped heading level found. | Preserve hierarchy when adding service detail content. |
| Internal linking | Header/footer/content CTA | Passed | Main routes are linked from navigation, footer, service cards, and CTAs. | Add contextual links to individual service pages and relevant solutions. |
| Live public routes return 200 | `/`, `/services`, `/solutions`, `/about`, `/contact`, `/privacy-policy`, `/terms-conditions` | Passed | All important public routes returned 200. | Preserve clean URLs and canonical metadata. |
| Unknown route returns 404 | `/not-a-real-page`; `src/routes/__root.tsx` | Passed | The unknown route returned an actual 404 response. | Add a 404 `noindex` rule and retain the useful home link. |
| HTTPS and WWW redirects | Root and hostname variants | Passed | HTTPS homepage returned 200. Bare domain and HTTP `www` redirected to the HTTPS `www` domain. | External DNS/Vercel verification should confirm redirect status remains permanent and there are no redirect chains. |
| robots.txt permits crawling | `/robots.txt`; `public/robots.txt` | Passed | Robots allows major crawlers and all user agents. | Add sitemap reference after deployment. Do not block CSS, JS, or API assets. |
| Server-rendered HTML is available | TanStack Start/Nitro routes | Passed | Public page text was available in live HTML, confirming crawlable server output. | Preserve SSR/head metadata and avoid hiding important content behind client-only interactions. |
| Form spam protection | `src/routes/api.enquiry.ts`; `src/components/enquiry-form.tsx` | Passed | Origin validation, server-side validation, honeypot field, and cross-origin rejection are implemented. | Keep protection; consider rate limiting and reCAPTCHA/hCaptcha only if spam volume requires it. |
| API route exposed through router | `/api/enquiry`; `src/routes/api.enquiry.ts` | Low | The route is intended for submission and is not linked as public content. | Add `noindex` behavior if route output could be indexed, and keep it excluded from sitemap. |
| Public secrets not identified | `.env`; source | Passed | No private key or token was found in source files. `.env` is git-excluded according to repository conventions; do not publish credentials. | Keep server secrets outside `VITE_` variables and rotate any public credential if exposure is suspected. |

## D. Missing Features

1. Live XML sitemap.
2. Live route canonicals.
3. Live social preview URLs and dedicated 1200x630 image.
4. Live JSON-LD Organization/ProfessionalService/WebSite/BreadcrumbList.
5. Individual URL landing pages for services.
6. Visible business address, phone, email, and service area.
7. Real, verified social profiles and `sameAs` schema.
8. Team/founder expertise, credentials, and process evidence.
9. Client results or testimonials with permission.
10. India-focused location pages or a clearly stated service-area section.
11. Blog/resources section for informational financial and tax intent.
12. Breadcrumb navigation.
13. Search Console and Bing Webmaster property data.
14. Analytics conversion tracking and SEO indexation monitoring.
15. Cookie consent/banner if analytics or non-essential cookies are used.

## E. Keyword Strategy

Keyword volumes and competition are **not available** from this audit and must be measured with Google Keyword Planner or another approved keyword tool.

### Homepage

- Primary: financial consulting services India
- Primary: virtual CFO services India
- Secondary: financial advisory for small businesses
- Secondary: virtual CFO for startups
- Secondary: accounting and bookkeeping services India
- Secondary: financial reporting services
- Secondary: financial planning for growing businesses
- Secondary: outsourced finance services

### Accounting & Bookkeeping

- Primary: accounting and bookkeeping services
- Secondary: bookkeeping services for small business
- Secondary: outsourced bookkeeping India
- Secondary: account reconciliation services
- Secondary: bookkeeping and financial reporting
- Suggested title pattern: `Accounting & Bookkeeping Services for Growing Businesses | FinMy3`

### Virtual CFO Services

- Primary: virtual CFO services
- Secondary: outsourced CFO services
- Secondary: fractional CFO India
- Secondary: virtual CFO for startups
- Secondary: virtual CFO for SMEs
- Secondary: cash flow forecasting and budgeting
- Suggested title pattern: `Virtual CFO Services for Startups and Growing Businesses | FinMy3`

### Tax Compliance & Support

- Primary: tax compliance and support
- Secondary: tax planning services India
- Secondary: business tax compliance support
- Secondary: tax documentation services
- Secondary: GST tax support for businesses
- Compliance note: only include GST or specific Indian tax claims if the final legal scope and expertise are verified.

### Financial Reporting

- Primary: financial reporting services
- Secondary: management reporting services
- Secondary: management accounts and MIS reporting
- Secondary: cash flow reporting
- Secondary: KPI and business performance reporting

### Financial Modelling & Financial Strategy

- Primary: financial modelling services
- Secondary: financial strategy consulting
- Secondary: business forecasting model
- Secondary: scenario analysis and financial planning
- Secondary: financial model for funding
- Secondary: startup financial planning

### India/local SEO

Use only after confirming the real service location:

- `financial consultant in [city]`
- `virtual CFO services in [city]`
- `accounting firm in [city]`
- `outsourced CFO [city]`
- `bookkeeping services in [city]`
- `tax compliance support [city]`

## F. Recommended Page Structure

Preserve the existing design and navigation, with the following URL and content structure:

```text
/
/about/
/services/
  /accounting-bookkeeping/
  /virtual-cfo/
  /tax-compliance-support/
  /financial-reporting/
  /financial-modelling-financial-strategy/
/solutions/
  /startups/
  /small-businesses/
  /growing-businesses/
  /international-businesses/
/contact/
/privacy-policy/
/terms-and-conditions/
/resources/
/resources/[article-slug]/
```

Recommended service page structure:

1. H1 targeting the service.
2. Short answer/summary.
3. Audience and use cases.
4. Scope and deliverables.
5. Process.
6. Business outcomes.
7. Pricing or engagement model where appropriate.
8. FAQ section.
9. Related services and solutions.
10. Strong contact CTA.

Recommended homepage structure:

1. Current H1 and concise value proposition.
2. One or two primary and secondary keywords in visible copy.
3. Services summary linking to dedicated pages.
4. Solutions by business stage.
5. Process.
6. FAQ.
7. Trust signals and contact CTA.

## G. Prioritized Action Plan

### Phase 1: Critical technical issues

- Deploy the latest build.
- Verify `/sitemap.xml` is 200, valid XML, and contains only final canonical URLs.
- Deploy route canonical links.
- Confirm bare domain and HTTP redirects have no intermediate hops.
- Verify homepage and service routes in live HTML.
- Add robots sitemap reference.
- Remove the API route from sitemap and add route-specific `noindex` if crawlable output is exposed.
- Configure Search Console and Bing Webmaster Tools.
- Submit sitemap and inspect coverage.

### Phase 2: On-page SEO improvements

- Improve homepage title and description around financial consulting/virtual CFO intent.
- Add one clear H1 per page.
- Improve page descriptions and meta titles.
- Add visible India/service-area information only after business confirmation.
- Improve internal links to individual services.
- Add breadcrumbs.
- Add footer contact details and social profiles.

### Phase 3: Content and service pages

- Create individual service landing pages.
- Expand service and solution copy to answer search intent.
- Add process, deliverables, audiences, examples, and FAQs.
- Create 8-12 supporting articles on bookkeeping, CFO, forecasting, reporting, compliance, and cash flow.
- Add founder/team expertise and trust evidence.
- Add approved case studies or testimonials.

### Phase 4: Performance and structured data

- Deploy Organization, ProfessionalService, WebSite, and BreadcrumbList schema.
- Run PageSpeed Insights/mobile and desktop.
- Measure LCP, INP, CLS, TTFB, and field data.
- Optimize logo/social images.
- Lazy-load the about image.
- Audit JS bundle and third-party scripts.
- Review font loading and CSS render blocking.

### Phase 5: Authority and long-term SEO

- Create and verify a Google Business Profile only if eligible for local customer-facing service.
- Develop consistent location, business name, and contact data across external profiles.
- Build relevant finance/accounting backlinks.
- Publish original India-focused guidance.
- Get trade association, partner, and professional directory mentions.
- Track branded/non-branded impressions and conversions.

## H. Implementation Checklist

### Technical

- [ ] Redeploy latest repository build.
- [ ] Confirm `https://www.finmy3global.com/sitemap.xml` returns 200.
- [ ] Confirm `https://www.finmy3global.com/robots.txt` references the sitemap.
- [ ] Confirm canonical tags on every public page.
- [ ] Confirm no canonical points to a Vercel preview or bare domain.
- [ ] Confirm 308 redirects from HTTP and bare domain variants.
- [ ] Confirm no redirect chains.
- [ ] Confirm `/api/enquiry` is not in sitemap.
- [ ] Confirm 404 response and useful custom 404 UX.
- [ ] Add `noindex` to error/API responses if applicable.
- [ ] Validate HTML in major routes.

### Metadata and sharing

- [ ] Deploy route titles and descriptions.
- [ ] Deploy `og:url`, `og:type`, `og:title`, and `og:description`.
- [ ] Create and deploy a 1200x630 social image.
- [ ] Deploy `og:image` and `twitter:image`.
- [ ] Verify sharing previews in LinkedIn, Facebook, and X.
- [ ] Replace the green generic favicon with the official brand mark.

### Structured data

- [ ] Deploy Organization JSON-LD.
- [ ] Deploy ProfessionalService JSON-LD.
- [ ] Deploy WebSite JSON-LD.
- [ ] Add BreadcrumbList on interior pages.
- [ ] Add FAQ schema only for stable visible FAQs.
- [ ] Add individual Service schema after separate service URLs exist.
- [ ] Validate with Rich Results Test and Schema.org validators.
- [ ] Replace placeholders or assumptions with verified business facts.

### Content

- [ ] Confirm primary target market: India, international, or both.
- [ ] Add real business location and contact details.
- [ ] Create five dedicated service pages.
- [ ] Expand each service page with process, outcomes, and FAQs.
- [ ] Add India-specific context only where accurate.
- [ ] Add client outcomes/testimonials with permission.
- [ ] Add founder/team expertise and credentials.
- [ ] Build an internal linking plan.
- [ ] Create informational resource articles.

### Performance

- [ ] Run mobile and desktop PageSpeed Insights.
- [ ] Record LCP, INP, CLS, TTFB, and final lab/field classifications.
- [ ] Optimize and compress images.
- [ ] Use explicit image dimensions.
- [ ] Lazy-load off-screen images.
- [ ] Review font loading.
- [ ] Review bundle size and remove unused dependencies.
- [ ] Review third-party scripts.

### Monitoring

- [ ] Add and verify Search Console.
- [ ] Add and verify Bing Webmaster Tools.
- [ ] Submit sitemap.
- [ ] Monitor index coverage.
- [ ] Monitor canonical and duplicate URL warnings.
- [ ] Add GA4 or privacy-approved analytics.
- [ ] Track service inquiry events and form submission outcomes.
- [ ] Review mobile usability reports.
- [ ] Run quarterly technical SEO audits.

## I. External Verification and Limitations

The following items require access or external tools:

- Search Console indexed URL and coverage status.
- Actual rankings, impressions, clicks, and keyword data.
- Google/Bing crawl logs.
- Core Web Vitals field data.
- Lighthouse lab performance scores.
- DNS configuration and hostname redirect chains.
- Google Analytics and conversion data.
- Real business address, phone, email, tax scope, and qualifications.
- Real social profile URLs.
- Google Business Profile eligibility and local ranking.
- Competitor rankings and search volumes.

No competitor rankings or search volumes are claimed in this report because reliable live search volume data was not available.
