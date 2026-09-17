import logo from "@/assets/lett-logo.png";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative bg-brand-gold pt-28 pb-16 sm:pt-32 md:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 md:grid-cols-2 md:gap-14">
        <div className="text-center md:text-left">
          <h1 className="text-[2rem] font-extrabold leading-[1.25] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
            Your Security Career Starts Here
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-brand-navy md:mx-0 md:text-lg">
            Professional, accredited training to get you PSIRA-certified and job-ready.
          </p>
          <Button asChild variant="brand" size="brand" className="mt-8">
            <a href="#register">Register Now</a>
          </Button>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-card sm:p-10">
          <img
            src={logo}
            alt="Lett Security Training Academy logo"
            width={1024}
            height={1024}
            className="mx-auto h-auto w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
}
