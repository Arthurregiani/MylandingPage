export const LANGUAGES = ["pt", "en"] as const;

export type Language = (typeof LANGUAGES)[number];
