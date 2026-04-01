import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Flame, Compass, Sparkles, Check } from 'lucide-react';
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
            className="w-full rounded-2xl gradient-hero p-6 mb-6 text-left tap-scale shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-medium">Next Prayer</p>
                <p className="text-3xl font-bold text-white font-arabic mt-1">{PRAYER_ARABIC[nextPrayer.name]}</p>
                <p className="text-sm text-white/80 font-medium mt-0.5">{nextPrayer.name}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-white/70">
                  <Clock size={13} />
                  <span className="text-lg font-mono tabular-nums text-white font-semibold">{formatCountdown(countdown)}</span>
                </div>
                <p className="text-[10px] text-white/60 mt-1">{times ? nextPrayer.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
              </div>
            </div>
          </motion.button>
        )}

        {/* Streak & Quick Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mb-6">
          <div className="card-elevated p-4 text-center">
            <Flame size={18} className="mx-auto text-primary mb-2" />
            <p className="text-2xl font-semibold text-foreground tabular-nums">{currentStreak}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Day Streak</p>
          </div>
          <button onClick={() => navigate('/prayer')} className="card-elevated p-4 text-center tap-scale">
            <ProgressRing progress={prayerProgress} size={44} strokeWidth={4}>
              <span className="text-[11px] font-semibold text-foreground tabular-nums">{todayProgress.prayersCompleted}/5</span>
            </ProgressRing>
            <p className="text-[10px] text-muted-foreground mt-2">Prayers</p>
          </button>
          <div className="card-elevated p-4 text-center">
            <Sparkles size={18} className="mx-auto text-primary mb-2" />
            <p className="text-2xl font-semibold text-foreground tabular-nums">{tasbihLifetime}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Tasbih</p>
          </div>
        </motion.div>

        {/* Prayer Tracker Quick */}
        <motion.div variants={fadeUp} className="card-elevated p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium">Today's Prayers</p>
            <span className="text-[11px] text-muted-foreground tabular-nums font-mono">{todayProgress.prayersCompleted}/5</span>
          </div>
          <div className="flex items-center justify-between">
            {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((name) => {
              const done = !!(todayProgress.prayersDone && todayProgress.prayersDone[name]);
              return (
                <button key={name} onClick={() => togglePrayer(name)} className="flex flex-col items-center gap-1.5 tap-scale">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      done ? 'gradient-gold shadow-md' : 'bg-secondary/60 border border-border/40'
                    }`}
                  >
                    {done && <Check size={14} className="text-accent-foreground" strokeWidth={2.5} />}
                  </motion.div>
                  <span className={`text-[9px] font-medium ${done ? 'text-primary' : 'text-muted-foreground'}`}>{name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Ayah of the Day */}
        <motion.div variants={fadeUp} className="card-elevated p-6 mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium mb-4">Ayah of the Day</p>
          <p className="text-[22px] leading-[2.2] font-arabic text-foreground text-center" dir="rtl">
            {ayahOfDay.arabic}
          </p>
          <p className="text-[13px] text-muted-foreground text-center mt-3 leading-relaxed italic">
            "{ayahOfDay.english}"
          </p>
          <p className="text-[10px] text-primary/50 text-center mt-2">{ayahOfDay.ref}</p>
        </motion.div>

        {/* Dua of the Day */}
        <motion.div variants={fadeUp} className="card-elevated p-5 mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium mb-3">Dua of the Day</p>
          <p className="text-[13px] text-foreground/80 leading-[1.8]">{duaOfDay}</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
          {[
            { label: 'Quran', icon: BookOpen, path: '/quran', desc: 'Continue reading' },
            { label: 'Dhikr', icon: Sparkles, path: '/dhikr', desc: 'Morning adhkar' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="card-elevated p-5 text-left tap-scale group"
            >
              <item.icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
            </button>
          ))}
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
