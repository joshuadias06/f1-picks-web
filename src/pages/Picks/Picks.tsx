import { useState, useMemo } from "react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useRace } from "@/hooks/Circuits/useRace";
import { useDrivers } from "@/hooks/Drivers/useDrivers";

import SectionQualifying from "./components/SectionQualifying";
import SectionGrandPrix from "./components/SectionGrandPrix";
import SectionSprintRace from "./components/SectionSprintRace";
import DriverModal from "./components/DriverModal";
import BottomNav from "@/components/BottomNav/BottomNav";

import type {
  Driver,
  QualifyingSlots,
  GPSlots,
} from "@/types/picks";

export default function Picks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { race, loading } = useRace(id);

  // 🔥 Aqui usamos o hook real de drivers
  const { drivers: driverStandings, loading: loadingDrivers } = useDrivers();

  // Convertendo para o tipo usado no sistema de picks
  const mappedDrivers: Driver[] = useMemo(
    () =>
      driverStandings.map((d) => ({
        name: d.name,
        odd: 0,
        avatar: d.image ?? "/drivers/default.png",
      })),
    [driverStandings]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [currentType, setCurrentType] =
    useState<"QUALI" | "GP" | "SPRINT" | null>(null);
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

  const [selectedSprint, setSelectedSprint] = useState({
    S1: null,
    S2: null,
    S3: null,
  });

  const [showQuali, setShowQuali] = useState(true);
  const [showGP, setShowGP] = useState(false);
  const [showSprint, setShowSprint] = useState(false);

  if (loading || loadingDrivers || !race) {
    return (
      <div className="min-h-screen bg-dark text-ice flex justify-center items-center font-f1-bold">
        Loading picks...
      </div>
    );
  }

  const hasSprint = !!race.Sprint;

  const filterDriversForSlot = (
    list: Driver[],
    selected: Record<string, string | null>,
    slot: string | null
  ) => {
    const blocked = Object.values(selected).filter((v) => v !== null);
    return list.filter((d) => !blocked.includes(d.name) || selected[slot!] === d.name);
  };

  const openModal = (
    type: "QUALI" | "GP" | "SPRINT",
    slot?: string
  ) => {
    setCurrentType(type);
    setCurrentSlot(slot || null);
    setModalOpen(true);
  };

  const onSelect = (item: Driver) => {
    if (!currentType || !currentSlot) return;

    if (currentType === "QUALI") {
      setSelectedQuali((prev) => ({ ...prev, [currentSlot]: item.name }));
    }

    if (currentType === "GP") {
      setSelectedGP((prev) => ({ ...prev, [currentSlot]: item.name }));
    }

    if (currentType === "SPRINT") {
      setSelectedSprint((prev) => ({ ...prev, [currentSlot]: item.name }));
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark text-ice p-4 pb-24 font-f1-regular">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="text-ice w-6 h-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div>
            <h1 className="font-f1-bold text-lg">{race.raceName}</h1>
            <p className="text-sm text-gray-400">
              {race.Circuit.circuitName}
            </p>
          </div>
        </div>
        <BarChart3 className="text-ice w-6 h-6" />
      </header>

      {/* SPRINT RACE (se existir) */}
      {hasSprint && (
        <SectionSprintRace
          open={showSprint}
          toggle={() => setShowSprint(!showSprint)}
          selected={selectedSprint}
          onOpenModal={(slot) => openModal("SPRINT", slot)}
        />
      )}

      {/* QUALIFYING NORMAL */}
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

      {/* MODAL */}
      <DriverModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        drivers={
          currentType === "QUALI"
            ? filterDriversForSlot(mappedDrivers, selectedQuali, currentSlot)
            : currentType === "GP"
            ? filterDriversForSlot(mappedDrivers, selectedGP, currentSlot)
            : filterDriversForSlot(mappedDrivers, selectedSprint, currentSlot)
        }
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
