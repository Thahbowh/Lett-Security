import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl md:text-4xl">
            About Us
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-navy">
            Lett Security Academy provides professional security training designed to prepare
            learners for careers in the South African security industry. Our programmes cover
            Grades E, D and C, giving every learner a clear path from entry level through to
            supervisory responsibility.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-navy">
            Training is geared towards PSIRA-related career preparation, so learners understand the
            standards and conduct expected of a registered security officer. Classes combine
            classroom learning with practical, hands-on exercises that reflect real working
            conditions on site.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-navy">
            We place equal weight on professional development — communication, discipline,
            reporting and teamwork — so that qualifying learners leave job-ready and confident in
            the duties an employer will expect of them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
