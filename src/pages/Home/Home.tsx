import { motion } from "framer-motion";
import { Bell, ChevronRight } from "lucide-react";
import homeData from "@/mocks/homeData.json";
import BottomNav from "@/components/BottomNav/BottomNav";

export default function Home() {
  const { user, upcomingRace, podium } = homeData;

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-ice/20"
          />
          <h1 className="font-f1-bold text-lg tracking-wide">F1 PICKS</h1>
        </div>
        <Bell className="text-ice w-6 h-6" />
      </header>

      {/* User Info */}
      <motion.div
        className="w-full bg-metallic rounded-2xl p-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-gray-300 font-f1-regular text-lg">
          Welcome, <span className="text-ice font-f1-bold">{user.name}!</span>
        </p>
        <div className="flex items-end gap-2 mt-2">
          <span className="text-5xl font-f1-bold text-ice">
            {user.points.toLocaleString()}
          </span>
          <span className="text-3xl font-f1-bold text-primary">PTS</span>
        </div>
      </motion.div>

      {/* Upcoming Race */}
      <section className="w-full mb-8">
        <h2 className="font-f1-wide text-xl mb-4">Upcoming Races</h2>

        <motion.div
          className="bg-metallic rounded-2xl p-4 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-f1-bold">{upcomingRace.title}</p>
              <p className="text-xs text-gray-400">{upcomingRace.date}</p>
            </div>
            <img
              src={upcomingRace.flag}
              alt="Flag"
              className="w-8 h-6 rounded-sm"
            />
          </div>

          <div className="flex justify-between mt-3 text-center">
            {Object.entries(upcomingRace.countdown).map(([label, value]) => (
              <div key={label}>
                <p
                  className={`text-2xl font-f1-bold ${
                    label === "seconds" ? "text-primary" : ""
                  }`}
                >
                  {value}
                </p>
                <span className="text-xs text-gray-400">
                  {label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-3 rounded-xl bg-primary text-ice font-f1-bold text-lg tracking-wider shadow-[0_0_20px_rgba(225,6,0,0.5)]"
          >
            MAKE PICKS
          </motion.button>
        </motion.div>
      </section>

      {/* Podium Leaders */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-f1-wide text-xl">Podium Leaders</h2>
          <button className="text-primary text-sm font-f1-regular flex items-center gap-1">
            View Full Leaderboard <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {podium.map((leader) => (
            <div
              key={leader.pos}
              className="flex items-center justify-between bg-metallic rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-f1-bold text-ice text-lg">
                  {leader.pos}
                </span>
                <img
                  src={leader.avatar}
                  alt={leader.name}
                  className="w-8 h-8 rounded-full border border-gray-700"
                />
                <span className="font-f1-regular text-gray-300">
                  {leader.name}
                </span>
              </div>
              <span className="font-f1-bold text-primary">
                {leader.points} PTS
              </span>
            </div>
          ))}
        </div>
      </section>
      <BottomNav />
    </div>
  );
}
