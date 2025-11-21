import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Driver } from "@/types/picks";
import { cardTeamColors } from "@/utils/cardTeamColors";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";

type Props = {
  open: boolean;
  onClose: () => void;
  drivers: Driver[];
  onSelect: (item: Driver) => void;
};

export default function DriverModal({
  open,
  onClose,
  drivers,
  onSelect,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex justify-center items-end z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-metallic w-full p-6 rounded-t-2xl max-h-[70vh] overflow-y-auto"
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-f1-bold text-lg">Select Driver</h2>
              <X className="text-ice w-6 h-6 cursor-pointer" onClick={onClose} />
            </div>

            {/* Driver List */}
            <div className="flex flex-col gap-3">
              {drivers.map((d) => {
                const teamKey = d.team?.toLowerCase() ?? "";
                const color = cardTeamColors[teamKey] ?? "#555";

                return (
                  <div
                    key={d.name}
                    onClick={() => onSelect(d)}
                    className="
                      flex items-center rounded-xl cursor-pointer overflow-hidden 
                      relative transition hover:opacity-95
                    "
                    style={{
                      height: "80px",
                      backgroundColor: color,
                    }}
                  >
                    {/* Black subtle overlay */}
                    <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] z-0" />

                    {/* Texture overlay */}
                    <OverlayPattern />

                    {/* Pilot image */}
                    <div className="w-20 h-full overflow-hidden flex-shrink-0 relative z-10">
                      <img
                        src={d.avatar}
                        alt={d.name}
                        className="
                          w-full h-full 
                          object-cover 
                          object-top 
                          scale-110
                        "
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center px-3 text-ice relative z-10">
                      <p className="font-f1-bold text-base leading-tight">
                        {d.name}
                      </p>
                      <p className="text-sm text-gray-200 leading-tight">
                        {d.team}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
