'use client';

import { memo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Countdown } from '@/components/Countdown';
import { Hero } from '@/components/Hero';
import { InvitationText } from '@/components/InvitationText';
import { LocationCard } from '@/components/LocationCard';
import { Ornament } from '@/components/Ornament';
import { OpeningCard } from '@/components/OpeningCard';
import { RotatingOrnament } from '@/components/RotatingOrnament';
import { RSVPForm } from '@/components/RSVPForm';
import { ScrollSection } from '@/components/ScrollSection';
import { TimeDetails } from '@/components/TimeDetails';
import { invitation } from '@/data/invitation';
import { audioTracks } from '@/lib/audio';
import { AudioPlayer } from './AudioPlayer';

export function InvitationExperience() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioMessage, setAudioMessage] = useState('');
  const currentTrack = audioTracks[trackIndex];

  async function playAudio(fromStartPoint: boolean) {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (fromStartPoint && audio.currentTime < currentTrack.startAt) {
      audio.currentTime = currentTrack.startAt;
      setCurrentTime(currentTrack.startAt);
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setAudioMessage('');
    } catch {
      setIsPlaying(false);
      setAudioMessage('Әуенді қосу үшін жүрек белгісін тағы бір рет басыңыз.');
    }
  }

  function handleOpenInvitation() {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    void playAudio(true);
    setTimeout(() => {
      setIsOpened(true);
    }, 1280);
  }

  function handleToggleAudio() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      void playAudio(false);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function handleSeek(value: number) {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.currentTime = value;
    setCurrentTime(value);
  }

  function switchTrack(direction: 1 | -1) {
    const audio = audioRef.current;
    const wasPlaying = Boolean(audio && !audio.paused);
    const nextIndex = (trackIndex + direction + audioTracks.length) % audioTracks.length;
    const nextTrack = audioTracks[nextIndex];

    setTrackIndex(nextIndex);
    setCurrentTime(nextTrack.startAt);
    setDuration(0);

    window.setTimeout(() => {
      const nextAudio = audioRef.current;
      if (!nextAudio) {
        return;
      }
      nextAudio.currentTime = nextTrack.startAt;
      if (wasPlaying) {
        void nextAudio.play().then(() => setIsPlaying(true)).catch(() => setAudioMessage('Әуенді қосу үшін ойнату батырмасын басыңыз.'));
      }
    }, 0);
  }

  return (
    <div className="invite-shell mx-auto min-h-screen w-full max-w-[480px] shadow-[0_0_80px_rgba(0,0,0,0.55)]">
      <audio
        data-testid="invitation-audio"
        key={currentTrack.id}
        loop={currentTrack.loop}
        preload="metadata"
        ref={audioRef}
        src={currentTrack.src}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />
      <FloatingOrnament />

      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
        {isOpened && (
          <AudioPlayer
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            onNext={() => switchTrack(1)}
            onPrevious={() => switchTrack(-1)}
            onSeek={handleSeek}
            onToggle={handleToggleAudio}
          />
        )}
        <MemoHero audioMessage={audioMessage} />
        <InvitationSections />
      </motion.div>
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            className="fixed inset-0 z-[80]"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <OpeningCard isAnimating={isAnimating} onOpen={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MemoHero = memo(Hero);

const FloatingOrnament = memo(function FloatingOrnament() {
  return <RotatingOrnament className="absolute -right-[92px] top-[86vh] z-20" opacity={0.92} size={185} />;
});

const InvitationSections = memo(function InvitationSections() {
  return (
    <>
      <InvitationText />
      <TimeDetails />
      <LocationCard />
      <div className="visual-block visual-block-details flex flex-col justify-center">
        <Countdown />
      </div>
      <div className="visual-block visual-block-rsvp flex flex-col justify-center">
        <RSVPForm />
        <ScrollSection ariaLabel="Той иелері" className="section-panel px-5 pb-12 pt-4 text-center" direction="left">
          <Ornament className="mb-5" />
          <p className="mx-auto max-w-sm text-xl leading-9 text-white/88">Келіңіздер, қуанышымыздың куәсі болыңыздар!</p>
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-white/68">Құрметпен, той иелері</p>
          <p className="mt-2 font-display text-5xl italic text-white tracking-wide">{invitation.hosts}</p>
        </ScrollSection>
      </div>
    </>
  );
});
