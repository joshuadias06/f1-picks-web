import { useConstructors } from "./useConstructors";

export function useConstructor(id?: string) {
  const { constructors, loading } = useConstructors();
  const constructor = constructors.find(c => c.id === id);
  return { constructor, loading };
}
