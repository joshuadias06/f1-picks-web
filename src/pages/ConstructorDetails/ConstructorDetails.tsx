import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
} from "recharts";

/**
 * Mock data: substitute for real API later
 */
const TEAMS = [
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    position: 2,
    points: 406,
    logo: "/teams/ferrari.png",
    carImage: "/teams/ferrari-car.png",
    stats: {
      seasonWins: 5,
      podiums: 15,
      poles: 7,
      fastestLaps: 4,
    },
    progression: [
      { round: "01", pts: 0 },
      { round: "04", pts: 120 },
      { round: "08", pts: 380 },
      { round: "12", pts: 1200 },
      { round: "16", pts: 2600 },
      { round: "20", pts: 4000 },
    ],
    drivers: ["Charles Leclerc", "Carlos Sainz"],
  },
  // add other teams...
];

export default function ConstructorDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // find team by id or fallback to first
  const team = TEAMS.find((t) => t.id === id) || TEAMS[0];

  const [activeTab, setActiveTab] = React.useState<"stats" | "drivers">(
    "stats"
  );

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular p-4 pb-28">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-black/40"
        >
          <ArrowLeft className="w-6 h-6 text-ice" />
        </button>

        <h1 className="font-f1-bold text-xl tracking-wide text-center">
          {team.name}
        </h1>

        <div className="w-8 h-8" aria-hidden />
      </header>

      {/* Logo + Position */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="w-20 h-20 rounded-full bg-ice/5 flex items-center justify-center overflow-hidden border-2 border-ice">
          <img src={team.logo} alt={`${team.name} logo`} className="w-12 h-12" />
        </div>

        <p className="font-f1-wide text-lg">
          P{team.position} in Constructors
        </p>
        <p className="text-gray-400">{team.points} PTS</p>
      </div>

      {/* Car Image */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl overflow-hidden mb-4 shadow-[0_0_30px_rgba(225,6,0,0.25)]"
      >
        <img
          src={team.carImage}
          alt={`${team.name} car`}
          className="w-full h-40 object-cover"
        />
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2 rounded-md font-f1-bold text-sm transition ${
            activeTab === "stats"
              ? "bg-primary text-ice shadow-[0_8px_30px_rgba(225,6,0,0.35)]"
              : "bg-metallic text-gray-300"
          }`}
        >
          Performance Stats
        </button>

        <button
          onClick={() => setActiveTab("drivers")}
          className={`px-4 py-2 rounded-md font-f1-bold text-sm transition ${
            activeTab === "drivers"
              ? "bg-primary text-ice shadow-[0_8px_30px_rgba(225,6,0,0.35)]"
              : "bg-metallic text-gray-300"
          }`}
        >
          Driver Line-up
        </button>
      </div>

      {/* Content */}
      {activeTab === "stats" ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-metallic rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs">Season Wins</p>
              <p className="font-f1-bold text-2xl">{team.stats.seasonWins}</p>
            </div>
            <div className="bg-metallic rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs">Podiums</p>
              <p className="font-f1-bold text-2xl">{team.stats.podiums}</p>
            </div>
            <div className="bg-metallic rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs">Pole Positions</p>
              <p className="font-f1-bold text-2xl">{team.stats.poles}</p>
            </div>
            <div className="bg-metallic rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs">Fastest Laps</p>
              <p className="font-f1-bold text-2xl">{team.stats.fastestLaps}</p>
            </div>
          </div>

          {/* Points Progression Chart */}
          <div className="bg-metallic rounded-xl p-4">
            <h3 className="font-f1-bold mb-3">Points Progression</h3>

            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={team.progression} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                  <XAxis
                    dataKey="round"
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    hide
                    domain={["dataMin", "dataMax"]}
                  />
                  <Tooltip
                    wrapperStyle={{ background: "#111827", borderRadius: 8 }}
                    labelStyle={{ color: "#fff" }}
                    contentStyle={{ borderRadius: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pts"
                    stroke="#E10600"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    fill="#E10600"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Drivers Line-up */}
          <div className="bg-metallic rounded-xl p-4 mb-6">
            <h3 className="font-f1-bold mb-3">Driver Line-up</h3>
            <div className="flex flex-col gap-3">
              {team.drivers.map((d, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-black/20 rounded-md p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden" />
                    <div>
                      <p className="font-f1-bold">{d}</p>
                      <p className="text-gray-400 text-sm">#driver</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-f1-wide text-blue">View Stats</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Floating Make Picks CTA */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-4 left-4 right-4 py-4 rounded-xl font-f1-bold text-lg bg-primary text-ice shadow-[0_8px_40px_rgba(225,6,0,0.45)]"
      >
        MAKE PICKS
      </motion.button>
      <BottomNav />
    </div>
  );
}
