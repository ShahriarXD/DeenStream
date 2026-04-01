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
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
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
      <header className="mb-8">
        <div className="flex items-baseline justify-between">
          <h1 className="text-[26px] font-semibold text-foreground tracking-tight">Prayer Times</h1>
          {city && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin size={11} strokeWidth={2} /> {city}
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
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="card-elevated glow-gold p-7 mb-8 text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold-light/70 mb-3 font-medium">Next Prayer</p>
              <p className="text-4xl font-bold text-gold font-arabic leading-tight">{PRAYER_ARABIC[nextPrayer.name]}</p>
              <p className="text-base font-medium text-foreground/80 mt-2">{nextPrayer.name}</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Clock size={13} className="text-muted-foreground" />
                <span className="text-sm font-mono tabular-nums text-muted-foreground tracking-wide">{formatCountdown(countdown)}</span>
              </div>
            </motion.div>
          )}

          {/* Prayer Tracker */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-gold/60 font-medium">Today's Prayers</h2>
              <span className="text-[11px] text-muted-foreground tabular-nums font-mono">{todayProgress.prayersCompleted}/5</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              {TRACKABLE.map((name) => {
                const done = !!prayersDone[name];
                return (
                  <button
                    key={name}
                    onClick={() => togglePrayer(name)}
                    className="flex-1 flex flex-col items-center gap-2 tap-scale"
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        done ? 'gradient-gold glow-gold' : 'bg-secondary/40 border border-border/30'
                      }`}
                    >
                      {done && <Check size={16} className="text-accent-foreground" strokeWidth={2.5} />}
                    </motion.div>
                    <span className={`text-[10px] font-medium ${done ? 'text-gold' : 'text-muted-foreground'}`}>
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prayer List */}
          <div className="space-y-1.5">
            {times && PRAYER_NAMES.map((name, i) => {
              const isNext = nextPrayer?.name === name;
              return (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                    isNext ? 'card-elevated glow-emerald' : 'hover:bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
                      isNext ? 'gradient-gold' : 'bg-secondary/60'
                    }`}>
                      <span className="font-arabic text-sm">{PRAYER_ARABIC[name].charAt(0)}</span>
                    </div>
                    <div>
                      <p className={`font-medium text-sm tracking-tight ${isNext ? 'text-gold' : 'text-foreground'}`}>{name}</p>
                      <p className="text-[11px] text-muted-foreground font-arabic">{PRAYER_ARABIC[name]}</p>
                    </div>
                  </div>
                  <p className={`font-mono text-sm tabular-nums tracking-wide ${isNext ? 'text-gold font-semibold' : 'text-foreground/70'}`}>
                    {times[name]}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* How to Pray link */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/how-to-pray')}
            className="w-full card-elevated p-5 mt-6 text-left tap-scale flex items-center gap-4 group hover:bg-secondary/20 transition-colors"
          >
            <BookOpen size={18} className="text-gold" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Learn How to Pray</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Step-by-step guide for each salah</p>
            </div>
          </motion.button>
        </>
      )}
    </PageWrapper>
  );
}
