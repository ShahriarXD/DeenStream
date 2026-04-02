import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md animate-fadeInUp">
      <div className="glass-nav rounded-[28px] p-0.5">
        <div className="flex items-center justify-around h-16 px-1 gap-1">
          <AnimatePresence mode="popLayout">
            {tabs.map((tab) => {
              const active = activePath === tab.path;
              return (
                <motion.button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="relative flex flex-col items-center justify-center flex-1 h-14 tap-scale group rounded-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-2xl bg-gradient-emerald/15 border border-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center gap-1 transition-all duration-300">
                    <motion.div
                      animate={active ? { scale: 1.15 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <tab.icon
                        size={22}
                        strokeWidth={active ? 2.2 : 1.8}
                        className={`transition-all duration-300 ${
                          active 
                            ? 'text-emerald-light drop-shadow-lg' 
                            : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                      />
                    </motion.div>
                    
                    <motion.span
                      animate={active ? { opacity: 1, height: 'auto' } : { opacity: 0.6, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-[10px] font-semibold tracking-wider transition-all duration-300 ${
                        active ? 'text-emerald-light' : 'text-muted-foreground/70'
                      }`}
                    >
                      {tab.label}
                    </motion.span>
                  </div>
                  
                  {active && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-30 blur-lg bg-gradient-emerald -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
