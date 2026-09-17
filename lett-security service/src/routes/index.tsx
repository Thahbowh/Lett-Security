import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Facebook,
  GraduationCap,
  Headphones,
  Instagram,
  KeyRound,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  SearchCheck,
  Shield,
  ShieldCheck,
  Siren,
  UsersRound,
  X,
  Car,
  ShieldAlert,
} from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";

import heroImage from "../assets/security-guard-hero.jpg";
import aboutImage from "../assets/security-let-about.jpg";
import logo from  "../assets/favicon.ico";
import { RegistrationForm } from "@/components/site/RegistrationForm";

const title = "Lett Security Service | Professional Security You Can Trust";
const description =
  "Lett Security Service provides professional, reliable, and affordable security solutions for homes, businesses, events, and communities across South Africa.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navigation = [
  ["Home", "home"],
  ["About Us", "about"],
  ["Services", "services"],
  ["Why Choose Us", "why-us"],
  ["Contact", "contact"],
] as const;

const services = [
  { icon: Shield, title: "Armed and Unarmed Guarding", text: "Professional guards selected and trained for your site's specific needs." },
  { icon: Building2, title: "Commercial Security", text: "Practical security solutions for offices, retail and industrial premises." },
  { icon: UsersRound, title: "Event Security", text: "Trained teams for crowd management, access and event safety." },
  { icon: KeyRound, title: "Access Control", text: "Controlled, recorded access for people, vehicles and sensitive areas." },
  { icon: Car, title: "Patrol and Escort Services", text: "Regular security patrols and professional escort services to help keep people, properties and valuable assets safe." },
  { icon: ShieldAlert, title: "24/7 Response", text: "Fast, reliable security response whenever you need assistance, with trained personnel ready to respond day or night." },
];

const benefits = [
  "PSIRA Registered",
  "24/7 availability",
  "Highly trained and professional personnel",
  "Fast response and reliable communication",
  "Modern security technology",
  "Affordable security packages",
  "Service coverage across South Africa",
];

function ActionLink({ href, children, inverse = false }: { href: string; children: ReactNode; inverse?: boolean }) {
  return (
    <a href={href} className={inverse ? "button button-inverse" : "button button-primary"}>
      {children}
    </a>
  );
}

function BrandMark() {
  return (
    <a href="#home" className="brand" aria-label="Lett Security Service home">
      <span className="brand-shield">
        <img src={logo} alt="" aria-hidden="true" />
      </span>
      <span>Lett Security Service</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          <a className="nav-quote" href="#contact">Get a Quote</a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ChevronRight aria-hidden="true" /></a>)}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero" style={{ "--hero-image": `url(${heroImage})` } as CSSProperties}>
      <div className="hero-content">
        <p className="location-label"><MapPin aria-hidden="true" />Phuthaditjhaba</p>
        <h1>Professional Security<br />You Can Trust</h1>
        <p className="hero-copy">Protecting what matters most with experienced security professionals, advanced technology, and 24/7 reliable service across South Africa.</p>
        <div className="hero-actions">
          <ActionLink href="#contact">Get Free Quote Now <ArrowRight aria-hidden="true" /></ActionLink>
          <ActionLink href="#academy">Lett&apos;s Security Academy <GraduationCap aria-hidden="true" /></ActionLink>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About Us"><span /><span /></a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section-about">
      <div className="section-inner about-grid">
        <div className="about-image-wrap">
          <img src={aboutImage} alt="Lett Security Service officers discussing a site security plan" loading="lazy" width={1200} height={1500} />
          <div className="experience-badge"><strong>24/7</strong><span>Always on guard</span></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">About Lett Security</p>
          <h2>Your Safety Is<br />Our Priority</h2>
          <p>Lett Security Service provides reliable, professional, and affordable security solutions for homes, businesses, events, and communities. Our trained security personnel help protect people, property, and valuable assets.</p>
          <div className="trust-row">
            <div><Clock3 aria-hidden="true" /><strong>24/7</strong><span>Protection</span></div>
            <div><BadgeCheck aria-hidden="true" /><strong>Trained</strong><span>Professionals</span></div>
            <div><ShieldCheck aria-hidden="true" /><strong>Psira Certified</strong><span>Fully Licensed</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section section-services">
      <div className="section-inner">
        <div className="section-heading">
          <div><p className="eyebrow">What we do</p><h2>Our Security Services</h2></div>
          <p>Complete protection, delivered by people you can depend on.</p>
        </div>
        <div className="services-grid">
          {services.map(({ icon: Icon, title: serviceTitle, text }, index) => (
            <article className="service-card" key={serviceTitle}>
              <span className="service-number">0{index + 1}</span>
              <div className="service-icon"><Icon aria-hidden="true" /></div>
              <h3>{serviceTitle}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="section section-dark">
      <div className="section-inner why-grid">
        <div className="why-intro">
          <p className="eyebrow">A trusted partner</p>
          <h2>Why Choose Lett<br />Security Service?</h2>
          <p>Security is more than a uniform. It is readiness, discipline, communication and a genuine commitment to the people we protect.</p>
          <ActionLink href="#contact">Talk to Our Team <ArrowRight aria-hidden="true" /></ActionLink>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit) => <div className="benefit" key={benefit}><span><Check aria-hidden="true" /></span><p>{benefit}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <>
      <section className="cta-band">
        <div className="section-inner cta-inner"><div><p className="eyebrow">Take the first step</p><h2>Ready to Protect What Matters Most?</h2><p>Speak to our team today and receive a free security assessment and quotation.</p></div><ActionLink href="#contact" inverse>Request a Free Quote <ArrowRight aria-hidden="true" /></ActionLink></div>
      </section>
      <section id="contact" className="section section-contact">
        <div className="section-inner contact-grid">
          <div className="contact-details">
            <p className="eyebrow">Contact us</p><h2>Lett&apos;s Talk<br />Security</h2>
            <p>Tell us what you need protected. Our team will help you find a practical, affordable solution.</p>
            <div className="contact-list">
              <a href="tel:+27735796573"><Phone aria-hidden="true" /><span><small>Cell</small>+27 73 579 6573</span></a>
              <a href="tel:+27580300185"><Phone aria-hidden="true" /><span><small>Tel</small>+27 58 030 0185</span></a>
              <a href="mailto:lethimantashe@gmail.com"><Mail aria-hidden="true" /><span><small>Email us</small>lethimantashe@gmail.com</span></a>
              <div><MapPin aria-hidden="true" /><span><small>Our location</small>Block K341, Naledi Mall, Qwaqwa, Phuthaditjhaba,9866</span></div>
            </div>
            <a className="whatsapp-link" href="https://wa.me/+27813826643" target="_blank" rel="noreferrer"><span className="whatsapp-glyph">◔</span>Chat on WhatsApp</a>
          </div>
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-inner footer-grid">
        <div className="footer-brand"><BrandMark /><p>Professional security solutions built around your people, property and peace of mind.</p><p>PSiRA Registration No: 492633</p><p>CIPC Registration No: 2025/187703/07</p><div className="socials"><a href="#home" aria-label="Facebook"><Facebook /></a><a href="#home" aria-label="Instagram"><Instagram /></a><a href="#home" aria-label="LinkedIn"><Linkedin /></a></div></div>
        <div><h3>Quick Links</h3>{navigation.slice(1).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
        <div id="academy"><h3>Services</h3>{services.slice(0, 5).map((service) => <a key={service.title} href="#services">{service.title}</a>)}</div>
        <div><h3>Always Ready</h3><p><Siren aria-hidden="true" />Protection when you need it.</p><p><Headphones aria-hidden="true" />Support you can rely on.</p></div>
      </div>
      <div className="section-inner footer-bottom"><span>© 2026 Lett Security Service. All rights reserved.</span><span>Protecting South Africa, one community at a time.</span></div>
    </footer>
  );
}

function Index() {
  return (
    <div className="site-shell">
      <Header />
      <main><Hero /><About /><Services /><WhyUs /><Contact /></main>
      <Footer />
      <a className="floating-whatsapp" href="https://wa.me/+27813826643" target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp"><span className="whatsapp-glyph">◔</span></a>
    </div>
  );
}