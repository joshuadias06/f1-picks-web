import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useRace } from "@/hooks/Circuits/useRace";
import { circuitMap } from "@/utils/circuitMap";
import { countryToCode } from "@/utils/countryToCode";
import { SessionCard } from "@/components/SessionCard/SessionCard";
import { StatCard } from "@/components/StartCard/StartCard";
import { formatDateBR } from "@/utils/formatDateBR";

export default function RaceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { race, loading } = useRace(id);

  if (loading)
    return <div className="min-h-screen bg-dark text-ice flex justify-center items-center">Loading...</div>;

  if (!race)
    return <div className="min-h-screen bg-dark text-ice flex justify-center items-center">Race not found</div>;

  const circuitName = race.Circuit.circuitName;
  const country = race.Circuit.Location.country;
  const iso = (countryToCode[country] ?? "un").toLowerCase();
  const trackImg = circuitMap[circuitName];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col items-center p-4 pb-24">

      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-ice w-6 h-6" />
        </button>

        <h1 className="font-f1-bold text-lg leading-tight text-center">
          {circuitName.toUpperCase()}
        </h1>

        <span className={`fi fi-${iso} w-8 h-6 rounded-sm`} />
      </header>

      {/* Circuit Image */}
      <motion.div
        className="relative w-full flex justify-center items-center mb-7"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {trackImg && (
          <img src={trackImg} className="rounded-2xl w-full max-w-sm object-contain opacity-90" />
        )}
      </motion.div>

      {/* Main Info */}
      <div className="grid grid-cols-2 gap-3 w-full">

        <SessionCard
          label="Corrida"
          date={formatDateBR(race.date)}
          time={race.time ?? "--"}
          color="#111"
        />

        <StatCard label="País" value={country} color="#111" />

        <StatCard
          label="Localidade"
          value={race.Circuit.Location.locality}
          color="#111"
        />

        <StatCard
          label="Coordenadas"
          value={`${race.Circuit.Location.lat ?? "?"}, ${race.Circuit.Location.long ?? "?"}`}
          color="#111"
        />
      </div>

      {/* Practice + Qualifying */}
      <div className="grid grid-cols-2 gap-3 w-full mt-6">
        <SessionCard
          label="FP1"
          date={formatDateBR(race.FirstPractice?.date)}
          time={race.FirstPractice?.time ?? "--"}
          color="#111"
        />

        <SessionCard
          label="FP2"
          date={formatDateBR(race.SecondPractice?.date)}
          time={race.SecondPractice?.time ?? "--"}
          color="#111"
        />

        <SessionCard
          label="FP3"
          date={formatDateBR(race.ThirdPractice?.date)}
          time={race.ThirdPractice?.time ?? "--"}
          color="#111"
        />

        <SessionCard
          label="Qualifying"
          date={formatDateBR(race.Qualifying?.date)}
          time={race.Qualifying?.time ?? "--"}
          color="#111"
        />
      </div>

      <BottomNav />
    </div>
  );
}
