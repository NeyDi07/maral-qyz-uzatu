import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #0c0609 0%, #1a0d14 40%, #12081b 70%, #0a050d 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Фоновый портрет */}
        <img
          src="https://maral-qyz-uzatu.vercel.app/media/photos/Марал11.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 28%',
            opacity: 0.82,
          }}
        />

        {/* Затемнение */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(16,8,11,0.42) 0%, rgba(10,5,12,0.74) 70%, rgba(6,3,8,0.92) 100%)',
          }}
        />

        {/* Lavender свечения */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            left: '10%',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'rgba(200,173,212,0.12)',
            filter: 'blur(90px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '22%',
            right: '12%',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'rgba(159,116,180,0.1)',
            filter: 'blur(80px)',
          }}
        />

        {/* Рамка-открытка */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '44px 70px',
            border: '1.5px solid rgba(200,173,212,0.46)',
            borderRadius: 28,
            background: 'linear-gradient(180deg, rgba(18,8,13,0.52) 0%, rgba(10,4,7,0.48) 100%)',
            boxShadow: '0 34px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
            // backdrop-filter не работает в @vercel/og, заменяем обычным фоном
            position: 'relative',
            gap: 0,
          }}
        >
          {/* Уголки */}
          <div
            style={{
              position: 'absolute',
              left: 18,
              top: 18,
              width: 42,
              height: 42,
              borderLeft: '2px solid rgba(200,173,212,0.7)',
              borderTop: '2px solid rgba(200,173,212,0.7)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 18,
              bottom: 18,
              width: 42,
              height: 42,
              borderRight: '2px solid rgba(200,173,212,0.7)',
              borderBottom: '2px solid rgba(200,173,212,0.7)',
            }}
          />

          {/* Qyz Uzatu */}
          <p
            style={{
              fontSize: 22,
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: 'rgba(200,173,212,0.88)',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Qyz Uzatu
          </p>

          {/* Марал */}
          <p
            style={{
              fontSize: 110,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#ffffff',
              lineHeight: 1,
              marginTop: 18,
              textShadow: '0 4px 24px rgba(200,173,212,0.38)',
            }}
          >
            Марал
          </p>

          {/* Разделитель */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 22 }}>
            <div style={{ width: 64, height: 1, background: 'rgba(200,173,212,0.52)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(200,173,212,0.9)' }} />
            <div style={{ width: 64, height: 1, background: 'rgba(200,173,212,0.52)' }} />
          </div>

          {/* Қыз ұзату */}
          <p
            style={{
              fontSize: 56,
              fontStyle: 'italic',
              color: 'rgba(200,173,212,0.94)',
              fontWeight: 400,
              marginTop: 22,
            }}
          >
            Қыз ұзату
          </p>

          {/* Сердечко */}
          <svg
            style={{ marginTop: 18 }}
            width="44"
            height="40"
            viewBox="0 0 64 58"
            fill="none"
          >
            <path
              d="M32 53C20.2 42.9 8 32.1 8 19.5 8 11.8 13.8 6 21.2 6c4.5 0 8.5 2.1 10.8 5.6C34.3 8.1 38.3 6 42.8 6 50.2 6 56 11.8 56 19.5 56 32.1 43.8 42.9 32 53Z"
              fill="rgba(200,173,212,0.78)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2.4"
            />
          </svg>

          {/* Дата */}
          <p
            style={{
              fontSize: 22,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.68)',
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            04.10.2026 · Өскемен
          </p>
        </div>

        {/* Текст снизу */}
        <p
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          Шақыруды ашу үшін басыңыз
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}