import { motion } from 'framer-motion';

type Pose = 'standing' | 'bowing' | 'prostrating' | 'sitting' | 'hands-raised';

const transition = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const };

export default function PrayerIllustration({ pose }: { pose: Pose }) {
  const configs: Record<Pose, { body: string; headY: number; bodyRotate: number; legsD: string }> = {
    'hands-raised': { body: 'M50,35 L50,65', headY: 28, bodyRotate: 0, legsD: 'M50,65 L40,95 M50,65 L60,95' },
    standing: { body: 'M50,35 L50,65', headY: 28, bodyRotate: 0, legsD: 'M50,65 L40,95 M50,65 L60,95' },
    bowing: { body: 'M50,45 L50,65', headY: 38, bodyRotate: 45, legsD: 'M50,65 L40,95 M50,65 L60,95' },
    prostrating: { body: 'M35,55 L55,65', headY: 52, bodyRotate: 70, legsD: 'M55,65 L65,80 Q70,85 65,90 M55,65 L60,80' },
    sitting: { body: 'M50,40 L50,60', headY: 33, bodyRotate: 0, legsD: 'M50,60 L40,75 Q38,85 45,85 M50,60 L60,75 Q62,85 55,85' },
  };

  const c = configs[pose];

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-32 h-32 opacity-60">
        {/* Head */}
        <motion.circle
          cx={50} animate={{ cy: c.headY }} r={8}
          fill="none" stroke="hsl(var(--gold))" strokeWidth={1.5}
          transition={transition}
        />
        {/* Body */}
        <motion.g animate={{ rotate: c.bodyRotate, originX: '50%', originY: '65%' }} transition={transition}>
          <motion.path d={c.body} fill="none" stroke="hsl(var(--gold))" strokeWidth={1.5} strokeLinecap="round" />
          {/* Arms for hands-raised */}
          {pose === 'hands-raised' ? (
            <>
              <motion.path d="M50,42 L35,30" fill="none" stroke="hsl(var(--gold))" strokeWidth={1.5} strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              <motion.path d="M50,42 L65,30" fill="none" stroke="hsl(var(--gold))" strokeWidth={1.5} strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            </>
          ) : (
            <>
              <motion.path d="M50,45 L35,55" fill="none" stroke="hsl(var(--gold))" strokeWidth={1.5} strokeLinecap="round" />
              <motion.path d="M50,45 L65,55" fill="none" stroke="hsl(var(--gold))" strokeWidth={1.5} strokeLinecap="round" />
            </>
          )}
        </motion.g>
        {/* Legs */}
        <motion.path
          animate={{ d: c.legsD }} fill="none" stroke="hsl(var(--gold))" strokeWidth={1.5} strokeLinecap="round"
          transition={transition}
        />
      </svg>
    </div>
  );
}
