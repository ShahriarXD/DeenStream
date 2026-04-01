import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import SkeletonCard from '@/components/SkeletonCard';
import { useAppStore } from '@/stores/useAppStore';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

const SurahReader = lazy(() => import('@/components/SurahReader'));

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const { lastReadSurah } = useAppStore();

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then((r) => r.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (selectedSurah) {
    return (
      <Suspense fallback={<PageWrapper><SkeletonCard lines={5} /></PageWrapper>}>
        <SurahReader surahNumber={selectedSurah} onBack={() => setSelectedSurah(null)} />
      </Suspense>
    );
  }

  return (
    <PageWrapper>
      <header className="mb-8">
        <h1 className="text-[26px] font-semibold text-foreground tracking-tight">القرآن الكريم</h1>
        <p className="text-sm text-muted-foreground mt-1">The Noble Quran</p>
      </header>

      {/* Continue reading */}
      {lastReadSurah > 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedSurah(lastReadSurah)}
          className="w-full card-elevated glow-gold p-5 mb-8 flex items-center gap-4 tap-scale text-left"
        >
          <div className="w-11 h-11 rounded-2xl gradient-gold flex items-center justify-center flex-shrink-0">
            <BookOpen size={18} className="text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gold-light uppercase tracking-[0.2em] font-medium">Continue Reading</p>
            <p className="text-sm font-medium text-foreground mt-0.5">Surah {lastReadSurah}</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </motion.button>
      )}

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} lines={1} />)}</div>
      ) : (
        <div className="space-y-1">
          {surahs.map((s, i) => (
            <motion.button
              key={s.number}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.015, 0.4) }}
              onClick={() => setSelectedSurah(s.number)}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-secondary/30 transition-colors duration-200 tap-scale text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-secondary/60 flex items-center justify-center text-[11px] font-semibold text-gold tabular-nums group-hover:bg-secondary transition-colors">
                {s.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate tracking-tight">{s.englishName}</p>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{s.englishNameTranslation}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-arabic text-gold-light leading-tight">{s.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{s.numberOfAyahs} ayahs</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
