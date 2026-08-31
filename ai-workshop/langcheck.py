#!/usr/bin/env python3
"""Check the EN/VI block pairing across the site.

Page prose is written twice as sibling blocks marked lang="en" / lang="vi"
(see design.md §6). This reports any parent element whose en/vi child counts
differ — i.e. a block added in one language and forgotten in the other.

Usage:  python3 langcheck.py                 # all pages
        python3 langcheck.py concepts.html   # one page
"""
import sys
from glob import glob
from html.parser import HTMLParser

VOID = {'meta', 'link', 'br', 'hr', 'img', 'input', 'source',
        'path', 'rect', 'line', 'circle', 'use', 'area', 'col', 'marker'}


class Checker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.problems = []

    def handle_starttag(self, tag, attrs):
        if tag in VOID:
            return
        d = dict(attrs)
        if self.stack and d.get('lang') in ('en', 'vi'):
            self.stack[-1][2][d['lang']].append((tag, self.getpos()[0]))
        self.stack.append((tag, self.getpos()[0], {'en': [], 'vi': []}))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        while self.stack:
            name, line, kids = self.stack.pop()
            self._check(name, line, kids)
            if name == tag:
                return

    def _check(self, name, line, kids):
        en, vi = kids['en'], kids['vi']
        if (en or vi) and len(en) != len(vi):
            self.problems.append(
                f'line {line}: <{name}> has {len(en)} en / {len(vi)} vi children · '
                f'en {[f"{t}@{l}" for t, l in en]} · vi {[f"{t}@{l}" for t, l in vi]}')

    def finish(self):
        while self.stack:
            self._check(*self.stack.pop())


def main(files):
    bad = 0
    for f in files:
        c = Checker()
        c.feed(open(f, encoding='utf-8').read())
        c.close()
        c.finish()
        for p in c.problems:
            print(f'[{f}] {p}')
            bad += 1
    print(f'{len(files)} page(s) checked · {bad} unbalanced pair(s)')
    return 1 if bad else 0


if __name__ == '__main__':
    args = sys.argv[1:] or sorted(glob('*.html') + glob('exercises/*.html'))
    sys.exit(main(args))
