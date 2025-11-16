const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getDriverStandings(season = 2025) {
  const res = await fetch(`${BASE_URL}/${season}/driverstandings/`);

  if (!res.ok) {
    throw new Error("Failed to fetch driver standings");
  }

  const data = await res.json();

  return (
    data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || []
  );
}

export const get2025DriverStandings = () => getDriverStandings(2025);
