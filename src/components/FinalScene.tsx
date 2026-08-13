'use client';

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

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/76 px-5 py-8 backdrop-blur-md">
      <motion.div
        aria-label="Жауап қабылданды"
        className="relative w-full max-w-[430px] overflow-hidden border border-white/24 bg-black/64 px-6 py-9 text-center text-white shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        role="dialog"
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-lavender-soft/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-lavender/20 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-lavender-soft/40 bg-white/10 text-4xl text-lavender-soft shadow-soft">
            ♥
          </div>
          <Ornament className="my-7" />
          <p className="section-kicker">Мөр басылды</p>
          <h3 className="mt-4 font-display text-5xl italic leading-tight text-white">{copy.title}</h3>
          <p className="mt-6 text-xl leading-9 text-white/80">{copy.body}</p>
          <p className="mt-4 text-base leading-7 text-white/62">{copy.detail}</p>
          <button
            className="mt-8 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black shadow-glow transition hover:bg-lavender-soft focus:outline-none focus:ring-4 focus:ring-lavender/25"
            type="button"
            onClick={onClose}
          >
            Шақыруға қайта оралу
          </button>
        </div>
      </motion.div>
    </div>
  );
}
