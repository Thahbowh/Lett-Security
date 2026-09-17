import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

// Set RESEND_API_KEY in your environment (.env for local dev, your host's
// env var settings in production). Never expose it to the client — this
// file only ever runs server-side because of the `server.handlers` block.
const resend = new Resend(process.env["RESEND_API_KEY"]);

const TO_EMAIL = process.env["REGISTRATION_TO_EMAIL"];
if (!TO_EMAIL) {
  throw new Error("REGISTRATION_TO_EMAIL is not configured");
}
const FROM_EMAIL = "Lett Security Service <onboarding@resend.dev>"; // swap for a verified domain sender in Resend before going live

// Set this to your real deployed origin(s) once you have a domain, e.g.
// "https://lettsecurity.co.za". Requests with a mismatching Origin header
// are rejected — this stops other sites from POSTing to this endpoint
// using your Resend account/quota.
const ALLOWED_ORIGINS = (process.env["ALLOWED_ORIGIN"] ?? "").split(",").filter(Boolean);

const MAX_FIELD_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RegistrationBody {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

function isValidBody(body: unknown): body is RegistrationBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  const isNonEmptyBoundedString = (value: unknown) =>
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= MAX_FIELD_LENGTH;

  if (
    !isNonEmptyBoundedString(b["name"]) ||
    !isNonEmptyBoundedString(b["email"]) ||
    !isNonEmptyBoundedString(b["phone"]) ||
    !isNonEmptyBoundedString(b["service"]) ||
    !isNonEmptyBoundedString(b["message"])
  ) {
    return false;
  }

  // The client validates with zod, but this endpoint is public — anyone can
  // POST to it directly, so re-check the fields that matter server-side too.
  return EMAIL_REGEX.test((b["email"] as string).trim());
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- Minimal in-memory rate limiting -----------------------------------
// Caveat: this only works per server instance/isolate. On a serverless or
// edge platform (this project's nitro target is cloudflare) each isolate
// gets its own memory, so this is a best-effort speed bump against casual
// abuse in dev/small deployments — not a substitute for a real distributed
// limiter. For production on Cloudflare, prefer Cloudflare's own Rate
// Limiting Rules (dashboard, or a Workers rate-limiting binding), which
// enforce limits centrally regardless of how many isolates are running.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function getClientIp(request: Request): string {
  // Cloudflare sets this; fall back to standard proxy headers, then "unknown"
  // (which just means everyone without a proxy IP shares one bucket).
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

// Applied to every response from this route, success or failure.
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Cache-Control": "no-store",
};

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return Response.json(body, {
    ...init,
    headers: { ...SECURITY_HEADERS, ...(init?.headers ?? {}) },
  });
}

export const Route = createFileRoute("/api/sendRegistration")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Origin check: only enforced once you've set ALLOWED_ORIGIN, so
        // this doesn't break local dev before you've deployed anywhere.
        const origin = request.headers.get("origin");
        if (ALLOWED_ORIGINS.length > 0 && (!origin || !ALLOWED_ORIGINS.includes(origin))) {
          return jsonResponse({ error: "Origin not allowed" }, { status: 403 });
        }

        const ip = getClientIp(request);
        if (isRateLimited(ip)) {
          return jsonResponse(
            { error: "Too many requests. Please try again later." },
            { status: 429 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return jsonResponse({ error: "Invalid JSON body" }, { status: 400 });
        }

        if (!isValidBody(body)) {
          return jsonResponse(
            { error: "Missing or invalid form fields" },
            { status: 400 },
          );
        }

        const { name, email, phone, service, message } = body;

        try {
          const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: email,
            subject: `New service registration: ${service}`,
            html: `
              <h2>New Service Registration — Lett Security Service</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
              <p><strong>Service:</strong> ${escapeHtml(service)}</p>
              <p><strong>Message:</strong></p>
              <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
            `,
          });

          if (error) {
            console.error("Resend error:", error);
            return jsonResponse({ error: "Failed to send email" }, { status: 502 });
          }

          return jsonResponse({ success: true });
        } catch (err) {
          console.error("sendRegistration handler error:", err);
          return jsonResponse({ error: "Unexpected server error" }, { status: 500 });
        }
      },
    },
  },
});