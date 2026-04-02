import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Check, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import SkeletonCard from '@/components/SkeletonCard';
import { useAppStore } from '@/stores/useAppStore';

interface PrayerTimes {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string;
}

type TrackablePrayer = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

const PRAYER_NAMES: (keyof PrayerTimes)[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const TRACKABLE: TrackablePrayer[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_ARABIC: Record<string, string> = {
  Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر',
  Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء',
};

function parseTime(t: string): Date {
  const [h, m] = t.split(':').map(Number);
  const d = new Date(); d.setHours(h, m, 0, 0); return d;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '—';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m ${String(s).padStart(2, '0')}s`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function PrayerPage() {
  const navigate = useNavigate();
  const { location, setLocation, todayProgress, togglePrayer } = useAppStore();
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

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
    return { name: 'Fajr' as keyof PrayerTimes, time: parseTime(times.Fajr) };
  }, [times, now]);

  const countdown = nextPrayer ? Math.max(0, nextPrayer.time.getTime() - now.getTime()) : 0;
  const prayersDone = todayProgress.prayersDone || {};

  return (
    <PageWrapper>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <header className="mb-8">
          <div className="flex items-baseline justify-between">
            <h1 className="text-[26px] font-semibold text-foreground tracking-tight">Prayer Times</h1>
            {city && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <MapPin size={12} strokeWidth={2} /> {city}
              </p>
            )}
          </div>
        </header>

        {loading ? (
          <div className="space-y-4"><SkeletonCard lines={2} /><SkeletonCard lines={4} /></div>
        ) : (
          <>
            {/* Next Prayer Hero */}
            {nextPrayer && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="card-glass glow-emerald-strong p-8 mb-8 text-center group hover:glow-emerald-strong active:scale-95 transition-all"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-light/70 mb-4 font-semibold">Next Prayer</p>
                <p className="text-5xl font-bold text-emerald-light font-arabic leading-tight drop-shadow-lg">{PRAYER_ARABIC[nextPrayer.name]}</p>
                <p className="text-base font-semibold text-foreground mt-3">{nextPrayer.name}</p>
                <div className="flex items-center justify-center gap-2.5 mt-5 bg-white/5 w-fit mx-auto px-4 py-2.5 rounded-xl">
                  <Clock size={14} className="text-emerald-light" />
                  <span className="text-sm font-mono tabular-nums text-foreground tracking-wide font-semibold">{formatCountdown(countdown)}</span>
                </div>
              </motion.div>
            )}

            {/* Prayer Tracker */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5 px-1">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-emerald-light/60 font-semibold">Today's Prayers</h2>
                <span className="text-[11px] text-muted-foreground tabular-nums font-mono bg-white/5 px-3 py-1.5 rounded-lg font-semibold">{todayProgress.prayersCompleted}/5</span>
              </div>
              <motion.div className="flex items-center justify-between gap-2.5 glass rounded-2xl p-3">
                {TRACKABLE.map((name, idx) => {
                  const done = !!prayersDone[name];
                  return (
                    <motion.button
                      key={name}
                      onClick={() => togglePrayer(name)}
                      className="flex-1 flex flex-col items-center gap-1.5 tap-scale group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        whileTap={{ scale: 0.85 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                          done 
                            ? 'bg-gradient-emerald border-emerald-light/50 shadow-lg glow-emerald' 
                            : 'glass-light border-white/10 group-hover:border-emerald-light/30'
                        }`}
                      >
                        {done && <Check size={18} className="text-foreground font-bold" strokeWidth={3} />}
                      </motion.div>
                      <span className={`text-[9px] font-semibold transition-colors ${done ? 'text-emerald-light' : 'text-muted-foreground'}`}>
                        {name}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Prayer List */}
            <div className="space-y-2">
              {times && PRAYER_NAMES.map((name, i) => {
                const isNext = nextPrayer?.name === name;
                return (
                  <motion.div
                    key={name}
                    variants={fadeUp}
                    initial=" hidden"
                    animate="show"
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
                      isNext ? 'card-glass glow-emerald group hover:glow-emerald-strong' : 'glass hover:glass-light'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold ${
                        isNext ? 'bg-gradient-emerald text-foreground' : 'glass-light text-emerald-light'
                      }`}>
                        <span className="font-arabic">{PRAYER_ARABIC[name].charAt(0)}</span>
                      </div>
                      <div>
                        <p className={`font-semibold text-sm tracking-tight transition-colors ${isNext ? 'text-emerald-light' : 'text-foreground'}`}>{name}</p>
                        <p className="text-[11px] text-muted-foreground font-arabic">{PRAYER_ARABIC[name]}</p>
                      </div>
                    </div>
                    <p className={`font-mono text-sm tabular-nums tracking-wide font-semibold transition-colors ${isNext ? 'text-emerald-light glow-emerald' : 'text-foreground/70'}`}>
                      {times[name]}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* How to Pray link */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate('/how-to-pray')}
              className="w-full card-glass p-6 mt-8 text-left tap-scale flex items-center gap-4 group hover:glow-emerald active:scale-95 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-emerald flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <BookOpen size={20} className="text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Learn How to Pray</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Step-by-step guide for each salah</p>
              </div>
            </motion.button>
          </>
        )}
      </motion.div>
    </PageWrapper>
  );
}
