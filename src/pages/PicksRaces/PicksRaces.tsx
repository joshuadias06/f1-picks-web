import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useCalendar, type CalendarRace } from "@/hooks/Calendar/useCalendar";
import { countryToCode } from "@/utils/countryToCode";
import { Link } from "react-router-dom";

export default function PicksRaces() {
    const [tab, setTab] = useState<"all" | "upcoming" | "completed">("upcoming");

    const { calendar, loading } = useCalendar();

    const filtered = calendar.filter((r: CalendarRace) =>
        tab === "all"
            ? true
            : tab === "upcoming"
                ? r.status === "upcoming" || r.status === "live"
                : r.status === "completed"
    );

    return (
        <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-28 relative">

            {/* Header (IDÊNTICO AO ORIGINAL) */}
            <header className="flex items-center justify-between mb-4">
                <h1 className="font-f1-bold text-xl tracking-wide">Races Picks</h1>
            </header>

            {/* FILTER CHIPS — estilo idêntico ao Circuits */}
            <div className="flex gap-3 px-1 mb-6">
                {[
                    { id: "all", label: "All" },
                    { id: "upcoming", label: "Upcoming" },
                    { id: "completed", label: "Completed" },
                ].map((t) => {
                    const active = tab === t.id;

                    return (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id as any)}
                            className={`px-4 py-2 rounded-xl font-f1-bold text-sm transition ${active
                                    ? "bg-primary text-ice"
                                    : "bg-metallic text-gray-300 border border-gray-600"
                                }`}
                        >
                            {t.label.toUpperCase()}
                        </button>
                    );
                })}
            </div>


            {/* If loading */}
            {loading && (
                <p className="text-gray-500 text-center w-full mt-10">Loading calendar...</p>
            )}

            {/* List */}
            {!loading && (
                <div className="flex flex-col gap-4">
                    <AnimatePresence mode="wait">
                        {filtered.map((race: CalendarRace) => (
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
                                        className={`text-xs px-3 py-1 rounded-full font-f1-bold ${race.status === "upcoming"
                                            ? "bg-blue/5 text-blue border border-blue"
                                            : race.status === "live"
                                                ? "bg-red-600 text-ice"
                                                : "bg-gray-700 text-gray-300"
                                            }`}
                                    >
                                        {race.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-col gap-2 text-gray-300 text-sm">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`fi fi-${countryToCode[
                                                race.circuit.split(", ").pop()!
                                            ] ?? "un"} w-5 h-5 rounded-sm`}
                                        />
                                        <span>{race.circuit}</span>
                                    </div>

                                    <div className="flex flex-col items-start gap-1">
                                        <div className="flex items-center gap-2">
                                            <span>Qualifying: {race.quali}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span>Race: {race.race}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-4">
                                    {race.status === "completed" ? (
                                        <button className="w-full py-3 rounded-xl border border-gray-600 text-gray-300 font-f1-bold">
                                            VIEW RESULTS
                                        </button>
                                    ) : (
                                        <Link to={`/picks/${race.id}`}>
                                            <button className="w-full py-3 rounded-xl bg-primary text-ice font-f1-bold shadow-[0_8px_30px_rgba(225,6,0,0.45)]">
                                                MAKE PICKS
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
