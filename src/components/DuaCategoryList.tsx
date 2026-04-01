import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { type DuaCategory, type AzkarCategory } from '@/data/duas';

const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
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
      transition={{ duration: 0.2 }}
      className="space-y-3"
    >
      {categories.map((cat) => {
        const count = 'duas' in cat ? cat.duas.length : cat.items.length;
        const label = 'duas' in cat ? 'duas' : 'adhkar';

        return (
          <motion.button
            key={cat.id}
            variants={fadeUp}
            onClick={() => onSelect(cat)}
            className="w-full card-elevated p-6 text-left tap-scale flex items-center justify-between group hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-secondary/40 flex items-center justify-center">
                <span className="text-xl">{cat.emoji}</span>
              </div>
              <div>
                <p className="text-[15px] font-medium text-foreground">{cat.title}</p>
                <p className="text-[12px] text-muted-foreground mt-1">{count} {label}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
          </motion.button>
        );
      })}
      {categories.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-12">No results found</p>
      )}
    </motion.div>
  );
}
