import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  toggle: () => void;
  selected: string | null;
  onOpenModal: () => void;
};

export default function SectionConstructor({ open, toggle, selected, onOpenModal }: Props) {
  return (
    <section className="bg-metallic rounded-2xl p-4 mb-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggle}>
        <h2 className="font-f1-bold text-lg">WINNING CONSTRUCTOR</h2>
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
            <div
              onClick={onOpenModal}
              className="w-full h-32 border border-gray-600 rounded-xl flex flex-col 
                         items-center justify-center cursor-pointer hover:bg-gray-600/20"
            >
              {selected ? (
                <p className="text-lg font-f1-wide">{selected}</p>
              ) : (
                <>
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-primary text-3xl">+</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Constructor</p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
