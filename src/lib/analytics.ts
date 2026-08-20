/**
 * Analytics — centralized GTM / GA4 event tracking.
 *
 * Architecture:
 * React -> dataLayer -> Google Tag Manager -> GA4 / Google Ads
 *
 * Do NOT call gtag() directly from the app.
 * GTM is the single source of truth for tag firing.
 */

export type WhatsAppLocation =
  | 'header'
  | 'hero'
  | 'product-focus'
  | 'services'
  | 'system'
  | 'process'
  | 'final-cta'
  | 'footer'
  | 'mobile-sticky';

export type AnalyticsContext =
  | 'general'
  | 'plotters'
  | 'consumables'
  | 'support'
  | 'maintenance'
  | 'equipment'
  | 'infrastructure'
  | 'printing'
  | 'security';

export interface WhatsAppClickEvent {
  location: WhatsAppLocation;
  service?: string;
  context?: AnalyticsContext;
  label?: string;
}

type ServiceClickEvent = {
  service: string;
  index: number;
};

type NavigationClickEvent = {
  target: string;
};

type FaqOpenEvent = {
  question: string;
  index: number;
};

type LeadEvent = {
  location: WhatsAppLocation;
  service?: string;
  context?: AnalyticsContext;
  label?: string;
  method: 'whatsapp';
};

type AnalyticsPayload = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Low-level dataLayer emitter.
 */
function emit(
  eventName: string,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== undefined,
    ),
  );

  window.dataLayer.push({
    event: eventName,
    ...cleanPayload,
  });
}

/**
 * WhatsApp click.
 *
 * Useful for UX analysis and funnel diagnostics.
 */
export function trackWhatsAppClick(
  payload: WhatsAppClickEvent,
): void {
  emit('whatsapp_click', {
    location: payload.location,
    service: payload.service,
    context: payload.context,
    label: payload.label,
  });

  /**
   * GA4 recommended lead event.
   *
   * In GTM:
   * - listen for "generate_lead"
   * - send it to GA4
   * - optionally fire Google Ads conversion
   */
  trackLead({
    ...payload,
    method: 'whatsapp',
  });
}

/**
 * Main commercial conversion signal.
 */
export function trackLead(
  payload: LeadEvent,
): void {
  emit('generate_lead', {
    lead_method: payload.method,
    lead_location: payload.location,
    lead_service: payload.service,
    lead_context: payload.context,
    lead_label: payload.label,
  });
}

/**
 * User opens / interacts with a service.
 */
export function trackServiceClick(
  payload: ServiceClickEvent,
): void {
  emit('service_click', {
    service: payload.service,
    service_index: payload.index,
  });
}

/**
 * Internal site navigation.
 */
export function trackNavigationClick(
  payload: NavigationClickEvent,
): void {
  emit('navigation_click', {
    navigation_target: payload.target,
  });
}

/**
 * FAQ interaction.
 */
export function trackFaqOpen(
  payload: FaqOpenEvent,
): void {
  emit('faq_open', {
    faq_question: payload.question,
    faq_index: payload.index,
  });
}