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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <header className="mb-8">
          <h1 className="text-[26px] font-semibold text-foreground tracking-tight">القرآن الكريم</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">The Noble Quran</p>
        </header>

        {/* Continue reading */}
        {lastReadSurah > 1 && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedSurah(lastReadSurah)}
            className="w-full card-glass glow-emerald-strong p-6 mb-4 flex items-center gap-4 tap-scale text-left group hover:glow-emerald-strong active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-emerald flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
              <BookOpen size={20} className="text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-emerald-light/70 uppercase tracking-[0.2em] font-semibold">Continue Reading</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">Surah {lastReadSurah}</p>
            </div>
            <motion.div whileHover={{ x: 4 }}>
              <ChevronRight size={18} className="text-emerald-light/60 group-hover:text-emerald-light transition-colors" />
            </motion.div>
          </motion.button>
        )}

        {loading ? (
          <div className="space-y-2">{Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} lines={1} />)}</div>
        ) : (
          <div className="space-y-1.5">
            {surahs.map((s, i) => (
              <motion.button
                key={s.number}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.01, 0.3) }}
                onClick={() => setSelectedSurah(s.number)}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl glass hover:glass-light transition-all duration-300 tap-scale text-left group active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-[11px] font-semibold text-emerald-light tabular-nums group-hover:scale-110 transition-transform">
                  {s.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate tracking-tight">{s.englishName}</p>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5 font-medium">{s.englishNameTranslation}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-arabic text-emerald-light leading-tight">{s.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{s.numberOfAyahs} ayahs</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </PageWrapper>
  );
}
