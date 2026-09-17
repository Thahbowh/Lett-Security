import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+()\s-]+$/, "Phone number may only contain digits and + ( ) -"),
  idNumber: z
    .string()
    .trim()
    .min(6, "Please enter your ID number")
    .max(20, "ID number is too long"),
  course: z.enum(
    ["Grade E", "Grade D", "Grade C", "Grade A", "Special: Grades E, D & C (R2300)"],
    {
      errorMap: () => ({ message: "Please select a course" }),
    }
  ),
  contactMethod: z.enum(["Phone", "Email", "WhatsApp"], {
    errorMap: () => ({ message: "Please select a contact method" }),
  }),
  message: z.string().trim().max(1000, "Message must be under 1000 characters"),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

type FormState = Record<keyof FormValues, string>;

const empty: FormState = {
  fullName: "",
  email: "",
  phone: "",
  idNumber: "",
  course: "",
  contactMethod: "",
  message: "",
};

const fieldClass =
  "mt-2 w-full rounded-md border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-brand-red focus-visible:ring-2 focus-visible:ring-brand-red/30";

export function RegistrationForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setValues(empty);
    setErrors({});
    toast.success("Thank you! Your registration details have been captured.");
  };

  const err = (key: keyof FormValues) =>
    errors[key] ? (
      <p id={`${key}-error`} role="alert" className="mt-1 text-sm text-brand-red">
        {errors[key]}
      </p>
    ) : null;

  const aria = (key: keyof FormValues) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <section id="register" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl md:text-4xl">
            Register
          </h2>
          <p className="mt-4 text-base text-brand-navy">
            Complete the form below and our team will guide you through the next steps.
          </p>
        </Reveal>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-10 rounded-xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="text-sm font-semibold text-ink">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                autoComplete="name"
                className={fieldClass}
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                {...aria("fullName")}
              />
              {err("fullName")}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-ink">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={fieldClass}
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                {...aria("email")}
              />
              {err("email")}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-semibold text-ink">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                {...aria("phone")}
              />
              {err("phone")}
            </div>

            <div>
              <label htmlFor="idNumber" className="text-sm font-semibold text-ink">
                ID Number
              </label>
              <input
                id="idNumber"
                name="idNumber"
                inputMode="numeric"
                className={fieldClass}
                value={values.idNumber}
                onChange={(e) => set("idNumber", e.target.value)}
                {...aria("idNumber")}
              />
              {err("idNumber")}
            </div>

            <div>
              <label htmlFor="course" className="text-sm font-semibold text-ink">
                Select Course
              </label>
              <select
                id="course"
                name="course"
                className={fieldClass}
                value={values.course}
                onChange={(e) => set("course", e.target.value)}
                {...aria("course")}
              >
                <option value="">Choose a grade</option>
                <option value="Grade E">Grade E</option>
                <option value="Grade D">Grade D</option>
                <option value="Grade C">Grade C</option>
                <option value="Grade A">Grade A</option>
                <option value="Special: Grades E, D & C (R2300)">Special: Grades E, D & C (R2300)</option>
              </select>
              {err("course")}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contactMethod" className="text-sm font-semibold text-ink">
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                className={fieldClass}
                value={values.contactMethod}
                onChange={(e) => set("contactMethod", e.target.value)}
                {...aria("contactMethod")}
              >
                <option value="">Choose an option</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
              {err("contactMethod")}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="text-sm font-semibold text-ink">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={fieldClass}
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                {...aria("message")}
              />
              {err("message")}
            </div>
          </div>

          <Button type="submit" variant="brand" size="brand" className="mt-8 w-full sm:w-auto">
            Submit Registration
          </Button>
        </form>
      </div>
    </section>
  );
}
