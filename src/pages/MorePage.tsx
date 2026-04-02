import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Compass, BookOpen, Calculator, Sparkles, Moon, Star, BookHeart, User, LogOut, BarChart3, ScrollText } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const METHODS = [
  { id: 2, name: 'Islamic Society of North America (ISNA)' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 3, name: 'Muslim World League' },
  { id: 4, name: 'Umm Al-Qura University, Makkah' },
  { id: 5, name: 'Egyptian General Authority' },
];

export default function MorePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const {
    calculationMethod, setCalculationMethod,
    quranFontSize, setQuranFontSize,
    accentIntensity, setAccentIntensity,
    nightModeEnabled, setNightModeEnabled,
  } = useAppStore();

  const navItems = [
    { icon: Moon, label: 'Prayer Times', path: '/prayer' },
    { icon: Compass, label: 'Qibla Compass', path: '/qibla' },
    { icon: BookOpen, label: 'Quran Reader', path: '/quran' },
    { icon: Sparkles, label: 'Guided Dhikr', path: '/dhikr' },
    { icon: BookHeart, label: 'Duas & Azkar', path: '/duas' },
    { icon: Star, label: '99 Names of Allah', path: '/names-of-allah' },
    { icon: BookOpen, label: 'How to Pray', path: '/how-to-pray' },
    { icon: Calculator, label: 'Zakat Calculator', path: '/zakat' },
    { icon: ScrollText, label: 'Hadith Stories', path: '/hadith-stories' },
    { icon: BarChart3, label: 'Progress & Calendar', path: '/progress' },
  ];

  return (
    <PageWrapper>
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.header variants={fadeUp} className="mb-8">
          <h1 className="text-[26px] font-semibold text-foreground tracking-tight">More</h1>
        </motion.header>

        {/* Navigation */}
        <motion.div variants={fadeUp} className="card-glass divide-y divide-white/5 mb-8 overflow-hidden">
          {navItems.map((item, idx) => (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 px-6 py-4 tap-scale text-left hover:bg-white/5 transition-all active:scale-95 duration-200"
            >
              <item.icon size={20} className="text-emerald-light flex-shrink-0" />
              <span className="text-sm font-semibold text-foreground flex-1">{item.label}</span>
              <motion.div whileHover={{ x: 4 }}>
                <ChevronRight size={16} className="text-emerald-light/50" />
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Account */}
        <motion.div variants={fadeUp} className="card-glass mb-8 p-6">
          {user ? (
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-emerald flex items-center justify-center">
                  <User size={20} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user.email}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">Signed in</p>
                </div>
              </div>
              <motion.button
                onClick={signOut}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-emerald-light tap-scale hover:bg-white/10 transition-all"
              >
                <LogOut size={16} />
                Sign Out
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 tap-scale text-left hover:bg-white/5 transition-all rounded-xl active:scale-95"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-emerald flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Sign In / Sign Up</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Sync your progress across devices</p>
              </div>
              <ChevronRight size={16} className="text-emerald-light/50" />
            </motion.button>
          )}
        </motion.div>

        {/* Settings */}
        <motion.div variants={fadeUp} className="mb-6">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-emerald-light/60 font-semibold mb-4 px-1">Settings</h2>
          <div className="card-glass p-7 space-y-7">
            <div>
              <label className="text-[11px] text-muted-foreground font-semibold mb-2.5 block uppercase tracking-wide">Calculation Method</label>
              <select
                value={calculationMethod}
                onChange={(e) => setCalculationMethod(Number(e.target.value))}
                className="w-full glass rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-light/30 transition-all font-medium"
              >
                {METHODS.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide">Quran Font Size</label>
                <span className="text-[11px] text-emerald-light tabular-nums font-semibold bg-emerald-light/10 px-2.5 py-1 rounded">{quranFontSize}px</span>
              </div>
              <input type="range" min={16} max={36} value={quranFontSize} onChange={(e) => setQuranFontSize(Number(e.target.value))} className="w-full accent-emerald-light h-2 rounded-full" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide">Accent Intensity</label>
                <span className="text-[11px] text-emerald-light tabular-nums font-semibold bg-emerald-light/10 px-2.5 py-1 rounded">{accentIntensity}%</span>
              </div>
              <input type="range" min={20} max={100} value={accentIntensity} onChange={(e) => setAccentIntensity(Number(e.target.value))} className="w-full accent-emerald-light h-2 rounded-full" />
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Night Mode</p>
                  <p className="text-[11px] text-muted-foreground mt-1 font-medium">Dimmer, calmer interface</p>
                </div>
                <button
                  onClick={() => setNightModeEnabled(!nightModeEnabled)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative border ${nightModeEnabled ? 'bg-gradient-emerald border-emerald-light/50' : 'bg-white/10 border-white/20'}`}
                >
                  <motion.div 
                    animate={{ x: nightModeEnabled ? 24 : 2 }} 
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }} 
                    className="absolute top-[2px] w-5 h-5 rounded-full bg-white/80" 
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center py-6">
          <p className="text-[10px] text-muted-foreground/40 font-medium tracking-wider">DeenStream v1.0</p>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
