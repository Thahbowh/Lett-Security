const links = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Courses", href: "#courses" },
  { label: "Register", href: "#register" },
  { label: "About Us", href: "#about" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-brand-gold">Lett Security Academy</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            Professional security training for Grades E, D and C in South Africa.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-gold">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-white/80 transition-colors hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-gold">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Phone: to be confirmed</li>
            <li>Email: to be confirmed</li>
            <li>Location: South Africa</li>
          </ul>
          <p className="mt-4 text-sm text-white/60">Social media links coming soon.</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-white/60 sm:px-8">
          © {new Date().getFullYear()} Lett Security Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
