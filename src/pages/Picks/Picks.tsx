import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft, BarChart3 } from "lucide-react";
import picksData from "@/mocks/picksData.json";

export default function Picks() {
  const {
    race,
    placeholders,
    qualifyingDrivers,
    raceDrivers,
    constructors
  } = picksData;

  const [showQualifying, setShowQualifying] = useState(true);
  const [showGrandPrix, setShowGrandPrix] = useState(false);
  const [showConstructor, setShowConstructor] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" }
  };

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ArrowLeft className="text-ice w-6 h-6" />
          <div>
            <h1 className="font-f1-bold text-lg">{race.title}</h1>
            <p className="text-sm text-gray-400">{race.grandPrix}</p>
          </div>
        </div>
        <BarChart3 className="text-ice w-6 h-6" />
      </header>

      {/* QUALIFYING SECTION */}
      <section className="bg-metallic rounded-2xl p-4 mb-4">
        {/* Header (Toggle) */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowQualifying(!showQualifying)}
        >
          <h2 className="font-f1-bold text-lg">TOP 3 QUALIFYING</h2>
          {showQualifying ? (
            <ChevronUp className="text-ice w-5 h-5" />
          ) : (
            <ChevronDown className="text-ice w-5 h-5" />
          )}
        </div>

        <AnimatePresence initial={false}>
          {showQualifying && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-gray-400 text-sm mt-2 mb-4">
                Select your P1, P2, and P3 for Qualifying.
              </p>

              {/* Placeholders */}
              <div className="flex justify-between mb-4">
                {placeholders.map((pos) => (
                  <div
                    key={pos}
                    className="flex flex-col items-center justify-center border border-gray-600 rounded-xl w-[30%] py-4"
                  >
                    <div className="w-16 h-16 bg-gray-500/20 rounded-full mb-2" />
                    <p className="text-sm text-gray-400">{pos}</p>
                  </div>
                ))}
              </div>

              {/* Drivers */}
              <div className="grid grid-cols-3 gap-3">
                {qualifyingDrivers.map((driver) => (
                  <motion.div
                    key={driver.name}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center rounded-xl border border-primary p-2 shadow-[0_0_20px_rgba(225,6,0,0.5)]"
                  >
                    <div className="w-16 h-16 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center truncate w-20 font-f1-wide">
                      {driver.name}
                    </p>
                    <p className="text-blue text-sm font-f1-bold">
                      {driver.odd}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* GRAND PRIX SECTION */}
      <section className="bg-metallic rounded-2xl p-4 mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowGrandPrix(!showGrandPrix)}
        >
          <h2 className="font-f1-bold text-lg">TOP 3 GRAND PRIX</h2>
          {showGrandPrix ? (
            <ChevronUp className="text-ice w-5 h-5" />
          ) : (
            <ChevronDown className="text-ice w-5 h-5" />
          )}
        </div>

        <AnimatePresence>
          {showGrandPrix && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-4"
            >
              <div className="grid grid-cols-3 gap-3">
                {raceDrivers.map((driver) => (
                  <div
                    key={driver.name}
                    className="flex flex-col items-center rounded-xl p-3 bg-black/20 border border-gray-700"
                  >
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="w-14 h-14 rounded-full mb-2"
                    />
                    <p className="text-xs font-f1-wide text-center">
                      {driver.name}
                    </p>
                    <p className="text-blue text-sm font-f1-bold">
                      {driver.odd}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CONSTRUCTOR SECTION */}
      <section className="bg-metallic rounded-2xl p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowConstructor(!showConstructor)}
        >
          <h2 className="font-f1-bold text-lg">WINNING CONSTRUCTOR</h2>
          {showConstructor ? (
            <ChevronUp className="text-ice w-5 h-5" />
          ) : (
            <ChevronDown className="text-ice w-5 h-5" />
          )}
        </div>

        <AnimatePresence>
          {showConstructor && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-4"
            >
              <div className="flex gap-3 overflow-x-auto pb-2">
                {constructors.map((team) => (
                  <div
                    key={team.name}
                    className="flex flex-col items-center bg-black/30 rounded-xl p-3 w-28 border border-gray-700 flex-shrink-0"
                  >
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-12 h-12 object-contain mb-2"
                    />
                    <p className="text-xs font-f1-wide text-center">
                      {team.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Confirm Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-4 left-4 right-4 py-4 rounded-xl text-lg font-f1-bold text-ice shadow-[0_0_25px_rgba(225,6,0,0.5)]"
        style={{
          background: "linear-gradient(90deg, #FFA800 0%, #E10600 100%)"
        }}
      >
        CONFIRM PICKS
      </motion.button>
    </div>
  );
}
