import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { NAMES_OF_ALLAH } from '@/data/namesOfAllah';

const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.015 } },
};

export default function NamesOfAllahPage() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = NAMES_OF_ALLAH.filter(
    (n) =>
      n.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      n.meaning.toLowerCase().includes(search.toLowerCase()) ||
      n.arabic.includes(search)
  );

  return (
    <PageWrapper>
      <header className="mb-6">
        <h1 className="text-[26px] font-semibold text-foreground tracking-tight">99 Names of Allah</h1>
        <p className="text-sm text-muted-foreground mt-1">أسماء الله الحسنى</p>
      </header>

      {/* Search */}
      <div className="relative mb-8">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or meaning..."
          className="w-full bg-secondary/30 border border-border/40 rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
        />
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 gap-3">
        {filtered.map((name) => (
          <motion.button
            key={name.number}
            variants={fadeUp}
            onClick={() => setExpandedId(expandedId === name.number ? null : name.number)}
            className={`card-elevated p-4 text-center tap-scale transition-all duration-300 ${
              expandedId === name.number ? 'glow-gold col-span-2' : ''
            }`}
          >
            <span className="text-[10px] text-muted-foreground/40 font-mono tabular-nums">{name.number}</span>
            <p className="text-[22px] font-arabic text-foreground mt-1 leading-relaxed" dir="rtl">{name.arabic}</p>
            <p className="text-[11px] text-gold mt-1 font-medium">{name.transliteration}</p>
            {expandedId === name.number && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-[12px] text-muted-foreground mt-2 leading-relaxed"
              >
                {name.meaning}
              </motion.p>
            )}
            {expandedId !== name.number && (
              <p className="text-[11px] text-muted-foreground/60 mt-1">{name.meaning}</p>
            )}
          </motion.button>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-10">No names found</p>
      )}
    </PageWrapper>
  );
}
