import { invitation } from '@/data/invitation';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

const weekdays = ['ДС', 'СС', 'СР', 'БС', 'ЖМ', 'СБ', 'ЖС'];
const cells = ['', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

export function TimeDetails() {
  return (
    <ScrollSection ariaLabel="Той уақыты" className="section-panel visual-block visual-block-schedule flex flex-col justify-center px-5 pb-6 pt-4 text-center" direction="right">
      <Reveal direction="down"><div className="ornament-mask mx-auto mb-4 h-14 w-72 max-w-full bg-[var(--lavender-deep)] drop-shadow-[0_0_20px_rgba(123,63,160,0.5)]" /></Reveal>
      <Reveal direction="left" delay={0.04}><h2 className="script-heading">Той салтанаты:</h2></Reveal>
      <div className="mx-auto mt-5 grid w-[76%] max-w-[270px] grid-cols-2 gap-2.5">
        <Reveal direction="left" delay={0.08}><div className="dark-info-card rounded-xl !px-2 !py-2.5">
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-lavender-soft">Күні</p>
          <p className="font-number mt-1 text-2xl text-white">04</p>
          <p className="mt-0.5 text-[0.65rem] text-white/62">қазан, жексенбі</p>
        </div></Reveal>
        <Reveal direction="right" delay={0.12}><div className="dark-info-card rounded-xl !px-2 !py-2.5">
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-lavender-soft">Уақыты</p>
          <p className="font-number mt-1 text-2xl text-white">{invitation.time}</p>
          <p className="mt-0.5 text-[0.65rem] text-white/62">басталады</p>
        </div></Reveal>
      </div>
      <p className="sr-only">Қазан 2026</p>
      <Reveal direction="up" delay={0.16}><div className="mx-auto mt-4 flex w-[75vw] max-w-[300px] items-center justify-between px-2 font-serif text-2xl uppercase tracking-[0.08em] text-white">
        <span>Қазан</span>
        <span className="font-number">2026</span>
      </div></Reveal>
      <Reveal direction="down" delay={0.2}><div className="glass-panel mx-auto mt-3 grid w-[75vw] max-w-[300px] grid-cols-7 gap-1 rounded-2xl p-2 text-white">
        {weekdays.map((day) => (
          <div key={day} className="pb-1 text-[0.6rem] font-semibold tracking-[0.08em] text-white/80">
            {day}
          </div>
        ))}
        {cells.map((day, index) => (
          <div key={`${day}-${index}`} className="font-number flex h-7 items-center justify-center text-lg text-white/88">
            {day === '4' ? (
              <span className="heart-date relative flex h-9 w-9 items-center justify-center text-sm font-semibold text-white">
                <svg className="absolute inset-0 h-full w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]" viewBox="0 0 64 58" aria-hidden="true">
                  <path
                    d="M32 53C20.2 42.9 8 32.1 8 19.5 8 11.8 13.8 6 21.2 6c4.5 0 8.5 2.1 10.8 5.6C34.3 8.1 38.3 6 42.8 6 50.2 6 56 11.8 56 19.5 56 32.1 43.8 42.9 32 53Z"
                    fill="rgba(200,173,212,0.9)"
                    stroke="rgba(255,255,255,0.82)"
                    strokeWidth="2.5"
                  />
                </svg>
                <span className="relative z-10">4</span>
              </span>
            ) : (
              day
            )}
          </div>
        ))}
      </div></Reveal>
      <Reveal direction="up" delay={0.24}><a
        className="black-glass-btn mt-4 inline-flex rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition"
        href={invitation.calendarUrl}
        target="_blank"
        rel="noreferrer"
      >
        Күнтізбеге сақтау
      </a></Reveal>
    </ScrollSection>
  );
}
