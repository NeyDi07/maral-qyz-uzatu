import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

describe('/api/rsvp route', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_RSVP_ENDPOINT', 'https://script.google.com/macros/s/test/exec');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('forwards RSVP payload to Google Apps Script and returns success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    );

    const request = new Request('http://localhost:3000/api/rsvp', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Дамир',
        attendance: 'coming',
        guestCount: 1,
        guestNames: ['Дамир'],
        submittedAt: new Date().toISOString(),
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ success: true });
  });

  it('returns 502 with informative error when Google Apps Script returns 403', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Access Denied', { status: 403 })
    );

    const request = new Request('http://localhost:3000/api/rsvp', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Дамир',
        attendance: 'coming',
        guestCount: 1,
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(502);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('403 Forbidden');
  });
});
