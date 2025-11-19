import { ChevronDown, ChevronUp } from "lucide-react";
import type { SprintSlots } from "@/types/picks";

type Props = {
  open: boolean;
  toggle: () => void;
  selected: SprintSlots;
  onOpenModal: (slot: keyof SprintSlots) => void;
};

export default function SectionSprintRace({ open, toggle, selected, onOpenModal }: Props) {
  return (
    <div className="bg-metallic rounded-2xl p-4 mb-4">
      <button
        className="w-full flex justify-between items-center"
        onClick={toggle}
      >
        <h2 className="font-f1-bold text-lg">Sprint Race</h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="mt-4 flex flex-col gap-3">
          {(["S1", "S2", "S3"] as (keyof SprintSlots)[]).map((slot) => (
            <button
              key={slot}
              className="bg-dark p-3 rounded-xl flex justify-between"
              onClick={() => onOpenModal(slot)}
            >
              <span className="text-gray-300">{slot}</span>
              <span className="text-ice font-f1-bold">
                {selected[slot] ?? "Select Driver"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
