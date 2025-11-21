import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import BottomNav from "@/components/BottomNav/BottomNav";
import { useDrivers } from "@/hooks/Drivers/useDrivers";
import { teamColors } from "@/utils/teamColors";
import { cardTeamColors } from "@/utils/cardTeamColors";
import { Link } from "react-router-dom";
import { OverlayPattern } from "@/components/OverlayPattern/overlayPattern";
import { useState, useMemo } from "react";
import { FilterMenu } from "@/components/FilterMenu/FilterMenu";

export default function Drivers() {
  const { drivers, loading } = useDrivers();

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Teams list for menu
  const teams = useMemo(
    () => ["all", ...new Set(drivers.map((d) => d.team))],
    [drivers]
  );

  // Filtering + sorting
  const filteredDrivers = useMemo(() => {
    let list = [...drivers];

    if (selectedTeam !== "all") {
      list = list.filter((d) => d.team === selectedTeam);
    }

    list.sort((a, b) =>
      sortOrder === "asc"
        ? a.position - b.position
        : b.position - a.position
    );

    return list;
  }, [drivers, selectedTeam, sortOrder]);

  function getTeamColor(team: string) {
    return teamColors[team.toLowerCase()] ?? "#444";
  }

  function getTeamAccent(team: string) {
    return cardTeamColors[team.toLowerCase()] ?? "#ffffff";
  }

  return (
    <div className="min-h-screen bg-dark text-ice font-f1-regular flex flex-col p-4 pb-24">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-f1-bold text-xl tracking-wide">DRIVERS</h1>

        <button
          onClick={() => setOpenFilters(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-f1-bold text-sm">FILTER</span>
        </button>
      </header>

      {/* FILTER MENU */}
      <FilterMenu
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        teams={teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={(v) => {
          setSelectedTeam(v);
          setOpenFilters(false);
        }}
        sortOrder={sortOrder}
        setSortOrder={(v) => {
          setSortOrder(v);
          setOpenFilters(false);
        }}
      />

      {/* LIST */}
      {!loading && (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {filteredDrivers.map((driver) => {
            const bg = getTeamColor(driver.team);
            const accent = getTeamAccent(driver.team);

            return (
              <Link key={driver.id} to={`/drivers/${driver.id}`}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  style={{ background: bg }}
                  className="relative rounded-2xl p-3 flex items-center justify-between shadow-lg overflow-hidden"
                >
                  <OverlayPattern />

                  {/* Accent stripe */}
                  <div
                    style={{ backgroundColor: accent }}
                    className="absolute left-0 top-0 w-[6px] h-full z-10"
                  />

                  {/* Driver Image */}
                  <img
                    src={driver.image}
                    className="absolute left-2 top-0 h-full w-28 object-cover object-top opacity-90 z-10"
                  />

                  {/* Content */}
                  <div className="ml-28 flex justify-between w-full relative z-10">
                    <div className="flex flex-col leading-tight">
                      <h2 className="font-f1-bold text-base">{driver.name}</h2>
                      <p className="text-gray-200 text-sm">{driver.team}</p>
                    </div>

                    <div className="flex flex-col items-end leading-tight">
                      <h3 className="font-f1-bold text-white text-lg">
                        {driver.points}
                      </h3>
                      <span className="text-xs text-white tracking-wider">
                        PTS
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}
