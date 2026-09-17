import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const benefits = [
  "PSIRA-Accredited Training (Grades E, D, C)",
  "Expert-Led Classes with Practical, Real-World Training",
  "Free Job Placement Support After You Qualify",
];

export function Overview() {
  return (
    <section id="overview" className="bg-surface py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl md:text-4xl">
          Your Career in Security Starts Here!
        </h2>
        <p className="mt-4 text-base text-brand-navy md:text-lg">
          Join Lett Security Academy — where we turn ambition into achievement!
        </p>

        <ul className="mt-10 space-y-4">
          {benefits.map((b) => (
            <li
              key={b}
              className="text-base font-semibold text-ink sm:text-lg"
            >
              <span aria-hidden="true" className="mr-2 text-brand-red">
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-base leading-relaxed text-brand-navy">
          Whether you're new or upgrading your grade, we'll equip you with the skills, confidence,
          and certification to succeed in South Africa's fast-growing security industry.
        </p>
        <p className="mt-4 text-base leading-relaxed text-brand-navy">
          Join the academy that's shaping South Africa's next generation of top-tier security
          professionals.
        </p>

        <p className="mt-8 text-lg font-bold text-ink">
          Train Today. Protect Tomorrow. Are you ready?
        </p>

        <Button asChild variant="brand" size="brand" className="mt-8 min-w-[130px]">
          <a href="#about">Read More</a>
        </Button>
      </Reveal>
    </section>
  );
}
