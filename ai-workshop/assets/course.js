/* Workshop shared page engine: theme toggle + collapsible sections. */
(function () {
  'use strict';

  var root = document.documentElement;
  try {
    var storedTheme = localStorage.getItem('agentws-theme');
    if (storedTheme === 'dark' || storedTheme === 'light') root.dataset.theme = storedTheme;
  } catch (e) {}

  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    function active() { return root.dataset.theme || (systemDark.matches ? 'dark' : 'light'); }
    function paint() {
      var dark = active() === 'dark';
      var vi = root.dataset.lang === 'vi';
      btn.textContent = dark ? (vi ? '☀ Sáng' : '☀ Light') : (vi ? '☾ Tối' : '☾ Dark');
      btn.setAttribute('aria-label', dark
        ? (vi ? 'Chuyển sang giao diện sáng' : 'Switch to light theme')
        : (vi ? 'Chuyển sang giao diện tối' : 'Switch to dark theme'));
    }
    btn.addEventListener('click', function () {
      var next = active() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('agentws-theme', next); } catch (e) {}
      paint();
    });
    systemDark.addEventListener('change', function () { if (!root.dataset.theme) paint(); });
    document.addEventListener('agentws:lang', paint);
    paint();
  }

  // Collapsible top-level sections: <section class="block"><div class="sec-head foldable">
  // …<h2>…</h2></div><div class="fold-body">…</div></section>
  // Default: open. A section whose id matches the URL hash (or contains the
  // target anchor) opens automatically and is scrolled to.
  function initFolds() {
    var heads = document.querySelectorAll('.sec-head.foldable');
    if (!heads.length) return;

    function setOpen(head, open) {
      var body = head.nextElementSibling;
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (body && body.classList.contains('fold-body')) body.hidden = !open;
      var section = head.closest('section.block');
      if (section) section.classList.toggle('folded', !open);
    }

    heads.forEach(function (head) {
      head.setAttribute('role', 'button');
      head.setAttribute('tabindex', '0');
      setOpen(head, true);
      head.addEventListener('click', function () {
        setOpen(head, head.getAttribute('aria-expanded') !== 'true');
      });
      head.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); head.click(); }
      });
    });

    function openForHash() {
      var hash = window.location.hash;
      if (!hash) return;
      var target = document.querySelector(hash);
      if (!target) return;
      var section = target.closest ? target.closest('section.block') : null;
      var container = section || target;
      var head = container && container.querySelector ? container.querySelector('.sec-head.foldable') : null;
      if (head) {
        setOpen(head, true);
        setTimeout(function () { target.scrollIntoView({ block: 'start' }); }, 30);
      }
    }
    openForHash();
    window.addEventListener('hashchange', openForHash);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initFolds();
    if (window.hljs) { window.hljs.highlightAll(); }
  });
})();
