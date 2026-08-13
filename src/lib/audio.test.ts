import { describe, expect, it } from 'vitest';
import { audioTracks } from './audio';

describe('audioTracks', () => {
  it('uses the main invitation song from second 30 and loops it', () => {
    expect(audioTracks[0]).toEqual(
      {
        id: 'main',
        title: 'Негізгі әуен',
        src: '/media/audio/main.mp3',
        startAt: 30,
        loop: true,
      },
    );
    expect(audioTracks).toHaveLength(3);
  });
});
