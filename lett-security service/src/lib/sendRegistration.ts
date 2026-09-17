export interface RegistrationPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface RegistrationResult {
  success: boolean;
  error?: string;
}

/**
 * Sends a quote/registration request to the server, which relays it via
 * Resend (https://resend.com). Called from the QuoteForm submit handler.
 *
 * The actual Resend API key + send call live server-side in
 * `src/routes/api/sendRegistration.ts` — never import the `resend` package
 * or an API key into this file, since it ships to the browser.
 */
export async function sendRegistration(
  payload: RegistrationPayload,
): Promise<RegistrationResult> {
  try {
    const response = await fetch("/api/sendRegistration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return {
        success: false,
        error: body?.error ?? `Request failed with status ${response.status}`,
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}