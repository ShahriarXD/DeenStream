import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import DuaAudioButton from '@/components/DuaAudioButton';
import { type AzkarCategory, type AzkarItem } from '@/data/duas';

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function AzkarCounter({ item, idx }: { item: AzkarItem; idx: number }) {
  const [count, setCount] = useState(0);
  const done = count >= item.count;
  const progress = Math.min(count / item.count, 1);

  return (
    <motion.div
      variants={fadeUp}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className={`card-glass p-7 transition-all duration-500 group hover:glow-emerald ${done ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <p className="text-xl font-arabic text-foreground leading-[2.2] text-right flex-1" dir="rtl">{item.arabic}</p>
        <DuaAudioButton arabic={item.arabic} />
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-light/20 to-transparent mb-4" />
      
      <p className="text-[12px] text-emerald-light/60 italic mb-3 font-medium">{item.transliteration}</p>
      <p className="text-[13px] text-muted-foreground leading-relaxed mb-5 font-medium">{item.translation}</p>
      {item.reference && (
        <p className="text-[11px] text-emerald-light/40 mb-5 pb-3 border-b border-white/5">— {item.reference}</p>
      )}

      {/* Progress + Counter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-[4px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-emerald rounded-full shadow-lg"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className={`text-[11px] font-mono tabular-nums w-11 text-right transition-colors ${done ? 'text-emerald-light' : 'text-muted-foreground'}`}>
          {count}/{item.count}
        </span>
        <motion.button
          onClick={() => !done && setCount(c => c + 1)}
          disabled={done}
          whileHover={{ scale: done ? 1 : 1.05 }}
          whileTap={{ scale: done ? 1 : 0.95 }}
          className={`px-5 py-2.5 rounded-xl text-[12px] font-semibold tap-scale transition-all duration-200 ${
            done 
              ? 'glass text-emerald-light/50' 
              : 'bg-gradient-emerald text-foreground shadow-lg hover:shadow-xl'
          }`}
        >
          {done ? 'Done ✓' : 'Count'}
        </motion.button>
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
        <motion.button 
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-2xl glass flex items-center justify-center tap-scale hover:glow-emerald transition-all"
        >
          <ArrowLeft size={20} className="text-emerald-light" />
        </motion.button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{category.emoji} {category.title}</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">{category.items.length} adhkar — tap to count</p>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
        {category.items.map((item, idx) => (
          <AzkarCounter key={item.id} item={item} idx={idx} />
        ))}
      </motion.div>
    </PageWrapper>
  );
}
