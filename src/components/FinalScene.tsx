'use client';

import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import type { RSVPSubmission } from '@/lib/rsvp';
import { Ornament } from './Ornament';

type FinalSceneProps = {
  submission: RSVPSubmission;
  onClose: () => void;
};

function getFinalCopy(submission: RSVPSubmission) {
  if (submission.attendance === 'coming') {
    const names = (submission.guestNames || [submission.name]).filter(Boolean);
    const isCouple = names.length > 1;
    return {
      title: 'Жауабыңыз қабылданды!',
      body: isCouple
        ? `${names.join(', ')}, сіздерді асыға күтеміз.`
        : `${submission.name}, сізге арналған орын сақталды.`,
      detail: isCouple
        ? 'Сіздерге арнайы орын сақталды.'
        : 'Маралдың қуанышына ортақ болатыныңызға қуаныштымыз. Кездескенше!',
    };
  }

  if (submission.attendance === 'not_coming') {
    return {
      title: 'Өкінішті, әрине...',
      body: `${submission.name}, жауабыңыз қабылданды.`,
      detail: 'Бірақ қуанышымызды жүрегіңізбен бөліскеніңіз үшін рақмет.',
    };
  }

  return {
    title: 'Жауабыңыз қабылданды!',
    body: `${submission.name}, сізге арналған орын сақталды.`,
    detail: 'Маралдың қуанышына ортақ болатыныңызға қуаныштымыз. Кездескенше!',
  };
}

export function FinalScene({ submission, onClose }: FinalSceneProps) {
  const copy = getFinalCopy(submission);
  const modal = (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[rgba(43,16,49,0.55)] px-5 py-8">
      <motion.div
        aria-label="Жауап қабылданды"
        className="relative my-auto w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/70 bg-ivory px-6 py-9 text-center text-plum shadow-[0_28px_90px_rgba(30,10,36,0.45)]"
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        role="dialog"
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-lavender-soft/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-lavender/20 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-lavender/30 bg-lavender-soft/20 text-4xl text-lavender-deep shadow-soft">
            ♥
          </div>
          <Ornament className="my-7" />
          <p className="section-kicker">Мөр басылды</p>
          <h3 className="mt-4 font-display text-5xl italic leading-tight text-plum">{copy.title}</h3>
          <p className="mt-6 text-xl leading-9 text-plum/85">{copy.body}</p>
          <p className="mt-4 text-base leading-7 text-plum/60">{copy.detail}</p>
          <button
            className="mt-8 rounded-full bg-lavender-deep px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ivory shadow-[0_16px_40px_rgba(123,44,191,0.32)] transition hover:bg-plum focus:outline-none focus:ring-4 focus:ring-lavender/30"
            type="button"
            onClick={onClose}
          >
            Шақыруға қайта оралу
          </button>
        </div>
      </motion.div>
    </div>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(modal, document.body);
}
