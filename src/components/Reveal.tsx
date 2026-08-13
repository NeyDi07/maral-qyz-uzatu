'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
};

const offsets = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: -30 },
  right: { x: 30 },
};

export function Reveal({ children, className = '', delay = 0, direction = 'up' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offsets[direction] }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.5 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
