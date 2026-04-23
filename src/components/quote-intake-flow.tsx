"use client";

import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import { Button } from "@/components/agw/button";
import { TrackedLink } from "@/components/tracked-link";
import { pushQuoteEvent, pushQuoteLeadSubmittedEvent } from "@/lib/quote-analytics";
import {
  EMPTY_QUOTE_ATTRIBUTION,
  EMPTY_QUOTE_FORM_VALUES,
  PROJECT_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  QUOTE_ATTRIBUTION_SESSION_STORAGE_KEY,
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
  buildQuoteSubmissionPayload,
  captureQuoteAttribution,
  getQuoteEventContext,
  validateQuoteFormValues,
} from "@/lib/quote-flow";
import { CONTACT } from "@/lib/site-data";

type QuoteIntakeFlowProps = {
  id?: string;
  sourceContext?: string;
  initialProjectType?: QuoteFormValues["project_type"];
  compact?: boolean;
};

type QuoteIntakeSuccess = {
  ok: true;
  submission_id: string;
  values: QuoteFormValues;
  attribution: QuoteAttribution;
  enhanced_conversion_data: Record<string, string>;
};

type QuoteIntakeFailure = {
  ok: false;
  message?: string;
  errors?: QuoteFieldErrors;
  error_types?: Partial<Record<QuoteFieldName, QuoteValidationErrorType>>;
  invalid_fields?: QuoteFieldName[];
  values?: QuoteFormValues;
};

const FIELD_STEP_LOOKUP = new Map<QuoteFieldName, string>(
  QUOTE_STEP_DEFINITIONS.flatMap((step) =>
    step.fields.map((field) => [field, step.id] as const),
  ),
);

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
      className="mt-2 font-sans text-[12px] font-medium leading-5 text-agw-danger"
    >
      {message}
    </p>
  );
}

function FieldShell({
  children,
  full = false,
}: {
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
      {children}
    </div>
  );
}

function InputLabel({
  htmlFor,
  label,
}: {
  htmlFor: string;
  label: string;
}) {
  return (
    <label
      className="mb-2 block font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-agw-ink-soft"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

const fieldClassName =
  "min-h-11 w-full rounded-sm border border-agw-bone bg-agw-paper px-3.5 py-2.5 " +
  "font-sans text-[14px] text-agw-ink outline-none transition-[border-color,box-shadow] " +
  "hover:border-agw-ink-soft focus:border-agw-blue focus:shadow-[0_0_0_3px_rgba(0,99,176,0.15)]";

function TextInput({
  field,
  id,
  label,
  value,
  error,
  onChange,
  autoComplete,
  inputMode,
}: {
  field: QuoteFieldName;
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (field: QuoteFieldName, value: string) => void;
  autoComplete?: string;
  inputMode?: "email" | "tel";
}) {
  return (
    <>
      <InputLabel htmlFor={id} label={label} />
      <input
        id={id}
        className={fieldClassName}
        name={field}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(field, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <FieldError fieldId={id} message={error} />
    </>
  );
}

function SelectField({
  field,
  id,
  label,
  value,
  error,
  options,
  emptyLabel,
  onChange,
}: {
  field: QuoteFieldName;
  id: string;
  label: string;
  value: string;
  error?: string;
  options: readonly { value: string; label: string }[];
  emptyLabel: string;
  onChange: (field: QuoteFieldName, value: string) => void;
}) {
  return (
    <>
      <InputLabel htmlFor={id} label={label} />
      <select
        id={id}
        className={`${fieldClassName} cursor-pointer appearance-none bg-[right_1rem_center] bg-no-repeat pr-11`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23004B85' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
        }}
        name={field}
        value={value}
        onChange={(event) => onChange(field, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="">{emptyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError fieldId={id} message={error} />
    </>
  );
}

function ProjectTypeChips({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (field: QuoteFieldName, value: string) => void;
}) {
  return (
    <fieldset className="md:col-span-2">
      <legend className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-agw-blue">
        Project type
      </legend>
      <div className="flex flex-wrap gap-2">
        {PROJECT_TYPE_OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={[
                "cursor-pointer rounded-sm border px-3 py-1.5",
                "font-sans text-[12px] font-medium tracking-[0.005em]",
                "transition-[background-color,border-color,color,box-shadow]",
                isSelected
                  ? "border-agw-blue bg-agw-blue text-agw-ivory"
                  : "border-agw-bone bg-agw-paper text-agw-ink hover:border-agw-blue hover:text-agw-blue",
              ].join(" ")}
            >
              <input
                className="sr-only"
                type="radio"
                name="project_type"
                value={option.value}
                checked={isSelected}
                onChange={(event) => onChange("project_type", event.target.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      <FieldError fieldId="quote-project-type" message={error} />
    </fieldset>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <p className="pt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-agw-blue">
        {children}
      </p>
    </div>
  );
}

function ConfirmationState({
  submissionId,
  sourceContext,
}: {
  submissionId: string;
  sourceContext: string;
}) {
  return (
    <section
      className="rounded-md border border-agw-bone bg-agw-paper p-6 shadow-sm"
      aria-live="polite"
    >
      <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-agw-blue">
        Request sent
      </p>
      <h2 className="mt-2 font-display text-[clamp(26px,3vw,34px)] font-bold leading-[1.16] tracking-[-0.02em] text-agw-blue-ink">
        The estimate request is saved.
      </h2>
      <p className="mt-4 max-w-[54ch] font-sans text-[14px] leading-7 text-agw-ink-soft">
        The office will review the details and follow up. If timing is urgent, call the Pelham
        office and reference request{" "}
        <span className="font-semibold text-agw-blue-ink">{submissionId}</span>.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <TrackedLink
          className="button-primary"
          href={CONTACT.localPhoneHref}
          tracking={{
            event: "quote_phone_click",
            location: "quote_success",
            label: CONTACT.localPhoneLabel,
            context: sourceContext,
          }}
        >
          Call Pelham office
        </TrackedLink>
        <TrackedLink
          className="button-secondary"
          href="/"
          tracking={{
            event: "quote_success_home_click",
            location: "quote_success",
            label: "Return home",
            context: sourceContext,
          }}
        >
          Return home
        </TrackedLink>
      </div>
    </section>
  );
}

export function QuoteIntakeFlow({
  id = "quote-intake-flow",
  sourceContext = QUOTE_LEAD_SOURCE,
  initialProjectType = "",
  compact = false,
}: QuoteIntakeFlowProps) {
  const [formValues, setFormValues] = useState<QuoteFormValues>({
    ...EMPTY_QUOTE_FORM_VALUES,
    project_type: initialProjectType,
  });
  const [attribution, setAttribution] = useState<QuoteAttribution>(EMPTY_QUOTE_ATTRIBUTION);
  const [isAttributionReady, setIsAttributionReady] = useState(false);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const submissionInFlightRef = useRef(false);
  const formId = useId();

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
        const parsedValues = JSON.parse(savedFormValues) as Partial<QuoteFormValues>;
        setFormValues({
          ...EMPTY_QUOTE_FORM_VALUES,
          ...parsedValues,
          project_type: parsedValues.project_type || initialProjectType,
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
  }, [initialProjectType]);

  useEffect(() => {
    if (typeof window === "undefined" || submissionId) {
      return;
    }

    window.sessionStorage.setItem(
      QUOTE_FORM_SESSION_STORAGE_KEY,
      JSON.stringify(formValues),
    );
  }, [formValues, submissionId]);

  useEffect(() => {
    if (typeof window === "undefined" || !isAttributionReady) {
      return;
    }

    window.sessionStorage.setItem(
      QUOTE_ATTRIBUTION_SESSION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  }, [attribution, isAttributionReady]);

  const trackFormView = useEffectEvent(() => {
    pushQuoteEvent("quote_step_view", {
      step_name: "project_details",
      step_index: 1,
      source_context: sourceContext,
      ...getQuoteEventContext(formValues, attribution),
    });
  });

  useEffect(() => {
    if (!isAttributionReady || submissionId) {
      return;
    }

    trackFormView();
  }, [isAttributionReady, submissionId]);

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
        step_name: FIELD_STEP_LOOKUP.get(field) ?? "quote_form",
        field_name: field,
        error_type: errorTypes[field] ?? "format",
        field_value_present: normalizedValues[field].length > 0,
        source_context: sourceContext,
        ...getQuoteEventContext(normalizedValues, attribution),
      });
    }
  }

  async function submitLead(values: QuoteFormValues) {
    const submissionAttribution = {
      ...attribution,
      submission_time: new Date().toISOString(),
    };
    setAttribution(submissionAttribution);
    const payload = buildQuoteSubmissionPayload(values, submissionAttribution);
    const response = await fetch("/api/quote-intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return (await response.json()) as QuoteIntakeSuccess | QuoteIntakeFailure;
  }

  async function handleSubmit() {
    const fullValidation = validateQuoteFormValues(formValues);
    setFormValues(fullValidation.values);

    if (!fullValidation.isValid) {
      setErrors(fullValidation.errors);
      setSubmissionError("Review the highlighted fields before sending the request.");
      pushValidationErrors(
        fullValidation.invalidFields,
        fullValidation.errorTypes,
        fullValidation.values,
      );
      return;
    }

    if (submissionInFlightRef.current) {
      return;
    }

    submissionInFlightRef.current = true;
    setIsSaving(true);
    setSubmissionError("");

    try {
      const payload = await submitLead(fullValidation.values);

      if (!payload.ok) {
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
            "The estimate request could not be saved yet. Review the fields and try again.",
        );
        return;
      }

      setFormValues(payload.values);
      setAttribution(payload.attribution);
      setSubmissionId(payload.submission_id);
      setErrors({});

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(QUOTE_FORM_SESSION_STORAGE_KEY);
      }

      QUOTE_STEP_DEFINITIONS.forEach((step, index) => {
        pushQuoteEvent("quote_step_complete", {
          step_name: step.id,
          step_index: index + 1,
          completed_fields: [...step.fields],
          source_context: sourceContext,
          ...getQuoteEventContext(payload.values, payload.attribution),
        });
      });

      pushQuoteLeadSubmittedEvent({
        submissionId: payload.submission_id,
        values: payload.values,
        attribution: payload.attribution,
        sourceContext,
      });
    } catch {
      setSubmissionError(
        "The estimate request could not reach the office endpoint. Try again or call the Pelham office.",
      );
    } finally {
      submissionInFlightRef.current = false;
      setIsSaving(false);
    }
  }

  if (submissionId) {
    return (
      <ConfirmationState
        submissionId={submissionId}
        sourceContext={sourceContext}
      />
    );
  }

  return (
    <section
      id={id}
      className={[
        "w-full min-w-0 overflow-hidden rounded-md border border-agw-bone bg-agw-paper shadow-sm",
        compact ? "p-5" : "p-5 md:p-7",
      ].join(" ")}
    >
      <div className="mb-5 flex min-w-0 flex-wrap items-baseline justify-between gap-3 border-b border-agw-bone pb-4">
        <h2 className="font-display text-[24px] font-bold tracking-[-0.01em] text-agw-blue-ink">
          Request an <em className="italic text-agw-blue">estimate</em>
        </h2>
        <span className="font-sans text-[12px] font-medium text-agw-ink-soft">
          Office-reviewed follow-up
        </span>
      </div>

      {submissionError ? (
        <div
          className="mb-5 rounded-sm border border-[rgba(163,58,42,0.26)] bg-[rgba(163,58,42,0.08)] px-4 py-3 font-sans text-[13px] leading-6 text-agw-danger"
          role="alert"
          aria-live="polite"
        >
          {submissionError}
        </div>
      ) : null}

      <form
        className="grid min-w-0 gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        noValidate
      >
        <ProjectTypeChips
          value={formValues.project_type}
          error={errors.project_type}
          onChange={updateField}
        />

        <GroupLabel>{QUOTE_STEP_DEFINITIONS[0].label}</GroupLabel>

        <FieldShell>
          <TextInput
            field="town"
            id="quote-town"
            label="Town"
            autoComplete="address-level2"
            value={formValues.town}
            error={errors.town}
            onChange={updateField}
          />
        </FieldShell>

        <FieldShell>
          <SelectField
            field="property_type"
            id="quote-property-type"
            label="Property type"
            value={formValues.property_type}
            error={errors.property_type}
            options={PROPERTY_TYPE_OPTIONS}
            emptyLabel="Select a property type"
            onChange={updateField}
          />
        </FieldShell>

        <FieldShell full>
          <SelectField
            field="timeline"
            id="quote-timeline"
            label="Timeline"
            value={formValues.timeline}
            error={errors.timeline}
            options={TIMELINE_OPTIONS}
            emptyLabel="Select a timeline"
            onChange={updateField}
          />
        </FieldShell>

        <GroupLabel>{QUOTE_STEP_DEFINITIONS[1].label}</GroupLabel>

        <FieldShell full>
          <TextInput
            field="full_name"
            id="quote-full-name"
            label="Full name"
            autoComplete="name"
            value={formValues.full_name}
            error={errors.full_name}
            onChange={updateField}
          />
        </FieldShell>

        <FieldShell>
          <TextInput
            field="email"
            id="quote-email"
            label="Email"
            autoComplete="email"
            inputMode="email"
            value={formValues.email}
            error={errors.email}
            onChange={updateField}
          />
        </FieldShell>

        <FieldShell>
          <TextInput
            field="phone"
            id="quote-phone"
            label="Phone"
            autoComplete="tel"
            inputMode="tel"
            value={formValues.phone}
            error={errors.phone}
            onChange={updateField}
          />
        </FieldShell>

        <GroupLabel>{QUOTE_STEP_DEFINITIONS[2].label}</GroupLabel>

        <FieldShell full>
          <InputLabel htmlFor="quote-notes" label="Project notes" />
          <textarea
            id="quote-notes"
            className={`${fieldClassName} min-h-[84px] resize-y`}
            name="notes"
            value={formValues.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? "quote-notes-error" : `${formId}-notes-help`}
          />
          <div
            id={`${formId}-notes-help`}
            className="mt-2 flex items-center justify-between gap-3 font-sans text-[11px] leading-5 text-agw-ink-mute"
          >
            <span>Surfaces, access, timing, or finish details are enough.</span>
            <span>
              {formValues.notes.length}/{QUOTE_NOTES_MAX_LENGTH}
            </span>
          </div>
          <FieldError fieldId="quote-notes" message={errors.notes} />
        </FieldShell>

        <div className="md:col-span-2 mt-1 flex flex-col items-center gap-3 border-t border-agw-bone pt-5 text-center">
          <Button
            className="w-full text-[16px]"
            type="submit"
            disabled={isSaving}
            aria-describedby={`${formId}-submit-note`}
          >
            {isSaving ? "Sending request..." : "Send estimate request"}
          </Button>
          <p
            id={`${formId}-submit-note`}
            className="max-w-[52ch] font-sans text-[11px] leading-5 text-agw-ink-mute"
          >
            Submitting saves the request and sends one conversion event. Prefer a call?{" "}
            <TrackedLink
              className="font-semibold text-agw-blue hover:text-agw-blue-deep"
              href={CONTACT.localPhoneHref}
              tracking={{
                event: "quote_phone_click",
                location: "quote_form_note",
                label: CONTACT.localPhoneLabel,
                context: sourceContext,
              }}
            >
              Call {CONTACT.localPhoneLabel}
            </TrackedLink>
            .
          </p>
        </div>

        <input type="hidden" name="lead_source" value={attribution.lead_source || QUOTE_LEAD_SOURCE} />
        <input type="hidden" name="utm_source" value={attribution.utm_source} />
        <input type="hidden" name="utm_medium" value={attribution.utm_medium} />
        <input type="hidden" name="utm_campaign" value={attribution.utm_campaign} />
        <input type="hidden" name="utm_content" value={attribution.utm_content} />
        <input type="hidden" name="utm_term" value={attribution.utm_term} />
        <input type="hidden" name="page_url" value={attribution.page_url} />
        <input type="hidden" name="submission_time" value={attribution.submission_time} />
      </form>
    </section>
  );
}
