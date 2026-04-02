import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { HADITH_STORIES, HADITH_CATEGORIES, type HadithStory } from '@/data/hadithStories';

const AUTO_PROGRESS_MS = 8000;

/* ── Story Viewer (fullscreen immersive) ── */
function StoryViewer({ story, onClose }: { story: HadithStory; onClose: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const total = story.slides.length;
  const slide = story.slides[slideIndex];

  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (slideIndex < total - 1) setSlideIndex(i => i + 1);
      else onClose();
    }, AUTO_PROGRESS_MS);
  }, [slideIndex, total, onClose]);

  useEffect(() => { resetTimer(); return () => clearTimeout(timerRef.current); }, [resetTimer]);

  const handleTap = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    if (x < 0.3 && slideIndex > 0) setSlideIndex(i => i - 1);
    else if (slideIndex < total - 1) setSlideIndex(i => i + 1);
    else onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-[9999] bg-gradient-to-b ${story.gradient} flex flex-col`}
      onClick={handleTap}
    >
      {/* Progress bars */}
      <div className="flex gap-1 px-4 pt-[env(safe-area-inset-top,12px)] mt-3">
        {story.slides.map((_, i) => (
          <div key={i} className="flex-1 h-[2px] rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-white/80 rounded-full"
              initial={{ width: i < slideIndex ? '100%' : '0%' }}
              animate={{ width: i < slideIndex ? '100%' : i === slideIndex ? '100%' : '0%' }}
              transition={i === slideIndex ? { duration: AUTO_PROGRESS_MS / 1000, ease: 'linear' } : { duration: 0 }}
            />
          </div>
        ))}
      </div>

      {/* Close */}
      <div className="flex justify-between items-center px-5 py-4">
        <p className="text-[11px] text-white/50 font-medium tracking-wider uppercase">{story.category}</p>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <X size={16} className="text-white/70" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-md"
          >
            {slide.type === 'title' && (
              <>
                <p className="text-5xl mb-8">{story.emoji}</p>
                <h2 className="text-3xl font-semibold text-white tracking-tight leading-tight mb-4 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>{slide.text}</h2>
                {slide.subtext && <p className="text-base text-white drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>{slide.subtext}</p>}
              </>
            )}
            {slide.type === 'hadith' && (
              <>
                <p className="text-xl text-white leading-relaxed font-light italic mb-6 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>{slide.text}</p>
                {slide.subtext && <p className="text-sm text-gold drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>{slide.subtext}</p>}
              </>
            )}
            {slide.type === 'lesson' && (
              <>
                <p className="text-[11px] text-white uppercase tracking-widest mb-6 drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>Reflection</p>
                <p className="text-lg text-white leading-relaxed drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>{slide.text}</p>
              </>
            )}
            {slide.type === 'action' && (
              <>
                <p className="text-[11px] text-gold uppercase tracking-widest mb-6 drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>Today's Action</p>
                <p className="text-lg text-white leading-relaxed mb-8 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>{slide.text}</p>
                <p className="text-[10px] text-white drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>{story.source}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tap hint */}
      <div className="pb-[calc(env(safe-area-inset-bottom,20px)+2rem)] text-center">
        <p className="text-[10px] text-white/20">Tap to continue</p>
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function HadithStoriesPage() {
  const [activeStory, setActiveStory] = useState<HadithStory | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all' ? HADITH_STORIES : HADITH_STORIES.filter(s => s.category === activeCategory);

  return (
    <>
      <PageWrapper>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <header className="mb-8">
            <h1 className="text-[28px] font-semibold text-foreground tracking-tight">Hadith Stories</h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium">Timeless wisdom, one story at a time</p>
          </header>

          {/* Category pills */}
          <motion.div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1 no-scrollbar glass rounded-2xl p-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all tap-scale ${
                activeCategory === 'all' 
                  ? 'gradient-emerald text-foreground shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {HADITH_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all tap-scale ${
                  activeCategory === cat.id 
                    ? 'gradient-emerald text-foreground shadow-lg' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Story bubbles (horizontal) */}
          <motion.div className="flex gap-4 overflow-x-auto pb-6 -mx-1 px-1 no-scrollbar mb-8">
            {filtered.map(story => (
              <motion.button
                key={story.id}
                onClick={() => setActiveStory(story)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 flex-shrink-0 group transition-all duration-300"
              >
                <div className={`w-[80px] h-[80px] rounded-full bg-gradient-to-br ${story.gradient} border-2 border-white/20 flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 glass-light`}>
                  {story.emoji}
                </div>
                <span className="text-[11px] text-muted-foreground w-[80px] text-center truncate font-medium">{story.title}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Story cards */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
            className="space-y-4"
          >
            {filtered.map((story, idx) => (
              <motion.button
                key={story.id}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveStory(story)}
                className="w-full card-glass p-6 text-left tap-scale flex items-center gap-5 group hover:glow-emerald transition-all active:scale-95"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                  {story.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-foreground">{story.title}</p>
                  <p className="text-[12px] text-muted-foreground mt-1 truncate">{story.slides[1]?.text.slice(0, 60)}…</p>
                </div>
                <span className="text-[10px] text-muted-foreground/50 capitalize flex-shrink-0">{story.category}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </PageWrapper>

      <AnimatePresence>
        {activeStory && <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />}
      </AnimatePresence>
    </>
  );
}
