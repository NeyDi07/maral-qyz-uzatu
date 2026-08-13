import { ScrollSection } from './ScrollSection';
import { invitation } from '@/data/invitation';
import { Reveal } from './Reveal';

const weekdays = ['ДС', 'СС', 'СР', 'БС', 'ЖМ', 'СБ', 'ЖС'];
const cells = ['', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

export function CalendarCard() {
  return (
    <ScrollSection ariaLabel="Қазан күнтізбесі" className="section-panel px-5 py-10" direction="left">
      <div className="text-center">
        <Reveal direction="left"><h2 className="script-heading">Той салтанаты:</h2></Reveal>
        <Reveal direction="right" delay={0.06}><p className="mt-4 font-number text-2xl text-lavender-soft/90">04 қазан 2026</p></Reveal>
        <p className="sr-only">Қазан 2026</p>
        <Reveal direction="up" delay={0.1}><div className="mt-8 flex items-center justify-between px-3 font-serif text-4xl uppercase tracking-[0.08em] text-white">
          <span>Қазан</span>
          <span className="font-number">2026</span>
        </div></Reveal>
        <Reveal direction="down" delay={0.14} noFade><div className="mt-5 grid grid-cols-7 gap-2 rounded-2xl border border-lavender-soft/35 bg-plum/18 p-3 text-white shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          {weekdays.map((day) => (
            <div key={day} className="border-b border-white/40 pb-2 text-xs font-semibold tracking-[0.12em] text-white/80">
              {day}
            </div>
          ))}
          {cells.map((day, index) => (
            <div key={`${day}-${index}`} className="font-number flex h-10 items-center justify-center text-2xl text-white/88">
              {day === '4' ? (
                <span className="heart-date relative flex h-14 w-14 items-center justify-center text-xl font-semibold text-white">
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
        <Reveal direction="up" delay={0.18} noFade><a
          className="mt-7 inline-flex rounded-full border border-white/30 bg-white/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white/20"
          href={invitation.calendarUrl}
          download
        >
          Күнтізбеге сақтау
        </a></Reveal>
      </div>
    </ScrollSection>
  );
}
