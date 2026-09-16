declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GADS_CONVERSION_ID = import.meta.env.VITE_GADS_CONVERSION_ID as string | undefined;
const GADS_LEAD_FORM_LABEL = import.meta.env.VITE_GADS_LEAD_FORM_LABEL as string | undefined;
const GADS_PHONE_CLICK_LABEL = import.meta.env.VITE_GADS_PHONE_CLICK_LABEL as string | undefined;
const GADS_WHATSAPP_CLICK_LABEL = import.meta.env.VITE_GADS_WHATSAPP_CLICK_LABEL as string | undefined;

function gtagEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

function gadsConversion(label: string | undefined, params: Record<string, unknown> = {}) {
  if (!GADS_CONVERSION_ID || !label) return;
  gtagEvent('conversion', { send_to: `${GADS_CONVERSION_ID}/${label}`, ...params });
}

export function trackEstimationSubmitted(serviceType: string, estimatedPrice: string) {
  gtagEvent('generate_lead', {
    event_category: 'estimation_wizard',
    service_type: serviceType,
    value_label: estimatedPrice,
  });
  gadsConversion(GADS_LEAD_FORM_LABEL);
}

export function trackPhoneClick(source: string) {
  gtagEvent('phone_click', { event_category: 'contact', source });
  gadsConversion(GADS_PHONE_CLICK_LABEL);
}

export function trackWhatsappClick(source: string) {
  gtagEvent('whatsapp_click', { event_category: 'contact', source });
  gadsConversion(GADS_WHATSAPP_CLICK_LABEL);
}
