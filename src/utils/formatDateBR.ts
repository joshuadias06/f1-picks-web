export function formatDateBR(date?: string) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  }