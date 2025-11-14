import { motion } from "framer-motion";
import UpcomingRaceCard from "./UpcomingRaceCard";

type Props = {
  races: Array<{
    title: string;
    dateFormatted: string;
    flagIso?: string;
    circuitName: string;
  }>;
  loading: boolean;
};

export default function UpcomingRacesCarousel({ races, loading }: Props) {
  if (loading)
    return (
      <div className="w-full flex justify-center py-10 text-gray-400">
        Loading races...
      </div>
    );

  if (!races || races.length === 0)
    return (
      <div className="w-full text-center text-gray-400 py-6">
        No upcoming races found.
      </div>
    );

  return (
    <motion.div
      className="overflow-x-auto flex gap-4 pb-2 px-1"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {races.map((race, index) => (
        <motion.div
          key={index}
          style={{ scrollSnapAlign: "center" }}
          className="min-w-[260px] max-w-[260px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <UpcomingRaceCard race={race} loading={false} />
        </motion.div>
      ))}
    </motion.div>
  );
}
