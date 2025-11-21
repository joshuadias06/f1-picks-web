import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { cardTeamColors } from "@/utils/cardTeamColors";

import type { GPSlots, Driver } from "@/types/picks";

type Props = {
  open: boolean;
  toggle: () => void;
  selected: Record<keyof GPSlots, Driver | null>;
  onOpenModal: (slot: string) => void;
};

export default function SectionGrandPrix({ open, toggle, selected, onOpenModal }: Props) {
  return (
    <section className="bg-metallic rounded-2xl p-4 mb-4">
      {/* HEADER */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <h2 className="font-f1-bold text-lg">TOP 3 GRAND PRIX</h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            <div className="flex justify-between mb-4">
              {(["GP1", "GP2", "GP3"] as const).map((slot) => {
                const driver = selected[slot];
                const color = driver
                  ? cardTeamColors[driver.team.toLowerCase()] ?? "#222"
                  : "#222";

                return (
                  <div
                    key={slot}
                    onClick={() => onOpenModal(slot)}
                    className="
                      relative w-[30%] h-32 border border-gray-600 
                      rounded-xl cursor-pointer overflow-hidden
                      flex items-center justify-center hover:opacity-90 transition
                    "
                    style={{ backgroundColor: driver ? color : "transparent" }}
                  >
                    {driver ? (
                      <>
                        <OverlayPattern />

                        <img
                          src={driver.avatar}
                          alt={driver.name}
                          className="
                            absolute w-full h-full
                            object-cover 
                            scale-110
                            object-[center_0.1%]
                          "
                        />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-primary text-3xl">+</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">{slot}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
