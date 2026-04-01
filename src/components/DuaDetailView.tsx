import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import DuaAudioButton from '@/components/DuaAudioButton';
import { type DuaCategory } from '@/data/duas';

const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

interface Props {
  category: DuaCategory;
  onBack: () => void;
}

export default function DuaDetailView({ category, onBack }: Props) {
  return (
    <PageWrapper>
      <header className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center tap-scale">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{category.emoji} {category.title}</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">{category.duas.length} duas</p>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
        {category.duas.map((dua) => (
          <motion.div key={dua.id} variants={fadeUp} className="card-elevated p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <p className="text-xl font-arabic text-foreground leading-[2.2] text-right flex-1" dir="rtl">{dua.arabic}</p>
              <DuaAudioButton arabic={dua.arabic} />
            </div>
            <p className="text-[12px] text-gold/70 italic mb-2">{dua.transliteration}</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{dua.translation}</p>
            {dua.reference && <p className="text-[11px] text-muted-foreground/40 mt-3">— {dua.reference}</p>}
          </motion.div>
        ))}
      </motion.div>
    </PageWrapper>
  );
}
