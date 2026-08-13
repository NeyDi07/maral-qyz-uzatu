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
    <ScrollSection ariaLabel="Тойға дейінгі уақыт" className="section-panel px-5 pb-2 pt-8 text-center" direction="left">
      <Reveal direction="down"><div className="ornament-mask mx-auto mb-4 h-12 w-72 max-w-full bg-[var(--lavender-deep)] drop-shadow-[0_0_22px_rgba(123,44,191,0.52)]" /></Reveal>
      <p className="sr-only">Тойға дейін</p>
      <Reveal direction="left" delay={0.05}><h2 className="script-heading">Тойға дейін:</h2></Reveal>
      <div className="mt-5 grid grid-cols-4 gap-2.5">
        {unitLabels.map(([key, label]) => (
          <Reveal key={key} direction="up" delay={0.08 + unitLabels.findIndex(([unit]) => unit === key) * 0.04} noFade><div className="glass-panel square-tile rounded-2xl w-full text-white">
            <div>
              <p className="font-number text-3xl tabular-nums leading-none text-white">{parts[key].toString().padStart(2, '0')}</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.12em] text-white/62">{label}</p>
            </div>
          </div></Reveal>
        ))}
      </div>
      <Reveal direction="right" delay={0.24}><p className="mt-3 text-lg text-white/72">{parts.isPast ? 'Қуаныш басталды' : 'Кездескенше асыға күтеміз'}</p></Reveal>
    </ScrollSection>
  );
}
