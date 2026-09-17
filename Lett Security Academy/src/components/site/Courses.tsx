import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const courses = [
  {
    grade: "Grade E",
    title: "Grade E Security Training",
    description:
      "The entry-level starting point for anyone beginning a career as a security officer.",
    info: "Covers the fundamentals of access control, patrolling, observation and incident reporting.",
  },
  {
    grade: "Grade D",
    title: "Grade D Security Training",
    description:
      "The next step up, building on Grade E with broader on-site duties and responsibilities.",
    info: "Focuses on practical guarding procedures, occurrence books, searching and emergency response.",
  },
  {
    grade: "Grade C",
    title: "Grade C Security Training",
    description:
      "For officers ready to take on supervisory duties and more demanding security environments.",
    info: "Covers shift supervision, control room duties, conflict handling and professional conduct.",
  },
  {
    grade: "Grade A",
    title: "Grade A Security Training",
    description:
      "The highest qualification for security professionals managing complex, high-risk operations.",
    info: "Covers strategic planning, risk management, team leadership, advanced access control and legal compliance.",
  },
];

export function Courses() {
  return (
    <section id="courses" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl md:text-4xl">
            Our Courses
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-navy">
            Training for Grades E, D, C and A — plus a bundled special. Choose the grade that
            matches where you are in your security career.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <Reveal key={c.grade}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-7 shadow-card transition-transform duration-300 hover:-translate-y-1">
                <span className="w-fit rounded-md bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                  {c.grade}
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy">{c.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.info}</p>
                <Button asChild variant="brand" size="brand" className="mt-6 w-full sm:w-auto">
                  <a href="#register">Enquire Now</a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <article className="relative overflow-hidden rounded-xl border-2 border-brand-gold bg-gradient-to-br from-brand-gold/10 to-brand-gold/5 p-8 shadow-card">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="w-fit rounded-md bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Special Offer
                </span>
                <h3 className="mt-4 text-2xl font-bold text-ink">Grades E, D & C Bundle</h3>
                <p className="mt-2 max-w-2xl text-base text-brand-navy">
                  Complete your Grade E, D and C training in one package. A cost-effective path for
                  officers who want to progress quickly through the grades.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 md:items-end">
                <span className="text-4xl font-extrabold text-brand-red">R2,300</span>
                <Button asChild variant="brand" size="brand">
                  <a href="#register">Enquire Now</a>
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
