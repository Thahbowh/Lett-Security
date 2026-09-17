import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { sendRegistration } from "@/lib/sendRegistration"; // CHANGED: new import

// Keep this in sync with the `services` list in the site's index route.
const SERVICES = [
  "Armed and Unarmed Guarding",
  "Commercial Security",
  "Event Security",
  "Access Control",
  "Patrol and Escort Services",
  "24/7 Response",
  "Other / Not sure yet",
] as const;

const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+()\s-]+$/, "Enter a valid phone number"),
  service: z
    .string()
    .min(1, "Please select a service"),
  message: z
    .string()
    .trim()
    .min(5, "Tell us a little about what you need protected (5+ characters)"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;
type FieldErrors = Partial<Record<keyof RegistrationFormValues, string>>;

const EMPTY_FORM: RegistrationFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export function RegistrationForm() {
  const [values, setValues] = useState<RegistrationFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField =
    (field: keyof RegistrationFormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear the field's error as soon as the user edits it again.
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = registrationSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegistrationFormValues | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    setErrors({});

    const response = await sendRegistration(result.data);

    setSubmitting(false);

    if (response.success) {
      toast.success("Registration received! Our team will contact you shortly.");
      setValues(EMPTY_FORM);
    } else {
      toast.error(response.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-name" className="text-sm font-medium text-foreground">
              Full name
            </label>
            <input
              id="reg-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              onChange={updateField("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "reg-name-error" : undefined}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.name && (
              <p id="reg-name-error" className="text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-email" className="text-sm font-medium text-foreground">
              Email address
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={updateField("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "reg-email-error" : undefined}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.email && (
              <p id="reg-email-error" className="text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-phone" className="text-sm font-medium text-foreground">
              Phone number
            </label>
            <input
              id="reg-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Your phone number"
              value={values.phone}
              onChange={updateField("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "reg-phone-error" : undefined}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.phone && (
              <p id="reg-phone-error" className="text-xs text-destructive">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-service" className="text-sm font-medium text-foreground">
              Service required
            </label>
            <select
              id="reg-service"
              name="service"
              value={values.service}
              onChange={updateField("service")}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "reg-service-error" : undefined}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="reg-service-error" className="text-xs text-destructive">
                {errors.service}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-message" className="text-sm font-medium text-foreground">
            What do you need protected?
          </label>
          <textarea
            id="reg-message"
            name="message"
            rows={4}
            placeholder="Property type, address, and any specific security requirements..."
            value={values.message}
            onChange={updateField("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "reg-message-error" : undefined}
            className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.message && (
            <p id="reg-message-error" className="text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "Submitting..." : "Request Security Service"}
        </Button>
      </form>
    </Reveal>
  );
}