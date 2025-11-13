import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import BottomNav from "@/components/BottomNav/BottomNav";

export default function DriverDetails() {
  const driver = {
    name: "Max Verstappen",
    team: "Oracle Red Bull Racing",
    country: "Netherlands",
    flag: "/flags/netherlands.png",
    image: "/drivers/max.png",
    standing: 1,
    points: 401,
    wins: 15,
    podiums: 18,
    progress: +18.5,
  };

  const chartData = [
    { race: "BAH", points: 45 },
    { race: "SAU", points: 38 },
    { race: "AUS", points: 52 },
    { race: "JAP", points: 25 },
    { race: "CHI", points: 80 },
    { race: "MIA", points: 70 },
  ];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-16">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <ArrowLeft className="text-ice w-6 h-6" />
      </header>

      {/* Driver Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <motion.div
          className="relative w-32 h-32 rounded-full border-4 border-primary shadow-[0_0_25px_rgba(225,6,0,0.6)] overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <img
            src={driver.image}
            alt={driver.name}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <motion.h1
          className="mt-4 font-f1-bold text-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {driver.name}
        </motion.h1>
        <p className="text-gray-400 text-sm">{driver.team}</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <img
            src={driver.flag}
            alt={driver.country}
            className="w-5 h-4 rounded-sm"
          />
          <span className="text-gray-400 text-sm">{driver.country}</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-metallic rounded-xl p-4 text-center border border-primary/50">
          <p className="text-gray-400 text-xs mb-1">STANDING</p>
          <p className="font-f1-bold text-2xl">{driver.standing}</p>
        </div>

        <div className="bg-metallic rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs mb-1">POINTS</p>
          <p className="font-f1-bold text-2xl">{driver.points}</p>
        </div>

        <div className="bg-metallic rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs mb-1">WINS</p>
          <p className="font-f1-bold text-2xl">{driver.wins}</p>
        </div>

        <div className="bg-metallic rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs mb-1">PODIUMS</p>
          <p className="font-f1-bold text-2xl">{driver.podiums}</p>
        </div>
      </div>

      {/* Season Progress */}
      <div>
        <h2 className="font-f1-bold text-lg mb-3">Season Progress</h2>

        <div className="bg-metallic rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-gray-400 text-xs">POINTS PROGRESSION</p>
              <p className="font-f1-bold text-2xl">
                {driver.points} <span className="text-sm">PTS</span>
              </p>
            </div>
            <span className="text-blue font-f1-bold text-sm">
              ↑ +{driver.progress}%
            </span>
          </div>

          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="race"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#E10600"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
