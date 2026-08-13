import { invitation } from '@/data/invitation';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function InvitationText() {
  return (
    <ScrollSection ariaLabel="Шақыру мәтіні" className="section-panel px-5 py-16 text-center" direction="left">
      <Reveal direction="down"><div className="ornament-mask mx-auto mb-8 h-16 w-72 max-w-full bg-lavender-soft drop-shadow-[0_0_18px_rgba(200,173,212,0.38)]" /></Reveal>
      <Reveal direction="left" delay={0.04}><h2 className="script-heading">Құрметті қонақтар!</h2></Reveal>
      <Reveal direction="right" delay={0.08}><Ornament className="my-7" /></Reveal>
      <div className="mx-auto max-w-[360px] space-y-6 px-2 text-xl leading-10 text-white/84">
        {invitation.invitationText.map((paragraph, index) => (
          <Reveal key={paragraph} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.1 + index * 0.05}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </ScrollSection>
  );
}
