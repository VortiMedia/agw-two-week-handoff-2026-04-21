"use client";

import Script from "next/script";
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useId,
  useState,
} from "react";
import { TrackedLink } from "@/components/tracked-link";
import {
  EMPTY_QUOTE_ATTRIBUTION,
  EMPTY_QUOTE_FORM_VALUES,
  PROJECT_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  QUOTE_ATTRIBUTION_SESSION_STORAGE_KEY,
  QUOTE_FLOW_VERSION,
  QUOTE_FORM_SESSION_STORAGE_KEY,
  QUOTE_LEAD_SOURCE,
  QUOTE_NOTES_MAX_LENGTH,
  QUOTE_STEP_DEFINITIONS,
  TIMELINE_OPTIONS,
  type QuoteAttribution,
  type QuoteFieldErrors,
  type QuoteFieldName,
  type QuoteFormValues,
  type QuoteValidationErrorType,
  captureQuoteAttribution,
  getOptionLabel,
  getQuoteEventContext,
  validateQuoteFormValues,
  validateQuoteStep,
} from "@/lib/quote-flow";
import { CONTACT, GHL_BOOKING_ID, GHL_BOOKING_URL } from "@/lib/site-data";

type QuoteIntakeSuccess = {
  ok: true;
  submission_id: string;
  values: QuoteFormValues;
  attribution: QuoteAttribution;
  handoff: {
    provider: string;
    booking_id: string;
    booking_url: string;
    script_url: string;
  };
};

type QuoteIntakeFailure = {
  ok: false;
  message?: string;
  errors?: QuoteFieldErrors;
  error_types?: Partial<Record<QuoteFieldName, QuoteValidationErrorType>>;
  invalid_fields?: QuoteFieldName[];
  values?: QuoteFormValues;
};

function FieldError({
  fieldId,
  message,
}: {
  fieldId: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={`${fieldId}-error`}
      className="mt-2 text-sm font-medium leading-6 text-[#9c2f2f]"
    >
      {message}
    </p>
  );
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
      {hint ? (
        <span className="mt-1 block text-xs leading-6 text-[var(--color-text-soft)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

function mergeErrors(
  currentErrors: QuoteFieldErrors,
  nextErrors: QuoteFieldErrors,
  fieldsToClear: readonly QuoteFieldName[],
) {
  const merged = { ...currentErrors };

  for (const field of fieldsToClear) {
    delete merged[field];
  }

  for (const [field, message] of Object.entries(nextErrors) as [
    QuoteFieldName,
    string | undefined,
  ][]) {
    if (message) {
      merged[field] = message;
    }
  }

  return merged;
}

function pushQuoteEvent(eventName: string, detail: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  const scopedWindow = window as Window & {
    agwPushEvent?: (name: string, payload?: Record<string, unknown>) => void;
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
  const [attribution, setAttribution] = useState<QuoteAttribution>(EMPTY_QUOTE_ATTRIBUTION);
  const [isAttributionReady, setIsAttributionReady] = useState(false);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [calendarScriptUrl, setCalendarScriptUrl] = useState("");
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const iframeId = `${GHL_BOOKING_ID}_${useId().replace(/[:]/g, "")}`;
  const currentStep = QUOTE_STEP_DEFINITIONS[activeStepIndex];
  const finalStepIndex = QUOTE_STEP_DEFINITIONS.length - 1;
  const summaryValues = validateQuoteFormValues(formValues).values;
  const projectTypeLabel = getOptionLabel(
    PROJECT_TYPE_OPTIONS,
    summaryValues.project_type,
  );
  const propertyTypeLabel = getOptionLabel(
    PROPERTY_TYPE_OPTIONS,
    summaryValues.property_type,
  );
  const timelineLabel = getOptionLabel(TIMELINE_OPTIONS, summaryValues.timeline);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedFormValues = window.sessionStorage.getItem(
      QUOTE_FORM_SESSION_STORAGE_KEY,
    );
    const savedAttribution = window.sessionStorage.getItem(
      QUOTE_ATTRIBUTION_SESSION_STORAGE_KEY,
    );

    if (savedFormValues) {
      try {
        setFormValues({
          ...EMPTY_QUOTE_FORM_VALUES,
          ...(JSON.parse(savedFormValues) as Partial<QuoteFormValues>),
        });
      } catch {
        window.sessionStorage.removeItem(QUOTE_FORM_SESSION_STORAGE_KEY);
      }
    }

    if (savedAttribution) {
      try {
        setAttribution({
          ...EMPTY_QUOTE_ATTRIBUTION,
          ...(JSON.parse(savedAttribution) as Partial<QuoteAttribution>),
        });
        setIsAttributionReady(true);
        return;
      } catch {
        window.sessionStorage.removeItem(QUOTE_ATTRIBUTION_SESSION_STORAGE_KEY);
      }
    }

    const capturedAttribution = captureQuoteAttribution(
      window.location.search,
      window.location.href,
    );
    setAttribution(capturedAttribution);
    setIsAttributionReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(
      QUOTE_FORM_SESSION_STORAGE_KEY,
      JSON.stringify(formValues),
    );
  }, [formValues]);

  useEffect(() => {
    if (typeof window === "undefined" || !isAttributionReady) {
      return;
    }

    window.sessionStorage.setItem(
      QUOTE_ATTRIBUTION_SESSION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  }, [attribution, isAttributionReady]);

  const trackStepView = useEffectEvent((stepName: string, stepIndex: number) => {
    pushQuoteEvent("quote_step_view", {
      step_name: stepName,
      step_index: stepIndex,
      ...getQuoteEventContext(formValues, attribution),
    });
  });

  useEffect(() => {
    if (!isAttributionReady) {
      return;
    }

    trackStepView(currentStep.id, activeStepIndex + 1);
  }, [activeStepIndex, currentStep.id, isAttributionReady]);

  function updateField(field: QuoteFieldName, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setSubmissionError("");
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function pushValidationErrors(
    invalidFields: readonly QuoteFieldName[],
    errorTypes: Partial<Record<QuoteFieldName, QuoteValidationErrorType>>,
    normalizedValues: QuoteFormValues,
  ) {
    for (const field of invalidFields) {
      pushQuoteEvent("quote_validation_error", {
        step_name: currentStep.id,
        field_name: field,
        error_type: errorTypes[field] ?? "format",
        field_value_present: normalizedValues[field].length > 0,
        ...getQuoteEventContext(normalizedValues, attribution),
      });
    }
  }

  function moveToNextStep() {
    startTransition(() => {
      setActiveStepIndex((currentValue) =>
        Math.min(currentValue + 1, finalStepIndex),
      );
    });
  }

  function moveToPreviousStep() {
    setSubmissionError("");
    startTransition(() => {
      setActiveStepIndex((currentValue) => Math.max(currentValue - 1, 0));
    });
  }

  async function handleContinue() {
    if (currentStep.id === "book_consultation") {
      return;
    }

    const stepResult = validateQuoteStep(formValues, currentStep.fields);
    setFormValues(stepResult.values);

    if (!stepResult.isValid) {
      setErrors((currentErrors) =>
        mergeErrors(currentErrors, stepResult.errors, currentStep.fields),
      );
      setSubmissionError("Fix the highlighted fields before moving to the next step.");
      pushValidationErrors(
        stepResult.invalidFields,
        stepResult.errorTypes,
        stepResult.values,
      );
      return;
    }

    setErrors((currentErrors) => mergeErrors(currentErrors, {}, currentStep.fields));
    setSubmissionError("");

    if (currentStep.id !== "project_notes") {
      pushQuoteEvent("quote_step_complete", {
        step_name: currentStep.id,
        step_index: activeStepIndex + 1,
        completed_fields: [...currentStep.fields],
        ...getQuoteEventContext(stepResult.values, attribution),
      });
      moveToNextStep();
      return;
    }

    const fullValidation = validateQuoteFormValues(stepResult.values);

    if (!fullValidation.isValid) {
      setFormValues(fullValidation.values);
      setErrors(fullValidation.errors);
      setSubmissionError(
        "The intake still has invalid values. Review the highlighted fields before booking.",
      );
      pushValidationErrors(
        fullValidation.invalidFields,
        fullValidation.errorTypes,
        fullValidation.values,
      );
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/quote-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fullValidation.values,
          ...attribution,
        }),
      });
      const payload = (await response.json()) as QuoteIntakeSuccess | QuoteIntakeFailure;

      if (!response.ok || !payload.ok) {
        const failure = payload as QuoteIntakeFailure;

        if (failure.values) {
          setFormValues(failure.values);
        }

        if (failure.errors) {
          setErrors(failure.errors);
        }

        if (failure.invalid_fields?.length) {
          pushValidationErrors(
            failure.invalid_fields,
            failure.error_types ?? {},
            failure.values ?? fullValidation.values,
          );
        }

        setSubmissionError(
          failure.message ??
            "The validated intake could not be saved yet. Review the fields and try again.",
        );
        return;
      }

      setFormValues(payload.values);
      setAttribution(payload.attribution);
      setSubmissionId(payload.submission_id);
      setCalendarScriptUrl(payload.handoff.script_url);
      setCalendarLoaded(false);

      pushQuoteEvent("quote_step_complete", {
        step_name: currentStep.id,
        step_index: activeStepIndex + 1,
        completed_fields: [...currentStep.fields],
        ...getQuoteEventContext(payload.values, payload.attribution),
      });
      pushQuoteEvent("quote_intake_saved", {
        step_name: currentStep.id,
        submission_id: payload.submission_id,
        ...getQuoteEventContext(payload.values, payload.attribution),
      });
      pushQuoteEvent("quote_handoff_to_calendar", {
        step_name: "book_consultation",
        booking_target: "ghl_embed_v1",
        submission_id: payload.submission_id,
        ...getQuoteEventContext(payload.values, payload.attribution),
      });

      moveToNextStep();
    } catch {
      setSubmissionError(
        "The validated intake could not reach the save endpoint. Try again before opening the booking calendar.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCalendarLoad() {
    if (calendarLoaded) {
      return;
    }

    setCalendarLoaded(true);

    if (submissionId) {
      void fetch("/api/quote-intake", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submission_id: submissionId,
          calendar_handoff_status: "loaded",
        }),
      }).catch(() => undefined);
    }

    pushQuoteEvent("quote_calendar_loaded", {
      step_name: "book_consultation",
      booking_target: "ghl_embed_v1",
      calendar_id: GHL_BOOKING_ID,
      submission_id: submissionId || "unknown",
      ...getQuoteEventContext(formValues, attribution),
    });
  }

  return (
    <section
      id="quote-booking-flow"
      className="rounded-[2rem] border border-[rgba(16,36,58,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,244,237,0.96))] p-4 shadow-[0_28px_90px_rgba(16,36,58,0.14)] sm:p-6 lg:p-7"
    >
      <div className="rounded-[1.6rem] border border-[var(--color-line)] bg-[rgba(255,255,255,0.84)] p-5">
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
              index < activeStepIndex
                ? "complete"
                : index === activeStepIndex
                  ? "current"
                  : "upcoming";

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
                    <p className="text-sm font-semibold text-[var(--color-ink)]">
                      {step.label}
                    </p>
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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.45rem] border border-[var(--color-line)] bg-white px-4 py-4">
        <div>
          <p className="ui-heading text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Need a real person first?
          </p>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-soft)]">
            The Pelham office stays visible if the scope needs to be clarified before a slot is booked.
          </p>
        </div>
        <TrackedLink
          className="button-secondary"
          href={CONTACT.localPhoneHref}
          tracking={{
            event: "quote_phone_click",
            location: "quote_flow_support_bar",
            label: CONTACT.localPhoneLabel,
            context: QUOTE_LEAD_SOURCE,
          }}
        >
          Call {CONTACT.localPhoneLabel}
        </TrackedLink>
      </div>

      {submissionError ? (
        <div
          className="mt-5 rounded-[1.35rem] border border-[rgba(156,47,47,0.22)] bg-[rgba(255,240,240,0.84)] px-4 py-3 text-sm leading-6 text-[#7e2323]"
          role="alert"
          aria-live="polite"
        >
          {submissionError}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4">
        {currentStep.id === "project_details" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4 md:col-span-2">
              <fieldset>
                <legend className="text-sm font-semibold text-[var(--color-ink)]">
                  Project type
                </legend>
                <p className="mt-1 text-xs leading-6 text-[var(--color-text-soft)]">
                  Required. This is the main routing field before booking.
                </p>
                <div className="mt-3 grid gap-3">
                  {PROJECT_TYPE_OPTIONS.map((option) => {
                    const isSelected = formValues.project_type === option.value;

                    return (
                      <label
                        key={option.value}
                        className={`block cursor-pointer rounded-[1rem] border px-4 py-3 transition-colors ${
                          isSelected
                            ? "border-[rgba(0,99,176,0.34)] bg-[rgba(0,99,176,0.08)]"
                            : "border-[var(--color-border)] bg-[rgba(249,248,242,0.58)]"
                        }`}
                      >
                        <input
                          className="sr-only"
                          type="radio"
                          name="project_type"
                          value={option.value}
                          checked={isSelected}
                          onChange={(event) =>
                            updateField("project_type", event.target.value)
                          }
                        />
                        <span className="text-sm font-semibold text-[var(--color-ink)]">
                          {option.label}
                        </span>
                        {option.hint ? (
                          <span className="mt-1 block text-xs leading-6 text-[var(--color-text-soft)]">
                            {option.hint}
                          </span>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
                <FieldError
                  fieldId="quote-project-type"
                  message={errors.project_type}
                />
              </fieldset>
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-town"
                label="Town"
                hint="Required. Use the town where the property is located."
              />
              <input
                id="quote-town"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="town"
                autoComplete="address-level2"
                value={formValues.town}
                onChange={(event) => updateField("town", event.target.value)}
                aria-invalid={Boolean(errors.town)}
                aria-describedby={errors.town ? "quote-town-error" : undefined}
              />
              <FieldError fieldId="quote-town" message={errors.town} />
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-property-type"
                label="Property type"
                hint="Optional, but useful for routing."
              />
              <select
                id="quote-property-type"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="property_type"
                value={formValues.property_type}
                onChange={(event) => updateField("property_type", event.target.value)}
                aria-invalid={Boolean(errors.property_type)}
                aria-describedby={
                  errors.property_type ? "quote-property-type-error" : undefined
                }
              >
                <option value="">Select a property type</option>
                {PROPERTY_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError
                fieldId="quote-property-type"
                message={errors.property_type}
              />
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4 md:col-span-2">
              <InputLabel
                htmlFor="quote-timeline"
                label="Timeline"
                hint="Optional for V1, but useful for the office before booking."
              />
              <select
                id="quote-timeline"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="timeline"
                value={formValues.timeline}
                onChange={(event) => updateField("timeline", event.target.value)}
                aria-invalid={Boolean(errors.timeline)}
                aria-describedby={errors.timeline ? "quote-timeline-error" : undefined}
              >
                <option value="">Select a timeline</option>
                {TIMELINE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError fieldId="quote-timeline" message={errors.timeline} />
            </div>
          </div>
        ) : null}

        {currentStep.id === "contact_details" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4 md:col-span-2">
              <InputLabel
                htmlFor="quote-full-name"
                label="Full name"
                hint="Required. Use the name the office should reference if they need to follow up."
              />
              <input
                id="quote-full-name"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="full_name"
                autoComplete="name"
                value={formValues.full_name}
                onChange={(event) => updateField("full_name", event.target.value)}
                aria-invalid={Boolean(errors.full_name)}
                aria-describedby={
                  errors.full_name ? "quote-full-name-error" : undefined
                }
              />
              <FieldError fieldId="quote-full-name" message={errors.full_name} />
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel htmlFor="quote-email" label="Email" hint="Required." />
              <input
                id="quote-email"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={formValues.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "quote-email-error" : undefined}
              />
              <FieldError fieldId="quote-email" message={errors.email} />
            </div>

            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-phone"
                label="Phone"
                hint="Required. US numbers are normalized before booking."
              />
              <input
                id="quote-phone"
                className="mt-3 min-h-12 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                value={formValues.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "quote-phone-error" : undefined}
              />
              <FieldError fieldId="quote-phone" message={errors.phone} />
            </div>
          </div>
        ) : null}

        {currentStep.id === "project_notes" ? (
          <div className="grid gap-4">
            <div className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-4">
              <InputLabel
                htmlFor="quote-notes"
                label="Project notes"
                hint="Optional. Add anything the office should know before the calendar opens."
              />
              <textarea
                id="quote-notes"
                className="mt-3 min-h-40 w-full rounded-[1rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.72)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
                name="notes"
                value={formValues.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                aria-invalid={Boolean(errors.notes)}
                aria-describedby={errors.notes ? "quote-notes-error" : undefined}
              />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs leading-6 text-[var(--color-text-soft)]">
                <span>Optional notes are mirrored before the booking step opens.</span>
                <span>
                  {formValues.notes.length}/{QUOTE_NOTES_MAX_LENGTH}
                </span>
              </div>
              <FieldError fieldId="quote-notes" message={errors.notes} />
            </div>

            <article className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-5">
              <p className="ui-heading text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Intake summary
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1rem] bg-[rgba(249,248,242,0.88)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                    Project type
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                    {projectTypeLabel}
                  </p>
                </div>
                <div className="rounded-[1rem] bg-[rgba(249,248,242,0.88)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                    Town
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                    {summaryValues.town || "Not provided"}
                  </p>
                </div>
                <div className="rounded-[1rem] bg-[rgba(249,248,242,0.88)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                    Contact
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                    {summaryValues.full_name || "Not provided"}
                  </p>
                  <p className="text-sm leading-6 text-[var(--color-text-soft)]">
                    {summaryValues.email || "No email"} ·{" "}
                    {summaryValues.phone || "No phone"}
                  </p>
                </div>
                <div className="rounded-[1rem] bg-[rgba(249,248,242,0.88)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                    Property and timing
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                    {propertyTypeLabel}
                  </p>
                  <p className="text-sm leading-6 text-[var(--color-text-soft)]">
                    {timelineLabel}
                  </p>
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {currentStep.id === "book_consultation" ? (
          <div className="grid gap-4">
            <article className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-5">
              <p className="ui-heading text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Intake saved
              </p>
              <h3 className="mt-3 text-[1.32rem] font-semibold leading-tight text-[var(--color-ink)]">
                The validated intake is saved. Finish with the live GHL calendar below.
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                Booking still happens in the existing GHL system of record. This page only owns the
                intake, validation, attribution capture, and handoff.
              </p>
            </article>

            <div className="overflow-hidden rounded-[1.6rem] border border-[var(--color-line)] bg-white p-2 shadow-[var(--shadow-soft)]">
              <iframe
                id={iframeId}
                title="A.G. Williams booking calendar"
                src={GHL_BOOKING_URL}
                className="min-h-[760px] w-full rounded-[1.1rem] border-0"
                scrolling="no"
                onLoad={handleCalendarLoad}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-[var(--color-line)] bg-[rgba(249,248,242,0.84)] px-4 py-4">
              <p className="text-sm leading-6 text-[var(--color-text-soft)]">
                If the inline calendar does not render in this browser, use the direct booking link.
              </p>
              <TrackedLink className="button-secondary" href={GHL_BOOKING_URL}>
                Open direct booking link
              </TrackedLink>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm leading-6 text-[var(--color-text-soft)]">
          {currentStep.id === "project_notes"
            ? "Saving the intake is the last host-controlled step before the live calendar opens."
            : "Each step validates before the flow moves forward."}
        </div>

        <div className="flex flex-wrap gap-3">
          {activeStepIndex > 0 ? (
            <button className="button-secondary" type="button" onClick={moveToPreviousStep}>
              Back
            </button>
          ) : null}

          {currentStep.id !== "book_consultation" ? (
            <button
              className="button-primary"
              type="button"
              onClick={handleContinue}
              disabled={isSaving}
            >
              {isSaving
                ? "Saving intake..."
                : currentStep.id === "project_notes"
                  ? "Save Intake and Continue"
                  : "Continue"}
            </button>
          ) : null}
        </div>
      </div>

      {activeStepIndex === finalStepIndex && calendarScriptUrl ? (
        <Script src={calendarScriptUrl} strategy="afterInteractive" />
      ) : null}

      <input type="hidden" name="lead_source" value={attribution.lead_source || QUOTE_LEAD_SOURCE} />
      <input type="hidden" name="utm_source" value={attribution.utm_source} />
      <input type="hidden" name="utm_medium" value={attribution.utm_medium} />
      <input type="hidden" name="utm_campaign" value={attribution.utm_campaign} />
      <input type="hidden" name="utm_content" value={attribution.utm_content} />
      <input type="hidden" name="utm_term" value={attribution.utm_term} />
      <input type="hidden" name="page_url" value={attribution.page_url} />
      <input type="hidden" name="submission_time" value={attribution.submission_time} />
    </section>
  );
}
