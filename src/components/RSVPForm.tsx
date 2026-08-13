'use client';

import { useState } from 'react';
import type { Attendance, RSVPSubmission, RSVPErrors } from '@/lib/rsvp';
import { hasRSVPErrors, rsvpOptions, submitRSVP, validateRSVP } from '@/lib/rsvp';
import { FinalScene } from './FinalScene';
import { ScrollSection } from './ScrollSection';

export function RSVPForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance | ''>('');
  const [partnerName, setPartnerName] = useState('');
  const [declineConfirmed, setDeclineConfirmed] = useState(false);
  const [errors, setErrors] = useState<RSVPErrors>({});
  const [submission, setSubmission] = useState<RSVPSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleAttendanceChange(value: Attendance) {
    setAttendance(value);
    setErrors({});

    if (value !== 'with_partner') {
      setPartnerName('');
    }

    if (value !== 'not_coming') {
      setDeclineConfirmed(false);
    }
  }

  async function handleSubmit() {
    const nextErrors = validateRSVP({ name, attendance, partnerName, declineConfirmed });
    setErrors(nextErrors);
    setSubmitError('');

    if (hasRSVPErrors(nextErrors) || !attendance) {
      return;
    }

    const nextSubmission: RSVPSubmission = {
      name: name.trim(),
      attendance,
      partnerName: partnerName.trim() || undefined,
      submittedAt: new Date().toISOString(),
      userAgent: typeof navigator === 'undefined' ? undefined : navigator.userAgent,
    };

    setIsSubmitting(true);

    try {
      await submitRSVP(nextSubmission);
      setSubmission(nextSubmission);
    } catch {
      setSubmitError('Жауап жіберілмеді. Интернетті тексеріп, қайта байқап көріңіз.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollSection ariaLabel="Сауалнама" className="section-panel px-5 py-14">
      <div className="rounded-[1.8rem] border border-white/22 bg-black/26 px-4 py-10 text-white shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-sm">
        <p className="sr-only">Сауалнама</p>
        <h2 className="script-heading text-center">Анкета</h2>
        <p className="mx-auto mt-4 max-w-xs text-center text-lg leading-8 text-lavender-soft/82">
          Тойға қатысуыңызды растауыңызды сұраймыз.
        </p>
        <form className="mt-8 space-y-6" onSubmit={(event) => event.preventDefault()}>
          <label className="block text-sm font-semibold tracking-[0.08em] text-white/82" htmlFor="guest-name">
            Есіміңіз
          </label>
          <input
            id="guest-name"
            className="w-full border-0 border-b border-white/55 bg-transparent px-1 py-4 text-lg text-white outline-none placeholder:text-white/36 focus:border-lavender-soft"
            name="name"
            placeholder="Мысалы: Айгүл"
            type="text"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          {errors.name ? <p className="-mt-4 text-sm text-lavender-soft">{errors.name}</p> : null}
          <div className="space-y-3" role="group" aria-label="Тойға келесіз бе?">
            {rsvpOptions.map((option) => (
              <label
                key={option.value}
                 className={`flex cursor-pointer items-start gap-3 rounded-[1.25rem] border px-4 py-4 transition ${
                   attendance === option.value
                     ? 'border-lavender-soft/70 bg-lavender-soft/12 text-white shadow-[0_16px_38px_rgba(0,0,0,0.24)]'
                     : 'border-white/20 bg-black/18 text-white/78'
                }`}
              >
                <input
                  aria-label={option.label}
                  checked={attendance === option.value}
                  className="mt-1 h-4 w-4 accent-plum"
                  name="attendance"
                  type="radio"
                  value={option.value}
                  onChange={() => handleAttendanceChange(option.value)}
                />
                <span>
                  <span className="block font-semibold">{option.label}</span>
                  <span className="mt-1 block text-sm opacity-70">{option.helper}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.attendance ? <p className="-mt-3 text-sm text-maroon">{errors.attendance}</p> : null}
          {attendance === 'with_partner' ? (
            <div className="rounded-[1.25rem] border border-lavender-soft/28 bg-black/18 px-4 py-3">
              <label className="block text-sm font-semibold tracking-[0.08em] text-white/82" htmlFor="partner-name">
                Жұбайыңыздың есімі
              </label>
              <input
                id="partner-name"
                className="mt-2 w-full border-0 border-b border-white/55 bg-transparent px-1 py-2.5 text-base text-white outline-none placeholder:text-white/36 focus:border-lavender-soft"
                placeholder="Мысалы: Ерлан"
                type="text"
                value={partnerName}
                onChange={(event) => setPartnerName(event.currentTarget.value)}
              />
              {errors.partnerName ? <p className="mt-3 text-sm text-lavender-soft">{errors.partnerName}</p> : null}
            </div>
          ) : null}
          {attendance === 'not_coming' ? (
            <div className="rounded-[1.25rem] border border-white/20 bg-black/20 p-5 text-center">
              <p className="font-display text-3xl italic text-white">Шынымен келе алмайсыз ба?</p>
              <p className="mt-3 text-base leading-7 text-white/70">
                Марал сізді қонақтардың арасынан көремін деп қуанып жүр еді. Егер мүмкіндігіңіз болса, жауабыңызды қайта қарап көріңіз.
              </p>
              <div className="mt-5 grid gap-3">
                <button
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black"
                  type="button"
                  onClick={() => handleAttendanceChange('coming')}
                >
                  Жарайды, келемін
                </button>
                <button
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
                  type="button"
                  onClick={() => {
                    setDeclineConfirmed(true);
                    setErrors((current) => ({ ...current, declineConfirmation: undefined }));
                  }}
                >
                  Иә, өкінішке орай келе алмаймын
                </button>
              </div>
              {declineConfirmed ? <p className="mt-4 text-sm text-white/58">Түсінікті, жауабыңызды қабылдаймыз.</p> : null}
              {errors.declineConfirmation ? <p className="mt-4 text-sm text-lavender-soft">{errors.declineConfirmation}</p> : null}
            </div>
          ) : null}
          {submitError ? <p className="rounded-[1.1rem] bg-white/10 px-4 py-3 text-center text-sm leading-6 text-lavender-soft">{submitError}</p> : null}
          <button
            className="w-full rounded-[1.25rem] bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black shadow-[0_20px_55px_rgba(255,255,255,0.16)] transition hover:bg-lavender-soft focus:outline-none focus:ring-4 focus:ring-lavender/25 disabled:cursor-wait disabled:opacity-70"
            disabled={isSubmitting}
            type="button"
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Жіберіліп жатыр...' : 'Жіберу'}
          </button>
        </form>
      </div>
      {submission ? <FinalScene submission={submission} onClose={() => setSubmission(null)} /> : null}
    </ScrollSection>
  );
}
