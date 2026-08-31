#!/usr/bin/env python3
"""Build self-contained pages for Claude Artifact publishing.

For each page: inline the local <link rel="stylesheet"> and <script src>
assets, strip the document wrapper tags (the artifact host supplies its own
<html>/<head>/<body> skeleton), and rewrite internal links using an optional
page->URL mapping (dist/urls.json) so pages published as separate artifacts
can link to each other.

Usage:  python3 build.py            # build all pages into dist/
        dist/urls.json (optional):  {"index.html": "https://claude.ai/...", ...}
"""
import json
import posixpath
import re
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / 'dist'
PAGES = [
    'index.html',
    'concepts.html',
    'tools.html',
    'platforms.html',
    'responsible.html',
    'exercises/ex1-lesson.html',
    'exercises/ex2-assessment.html',
    'exercises/ex3-support.html',
]

def load_mapping():
    f = DIST / 'urls.json'
    if f.exists():
        return json.loads(f.read_text())
    return {}

def inline_assets(html: str, page_dir: Path) -> str:
    def css_repl(m):
        href = m.group(1)
        path = (page_dir / href).resolve()
        return '<style>\n' + path.read_text() + '\n</style>'

    def js_repl(m):
        src = m.group(1)
        path = (page_dir / src).resolve()
        return '<script>\n' + path.read_text() + '\n</script>'

    html = re.sub(r'<link rel="stylesheet" href="((?!https?:)[^"]+)">', css_repl, html)
    html = re.sub(r'<script src="((?!https?:)[^"]+)"></script>', js_repl, html)
    return html

def strip_wrapper(html: str) -> str:
    for pat in [r'<!doctype html>\s*', r'<html[^>]*>\s*', r'</html>\s*',
                r'<head>\s*', r'</head>\s*', r'<body>\s*', r'</body>\s*',
                r'<meta charset="[^"]*">\s*']:
        html = re.sub(pat, '', html, flags=re.IGNORECASE)
    return html

def rewrite_links(html: str, page: str, mapping: dict) -> str:
    page_dir = posixpath.dirname(page)

    def repl(m):
        href = m.group(2)
        if href.startswith(('http', '#', 'mailto:', 'data:')):
            return m.group(0)
        frag = ''
        target = href
        if '#' in target:
            target, frag = target.split('#', 1)
            frag = '#' + frag
        site_path = posixpath.normpath(posixpath.join(page_dir, target))
        if site_path in mapping:
            return m.group(1) + mapping[site_path] + frag + m.group(3)
        return m.group(0)

    return re.sub(r'(href=")([^"]+)(")', repl, html)

def build():
    DIST.mkdir(exist_ok=True)
    mapping = load_mapping()
    for page in PAGES:
        src = ROOT / page
        html = src.read_text()
        html = inline_assets(html, src.parent)
        html = rewrite_links(html, page, mapping)
        html = strip_wrapper(html)
        out = DIST / Path(page).name
        out.write_text(html)
        print(f'{page:20s} -> {out.relative_to(ROOT)}  ({len(html)//1024} kB)')

if __name__ == '__main__':
    build()
