# Architecture — AI Agents for Lecturers (workshop site)

Companion to [design.md](design.md) (the design system). Read both before extending the site.

## 1. Overview

- **Kind**: a static, eight-page website supporting a single two-hour workshop plus one optional module. No framework dependency
  beyond Google Fonts. Three small client-side features (copy buttons, tick lists, the agent builder)
  are progressive enhancements — every page is complete and usable with JavaScript disabled.
- **Purpose**: participants have this open on a laptop *while* the session runs. It carries the agenda,
  the concepts, the three exercise briefs with copy-ready agent templates, the platform setup guide, and
  the responsible-use checklists. It is not a slide deck and not a transcript.
- **Language**: bilingual English / Vietnamese, switchable per reader (§4). English is the source
  language and the default; the Vietnamese is a full translation, including every agent template, the
  synthetic student response, and the sample syllabus — a Vietnamese lecturer can run all three
  exercises without touching English.
- **Deployment**: same pattern as the CO1005 and CO5151 sites — GitHub Pages serving `main` from the
  repo root (`.nojekyll` is present), plus optional Claude Artifact publishing via `build.py` (§4).
  Nothing assumes a specific host; opening any file directly from disk also works, and the copy buttons
  have a `document.execCommand` fallback specifically so they still function over `file://`.

## 2. Directory structure

```
Workshop-Website/
├── index.html            # Overview: hero + workflow diagram, learning outcomes, the minute-by-minute
│                         #   agenda, the AGENT checklist, what to bring, links to every other page
├── concepts.html         # 00:10–00:35 — chatbot/assistant/agent, the six components, the workflow
│                         #   loop, what to delegate, the instructor demonstration, a 4-question quiz
├── tools.html            # Optional module (+25 min): the three kinds of tool, Gmail connectors,
│                         #   document analysis, structured output to a spreadsheet, prompt injection
├── platforms.html        # Which free tools clear the bar, the comparison table, privacy toggles,
│                         #   the instructor pre-flight checklist, contingency if a platform is blocked
├── responsible.html      # The five principles, decisions that stay with the lecturer, uncertainty
│                         #   disclosure, the five pre-deployment tests, safety checklist, wrap-up
├── exercises/
│   ├── ex1-lesson.html      # Exercise 1 — Lesson Preparation Agent (+ pair review)
│   ├── ex2-assessment.html  # Exercise 2 — Assessment and Feedback Agent (+ synthetic sample)
│   └── ex3-support.html     # Exercise 3 — Course Support Agent (+ sample syllabus, 3 test questions)
├── assets/
│   ├── style.css         # The ONLY stylesheet — every page links it. Inherited verbatim from CO5151
│   │                     #   above the "Workshop additions" banner; workshop components below it
│   ├── course.js         # Shared engine, inherited: theme toggle + collapsible sections
│   ├── workshop.js       # This site's engine: copy buttons, tick lists, the agent builder
│   └── quiz.js           # Self-check quiz engine, inherited (used only by concepts.html)
├── quiz/                 # One JSON question bank per page — the SOURCE for the self-checks
│   └── *.json            #   concepts, ex1-3, tools, platforms, responsible (12 questions each)
├── build_quizzes.py      # Validates the banks and renders them into the pages' QUIZ markers
├── build.py              # Build self-contained pages for Claude Artifact publishing → dist/
├── langcheck.py          # Verifies every prose block has both its EN and VI sibling
├── dist/                 # Build output (inlined assets, rewritten links) — gitignored
├── architecture.md       # This file
└── design.md             # Design system
```

## 3. Content source & provenance

All content derives from **`../outline.md`**, the session plan. When the workshop changes, edit the
outline first and update the site from it — not the other way around.

- **Agenda (index.html §agenda)** ← outline "Minute-by-minute agenda", one `.week` row per slot.
- **Learning outcomes (index.html §outcomes)** ← outline "Learning outcomes", regrouped from six flat
  items into understand / build / evaluate so the card grid carries meaning.
- **Concepts (concepts.html)** ← outline §2 and the "Instructor demonstration" section. The
  demonstration prompt is reproduced verbatim; the weak-request comparison is the outline's own.
- **Exercise pages** ← outline "Hands-on Exercise 1/2/3". Every agent template is the outline's text
  unchanged — participants and the instructor must see the same words on screen and on paper.
- **Platform page (platforms.html)** ← outline "Platforms and setup", which was written from vendor
  documentation checked in **August 2026**. Free tiers move; the page says so and dates itself. Re-verify
  before each delivery: the two claims most likely to age are "the ChatGPT custom-GPT builder is paid"
  and the per-platform file limits.
- **Responsible use (responsible.html)** ← outline "Responsible and effective agent use" and the
  "AGENT checklist" from the wrap-up.
- **Tools module (tools.html)** ← outline "Optional module — Tools, connectors, and documents". It is
  the only page not part of the two-hour core: the agenda marks it optional, `#timing` gives the +25
  minute breakdown, and the connector section is explicitly demonstration-only. Its platform claims
  (connector tiers and regional availability, free-tier file limits, Gemini file generation) were
  checked against vendor documentation in **August 2026** and date faster than anything else on the
  site — re-verify before each delivery.
- **Self-check questions (`quiz/*.json`)** — written for this site rather than taken from the outline,
  one bank per page, each testing that page's own material. They are deliberately diagnostic rather
  than recall-based: most stems describe a failure a lecturer will actually meet and ask which
  component caused it.
- **Translation** — the Vietnamese is a translation of the English source, not a separate document.
  When the English changes, the sibling `lang="vi"` block changes in the same edit; the balance check
  in design.md §6 catches a block added without its pair, but only a reader catches a translation left
  stale. The agent templates are translated as *working prompts*, not as glosses: a Vietnamese lecturer
  pastes the VI template and gets Vietnamese output.
- **Synthetic materials** — the Research Methodology student response (`ex2`) and the IT2045 syllabus
  extract (`ex3`) are written for this workshop and are entirely fictional. They exist because the
  outline requires instructor fallback material for participants who arrive without their own
  documents, and because no real student work should be pasted into a consumer AI tool. Label them as
  synthetic wherever they appear.

## 4. Key subsystems

### Language engine (`assets/i18n.js`)
Loaded **first** on every page, before `course.js` and `workshop.js`, so the dictionary is applied
before anything else reads the DOM.

- The active language lives on `<html data-lang>`, set by the inline head script before first paint
  (same trick as the theme, so there is no flash of the wrong language), and in
  `localStorage['agentws-language']`.
- `apply(lang)` sets `data-lang` and `<html lang>`, fills every `[data-i18n]` node from `DICT`,
  swaps `document.title` from the `title-en` / `title-vi` meta tags, repaints the `#lang-toggle`
  button (which shows the language you would switch *to*, as on the CO1005 site), and dispatches a
  **`agentws:lang`** CustomEvent.
- Prose is hidden and shown by CSS alone: `:root[data-lang="en"] [lang="vi"] { display: none }` and
  its mirror. With JavaScript disabled the page still shows exactly one language, because the source
  HTML carries `data-lang="en"` on `<html>`.
- Three consumers listen for `agentws:lang`: the theme button's label (`course.js`), quiz feedback
  (`quiz.js`), and the agent builder (`workshop.js`). **Anything new that renders its own text must
  listen too** — that event is the whole contract.

### Inherited engine (`assets/course.js`)
- **Theme toggle**: `localStorage['agentws-theme']` — deliberately a different key from `co1005-theme`
  and `co5151-theme`.
- **Fold sections** (`initFolds`): a `<section class="block">` whose heading is `.sec-head.foldable`
  followed by a `.fold-body` sibling collapses on click. Used for material that is long but only
  occasionally needed: the plain templates, the synthetic samples, and the instructor pre-flight.
  `index.html` and `concepts.html` do not fold — they are read top to bottom, once, during the session.
  A URL hash pointing inside a folded section force-opens it.

### Workshop engine (`assets/workshop.js`)
Three independent features, each a no-op when its markup is absent:

1. **Copy buttons** — every `.tpl` copies the `innerText` of its **visible** `pre` (a bilingual `.tpl`
   holds one per language and picks by `offsetParent`), with a `document.execCommand` fallback for
   `file://` and non-secure contexts, and a 1.8-second "✓ Copied" / "✓ Đã chép" state. Participants
   copy agent templates constantly; this is the site's most-used control.
2. **Tick lists** — `.ticklist` state is stored in `localStorage['agentws-ticks-<list id>']`, keyed per
   item by `data-k` (a stable name, so reordering the list never scrambles saved ticks). A
   `[data-reset="<list id>"]` button clears one list. Nothing is transmitted anywhere; each list says so.
3. **Agent builder** — `#builder[data-preset]` on each exercise page. `PRESETS[preset][lang]` holds
   the defaults for `lesson` / `assessment` / `support` in both languages, and `L[lang]` holds the
   assembled prompt's section headings and red placeholders; `FIELDS` is the fixed field list. On input,
   `assemble()` produces an array of `{text, missing}` parts, `render()` writes them into `.bld-out`
   (wrapping missing ones in `.ph`) and stores the plain-text version on `out.__plain` for the copy
   button. Field values are saved to `localStorage['agentws-builder-<preset>']` so a participant can move
   between the three exercises without losing work; **Reset** clears storage and restores the preset.

   The preview intentionally shows a *complete, runnable* prompt from the first render, with red
   placeholders standing in for what the participant has not supplied. Do not "improve" this by hiding
   unfilled sections — seeing `[COURSE]` in red is the point.

### Self-check quizzes (`quiz/*.json` + `build_quizzes.py`)
Seven pages end with a twelve-question bilingual self-check — 84 questions in total. Unlike the rest
of the site, these are **generated, not hand-written in the HTML**, because two properties have to hold
across every question and are not things anyone can eyeball reliably at that volume:

- **Option length balance.** Within a question, all four options must be close in length, so that
  "the longest one is the answer" is not a strategy. Enforced as `max - min <= max(10 chars, 25% of
  the mean)`, checked per language, and the build fails rather than writing an unbalanced question.
  It also flags a question whose correct option happens to be the longest.
- **Answer spread.** `--rebalance` permutes the options so the correct answer lands evenly across
  A–D. Options are independent of one another, so this changes nothing except which letter is right.

```
python3 build_quizzes.py --check      # validate the banks, write nothing
python3 build_quizzes.py --rebalance  # even out the answer key, then validate and write
python3 build_quizzes.py              # validate and render into the pages
```

Each page carries `<!-- QUIZ -->` / `<!-- /QUIZ -->` markers inside its `.quiz-block`; the renderer
replaces everything between them, so regenerating is idempotent. **Edit the JSON, never the generated
HTML** — the next build overwrites it. The banks are the one place in the site where content does not
live in the page itself, and this is the reason.

### Build & publish (`build.py`)
Same approach as CO1005 and CO5151. For each page: inline local `<link rel="stylesheet">` and
`<script src>`, strip the `<html>/<head>/<body>` wrapper (the artifact host supplies its own), and
rewrite internal `href`s through an optional `dist/urls.json` mapping so pages published as separate
artifacts can still link to each other.

```
python3 build.py     # reads dist/urls.json (if present) → writes dist/*.html, self-contained (~90 kB each)
```

Update flow: edit a source file → `python3 build.py` → republish the corresponding `dist/*.html` to its
existing artifact URL (keeps the link stable) → if `dist/urls.json` has no entry for a newly published
page, add it and rebuild so other pages' links to it resolve. Note that `dist/` flattens paths, so
`exercises/ex1-lesson.html` becomes `dist/ex1-lesson.html`; the `urls.json` keys keep the source paths.

## 5. Content invariants

- **Two hours, three exercises, 40/60 split, no programming, free tools only.** These appear in the
  hero, the facts strip, and the agenda; change them together or not at all.
- **Connectors are demonstration-only.** No exercise asks a participant to connect a real university
  account in a workshop room, and `tools.html` states why. Read-only, draft-never-send, and "ask IT
  first" are not hedges to be edited out — they are the reason the module can be taught at all.
- **The lecturer decides.** Every exercise template contains an explicit refusal (no final grades, no
  misconduct findings, no invented policies), and `responsible.html` lists the decisions that never
  leave the lecturer. Do not soften or remove these when editing prose — they are the reason the
  workshop can be run at all.
- **Synthetic material stays labelled as synthetic** wherever it appears, in both languages.
- **Neither language is second-class.** Every exercise, template, sample document and checklist exists
  in both. A section that exists only in English is a bug, not a work in progress.
- **No student data anywhere on this site**, including in examples.
- Internal links are **relative paths** — they work opened from disk and once hosted; `build.py`
  rewrites them to absolute artifact URLs only in `dist/`.
- The platform page carries a visible "checked August 2026" date. Keep it accurate or remove the claim.

## 6. Extension ideas

1. A printable one-page **agent design canvas** (the six components as a form) for participants working
   on paper — currently the outline lists it as a workshop material but the site has no print view.
2. A **timer** on the agenda page that highlights the current segment during delivery.
3. A third language, if the workshop travels. The mechanism generalises: add a `DICT` entry and a
   `lang="xx"` sibling per block, and extend the two CSS rules — but the prose doubles again, so weigh
   it against splitting into per-language builds.
4. A short **gallery of failures** — real (anonymized) agent outputs that went wrong, with the
   instruction change that fixed each one. The strongest teaching material this site does not yet have.
