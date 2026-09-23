import { invitation } from '@/data/invitation';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function DressCode() {
  return (
    <ScrollSection ariaLabel="Дресс-код" className="section-panel px-4 pb-10 pt-3 text-center" direction="right">
      <div className="ivory-card mx-auto w-full max-w-[400px] rounded-[2rem] px-5 py-8 sm:px-6">
        <p className="sr-only">Дресс-код</p>
        <Reveal direction="right"><h2 className="script-heading">Дресс-код:</h2></Reveal>
        <Reveal direction="down" delay={0.06}><Ornament className="my-4" /></Reveal>
        <Reveal direction="left" delay={0.12}><p className="text-lg leading-9 text-plum/85">{invitation.dressCode}</p></Reveal>
      </div>
    </ScrollSection>
  );
}
