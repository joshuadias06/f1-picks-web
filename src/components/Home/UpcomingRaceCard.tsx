import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { circuitMap } from "@/utils/circuitMap";

type Props = {
  race: {
    id: string;
    title: string;
    dateFormatted: string;
    flagIso?: string;
    circuitName: string;
  } | null;
  loading: boolean;
};

export default function UpcomingRaceCard({ race, loading }: Props) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <motion.div
        className="bg-metallic rounded-2xl p-4 flex justify-center items-center h-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-gray-400">Loading next race...</span>
      </motion.div>
    );
  }

  if (!race) {
    return (
      <div className="bg-metallic rounded-2xl p-4 text-center text-gray-400">
        No upcoming races found.
      </div>
    );
  }

  const trackImg = circuitMap[race.circuitName];

  return (
    <motion.div
      className="bg-metallic rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute top-3 right-3">
        {race.flagIso ? (
          <span className={`fi fi-${race.flagIso} text-lg`} />
        ) : (
          <div className="w-8 h-6 bg-gray-700 rounded" />
        )}
      </div>

      <div>
        <p className="text-sm font-f1-bold">{race.title}</p>
        <p className="text-xs text-gray-400">{race.dateFormatted}</p>
      </div>

      <div className="w-full h-28 flex items-center justify-center">
        {trackImg ? (
          <img
            src={trackImg}
            alt="Circuit"
            className="w-full h-full object-contain opacity-90"
          />
        ) : (
          <span className="text-gray-500 text-sm">Track Image</span>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-xl bg-primary text-ice font-f1-bold text-lg shadow-[0_0_20px_rgba(225,6,0,0.5)]"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/picks/${race.id}`);
        }}
      >
        MAKE PICKS
      </motion.button>

    </motion.div>
  );
}
