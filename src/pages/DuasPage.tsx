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
      <header className="mb-8">
        <h1 className="text-[28px] font-semibold text-foreground tracking-tight">Duas & Azkar</h1>
        <p className="text-sm text-muted-foreground mt-2">Daily supplications & remembrance</p>
      </header>

      {/* Search */}
      <div className="relative mb-8">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search duas & azkar..."
          className="w-full bg-secondary/30 border border-border/40 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-10">
        {(['duas', 'azkar'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all duration-300 tap-scale ${
              tab === t ? 'gradient-gold text-accent-foreground' : 'bg-secondary/30 text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'duas' ? 'Duas' : 'Azkar'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
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
    </PageWrapper>
  );
}
