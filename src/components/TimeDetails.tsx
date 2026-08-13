import { invitation } from '@/data/invitation';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function TimeDetails() {
  return (
    <ScrollSection ariaLabel="Той уақыты" className="section-panel px-5 py-14 text-center" direction="right">
      <Reveal direction="left"><h2 className="script-heading">Той салтанаты:</h2></Reveal>
      <Reveal direction="right" delay={0.06}><p className="mt-4 text-2xl leading-9 text-lavender-soft/90">{invitation.fullDate}</p></Reveal>
      <Reveal direction="up" delay={0.1}><p className="mt-1 text-2xl leading-9 text-white/86">{invitation.timeText}</p></Reveal>
      <Reveal direction="down" delay={0.14}><Ornament className="my-8" /></Reveal>
      <div className="grid grid-cols-2 gap-4">
        <Reveal direction="left" delay={0.18}><div className="dark-info-card rounded-[1.35rem]">
          <p className="text-xs uppercase tracking-[0.24em] text-lavender-soft">Күні</p>
          <p className="font-number mt-4 text-5xl text-white">04</p>
          <p className="mt-2 text-sm text-white/62">қазан, жексенбі</p>
        </div></Reveal>
        <Reveal direction="right" delay={0.22}><div className="dark-info-card rounded-[1.35rem]">
          <p className="text-xs uppercase tracking-[0.24em] text-lavender-soft">Уақыты</p>
          <p className="font-number mt-4 text-5xl text-white">{invitation.time}</p>
          <p className="mt-2 text-sm text-white/62">басталады</p>
        </div></Reveal>
      </div>
    </ScrollSection>
  );
}
