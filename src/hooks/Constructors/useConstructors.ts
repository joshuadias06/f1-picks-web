import { useEffect, useState } from "react";

export type ConstructorStanding = {
  id: string;
  name: string;
  points: number;
  wins: number;
  position: number;
  nationality: string;
};

export function useConstructors() {
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/constructorstandings/");
        const data = await res.json();

        const list = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        const formatted = list.map((entry: any) => ({
          id: entry.Constructor.constructorId,
          name: entry.Constructor.name,
          points: Number(entry.points),
          wins: Number(entry.wins),
          position: Number(entry.position),
          nationality: entry.Constructor.nationality,
        }));

        setConstructors(formatted);
      } catch (e) {
        console.error("Failed to load constructor standings");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { constructors, loading };
}
