import { useEffect, useState } from "react";
import { get2025Races } from "@/services/Circuits/racesApi";
import type { Race } from "@/types/race";

export function useRaces() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get2025Races()
      .then(setRaces)
      .finally(() => setLoading(false));
  }, []);

  return { races, loading };
}
