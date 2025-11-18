import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  teams: string[];
  selectedTeam: string;
  setSelectedTeam: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
};

export function FilterMenu({
  open,
  onClose,
  teams,
  selectedTeam,
  setSelectedTeam,
  sortOrder,
  setSortOrder,
}: Props) {
  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] flex items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* PANEL */}
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        transition={{ type: "spring", damping: 22 }}
        className="bg-dark w-full p-6 rounded-t-3xl border-t border-white/10"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-f1-bold text-xl tracking-wide">FILTERS</h2>
          <button onClick={onClose}>
            <X className="text-ice w-7 h-7" />
          </button>
        </div>

        {/* TEAM FILTER */}
        <div className="mb-6">
          <p className="font-f1-bold text-sm text-gray-300 mb-2">TEAM</p>

          <div className="grid grid-cols-2 gap-2">
            {teams.map((team) => (
              <button
                key={team}
                className={`p-3 rounded-xl border text-sm font-f1-bold transition-all
                  ${team === selectedTeam
                    ? "bg-red-600 border-red-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-300"
                  }`}
                onClick={() => {
                  setSelectedTeam(team);
                  onClose();
                }}
              >
                {team === "all" ? "All Teams" : team}
              </button>
            ))}
          </div>
        </div>

        {/* SORT ORDER */}
        <div className="mb-3">
          <p className="font-f1-bold text-sm text-gray-300 mb-2">ORDER</p>

          <div className="flex gap-3">
            <button
              className={`flex-1 p-3 rounded-xl border text-sm font-f1-bold
              ${sortOrder === "asc"
                ? "bg-red-600 border-red-500 text-white"
                : "bg-white/5 border-white/10 text-gray-300"
              }`}
              onClick={() => {
                setSortOrder("asc");
                onClose();
              }}
            >
              Top → Bottom
            </button>

            <button
              className={`flex-1 p-3 rounded-xl border text-sm font-f1-bold
              ${sortOrder === "desc"
                ? "bg-red-600 border-red-500 text-white"
                : "bg-white/5 border-white/10 text-gray-300"
              }`}
              onClick={() => {
                setSortOrder("desc");
                onClose();
              }}
            >
              Bottom → Top
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
