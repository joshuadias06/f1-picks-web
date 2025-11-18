import { useEffect, useState } from "react";
import type { Race } from "@/types/race";
import { get2025Races } from "@/services/Circuits/racesApi";

export function useRace(id?: string) {
  const [race, setRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const races = await get2025Races();
        
        const found = races.find(
          (r: Race & { round?: string }, index: number) =>
            r.round === id || String(index + 1) === id
        );

        setRace(found ?? null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { race, loading };
}
