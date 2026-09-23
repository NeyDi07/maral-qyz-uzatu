'use client';

import { useEffect, useState } from 'react';
import type { CountdownParts } from '@/lib/countdown';
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
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const update = () => setParts(getCountdownParts({ now: new Date(), target: eventStartDate }));
    update();

    const intervalId = window.setInterval(update, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <ScrollSection ariaLabel="Тойға дейінгі уақыт" className="section-panel px-4 pb-3 pt-10 text-center" direction="left">
      <div className="ivory-card mx-auto w-full max-w-[400px] rounded-[2rem] px-4 py-8 sm:px-6">
        <Reveal direction="down"><div className="ornament-mask mx-auto mb-4 h-12 w-48 max-w-full bg-[var(--lavender-deep)] drop-shadow-[0_0_16px_rgba(123,44,191,0.3)]" /></Reveal>
        <p className="sr-only">Тойға дейін</p>
        <Reveal direction="left" delay={0.05}><h2 className="script-heading">Тойға дейін:</h2></Reveal>
        <div className="mx-auto mt-5 grid max-w-[320px] grid-cols-4 gap-2.5">
          {unitLabels.map(([key, label]) => (
            <Reveal key={key} direction="up" delay={0.08 + unitLabels.findIndex(([unit]) => unit === key) * 0.04} noFade><div className="square-tile w-full rounded-2xl border border-lavender-soft/45 bg-white/80 shadow-[0_10px_26px_rgba(74,36,79,0.1)] text-plum">
              <div>
                <p className="font-number text-3xl tabular-nums leading-none text-plum">{(parts?.[key] ?? 0).toString().padStart(2, '0')}</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.12em] text-plum/60">{label}</p>
              </div>
            </div></Reveal>
          ))}
        </div>
        <Reveal direction="right" delay={0.24}><p className="mt-4 text-lg text-plum/70">{parts?.isPast ? 'Қуаныш басталды' : 'Кездескенше асыға күтеміз'}</p></Reveal>
      </div>
    </ScrollSection>
  );
}
