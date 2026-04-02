import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check, RotateCcw } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { useAppStore } from '@/stores/useAppStore';

interface DhikrItem {
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
}

const MORNING_ADHKAR: DhikrItem[] = [
  { arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', transliteration: 'Asbahna wa asbahal mulku lillah', translation: 'We have entered the morning and the dominion belongs to Allah.', count: 1 },
  { arabic: 'سُبْحَانَ ٱللَّهِ وَبِحَمْدِهِ', transliteration: 'SubhanAllahi wa bihamdihi', translation: 'Glory be to Allah and His is the praise.', count: 33 },
  { arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', transliteration: 'La ilaha illallahu wahdahu la sharika lah', translation: 'There is no god but Allah alone, with no partner.', count: 10 },
  { arabic: 'أَسْتَغْفِرُ ٱللَّهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness from Allah.', count: 33 },
  { arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', transliteration: 'Allahumma salli ala Muhammad', translation: 'O Allah, send blessings upon Muhammad.', count: 10 },
];

const EVENING_ADHKAR: DhikrItem[] = [
  { arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ', transliteration: 'Amsayna wa amsal mulku lillah', translation: 'We have entered the evening and the dominion belongs to Allah.', count: 1 },
  { arabic: 'سُبْحَانَ ٱللَّهِ وَبِحَمْدِهِ', transliteration: 'SubhanAllahi wa bihamdihi', translation: 'Glory be to Allah and His is the praise.', count: 33 },
  { arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ', transliteration: "A'udhu bikalimatiLlahit-tammat", translation: 'I seek refuge in the perfect words of Allah.', count: 3 },
  { arabic: 'بِسْمِ ٱللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ', transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un', translation: 'In the name of Allah, with whose name nothing can harm.', count: 3 },
  { arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ العَفْوَ وَالعَافِيَةَ', transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyah", translation: 'O Allah, I ask You for pardon and well-being.', count: 3 },
];

const AFTER_PRAYER: DhikrItem[] = [
  { arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness from Allah.', count: 3 },
  { arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', translation: 'Glory be to Allah.', count: 33 },
  { arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', translation: 'Praise be to Allah.', count: 33 },
  { arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', translation: 'Allah is the Greatest.', count: 33 },
  { arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', transliteration: 'La ilaha illallahu wahdahu la sharika lah', translation: 'There is no god but Allah alone with no partner.', count: 1 },
];

const SLEEP_DHIKR: DhikrItem[] = [
  { arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', translation: 'Glory be to Allah.', count: 33 },
  { arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', translation: 'Praise be to Allah.', count: 33 },
  { arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', translation: 'Allah is the Greatest.', count: 34 },
];

interface SessionConfig {
  type: string;
  label: string;
  arabicLabel: string;
  emoji: string;
  items: DhikrItem[];
}

const SESSIONS: SessionConfig[] = [
  { type: 'morning', label: 'Morning Adhkar', arabicLabel: 'أذكار الصباح', emoji: '🌅', items: MORNING_ADHKAR },
  { type: 'evening', label: 'Evening Adhkar', arabicLabel: 'أذكار المساء', emoji: '🌙', items: EVENING_ADHKAR },
  { type: 'after-prayer', label: 'After Prayer', arabicLabel: 'أذكار بعد الصلاة', emoji: '🤲', items: AFTER_PRAYER },
  { type: 'sleep', label: 'Before Sleep', arabicLabel: 'أذكار النوم', emoji: '😴', items: SLEEP_DHIKR },
];

export default function DhikrPage() {
  const [session, setSession] = useState<SessionConfig | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { markDhikrCompleted } = useAppStore();

  const adhkar = session?.items || [];
  const currentItem = session ? adhkar[currentIndex] : null;
  const totalItems = adhkar.length;
  const overallProgress = session ? ((currentIndex + (currentCount / (currentItem?.count || 1))) / totalItems) * 100 : 0;

  const handleTap = useCallback(() => {
    if (!currentItem || completed) return;
    const newCount = currentCount + 1;
    if (newCount >= currentItem.count) {
      if (currentIndex + 1 >= totalItems) {
        setCompleted(true);
        markDhikrCompleted();
      } else {
        setCurrentIndex(currentIndex + 1);
        setCurrentCount(0);
      }
    } else {
      setCurrentCount(newCount);
    }
  }, [currentItem, currentCount, currentIndex, totalItems, completed, markDhikrCompleted]);

  const reset = () => {
    setSession(null);
    setCurrentIndex(0);
    setCurrentCount(0);
    setCompleted(false);
  };

  // Session selection
  if (!session) {
    const hour = new Date().getHours();
    const suggestedType = hour < 15 ? 'morning' : hour < 20 ? 'evening' : 'sleep';

    return (
      <PageWrapper className="flex flex-col">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex-1">
          <header className="mb-10">
            <h1 className="text-[26px] font-semibold text-foreground tracking-tight">Guided Dhikr</h1>
            <p className="text-sm text-muted-foreground mt-1.5 font-medium">Daily remembrance of Allah</p>
          </header>

          <div className="space-y-4 flex-1">
            {SESSIONS.map((s, i) => (
              <motion.button
                key={s.type}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSession(s)}
                className={`w-full card-glass p-7 text-left tap-scale flex items-center justify-between hover:glow-emerald transition-all active:scale-95 ${
                  s.type === suggestedType ? 'glow-emerald-strong border-emerald-light/30' : ''
                }`}
              >
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {s.emoji} {s.label}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1 font-medium">
                    {s.arabicLabel} · {s.items.length} dhikr
                  </p>
                  {s.type === suggestedType && (
                    <span className="inline-block mt-2 text-[10px] text-emerald-light font-semibold uppercase tracking-wider bg-emerald-light/10 px-2 py-1 rounded">Suggested</span>
                  )}
                </div>
                <motion.div whileHover={{ x: 4 }}>
                  <ChevronRight size={20} className="text-emerald-light/60 group-hover:text-emerald-light transition-colors" />
                </motion.div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </PageWrapper>
    );
  }

  // Completed
  if (completed) {
    return (
      <PageWrapper className="flex flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="w-24 h-24 rounded-full bg-gradient-emerald flex items-center justify-center mx-auto mb-8 shadow-lg glow-emerald-strong">
            <Check size={40} className="text-foreground font-bold" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Alhamdulillah</h2>
          <p className="text-sm text-muted-foreground mb-8 font-medium">{session.label} finished. May Allah accept.</p>
          <motion.button 
            onClick={reset} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-emerald-light hover:text-emerald-light/80 tap-scale mx-auto font-semibold"
          >
            <RotateCcw size={16} /> Back to selection
          </motion.button>
        </motion.div>
      </PageWrapper>
    );
  }

  // Active session
  return (
    <PageWrapper className="flex flex-col">
      <header className="flex items-center gap-3 mb-6">
        <button onClick={reset} className="w-10 h-10 rounded-2xl glass flex items-center justify-center tap-scale">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{session.label}</p>
          <p className="text-[11px] text-muted-foreground">{currentIndex + 1} of {totalItems}</p>
        </div>
      </header>

      <div className="w-full h-1 rounded-full bg-secondary mb-8 overflow-hidden">
        <motion.div className="h-full rounded-full gradient-gold" animate={{ width: `${overallProgress}%` }} transition={{ duration: 0.3 }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence>
          <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full">
            <p className="text-[26px] leading-[2.2] font-arabic text-foreground mb-6" dir="rtl">{currentItem?.arabic}</p>
            <p className="text-[13px] text-gold-light/80 italic mb-2">{currentItem?.transliteration}</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{currentItem?.translation}</p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleTap}
          className="mt-10 w-32 h-32 rounded-full flex items-center justify-center select-none"
          style={{
            background: `conic-gradient(hsl(38 92% 50%) ${(currentCount / (currentItem?.count || 1)) * 100}%, hsl(160 20% 10%) ${(currentCount / (currentItem?.count || 1)) * 100}%)`,
          }}
        >
          <div className="absolute w-[118px] h-[118px] rounded-full bg-background flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-foreground tabular-nums">{currentCount}</span>
            <span className="text-[11px] text-muted-foreground">/ {currentItem?.count}</span>
          </div>
        </motion.button>
        <p className="text-[11px] text-muted-foreground mt-6">Tap to count</p>
      </div>
    </PageWrapper>
  );
}
