export function parseErgastDate(date?: string, time?: string): Date | null {
    if (!date) return null;
  
    // Caso venha no formato "2025-03-16"
    if (!time) {
      const d = new Date(date);
      return isNaN(d.getTime()) ? null : d;
    }
  
    // Caso venha como "04:00:00Z"
    const combined = `${date}T${time}`;
  
    const d = new Date(combined);
    return isNaN(d.getTime()) ? null : d;
  }
  