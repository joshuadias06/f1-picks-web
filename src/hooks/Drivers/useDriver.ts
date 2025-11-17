import { useDrivers } from "./useDrivers";

export function useDriver(id?: string) {
  const { drivers, loading } = useDrivers();

  const driver = drivers.find((d) => d.id === id);

  return { driver, loading };
}
