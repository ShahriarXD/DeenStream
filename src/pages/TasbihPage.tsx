import { useCallback, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import { useAppStore } from '@/stores/useAppStore';
import { RotateCcw } from 'lucide-react';

const MODES = [
  { value: 33 as const, label: '33' },
  { value: 99 as const, label: '99' },
  { value: 0 as const, label: '∞' },
];

const DHIKR = ['سُبْحَانَ ٱللَّهِ', 'ٱلْحَمْدُ لِلَّهِ', 'ٱللَّهُ أَكْبَرُ'];

export default function TasbihPage() {
  const { tasbihCount, tasbihMode, setTasbihCount, setTasbihMode, resetTasbih, incrementTasbihLifetime } = useAppStore();
  const controls = useAnimation();
  const lastTap = useRef(0);

  const target = tasbihMode || Infinity;
  const progress = tasbihMode ? Math.min((tasbihCount / target) * 100, 100) : 0;
  const completed = tasbihMode > 0 && tasbihCount >= target;
  const currentDhikr = tasbihMode === 33 ? DHIKR[Math.floor(tasbihCount / 33) % 3] : DHIKR[0];

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 50) return;
    lastTap.current = now;

    if (!completed) {
      setTasbihCount(tasbihCount + 1);
      incrementTasbihLifetime();
      controls.start({
        scale: [1, 1.06, 1],
        transition: { duration: 0.12, ease: 'easeOut' },
      });
    }
  }, [tasbihCount, completed, controls, setTasbihCount, incrementTasbihLifetime]);

  return (
    <PageWrapper className="flex flex-col items-center justify-center text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 font-medium">Tasbih Counter</p>

      <p className="text-3xl font-arabic text-gold mb-10 leading-relaxed">{currentDhikr}</p>

      <div className="flex gap-2 mb-12">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => { setTasbihMode(m.value); resetTasbih(); }}
            className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 tap-scale ${
              tasbihMode === m.value
                ? 'gradient-gold text-accent-foreground shadow-lg'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <motion.button
        animate={controls}
        onClick={handleTap}
        className="relative w-56 h-56 rounded-full flex items-center justify-center select-none tap-scale"
        style={{
          background: `conic-gradient(hsl(38 92% 50%) ${progress}%, hsl(160 20% 10%) ${progress}%)`,
        }}
      >
        <div className="absolute inset-[5px] rounded-full bg-background flex flex-col items-center justify-center">
          <motion.span
            key={tasbihCount}
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-[52px] font-semibold text-foreground tabular-nums leading-none"
          >
            {tasbihCount}
          </motion.span>
          {tasbihMode > 0 && (
            <span className="text-sm text-muted-foreground mt-2 font-mono tabular-nums">/ {tasbihMode}</span>
          )}
          {completed && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gold mt-3 font-medium"
            >
              ✓ Completed
            </motion.span>
          )}
        </div>
      </motion.button>

      <button
        onClick={resetTasbih}
        className="mt-10 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tap-scale"
      >
        <RotateCcw size={14} /> Reset
      </button>
    </PageWrapper>
  );
}
