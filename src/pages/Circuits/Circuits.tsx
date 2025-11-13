import { ArrowLeft, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useRaces } from "@/hooks/Circuits/useRace";
import { countryToCode } from "@/utils/countryToCode";

export default function Circuits() {
  const { races, loading } = useRaces();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-ice flex justify-center items-center font-f1-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col pb-24">
      {/* Header */}
      <header className="flex justify-between items-center p-4 mb-4">
        <div className="flex items-center gap-3">
          <ArrowLeft className="text-ice w-6 h-6" />
          <h1 className="font-f1-bold text-lg tracking-wide">2025 Circuits</h1>
        </div>
        <LayoutGrid className="text-ice w-6 h-6" />
      </header>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 px-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {races.map((race, index) => {
          const country = race.Circuit.Location.country;
          const iso = (countryToCode[country] || "un").toLowerCase();

          const dateFormatted = new Date(race.date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          });

          console.log("Country:", country, "| ISO:", iso);

          return (
            <motion.div
              key={index}
              whileTap={{ scale: 0.97 }}
              className="bg-metallic rounded-2xl p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`fi fi-${iso} w-6 h-4 rounded-sm`}></span>

                <span className="text-xs text-gray-400 font-f1-wide">
                  {dateFormatted}
                </span>
              </div>


              <div className="w-full h-20 bg-gray-800/40 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-600 text-sm">Track Image</span>
              </div>

              <p className="text-center font-f1-bold text-sm leading-tight">
                {race.Circuit.circuitName}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <BottomNav />
    </div>
  );
}
