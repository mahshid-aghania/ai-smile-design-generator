/**
 * Analytics event hooks.
 *
 * Fires to whichever analytics layer is present (dataLayer / gtag / Vercel Analytics)
 * and no-ops safely when none is configured. Keeps call-tracking and funnel events in
 * one place so a provider can be swapped without touching UI code.
 */

export type AnalyticsEvent =
  | "call_click"
  | "wizard_step_complete"
  | "wizard_start"
  | "preview_generate_start"
  | "preview_generate_success"
  | "preview_generate_error"
  | "photo_selected"
  | "scroll_to_wizard";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  va?: (event: string, name: string, data?: AnalyticsPayload) => void;
};

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const w = window as GtagWindow;
  const data = { event, ...payload };

  try {
    w.dataLayer?.push(data);
    w.gtag?.("event", event, payload);
    w.va?.("event", event, payload);
  } catch {
    // Analytics must never break the page.
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[v0] analytics:", event, payload);
  }
}
