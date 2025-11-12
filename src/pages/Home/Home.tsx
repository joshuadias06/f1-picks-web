import { motion } from "framer-motion";
import { Bell, ChevronRight } from "lucide-react";
import userImg from "@/assets/images/user.png";
import monacoFlag from "@/assets/images/monaco.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col items-center p-4">
      <header className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <img
            src={userImg}
            alt="User"
            className="w-10 h-10 rounded-full border border-ice/20"
          />
          <h1 className="font-f1-bold text-lg tracking-wide">F1 PICKS</h1>
        </div>
        <Bell className="text-ice w-6 h-6" />
      </header>
      <motion.div
        className="w-full bg-metallic rounded-2xl p-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-gray-300 font-f1-regular text-lg">
          Welcome, <span className="text-ice font-f1-bold">Alex!</span>
        </p>
        <div className="flex items-end gap-2 mt-2">
          <span className="text-5xl font-f1-bold text-ice">1,240</span>
          <span className="text-3xl font-f1-bold text-primary">PTS</span>
        </div>
      </motion.div>

      {/* Upcoming Races */}
      <section className="w-full mb-8">
        <h2 className="font-f1-wide text-xl mb-4">Upcoming Races</h2>

        <motion.div
          className="bg-metallic rounded-2xl p-4 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-f1-bold">MONACO GRAND PRIX</p>
              <p className="text-xs text-gray-400">26 MAY 2024</p>
            </div>
            <img src={monacoFlag} alt="Flag" className="w-8 h-6 rounded-sm" />
          </div>

          <div className="flex justify-between mt-3 text-center">
            <div>
              <p className="text-2xl font-f1-bold">08</p>
              <span className="text-xs text-gray-400">DAYS</span>
            </div>
            <div>
              <p className="text-2xl font-f1-bold">14</p>
              <span className="text-xs text-gray-400">HOURS</span>
            </div>
            <div>
              <p className="text-2xl font-f1-bold">22</p>
              <span className="text-xs text-gray-400">MINS</span>
            </div>
            <div>
              <p className="text-2xl font-f1-bold text-primary">45</p>
              <span className="text-xs text-gray-400">SECS</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-3 rounded-xl bg-primary text-ice font-f1-bold text-lg tracking-wider shadow-[0_0_20px_rgba(225,6,0,0.5)]"
          >
            MAKE PICKS
          </motion.button>
        </motion.div>
      </section>

      {/* Leaderboard */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-f1-wide text-xl">Podium Leaders</h2>
          <button className="text-primary text-sm font-f1-regular flex items-center gap-1">
            View Full Leaderboard <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { pos: 1, name: "Sarah", pts: "1,450", img: "/avatars/sarah.png" },
            { pos: 2, name: "Mike", pts: "1,380", img: "/avatars/mike.png" },
            { pos: 3, name: "Alex (You)", pts: "1,240", img: "/avatars/alex.png" },
          ].map((user) => (
            <div
              key={user.pos}
              className="flex items-center justify-between bg-metallic rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-f1-bold text-ice text-lg">
                  {user.pos}
                </span>
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-gray-700"
                />
                <span className="font-f1-regular text-gray-300">
                  {user.name}
                </span>
              </div>
              <span className="font-f1-bold text-primary">{user.pts} PTS</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
