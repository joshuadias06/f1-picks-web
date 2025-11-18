import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useConstructors } from "@/hooks/Constructors/useConstructors";
import { ConstructorCard } from "@/components/ConstructorCard/ConstructorCard";

export default function Teams() {
  const { constructors, loading } = useConstructors();

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-24">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-f1-bold text-xl tracking-wide">CONSTRUCTORS</h1>
      </header>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400 text-center mt-6">Loading...</p>
      )}

      {/* LIST */}
      {!loading && (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {constructors.map((team) => (
            <ConstructorCard key={team.id} team={team} />
          ))}
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}
