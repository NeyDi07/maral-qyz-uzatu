import { invitation } from '@/data/invitation';
import { Reveal } from './Reveal';
import { ScrollSection } from './ScrollSection';

export function LocationCard() {
  return (
    <ScrollSection ariaLabel="Мейрамхана мекен-жайы" className="section-panel px-5 py-9 text-center" direction="right">
      <div className="relative overflow-hidden px-2 py-4 text-white">
        <Reveal direction="down"><div className="ornament-mask mx-auto mb-8 h-16 w-72 max-w-full bg-lavender-soft drop-shadow-[0_0_18px_rgba(200,173,212,0.38)]" /></Reveal>
        <Reveal direction="right" delay={0.05}><h2 className="script-heading">Мекен-жайымыз:</h2></Reveal>
        <Reveal direction="left" delay={0.1}><p className="mx-auto mt-6 max-w-xs text-xl leading-9 text-white/82">{invitation.address}</p></Reveal>
        <Reveal direction="up" delay={0.15}><p className="mt-7 font-display text-6xl italic text-white">&quot;{invitation.venueName}&quot;</p></Reveal>
        <Reveal direction="right" delay={0.2}><p className="mt-2 text-lg uppercase tracking-[0.18em] text-lavender-soft/85">{invitation.venueType}</p></Reveal>
        <Reveal direction="up" delay={0.24}><a
          className="mt-8 inline-flex items-center gap-3 rounded-[1.25rem] border border-lavender-soft/35 bg-lavender/32 px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_20px_55px_rgba(0,0,0,0.24)] backdrop-blur-sm transition hover:bg-lavender/42"
          href={invitation.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <svg className="h-7 w-7 text-white" viewBox="0 0 1000 1000" aria-hidden="true">
            <path
              fill="currentColor"
              d="M500,203.125c139.6083374,0,234.375,107.4570923,234.375,223.375c0,46.5374756-10.1541748,94.9625244-33.8458252,145.729126c-137.375,0-171.2833252,98.3833618-177.6958008,160.2833252l-0.4083862,4.125061c-2.1749878,22.0916138-3.4291382,39.8167114-3.7749634,53.1791992l-37.208313,5.8167114l-0.0083618-1.2042236c-0.1416626-14.0083618-1.4666748-33.6583252-3.9708252-58.9500122l-0.1083069-1.104187c-5.9250183-61.7666016-39.1208496-162.145874-177.8845825-162.145874C275.7783813,521.4624634,265.6250305,473.0374756,265.6250305,426.5C265.6250305,310.5820923,360.3904724,203.125,500,203.125z"
            />
          </svg>
          Картаға өту
        </a></Reveal>
      </div>
    </ScrollSection>
  );
}
