import { useEffect, useState } from "react";
import { get2025DriverStandings } from "@/services/Drivers/driversApi";

type DriverStanding = {
  name: string;
  team: string;
  points: number;
  position: number;
  code?: string;
  image?: string;
};

export function useDrivers() {
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const standings = await get2025DriverStandings();

        const formatted = standings.map((entry: any) => ({
          name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
          team: entry.Constructors?.[0]?.name ?? "Unknown",
          points: Number(entry.points),
          position: Number(entry.position),
          code: entry.Driver.code,
          image: `/drivers/${entry.Driver.code?.toLowerCase()}.png` || "/drivers/default.png"
        }));

        setDrivers(formatted);
      } catch (err) {
        console.error("Failed to load driver standings", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { drivers, loading };
}
