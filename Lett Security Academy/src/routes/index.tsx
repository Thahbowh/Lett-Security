import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Overview } from "@/components/site/Overview";
import { Courses } from "@/components/site/Courses";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";

const title = "Lett Security Academy | Professional Security Training";
const description =
  "Professional security training for Grades E, D and C. Start your security career with Lett Security Academy and become job-ready.";

export const Route = createFileRoute("/")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Lett Security Academy",
          description,
          areaServed: "South Africa",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Courses />
        <RegistrationForm />
        <About />
      </main>
      <Footer />
    </div>
  );
}
