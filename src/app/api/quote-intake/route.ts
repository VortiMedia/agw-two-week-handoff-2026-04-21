import { NextResponse } from "next/server";
import {
  QUOTE_LEAD_SOURCE,
  coerceQuoteAttribution,
  coerceQuoteFormValues,
  getQuoteEventContext,
  normalizeQuoteAttribution,
  validateQuoteFormValues,
} from "@/lib/quote-flow";
import {
  GHL_BOOKING_ID,
  GHL_BOOKING_SCRIPT_URL,
  GHL_BOOKING_URL,
} from "@/lib/site-data";

const SUPABASE_TABLE = "quote_intake_submissions";

type SupabaseInsertRow = {
  id?: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_KEY?.trim();

  if (!url || !serviceKey) {
    return null;
  }

  return { url, serviceKey };
}

function getSupabaseHeaders(serviceKey: string, prefer: string) {
  return {
    "Content-Type": "application/json",
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    Prefer: prefer,
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
        message: "Fix the highlighted fields before the calendar step opens.",
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
          "The mirror-save endpoint is not configured yet. Add Supabase credentials before using the calendar handoff.",
      },
      { status: 503 },
    );
  }

  const normalizedAttribution = {
    ...normalizeQuoteAttribution(attribution),
    lead_source: attribution.lead_source || QUOTE_LEAD_SOURCE,
  };

  const row = {
    ...result.values,
    ...normalizedAttribution,
    calendar_handoff_status: "pending",
    intake_status: "intake_completed",
    booking_target: "ghl_embed_v1",
    ghl_booking_id: GHL_BOOKING_ID,
    ghl_booking_url: GHL_BOOKING_URL,
  };

  const response = await fetch(
    `${supabase.url}/rest/v1/${SUPABASE_TABLE}`,
    {
      method: "POST",
      headers: getSupabaseHeaders(supabase.serviceKey, "return=representation"),
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
          "The validated intake could not be mirrored yet. Try again before opening the booking calendar.",
        supabase_error: failureText,
      },
      { status: 502 },
    );
  }

  const insertedRows = (await response.json()) as SupabaseInsertRow[];
  const submissionId = insertedRows[0]?.id;

  if (!submissionId) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The intake mirror save did not return a submission id, so the calendar handoff stayed blocked.",
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
    handoff: {
      provider: "gohighlevel",
      booking_id: GHL_BOOKING_ID,
      booking_url: GHL_BOOKING_URL,
      script_url: GHL_BOOKING_SCRIPT_URL,
    },
  });
}

export async function PATCH(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const source =
    typeof rawBody === "object" && rawBody !== null
      ? (rawBody as Partial<Record<"submission_id" | "calendar_handoff_status", unknown>>)
      : {};

  const submissionId =
    typeof source.submission_id === "string" ? source.submission_id.trim() : "";
  const calendarHandoffStatus =
    typeof source.calendar_handoff_status === "string"
      ? source.calendar_handoff_status.trim()
      : "";

  if (!submissionId || calendarHandoffStatus !== "loaded") {
    return NextResponse.json(
      {
        ok: false,
        message: "A valid submission id and the loaded status are required.",
      },
      { status: 400 },
    );
  }

  const supabase = getSupabaseConfig();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message: "The mirror-save endpoint is not configured yet.",
      },
      { status: 503 },
    );
  }

  const response = await fetch(
    `${supabase.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(submissionId)}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(supabase.serviceKey, "return=representation"),
      body: JSON.stringify({
        calendar_handoff_status: "loaded",
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const failureText = await response.text();

    return NextResponse.json(
      {
        ok: false,
        message: "The calendar load status could not be mirrored.",
        supabase_error: failureText,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    submission_id: submissionId,
    calendar_handoff_status: "loaded",
  });
}
