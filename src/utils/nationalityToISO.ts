// utils/nationalityToISO.ts
export function convertNationalityToCode(nationality: unknown): string {
  if (typeof nationality !== "string") return "UN";

  const key = nationality.toLowerCase();

  const map: Record<string, string> = {
    british: "GB",
    dutch: "NL",
    spanish: "ES",
    french: "FR",
    italian: "IT",
    japanese: "JP",
    australian: "AU",
    thai: "TH",
    mexican: "MX",
    german: "DE",
    brazilian: "BR",
    argentine: "AR",
    canadian: "CA",
    finnish: "FI",
    monegasque: "MC",
    "new zealander": "NZ",
    "new zealand": "NZ",
  };

  return map[key] ?? "UN";
}
