import { invitation } from '@/data/invitation';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function InvitationText() {
  const [intro, main, closing] = invitation.invitationText;

  return (
    <ScrollSection ariaLabel="Шақыру мәтіні" className="section-panel visual-block visual-block-invitation flex flex-col justify-center px-4 py-12 text-center" direction="left">
      <div className="ivory-card mx-auto w-full max-w-[400px] rounded-[2rem] px-5 py-9 sm:px-6">
        <Reveal direction="down"><div className="ornament-mask mx-auto mb-7 h-14 w-56 max-w-full bg-[var(--lavender-deep)] drop-shadow-[0_0_16px_rgba(123,44,191,0.3)]" /></Reveal>
        <Reveal direction="left" delay={0.04}><h2 className="script-heading">Құрметті қонақтар!</h2></Reveal>
        <Reveal direction="right" delay={0.08}><Ornament className="my-6" /></Reveal>
        <Reveal direction="up" delay={0.09} noFade><div className="mx-auto max-w-[360px] text-lg leading-9 text-plum/85">
          <Reveal direction="left" delay={0.1}><p className="mb-5">{intro}</p></Reveal>
          <Reveal direction="right" delay={0.15}><p className="mb-5">{main}</p></Reveal>
          <Reveal direction="up" delay={0.18}><p>{closing}</p></Reveal>
        </div></Reveal>
      </div>
    </ScrollSection>
  );
}
