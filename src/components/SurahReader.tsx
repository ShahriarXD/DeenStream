import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import PageWrapper from './PageWrapper';
import SkeletonCard from './SkeletonCard';
import { useAppStore } from '@/stores/useAppStore';

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation?: string;
  audio?: string;
}

export default function SurahReader({ surahNumber, onBack }: { surahNumber: number; onBack: () => void }) {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [surahName, setSurahName] = useState('');
  const [surahArabicName, setSurahArabicName] = useState('');
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const { setLastRead } = useAppStore();

  useEffect(() => {
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`).then((r) => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`).then((r) => r.json()),
    ])
      .then(([arabic, english]) => {
        setSurahName(arabic.data.englishName);
        setSurahArabicName(arabic.data.name);
        const merged = arabic.data.ayahs.map((a: any, i: number) => ({
          number: a.number,
          numberInSurah: a.numberInSurah,
          text: a.text,
          translation: english.data.ayahs[i]?.text || '',
          audio: a.audio,
        }));
        setAyahs(merged);
        setLastRead(surahNumber, 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [surahNumber, setLastRead]);

  const playAyah = useCallback((ayahNum: number) => {
    const ayah = ayahs.find((a) => a.numberInSurah === ayahNum);
    if (!ayah?.audio) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }

    const audio = new Audio(ayah.audio);
    audioRef.current = audio;
    setPlayingAyah(ayahNum);
    setIsPlaying(true);

    // Scroll to ayah
    const el = ayahRefs.current.get(ayahNum);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    audio.play().catch(() => setIsPlaying(false));

    audio.onended = () => {
      setIsPlaying(false);
      if (autoPlay && ayahNum < ayahs.length) {
        setTimeout(() => playAyah(ayahNum + 1), 400);
      } else {
        setPlayingAyah(null);
      }
    };
  }, [ayahs, autoPlay]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      if (ayahs.length > 0) playAyah(1);
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, ayahs, playAyah]);

  const skipNext = useCallback(() => {
    const current = playingAyah || 0;
    if (current < ayahs.length) playAyah(current + 1);
  }, [playingAyah, ayahs, playAyah]);

  const skipPrev = useCallback(() => {
    const current = playingAyah || 2;
    if (current > 1) playAyah(current - 1);
  }, [playingAyah, playAyah]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <PageWrapper>
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center tap-scale hover:bg-secondary/60 transition-colors duration-200">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">{surahName}</h1>
          <p className="text-xs text-muted-foreground tracking-wide">Surah {surahNumber}</p>
        </div>
        <p className="text-lg font-arabic text-gold-light">{surahArabicName}</p>
      </header>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} lines={3} />)}</div>
      ) : (
        <>
          {/* Audio Player Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-elevated p-4 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0">
                  <Volume2 size={16} className="text-accent-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {playingAyah ? `Ayah ${playingAyah}` : 'Audio Recitation'}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Mishary Rashid Alafasy</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={skipPrev} className="w-9 h-9 rounded-xl flex items-center justify-center tap-scale hover:bg-secondary/60 transition-colors">
                  <SkipBack size={16} className="text-muted-foreground" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-2xl gradient-gold flex items-center justify-center tap-scale"
                >
                  {isPlaying ? (
                    <Pause size={18} className="text-accent-foreground" />
                  ) : (
                    <Play size={18} className="text-accent-foreground ml-0.5" />
                  )}
                </button>
                <button onClick={skipNext} className="w-9 h-9 rounded-xl flex items-center justify-center tap-scale hover:bg-secondary/60 transition-colors">
                  <SkipForward size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Auto-play toggle */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              <span className="text-[11px] text-muted-foreground font-medium">Continuous Playback</span>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`w-10 h-[22px] rounded-full transition-all duration-300 relative ${
                  autoPlay ? 'bg-gold' : 'bg-secondary'
                }`}
              >
                <motion.div
                  animate={{ x: autoPlay ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-foreground"
                />
              </button>
            </div>
          </motion.div>

          {/* Bismillah */}
          {surahNumber !== 1 && surahNumber !== 9 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-2xl font-arabic text-gold py-6 mb-4"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </motion.p>
          )}

          {/* Ayahs */}
          <div className="space-y-3">
            <AnimatePresence>
              {ayahs.map((ayah, i) => {
                const isActive = playingAyah === ayah.numberInSurah;
                return (
                  <motion.div
                    key={ayah.number}
                    ref={(el) => { if (el) ayahRefs.current.set(ayah.numberInSurah, el); }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(i * 0.02, 0.6) }}
                    className={`rounded-2xl p-5 transition-all duration-300 ${
                      isActive ? 'card-elevated glow-gold' : 'glass hover:bg-secondary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Ayah number + play button */}
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <span className="w-8 h-8 rounded-xl bg-secondary/80 flex items-center justify-center text-[11px] font-semibold text-gold tabular-nums">
                          {ayah.numberInSurah}
                        </span>
                        <button
                          onClick={() => playAyah(ayah.numberInSurah)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center tap-scale transition-all duration-200 ${
                            isActive ? 'gradient-gold' : 'bg-secondary/50 hover:bg-secondary'
                          }`}
                        >
                          {isActive && isPlaying ? (
                            <Pause size={12} className={isActive ? 'text-accent-foreground' : 'text-muted-foreground'} />
                          ) : (
                            <Play size={12} className={`ml-0.5 ${isActive ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                          )}
                        </button>
                      </div>

                      {/* Text content */}
                      <div className="flex-1 space-y-4">
                        <p
                          className={`text-[22px] leading-[2.4] font-arabic text-right transition-colors duration-300 ${
                            isActive ? 'text-gold' : 'text-foreground'
                          }`}
                          dir="rtl"
                        >
                          {ayah.text}
                        </p>
                        <div className="h-px bg-border/30" />
                        <p className="text-[13px] leading-[1.8] text-muted-foreground">{ayah.translation}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </>
      )}
    </PageWrapper>
  );
}
