export const QUOTE_FLOW_VERSION = "custom_quote_flow_v1";
export const QUOTE_SESSION_STORAGE_KEY = "agw_quote_intake_v1";

export type QuoteOption = {
  value: string;
  label: string;
  hint?: string;
};

export const PROJECT_TYPE_OPTIONS = [
  {
    value: "interior-painting",
    label: "Interior painting",
    hint: "Rooms, trim, stairwells, millwork, or finish-heavy interiors.",
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
    hint: "Floor coatings, specialty systems, or specification-led scopes.",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
    hint: "Use this if the office should route the project first.",
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
  name: string;
  email: string;
  phone: string;
  town: string;
  projectType: string;
  propertyType: string;
  timeline: string;
  notes: string;
};

export type QuoteFieldName = keyof QuoteFormValues;
export type QuoteFieldErrors = Partial<Record<QuoteFieldName, string>>;

export type QuoteStepDefinition = {
  id: "contact" | "project" | "details" | "booking";
  label: string;
  title: string;
  description: string;
  fields: readonly QuoteFieldName[];
};

export const QUOTE_STEP_DEFINITIONS = [
  {
    id: "contact",
    label: "Contact",
    title: "Start with the contact details the office needs first.",
    description: "This keeps the next step clean and prevents weak leads from spilling into booking.",
    fields: ["name", "email", "phone"] as const,
  },
  {
    id: "project",
    label: "Project",
    title: "Route the property into the right quote lane.",
    description:
      "Residential walkthroughs and commercial consultations should not enter the same lane blind.",
    fields: ["town", "projectType", "propertyType"] as const,
  },
  {
    id: "details",
    label: "Timing",
    title: "Set timing and context before the calendar opens.",
    description:
      "This final intake pass validates the handoff before the live GHL booking step is shown.",
    fields: ["timeline", "notes"] as const,
  },
  {
    id: "booking",
    label: "Booking",
    title: "Pick the live booking slot that works.",
    description:
      "The appointment is still booked through the current GHL calendar so the office workflow stays intact.",
    fields: [] as const,
  },
] as const satisfies readonly QuoteStepDefinition[];

export const EMPTY_QUOTE_FORM_VALUES: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  town: "",
  projectType: "",
  propertyType: "",
  timeline: "",
  notes: "",
};

const ALLOWED_PROJECT_TYPES = new Set<string>(PROJECT_TYPE_OPTIONS.map((option) => option.value));
const ALLOWED_PROPERTY_TYPES = new Set<string>(PROPERTY_TYPE_OPTIONS.map((option) => option.value));
const ALLOWED_TIMELINES = new Set<string>(TIMELINE_OPTIONS.map((option) => option.value));

export function normalizeTextInput(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeEmailInput(value: string) {
  return normalizeTextInput(value).toLowerCase();
}

export function normalizePhoneInput(value: string) {
  const digits = value.replace(/\D/g, "");
  const normalizedDigits =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (normalizedDigits.length !== 10) {
    return normalizeTextInput(value);
  }

  return `(${normalizedDigits.slice(0, 3)}) ${normalizedDigits.slice(3, 6)}-${normalizedDigits.slice(6)}`;
}

export function getPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }

  return digits;
}

export function coerceQuoteFormValues(raw: unknown): QuoteFormValues {
  const source =
    typeof raw === "object" && raw !== null ? (raw as Partial<Record<QuoteFieldName, unknown>>) : {};

  return {
    name: typeof source.name === "string" ? source.name : "",
    email: typeof source.email === "string" ? source.email : "",
    phone: typeof source.phone === "string" ? source.phone : "",
    town: typeof source.town === "string" ? source.town : "",
    projectType: typeof source.projectType === "string" ? source.projectType : "",
    propertyType: typeof source.propertyType === "string" ? source.propertyType : "",
    timeline: typeof source.timeline === "string" ? source.timeline : "",
    notes: typeof source.notes === "string" ? source.notes : "",
  };
}

export function normalizeQuoteFormValues(values: QuoteFormValues): QuoteFormValues {
  return {
    name: normalizeTextInput(values.name),
    email: normalizeEmailInput(values.email),
    phone: normalizePhoneInput(values.phone),
    town: normalizeTextInput(values.town),
    projectType: normalizeTextInput(values.projectType),
    propertyType: normalizeTextInput(values.propertyType),
    timeline: normalizeTextInput(values.timeline),
    notes: normalizeTextInput(values.notes),
  };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateQuoteFormValues(rawValues: QuoteFormValues) {
  const values = normalizeQuoteFormValues(rawValues);
  const errors: QuoteFieldErrors = {};

  if (values.name.length < 2) {
    errors.name = "Enter the full name the office should use for this quote.";
  } else if (values.name.length > 80) {
    errors.name = "Keep the name under 80 characters.";
  }

  if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (getPhoneDigits(values.phone).length !== 10) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (values.town.length < 2) {
    errors.town = "Enter the town where the property is located.";
  } else if (values.town.length > 80) {
    errors.town = "Keep the town under 80 characters.";
  }

  if (!ALLOWED_PROJECT_TYPES.has(values.projectType)) {
    errors.projectType = "Choose the project type that fits this scope best.";
  }

  if (!ALLOWED_PROPERTY_TYPES.has(values.propertyType)) {
    errors.propertyType = "Choose the property type.";
  }

  if (!ALLOWED_TIMELINES.has(values.timeline)) {
    errors.timeline = "Choose the expected project timing.";
  }

  if (values.notes.length > 1200) {
    errors.notes = "Keep project notes under 1,200 characters.";
  }

  const invalidFields = Object.keys(errors) as QuoteFieldName[];

  return {
    values,
    errors,
    invalidFields,
    isValid: invalidFields.length === 0,
  };
}

export function validateQuoteStep(values: QuoteFormValues, fields: readonly QuoteFieldName[]) {
  const result = validateQuoteFormValues(values);
  const stepErrors = fields.reduce<QuoteFieldErrors>((accumulator, field) => {
    if (result.errors[field]) {
      accumulator[field] = result.errors[field];
    }

    return accumulator;
  }, {});
  const invalidFields = fields.filter((field) => stepErrors[field]);

  return {
    values: result.values,
    errors: stepErrors,
    invalidFields,
    isValid: invalidFields.length === 0,
  };
}

export function getQuoteAnalyticsPayload(values: QuoteFormValues) {
  return {
    quote_project_type: values.projectType || "unknown",
    quote_property_type: values.propertyType || "unknown",
    quote_timeline: values.timeline || "unknown",
    quote_has_notes: values.notes.length > 0,
    quote_town_present: values.town.length > 0,
  };
}

export function getOptionLabel(options: readonly QuoteOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}
