import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import DuaAudioButton from '@/components/DuaAudioButton';
import { type DuaCategory } from '@/data/duas';

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

interface Props {
  category: DuaCategory;
  onBack: () => void;
}

export default function DuaDetailView({ category, onBack }: Props) {
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
          <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">{category.duas.length} duas</p>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
        {category.duas.map((dua, idx) => (
          <motion.div 
            key={dua.id} 
            variants={fadeUp}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="card-glass p-7 hover:glow-emerald group"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <p className="text-xl font-arabic text-foreground leading-[2.2] text-right flex-1" dir="rtl">{dua.arabic}</p>
              <DuaAudioButton arabic={dua.arabic} />
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-light/20 to-transparent mb-4" />
            
            <p className="text-[12px] text-emerald-light/60 italic mb-3 font-medium">{dua.transliteration}</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">{dua.translation}</p>
            {dua.reference && (
              <p className="text-[11px] text-emerald-light/40 mt-4 pt-3 border-t border-white/5">— {dua.reference}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </PageWrapper>
  );
}
