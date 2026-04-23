import {
  QUOTE_FLOW_VERSION,
  getQuoteEnhancedConversionData,
  getQuoteEventContext,
  type QuoteAttribution,
  type QuoteFormValues,
} from "@/lib/quote-flow";

type DataLayerWindow = Window & {
  agwPushEvent?: (name: string, payload?: Record<string, unknown>) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

export function pushQuoteEvent(
  eventName: string,
  detail: Record<string, unknown>,
) {
  if (typeof window === "undefined") {
    return;
  }

  const scopedWindow = window as DataLayerWindow;
  const payload = {
    quote_flow_version: QUOTE_FLOW_VERSION,
    ...detail,
  };

  if (typeof scopedWindow.agwPushEvent === "function") {
    scopedWindow.agwPushEvent(eventName, payload);
    return;
  }

  scopedWindow.dataLayer = scopedWindow.dataLayer || [];
  scopedWindow.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_title: document.title,
    ...payload,
  });
}

export function pushQuoteLeadSubmittedEvent({
  submissionId,
  values,
  attribution,
  sourceContext,
}: {
  submissionId: string;
  values: QuoteFormValues;
  attribution: QuoteAttribution;
  sourceContext: string;
}) {
  pushQuoteEvent("quote_lead_submitted", {
    submission_id: submissionId,
    conversion_source: "quote_intake_database",
    source_context: sourceContext,
    ...getQuoteEventContext(values, attribution),
    enhanced_conversion_data: getQuoteEnhancedConversionData(values),
  });
}
