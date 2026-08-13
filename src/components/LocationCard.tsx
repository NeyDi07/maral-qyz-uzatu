import { invitation } from '@/data/invitation';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function LocationCard() {
  return (
    <ScrollSection ariaLabel="Мейрамхана мекен-жайы" className="section-panel visual-block visual-block-location flex flex-col justify-center px-5 py-9 text-center" direction="right">
      <div className="relative overflow-hidden px-2 py-4 text-white">
        <Reveal direction="down"><div className="ornament-mask mx-auto mb-8 h-16 w-72 max-w-full bg-[var(--lavender-deep)] drop-shadow-[0_0_22px_rgba(123,44,191,0.55)]" /></Reveal>
        <Reveal direction="right" delay={0.05}><h2 className="script-heading">Мекен-жайымыз:</h2></Reveal>
        <Reveal direction="left" delay={0.1}><p className="mx-auto mt-6 max-w-xs text-xl leading-9 text-white/82">{invitation.address}</p></Reveal>
        <Reveal direction="up" delay={0.15}><p className="mt-7 font-display text-6xl italic text-white">&quot;{invitation.venueName}&quot;</p></Reveal>
        <Reveal direction="right" delay={0.2}><p className="mt-2 text-lg uppercase tracking-[0.18em] text-lavender-soft">{invitation.venueType}</p></Reveal>
        <Reveal direction="up" delay={0.24} noFade><a
          className="black-glass-btn mt-8 inline-flex items-center gap-3 rounded-[1.25rem] px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition"
          href={invitation.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-7 w-7" src="/media/photos/2gis-icon-white.svg" alt="" aria-hidden="true" />
          Картаға өту
        </a></Reveal>
        <Reveal direction="down" delay={0.28}><div className="ornament-mask mx-auto mt-10 h-16 w-72 max-w-full bg-[var(--lavender-deep)] drop-shadow-[0_0_22px_rgba(123,44,191,0.55)]" /></Reveal>
      </div>
    </ScrollSection>
  );
}
