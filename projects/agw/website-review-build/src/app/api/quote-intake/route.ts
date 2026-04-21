import { NextResponse } from "next/server";
import {
  coerceQuoteFormValues,
  getQuoteAnalyticsPayload,
  validateQuoteFormValues,
} from "@/lib/quote-flow";
import { GHL_BOOKING_ID, GHL_BOOKING_SCRIPT_URL, GHL_BOOKING_URL } from "@/lib/site-data";

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const payload = coerceQuoteFormValues(rawBody);
  const result = validateQuoteFormValues(payload);

  if (!result.isValid) {
    return NextResponse.json(
      {
        ok: false,
        message: "Fix the highlighted fields before opening the live booking calendar.",
        errors: result.errors,
        invalidFields: result.invalidFields,
        values: result.values,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    values: result.values,
    analytics: getQuoteAnalyticsPayload(result.values),
    handoff: {
      provider: "gohighlevel",
      bookingId: GHL_BOOKING_ID,
      bookingUrl: GHL_BOOKING_URL,
      scriptUrl: GHL_BOOKING_SCRIPT_URL,
    },
  });
}
