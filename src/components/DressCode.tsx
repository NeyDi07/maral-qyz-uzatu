import { invitation } from '@/data/invitation';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function DressCode() {
  return (
    <ScrollSection ariaLabel="Дресс-код" className="section-panel px-5 py-14 text-center" direction="right">
      <div className="px-2 py-8">
        <p className="sr-only">Дресс-код</p>
        <Reveal direction="right"><h2 className="script-heading">Дресс-код:</h2></Reveal>
        <Reveal direction="down" delay={0.06}><Ornament className="my-7" /></Reveal>
        <Reveal direction="left" delay={0.12}><p className="text-xl leading-10 text-white/82">{invitation.dressCode}</p></Reveal>
      </div>
    </ScrollSection>
  );
}
