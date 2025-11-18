import { motion } from "framer-motion";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { teamColors } from "@/utils/teamColors";
import { teamCar, teamLogo } from "@/utils/teamImages";

type Props = {
  team: {
    id: string;
    name: string;
    position: number;
    points: number;
    wins: number;
    nationality: string;
  };
};

export function ConstructorCard({ team }: Props) {
  const cleanId = team.id.toLowerCase();
  const bg = teamColors[cleanId] ?? "#444";
  const logo = teamLogo[cleanId];
  const car = teamCar[cleanId];

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="relative rounded-3xl p-4 overflow-hidden shadow-lg border border-white/10"
      style={{ background: bg }}
    >
      <OverlayPattern />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-2">
        {logo && <img src={logo} className="h-8 w-auto opacity-90" />}
        <h2 className="font-f1-bold text-lg">{team.name}</h2>
      </div>

      {/* Car */}
      {car && (
        <img
          src={car}
          className="relative z-10 h-24 w-auto object-contain ml-[-4px]"
        />
      )}

      {/* Stats */}
      <div className="relative z-10 mt-3 flex justify-between text-sm font-f1-bold">
        <span>Pos: {team.position}</span>
        <span>{team.points} pts</span>
        <span>{team.wins} wins</span>
      </div>
    </motion.div>
  );
}
