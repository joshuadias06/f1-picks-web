import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav/BottomNav";

export default function Profile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"recent" | "achievements" | "performance">(
    "recent"
  );

  const user = {
    username: "ALEX_F1",
    points: 8842,
    rank: 1234,
    avatar: "/avatars/default.png",
  };

  const recentPicks = [
    {
      gp: "Monza GP",
      date: "01 Sep",
      picks: "P1: VER, P2: LEC, P3: NOR",
      points: 150,
      img: "/tracks/monza.png",
    },
    {
      gp: "Zandvoort GP",
      date: "25 Aug",
      picks: "P1: VER, P2: ALO, P3: GAS",
      points: 125,
      img: "/tracks/zandvoort.png",
    },
  ];

  const achievements = [
    { title: "Podium Perfect", icon: "🏅" },
    { title: "Hat-Trick Hero", icon: "🏎️" },
    { title: "On Fire", icon: "🔥" },
  ];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular p-4 pb-28">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-ice w-6 h-6" />
        </button>
        <h1 className="font-f1-bold text-xl">PROFILE</h1>
        <Settings className="text-ice w-6 h-6" />
      </header>

      {/* Avatar + Info */}
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          className="w-28 h-28 rounded-full border-4 border-primary shadow-[0_0_25px_rgba(225,6,0,0.5)] overflow-hidden mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <img
            src={user.avatar}
            alt={user.username}
            className="object-cover w-full h-full"
          />
        </motion.div>
        <h2 className="font-f1-bold text-lg">{user.username}</h2>
        <p className="text-gray-400 text-sm">
          Total Points: <span className="text-primary">{user.points.toLocaleString()}</span>
        </p>
        <p className="text-gray-400 text-sm">
          Global Rank: <span className="font-f1-bold text-ice">#{user.rank.toLocaleString()}</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-around mb-6">
        {[
          { id: "recent", label: "Recent Picks" },
          { id: "achievements", label: "Achievements" },
          { id: "performance", label: "Performance" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-3 py-2 rounded-md font-f1-bold text-sm transition ${
              tab === t.id
                ? "bg-primary text-ice shadow-[0_0_25px_rgba(225,6,0,0.4)]"
                : "bg-metallic text-gray-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tab === "recent" && (
          <motion.div
            key="recent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-f1-bold text-lg">RECENT PICKS</h3>
              <button className="text-primary text-sm font-f1-bold">
                View All
              </button>
            </div>

            {recentPicks.map((pick, i) => (
              <motion.div
                key={i}
                className="bg-metallic rounded-2xl p-4 flex justify-between items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="font-f1-bold text-sm">
                    {pick.gp} - <span className="text-gray-400">{pick.date}</span>
                  </p>
                  <p className="text-ice text-xs mt-1">{pick.picks}</p>
                  <p className="text-primary text-xs mt-1">
                    Points Awarded: {pick.points}
                  </p>
                </div>
                <img
                  src={pick.img}
                  alt={pick.gp}
                  className="w-20 h-14 object-cover rounded-md"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-f1-bold text-lg">ACHIEVEMENTS</h3>
              <button className="text-primary text-sm font-f1-bold">
                View All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-metallic rounded-xl flex flex-col items-center justify-center p-4"
                >
                  <div className="text-2xl mb-2 text-primary">{ach.icon}</div>
                  <p className="text-xs text-center font-f1-bold text-ice">
                    {ach.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "performance" && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-gray-400"
          >
            <p className="text-sm">Performance analytics coming soon 🚀</p>
          </motion.div>
        )}
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
