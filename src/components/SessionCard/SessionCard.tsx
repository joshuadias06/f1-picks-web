import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";

export function SessionCard({
  label,
  date,
  time,
  color,
}: {
  label: string;
  date: string;
  time: string;
  color: string;
}) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  const formattedTime = time
    ? new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

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

      {formattedTime && (
        <p className="relative font-f1-wide text-sm text-gray-300 z-10">
          {formattedTime}
        </p>
      )}
    </div>
  );
}
