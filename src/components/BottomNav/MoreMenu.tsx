import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MoreMenu({ open, onClose }: Props) {
  const items = [
    { label: "Drivers", path: "/drivers" },
    { label: "Circuits", path: "/circuits" },
    { label: "Calendar", path: "/calendar" },
    { label: "Teams", path: "/teams" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed inset-0 z-50 
            bg-black/60 backdrop-blur-sm 
            flex justify-center items-end
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: 350 }}
            animate={{ y: 0 }}
            exit={{ y: 350 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="
              w-full rounded-t-3xl 
              p-6 pb-10
              bg-black/50 backdrop-blur-2xl
              border-t border-white/10
              shadow-[0_-8px_30px_rgba(0,0,0,0.4)]
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-f1-bold text-xl tracking-wide">Explore</h2>
              <motion.div whileTap={{ scale: 0.9 }}>
                <X
                  onClick={onClose}
                  className="w-7 h-7 text-ice cursor-pointer hover:text-primary transition"
                />
              </motion.div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <motion.div
                  key={item.label}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="
                      block
                      py-4 px-4 
                      rounded-2xl 
                      border border-white/10
                      bg-white/5 
                      backdrop-blur-md
                      text-ice font-f1-regular
                      tracking-wide
                      shadow-[0_0_12px_rgba(255,255,255,0.05)]
                      hover:bg-white/10 hover:border-primary/40
                      transition-all duration-300
                    "
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom spacing for nav */}
            <div className="h-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
