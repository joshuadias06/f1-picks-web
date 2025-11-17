import { Home, Trophy, BarChart3, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import MoreMenu from "./MoreMenu";

export default function BottomNav() {
  const location = useLocation();
  const [openMore, setOpenMore] = useState(false);

  const navItems = [
    { icon: Home, path: "/" },
    { icon: Trophy, path: "/picks" },
    { icon: BarChart3, path: "/leaderboard" },
    { icon: User, path: "/profile" },
  ];

  return (
    <>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="
          fixed bottom-0 left-0 right-0 
          h-18 z-50
          rounded-t-3xl 
          bg-black/40 backdrop-blur-xl
          border-t border-white/10 
          shadow-[0_-4px_20px_rgba(0,0,0,0.45)]
          flex justify-around items-center
        "
      >
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link key={i} to={item.path}>
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="
                  relative flex flex-col items-center justify-center 
                  px-4 py-2
                "
              >
                <motion.div
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-xl
                    transition-all duration-300 
                    ${active ? "bg-primary/15 shadow-[0_0_15px_rgba(225,6,0,0.45)]" : ""}
                  `}
                >
                  <Icon
                    className={`
                      w-5 h-5 transition-all
                      ${active ? "text-primary" : "text-gray-400"}
                    `}
                  />
                </motion.div>

                {active && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="
                      w-2 h-2 rounded-full bg-primary mt-1 
                      shadow-[0_0_12px_rgba(225,6,0,0.9)]
                    "
                  />
                )}
              </motion.div>
            </Link>
          );
        })}

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setOpenMore(true)}
          className="
            flex flex-col items-center justify-center
            px-4 py-2 
          "
        >
          <motion.div
            className="
              w-10 h-10 flex items-center justify-center rounded-xl 
              transition-all duration-300
              bg-white/5 hover:bg-white/10
            "
            whileHover={{ scale: 1.05 }}
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </motion.div>
        </motion.button>
      </motion.div>

      <MoreMenu open={openMore} onClose={() => setOpenMore(false)} />
    </>
  );
}
