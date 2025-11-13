import { motion } from "framer-motion";
import { ArrowLeft, Timer, Flag, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav/BottomNav";

export default function RaceDetails() {
  const navigate = useNavigate();
  const { id: _id } = useParams(); // ✔️ evita warning

  const race = {
    id: "monaco-grand-prix",
    title: "Monaco Grand Prix",
    flag: "/flags/monaco.png",
    image: "/circuits/monaco.png",
    qualifying: "28 MAY 16:00",
    grandPrix: "29 MAY 15:00",
    length: "3.337 km",
  };

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col items-center p-4 pb-20">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-ice w-6 h-6" />
        </button>

        <div className="text-center">
          <h1 className="font-f1-bold text-lg leading-tight">
            {race.title.split("Grand")[0].toUpperCase()} <br />
            GRAND PRIX
          </h1>
        </div>

        <img src={race.flag} alt={race.title} className="w-8 h-6 rounded-sm" />
      </header>

      {/* Circuit Image */}
      <div className="relative w-full flex justify-center items-center mb-8">
        <ChevronLeft className="absolute left-2 w-6 h-6 text-gray-500 opacity-60" />
        <motion.img
          src={race.image}
          alt={race.title}
          className="rounded-2xl shadow-[0_0_35px_rgba(225,6,0,0.3)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <ChevronRight className="absolute right-2 w-6 h-6 text-gray-500 opacity-60" />
      </div>

      {/* Race Info Cards */}
      <div className="grid grid-cols-3 gap-3 w-full mb-8">
        <motion.div
          className="bg-metallic p-3 rounded-xl text-center border border-primary/50 shadow-[0_0_25px_rgba(225,6,0,0.4)]"
          whileHover={{ scale: 1.03 }}
        >
          <Timer className="w-5 h-5 mx-auto mb-2 text-primary" />
          <p className="font-f1-bold text-sm">{race.qualifying}</p>
          <p className="text-gray-400 text-xs mt-1">Qualifying</p>
        </motion.div>

        <motion.div
          className="bg-metallic p-3 rounded-xl text-center border border-primary/50 shadow-[0_0_25px_rgba(225,6,0,0.4)]"
          whileHover={{ scale: 1.03 }}
        >
          <Flag className="w-5 h-5 mx-auto mb-2 text-primary" />
          <p className="font-f1-bold text-sm">{race.grandPrix}</p>
          <p className="text-gray-400 text-xs mt-1">Grand Prix</p>
        </motion.div>

        <motion.div
          className="bg-metallic p-3 rounded-xl text-center border border-primary/50 shadow-[0_0_25px_rgba(225,6,0,0.4)]"
          whileHover={{ scale: 1.03 }}
        >
          <Ruler className="w-5 h-5 mx-auto mb-2 text-primary" />
          <p className="font-f1-bold text-sm">{race.length}</p>
          <p className="text-gray-400 text-xs mt-1">Circuit Length</p>
        </motion.div>
      </div>

      {/* Make Picks Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        className="w-full py-4 rounded-2xl font-f1-bold text-lg bg-primary text-ice shadow-[0_0_40px_rgba(225,6,0,0.4)]"
      >
        MAKE PICKS
      </motion.button>
      <BottomNav />
    </div>
  );
}
