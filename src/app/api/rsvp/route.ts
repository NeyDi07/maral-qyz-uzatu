import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const endpoint = process.env.GOOGLE_SHEETS_RSVP_URL || process.env.NEXT_PUBLIC_RSVP_ENDPOINT;

    if (!endpoint) {
      console.error('RSVP submission failed: endpoint not configured');
      return NextResponse.json(
        { success: false, error: 'RSVP endpoint is not configured.' },
        { status: 500 }
      );
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      console.error(`Google Apps Script failed with status ${res.status}:`, errorText.slice(0, 300));

      if (res.status === 403) {
        return NextResponse.json(
          {
            success: false,
            error: 'Google Apps Script 403 Forbidden: Доступ закрыт. Убедитесь, что в развертывании Apps Script выбрано «Кто имеет доступ: Все» (Anyone).',
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Google Sheets endpoint returned status ${res.status}`,
        },
        { status: 502 }
      );
    }

    const responseText = await res.text();
    let result = { success: true };
    try {
      result = JSON.parse(responseText);
    } catch {
      // Если Apps Script вернул не JSON, но статус 200, считаем успехом
      result = { success: true };
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Internal error handling RSVP:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
