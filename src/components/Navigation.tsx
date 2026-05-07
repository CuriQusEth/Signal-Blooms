import React from 'react';
import { motion } from 'motion/react';
import { Book, Trophy, Sparkles, Sprout } from 'lucide-react';
import { Screen } from '../App';

export function Navigation({ currentScreen, setScreen }: { currentScreen: Screen, setScreen: (s: Screen) => void }) {
  if (currentScreen === 'bloom') return null; // No nav on the final bloom screen

  const navItems = [
    { id: 'codex', icon: Book, label: 'Codex' },
    { id: 'garden', icon: Sprout, label: 'Garden' },
    { id: 'atelier', icon: Sparkles, label: 'Atelier' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaders' },
  ] as const;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
      <div className="flex items-center gap-2 p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`relative p-3 rounded-full transition-colors flex flex-col items-center gap-1 ${isActive ? 'text-pink-300' : 'text-white/50 hover:text-white/80'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={20} className="relative z-10" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
