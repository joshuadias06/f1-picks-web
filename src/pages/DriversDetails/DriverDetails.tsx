import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";
import { Link, useParams } from "react-router-dom";
import { useDriver } from "@/hooks/Drivers/useDriver";
import { teamColors } from "@/utils/teamColors";
import { formatDateBR } from "@/utils/formatDateBR";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { StatCard } from "@/components/StartCard/StartCard";
import { teamLogo } from "@/utils/teamLogo";
import { TeamCard } from "@/components/TeamCard/TeamCard";


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
  const teamLogoUrl = teamLogo[driver.team.toLowerCase()] ?? null;


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
        <OverlayPattern />

        <span
          className="absolute top-3 left-4 font-f1-bold text-7xl z-0"
          style={{ color: "#ffffff" }} // você pode mudar a cor aqui se quiser
        >
          {driver.number}
        </span>


        {/* TEAM LOGO (aligned with number) */}
        {teamLogoUrl && (
          <img
            src={teamLogoUrl}
            className="absolute top-3 right-3 w-20 h-20 object-contain opacity-90 z-10"
          />
        )}

        {/* Driver Image (in front of background code) */}
        <img
          src={driver.image}
          className="absolute inset-0 w-full h-full object-cover object-top scale-110 z-10"
        />

        {/* Permanent Number */}
        {driver.permanentNumber && (
          <span className="absolute bottom-3 left-4 font-f1-bold text-4xl opacity-90 z-10">
            {driver.permanentNumber}
          </span>
        )}
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
      <div className="mt-3">
        <TeamCard team={driver.team} />
      </div>

      <BottomNav />
    </div>
  );
}
