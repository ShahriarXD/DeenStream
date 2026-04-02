import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { type DuaCategory, type AzkarCategory } from '@/data/duas';

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface Props {
  categories: (DuaCategory | AzkarCategory)[];
  type: 'duas' | 'azkar';
  onSelect: (cat: DuaCategory | AzkarCategory) => void;
}

export default function DuaCategoryList({ categories, type, onSelect }: Props) {
  const direction = type === 'duas' ? -10 : 10;

  return (
    <motion.div
      initial={{ opacity: 0, x: direction }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -direction }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {categories.map((cat, idx) => {
        const count = 'duas' in cat ? cat.duas.length : cat.items.length;
        const label = 'duas' in cat ? 'duas' : 'adhkar';

        return (
          <motion.button
            key={cat.id}
            variants={fadeUp}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelect(cat)}
            className="w-full card-glass p-6 text-left tap-scale flex items-center justify-between group hover:glow-emerald transition-all active:scale-95"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{cat.emoji}</span>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-foreground">{cat.title}</p>
                <p className="text-[12px] text-muted-foreground mt-1 font-medium">{count} {label}</p>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <ChevronRight size={18} className="text-emerald-light/50 group-hover:text-emerald-light transition-colors" />
            </motion.div>
          </motion.button>
        );
      })}
      {categories.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-12 font-medium">No results found</p>
      )}
    </motion.div>
  );
}
