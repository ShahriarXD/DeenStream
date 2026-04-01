import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageWrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={`min-h-screen px-5 pt-8 pb-28 max-w-lg mx-auto ${className}`}
    >
      {children}
    </motion.div>
  );
}
