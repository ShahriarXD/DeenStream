import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Grip, MapPin, MoreHorizontal } from 'lucide-react';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/quran', icon: BookOpen, label: 'Quran' },
  { path: '/tasbih', icon: Grip, label: 'Tasbih' },
  { path: '/nearby', icon: MapPin, label: 'Nearby' },
  { path: '/more', icon: MoreHorizontal, label: 'More' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = tabs.find((t) => t.path === location.pathname)?.path
    || ((['/prayer', '/dhikr', '/qibla', '/zakat', '/duas', '/names-of-allah', '/how-to-pray', '/progress', '/auth'].includes(location.pathname)) ? '/more' : '/');

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-card/90 backdrop-blur-2xl border border-border/50 rounded-[28px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around h-[56px] px-2">
          {tabs.map((tab) => {
            const active = activePath === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center justify-center w-14 h-full tap-scale group"
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-x-2 inset-y-1.5 rounded-2xl bg-primary/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon
                  size={18}
                  strokeWidth={active ? 2.2 : 1.6}
                  className={`relative z-10 transition-all duration-200 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
                />
                <span
                  className={`relative z-10 text-[9px] mt-0.5 font-medium tracking-wider transition-all duration-200 ${
                    active ? 'text-primary' : 'text-muted-foreground/60'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
