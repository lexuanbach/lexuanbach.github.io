#!/usr/bin/env python3
"""Generate the bilingual self-check quizzes from quiz/*.json into the pages.

Each quiz/<name>.json is:

    {"page": "concepts.html",
     "questions": [
        {"a": 2,
         "en": ["Question?", "opt A", "opt B", "opt C", "opt D", "explanation"],
         "vi": ["Câu hỏi?", "…", "…", "…", "…", "giải thích"]},
        ...
     ]}

`a` is the 0-based index of the correct option. The rendered block is written
between the <!-- QUIZ --> and <!-- /QUIZ --> markers already present in the page.

Two things are enforced, both of them exam-writing hygiene rather than style:

  * **Option length balance.** Within one question the options must be close in
    length, so that "the longest one is the answer" is not a strategy. The
    tolerance is max-min <= max(10 chars, 25% of the mean).
  * **Answer spread.** Reported per page — if every answer is C, students learn
    the pattern rather than the material.

Usage:  python3 build_quizzes.py              # check and write
        python3 build_quizzes.py --check      # check only, write nothing
        python3 build_quizzes.py --rebalance  # even out the answer key first
"""
import json
import re
import sys
from glob import glob
from pathlib import Path

ROOT = Path(__file__).parent
LANGS = ('en', 'vi')


def esc(s):
    return (s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
             .replace('"', '&quot;'))


def balance(options):
    """(spread, tolerance, ok) for one language's options of one question."""
    lengths = [len(o) for o in options]
    spread = max(lengths) - min(lengths)
    tol = max(10, 0.25 * (sum(lengths) / len(lengths)))
    return spread, tol, spread <= tol


def check(bank, name):
    problems = []
    answers = []
    for i, q in enumerate(bank['questions'], 1):
        answers.append(q['a'])
        n = None
        for lang in LANGS:
            row = q.get(lang)
            if not row or len(row) != 6:
                problems.append(f'Q{i} [{lang}]: expected 6 entries (question, 4 options, explanation), got {len(row) if row else 0}')
                continue
            opts = row[1:5]
            if n is None:
                n = len(opts)
            if not 0 <= q['a'] < len(opts):
                problems.append(f'Q{i}: answer index {q["a"]} out of range')
            spread, tol, ok = balance(opts)
            if not ok:
                lens = [len(o) for o in opts]
                problems.append(f'Q{i} [{lang}]: option lengths {lens} spread {spread} > tolerance {tol:.0f}')
            longest = max(range(len(opts)), key=lambda k: len(opts[k]))
            if longest == q['a'] and spread > tol * 0.8:
                problems.append(f'Q{i} [{lang}]: correct option is also the longest')
    dist = {k: answers.count(k) for k in sorted(set(answers))}
    return problems, dist


def render(bank):
    out = []
    for q in bank['questions']:
        out.append(f'      <div class="quiz-q" data-correct="{q["a"]}">')
        for lang in LANGS:
            out.append(f'        <p class="quiz-question" lang="{lang}">{esc(q[lang][0])}</p>')
        for lang in LANGS:
            out.append(f'        <div class="quiz-options" lang="{lang}">')
            for opt in q[lang][1:5]:
                out.append(f'          <button class="quiz-opt" type="button">{esc(opt)}</button>')
            out.append('        </div>')
        out.append(f'        <p class="quiz-feedback" hidden data-explain="{esc(q["en"][5])}" '
                   f'data-explain-vi="{esc(q["vi"][5])}"></p>')
        out.append('      </div>')
    return '\n'.join(out)


def rebalance():
    """Permute options so the correct answer lands evenly across A-D.

    Options are independent of each other, so swapping two of them changes
    nothing except which letter is right — which stops a student from
    noticing that the answer is usually B.
    """
    for path in sorted(glob(str(ROOT / 'quiz' / '*.json'))):
        bank = json.loads(Path(path).read_text())
        qs = bank['questions']
        for i, q in enumerate(qs):
            target = i % 4
            cur = q['a']
            if cur == target:
                continue
            for lang in LANGS:
                row = q[lang]
                # options occupy row[1:5]
                row[1 + cur], row[1 + target] = row[1 + target], row[1 + cur]
            q['a'] = target
        Path(path).write_text(json.dumps(bank, ensure_ascii=False, indent=1) + '\n')
        print(f'rebalanced {Path(path).stem}')


def main(check_only=False):
    banks = sorted(glob(str(ROOT / 'quiz' / '*.json')))
    if not banks:
        print('no quiz banks found in quiz/')
        return 1
    failed = 0
    total = 0
    for path in banks:
        bank = json.loads(Path(path).read_text())
        name = Path(path).stem
        problems, dist = check(bank, name)
        n = len(bank['questions'])
        total += n
        spread_note = ' '.join(f'{chr(65 + k)}:{v}' for k, v in dist.items())
        status = 'OK' if not problems else f'{len(problems)} PROBLEM(S)'
        print(f'{name:14s} {n:3d} questions  answers[{spread_note}]  {status}')
        for p in problems:
            print(f'    · {p}')
            failed += 1
        if problems or check_only:
            continue
        page = ROOT / bank['page']
        html = page.read_text()
        new, count = re.subn(r'<!-- QUIZ -->.*?<!-- /QUIZ -->',
                             lambda m: '<!-- QUIZ -->\n' + render(bank) + '\n      <!-- /QUIZ -->',
                             html, flags=re.S)
        if not count:
            print(f'    · no <!-- QUIZ --> markers in {bank["page"]}')
            failed += 1
            continue
        page.write_text(new)
    print(f'{len(banks)} bank(s) · {total} questions · {failed} problem(s)')
    return 1 if failed else 0


if __name__ == '__main__':
    if '--rebalance' in sys.argv:
        rebalance()
    sys.exit(main('--check' in sys.argv))
