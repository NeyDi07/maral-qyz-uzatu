'use client';

import { useState } from 'react';
import type { Attendance, RSVPSubmission, RSVPErrors } from '@/lib/rsvp';
import { hasRSVPErrors, rsvpOptions, submitRSVP, validateRSVP } from '@/lib/rsvp';
import { FinalScene } from './FinalScene';
import { ScrollSection } from './ScrollSection';

type GuestCount = 1 | 2;

const PersonIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PeopleIcon = ({ count, className = '' }: { count: number; className?: string }) => (
  <svg className={className} viewBox="0 0 36 24" fill="none" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => {
      const cx = i === 0 ? 10 : i === 1 ? 26 : 18;
      const cy = i === 2 ? 14 : 7;
      return (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3.8" stroke="currentColor" strokeWidth="1.7" />
          <path d={`M${cx - 4} ${cy + 10}c0-2.2 1.8-4 4-4s4 1.8 4 4`} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </g>
      );
    })}
  </svg>
);

const guestCountOptions: { value: GuestCount; label: string; helper: string }[] = [
  { value: 1, label: 'Өзім келемін', helper: 'Жалғыз қонақ' },
  { value: 2, label: 'Жұбайыммен келемін', helper: 'Екеуміз барамыз' },
];

export function RSVPForm() {
  const [attendance, setAttendance] = useState<Attendance | ''>('');
  const [guestCount, setGuestCount] = useState<GuestCount>(1);
  const [guestNames, setGuestNames] = useState<string[]>(['']);
  const [declineConfirmed, setDeclineConfirmed] = useState(false);
  const [errors, setErrors] = useState<RSVPErrors>({});
  const [submission, setSubmission] = useState<RSVPSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleAttendanceChange(value: Attendance) {
    setAttendance(value);
    setErrors({});

    if (value === 'coming') {
      setGuestCount(1);
      setGuestNames(['']);
      setDeclineConfirmed(false);
      return;
    }

    if (value === 'not_coming') {
      setGuestNames(['']);
      return;
    }
  }

  function handleGuestCountChange(value: GuestCount) {
    setGuestCount(value);
    setErrors((current) => ({ ...current, guestNames: undefined }));
    setGuestNames((current) => Array.from({ length: value }, (_, index) => current[index] ?? ''));
  }

  function handleGuestNameChange(index: number, value: string) {
    setGuestNames((current) => current.map((guestName, currentIndex) => (currentIndex === index ? value : guestName)));
  }

  async function handleSubmit() {
    const activeGuestNames = attendance === 'coming' ? guestNames.slice(0, guestCount) : [];
    const primaryName = activeGuestNames[0]?.trim() || '';
    const nextErrors = validateRSVP({ name: primaryName, attendance, guestNames: activeGuestNames, partnerName: activeGuestNames[1]?.trim() || '', declineConfirmed });
    setErrors(nextErrors);
    setSubmitError('');

    if (hasRSVPErrors(nextErrors) || !attendance) {
      return;
    }

    const nextSubmission: RSVPSubmission = {
      name: attendance === 'coming' ? primaryName : 'Қонақ',
      attendance,
      guestCount: attendance === 'coming' ? guestCount : 0,
      guestNames: attendance === 'coming' ? activeGuestNames.map((guestName) => guestName.trim()) : [],
      partnerName: attendance === 'coming' && activeGuestNames[1] ? activeGuestNames[1].trim() : undefined,
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
    <ScrollSection ariaLabel="Сауалнама" className="section-panel px-5 pb-6 pt-8">
      <div className="rsvp-card rounded-[1.8rem] px-4 py-7 text-plum">
        <p className="sr-only">Сауалнама</p>
        <h2 className="script-heading text-center">Анкета</h2>
        <p className="mx-auto mt-3 max-w-xs text-center text-lg leading-8 text-lavender-deep/75">
          Тойға қатысуыңызды растауыңызды сұраймыз.
        </p>
        <form className="mt-5 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-3" role="group" aria-label="Тойға келесіз бе?">
            {rsvpOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-[1.25rem] px-4 py-3 transition ${
                  attendance === option.value
                    ? 'border border-lavender bg-lavender-soft/20 text-plum shadow-[0_14px_34px_rgba(123,44,191,0.14)]'
                    : 'border border-lavender-soft/35 bg-white/55 text-plum/85'
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
                  <span className="mt-1 block text-sm text-plum/65">{option.helper}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.attendance ? <p className="-mt-3 text-sm text-maroon">{errors.attendance}</p> : null}

          {attendance === 'coming' ? (
            <div className="rounded-[1.35rem] border border-lavender-soft/40 bg-white/55 p-4">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-lavender-deep">Қонақ саны</p>
              <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Қонақ саны">
                {guestCountOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`guest-count-card flex cursor-pointer flex-col items-center rounded-[1rem] px-2 py-3 text-center transition ${
                      guestCount === option.value ? 'guest-count-card-active text-plum' : 'text-plum/75'
                    }`}
                  >
                    <input
                      aria-label={option.label}
                      checked={guestCount === option.value}
                      className="sr-only"
                      name="guest-count"
                      type="radio"
                      value={option.value}
                      onChange={() => handleGuestCountChange(option.value)}
                    />
                    <span className="text-lavender-deep" aria-hidden="true">
                      {option.value === 1 ? (
                        <PersonIcon className="h-6 w-6" />
                      ) : (
                        <PeopleIcon count={2} className="h-8 w-8" />
                      )}
                    </span>
                    <span className="mt-2 text-sm font-semibold">{option.label}</span>
                    <span className="mt-1 text-[0.64rem] leading-4 text-plum/55">{option.helper}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4 space-y-3">
                {guestNames.slice(0, guestCount).map((guestName, index) => (
                  <div key={index}>
                    <label className="block text-sm font-semibold tracking-[0.08em] text-plum/80" htmlFor={`guest-name-${index}`}>
                      {index + 1}-қонақтың есімі
                    </label>
                    <input
                      id={`guest-name-${index}`}
                      className="rsvp-input mt-2 px-2 py-3 text-base"
                      placeholder={index === 0 ? 'Мысалы: Айгүл' : index === 1 ? 'Жұбайыңыздың есімі' : 'Есімі'}
                      type="text"
                      value={guestName}
                      onChange={(event) => handleGuestNameChange(index, event.currentTarget.value)}
                    />
                    {errors.guestNames?.[index] ? <p className="mt-2 text-sm text-maroon">{errors.guestNames[index]}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {attendance === 'not_coming' ? (
            <div className="rounded-[1.25rem] border border-lavender-soft/45 bg-white/70 p-5 text-center">
              <p className="font-display text-3xl italic text-plum">Шынымен келе алмайсыз ба?</p>
              <p className="mt-3 text-base leading-7 text-plum/70">
                Марал сізді қонақтардың арасынан көремін деп қуанып жүр еді. Егер мүмкіндігіңіз болса, жауабыңызды қайта қарап көріңіз.
              </p>
              <div className="mt-5 grid gap-3">
                <button
                  className="rounded-full bg-plum px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ivory shadow-[0_14px_34px_rgba(74,36,79,0.24)] transition hover:bg-lavender-deep focus:outline-none focus:ring-4 focus:ring-lavender/25"
                  type="button"
                  onClick={() => handleAttendanceChange('coming')}
                >
                  Жарайды, келемін
                </button>
                <button
                  className="rounded-full border border-plum/25 bg-transparent px-5 py-3 text-sm font-semibold text-plum transition hover:bg-plum/5 focus:outline-none focus:ring-4 focus:ring-lavender/20"
                  type="button"
                  onClick={() => {
                    setDeclineConfirmed(true);
                    setErrors((current) => ({ ...current, declineConfirmation: undefined }));
                  }}
                >
                  Иә, өкінішке орай келе алмаймын
                </button>
              </div>
              {declineConfirmed ? <p className="mt-4 text-sm text-plum/60">Түсінікті, жауабыңызды қабылдаймыз.</p> : null}
              {errors.declineConfirmation ? <p className="mt-4 text-sm text-maroon">{errors.declineConfirmation}</p> : null}
            </div>
          ) : null}
          {submitError ? <p className="rounded-[1.1rem] bg-maroon/10 px-4 py-3 text-center text-sm leading-6 text-maroon">{submitError}</p> : null}
          <button
            className="w-full rounded-[1.25rem] bg-plum px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ivory shadow-[0_18px_44px_rgba(74,36,79,0.28)] transition hover:bg-lavender-deep focus:outline-none focus:ring-4 focus:ring-lavender/30 disabled:cursor-wait disabled:opacity-70"
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