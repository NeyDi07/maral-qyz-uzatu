import { invitation } from '@/data/invitation';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function InvitationText() {
  const [intro, main, closing] = invitation.invitationText;

  return (
    <ScrollSection ariaLabel="Шақыру мәтіні" className="section-panel visual-block visual-block-invitation flex flex-col px-5 pb-12 pt-16 text-center" direction="left">
      <Reveal direction="down"><div className="ornament-mask mx-auto mb-8 h-16 w-72 max-w-full bg-[var(--lavender-deep)] drop-shadow-[0_0_20px_rgba(123,63,160,0.5)]" /></Reveal>
      <Reveal direction="left" delay={0.04}><h2 className="script-heading">Құрметті қонақтар!</h2></Reveal>
      <Reveal direction="right" delay={0.08}><Ornament className="my-7" /></Reveal>
      <Reveal direction="up" delay={0.09} noFade><div className="text-backdrop mx-auto max-w-[360px] rounded-2xl px-5 py-6 text-xl leading-10 text-white/84">
        <Reveal direction="left" delay={0.1}><p className="mb-5">{intro}</p></Reveal>
        <Reveal direction="right" delay={0.15}><p className="mb-5">{main}</p></Reveal>
        <Reveal direction="up" delay={0.18}><p>{closing}</p></Reveal>
      </div></Reveal>
    </ScrollSection>
  );
}
