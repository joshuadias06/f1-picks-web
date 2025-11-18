import { useEffect, useState } from "react";
import { get2025ConstructorStandings } from "@/services/Constructors/constructors";

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
        const list = await get2025ConstructorStandings();

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
        console.error("Failed to load constructor standings", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { constructors, loading };
}
