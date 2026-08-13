'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type ScrollSectionProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
};

export function ScrollSection({ children, ariaLabel, className = '', delay = 0 }: ScrollSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-label={ariaLabel}
      className={className}
      role="region"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.22 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
    >
      {children}
    </motion.section>
  );
}
