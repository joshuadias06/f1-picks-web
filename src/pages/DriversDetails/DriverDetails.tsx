import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import BottomNav from "@/components/BottomNav/BottomNav";
import { Link, useParams } from "react-router-dom";
import { useDriver } from "@/hooks/Drivers/useDriver";

export default function DriverDetails() {
  const { id } = useParams(); // <-- agora correto
  const { driver, loading } = useDriver(id);

  const chartData = [
    { race: "BAH", points: 45 },
    { race: "SAU", points: 38 },
    { race: "AUS", points: 52 },
    { race: "JAP", points: 25 },
    { race: "CHI", points: 80 },
    { race: "MIA", points: 70 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-gray-400 flex items-center justify-center">
        Loading driver...
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen bg-dark text-gray-400 flex items-center justify-center">
        Driver not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-24">
      
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Link to="/drivers">
          <ArrowLeft className="text-ice w-6 h-6" />
        </Link>
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
            className="object-cover w-full h-full object-top"
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-metallic rounded-xl p-4 text-center border border-primary/50">
          <p className="text-gray-400 text-xs mb-1">POSITION</p>
          <p className="font-f1-bold text-2xl">{driver.position}</p>
        </div>

        <div className="bg-metallic rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs mb-1">POINTS</p>
          <p className="font-f1-bold text-2xl">{driver.points}</p>
        </div>
      </div>

      {/* Chart */}
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
