import { motion } from "framer-motion";
import { Menu, Search } from "lucide-react";

export default function Teams() {
  const teams = [
    {
      pos: "P1",
      name: "FERRARI",
      drivers: "Charles Leclerc | Carlos Sainz",
      points: 252,
      color: "red-600",
      glow: "shadow-[0_0_25px_rgba(225,6,0,0.5)]",
      logo: "/teams/ferrari.png",
    },
    {
      pos: "P2",
      name: "MCLAREN",
      drivers: "Lando Norris | Oscar Piastri",
      points: 237,
      color: "orange-400",
      glow: "shadow-[0_0_25px_rgba(255,165,0,0.5)]",
      logo: "/teams/mclaren.png",
    },
    {
      pos: "P3",
      name: "RED BULL RACING",
      drivers: "Max Verstappen | Sergio Pérez",
      points: 301,
      color: "blue-600",
      glow: "shadow-[0_0_25px_rgba(0,0,255,0.5)]",
      logo: "/teams/redbull.png",
    },
    {
      pos: "P4",
      name: "MERCEDES",
      drivers: "Lewis Hamilton | George Russell",
      points: 151,
      color: "cyan-400",
      glow: "shadow-[0_0_25px_rgba(0,255,255,0.4)]",
      logo: "/teams/mercedes.png",
    },
  ];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Menu className="text-ice w-6 h-6" />
          <h1 className="font-f1-bold text-xl tracking-wide">CONSTRUCTORS</h1>
        </div>
        <Search className="text-ice w-6 h-6" />
      </header>

      {/* Teams List */}
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {teams.map((team, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`relative bg-metallic rounded-2xl p-4 flex justify-between items-center border-l-4 border-${team.color} ${team.glow} transition-all duration-200`}
          >
            {/* Left Side */}
            <div>
              <span className="text-sm text-gray-400 mb-1 block font-f1-wide">
                {team.pos}
              </span>
              <h2 className="font-f1-bold text-lg">{team.name}</h2>
              <p className="text-gray-400 text-sm">{team.drivers}</p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-end">
              <img
                src={team.logo}
                alt={team.name}
                className="w-10 h-10 mb-2 object-contain"
              />
              <div className="flex flex-col items-end leading-tight">
                <h3 className="font-f1-bold text-ice text-lg">
                  {team.points}
                </h3>
                <span className="text-xs text-gray-400 tracking-wider">PTS</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
