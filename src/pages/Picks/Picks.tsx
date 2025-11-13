import { useEffect, useState } from "react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import SectionQualifying from "./components/SectionQualifying";
import SectionGrandPrix from "./components/SectionGrandPrix";
import SectionConstructor from "./components/SectionConstructor";
import DriverModal from "./components/DriverModal";
import BottomNav from "@/components/BottomNav/BottomNav";

import type {
  Driver,
  Constructor,
  QualifyingSlots,
  GPSlots,
} from "./types";

import picksData from "@/mocks/picksData.json";

export default function Picks() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [constructors, setConstructors] = useState<Constructor[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentType, setCurrentType] =
    useState<"QUALI" | "GP" | "CONSTRUCTOR" | null>(null);
  const [currentSlot, setCurrentSlot] = useState<string | null>(null);

  const [selectedQuali, setSelectedQuali] = useState<QualifyingSlots>({
    P1: null,
    P2: null,
    P3: null,
  });

  const [selectedGP, setSelectedGP] = useState<GPSlots>({
    GP1: null,
    GP2: null,
    GP3: null,
  });

  const [selectedConstructor, setSelectedConstructor] = useState<string | null>(
    null
  );

  const [showQuali, setShowQuali] = useState(true);
  const [showGP, setShowGP] = useState(false);
  const [showConstructor, setShowConstructor] = useState(false);

  // Load mock data
  useEffect(() => {
    setDrivers(picksData.drivers);
    setConstructors(picksData.constructors);
  }, []);

  // 🔥 BLOCK RULE: Prevent same driver in more than one slot
  const filterDriversForSlot = (
    list: Driver[],
    selected: Record<string, string | null>,
    slot: string | null
  ) => {
    const blocked = Object.entries(selected)
      .filter(([s, val]) => s !== slot && val)
      .map(([_, val]) => val);

    return list.filter((d) => !blocked.includes(d.name));
  };

  const openModal = (
    type: "QUALI" | "GP" | "CONSTRUCTOR",
    slot?: string
  ) => {
    setCurrentType(type);
    setCurrentSlot(slot || null);
    setModalOpen(true);
  };

  const onSelect = (item: Driver | Constructor) => {
    if (!currentType) return;

    if (currentType === "QUALI" && currentSlot) {
      setSelectedQuali((prev) => ({
        ...prev,
        [currentSlot]: item.name,
      }));
    }

    if (currentType === "GP" && currentSlot) {
      setSelectedGP((prev) => ({
        ...prev,
        [currentSlot]: item.name,
      }));
    }

    if (currentType === "CONSTRUCTOR") {
      setSelectedConstructor((item as Constructor).name);
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark text-ice p-4 pb-24 font-f1-regular">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ArrowLeft className="text-ice w-6 h-6" />
          <div>
            <h1 className="font-f1-bold text-lg">{picksData.race.title}</h1>
            <p className="text-sm text-gray-400">{picksData.race.grandPrix}</p>
          </div>
        </div>
        <BarChart3 className="text-ice w-6 h-6" />
      </header>

      {/* QUALIFYING */}
      <SectionQualifying
        open={showQuali}
        toggle={() => setShowQuali(!showQuali)}
        selected={selectedQuali}
        onOpenModal={(slot) => openModal("QUALI", slot)}
      />

      {/* GRAND PRIX */}
      <SectionGrandPrix
        open={showGP}
        toggle={() => setShowGP(!showGP)}
        selected={selectedGP}
        onOpenModal={(slot) => openModal("GP", slot)}
      />

      {/* CONSTRUCTOR */}
      <SectionConstructor
        open={showConstructor}
        toggle={() => setShowConstructor(!showConstructor)}
        selected={selectedConstructor}
        onOpenModal={() => openModal("CONSTRUCTOR")}
      />

      {/* MODAL */}
      <DriverModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={currentType}
        drivers={
          currentType === "QUALI"
            ? filterDriversForSlot(drivers, selectedQuali, currentSlot)
            : currentType === "GP"
              ? filterDriversForSlot(drivers, selectedGP, currentSlot)
              : drivers
        }
        constructors={constructors}
        onSelect={onSelect}
      />

      <button
        className="fixed bottom-20 left-4 right-4 py-4 rounded-xl bg-primary text-ice font-f1-bold text-lg z-50"
      >
        CONFIRM PICKS
      </button>

      <BottomNav />
    </div>
  );
}
