import ReactCountryFlag from "react-country-flag";
import { convertNationalityToCode } from "@/utils/nationalityToISO";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";

export function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color: string;
}) {
  const isNationality = label === "Nationality";

  // Só tenta converter se for o card de Nationality
  const isoCode = isNationality ? convertNationalityToCode(value) : null;
  const hasFlag = isNationality && isoCode !== null && isoCode !== "UN";

  return (
    <div
      className="relative rounded-xl p-4 text-center border border-white/10 overflow-hidden"
      style={{
        background: isNationality ? "transparent" : color,
      }}
    >
      {/* Bandeira como background – só para Nationality e se tiver código válido */}
      {hasFlag && (
        <div className="absolute inset-0 w-full h-full z-0">
          <ReactCountryFlag
            countryCode={isoCode as string}
            svg
            className="w-full h-full object-cover opacity-90"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}

      {/* Overlay em TODOS os cards */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <OverlayPattern />
      </div>

      {/* Conteúdo */}
      <p className="relative text-gray-200 text-xs mb-1 z-10">{label}</p>
      <p className="relative font-f1-bold text-xl text-white z-10">
        {value}
      </p>
    </div>
  );
}
