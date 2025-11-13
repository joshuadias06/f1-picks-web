import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Driver, Constructor } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  type: "QUALI" | "GP" | "CONSTRUCTOR" | null;
  drivers: Driver[];
  constructors: Constructor[];
  onSelect: (item: Driver | Constructor) => void;
};

export default function DriverModal({
  open,
  onClose,
  type,
  drivers,
  constructors,
  onSelect,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex justify-center items-end z-50"
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
              <h2 className="font-f1-bold text-lg">
                {type === "CONSTRUCTOR" ? "Select Constructor" : "Select Driver"}
              </h2>
              <X className="text-ice w-6 h-6 cursor-pointer" onClick={onClose} />
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
              {type === "CONSTRUCTOR"
                ? constructors.map((c) => (
                    <div
                      key={c.name}
                      onClick={() => onSelect(c)}
                      className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-gray-600 cursor-pointer"
                    >
                      <img src={c.logo} className="w-10 h-10 rounded" />
                      <p>{c.name}</p>
                    </div>
                  ))
                : drivers.map((d) => (
                    <div
                      key={d.name}
                      onClick={() => onSelect(d)}
                      className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-gray-600 cursor-pointer"
                    >
                      <img src={d.avatar} className="w-10 h-10 rounded-full" />
                      <p>{d.name}</p>
                    </div>
                  ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
