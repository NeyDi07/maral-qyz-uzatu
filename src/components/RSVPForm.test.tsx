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

  it('requires a name and attendance choice before submission', () => {
    render(<RSVPForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    expect(screen.getByText('Есіміңізді жазыңыз.')).toBeInTheDocument();
    expect(screen.getByText('Тойға келу жауабыңызды таңдаңыз.')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('asks for partner name when coming together and shows the couple final scene', async () => {
    render(<RSVPForm />);

    fireEvent.change(screen.getByLabelText('Есіміңіз'), { target: { value: 'Айгүл' } });
    fireEvent.click(screen.getByLabelText('Жұбайыммен бірге келемін'));

    expect(screen.getByLabelText('Жұбайыңыздың есімі')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));
    expect(screen.getByText('Жұбайыңыздың есімін жазыңыз.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Жұбайыңыздың есімі'), { target: { value: 'Ерлан' } });
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    expect(screen.getByRole('button', { name: 'Жіберіліп жатыр...' })).toBeDisabled();
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('dialog', { name: 'Жауап қабылданды' })).toBeInTheDocument();
    expect(screen.getByText('Тамаша!')).toBeInTheDocument();
    expect(screen.getByText('Айгүл және Ерлан, екеуіңізді асыға күтеміз.')).toBeInTheDocument();
  });

  it('softly asks declining guests to reconsider before final submission', async () => {
    render(<RSVPForm />);

    fireEvent.change(screen.getByLabelText('Есіміңіз'), { target: { value: 'Мұрат' } });
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

    fireEvent.change(screen.getByLabelText('Есіміңіз'), { target: { value: 'Дана' } });
    fireEvent.click(screen.getByLabelText('Өкінішке орай, келе алмаймын'));
    fireEvent.click(screen.getByRole('button', { name: 'Жарайды, келемін' }));
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('dialog', { name: 'Жауап қабылданды' })).toBeInTheDocument();
    expect(screen.getByText('Дана, сізге арналған орын сақталды.')).toBeInTheDocument();
  });

  it('keeps form data visible and shows retry copy when submission fails', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('network'));
    render(<RSVPForm />);

    fireEvent.change(screen.getByLabelText('Есіміңіз'), { target: { value: 'Айдана' } });
    fireEvent.click(screen.getByLabelText('Әрине, келемін'));
    fireEvent.click(screen.getByRole('button', { name: 'Жіберу' }));

    expect(await screen.findByText('Жауап жіберілмеді. Интернетті тексеріп, қайта байқап көріңіз.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Айдана')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
