import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SprintSlots } from "@/types/picks";

type Props = {
  open: boolean;
  toggle: () => void;
  selected: SprintSlots;
  onOpenModal: (slot: string) => void;
};

export default function SectionSprintRace({
  open,
  toggle,
  selected,
  onOpenModal,
}: Props) {
  return (
    <section className="bg-metallic rounded-2xl p-4 mb-4">
      {/* HEADER */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <h2 className="font-f1-bold text-lg">TOP 3 SPRINT RACE</h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* BODY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            <div className="flex justify-between mb-4">
              {(["S1", "S2", "S3"] as const).map((slot) => {
                const driver = selected[slot];

                return (
                  <div
                    key={slot}
                    onClick={() => onOpenModal(slot)}
                    className="
                      w-[30%] h-32 border border-gray-600 rounded-xl 
                      flex flex-col items-center justify-center 
                      cursor-pointer hover:bg-gray-600/20 overflow-hidden
                      bg-black/20 relative
                    "
                  >
                    {driver ? (
                      <>
                        {/* Foto do piloto do peito para cima */}
                        <div className="w-full h-[75%] overflow-hidden flex justify-center items-start">
                          <img
                            src={driver.avatar}
                            alt={driver.name}
                            className="
                              w-full h-full 
                              object-cover 
                              object-top
                              scale-[1.15]
                            "
                          />
                        </div>

                        {/* Nome */}
                        <p className="font-f1-wide text-[11px] mt-1 text-center px-1 truncate w-full">
                          {driver.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-primary text-3xl">+</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">{slot}</p>
                      </>
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
