import { motion } from "framer-motion";
import { Search } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useDrivers } from "@/hooks/Drivers/useDrivers";

export default function Drivers() {
  const { drivers, loading } = useDrivers();

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
          {drivers.map((driver, index) => (
            <motion.div
              key={driver.code || index}
              whileTap={{ scale: 0.98 }}
              className="bg-metallic rounded-2xl p-3 flex items-center justify-between shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border-l-4 border-primary">
                  <img
                    src={driver.image ?? "/drivers/default.png"}
                    alt={driver.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <h2 className="font-f1-bold text-base">{driver.name}</h2>
                  <p className="text-gray-400 text-sm">{driver.team}</p>
                </div>
              </div>
              {driver.position ? (
                <div className="flex flex-col items-end leading-tight">
                  <h3 className="font-f1-bold text-blue text-lg">{driver.position}</h3>
                  <span className="text-xs text-blue tracking-wider">POS</span>
                </div>
              ) : (
                <span className="text-gray-500 text-xs">--</span>
              )}

            </motion.div>
          ))}
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}
