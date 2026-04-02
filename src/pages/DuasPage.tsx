import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import DuaAudioButton from '@/components/DuaAudioButton';
import DuaCategoryList from '@/components/DuaCategoryList';
import DuaDetailView from '@/components/DuaDetailView';
import AzkarDetailView from '@/components/AzkarDetailView';
import { DUA_CATEGORIES, AZKAR_CATEGORIES, type DuaCategory, type AzkarCategory } from '@/data/duas';

type Tab = 'duas' | 'azkar';

export default function DuasPage() {
  const [tab, setTab] = useState<Tab>('duas');
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<DuaCategory | null>(null);
  const [selectedAzkarCategory, setSelectedAzkarCategory] = useState<AzkarCategory | null>(null);
  const [search, setSearch] = useState('');

  const filteredDuas = DUA_CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.duas.some(d => d.translation.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredAzkar = AZKAR_CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.items.some(a => a.translation.toLowerCase().includes(search.toLowerCase()))
  );

  if (selectedDuaCategory) {
    return <DuaDetailView category={selectedDuaCategory} onBack={() => setSelectedDuaCategory(null)} />;
  }

  if (selectedAzkarCategory) {
    return <AzkarDetailView category={selectedAzkarCategory} onBack={() => setSelectedAzkarCategory(null)} />;
  }

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <header className="mb-8">
          <h1 className="text-[28px] font-semibold text-foreground tracking-tight">Duas & Azkar</h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">Daily supplications & remembrance</p>
        </header>

        {/* Search */}
        <div className="relative mb-8 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-light/40 group-focus-within:text-emerald-light transition-colors" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search duas & azkar..."
            className="form-input w-full pl-11 pr-4 py-4 text-sm placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-emerald-light/20 focus:border-emerald-light/30"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 glass rounded-2xl">
          {(['duas', 'azkar'] as Tab[]).map((t) => (
            <motion.button
              key={t}
              onClick={() => setTab(t)}
              layout
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 tap-scale ${
                tab === t 
                  ? 'bg-gradient-emerald text-foreground shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'duas' ? 'Duas' : 'Azkar'}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {tab === 'duas' ? (
            <DuaCategoryList
              key="duas"
              categories={filteredDuas}
              type="duas"
              onSelect={(cat) => setSelectedDuaCategory(cat as DuaCategory)}
            />
          ) : (
            <DuaCategoryList
              key="azkar"
              categories={filteredAzkar}
              type="azkar"
              onSelect={(cat) => setSelectedAzkarCategory(cat as AzkarCategory)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </PageWrapper>
  );
}
