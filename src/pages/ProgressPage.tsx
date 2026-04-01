import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import ProgressRing from '@/components/ProgressRing';
import { useAppStore } from '@/stores/useAppStore';
import { Flame, BookOpen, Moon, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function ProgressPage() {
  const { currentStreak, todayProgress, weeklyHistory, tasbihLifetime } = useAppStore();
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const prayerPct = (todayProgress.prayersCompleted / 5) * 100;
  const quranPct = Math.min((todayProgress.quranMinutes / 30) * 100, 100);
  const tasbihPct = Math.min((todayProgress.tasbihTotal / 99) * 100, 100);

  const todayStr = today.toISOString().split('T')[0];

  // All progress data as a map
  const progressMap = useMemo(() => {
    const map: Record<string, { prayers: number; active: boolean }> = {};
    weeklyHistory.forEach(d => {
      map[d.date] = { prayers: d.prayersCompleted, active: d.prayersCompleted > 0 || d.tasbihTotal > 0 || d.dhikrCompleted };
    });
    if (todayProgress.date) {
      map[todayProgress.date] = {
        prayers: todayProgress.prayersCompleted,
        active: todayProgress.prayersCompleted > 0 || todayProgress.tasbihTotal > 0 || todayProgress.dhikrCompleted,
      };
    }
    return map;
  }, [weeklyHistory, todayProgress]);

  // Calendar grid
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  // Build 7-day view
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const data = dateStr === todayStr
      ? todayProgress
      : weeklyHistory.find((h) => h.date === dateStr);
    return {
      day: DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1],
      active: !!data && (data.prayersCompleted > 0 || data.tasbihTotal > 0 || data.dhikrCompleted),
      prayers: data?.prayersCompleted || 0,
    };
  });

  return (
    <PageWrapper>
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.header variants={fadeUp} className="mb-8">
          <h1 className="text-[26px] font-semibold text-foreground tracking-tight">Your Progress</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your daily ibadah</p>
        </motion.header>

        {/* Streak Banner */}
        <motion.div variants={fadeUp} className="card-elevated glow-gold p-6 mb-8 text-center">
          <Flame size={28} className="mx-auto text-gold mb-2" />
          <p className="text-5xl font-bold text-gold tabular-nums">{currentStreak}</p>
          <p className="text-sm text-foreground/70 mt-1 font-medium">Day Streak</p>
          <p className="text-[11px] text-muted-foreground mt-1">Keep it going! Open the app daily to maintain your streak.</p>
        </motion.div>

        {/* Today's Rings */}
        <motion.div variants={fadeUp} className="mb-8">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-gold/60 font-medium mb-4">Today</h2>
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-2">
              <ProgressRing progress={prayerPct} size={72} strokeWidth={5} color="hsl(38 92% 50%)">
                <Moon size={18} className="text-gold" />
              </ProgressRing>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{todayProgress.prayersCompleted}/5</p>
                <p className="text-[10px] text-muted-foreground">Prayers</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ProgressRing progress={quranPct} size={72} strokeWidth={5} color="hsl(160 70% 40%)">
                <BookOpen size={18} className="text-emerald-glow" />
              </ProgressRing>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{todayProgress.quranMinutes}m</p>
                <p className="text-[10px] text-muted-foreground">Quran</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ProgressRing progress={tasbihPct} size={72} strokeWidth={5} color="hsl(38 85% 65%)">
                <Sparkles size={18} className="text-gold-light" />
              </ProgressRing>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{todayProgress.tasbihTotal}</p>
                <p className="text-[10px] text-muted-foreground">Tasbih</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div variants={fadeUp} className="card-elevated p-5 mb-6">
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="w-8 h-8 rounded-xl bg-secondary/40 flex items-center justify-center tap-scale">
              <ChevronLeft size={15} className="text-muted-foreground" />
            </button>
            <h2 className="text-sm font-semibold text-foreground">{MONTHS[calMonth]} {calYear}</h2>
            <button onClick={nextMonth} className="w-8 h-8 rounded-xl bg-secondary/40 flex items-center justify-center tap-scale">
              <ChevronRight size={15} className="text-muted-foreground" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_SHORT.map(d => (
              <div key={d} className="text-center text-[9px] text-muted-foreground/60 font-medium uppercase">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`e-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const data = progressMap[dateStr];
              const isToday = dateStr === todayStr;
              const active = !!data?.active;
              const prayers = data?.prayers || 0;

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-[11px] font-medium transition-all ${
                    isToday
                      ? 'ring-1 ring-gold/50 bg-gold/10 text-gold'
                      : active
                      ? 'bg-gold/20 text-gold'
                      : 'text-muted-foreground/50'
                  }`}
                >
                  <span>{day}</span>
                  {active && (
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(prayers, 5) }, (_, j) => (
                        <div key={j} className="w-1 h-1 rounded-full bg-gold" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly View */}
        <motion.div variants={fadeUp} className="card-elevated p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-gold/60 font-medium">This Week</h2>
            <TrendingUp size={14} className="text-muted-foreground" />
          </div>
          <div className="flex items-end justify-between gap-1">
            {last7.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex flex-col items-center">
                  <div className="w-5 h-16 bg-secondary/50 rounded-lg overflow-hidden flex flex-col justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.prayers / 5) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`w-full rounded-lg ${d.active ? 'gradient-gold' : 'bg-secondary'}`}
                    />
                  </div>
                </div>
                <span className={`text-[9px] font-medium ${d.active ? 'text-gold' : 'text-muted-foreground/50'}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lifetime Stats */}
        <motion.div variants={fadeUp} className="card-elevated p-5">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-gold/60 font-medium mb-4">Lifetime</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-semibold text-foreground tabular-nums">{tasbihLifetime}</p>
              <p className="text-[11px] text-muted-foreground">Total Tasbih</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground tabular-nums">{currentStreak}</p>
              <p className="text-[11px] text-muted-foreground">Best Streak</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
