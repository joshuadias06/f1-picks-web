import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { teamColors } from "@/utils/teamColors";
import { teamLogo } from "@/utils/teamLogo";
import { teamCars } from "@/utils/teamCar";

export function TeamCard({ team }: { team: string }) {
  const key = team.toLowerCase();
  const bg = teamColors[key] ?? "#444";
  const logo = teamLogo[key] ?? null;
  const car = teamCars[key] ?? null;

  return (
    <div
      className="relative rounded-2xl p-3 overflow-hidden shadow-lg flex flex-col gap-1"
      style={{ background: bg }}
    >
      <OverlayPattern />

      {/* Top (logo + name) */}
      <div className="relative z-10 flex items-center gap-2">
        {logo && (
          <img
            src={logo}
            className="w-7 h-7 object-contain opacity-95"
          />
        )}
        <p className="font-f1-bold text-sm tracking-wide opacity-95">
          {team}
        </p>
      </div>

      {/* Car aligned at the exact same start as logo */}
      {car && (
        <img
          src={car}
          className="relative z-10 h-20 w-auto object-contain -ml-1 mb-[-4px]" 
        />
      )}
    </div>
  );
}
