import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Drivers() {
  const drivers = [
    {
      name: "Max Verstappen",
      team: "Red Bull Racing",
      points: 314,
      image: "/drivers/max.png",
    },
    {
      name: "Charles Leclerc",
      team: "Ferrari",
      points: 280,
      image: "/drivers/leclerc.png",
    },
    {
      name: "Lando Norris",
      team: "McLaren",
      points: 255,
      image: "/drivers/norris.png",
    },
    {
      name: "Lewis Hamilton",
      team: "Mercedes",
      points: 240,
      image: "/drivers/hamilton.png",
    },
    {
      name: "Oscar Piastri",
      team: "McLaren",
      points: 237,
      image: "/drivers/piastri.png",
    },
    {
      name: "Carlos Sainz",
      team: "Ferrari",
      points: 220,
      image: "/drivers/sainz.png",
    },
  ];

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-f1-bold text-xl tracking-wide">DRIVERS</h1>
        <Search className="text-ice w-6 h-6" />
      </header>

      {/* Driver List */}
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {drivers.map((driver, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.98 }}
            className="bg-metallic rounded-2xl p-3 flex items-center justify-between shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          >
            {/* Left side - Image and Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border-l-4 border-primary">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <h2 className="font-f1-bold text-base">{driver.name}</h2>
                <p className="text-gray-400 text-sm">{driver.team}</p>
              </div>
            </div>

            {/* Right side - Points */}
            <div className="flex flex-col items-end leading-tight">
              <h3 className="font-f1-bold text-blue text-lg">{driver.points}</h3>
              <span className="text-xs text-blue tracking-wider">PTS</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
