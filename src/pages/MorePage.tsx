import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Compass, BookOpen, Calculator, Sparkles, Moon, Star, BookHeart, User, LogOut, BarChart3, ScrollText } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
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
        <motion.div variants={fadeUp} className="card-elevated divide-y divide-border/20 mb-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 px-5 py-4 tap-scale text-left hover:bg-secondary/20 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <item.icon size={18} className="text-gold flex-shrink-0" />
              <span className="text-sm font-medium text-foreground flex-1">{item.label}</span>
              <ChevronRight size={14} className="text-muted-foreground/40" />
            </button>
          ))}
        </motion.div>

        {/* Account */}
        <motion.div variants={fadeUp} className="card-elevated mb-8">
          {user ? (
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-2xl gradient-gold flex items-center justify-center">
                  <User size={18} className="text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
                  <p className="text-[11px] text-muted-foreground">Signed in</p>
                </div>
              </div>
              <button
                onClick={signOut}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary/30 text-sm font-medium text-muted-foreground tap-scale hover:bg-secondary/50 transition-colors"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="w-full flex items-center gap-4 px-5 py-4 tap-scale text-left hover:bg-secondary/20 transition-colors rounded-2xl"
            >
              <User size={18} className="text-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Sign In / Sign Up</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Sync your progress across devices</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground/40" />
            </button>
          )}
        </motion.div>

        {/* Settings */}
        <motion.div variants={fadeUp} className="mb-6">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-gold/60 font-medium mb-3 px-1">Settings</h2>
          <div className="card-elevated p-5 space-y-6">
            <div>
              <label className="text-[11px] text-muted-foreground font-medium mb-2 block">Calculation Method</label>
              <select
                value={calculationMethod}
                onChange={(e) => setCalculationMethod(Number(e.target.value))}
                className="w-full bg-secondary/40 border border-border/60 rounded-2xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 appearance-none"
              >
                {METHODS.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] text-muted-foreground font-medium">Quran Font Size</label>
                <span className="text-[11px] text-foreground tabular-nums font-mono">{quranFontSize}px</span>
              </div>
              <input type="range" min={16} max={36} value={quranFontSize} onChange={(e) => setQuranFontSize(Number(e.target.value))} className="w-full accent-gold h-1" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] text-muted-foreground font-medium">Gold Accent Intensity</label>
                <span className="text-[11px] text-foreground tabular-nums font-mono">{accentIntensity}%</span>
              </div>
              <input type="range" min={20} max={100} value={accentIntensity} onChange={(e) => setAccentIntensity(Number(e.target.value))} className="w-full accent-gold h-1" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Night Mode</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Dimmer, calmer interface</p>
              </div>
              <button
                onClick={() => setNightModeEnabled(!nightModeEnabled)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${nightModeEnabled ? 'bg-gold' : 'bg-secondary'}`}
              >
                <motion.div animate={{ x: nightModeEnabled ? 22 : 3 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-foreground" />
              </button>
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
