import { ArrowLeft, LayoutGrid} from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav/BottomNav";

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
      <BottomNav />
    </div>
  );
}
