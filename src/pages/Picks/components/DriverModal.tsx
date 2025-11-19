import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Driver } from "@/types/picks";

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
              <h2 className="font-f1-bold text-lg">Select Driver</h2>

              <X
                className="text-ice w-6 h-6 cursor-pointer"
                onClick={onClose}
              />
            </div>

            {/* Driver List */}
            <div className="flex flex-col gap-3">
              {drivers.map((d) => (
                <div
                  key={d.name}
                  onClick={() => onSelect(d)}
                  className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-gray-600 cursor-pointer"
                >
                  <img src={d.avatar} className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col">
                    <p className="font-f1-bold">{d.name}</p>
                    <span className="text-sm text-gray-400">
                      ODD {d.odd}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
