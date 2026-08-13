export type Attendance = 'coming' | 'with_partner' | 'not_coming';

export type RSVPSubmission = {
  name: string;
  attendance: Attendance;
  partnerName?: string;
  submittedAt: string;
  userAgent?: string;
};

export type RSVPErrors = {
  name?: string;
  attendance?: string;
  partnerName?: string;
  declineConfirmation?: string;
};

export const rsvpOptions: { value: Attendance; label: string; helper: string }[] = [
  {
    value: 'coming',
    label: 'Әрине, келемін',
    helper: 'Қуанышымызға ортақ боласыз.',
  },
  {
    value: 'with_partner',
    label: 'Жұбайыммен бірге келемін',
    helper: 'Екеуіңізге арнайы орын дайындаймыз.',
  },
  {
    value: 'not_coming',
    label: 'Өкінішке орай, келе алмаймын',
    helper: 'Жауабыңызды түсіністікпен қабылдаймыз.',
  },
];

type ValidateRSVPInput = {
  name: string;
  attendance: Attendance | '';
  partnerName: string;
  declineConfirmed: boolean;
};

export function validateRSVP({ name, attendance, partnerName, declineConfirmed }: ValidateRSVPInput): RSVPErrors {
  const errors: RSVPErrors = {};

  if (!name.trim()) {
    errors.name = 'Есіміңізді жазыңыз.';
  }

  if (!attendance) {
    errors.attendance = 'Тойға келу жауабыңызды таңдаңыз.';
  }

  if (attendance === 'with_partner' && !partnerName.trim()) {
    errors.partnerName = 'Жұбайыңыздың есімін жазыңыз.';
  }

  if (attendance === 'not_coming' && !declineConfirmed) {
    errors.declineConfirmation = 'Алдымен шешіміңізді нақтылап жіберіңіз.';
  }

  return errors;
}

export function hasRSVPErrors(errors: RSVPErrors) {
  return Object.values(errors).some(Boolean);
}

export async function submitRSVP(submission: RSVPSubmission, endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT) {
  if (!endpoint) {
    throw new Error('RSVP endpoint is not configured.');
  }

  await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(submission),
  });

  return { success: true };
}
