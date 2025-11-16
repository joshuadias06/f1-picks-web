import { motion } from "framer-motion";
import { Search } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useDrivers } from "@/hooks/Drivers/useDrivers";
import { teamColors } from "@/utils/teamColors";

export default function Drivers() {
  const { drivers, loading } = useDrivers();

  function getTeamColor(team: string) {
    const key = team.toLowerCase();
    return teamColors[key] ?? "#444"; // fallback
  }

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-f1-bold text-xl tracking-wide">DRIVERS</h1>
        <Search className="text-ice w-6 h-6" />
      </header>

      {loading && (
        <p className="text-gray-400 text-center mt-6">Loading drivers...</p>
      )}

      {!loading && (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {drivers.map((driver, index) => {
            const teamColor = getTeamColor(driver.team);

            return (
              <motion.div
                key={driver.code || index}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: teamColor }}
                className="relative rounded-2xl p-3 flex items-center justify-between shadow-lg"
              >
                {/* IMAGE FULL IN CARD */}
                <img
                  src={driver.image ?? "/drivers/default.png"}
                  alt={driver.name}
                  className="absolute left-0 top-0 h-full w-28 object-cover object-top opacity-90"
                />

                {/* Content */}
                <div className="ml-28 flex justify-between w-full">
                  <div className="flex flex-col leading-tight">
                    <h2 className="font-f1-bold text-base">{driver.name}</h2>
                    <p className="text-gray-200 text-sm">{driver.team}</p>
                  </div>

                  {driver.position ? (
                    <div className="flex flex-col items-end leading-tight">
                      <h3 className="font-f1-bold text-white text-lg">
                        {driver.position}
                      </h3>
                      <span className="text-xs text-white tracking-wider">
                        POS
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-100 text-xs">--</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}
