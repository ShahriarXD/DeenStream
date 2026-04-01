import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import DuaAudioButton from '@/components/DuaAudioButton';
import { type AzkarCategory, type AzkarItem } from '@/data/duas';

const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

function AzkarCounter({ item }: { item: AzkarItem }) {
  const [count, setCount] = useState(0);
  const done = count >= item.count;
  const progress = Math.min(count / item.count, 1);

  return (
    <motion.div
      variants={fadeUp}
      className={`card-elevated p-6 transition-all duration-500 ${done ? 'opacity-40' : ''}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <p className="text-xl font-arabic text-foreground leading-[2.2] text-right flex-1" dir="rtl">{item.arabic}</p>
        <DuaAudioButton arabic={item.arabic} />
      </div>
      <p className="text-[12px] text-gold/70 italic mb-2">{item.transliteration}</p>
      <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">{item.translation}</p>
      {item.reference && <p className="text-[11px] text-muted-foreground/40 mb-4">— {item.reference}</p>}

      {/* Progress + Counter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-[3px] bg-secondary/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-[11px] text-muted-foreground font-mono tabular-nums w-12 text-right">
          {count}/{item.count}
        </span>
        <button
          onClick={() => !done && setCount(c => c + 1)}
          disabled={done}
          className="px-5 py-2.5 rounded-2xl text-[12px] font-medium tap-scale transition-all duration-200 disabled:opacity-30 gradient-gold text-accent-foreground"
        >
          {done ? 'Done ✓' : 'Count'}
        </button>
      </div>
    </motion.div>
  );
}

interface Props {
  category: AzkarCategory;
  onBack: () => void;
}

export default function AzkarDetailView({ category, onBack }: Props) {
  return (
    <PageWrapper>
      <header className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center tap-scale">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{category.emoji} {category.title}</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">{category.items.length} adhkar — tap to count</p>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
        {category.items.map((item) => (
          <AzkarCounter key={item.id} item={item} />
        ))}
      </motion.div>
    </PageWrapper>
  );
}
