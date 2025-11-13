import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GPSlots } from "../types";

type Props = {
  open: boolean;
  toggle: () => void;
  selected: GPSlots;
  onOpenModal: (slot: string) => void;
};

export default function SectionGrandPrix({ open, toggle, selected, onOpenModal }: Props) {
  return (
    <section className="bg-metallic rounded-2xl p-4 mb-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggle}>
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
            <p className="text-gray-400 text-sm mb-4">
              Select P1, P2 and P3 for the Grand Prix.
            </p>

            <div className="flex justify-between mb-4">
              {(["GP1", "GP2", "GP3"] as const).map((slot) => (
                <div
                  key={slot}
                  onClick={() => onOpenModal(slot)}
                  className="w-[30%] h-32 border border-gray-600 rounded-xl flex flex-col 
                             items-center justify-center cursor-pointer hover:bg-gray-600/20"
                >
                  {selected[slot] ? (
                    <p className="font-f1-wide text-sm">{selected[slot]}</p>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-primary text-3xl">+</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{slot}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
