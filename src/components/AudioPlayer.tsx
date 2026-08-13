'use client';

import type { FormEvent } from 'react';

type AudioPlayerProps = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onToggle: () => void;
  onSeek: (value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function AudioPlayer({ isPlaying, currentTime, duration, onToggle, onSeek, onPrevious, onNext }: AudioPlayerProps) {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const progress = safeDuration > 0 ? Math.min(currentTime, safeDuration) : 0;

  function handleInput(e: FormEvent<HTMLInputElement>) {
    onSeek(Number(e.currentTarget.value));
  }

  return (
    <div className="fixed inset-x-0 top-3 z-50 mx-auto w-[min(210px,calc(100%-3rem))] rounded-[0.8rem] border border-lavender/18 bg-black/38 px-2 py-1.5 text-white shadow-[0_10px_32px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <input
        aria-label="Әуен барысы"
        className="audio-range w-full"
        disabled={safeDuration === 0}
        max={safeDuration || 1}
        min="0"
        step="0.1"
        type="range"
        value={progress}
        onInput={handleInput}
      />
      <div className="mt-1 flex items-center justify-center gap-3">
        <button
          aria-label="Алдыңғы әуен"
          className="player-side-button"
          type="button"
          onClick={onPrevious}
        >
          <svg aria-hidden="true" className="h-[0.8rem] w-[0.8rem]" viewBox="0 0 24 24" fill="none">
            <path d="M7 5v14M18 6l-8 6 8 6V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          aria-label={isPlaying ? 'Музыканы кідірту' : 'Музыканы қосу'}
          className={`player-main-button ${isPlaying ? 'is-playing' : ''}`}
          type="button"
          onClick={onToggle}
        >
          <span className="player-heart" aria-hidden="true">
            <svg viewBox="0 0 24 22" focusable="false">
              <path
                d="M12 21C7.1 16.9 2 12.5 2 7.35 2 4.18 4.42 2 7.2 2c1.82 0 3.55.92 4.8 2.55C13.25 2.92 14.98 2 16.8 2 19.58 2 22 4.18 22 7.35 22 12.5 16.9 16.9 12 21Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="player-pause" aria-hidden="true"><span /> <span /></span>
        </button>
        <button
          aria-label="Келесі әуен"
          className="player-side-button"
          type="button"
          onClick={onNext}
        >
          <svg aria-hidden="true" className="h-[0.8rem] w-[0.8rem]" viewBox="0 0 24 24" fill="none">
            <path d="M17 5v14M6 6l8 6-8 6V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
