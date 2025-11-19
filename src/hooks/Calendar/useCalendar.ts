import { useEffect, useState } from "react";
import { useRaces } from "../Circuits/useRaces";

export type CalendarRace = {
  id: string;
  round: number;
  title: string;
  circuit: string;
  quali: string;
  race: string;
  status: "upcoming" | "completed" | "live";
};

export function useCalendar() {
  const { races, loading } = useRaces();
  const [calendar, setCalendar] = useState<CalendarRace[]>([]);

  useEffect(() => {
    if (!races || races.length === 0) return;

    const now = new Date();

    const formatted = races.map((race) => {
      const qualiDate = new Date(`${race.Qualifying?.date}T${race.Qualifying?.time}`);
      const raceDate = new Date(`${race.date}T${race.time}`);

      const circuit = `${race.Circuit.circuitName}, ${race.Circuit.Location.country}`;

      let status: "upcoming" | "completed" | "live" = "upcoming";

      if (raceDate < now) status = "completed";
      if (now >= qualiDate && now <= raceDate) status = "live";

      return {
        id: String(race.round),       // id = string
        round: Number(race.round),    // ⬅️ round = number (CORRIGIDO)
        title: race.raceName,
        circuit,
        quali: qualiDate.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        race: raceDate.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status,
      };
    });

    setCalendar(formatted);
  }, [races]);

  return { calendar, loading };
}
