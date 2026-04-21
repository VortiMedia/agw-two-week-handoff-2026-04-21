"use client";

import Script from "next/script";
import {
  startTransition,
  useEffect,
  useId,
  useState,
} from "react";
import { TrackedLink } from "@/components/tracked-link";
import {
  EMPTY_QUOTE_FORM_VALUES,
  PROJECT_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  QUOTE_FLOW_VERSION,
  QUOTE_SESSION_STORAGE_KEY,
  QUOTE_STEP_DEFINITIONS,
  TIMELINE_OPTIONS,
  type QuoteFieldErrors,
  type QuoteFieldName,
  type QuoteFormValues,
  getOptionLabel,
  getQuoteAnalyticsPayload,
  validateQuoteStep,
} from "@/lib/quote-flow";
import { CONTACT, GHL_BOOKING_ID, GHL_BOOKING_URL } from "@/lib/site-data";

type IntakeRouteSuccess = {
  ok: true;
  values: QuoteFormValues;
  analytics: ReturnType<typeof getQuoteAnalyticsPayload>;
  handoff: {
    provider: string;
    bookingId: string;
    bookingUrl: string;
    scriptUrl: string;
  };
};

type IntakeRouteFailure = {
  ok: false;
  message?: string;
  errors?: QuoteFieldErrors;
  invalidFields?: QuoteFieldName[];
  values?: QuoteFormValues;
};

function mergeErrors(
  currentErrors: QuoteFieldErrors,
  nextErrors: QuoteFieldErrors,
  fieldsToClear: readonly QuoteFieldName[],
) {
  const mergedErrors = { ...currentErrors };

  for (const field of fieldsToClear) {
    delete mergedErrors[field];
  }

  for (const [field, message] of Object.entries(nextErrors) as [
    QuoteFieldName,
    string | undefined,
  ][]) {
    if (message) {
      mergedErrors[field] = message;
    }
  }

  return mergedErrors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-[#9c2f2f]">{message}</p>;
}

function InputLabel({
  htmlFor,
  label,
  hint,
}: {
  htmlFor: string;
  label: string;
  hint?: string;
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="text-sm font-semibold text-[var(--color-ink)]">{label}</span>
      {hint ? <span className="mt-1 block text-xs text-[var(--color-text-soft)]">{hint}</span> : null}
    </label>
  );
}

function pushQuoteEvent(eventName: string, detail: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") {
    return;
  }

  const scopedWindow = window as Window & {
    agwPushEvent?: (eventName: string, detail?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };
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

export function QuoteIntakeFlow() {
  const [formValues, setFormValues] = useState<QuoteFormValues>(EMPTY_QUOTE_FORM_VALUES);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validatedValues, setValidatedValues] = useState<QuoteFormValues | null>(null);
  const [calendarScriptUrl, setCalendarScriptUrl] = useState("");
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const iframeId = `${GHL_BOOKING_ID}_${useId().replace(/[:]/g, "")}`;
  const currentStep = QUOTE_STEP_DEFINITIONS[activeStepIndex];
  const completedStepCount = activeStepIndex;
  const finalStepIndex = QUOTE_STEP_DEFINITIONS.length - 1;
  const handoffSummary = validatedValues ?? formValues;
  const projectTypeLabel = getOptionLabel(PROJECT_TYPE_OPTIONS, handoffSummary.projectType);
  const propertyTypeLabel = getOptionLabel(PROPERTY_TYPE_OPTIONS, handoffSummary.propertyType);
  const timelineLabel = getOptionLabel(TIMELINE_OPTIONS, handoffSummary.timeline);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = window.sessionStorage.getItem(QUOTE_SESSION_STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<QuoteFormValues>;
      setFormValues((currentValues) => ({
        ...currentValues,
        ...EMPTY_QUOTE_FORM_VALUES,
        ...parsed,
      }));
    } catch {
      window.sessionStorage.removeItem(QUOTE_SESSION_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(QUOTE_SESSION_STORAGE_KEY, JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    pushQuoteEvent("quote_step_view", {
      quote_step_id: currentStep.id,
      quote_step_index: activeStepIndex + 1,
      quote_step_name: currentStep.label,
      quote_step_total: QUOTE_STEP_DEFINITIONS.length,
    });
  }, [activeStepIndex, currentStep.id, currentStep.label]);

  function updateField(field: QuoteFieldName, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setSubmissionError("");
  }

  function handleBack() {
    setSubmissionError("");
    startTransition(() => {
      setActiveStepIndex((currentValue) => Math.max(currentValue - 1, 0));
    });
  }

  function pushValidationError(stepFields: readonly QuoteFieldName[], invalidFields: readonly QuoteFieldName[]) {
    pushQuoteEvent("quote_validation_error", {
      quote_step_id: currentStep.id,
      quote_step_index: activeStepIndex + 1,
      quote_error_fields: invalidFields.join("|"),
      quote_error_count: invalidFields.length,
      quote_step_field_count: stepFields.length,
    });
  }

  async function handleContinue() {
    if (currentStep.id === "booking") {
      return;
    }

    const stepResult = validateQuoteStep(formValues, currentStep.fields);
    setFormValues(stepResult.values);

    if (!stepResult.isValid) {
      setErrors((currentErrors) => mergeErrors(currentErrors, stepResult.errors, currentStep.fields));
      pushValidationError(currentStep.fields, stepResult.invalidFields);
      return;
    }

    setErrors((currentErrors) => mergeErrors(currentErrors, {}, currentStep.fields));

    if (currentStep.id !== "details") {
      pushQuoteEvent("quote_step_complete", {
        quote_step_id: currentStep.id,
        quote_step_index: activeStepIndex + 1,
        quote_step_name: currentStep.label,
        ...getQuoteAnalyticsPayload(stepResult.values),
      });

      startTransition(() => {
        setActiveStepIndex((currentValue) => Math.min(currentValue + 1, finalStepIndex));
      });

      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const response = await fetch("/api/quote-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stepResult.values),
      });
      const payload = (await response.json()) as IntakeRouteSuccess | IntakeRouteFailure;

      if (!response.ok || !payload.ok) {
        const failurePayload = payload as IntakeRouteFailure;
        const invalidFields = failurePayload.invalidFields ?? [];

        if (failurePayload.values) {
          setFormValues(failurePayload.values);
        }

        if (failurePayload.errors) {
          setErrors((currentErrors) =>
            mergeErrors(currentErrors, failurePayload.errors ?? {}, QUOTE_STEP_DEFINITIONS.flatMap((step) => step.fields)),
          );
        }

        setSubmissionError(
          failurePayload.message ??
            "The quote details could not be validated yet. Review the fields and try again.",
        );
        pushValidationError(currentStep.fields, invalidFields);
        return;
      }

      setFormValues(payload.values);
      setValidatedValues(payload.values);
      setCalendarScriptUrl(payload.handoff.scriptUrl);
      pushQuoteEvent("quote_step_complete", {
        quote_step_id: currentStep.id,
        quote_step_index: activeStepIndex + 1,
        quote_step_name: currentStep.label,
        ...payload.analytics,
      });
      pushQuoteEvent("quote_handoff_to_calendar", {
        quote_handoff_target: "ghl_calendar_embed",
        quote_calendar_provider: payload.handoff.provider,
        quote_calendar_booking_id: payload.handoff.bookingId,
        ...payload.analytics,
      });

      startTransition(() => {
        setActiveStepIndex(finalStepIndex);
      });
    } catch {
      setSubmissionError(
        "The intake check could not reach the server. Use the direct booking link below if you need to keep moving.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCalendarLoad() {
    if (calendarLoaded) {
      return;
    }

    setCalendarLoaded(true);
    pushQuoteEvent("quote_calendar_loaded", {
      quote_handoff_target: "ghl_calendar_embed",
      quote_calendar_booking_id: GHL_BOOKING_ID,
    });
  }

  return (
    <section
      id="quote-booking-flow"
      className="rounded-[2rem] border border-[rgba(16,36,58,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,244,237,0.96))] p-4 shadow-[0_28px_90px_rgba(16,36,58,0.14)] sm:p-6 lg:p-7"
    >
      <div className="rounded-[1.6rem] border border-[var(--color-line)] bg-[rgba(255,255,255,0.84)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
              Quote intake
            </p>
            <h2 className="mt-2 text-[clamp(1.45rem,2.4vw,2rem)] font-semibold leading-tight text-[var(--color-ink)]">
              {currentStep.title}
            </h2>
          </div>
          <span className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Step {activeStepIndex + 1} of {QUOTE_STEP_DEFINITIONS.length}
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
          {currentStep.description}
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {QUOTE_STEP_DEFINITIONS.map((step, index) => {
            const status =
              index < completedStepCount ? "complete" : index === activeStepIndex ? "current" : "upcoming";

            return (
              <article
                key={step.id}
                className={`rounded-[1.25rem] border px-4 py-3 transition-colors ${
                  status === "current"
                    ? "border-[rgba(0,99,176,0.22)] bg-[rgba(0,99,176,0.08)]"
                    : status === "complete"
                      ? "border-[rgba(16,36,58,0.08)] bg-[rgba(16,36,58,0.06)]"
                      : "border-[var(--color-line)] bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${
                      status === "current"
                        ? "bg-[var(--color-primary)] text-white"
                        : status === "complete"
                          ? "bg-[var(--color-ink)] text-white"
                          : "border border-[var(--color-line)] bg-[rgba(249,248,242,0.88)] text-[var(--color-text-soft)]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">{step.label}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                      {status === "current"
                        ? "In progress"
                        : status === "complete"
                          ? "Complete"
                          : "Coming up"}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {submissionError ? (
        <div className="mt-5 rounded-[1.35rem] border border-[rgba(156,47,47,0.22)] bg-[rgba(255,240,240,0.84)] px-4 py-3 text-sm leading-6 text-[#7e2323]">
          {submissionError}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4">
        {currentStep.id === "contact" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4 md:col-span-2">
              <InputLabel
                htmlFor="quote-name"
                label="Full name"
                hint="Use the name the office should reference if they need to follow up before booking."
              />
              <input
                id="quote-name"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="name"
                autoComplete="name"
                value={formValues.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
              <FieldError message={errors.name} />
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel htmlFor="quote-email" label="Email" />
              <input
                id="quote-email"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={formValues.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
              <FieldError message={errors.email} />
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-phone"
                label="Phone"
                hint="Used only if the office needs to clarify scope or booking details."
              />
              <input
                id="quote-phone"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                value={formValues.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
              <FieldError message={errors.phone} />
            </div>
          </div>
        ) : null}

        {currentStep.id === "project" ? (
          <div className="grid gap-4">
            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-town"
                label="Town"
                hint="This keeps the quote routed to the right local team without sending exact address data into analytics."
              />
              <input
                id="quote-town"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="town"
                autoComplete="address-level2"
                value={formValues.town}
                onChange={(event) => updateField("town", event.target.value)}
              />
              <FieldError message={errors.town} />
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-project-type"
                label="Project type"
                hint="Choose the closest fit so the final calendar step opens with cleaner expectations."
              />
              <select
                id="quote-project-type"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="projectType"
                value={formValues.projectType}
                onChange={(event) => updateField("projectType", event.target.value)}
              >
                <option value="">Choose a project type</option>
                {PROJECT_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.projectType} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {PROPERTY_TYPE_OPTIONS.map((option) => {
                const checked = formValues.propertyType === option.value;

                return (
                  <label
                    key={option.value}
                    className={`rounded-[1.35rem] border p-4 transition-colors ${
                      checked
                        ? "border-[rgba(0,99,176,0.26)] bg-[rgba(0,99,176,0.08)]"
                        : "border-[var(--color-line)] bg-white"
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="propertyType"
                      value={option.value}
                      checked={checked}
                      onChange={(event) => updateField("propertyType", event.target.value)}
                    />
                    <span className="text-sm font-semibold text-[var(--color-ink)]">{option.label}</span>
                  </label>
                );
              })}
            </div>
            <FieldError message={errors.propertyType} />
          </div>
        ) : null}

        {currentStep.id === "details" ? (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              {TIMELINE_OPTIONS.map((option) => {
                const checked = formValues.timeline === option.value;

                return (
                  <label
                    key={option.value}
                    className={`rounded-[1.35rem] border p-4 transition-colors ${
                      checked
                        ? "border-[rgba(16,36,58,0.18)] bg-[rgba(16,36,58,0.07)]"
                        : "border-[var(--color-line)] bg-white"
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="timeline"
                      value={option.value}
                      checked={checked}
                      onChange={(event) => updateField("timeline", event.target.value)}
                    />
                    <span className="text-sm font-semibold text-[var(--color-ink)]">{option.label}</span>
                  </label>
                );
              })}
            </div>
            <FieldError message={errors.timeline} />

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-notes"
                label="Project notes"
                hint="Optional. Add surfaces, access concerns, finish expectations, or anything the estimator should know before the appointment."
              />
              <textarea
                id="quote-notes"
                className="mt-3 min-h-36 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="notes"
                value={formValues.notes}
                onChange={(event) => updateField("notes", event.target.value)}
              />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-[var(--color-text-soft)]">
                <span>Optional, but useful for odd access, coatings, or finish-sensitive rooms.</span>
                <span>{formValues.notes.trim().length}/1200</span>
              </div>
              <FieldError message={errors.notes} />
            </div>
          </div>
        ) : null}

        {currentStep.id === "booking" ? (
          <div className="grid gap-5">
            <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
              <article className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-5">
                <p className="ui-heading text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  Intake summary
                </p>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--color-text-soft)]">
                  <p>
                    <strong className="text-[var(--color-ink)]">Name:</strong> {handoffSummary.name}
                  </p>
                  <p>
                    <strong className="text-[var(--color-ink)]">Email:</strong> {handoffSummary.email}
                  </p>
                  <p>
                    <strong className="text-[var(--color-ink)]">Phone:</strong> {handoffSummary.phone}
                  </p>
                  <p>
                    <strong className="text-[var(--color-ink)]">Town:</strong> {handoffSummary.town}
                  </p>
                  <p>
                    <strong className="text-[var(--color-ink)]">Project:</strong> {projectTypeLabel}
                  </p>
                  <p>
                    <strong className="text-[var(--color-ink)]">Property:</strong> {propertyTypeLabel}
                  </p>
                  <p>
                    <strong className="text-[var(--color-ink)]">Timing:</strong> {timelineLabel}
                  </p>
                  {handoffSummary.notes ? (
                    <p>
                      <strong className="text-[var(--color-ink)]">Notes:</strong> {handoffSummary.notes}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 rounded-[1.2rem] border border-[rgba(0,99,176,0.12)] bg-[rgba(0,99,176,0.06)] p-4 text-sm leading-6 text-[var(--color-text-soft)]">
                  Booking still happens through the current GHL calendar. That keeps the appointment
                  system of record and notification chain unchanged in this pass.
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="button-secondary" type="button" onClick={handleBack}>
                    Edit intake
                  </button>
                  <TrackedLink
                    className="button-primary"
                    href={GHL_BOOKING_URL}
                    rel="noreferrer"
                    target="_blank"
                    tracking={{
                      event: "quote_handoff_click",
                      location: "quote_calendar_fallback",
                      label: "Open calendar in new tab",
                      context: "quote-flow",
                    }}
                  >
                    Open calendar in new tab
                  </TrackedLink>
                </div>
              </article>

              <article className="overflow-hidden rounded-[1.45rem] border border-[var(--color-line)] bg-white p-2">
                {calendarScriptUrl ? (
                  <Script src={calendarScriptUrl} strategy="afterInteractive" />
                ) : null}
                <iframe
                  id={iframeId}
                  src={GHL_BOOKING_URL}
                  title="A.G. Williams live booking calendar"
                  className="min-h-[780px] w-full rounded-[1rem] border-none bg-[rgba(249,248,242,0.72)]"
                  scrolling="no"
                  onLoad={handleCalendarLoad}
                />
              </article>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)] pt-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-soft)]">
          <span className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 font-medium">
            Since 1906
          </span>
          <span className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 font-medium">
            Pelham office support
          </span>
          <a className="footer-link" href={CONTACT.localPhoneHref}>
            Need help first? Call {CONTACT.localPhoneLabel}
          </a>
        </div>

        {currentStep.id !== "booking" ? (
          <div className="flex flex-wrap gap-3">
            {activeStepIndex > 0 ? (
              <button className="button-secondary" type="button" onClick={handleBack}>
                Back
              </button>
            ) : null}
            <button className="button-primary" type="button" onClick={handleContinue} disabled={isSubmitting}>
              {isSubmitting
                ? "Validating..."
                : currentStep.id === "details"
                  ? "Continue to live calendar"
                  : "Continue"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
