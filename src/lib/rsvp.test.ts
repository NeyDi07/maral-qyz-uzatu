import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitRSVP } from './rsvp';

describe('submitRSVP', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('posts RSVP submission to the configured Google Apps Script endpoint', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubEnv('NEXT_PUBLIC_RSVP_ENDPOINT', 'https://script.google.com/macros/s/test/exec');

    await expect(
      submitRSVP({
        name: 'Айгүл',
        attendance: 'with_partner',
        partnerName: 'Ерлан',
        submittedAt: '2026-08-13T00:00:00.000Z',
        userAgent: 'vitest',
      }),
    ).resolves.toEqual({ success: true });

    expect(fetchMock).toHaveBeenCalledWith('https://script.google.com/macros/s/test/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        name: 'Айгүл',
        attendance: 'with_partner',
        partnerName: 'Ерлан',
        submittedAt: '2026-08-13T00:00:00.000Z',
        userAgent: 'vitest',
      }),
    });
  });

  it('throws when endpoint is missing', async () => {
    vi.unstubAllEnvs();

    await expect(
      submitRSVP({
        name: 'Айгүл',
        attendance: 'coming',
        submittedAt: '2026-08-13T00:00:00.000Z',
      }, ''),
    ).rejects.toThrow('RSVP endpoint is not configured.');
  });
});
