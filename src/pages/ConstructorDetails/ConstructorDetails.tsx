import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useConstructor } from "@/hooks/Constructors/useConstructor";
import { teamColors } from "@/utils/teamColors";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { StatCard } from "@/components/StartCard/StartCard";
import { teamLogo } from "@/utils/teamLogo";
import { teamCars } from "@/utils/teamCar";

export default function ConstructorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { constructor, loading } = useConstructor(id);

  if (loading)
    return <div className="min-h-screen bg-dark text-gray-400 flex items-center justify-center">Loading...</div>;
  if (!constructor)
    return <div className="min-h-screen bg-dark text-gray-400 flex items-center justify-center">Constructor Not Found</div>;

  const teamColor = teamColors[constructor.name.toLowerCase()] ?? "#444";
  const logo = teamLogo[constructor.name.toLowerCase()];
  const car = teamCars[constructor.name.toLowerCase()];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-24">

      {/* HEADER */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-ice w-6 h-6" />
        </button>
        <h1 className="font-f1-bold text-lg">{constructor.name}</h1>
        <div className="w-6" />
      </header>

      {/* MAIN CARD */}
      <motion.div
        className="relative rounded-3xl w-full overflow-hidden shadow-xl p-5"
        style={{ background: teamColor }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <OverlayPattern />

        {/* Logo + Position */}
        <div className="relative z-10 flex justify-between items-center">
          {logo && <img src={logo} className="w-20 h-20 object-contain opacity-95" />}
          <span className="text-4xl font-f1-bold opacity-90 z-10">P{constructor.position}</span>
        </div>

        {/* Car — NOW SAFE + LARGE + NO OVERLAP */}
        {car && (
          <img
            src={car}
            className="relative z-10 w-full object-contain mt-4"
          />
        )}
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <StatCard label="Points" value={constructor.points} color={teamColor} />
        <StatCard label="Wins" value={constructor.wins ?? "-"} color={teamColor} />
        <StatCard label="Nationality" value={constructor.nationality} color={teamColor} />
      </div>

      <BottomNav />
    </div>
  );
}
