import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RSVPForm } from './RSVPForm';

describe('RSVPForm', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_RSVP_ENDPOINT', 'https://script.google.com/macros/s/test/exec');
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('starts with attendance choices and hides guest name fields until coming is selected', () => {
    render(<RSVPForm />);

    expect(screen.getByLabelText('Иә, міндетті түрде келемін')).toBeInTheDocument();
    expect(screen.getByLabelText('Өкінішке орай, келе алмаймын')).toBeInTheDocument();
    expect(screen.queryByLabelText('1-қонақтың есімі')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    expect(screen.getByText('Тойға келу жауабыңызды таңдаңыз.')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('asks for one name when a solo guest is coming', async () => {
    render(<RSVPForm />);

    fireEvent.click(screen.getByLabelText('Иә, міндетті түрде келемін'));

    expect(screen.getByLabelText('1 қонақ')).toBeInTheDocument();
    expect(screen.getByLabelText('1-қонақтың есімі')).toBeInTheDocument();
    expect(screen.queryByLabelText('2-қонақтың есімі')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));
    expect(screen.getByText('1-қонақтың есімін жазыңыз.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('1-қонақтың есімі'), { target: { value: 'Айгүл' } });
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    expect(screen.getByRole('button', { name: 'Жіберіліп жатыр...' })).toBeDisabled();
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('dialog', { name: 'Жауап қабылданды' })).toBeInTheDocument();
    expect(screen.getByText('Айгүл, сізге арналған орын сақталды.')).toBeInTheDocument();
  });

  it('shows two name fields plus extra guest field for 3plus', async () => {
    render(<RSVPForm />);

    fireEvent.click(screen.getByLabelText('Иә, міндетті түрде келемін'));
    fireEvent.click(screen.getByLabelText('3+ қонақ'));

    expect(screen.getByLabelText('1-қонақтың есімі')).toBeInTheDocument();
    expect(screen.getByLabelText('2-қонақтың есімі')).toBeInTheDocument();
    expect(screen.getByLabelText('Қалған қонақтардың есімдері')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('1-қонақтың есімі'), { target: { value: 'Айгүл' } });
    fireEvent.change(screen.getByLabelText('2-қонақтың есімі'), { target: { value: 'Ерлан' } });
    fireEvent.change(screen.getByLabelText('Қалған қонақтардың есімдері'), { target: { value: 'Динара, Айдос' } });
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    const body = JSON.parse(vi.mocked(globalThis.fetch).mock.calls[0][1]?.body as string);
    expect(body).toMatchObject({
      attendance: 'coming',
      guestCount: '3plus',
      guestNames: ['Айгүл', 'Ерлан'],
      extraGuestNames: 'Динара, Айдос',
      name: 'Айгүл',
    });
  });

  it('softly asks declining guests to reconsider before final submission', async () => {
    render(<RSVPForm />);

    fireEvent.click(screen.getByLabelText('Өкінішке орай, келе алмаймын'));

    expect(screen.getByText('Шынымен келе алмайсыз ба?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Жарайды, келемін' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));
    expect(screen.getByText('Алдымен шешіміңізді нақтылап жіберіңіз.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Иә, өкінішке орай келе алмаймын' }));
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('dialog', { name: 'Жауап қабылданды' })).toBeInTheDocument();
    expect(screen.getByText('Өкінішті, әрине...')).toBeInTheDocument();
  });

  it('lets a declining guest switch back to coming from the reconsideration block', async () => {
    render(<RSVPForm />);

    fireEvent.click(screen.getByLabelText('Өкінішке орай, келе алмаймын'));
    fireEvent.click(screen.getByRole('button', { name: 'Жарайды, келемін' }));
    fireEvent.change(screen.getByLabelText('1-қонақтың есімі'), { target: { value: 'Дана' } });
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('dialog', { name: 'Жауап қабылданды' })).toBeInTheDocument();
    expect(screen.getByText('Дана, сізге арналған орын сақталды.')).toBeInTheDocument();
  });

  it('keeps form data visible and shows retry copy when submission fails', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('network'));
    render(<RSVPForm />);

    fireEvent.click(screen.getByLabelText('Иә, міндетті түрде келемін'));
    fireEvent.change(screen.getByLabelText('1-қонақтың есімі'), { target: { value: 'Айдана' } });
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    expect(await screen.findByText('Жауап жіберілмеді. Интернетті тексеріп, қайта байқап көріңіз.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Айдана')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
