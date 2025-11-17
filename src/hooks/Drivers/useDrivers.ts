import { useEffect, useState } from "react";
import { get2025DriverStandings } from "@/services/Drivers/driversApi";
import { driverImage } from "@/utils/driverImage";

type DriverStanding = {
  id: string;
  name: string;
  team: string;
  points: number;
  position: number;
  number?: string;
  permanentNumber?: string;
  wins: number;
  podiums: number;
  birthDate: string;
  nationality: string;
  code?: string;
  image?: string;
};


const driverTeamOverride: Record<string, string> = {
  verstappen: "Red Bull",
  tsunoda: "Red Bull",
  lawson: "RB F1 Team",
  hadjar: "RB F1 Team",
};

function normalizeTeam(raw: string, lastName: string) {
  const ln = lastName.toLowerCase();

  if (driverTeamOverride[ln]) return driverTeamOverride[ln];

  if (!raw) return "Unknown";
  const team = raw.toLowerCase();

  if (team.includes("red bull") && !team.includes("rb f1")) return "Red Bull";
  if (team.includes("rb f1") || team.includes("racing bulls")) return "RB F1 Team";

  return raw;
}

export function useDrivers() {
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const standings = await get2025DriverStandings();

        const filtered = standings.filter(
          (entry: any) => entry.Driver.familyName.toLowerCase() !== "doohan"
        );

        const formatted = filtered.map((entry: any) => {
          const driver = entry.Driver;

          const id = driver.driverId;
          const lastName = driver.familyName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

          const rawTeam = entry.Constructors?.[0]?.name ?? "Unknown";
          const team = normalizeTeam(rawTeam, lastName);

          return {
            id,
            name: `${driver.givenName} ${driver.familyName}`,
            team,
            points: Number(entry.points),
            position: Number(entry.position),
            number: driver.code,
            permanentNumber: driver.permanentNumber,
            wins: Number(entry.wins ?? 0),
            podiums: Number(entry.podiums ?? 0),
            birthDate: driver.dateOfBirth,
            nationality: driver.nationality,
            code: driver.code,
            image: driverImage[lastName] ?? "/drivers/default.png",
          };

        });

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
