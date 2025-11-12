import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft, BarChart3 } from "lucide-react";

export default function Picks() {
  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ArrowLeft className="text-ice w-6 h-6" />
          <div>
            <h1 className="font-f1-bold text-lg">YOUR PICKS</h1>
            <p className="text-sm text-gray-400">Monaco Grand Prix</p>
          </div>
        </div>
        <BarChart3 className="text-ice w-6 h-6" />
      </header>

      {/* Top 3 Qualifying Section */}
      <motion.section
        className="bg-metallic rounded-2xl p-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-f1-bold text-lg">TOP 3 QUALIFYING</h2>
          <ChevronUp className="text-ice w-5 h-5" />
        </div>
        <p className="text-gray-400 text-sm mb-3">
          Select your P1, P2, and P3 for Qualifying.
        </p>

        <div className="flex justify-between mb-4">
          {["P1", "P2", "P3"].map((pos, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center border border-gray-600 rounded-xl w-[30%] py-4"
            >
              <div className="w-16 h-16 bg-gray-500/20 rounded-full mb-2" />
              <p className="text-sm text-gray-400">{pos}</p>
            </div>
          ))}
        </div>

        {/* Drivers grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Max Verstappen", odd: "1.50" },
            { name: "Charles Leclerc", odd: "3.00" },
            { name: "Lando Norris", odd: "5.50" },
          ].map((driver, index) => (
            <motion.div
              whileTap={{ scale: 0.95 }}
              key={index}
              className="flex flex-col items-center justify-center rounded-xl border border-primary p-2 shadow-[0_0_20px_rgba(225,6,0,0.5)]"
            >
              <div className="w-16 h-16 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                <img
                  src="/avatars/driver-placeholder.png"
                  alt={driver.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <p className="text-xs text-center truncate w-20 font-f1-wide">
                {driver.name}
              </p>
              <p className="text-blue text-sm font-f1-bold">{driver.odd}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Top 3 Grand Prix Section */}
      <section className="bg-metallic rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="font-f1-bold text-lg">TOP 3 GRAND PRIX</h2>
          <ChevronDown className="text-ice w-5 h-5" />
        </div>
      </section>

      {/* Winning Constructor Section */}
      <section className="bg-metallic rounded-2xl p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-f1-bold text-lg">WINNING CONSTRUCTOR</h2>
          <ChevronDown className="text-ice w-5 h-5" />
        </div>
      </section>

      {/* Confirm Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-4 left-4 right-4 py-4 rounded-xl text-lg font-f1-bold text-ice shadow-[0_0_25px_rgba(225,6,0,0.5)]"
        style={{
          background: "linear-gradient(90deg, #FFA800 0%, #E10600 100%)",
        }}
      >
        CONFIRM PICKS
      </motion.button>
    </div>
  );
}
