# Maral Qyz Uzatu Invitation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium mobile-first Kazakh `Қыз ұзату` invitation website for Maral with music, scroll animations, event details, RSVP form, and later Google Sheets integration.

**Architecture:** A single-page Next.js app deployed on Vercel. The page is split into focused React components for hero, audio player, invitation text, event details, calendar, location, countdown, dress code, RSVP, and final response scene. Media lives under `public/media` with stable filenames.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion or Motion, CSS custom properties, Google Apps Script endpoint for Google Sheets in the final integration phase.

---

## Fixed Product Decisions

- Language: Kazakh.
- Main name: `Марал`.
- Event: `Қыз ұзату`.
- Hero date: `04.10.26`.
- Full event date: `4 қазан 2026 жыл`.
- Time: `сағат 18:00-де басталады`.
- Venue: `Aisha мейрамханасы`.
- Address: `Өскемен қаласы, Виноградов көшесі, 33`.
- 2GIS link: `https://2gis.kz/ustkam/geo/70000001021695272/82.592973,49.966792`.
- Hosts: `Той иелері: Дәурен - Римма`.
- RSVP name field: `Есіміңіз`.
- RSVP choices:
  - `Әрине, келемін`
  - `Жұбайыммен бірге келемін`
  - `Өкінішке орай, келе алмаймын`
- Phone field: no.
- Guest count field: no.
- Music file: `Основная_музыка.mp3`.
- Music behavior: start from 30 seconds after first user interaction, loop enabled.

---

## Design Direction

The design combines the two references instead of copying either one.

- From reference 1: traditional Kazakh solemnity, large portrait-based sections, white text over image, gold ornaments, calendar, countdown, RSVP, music controls.
- From reference 2: soft lavender palette, floral lightness, white/champagne surfaces, elegant serif typography, more breathing room.
- Final direction: premium lavender/champagne `Қыз ұзату` invitation with restrained gold Kazakh ornaments and modern scroll choreography.

Core palette:

```css
--cream: #f8f4f0;
--lavender-soft: #ede4f2;
--lavender: #9c77aa;
--plum: #4a244f;
--gold: #c8a45d;
--maroon: #8b2f3c;
--ink: #241826;
```

Typography strategy:

- Decorative script for `Марал` only, because Kazakh Cyrillic support in script fonts is often weak.
- Elegant serif for headings and formal blocks.
- Readable Cyrillic-supported sans/serif for body text.
- Main event text uses `Қыз ұзату`; `Qyz Uzatu` may appear only as a small decorative modern accent.

Motion strategy:

- Avoid cheap fade-only reveals.
- Use section-level reveal choreography: masked ornaments, staggered text, slow parallax background, card lifting, calendar cell assembly, count-up/countdown movement.
- Keep performance safe for phones: transform/opacity animations only where possible, avoid heavy canvas/video effects.

---

## Planned File Structure

```text
.
├─ package.json
├─ next.config.ts
├─ tsconfig.json
├─ postcss.config.mjs
├─ tailwind.config.ts
├─ src/
│  ├─ app/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ AudioPlayer.tsx
│  │  ├─ CalendarCard.tsx
│  │  ├─ Countdown.tsx
│  │  ├─ DressCode.tsx
│  │  ├─ FinalScene.tsx
│  │  ├─ Hero.tsx
│  │  ├─ InvitationText.tsx
│  │  ├─ LocationCard.tsx
│  │  ├─ Ornament.tsx
│  │  ├─ RSVPForm.tsx
│  │  ├─ ScrollSection.tsx
│  │  └─ TimeDetails.tsx
│  ├─ data/
│  │  └─ invitation.ts
│  └─ lib/
│     ├─ audio.ts
│     ├─ countdown.ts
│     └─ rsvp.ts
├─ public/
│  └─ media/
│     ├─ audio/
│     │  └─ main.mp3
│     ├─ photos/
│     │  ├─ maral-hero.jpeg
│     │  └─ maral-secondary.jpeg
│     └─ references/
│        ├─ ref-red-01.jpeg
│        ├─ ref-red-02.jpeg
│        ├─ ref-red-03.jpeg
│        ├─ ref-red-04.jpeg
│        ├─ ref-red-05.jpeg
│        ├─ ref-lavender-01.jpeg
│        ├─ ref-lavender-02.jpeg
│        └─ ref-lavender-03.jpeg
└─ docs/
   └─ superpowers/
      └─ plans/
         └─ 2026-08-12-maral-qyz-uzatu-invitation.md
```

Media note:

- Existing WhatsApp images should be manually reviewed during Stage 1.
- Actual Maral photos should go into `public/media/photos`.
- Reference screenshots should go into `public/media/references` and should not be used as final site assets unless explicitly approved.

---

## Stage 1: Project Foundation And Media Organization

**Purpose:** Create the Next.js project structure, install the required frontend stack, and move media into stable public paths.

**Files:**

- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create folders under `public/media`
- Move/rename `Основная_музыка.mp3` to `public/media/audio/main.mp3`
- Move reference images into `public/media/references`

**Steps:**

- [ ] Initialize Next.js + TypeScript + Tailwind project files without overengineering.
- [ ] Install dependencies: `next`, `react`, `react-dom`, `framer-motion`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, lint tooling if practical.
- [ ] Create `public/media/audio`, `public/media/photos`, and `public/media/references`.
- [ ] Move music to `public/media/audio/main.mp3`.
- [ ] Move current screenshots/references to `public/media/references` with readable names.
- [ ] Keep actual Maral photos separate from references once they are provided.
- [ ] Add base metadata in `layout.tsx`: title, description, viewport, theme color.
- [ ] Add base Tailwind/theme variables in `globals.css`.
- [ ] Verify with `npm run dev` and open local page.
- [ ] Verify with `npm run build`.

**Acceptance criteria:**

- The project runs locally.
- The build succeeds.
- Media is not scattered in the root folder.
- There is a blank but styled base page ready for components.

---

## Stage 2: Visual System And Static Page Skeleton

**Purpose:** Build the full page structure without complex interactions first, so layout, rhythm, text hierarchy, and mobile rendering are correct.

**Files:**

- Create: `src/data/invitation.ts`
- Create: `src/components/Hero.tsx`
- Create: `src/components/InvitationText.tsx`
- Create: `src/components/TimeDetails.tsx`
- Create: `src/components/CalendarCard.tsx`
- Create: `src/components/LocationCard.tsx`
- Create: `src/components/Countdown.tsx`
- Create: `src/components/DressCode.tsx`
- Create: `src/components/RSVPForm.tsx`
- Create: `src/components/Ornament.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Content to use:**

```text
Құрметті ағайын-туыс, бауырлар, құда-жекжат, нағашы-жиен, бөлелер, дос-жаран!

Сіздерді аяулы қызымыз Маралдың ұзату тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.

Қуанышымызға ортақ болып, салтанатты кешіміздің сәнін кіргізсеңіздер, біз үшін үлкен мәртебе.
```

```text
Той салтанаты:
4 қазан 2026 жыл
сағат 18:00-де басталады
```

```text
Мекен-жайымыз:
Өскемен қаласы,
Виноградов көшесі, 33

Aisha мейрамханасы
```

```text
Дресс-код:
Құрметті қонақтар, мерекенің үйлесімді көрінуі үшін киіміңізге ашық, нәзік немесе ақ түсті деталь қосуды сұраймыз.
```

```text
Келіңіздер, қуанышымыздың куәсі болыңыздар!

Құрметпен, той иелері:
Дәурен - Римма
```

**Steps:**

- [ ] Put all event constants into `src/data/invitation.ts`.
- [ ] Build mobile-first section flow in `page.tsx`.
- [ ] Use temporary hero image from available media until actual Maral photos are chosen.
- [ ] Build a polished `Hero` with `Марал`, `Қыз ұзату`, `04.10.26`, and an audio-open CTA placeholder.
- [ ] Build formal invitation text section with readable typography.
- [ ] Build date/time cards with the full date and `18:00` visually separated.
- [ ] Build October 2026 calendar and highlight `4` with a heart/gold mark.
- [ ] Build location card with 2GIS button.
- [ ] Build countdown placeholders.
- [ ] Build dress-code section with temporary text.
- [ ] Build RSVP form shell without submit integration.
- [ ] Build final hosts/footer block.
- [ ] Verify mobile layout at narrow widths and desktop centered phone-like layout.
- [ ] Verify `npm run build`.

**Acceptance criteria:**

- The full invitation can be read from top to bottom.
- The page looks intentional on mobile.
- Desktop does not break; content stays in a controlled centered vertical canvas.
- No form submission or music behavior is required yet.

---

## Stage 3: Music Player And Invitation Opening Experience

**Purpose:** Implement the premium entry interaction and real audio controls.

**Files:**

- Create: `src/components/AudioPlayer.tsx`
- Create: `src/lib/audio.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`

**Behavior:**

- User sees an opening CTA: `Әуенді қосып, шақыруды ашу`.
- On click, `main.mp3` starts from 30 seconds.
- Audio loops.
- If autoplay fails, the CTA remains and shows a friendly instruction.
- Player includes heart play/pause, progress bar, and draggable seek.
- Internal track model supports more tracks later, but only one is displayed now.

**Steps:**

- [ ] Create audio track config in `src/lib/audio.ts` with `/media/audio/main.mp3`, title, and `startAt: 30`.
- [ ] Add an opened/unopened state in the page.
- [ ] Make hero CTA start audio and unlock the page experience.
- [ ] Implement `AudioPlayer` using a native `<audio>` element.
- [ ] Track `currentTime`, `duration`, and `paused` state.
- [ ] Add progress input range that seeks audio.
- [ ] Add heart button for play/pause.
- [ ] Enable loop.
- [ ] Keep controls accessible with labels.
- [ ] Test in browser: start, pause, resume, seek, loop.
- [ ] Verify `npm run build`.

**Acceptance criteria:**

- Music starts after click from second 30.
- Progress bar moves in real time.
- User can seek.
- Player does not block reading content.
- Page still works if audio cannot play.

---

## Stage 4: Premium Scroll Motion And Visual Refinement

**Purpose:** Turn the static skeleton into a high-quality animated invitation without hurting mobile performance.

**Files:**

- Create: `src/components/ScrollSection.tsx`
- Modify: all section components as needed
- Modify: `src/app/globals.css`

**Motion plan:**

- Hero: layered reveal after audio CTA.
- Invitation text: staggered lines and slow ornament reveal.
- Time block: date and time cards rise with slight depth.
- Calendar: month title first, weekday row second, date cells staggered, `4` highlighted last.
- Location: card appears as a lifted invitation card with a glowing 2GIS button.
- Countdown: numbers animate and update.
- Dress code: soft fabric/floral panel reveal.
- RSVP: answer cards appear one by one.
- Final scene: separate full-screen/modal animation after successful submit.

**Steps:**

- [ ] Create reusable `ScrollSection` with Framer Motion viewport reveal.
- [ ] Add masked/staggered reveal to text sections.
- [ ] Add background texture/noise and subtle gradient layers in CSS.
- [ ] Add ornament SVG/CSS component with gold/lavender variants.
- [ ] Add gentle parallax where safe.
- [ ] Build a polished countdown animation using current time calculations.
- [ ] Respect `prefers-reduced-motion` by reducing animation intensity.
- [ ] Test on mobile viewport and desktop viewport.
- [ ] Verify Lighthouse or manual performance feels smooth.
- [ ] Verify `npm run build`.

**Acceptance criteria:**

- Animations feel integrated into the design, not pasted on top.
- Scrolling stays smooth on mobile.
- Text remains readable.
- Reduced-motion users are not forced into heavy motion.

---

## Stage 5: RSVP Form Logic And Final Scene

**Purpose:** Make the questionnaire feel modern, validate input, handle conditional fields, and show a memorable post-submit animation.

**Files:**

- Modify: `src/components/RSVPForm.tsx`
- Create: `src/components/FinalScene.tsx`
- Create: `src/lib/rsvp.ts`

**Form behavior:**

- Required: guest name.
- Required: attendance option.
- If `Жұбайыммен бірге келемін`, require partner name.
- If `Өкінішке орай, келе алмаймын`, show a soft reconsideration block before final submit.
- On submit, show a custom animated final scene based on selected answer.
- At this stage, data can be stored locally in state and logged to console; Google Sheets comes later.

**Final scene copy:**

For `Әрине, келемін`:

```text
Жауабыңыз қабылданды!
Маралдың қуанышына ортақ болатыныңызға қуаныштымыз.
Сізге арналған орын сақталды.
Кездескенше!
```

For `Жұбайыммен бірге келемін`:

```text
Тамаша!
Екеуіңізді асыға күтеміз.
Сіздерге арнайы орын сақталды.
```

For `Өкінішке орай, келе алмаймын`:

```text
Жауабыңыз қабылданды.
Өкінішті, әрине...
Бірақ қуанышымызды жүрегіңізбен бөліскеніңіз үшін рақмет.
```

Reconsideration block:

```text
Шынымен келе алмайсыз ба?
Марал сізді қонақтардың арасынан көремін деп қуанып жүр еді.
Егер мүмкіндігіңіз болса, жауабыңызды қайта қарап көріңіз.
```

Buttons:

```text
Жарайды, келемін
Иә, өкінішке орай келе алмаймын
```

**Steps:**

- [ ] Replace radio buttons with large selectable cards.
- [ ] Add required validation for name and answer.
- [ ] Add conditional partner-name input.
- [ ] Add reconsideration block for declined answer.
- [ ] Add `FinalScene` as a modal/fullscreen overlay.
- [ ] Animate final scene as an opening invitation card with gold ornament, soft lavender glow, and seal-like acceptance mark.
- [ ] Add close/back button: `Шақыруға қайта оралу`.
- [ ] Verify all three answer paths.
- [ ] Verify keyboard accessibility.
- [ ] Verify `npm run build`.

**Acceptance criteria:**

- User cannot submit incomplete data.
- Partner name appears only when needed.
- Decline path is playful but respectful.
- Successful submission feels unique, not like a plain alert.

---

## Stage 6: Google Sheets Integration

**Purpose:** Send RSVP responses to a Google Sheet through a lightweight Google Apps Script endpoint.

**Files:**

- Create: `docs/google-sheets-setup.md`
- Modify: `src/lib/rsvp.ts`
- Modify: `src/components/RSVPForm.tsx`
- Create: `.env.local.example`

**Data shape:**

```ts
type RSVPSubmission = {
  name: string;
  attendance: 'coming' | 'with_partner' | 'not_coming';
  partnerName?: string;
  submittedAt: string;
  userAgent?: string;
};
```

**Google Sheet columns:**

```text
Submitted At | Name | Attendance | Partner Name | User Agent
```

**Steps:**

- [ ] Create a Google Sheet with the columns above.
- [ ] Create a Google Apps Script web app that accepts POST JSON.
- [ ] Store the web app URL in `NEXT_PUBLIC_RSVP_ENDPOINT` or server-side route depending on chosen security level.
- [ ] Implement `submitRSVP` in `src/lib/rsvp.ts`.
- [ ] Add loading, success, and error states in `RSVPForm`.
- [ ] Keep final scene only after successful submission.
- [ ] If submission fails, show respectful retry copy.
- [ ] Test with one real Google Sheet row.
- [ ] Verify `npm run build`.

**Acceptance criteria:**

- A real RSVP appears in Google Sheets.
- User sees clear loading and success/error states.
- The form does not lose input on temporary network failure.

---

## Stage 7: Real Photos, Responsive Polish, SEO, And Vercel Deployment

**Purpose:** Replace placeholders with final Maral photos, polish browser/device behavior, and deploy.

**Files:**

- Modify: `public/media/photos/*`
- Modify: `src/data/invitation.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `public/icon.svg` or `public/favicon.ico`
- Create: `docs/deployment.md`

**Steps:**

- [ ] Choose final hero and secondary photos from Maral assets.
- [ ] Optimize image dimensions and filenames.
- [ ] Replace temporary image paths in data/components.
- [ ] Add Open Graph metadata for link previews.
- [ ] Add favicon/icon.
- [ ] Test on mobile viewport widths: 360, 390, 430, 768.
- [ ] Test desktop behavior: centered phone-like canvas, no broken full-width layout.
- [ ] Test audio start and form flow after production build.
- [ ] Deploy to Vercel.
- [ ] Add environment variable for RSVP endpoint in Vercel.
- [ ] Verify production URL on iPhone/Android if available.

**Acceptance criteria:**

- Final photos are used.
- Site looks correct on phones and desktop.
- Vercel deployment works.
- Google Sheets submission works in production.
- Link preview is presentable.

---

## Stage Order And Checkpoints

Recommended execution order:

1. Foundation and media organization.
2. Static visual skeleton.
3. Audio player and opening experience.
4. Premium scroll motion and visual refinement.
5. RSVP logic and final scene.
6. Google Sheets integration.
7. Final photos, responsive polish, SEO, deployment.

After each stage:

- Run `npm run build`.
- Review the site visually in mobile viewport.
- Confirm no unrelated files were changed.
- Ask the user to approve the visible result before moving to the next stage.

---

## Risks And Constraints

- Browser autoplay policy prevents guaranteed music playback without a user tap. The first CTA solves this cleanly.
- Script fonts may not support all Kazakh Cyrillic letters. Use script mostly for `Марал`; use reliable fonts for Kazakh text.
- Heavy animations can lag on older phones. Keep effects based on transform, opacity, masks, and lightweight CSS.
- Reference screenshots should guide design, not be reused as final art unless explicitly approved.
- Google Apps Script endpoint is simple and effective, but it should not contain sensitive secrets in frontend code.

---

## Definition Of Done

- The site is a polished single-page mobile-first invitation.
- Music starts from 30 seconds after first interaction and can be controlled.
- Event data is accurate.
- Countdown targets `2026-10-04T18:00:00+05:00` unless the timezone is later corrected.
- RSVP form validates fields and writes to Google Sheets.
- Final response animation is polished and answer-specific.
- Site deploys successfully to Vercel.
- Production link works on modern iPhone and Android browsers.
