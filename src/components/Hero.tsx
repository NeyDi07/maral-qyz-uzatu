'use client';

import { invitation } from '@/data/invitation';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

type HeroProps = {
  audioMessage?: string;
};

export function Hero({ audioMessage = '' }: HeroProps) {
  return (
    <ScrollSection ariaLabel="Басты шақыру" className="hero-section relative isolate flex min-h-screen items-end justify-center overflow-hidden px-5 pb-16 pt-28 text-center">
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        src={invitation.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.04)_52%,rgba(0,0,0,0.54)_100%)]" />
      <div className="relative w-full px-2 text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
        <Reveal direction="down"><p className="text-xs uppercase tracking-[0.48em] text-white/72">{invitation.modernAccent}</p></Reveal>

        <Reveal direction="left" delay={0.05}><h1 className="mt-7 font-display text-[5.4rem] italic leading-none tracking-tight text-white drop-shadow-[0_2px_16px_rgba(200,173,212,0.35)]">
          {invitation.brideName}
        </h1></Reveal>

        {/* Lavender divider to separate name and event name */}
        <Reveal direction="up" delay={0.1}><div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <span className="inline-block h-px w-12 bg-lavender-soft/55" />
          <span className="inline-block h-2 w-2 rotate-45 bg-lavender-soft" />
          <span className="inline-block h-px w-12 bg-lavender-soft/55" />
        </div></Reveal>

        <Reveal direction="right" delay={0.14}><p className="mt-4 font-display text-4xl italic text-lavender-soft drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
          {invitation.eventName}
        </p></Reveal>

        <Reveal direction="down" delay={0.18}><div className="main-ornament-mask mx-auto my-5 h-16 w-16 bg-lavender-soft shadow-[0_0_18px_rgba(200,173,212,0.4)]" aria-hidden="true" /></Reveal>

        <Reveal direction="up" delay={0.22}><p className="font-number text-2xl tracking-[0.22em] text-lavender-soft">{invitation.heroDate}</p></Reveal>
        {audioMessage ? <Reveal direction="right" delay={0.26}><p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-white/82">{audioMessage}</p></Reveal> : null}
      </div>
    </ScrollSection>
  );
}
