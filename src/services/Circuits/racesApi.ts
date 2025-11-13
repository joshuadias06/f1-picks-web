export async function get2025Races() {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/races/");
  
    if (!res.ok) {
      throw new Error("Failed to fetch F1 races");
    }
  
    const data = await res.json();
    return data.MRData.RaceTable.Races;
  }
  