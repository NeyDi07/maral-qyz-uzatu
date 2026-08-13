import { describe, expect, it } from 'vitest';
import { getCountdownParts } from './countdown';

describe('getCountdownParts', () => {
  it('returns remaining days, hours, minutes and seconds before the event', () => {
    expect(
      getCountdownParts({
        now: new Date('2026-10-03T16:29:20+05:00'),
        target: new Date('2026-10-04T18:00:00+05:00'),
      }),
    ).toEqual({ days: 1, hours: 1, minutes: 30, seconds: 40, isPast: false });
  });

  it('returns zero values after the event has started', () => {
    expect(
      getCountdownParts({
        now: new Date('2026-10-04T18:00:01+05:00'),
        target: new Date('2026-10-04T18:00:00+05:00'),
      }),
    ).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
  });
});
