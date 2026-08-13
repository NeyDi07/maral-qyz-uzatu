export type AudioTrack = {
  id: string;
  title: string;
  src: string;
  startAt: number;
  loop: boolean;
};

export const audioTracks: AudioTrack[] = [
  {
    id: 'main',
    title: 'Негізгі әуен',
    src: '/media/audio/main.mp3',
    startAt: 30,
    loop: true,
  },
  {
    id: 'balausa',
    title: 'Kalifarniya - Balausa',
    src: '/media/audio/Kalifarniya_Balausa.mp3',
    startAt: 0,
    loop: true,
  },
  {
    id: 'qyz-uzatu',
    title: 'Қыз ұзату әуені',
    src: '/media/audio/Daniya_Arman_yzy_-_yz_zatu_(TheMP3.Info).mp3',
    startAt: 0,
    loop: true,
  },
];
