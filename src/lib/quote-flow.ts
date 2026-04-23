export const QUOTE_FLOW_VERSION = "agw_quote_lead_capture_v2";
export const QUOTE_FORM_SESSION_STORAGE_KEY = "agw_quote_intake_form_v1";
export const QUOTE_ATTRIBUTION_SESSION_STORAGE_KEY = "agw_quote_attribution_v1";
export const QUOTE_LEAD_SOURCE = "agw_quote_flow_v1";
export const QUOTE_NOTES_MAX_LENGTH = 1200;

export type QuoteOption = {
  value: string;
  label: string;
  hint?: string;
};

export const PROJECT_TYPE_OPTIONS = [
  {
    value: "interior-painting",
    label: "Interior painting",
    hint: "Rooms, trim, stairwells, millwork, and finish-heavy interiors.",
  },
  {
    value: "exterior-painting",
    label: "Exterior painting",
    hint: "Siding, trim, shutters, masonry, and weather-exposed surfaces.",
  },
  {
    value: "cabinetry-millwork",
    label: "Cabinetry or millwork",
    hint: "Cabinets, built-ins, paneling, and detail-driven finishes.",
  },
  {
    value: "commercial-repaint",
    label: "Commercial repaint",
    hint: "Occupied properties, offices, retail, and shared facilities.",
  },
  {
    value: "coatings-fireproofing",
    label: "Specialty coatings or fireproofing",
    hint: "Floor coatings, specialty systems, and spec-led scopes.",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
    hint: "Use this when the office should route the project first.",
  },
] as const satisfies readonly QuoteOption[];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "single-family", label: "Single-family home" },
  { value: "condo-coop", label: "Condo or co-op" },
  { value: "multi-unit", label: "Apartment or multi-unit property" },
  { value: "office-retail", label: "Office or retail space" },
  { value: "facility-institutional", label: "Facility or institutional property" },
  { value: "other", label: "Other property type" },
] as const satisfies readonly QuoteOption[];

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "30-days", label: "Within 30 days" },
  { value: "60-90-days", label: "Within 60 to 90 days" },
  { value: "planning-ahead", label: "Planning ahead" },
] as const satisfies readonly QuoteOption[];

export type QuoteFormValues = {
  full_name: string;
  email: string;
  phone: string;
  town: string;
  project_type: string;
  property_type: string;
  timeline: string;
  notes: string;
};

export type QuoteFieldName = keyof QuoteFormValues;
export type QuoteFieldErrors = Partial<Record<QuoteFieldName, string>>;
export type QuoteValidationErrorType =
  | "required"
  | "format"
  | "invalid_option"
  | "length";
export type QuoteValidationErrorTypes = Partial<
  Record<QuoteFieldName, QuoteValidationErrorType>
>;

export type QuoteAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  page_url: string;
  submission_time: string;
  lead_source: string;
};

export type QuoteSubmissionPayload = QuoteFormValues & QuoteAttribution;

export type QuoteStepId =
  | "project_details"
  | "contact_details"
  | "review_submit";

export type QuoteStepDefinition = {
  id: QuoteStepId;
  label: string;
  title: string;
  description: string;
  fields: readonly QuoteFieldName[];
};

export const QUOTE_STEP_DEFINITIONS = [
  {
    id: "project_details",
    label: "Project details",
    title: "Tell us what needs to be painted.",
    description:
      "Start with the project type and property town so the office can route the request correctly.",
    fields: ["project_type", "property_type", "timeline", "town"] as const,
  },
  {
    id: "contact_details",
    label: "Contact details",
    title: "Add the contact details for follow-up.",
    description:
      "Use the name, email, and phone number the office should use when reviewing the request.",
    fields: ["full_name", "email", "phone"] as const,
  },
  {
    id: "review_submit",
    label: "Review and send",
    title: "Add notes and send the quote request.",
    description:
      "Optional notes help the office understand access, surfaces, timing, or finish concerns before follow-up.",
    fields: ["notes"] as const,
  },
] as const satisfies readonly QuoteStepDefinition[];

export const EMPTY_QUOTE_FORM_VALUES: QuoteFormValues = {
  full_name: "",
  email: "",
  phone: "",
  town: "",
  project_type: "",
  property_type: "",
  timeline: "",
  notes: "",
};

export const EMPTY_QUOTE_ATTRIBUTION: QuoteAttribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  page_url: "",
  submission_time: "",
  lead_source: QUOTE_LEAD_SOURCE,
};

const ALLOWED_PROJECT_TYPES = new Set<string>(
  PROJECT_TYPE_OPTIONS.map((option) => option.value),
);
const ALLOWED_PROPERTY_TYPES = new Set<string>(
  PROPERTY_TYPE_OPTIONS.map((option) => option.value),
);
const ALLOWED_TIMELINES = new Set<string>(
  TIMELINE_OPTIONS.map((option) => option.value),
);

export function normalizeTextInput(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeEmailInput(value: string) {
  return normalizeTextInput(value).toLowerCase();
}

export function getPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }

  return digits;
}

export function formatPhoneDisplay(value: string) {
  const digits = getPhoneDigits(value);

  if (digits.length !== 10) {
    return normalizeTextInput(value);
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function normalizePhoneInput(value: string) {
  const digits = getPhoneDigits(value);

  if (digits.length !== 10) {
    return normalizeTextInput(value);
  }

  return formatPhoneDisplay(digits);
}

export function coerceQuoteFormValues(raw: unknown): QuoteFormValues {
  const source =
    typeof raw === "object" && raw !== null
      ? (raw as Partial<Record<QuoteFieldName, unknown>>)
      : {};

  return {
    full_name: typeof source.full_name === "string" ? source.full_name : "",
    email: typeof source.email === "string" ? source.email : "",
    phone: typeof source.phone === "string" ? source.phone : "",
    town: typeof source.town === "string" ? source.town : "",
    project_type:
      typeof source.project_type === "string" ? source.project_type : "",
    property_type:
      typeof source.property_type === "string" ? source.property_type : "",
    timeline: typeof source.timeline === "string" ? source.timeline : "",
    notes: typeof source.notes === "string" ? source.notes : "",
  };
}

export function coerceQuoteAttribution(raw: unknown): QuoteAttribution {
  const source =
    typeof raw === "object" && raw !== null
      ? (raw as Partial<Record<keyof QuoteAttribution, unknown>>)
      : {};

  return {
    utm_source:
      typeof source.utm_source === "string" ? source.utm_source : "",
    utm_medium:
      typeof source.utm_medium === "string" ? source.utm_medium : "",
    utm_campaign:
      typeof source.utm_campaign === "string" ? source.utm_campaign : "",
    utm_content:
      typeof source.utm_content === "string" ? source.utm_content : "",
    utm_term: typeof source.utm_term === "string" ? source.utm_term : "",
    page_url: typeof source.page_url === "string" ? source.page_url : "",
    submission_time:
      typeof source.submission_time === "string" ? source.submission_time : "",
    lead_source:
      typeof source.lead_source === "string" && source.lead_source
        ? source.lead_source
        : QUOTE_LEAD_SOURCE,
  };
}

export function normalizeQuoteFormValues(values: QuoteFormValues): QuoteFormValues {
  return {
    full_name: normalizeTextInput(values.full_name),
    email: normalizeEmailInput(values.email),
    phone: normalizePhoneInput(values.phone),
    town: normalizeTextInput(values.town),
    project_type: normalizeTextInput(values.project_type),
    property_type: normalizeTextInput(values.property_type),
    timeline: normalizeTextInput(values.timeline),
    notes: normalizeTextInput(values.notes),
  };
}

export function normalizeQuoteAttribution(
  attribution: QuoteAttribution,
): QuoteAttribution {
  return {
    utm_source: normalizeTextInput(attribution.utm_source),
    utm_medium: normalizeTextInput(attribution.utm_medium),
    utm_campaign: normalizeTextInput(attribution.utm_campaign),
    utm_content: normalizeTextInput(attribution.utm_content),
    utm_term: normalizeTextInput(attribution.utm_term),
    page_url: attribution.page_url.trim(),
    submission_time: attribution.submission_time.trim(),
    lead_source: normalizeTextInput(attribution.lead_source) || QUOTE_LEAD_SOURCE,
  };
}

export function buildQuoteSubmissionPayload(
  values: QuoteFormValues,
  attribution: QuoteAttribution,
): QuoteSubmissionPayload {
  return {
    ...normalizeQuoteFormValues(values),
    ...normalizeQuoteAttribution(attribution),
  };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateQuoteFormValues(rawValues: QuoteFormValues) {
  const values = normalizeQuoteFormValues(rawValues);
  const errors: QuoteFieldErrors = {};
  const errorTypes: QuoteValidationErrorTypes = {};

  if (values.full_name.length === 0) {
    errors.full_name = "Enter the full name the office should use for this quote.";
    errorTypes.full_name = "required";
  } else if (values.full_name.length < 2) {
    errors.full_name = "Enter the full name the office should use for this quote.";
    errorTypes.full_name = "length";
  } else if (values.full_name.length > 80) {
    errors.full_name = "Keep the full name under 80 characters.";
    errorTypes.full_name = "length";
  }

  if (values.email.length === 0) {
    errors.email = "Enter the email address the office should use.";
    errorTypes.email = "required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
    errorTypes.email = "format";
  }

  if (values.phone.length === 0) {
    errors.phone = "Enter the phone number the office should use.";
    errorTypes.phone = "required";
  } else if (getPhoneDigits(values.phone).length !== 10) {
    errors.phone = "Enter a valid 10-digit phone number.";
    errorTypes.phone = "format";
  }

  if (values.town.length === 0) {
    errors.town = "Enter the town where the property is located.";
    errorTypes.town = "required";
  } else if (values.town.length < 2) {
    errors.town = "Enter the town where the property is located.";
    errorTypes.town = "length";
  } else if (values.town.length > 80) {
    errors.town = "Keep the town under 80 characters.";
    errorTypes.town = "length";
  }

  if (values.project_type.length === 0) {
    errors.project_type = "Choose the project type that fits this scope best.";
    errorTypes.project_type = "required";
  } else if (!ALLOWED_PROJECT_TYPES.has(values.project_type)) {
    errors.project_type = "Choose the project type that fits this scope best.";
    errorTypes.project_type = "invalid_option";
  }

  if (
    values.property_type.length > 0 &&
    !ALLOWED_PROPERTY_TYPES.has(values.property_type)
  ) {
    errors.property_type = "Choose a valid property type or leave it blank.";
    errorTypes.property_type = "invalid_option";
  }

  if (values.timeline.length > 0 && !ALLOWED_TIMELINES.has(values.timeline)) {
    errors.timeline = "Choose a valid timing option or leave it blank.";
    errorTypes.timeline = "invalid_option";
  }

  if (values.notes.length > QUOTE_NOTES_MAX_LENGTH) {
    errors.notes = `Keep project notes under ${QUOTE_NOTES_MAX_LENGTH.toLocaleString()} characters.`;
    errorTypes.notes = "length";
  }

  const invalidFields = Object.keys(errors) as QuoteFieldName[];

  return {
    values,
    errors,
    errorTypes,
    invalidFields,
    isValid: invalidFields.length === 0,
  };
}

export function validateQuoteStep(
  values: QuoteFormValues,
  fields: readonly QuoteFieldName[],
) {
  const result = validateQuoteFormValues(values);
  const stepErrors = fields.reduce<QuoteFieldErrors>((accumulator, field) => {
    if (result.errors[field]) {
      accumulator[field] = result.errors[field];
    }

    return accumulator;
  }, {});
  const stepErrorTypes = fields.reduce<QuoteValidationErrorTypes>(
    (accumulator, field) => {
      if (result.errorTypes[field]) {
        accumulator[field] = result.errorTypes[field];
      }

      return accumulator;
    },
    {},
  );
  const invalidFields = fields.filter((field) => stepErrors[field]);

  return {
    values: result.values,
    errors: stepErrors,
    errorTypes: stepErrorTypes,
    invalidFields,
    isValid: invalidFields.length === 0,
  };
}

export function captureQuoteAttribution(
  search: string,
  pageUrl: string,
): QuoteAttribution {
  const params = new URLSearchParams(search);

  return normalizeQuoteAttribution({
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    page_url: pageUrl,
    submission_time: new Date().toISOString(),
    lead_source: QUOTE_LEAD_SOURCE,
  });
}

export function getQuoteEventContext(
  values: QuoteFormValues,
  attribution: QuoteAttribution,
) {
  return {
    project_type: values.project_type || "unknown",
    property_type: values.property_type || "unknown",
    timeline: values.timeline || "unknown",
    town: values.town || "unknown",
    has_notes: values.notes.length > 0,
    lead_source: attribution.lead_source || QUOTE_LEAD_SOURCE,
    utm_source: attribution.utm_source || "",
    utm_medium: attribution.utm_medium || "",
    utm_campaign: attribution.utm_campaign || "",
    utm_content: attribution.utm_content || "",
    utm_term: attribution.utm_term || "",
  };
}

export function getOptionLabel(options: readonly QuoteOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? "Not provided";
}

export function splitFullName(value: string) {
  const parts = normalizeTextInput(value).split(" ").filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";

  return {
    first_name: firstName,
    last_name: lastName,
  };
}

export function getQuoteEnhancedConversionData(values: QuoteFormValues) {
  const normalizedValues = normalizeQuoteFormValues(values);
  const { first_name, last_name } = splitFullName(normalizedValues.full_name);

  return {
    email: normalizedValues.email,
    phone_number: getPhoneDigits(normalizedValues.phone),
    first_name,
    last_name,
    home_city: normalizedValues.town,
  };
}
