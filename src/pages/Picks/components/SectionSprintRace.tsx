import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SprintSlots = {
  S1: string | null;
  S2: string | null;
  S3: string | null;
};

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
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <h2 className="font-f1-bold text-lg">TOP 3 SPRINT RACE</h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* Body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            <p className="text-gray-400 text-sm mb-4">
              Select S1, S2 and S3 for the Sprint Race.
            </p>

            <div className="flex justify-between mb-4">
              {(["S1", "S2", "S3"] as const).map((slot) => (
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
