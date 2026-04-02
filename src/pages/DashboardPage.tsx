import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Flame, Compass, Sparkles, Check, Sun, Cloud, CloudRain, Moon, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import ProgressRing from '@/components/ProgressRing';
import SkeletonCard from '@/components/SkeletonCard';
import { useAppStore } from '@/stores/useAppStore';

const AYAHS_OF_THE_DAY = [
  { arabic: 'إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا', english: 'Indeed, with hardship comes ease.', ref: 'Ash-Sharh 94:6' },
  { arabic: 'وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُ', english: 'And whoever relies upon Allah — then He is sufficient for him.', ref: 'At-Talaq 65:3' },
  { arabic: 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ', english: 'So remember Me; I will remember you.', ref: 'Al-Baqarah 2:152' },
  { arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', english: 'And your Lord is going to give you, and you will be satisfied.', ref: 'Ad-Duha 93:5' },
  { arabic: 'رَبِّ ٱشْرَحْ لِى صَدْرِى', english: 'My Lord, expand for me my breast.', ref: 'Ta-Ha 20:25' },
  { arabic: 'وَقُل رَّبِّ زِدْنِى عِلْمًا', english: 'And say, "My Lord, increase me in knowledge."', ref: 'Ta-Ha 20:114' },
  { arabic: 'إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ', english: 'Indeed, Allah is with the patient.', ref: 'Al-Baqarah 2:153' },
];

const DUAS_OF_THE_DAY = [
  'اللّهُمَّ إنِّي أسألُكَ العَفْوَ وَالعافِيَةَ — O Allah, I ask You for pardon and well-being.',
  'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً — Our Lord, give us in this world good and in the Hereafter good.',
  'اللّهُمَّ أعِنِّي عَلى ذِكْرِكَ وَشُكْرِكَ وحُسْنِ عِبادَتِكَ — O Allah, help me remember You, be grateful to You, and worship You well.',
];

interface PrayerTimesData {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string;
}

const PRAYER_NAMES: (keyof PrayerTimesData)[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_ARABIC: Record<string, string> = {
  Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء',
};
const PRAYER_ICONS: Record<string, typeof Sun> = {
  'Fajr': Sun, 'Dhuhr': Cloud, 'Asr': CloudRain, 'Maghrib': Wind, 'Isha': Moon,
};

function parseTime(t: string): Date {
  const [h, m] = t.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '—';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return h > 0
    ? `${h}h ${String(m).padStart(2, '0')}m`
    : `${m}m ${String(s).padStart(2, '0')}s`;
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { location, setLocation, currentStreak, updateStreak, todayProgress, tasbihLifetime, togglePrayer } = useAppStore();
  const [times, setTimes] = useState<PrayerTimesData | null>(null);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  const dayIndex = new Date().getDay();
  const ayahOfDay = AYAHS_OF_THE_DAY[dayIndex % AYAHS_OF_THE_DAY.length];
  const duaOfDay = DUAS_OF_THE_DAY[dayIndex % DUAS_OF_THE_DAY.length];

  useEffect(() => { updateStreak(); }, [updateStreak]);

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 21.4225, lng: 39.8262 })
      );
    }
  }, [location, setLocation]);

  useEffect(() => {
    if (!location) return;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    fetch(`https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${location.lat}&longitude=${location.lng}&method=2`)
      .then((r) => r.json())
      .then((data) => {
        setTimes(data.data.timings);
        setCity(data.data.meta?.timezone?.split('/').pop()?.replace(/_/g, ' ') || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const nextPrayer = useMemo(() => {
    if (!times) return null;
    for (const name of PRAYER_NAMES) {
      const t = parseTime(times[name]);
      if (t > now) return { name, time: t };
    }
    return { name: 'Fajr' as keyof PrayerTimesData, time: parseTime(times.Fajr) };
  }, [times, now]);

  const countdown = nextPrayer ? Math.max(0, nextPrayer.time.getTime() - now.getTime()) : 0;
  const prayerProgress = (todayProgress.prayersCompleted / 5) * 100;
  const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <PageWrapper>
      <motion.div variants={stagger} initial="hidden" animate="show">
        {/* Header */}
        <motion.header variants={fadeUp} className="mb-8">
          <p className="text-xs text-muted-foreground font-medium tracking-wide">{greeting}</p>
          <h1 className="text-[28px] font-semibold text-foreground tracking-tight mt-0.5">DeenStream</h1>
          {city && (
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <Compass size={10} /> {city}
            </p>
          )}
        </motion.header>

        {/* Prayer Hero */}
        {loading ? (
          <motion.div variants={fadeUp}><SkeletonCard lines={3} /></motion.div>
        ) : nextPrayer && (
          <motion.button
            variants={fadeUp}
            onClick={() => navigate('/prayer')}
            className="w-full glass-light rounded-[28px] p-7 mb-6 text-left tap-scale group hover:glow-emerald active:scale-95 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl bg-gradient-emerald/10" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-light/70 font-semibold">Next Prayer</p>
                <p className="text-4xl font-bold text-foreground font-arabic mt-2">{PRAYER_ARABIC[nextPrayer.name]}</p>
                <p className="text-sm text-foreground/80 font-medium mt-1">{nextPrayer.name}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-emerald-light/80 bg-emerald-light/10 rounded-xl px-3 py-2">
                  <Clock size={14} />
                  <span className="text-lg font-mono tabular-nums text-foreground font-semibold">{formatCountdown(countdown)}</span>
                </div>
                <p className="text-[10px] text-foreground/60 mt-2">{times ? nextPrayer.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
              </div>
            </div>
          </motion.button>
        )}

        {/* Streak & Quick Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mb-6">
          <div className="card-glass p-4 text-center hover:glow-emerald">
            <Flame size={20} className="mx-auto text-emerald-light mb-3 animate-floatUp" />
            <p className="text-2xl font-bold text-foreground tabular-nums">{currentStreak}</p>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium">Day Streak</p>
          </div>
          <button onClick={() => navigate('/prayer')} className="card-glass p-4 text-center tap-scale hover:glow-emerald group transition-all">
            <ProgressRing progress={prayerProgress} size={44} strokeWidth={4}>
              <span className="text-[11px] font-semibold text-foreground tabular-nums">{todayProgress.prayersCompleted}/5</span>
            </ProgressRing>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Prayers</p>
          </button>
          <div className="card-glass p-4 text-center hover:glow-emerald">
            <Sparkles size={20} className="mx-auto text-emerald-light mb-3 animate-pulse-glow" />
            <p className="text-2xl font-bold text-foreground tabular-nums">{tasbihLifetime}</p>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium">Tasbih</p>
          </div>
        </motion.div>

        {/* Prayer Tracker Quick */}
        <motion.div variants={fadeUp} className="card-glass p-6 mb-6 hover:glow-emerald">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-light/60 font-semibold">Today's Prayers</p>
            <span className="text-[11px] text-muted-foreground tabular-nums font-mono bg-emerald-light/10 px-2 py-1 rounded-lg">{todayProgress.prayersCompleted}/5</span>
          </div>
          <div className="flex items-center justify-between">
            {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((name) => {
              const done = !!(todayProgress.prayersDone && todayProgress.prayersDone[name]);
              const Icon = PRAYER_ICONS[name] || Sun;
              return (
                <button key={name} onClick={() => togglePrayer(name)} className="flex flex-col items-center gap-1.5 tap-scale group">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                      done 
                        ? 'gradient-gold shadow-lg border-gold/50 glow-gold-strong' 
                        : 'glass-light border-white/10 group-hover:border-emerald-light/30 group-hover:bg-emerald-light/5'
                    }`}
                  >
                    {done ? (
                      <Check size={16} className="text-foreground" strokeWidth={3} />
                    ) : (
                      <Icon size={16} className="text-emerald-light/70 group-hover:text-emerald-light transition-colors" />
                    )}
                  </motion.div>
                  <span className={`text-[9px] font-semibold transition-colors ${done ? 'text-emerald-light' : 'text-muted-foreground'}`}>{name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Ayah of the Day */}
        <motion.div variants={fadeUp} className="card-glass p-7 mb-4 hover:glow-emerald">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-light/60 font-semibold mb-4">Ayah of the Day</p>
          <p className="text-2xl leading-[2.2] font-arabic text-foreground text-center" dir="rtl">
            {ayahOfDay.arabic}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-light/20 to-transparent my-4" />
          <p className="text-[13px] text-muted-foreground text-center leading-relaxed italic">
            "{ayahOfDay.english}"
          </p>
          <p className="text-[10px] text-emerald-light/50 text-center mt-3 font-medium">{ayahOfDay.ref}</p>
        </motion.div>

        {/* Dua of the Day */}
        <motion.div variants={fadeUp} className="card-glass p-6 mb-4 hover:glow-emerald">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-light/60 font-semibold mb-4">Dua of the Day</p>
          <p className="text-[13px] text-foreground/90 leading-[1.8] font-medium">{duaOfDay}</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Quran', icon: BookOpen, path: '/quran', desc: 'Continue reading' },
            { label: 'Dhikr', icon: Sparkles, path: '/dhikr', desc: 'Morning adhkar' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="card-glass p-5 text-left tap-scale group hover:glow-emerald transition-all"
            >
              <item.icon size={22} className="text-emerald-light mb-3 group-hover:scale-110 group-hover:animate-pulse transition-transform duration-300" />
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{item.desc}</p>
            </button>
          ))}
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
