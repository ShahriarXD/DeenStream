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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full flex flex-col items-center justify-center"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-light/60 mb-6 font-semibold">Tasbih Counter</p>

        <p className="text-4xl font-arabic text-emerald-light mb-12 leading-relaxed drop-shadow-lg">{currentDhikr}</p>

        <div className="flex gap-3 mb-16 glass rounded-2xl p-2">
          {MODES.map((m) => (
            <motion.button
              key={m.value}
              onClick={() => { setTasbihMode(m.value); resetTasbih(); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                tasbihMode === m.value
                  ? 'bg-gradient-emerald text-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m.label}
            </motion.button>
          ))}
        </div>

        <div className="relative mb-12">
          <motion.button
            animate={controls}
            onClick={handleTap}
            className="relative w-64 h-64 rounded-full flex items-center justify-center select-none tap-scale"
            style={{
              background: `conic-gradient(hsl(160 90% 55%) ${progress}%, hsl(160 20% 10%) ${progress}%)`,
              boxShadow: `inset 0 0 60px rgba(0,0,0,0.3), 0 0 40px rgba(160, 200, 150, ${progress / 100 * 0.3})`
            }}
          >
            <motion.div 
              className="absolute inset-[8px] rounded-full glass-strong flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                key={tasbihCount}
                initial={{ scale: 1.2, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-6xl font-bold text-foreground tabular-nums leading-none drop-shadow-lg"
              >
                {tasbihCount}
              </motion.span>
              {tasbihMode > 0 && (
                <span className="text-sm text-muted-foreground mt-3 font-mono tabular-nums font-medium">/ {tasbihMode}</span>
              )}
              {completed && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-emerald-light mt-4 font-bold tracking-wider"
                >
                  ✓ COMPLETED
                </motion.span>
              )}
            </motion.div>
          </motion.button>
        </div>

        <motion.button
          onClick={resetTasbih}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-light hover:bg-white/10 px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold"
        >
          <RotateCcw size={16} /> Reset
        </motion.button>
      </motion.div>
    </PageWrapper>
  );
}
