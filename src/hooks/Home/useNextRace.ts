import { useEffect, useState } from "react";
import { useRaces } from "../Circuits/useRaces";
import { countryToCode } from "@/utils/countryToCode";

type RaceCardData = {
  title: string;
  date: Date;
  dateFormatted: string;
  country: string;
  flagIso?: string;
  circuitName: string;
};

export function useNextRace() {
  const { races, loading } = useRaces();

  const [nextRace, setNextRace] = useState<RaceCardData | null>(null);
  const [upcomingRaces, setUpcomingRaces] = useState<RaceCardData[]>([]);

  useEffect(() => {
    if (!races || races.length === 0) return;

    const toDate = (race: any): Date => {
      try {
        return new Date(`${race.date}T${race.time || "00:00:00"}`);
      } catch {
        return new Date(race.date);
      }
    };

    const now = new Date();

    const future = races
      .map((race) => ({
        ...race,
        _when: toDate(race),
      }))
      .filter((r) => r._when >= now)
      .sort((a, b) => a._when.getTime() - b._when.getTime());

    if (future.length === 0) return;

    const formattedUpcoming = future.map((race) => {
      const country = race.Circuit.Location.country;
      const iso = (countryToCode[country] || "un").toLowerCase();

      return {
        title: race.raceName,
        date: race._when,
        dateFormatted: race._when.toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        country,
        flagIso: iso,
        circuitName: race.Circuit.circuitName,
      };
    });

    setUpcomingRaces(formattedUpcoming);
    setNextRace(formattedUpcoming[0]);
  }, [races]);

  return { nextRace, upcomingRaces, loading };
}
