import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";
import { Link, useParams } from "react-router-dom";
import { useDriver } from "@/hooks/Drivers/useDriver";
import { teamColors } from "@/utils/teamColors";
import { formatDateBR } from "@/utils/formatDateBR";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { StatCard } from "@/components/StartCard/StartCard";

export default function DriverDetails() {
  const { id } = useParams();
  const { driver, loading } = useDriver(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-gray-400 flex items-center justify-center">
        Loading driver...
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen bg-dark text-gray-400 flex items-center justify-center">
        Driver not found
      </div>
    );
  }

  const teamColor = teamColors[driver.team.toLowerCase()] ?? "#444";

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-24">

      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <Link to="/drivers">
          <ArrowLeft className="text-ice w-6 h-6" />
        </Link>
        <h1 className="font-f1-bold text-lg">{driver.name}</h1>
        <div className="w-6" />
      </header>

      {/* MAIN DRIVER CARD */}
      <motion.div
        className="relative rounded-3xl w-full aspect-square overflow-hidden shadow-xl"
        style={{ background: teamColor }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Overlay */}
        <OverlayPattern />

        {/* Code */}
        <span className="absolute top-3 left-4 font-f1-bold text-6xl opacity-90 z-10">
          {driver.number}
        </span>

        {/* Driver Image */}
        <img
          src={driver.image}
          className="absolute inset-0 w-full h-full object-cover object-top scale-110 z-10"
        />

        {/* Permanent number */}
        {driver.permanentNumber && (
          <span className="absolute bottom-3 left-4 font-f1-bold text-4xl opacity-90 z-10">
            {driver.permanentNumber}
          </span>
        )}

        {/* Team Logo */}
        <div className="absolute right-3 bottom-3 w-16 h-16 bg-black/20 backdrop-blur-md rounded-xl flex items-center justify-center z-10">
          <span className="text-xs font-f1-bold">{driver.team}</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <StatCard label="Championship" value={`${driver.position}st`} color={teamColor} />
        <StatCard label="Points" value={driver.points} color={teamColor} />
        <StatCard label="Wins" value={driver.wins ?? "-"} color={teamColor} />
        <StatCard label="Nationality" value={driver.nationality} color={teamColor} />
        <StatCard label="Podiums" value={driver.podiums ?? "-"} color={teamColor} />
        <StatCard label="Date of Birth" value={formatDateBR(driver.birthDate)} color={teamColor} />
      </div>

      {/* TEAM / CAR CARD */}
      <div
        className="relative mt-6 rounded-2xl p-4 flex justify-between items-center overflow-hidden"
        style={{ background: teamColor }}
      >
        <OverlayPattern />

        <div className="relative z-10">
          <p className="font-f1-bold text-lg">{driver.team}</p>
          <p className="text-gray-200 text-sm opacity-80">Constructor</p>
        </div>

        <img
          src={`/cars/${driver.team.toLowerCase()}.png`}
          className="w-32 h-20 object-contain relative z-10"
        />
      </div>

      <BottomNav />
    </div>
  );
}
