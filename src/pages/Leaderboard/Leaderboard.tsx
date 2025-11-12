import { motion } from "framer-motion";
import { Bell, Menu, Share2 } from "lucide-react";
import { useState } from "react";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "overall">("weekly");

  const tabs = [
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "overall", label: "Overall" },
  ];

  const topThree = [
    {
      name: "Charles L.",
      points: "4,980 PTS",
      color: "silver",
      pos: 2,
      img: "/avatars/charles.png",
    },
    {
      name: "Max V.",
      points: "5,150 PTS",
      color: "gold",
      pos: 1,
      img: "/avatars/max.png",
    },
    {
      name: "Lando N.",
      points: "4,815 PTS",
      color: "bronze",
      pos: 3,
      img: "/avatars/lando.png",
    },
  ];

  const others = [
    { name: "Sarah K.", points: "4,790 PTS" },
    { name: "You", points: "4,755 PTS", highlight: true },
    { name: "Alex B.", points: "4,720 PTS" },
    { name: "Jessica P.", points: "4,680 PTS" },
  ];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Menu className="text-ice w-6 h-6" />
          <h1 className="font-f1-bold text-lg tracking-wide">LEADERBOARD</h1>
        </div>
        <Bell className="text-ice w-6 h-6" />
      </header>

      {/* Tabs */}
      <div className="bg-metallic rounded-2xl flex justify-around py-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`font-f1-bold text-sm px-4 py-2 rounded-xl transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-ice shadow-[0_0_15px_rgba(225,6,0,0.5)]"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Podium Section */}
      <motion.section
        className="flex justify-center items-end gap-6 mb-10"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {topThree.map((user) => (
          <div key={user.pos} className="flex flex-col items-center relative">
            {/* Medal Glow */}
            <div
              className={`absolute -top-3 ${
                user.color === "gold"
                  ? "drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
                  : user.color === "silver"
                  ? "drop-shadow-[0_0_12px_rgba(192,192,192,0.6)]"
                  : "drop-shadow-[0_0_12px_rgba(205,127,50,0.6)]"
              }`}
            ></div>

            {/* Avatar */}
            <div
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mb-2 ${
                user.color === "gold"
                  ? "border-yellow-400"
                  : user.color === "silver"
                  ? "border-gray-400"
                  : "border-orange-500"
              }`}
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>

            {/* Position number */}
            <span
              className={`text-sm font-f1-bold mb-1 ${
                user.color === "gold"
                  ? "text-yellow-400"
                  : user.color === "silver"
                  ? "text-gray-300"
                  : "text-orange-400"
              }`}
            >
              {user.pos}
            </span>

            {/* Name */}
            <p className="font-f1-wide text-sm">{user.name}</p>

            {/* Points */}
            <p
              className={`font-f1-bold text-sm ${
                user.color === "gold"
                  ? "text-yellow-400"
                  : user.color === "silver"
                  ? "text-gray-300"
                  : "text-orange-400"
              }`}
            >
              {user.points}
            </p>
          </div>
        ))}
      </motion.section>

      {/* List of others */}
      <div className="flex flex-col gap-3">
        {others.map((player, index) => (
          <motion.div
            whileTap={{ scale: 0.98 }}
            key={index}
            className={`flex items-center justify-between bg-metallic rounded-xl px-4 py-3 transition-all duration-200 ${
              player.highlight
                ? "border border-blue shadow-[0_0_20px_rgba(0,173,239,0.6)]"
                : "border border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-f1-bold text-ice text-lg">
                {index + 4}
              </span>
              <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              <span className="font-f1-regular text-gray-300">{player.name}</span>
            </div>
            <span
              className={`font-f1-wide text-sm ${
                player.highlight ? "text-blue" : "text-gray-400"
              }`}
            >
              {player.points}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Floating Share Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-primary flex items-center justify-center shadow-[0_0_20px_rgba(225,6,0,0.6)]"
      >
        <Share2 className="text-ice w-6 h-6" />
      </motion.button>
    </div>
  );
}
