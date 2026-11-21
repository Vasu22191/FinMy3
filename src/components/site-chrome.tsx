import { useState } from "react";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { services, socialLinks, whatsappUrl } from "@/lib/finmytri";

const navigation = [
	{ label: "Home", to: "/" as const },
	{ label: "Services", to: "/services" as const },
	{ label: "Solutions", to: "/solutions" as const },
	{ label: "About Us", to: "/about" as const },
	{ label: "Contact Us", to: "/contact" as const },
];

function BrandLockup() {
	return (
		<Link to="/" className="brand-lockup" aria-label="FinMy3 home">
			<span className="brand-mark" aria-hidden="true">
				F
			</span>
			<span>FinMy3</span>
		</Link>
	);
}

export function SiteHeader() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="site-header">
			<div className="page-container site-header-inner">
				<BrandLockup />
				<nav className="desktop-nav" aria-label="Main navigation">
					{navigation.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							className="nav-link"
							activeProps={{ className: "nav-link text-brand" }}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<Button asChild variant="brand" className="desktop-cta !text-white">
					<Link to="/contact">
						Get Started <ArrowRight aria-hidden="true" />
					</Link>
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="mobile-menu-trigger md:hidden"
					aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
					aria-expanded={menuOpen}
					aria-controls="mobile-navigation"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
				</Button>
			</div>
			{menuOpen && (
				<nav
					id="mobile-navigation"
					className="page-container mobile-menu-panel"
					aria-label="Mobile navigation"
				>
					{navigation.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							className="mobile-menu-link"
							activeProps={{ className: "mobile-menu-link text-brand" }}
							onClick={() => setMenuOpen(false)}
						>
							{item.label}
						</Link>
					))}
					<Button asChild variant="brand" className="mt-2 w-full !text-white">
						<Link to="/contact" onClick={() => setMenuOpen(false)}>
							Get Started <ArrowRight aria-hidden="true" />
						</Link>
					</Button>
				</nav>
			)}
		</header>
	);
}

export function SiteFooter() {
	const serviceLinks = services.slice(0, 5);

	return (
		<footer className="site-footer">
			<div className="page-container">
				<div className="footer-grid">
					<div className="footer-brand">
						<BrandLockup />
						<p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
							Financial consulting and virtual CFO support for clearer business
							decisions.
						</p>
						<div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									className="footer-link"
									href={social.href}
									target="_blank"
									rel="noreferrer"
								>
									{social.label}
								</a>
							))}
						</div>
					</div>
					<div className="grid content-start gap-3">
						<h2 className="text-sm font-extrabold text-foreground">Explore</h2>
						{navigation.slice(1).map((item) => (
							<Link key={item.label} className="footer-link" to={item.to}>
								{item.label}
							</Link>
						))}
					</div>
					<div className="grid content-start gap-3">
						<h2 className="text-sm font-extrabold text-foreground">Services</h2>
						{serviceLinks.map((service) => (
							<Link key={service.name} className="footer-link" to="/services">
								{service.name}
							</Link>
						))}
					</div>
					<div className="grid content-start gap-3">
						<h2 className="text-sm font-extrabold text-foreground">
							Get in touch
						</h2>
						<Link className="footer-link" to="/contact">
							Send an enquiry
						</Link>
						<a
							className="footer-link"
							href={whatsappUrl}
							target="_blank"
							rel="noreferrer"
						>
							WhatsApp FinMy3
						</a>
						<Link className="footer-link" to="/privacy-policy">
							Privacy Policy
						</Link>
						<Link className="footer-link" to="/terms-conditions">
							Terms and Conditions
						</Link>
					</div>
				</div>
				<div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
					<span>© 2026 FinMy3. All rights reserved.</span>
					<span>Financial clarity for your next move.</span>
				</div>
			</div>
		</footer>
	);
}

export function WhatsAppButton() {
	return (
		<a
			className="whatsapp-fab"
			href={whatsappUrl}
			target="_blank"
			rel="noreferrer"
			aria-label="Chat with FinMy3 on WhatsApp"
			title="Chat with FinMy3 on WhatsApp"
		>
			<MessageCircle size={21} aria-hidden="true" />
		</a>
	);
}