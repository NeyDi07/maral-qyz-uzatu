import { invitation } from '@/data/invitation';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function DressCode() {
  return (
    <ScrollSection ariaLabel="Дресс-код" className="section-panel px-5 pb-8 pt-2 text-center" direction="right">
      <div className="px-2 py-3">
        <p className="sr-only">Дресс-код</p>
        <Reveal direction="right"><h2 className="script-heading">Дресс-код:</h2></Reveal>
        <Reveal direction="down" delay={0.06}><Ornament className="my-4" /></Reveal>
        <Reveal direction="left" delay={0.12}><p className="text-lg leading-9 text-white/82">{invitation.dressCode}</p></Reveal>
      </div>
    </ScrollSection>
  );
}
