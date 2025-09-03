import { CTRFormData } from "@/types/app-types";

export const validators: Record<
  keyof CTRFormData,
  (val: unknown) => string | undefined
> = {
  source: (val) =>
    typeof val === "string" && !val.trim() ? "Source is required" : undefined,

  description: (val) =>
    typeof val === "string" && !val.trim()
      ? "Description is required"
      : undefined,

  ptm: (val) =>
    typeof val === "number" && (val < 1 || val > 20)
      ? "PTM must be between 1 and 20"
      : undefined,

  time_spent: (val) =>
    typeof val === "number" && val < 1
      ? "Time spent must be at least 1 minute"
      : undefined,
};

export const parseValue = (name: string, value: string) =>
  name === "ptm" || name === "time_spent" ? parseInt(value) || 0 : value;