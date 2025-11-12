import { ArrowLeft, LayoutGrid, Home, CalendarDays, Map, Trophy, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function Circuits() {
  const circuits = [
    { name: "Bahrain", date: "Mar 02", flag: "/flags/bahrain.png" },
    { name: "Jeddah", date: "Mar 09", flag: "/flags/saudi.png" },
    { name: "Melbourne", date: "Mar 24", flag: "/flags/australia.png" },
    { name: "Suzuka", date: "Apr 07", flag: "/flags/japan.png" },
    { name: "Shanghai", date: "Apr 21", flag: "/flags/china.png" },
    { name: "Miami", date: "May 05", flag: "/flags/usa.png" },
    { name: "Imola", date: "May 19", flag: "/flags/italy.png" },
    { name: "Monaco", date: "May 26", flag: "/flags/monaco.png" },
  ];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col pb-24">
      {/* Header */}
      <header className="flex justify-between items-center p-4 mb-4">
        <div className="flex items-center gap-3">
          <ArrowLeft className="text-ice w-6 h-6" />
          <h1 className="font-f1-bold text-lg tracking-wide">
            2024 Season Circuits
          </h1>
        </div>
        <LayoutGrid className="text-ice w-6 h-6" />
      </header>

      {/* Grid of Circuits */}
      <motion.div
        className="grid grid-cols-2 gap-4 px-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {circuits.map((circuit, index) => (
          <motion.div
            whileTap={{ scale: 0.97 }}
            key={index}
            className="bg-metallic rounded-2xl p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)]"
          >
            <div className="flex justify-between items-center mb-2">
              <img
                src={circuit.flag}
                alt={`${circuit.name} flag`}
                className="w-6 h-4 rounded-sm object-cover"
              />
              <span className="text-xs text-gray-400 font-f1-wide">
                {circuit.date}
              </span>
            </div>

            <div className="w-full h-20 bg-gray-800/40 rounded-lg mb-3 flex items-center justify-center">
              {/* Aqui pode entrar a miniatura da pista futuramente */}
              <span className="text-gray-600 text-sm">Track Image</span>
            </div>

            <p className="text-center font-f1-bold text-sm">{circuit.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-metallic/70 backdrop-blur-md flex justify-around py-2 border-t border-gray-700">
        <button className="flex flex-col items-center text-gray-400 hover:text-primary transition">
          <Home size={20} />
          <span className="text-xs font-f1-regular mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-primary transition">
          <CalendarDays size={20} />
          <span className="text-xs font-f1-regular mt-1">Races</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-primary transition">
          <Settings size={20} />
          <span className="text-xs font-f1-regular mt-1">Picks</span>
        </button>
        <button className="flex flex-col items-center text-primary">
          <Map size={20} />
          <span className="text-xs font-f1-regular mt-1">Circuits</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-primary transition">
          <Trophy size={20} />
          <span className="text-xs font-f1-regular mt-1">Standings</span>
        </button>
      </nav>
    </div>
  );
}
