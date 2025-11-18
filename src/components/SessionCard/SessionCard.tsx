import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { parseErgastDate } from "@/utils/parseErgastDate";
import { formatDateBR } from "@/utils/formatDateBR";

export function SessionCard({
  label,
  date,
  time,
  color,
}: {
  label: string;
  date: string | undefined;
  time: string | undefined;
  color: string;
}) {
  const parsed = parseErgastDate(date, time);

  const formattedDate = parsed ? formatDateBR(parsed.toISOString()) : "-";

  const formattedTime = parsed
    ? parsed.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      })
    : "-";

  return (
    <div
      className="relative rounded-xl p-4 text-center border border-white/10 overflow-hidden"
      style={{ background: color }}
    >
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <OverlayPattern />
      </div>

      <p className="relative text-gray-200 text-xs mb-1 z-10">{label}</p>

      <p className="relative font-f1-bold text-lg text-white z-10">
        {formattedDate}
      </p>

      <p className="relative font-f1-wide text-sm text-gray-300 z-10">
        {formattedTime}
      </p>
    </div>
  );
}
