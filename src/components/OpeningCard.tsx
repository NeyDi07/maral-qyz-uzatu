'use client';

import { motion } from 'framer-motion';
import { invitation } from '@/data/invitation';

type OpeningCardProps = {
  onOpen: () => void;
  isAnimating: boolean;
};

export function OpeningCard({ onOpen, isAnimating }: OpeningCardProps) {
  const cardBackground = `url(${invitation.secondaryImage})`;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-6 py-10"
      animate={isAnimating ? { backgroundColor: 'rgba(16,8,11,0)' } : { backgroundColor: 'rgba(16,8,11,1)' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Lavender ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-16 top-1/4 h-56 w-56 rounded-full bg-lavender/12 blur-[80px]" />
        <div className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-lavender-soft/10 blur-[90px]" />
      </div>

      <motion.div
        className="opening-card relative flex min-h-[72vh] w-full max-w-[420px] items-center justify-center overflow-hidden border border-lavender/28 bg-[#0e080a]/80 px-7 py-10 text-center text-white shadow-[0_34px_110px_rgba(0,0,0,0.7)]"
        animate={isAnimating ? {
          scale: 1.03,
          boxShadow: '0 8px 55px rgba(200,173,212,0.12)',
        } : {
          scale: 1,
          boxShadow: '0 34px 110px rgba(0,0,0,0.7)',
        }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 -z-20 w-1/2 origin-left bg-cover"
          style={{ backgroundImage: cardBackground, backgroundPosition: 'left center', backgroundSize: '200% 100%' }}
          animate={isAnimating ? { x: '-112%', rotateY: -24, opacity: 0.96 } : { x: 0, rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 -z-20 w-1/2 origin-right bg-cover"
          style={{ backgroundImage: cardBackground, backgroundPosition: 'right center', backgroundSize: '200% 100%' }}
          animate={isAnimating ? { x: '112%', rotateY: 24, opacity: 0.96 } : { x: 0, rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,8,11,0.28),rgba(16,8,11,0.62))]"
          animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Corner frames — lavender accent */}
        <motion.div
          className="absolute left-5 top-5 h-14 w-14 border-l border-t border-lavender-soft/70"
          aria-hidden="true"
          animate={isAnimating ? { x: -30, y: -30, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute bottom-5 right-5 h-14 w-14 border-b border-r border-lavender-soft/70"
          aria-hidden="true"
          animate={isAnimating ? { x: 30, y: 30, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="relative z-10"
          animate={isAnimating ? { opacity: 0, y: -18, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.42em] text-lavender-soft/90">
            Qyz Uzatu
          </p>

          <h2 className="mt-5 font-display text-6xl italic leading-none tracking-tight text-white drop-shadow-[0_2px_14px_rgba(200,173,212,0.35)]">
            Марал
          </h2>

          {/* Visual separator — lavender line */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="inline-block h-px w-10 bg-lavender-soft/50" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lavender-soft" />
            <span className="inline-block h-px w-10 bg-lavender-soft/50" />
          </div>

          <p className="mt-4 font-display text-3xl italic text-lavender-soft">
            Қыз ұзату
          </p>

          {/* Heart ornament moved here with lavender tone */}
          <div
            className="main-ornament-mask mx-auto mb-6 mt-6 h-16 w-16 bg-lavender-soft shadow-[0_0_24px_rgba(200,173,212,0.45)]"
            aria-hidden="true"
          />

          <motion.button
            className="rounded-full border border-lavender-soft/35 bg-lavender-soft/10 px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_28px_rgba(159,116,180,0.18)] backdrop-blur-sm transition-all hover:border-lavender-soft/55 hover:bg-lavender-soft/18 hover:shadow-[0_10px_32px_rgba(159,116,180,0.28)] focus:outline-none focus:ring-4 focus:ring-lavender/25"
            type="button"
            onClick={onOpen}
            disabled={isAnimating}
            whileTap={{ scale: 0.95 }}
          >
            Шақыруды ашу
          </motion.button>
          <p className="mt-4 text-sm text-white/55">
            Басыңыз
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
