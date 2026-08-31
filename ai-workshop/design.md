# Design System — AI Agents for Lecturers (workshop site)

Companion to [architecture.md](architecture.md). Follow this system for any visual change so the site
stays consistent. It deliberately mirrors the conventions of the CO1005 and CO5151 course sites (same
font stack, container width, card language, dark-mode strategy, `.wrap`/`.block`/`.sec-head` skeleton)
with a palette and a structural color mapping specific to this workshop.

## 1. Orientation

- **Audience**: university lecturers with basic chatbot experience and no programming background —
  attending a single two-hour session, often with the site open on a second screen while they build.
- **Voice**: practical and direct, colleague-to-colleague. It states the failure modes plainly rather
  than selling the technology, and it never implies the tool decides anything about a student.
- **Language**: bilingual EN/VI throughout, English first. See §7.
- **Reading mode**: this site is used *during* a session under time pressure. Every page answers
  "what do I do now" above the fold, and every template is one click from the clipboard.
- **Where CSS lives**: one shared file, `assets/style.css`, linked by all eight pages. Everything above
  the "Workshop additions" banner in that file is inherited verbatim from the CO5151 stylesheet; the
  workshop's own components are appended below it. Change a token once, it applies everywhere.

## 2. Color (design tokens)

Declared as CSS custom properties on `:root`. Never hard-code a color in a component — use the token.

| Token | Light value | Role |
|---|---|---|
| `--paper` | `#F7F9FC` | Page background |
| `--surface` | `#FFFFFF` | Card / strip background |
| `--ink` | `#131C2E` | Primary text |
| `--ink-soft` | `#46536B` | Secondary text |
| `--line` | `#DDE4EF` | Borders, rules |
| `--accent` | `#95307E` (plum) | **Exercise 1** — lesson preparation; the site's primary |
| `--teal` | `#0E8A7B` | **Exercise 2** — assessment and feedback |
| `--amber` | `#B45309` | **Exercise 3** — course support |
| `--red` | `#C23A3A` | Privacy warnings, prohibited delegation, unfilled placeholders |
| `--green` | `#1B7F3B` | Verified, approved, "suits an agent" |

### Why plum, not cobalt or indigo

CO1005 uses cobalt (`#2050D8`), CO5151 violet-indigo (`#5B45E0`). This site uses plum (`#95307E`):
same family of saturated, sober hues so all three read as one instructor's work, far enough away that
a lecturer who visits two of them never confuses the pages. Every neutral and the teal / amber / red /
green semantics are shared verbatim with both course sites.

### Color mapping is structural, not decorative

- **Plum (`--accent`)** = Exercise 1 and the site chrome: wordmark, eyebrows, section numbers, focus rings.
- On the optional tools module the same three colours mark the three **kinds of tool** rather than the
  three exercises — plum for documents you upload, teal for files the agent produces, amber for
  connectors into live services. The ordering is deliberate: amber is already the site's "a human must
  approve this" colour.
- **Teal** = Exercise 2 — its topic cards, checklists (`.checklist.c-teal`), and template bar (`.tpl.t-teal`).
- **Amber** = Exercise 3 — same three components with `.ex3` / `.t-amber`.
- **Ink-soft** = plenary segments (opening, concepts, break, wrap-up) in the agenda.
- **Red** = one meaning only: *a person could be harmed by this*. Privacy warnings, the "does not suit an
  agent" column, and unfilled placeholders in the builder preview. Never used decoratively.
- Tinted backgrounds use `color-mix(in srgb, var(--token) N%, transparent)` rather than new hex values.

### Dark mode

Three states, identical mechanism to CO5151:
1. `:root` — full light palette (default).
2. `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])` — follows the OS.
3. `:root[data-theme="dark"]` — explicit user choice (`#theme-toggle`, stored in
   `localStorage['agentws-theme']`; a different key from `co1005-theme` / `co5151-theme`, so the three
   sites' preferences never leak into each other).

Accent in dark mode lightens to `#E3A2D6`. Never declare a color only inside a dark or light block —
always give it a `:root` default first.

## 3. Typography

Identical stack to both course sites: **Archivo** (700–800) for headings, **Be Vietnam Pro** (400–600)
for body, **IBM Plex Mono** (400–600) for utility text — time ranges, template names, field labels,
badges, and every agent prompt. Body `16.5px` / line-height `1.65`. Headings use `clamp()` and
`text-wrap: balance`.

Agent prompts are **always** monospace, in `pre`. They are text the participant will paste into another
tool, and monospace signals "this is the artefact, not the prose about it."

## 4. Layout & spacing

- Container `max-width: 68rem`; subpages with a sidebar widen to `82rem` via `.layout`.
- Card radius `10–12px`, `1px solid var(--line)` border, `--shadow` token (very light).
- Breakpoints inherited: `1080px` (sidebar appears and the topbar hides its duplicated links),
  `1000px`/`900px` (grids 4→2, builder 2→1), `820px` (hero and `.compare` 2→1), `720px`, `640px`/`560px`.
- Wide content (tables) sits in a `.tbl-scroll` container with `overflow-x: auto`.

## 5. Components added by this site

Everything else — `.hero`, `.facts`, `.sec-head`, `.phase`, `.gate-grid`, `.checklist`, `.topic-card`,
`.note`, `.quiz-block`, `.pagenav`, `.side` — is inherited and used as documented in CO5151's design.md.

- **Template block** (`.tpl` + `.tpl-bar` + `.copy-btn` + `pre.codeblock`): the site's signature
  component. A titled bar naming the template, a copy button, and the prompt itself. `.t-teal` /
  `.t-amber` modifiers tint the bar to the owning exercise. Without JavaScript it degrades to a
  perfectly readable, selectable `<pre>` — the copy button is a convenience, never the only route.
- **Agent builder** (`.builder` + `.bld-form` + `.bld-preview`): two columns on ≥900px, stacked below.
  The preview is `position: sticky` on wide screens so the assembling prompt stays visible while the
  participant scrolls the form. Unfilled sections render as `.ph` (red) inside the preview — the
  missing-context problem made visible *before* the participant runs the agent, which is the single
  most important teaching moment in Exercise 1.
- **Preset row** (`.bld-presets` / `.bld-preset`): pill links between the three exercise builders; the
  current one carries `aria-pressed="true"` and fills with the accent.
- **Tick list** (`.ticklist` / `.tick`): replaces the outline's printed Yes/No tables. A checked item
  turns its left border green and strikes the label through (`:has(input:checked)`). State is per
  participant in `localStorage`, keyed by the list's `id`; every list is accompanied by a visible
  `.tick-reset` and a line saying the state never leaves the browser.
- **Comparison pair** (`.compare` / `.cmp`): two cards, red-topped and green-topped, for
  weak-request vs. agent-workflow and suits-an-agent vs. does-not.
- **Self-check quiz** (`.quiz-block` / `.quiz-q`, inherited from CO5151): twelve questions ending
  every teaching page. Answering marks *both* language groups, so switching language after answering
  shows the same result rather than a fresh question, and the explanation follows the language. The
  options are written to a length-balance rule enforced by `build_quizzes.py` — visually, this is why
  the four buttons in a question are close to the same width, and it is a correctness property of the
  content rather than a styling choice.
- **Structural aliases** (`.week.ex1`, `.phase.ph-ex2`, `.topic-card.ex3`, `.mat-card.ex2`, …): thin
  mappings from the workshop's three exercises onto CO5151's `--wk-c` / `--ph-c` / `--tc-c` variables,
  so no component needed forking.
- **Workflow diagram** (`.wf-node`, `.wf-node.check`, `.wf-node.human`): the home page's only
  illustration — an inline SVG of the seven-step loop, colored by token so it re-themes automatically.
  `.human` (amber) marks the lecturer-approval box, which is deliberately the visual terminus.

## 6. The EN/VI language system

Two mechanisms, chosen per kind of text — see architecture.md §4 for the code.

- **Repeated interface chrome** (navigation, buttons, footer, builder title) carries
  `data-i18n="key"` and is filled from the `DICT` in `assets/i18n.js`. One edit updates all eight
  pages, and the eight navigations can never drift apart.
- **Page prose** is written twice, as sibling blocks marked `lang="en"` / `lang="vi"`, with the
  inactive one hidden by CSS. Translations live next to their source, which is what keeps them honest
  when the English is later edited — a stale translation is visible in the diff rather than buried in
  a dictionary. It also gives every block a correct `lang` attribute for screen readers.

Rules for adding content:

1. **Never add an English block without its Vietnamese sibling.** `python3 langcheck.py`
   is the check: it reports any parent whose `lang="en"` and `lang="vi"` child counts differ.
2. **Pair at the block level, not inside a sentence.** Duplicate the whole `<p>`, `<li>`, `<div class="gate-item">`
   or `<tbody>`'s containing `.tbl-scroll` — never `<span>`-swap words mid-sentence, which produces
   translationese in both languages.
3. **`<title>` has no second copy to hide**, so it comes from `<meta name="title-en">` /
   `<meta name="title-vi">`, applied by `i18n.js`.
4. **Anything JavaScript renders** (theme button, quiz feedback, the builder's section headings,
   character counts, copy-button states) must listen for the `agentws:lang` event rather than being
   written once at load.
5. **The wordmark stays English** — "AI Agents · for Lecturers" is a name, like `CO5151` on the course
   site, not a string to translate.

### Vietnamese typography

**Be Vietnam Pro** was already the body face inherited from CO1005 and carries the full diacritic set,
so Vietnamese needs no font change — only room. Vietnamese runs roughly 20–30% longer than English:
the agenda's time column widens under `:root[data-lang="vi"]`, and the hero diagram drops its SVG
labels a point so "bối cảnh môn học" does not overhang its node. When adding a fixed-width component,
check it in Vietnamese before considering it done.

### Terminology (keep consistent)

`agent` · `chuẩn đầu ra` (learning outcomes) · `đề cương` (syllabus) · `rubric` · `đánh giá quá trình`
(formative assessment) · `rào chắn an toàn` (guardrails) · `quy trình` (workflow) · `prompt` ·
`ẩn danh` (anonymized) · `bảng đối chiếu` (alignment table) · `phúc khảo` (grade appeal) ·
`gian lận học thuật` (academic misconduct). "Agent" and "prompt" stay in English: they are what
lecturers will actually see in the tools' own interfaces.

## 7. Accessibility & motion

- Visible focus ring on every interactive element (`outline: 2px solid var(--accent)`).
- `scroll-behavior: smooth` only under `prefers-reduced-motion: no-preference`.
- No decorative animation; only hover/focus state changes and the fold chevron's rotation.
- The hero SVG carries a full `aria-label` describing the loop in words, because the loop *is* the
  lesson of the first segment — a screen-reader user must get the same content, not a label saying
  "diagram".
- Meaning is never carried by color alone: every color-coded exercise also carries a text label
  (`Exercise 2`, `T3`, `Level C`), and the red placeholders in the builder are also counted in words
  by `.bld-count` ("6 sections still a placeholder" / "còn 6 mục là chỗ trống").
- Every prose block carries a real `lang` attribute, so a screen reader switches voice correctly
  between the two languages, and `<html lang>` follows the active choice.
