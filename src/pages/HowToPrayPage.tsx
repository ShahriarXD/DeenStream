import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { PRAYER_GUIDES } from '@/data/prayerGuide';

const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function HowToPrayPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ name: string; videoId: string } | null>(null);

  if (selectedVideo) {
    return (
      <PageWrapper className="pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-[calc(100vh-6rem)]">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 rounded-2xl glass flex items-center justify-center tap-scale">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <h2 className="text-xl font-semibold text-foreground tracking-tight">{selectedVideo.name} Prayer</h2>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-secondary/20 border border-border/10">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&modestbranding=1`}
              title={`${selectedVideo.name} prayer tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="text-sm text-muted-foreground mt-6 text-center leading-relaxed">
            Watch the complete guide on how to pray {selectedVideo.name}
          </p>
        </motion.div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <header className="mb-10">
        <h1 className="text-[28px] font-semibold text-foreground tracking-tight">How to Pray</h1>
        <p className="text-sm text-muted-foreground mt-2">Watch video guides for each prayer</p>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
        {PRAYER_GUIDES.filter(p => p.videoId).map((prayer) => (
          <motion.button
            key={prayer.name}
            variants={fadeUp}
            onClick={() => setSelectedVideo({ name: prayer.name, videoId: prayer.videoId! })}
            className="w-full card-elevated p-6 text-left tap-scale flex items-center justify-between group hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center">
                <Play size={20} className="text-accent-foreground ml-0.5" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-foreground">{prayer.name}</p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  {prayer.rakaat} raka'at · {prayer.time}
                </p>
              </div>
            </div>
            <span className="text-[11px] text-gold/60 font-medium">Watch</span>
          </motion.button>
        ))}
      </motion.div>
    </PageWrapper>
  );
}
