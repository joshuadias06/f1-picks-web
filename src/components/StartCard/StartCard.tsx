import { OverlayPattern } from "../OverlayPattern/overlayPattern";

export function StatCard({ label, value, color }: { label: string; value: any; color: string }) {
    return (
      <div
        className="relative rounded-xl p-4 text-center border border-white/10 overflow-hidden"
        style={{ background: color }}
      >
        <OverlayPattern />
        <p className="text-gray-200 text-xs mb-1 relative z-10">{label}</p>
        <p className="font-f1-bold text-xl text-white relative z-10">{value}</p>
      </div>
    );
  }