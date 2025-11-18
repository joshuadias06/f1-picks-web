export async function get2025ConstructorStandings() {
    const url = "https://api.jolpi.ca/ergast/f1/2025/constructorstandings/";
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load constructor standings");
  
    const data = await res.json();
    return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  }
  