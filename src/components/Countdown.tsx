'use client';

import { useEffect, useState } from 'react';
import { eventStartDate, getCountdownParts } from '@/lib/countdown';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

const unitLabels = [
  ['days', 'күн'],
  ['hours', 'сағат'],
  ['minutes', 'минут'],
  ['seconds', 'секунд'],
] as const;

export function Countdown() {
  const [parts, setParts] = useState(() => getCountdownParts({ now: new Date(), target: eventStartDate }));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setParts(getCountdownParts({ now: new Date(), target: eventStartDate }));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <ScrollSection ariaLabel="Тойға дейінгі уақыт" className="section-panel px-5 py-10 text-center" direction="left">
      <Reveal direction="down"><div className="ornament-mask mx-auto mb-8 h-16 w-72 max-w-full bg-lavender-soft drop-shadow-[0_0_18px_rgba(200,173,212,0.38)]" /></Reveal>
      <p className="sr-only">Тойға дейін</p>
      <Reveal direction="left" delay={0.05}><h2 className="script-heading">Тойға дейін:</h2></Reveal>
      <div className="mt-7 grid grid-cols-4 gap-3">
        {unitLabels.map(([key, label]) => (
          <Reveal key={key} direction="up" delay={0.08 + unitLabels.findIndex(([unit]) => unit === key) * 0.04}><div className="rounded-2xl border border-white/22 bg-black/22 px-2 py-5 text-white shadow-[0_14px_35px_rgba(0,0,0,0.24)] backdrop-blur-sm">
            <p className="font-number text-4xl tabular-nums text-white">{parts[key].toString().padStart(2, '0')}</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-white/62">{label}</p>
          </div></Reveal>
        ))}
      </div>
      <Reveal direction="right" delay={0.24}><p className="mt-6 text-lg text-white/72">{parts.isPast ? 'Қуаныш басталды' : 'Кездескенше асыға күтеміз'}</p></Reveal>
    </ScrollSection>
  );
}
