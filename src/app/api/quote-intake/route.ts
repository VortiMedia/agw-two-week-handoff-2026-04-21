import { NextResponse } from "next/server";
import {
  QUOTE_LEAD_SOURCE,
  coerceQuoteAttribution,
  coerceQuoteFormValues,
  getQuoteEnhancedConversionData,
  getQuoteEventContext,
  normalizeQuoteAttribution,
  validateQuoteFormValues,
} from "@/lib/quote-flow";

const SUPABASE_TABLE = "quote_intake_submissions";

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_KEY?.trim();
  const publishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim();
  const apiKey = serviceKey || publishableKey;

  if (!url || !apiKey) {
    return null;
  }

  return { url, apiKey };
}

function getSupabaseHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    Prefer: "return=minimal",
  };
}

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const values = coerceQuoteFormValues(rawBody);
  const attribution = coerceQuoteAttribution(rawBody);
  const result = validateQuoteFormValues(values);

  if (!result.isValid) {
    return NextResponse.json(
      {
        ok: false,
        message: "Fix the highlighted fields before sending the quote request.",
        errors: result.errors,
        error_types: result.errorTypes,
        invalid_fields: result.invalidFields,
        values: result.values,
      },
      { status: 400 },
    );
  }

  const supabase = getSupabaseConfig();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The quote request endpoint is not configured yet. Add Supabase credentials before accepting submissions.",
      },
      { status: 503 },
    );
  }

  const normalizedAttribution = {
    ...normalizeQuoteAttribution(attribution),
    lead_source: attribution.lead_source || QUOTE_LEAD_SOURCE,
    submission_time: attribution.submission_time || new Date().toISOString(),
  };

  const submissionId = crypto.randomUUID();
  const row = {
    id: submissionId,
    ...result.values,
    ...normalizedAttribution,
    intake_status: "lead_submitted",
  };

  const response = await fetch(
    `${supabase.url}/rest/v1/${SUPABASE_TABLE}`,
    {
      method: "POST",
      headers: getSupabaseHeaders(supabase.apiKey),
      body: JSON.stringify(row),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const failureText = await response.text();

    return NextResponse.json(
      {
        ok: false,
        message:
          "The quote request could not be saved yet. Try again or call the office.",
        supabase_error: failureText,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    submission_id: submissionId,
    values: result.values,
    attribution: normalizedAttribution,
    analytics: getQuoteEventContext(result.values, normalizedAttribution),
    enhanced_conversion_data: getQuoteEnhancedConversionData(result.values),
  });
}
