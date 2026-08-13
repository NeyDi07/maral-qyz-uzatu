import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InvitationExperience } from './InvitationExperience';

const ANIMATION_TIMEOUT = 1200;

describe('InvitationExperience audio opening', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts the main track at second 30 after the opening button is clicked', async () => {
    const play = vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);

    render(<InvitationExperience />);

    const audio = screen.getByTestId('invitation-audio') as HTMLAudioElement;
    expect(audio).toHaveAttribute('src', '/media/audio/main.mp3');
    expect(audio.loop).toBe(true);
    expect(screen.queryByLabelText('Музыканы кідірту')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Шақыруды ашу' }));

    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    expect(audio.currentTime).toBe(30);
    await waitFor(() => expect(screen.getByLabelText('Музыканы кідірту')).toBeInTheDocument(), { timeout: ANIMATION_TIMEOUT + 500 });
  });

  it('seeks the track when the progress slider changes', async () => {
    const play = vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);

    render(<InvitationExperience />);

    const audio = screen.getByTestId('invitation-audio') as HTMLAudioElement;
    Object.defineProperty(audio, 'duration', { configurable: true, value: 120 });
    fireEvent.loadedMetadata(audio);

    fireEvent.click(screen.getByRole('button', { name: 'Шақыруды ашу' }));
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      const slider = screen.queryByLabelText('Әуен барысы');
      expect(slider).toBeInTheDocument();
    }, { timeout: ANIMATION_TIMEOUT + 500 });

    const slider = screen.getByLabelText('Әуен барысы');
    fireEvent.input(slider, { target: { value: '64' } });

    await waitFor(() => {
      expect(audio.currentTime).toBe(64);
    });
  });
});
