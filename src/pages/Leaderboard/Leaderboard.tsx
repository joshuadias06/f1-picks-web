import { motion } from "framer-motion";
import leaderboardData from "@/mocks/leaderboardData.json";
import BottomNav from "@/components/BottomNav/BottomNav";

export default function Leaderboard() {
  const sorted = [...leaderboardData.leaderboard].sort(
    (a, b) => b.points - a.points
  );

  const topThreeRaw = sorted.slice(0, 3).map((user, index) => ({
    ...user,
    pointsFormatted: `${user.points} PTS`,
    pos: index + 1,
    color: index === 0 ? "gold" : index === 1 ? "silver" : "bronze",
  }));

  // reorder so 1st place stays centered
  const topThree = [topThreeRaw[1], topThreeRaw[0], topThreeRaw[2]];

  const others = sorted.slice(3).map((player, index) => ({
    ...player,
    position: index + 4,
    pointsFormatted: `${player.points} PTS`,
  }));

  return (
    <>
      <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 relative pb-20">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-f1-bold text-lg tracking-wide">LEADERBOARD</h1>
          </div>
        </header>

        {/* Podium Section */}
        <motion.section
          className="flex justify-center items-end gap-6 mb-10"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {topThree.map((user, index) => {
            if (!user) return null;

            const podiumHeight =
              user.pos === 1 ? "h-32" : user.pos === 2 ? "h-24" : "h-20";

            const borderColor =
              user.color === "gold"
                ? "border-yellow-400"
                : user.color === "silver"
                ? "border-gray-300"
                : "border-orange-500";

            const textColor =
              user.color === "gold"
                ? "text-yellow-400"
                : user.color === "silver"
                ? "text-gray-300"
                : "text-orange-400";

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Avatar */}
                <div
                  className={`w-20 h-20 rounded-full border-4 ${borderColor} flex items-center justify-center z-10`}
                >
                  {user.img && (
                    <img
                      src={user.img}
                      alt={user.shortName || user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                </div>

                {/* Podium column */}
                <div
                  className={`w-20 ${podiumHeight} bg-metallic rounded-t-xl flex flex-col items-center justify-end pb-2 border border-gray-600`}
                >
                  <span className={`font-f1-bold text-sm ${textColor}`}>
                    {user.pointsFormatted}
                  </span>
                  <span className={`font-f1-bold text-xs ${textColor}`}>
                    {user.pos}º
                  </span>
                </div>

                {/* Name */}
                <p className="font-f1-wide text-sm mt-1">
                  {user.shortName || user.name}
                </p>
              </div>
            );
          })}
        </motion.section>

        {/* Others List */}
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
                {/* Position number */}
                <span className="font-f1-bold text-ice text-lg">
                  {player.position}
                </span>

                {/* Placeholder avatar */}
                <div className="w-8 h-8 rounded-full bg-gray-600"></div>

                {/* Name */}
                <span className="font-f1-regular text-gray-300">
                  {player.shortName || player.name}
                </span>
              </div>

              {/* Points */}
              <span
                className={`font-f1-wide text-sm ${
                  player.highlight ? "text-blue" : "text-gray-400"
                }`}
              >
                {player.pointsFormatted}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
