import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";

type Race = {
  id: string;
  round: number;
  title: string;
  circuit: string;
  quali: string;
  race: string;
  status: "upcoming" | "completed" | "live";
};

const SAMPLE_RACES: Race[] = [
  {
    id: "r12",
    round: 12,
    title: "Hungarian Grand Prix",
    circuit: "Hungaroring, Hungary",
    quali: "Jul 20, 15:00",
    race: "Jul 21, 14:00",
    status: "upcoming",
  },
  {
    id: "r13",
    round: 13,
    title: "Belgian Grand Prix",
    circuit: "Spa-Francorchamps, Belgium",
    quali: "Jul 27, 15:00",
    race: "Jul 28, 14:00",
    status: "upcoming",
  },
  {
    id: "r11",
    round: 11,
    title: "British Grand Prix",
    circuit: "Silverstone Circuit, United Kingdom",
    quali: "Jul 06, 15:00",
    race: "Jul 07, 14:00",
    status: "completed",
  },
];

export default function Calendar() {
  const [tab, setTab] = useState<"all" | "upcoming" | "completed">("upcoming");

  const filtered = SAMPLE_RACES.filter((r) =>
    tab === "all"
      ? true
      : tab === "upcoming"
      ? r.status === "upcoming" || r.status === "live"
      : r.status === "completed"
  );

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-28 relative">

      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="font-f1-bold text-xl tracking-wide">Race Calendar</h1>
        <button aria-label="filters">
          <Sliders className="w-6 h-6 text-ice" />
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {[
          { id: "all", label: "All" },
          { id: "upcoming", label: "Upcoming" },
          { id: "completed", label: "Completed" },
        ].map((t) => {
          const active = tab === (t.id as any);
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-f1-bold transition ${
                active
                  ? "bg-metallic/90 text-ice shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                  : "bg-metallic/60 text-gray-400"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {filtered.map((race) => (
            <motion.article
              key={race.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              layout
              className="bg-metallic rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Round {race.round}</p>
                  <h2 className="font-f1-bold text-lg mt-1">{race.title}</h2>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-f1-bold ${
                    race.status === "upcoming"
                      ? "bg-blue/5 text-blue border border-blue"
                      : race.status === "live"
                      ? "bg-red-600 text-ice"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {race.status === "upcoming"
                    ? "UPCOMING"
                    : race.status === "live"
                    ? "LIVE"
                    : "COMPLETED"}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-2 text-gray-300 text-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-5 text-center">🌐</span>
                  <span>{race.circuit}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-block w-5 text-center">⏱️</span>
                  <span>Quali: {race.quali} | Race: {race.race}</span>
                </div>
              </div>

              <div className="mt-4">
                {race.status === "completed" ? (
                  <button className="w-full py-3 rounded-xl border border-gray-600 text-gray-300 font-f1-bold">
                    VIEW RESULTS
                  </button>
                ) : (
                  <button className="w-full py-3 rounded-xl bg-primary text-ice font-f1-bold shadow-[0_8px_30px_rgba(225,6,0,0.45)]">
                    MAKE PICKS
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
