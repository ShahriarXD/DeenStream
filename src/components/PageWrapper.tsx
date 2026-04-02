import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageWrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`min-h-screen px-5 pt-8 pb-32 max-w-lg mx-auto space-y-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
