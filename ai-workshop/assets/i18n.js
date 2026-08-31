/* AI Agents for Lecturers — EN/VI language engine.

   Two mechanisms, on purpose:

   1. Repeated interface chrome (navigation, buttons, footer) carries
      data-i18n="key" and is filled from DICT below — one edit updates all
      seven pages.
   2. Page prose is written twice in the HTML as sibling blocks marked
      lang="en" / lang="vi", and CSS hides the inactive one. Translations sit
      next to their source, which is what keeps them honest when the English
      is edited later.

   The active language lives on <html data-lang> (set by the inline head
   script, before first paint, exactly like the theme) and in
   localStorage['agentws-language']. */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE = 'agentws-language';

  var DICT = {
    en: {
      'nav.overview': 'Overview',
      'nav.concepts': 'Concepts',
      'nav.exercises': 'Exercises',
      'nav.tools': 'Tools & data',
      'nav.platforms': 'Platforms',
      'nav.responsible': 'Responsible use',
      'nav.ex1': 'Exercise 1 · Lesson',
      'nav.ex2': 'Exercise 2 · Assessment',
      'nav.ex3': 'Exercise 3 · Support',
      'side.site': 'Site',
      'side.onpage': 'On this page',
      'nav.back': '← Back',
      'nav.next': 'Next →',
      'nav.setup': 'Set up first',
      'btn.copy': 'Copy',
      'btn.reset': 'Reset',
      'btn.copyPrompt': 'Copy prompt',
      'btn.clear': 'Clear',
      'btn.clearWeek': 'Clear week',
      'btn.clearDay': 'Clear day',
      'btn.clearOnday': 'Clear on-the-day',
      'bld.title': 'your agent',
      'foot.subtitle': 'Practical AI Agents for University Lecturers: Designing Safe and Effective Workflows for Teaching, Assessment, and Student Support'
    },
    vi: {
      'nav.overview': 'Tổng quan',
      'nav.concepts': 'Khái niệm',
      'nav.exercises': 'Bài thực hành',
      'nav.tools': 'Công cụ & dữ liệu',
      'nav.platforms': 'Nền tảng',
      'nav.responsible': 'Sử dụng có trách nhiệm',
      'nav.ex1': 'Bài 1 · Bài giảng',
      'nav.ex2': 'Bài 2 · Đánh giá',
      'nav.ex3': 'Bài 3 · Hỗ trợ',
      'side.site': 'Trang',
      'side.onpage': 'Mục trong trang',
      'nav.back': '← Quay lại',
      'nav.next': 'Tiếp →',
      'nav.setup': 'Chuẩn bị trước',
      'btn.copy': 'Sao chép',
      'btn.reset': 'Đặt lại',
      'btn.copyPrompt': 'Sao chép prompt',
      'btn.clear': 'Xoá',
      'btn.clearWeek': 'Xoá mục tuần trước',
      'btn.clearDay': 'Xoá mục hôm trước',
      'btn.clearOnday': 'Xoá mục trong ngày',
      'bld.title': 'agent của bạn',
      'foot.subtitle': 'AI Agent thực hành cho giảng viên đại học: Thiết kế quy trình an toàn và hiệu quả cho giảng dạy, đánh giá và hỗ trợ sinh viên'
    }
  };

  function current() { return root.dataset.lang === 'vi' ? 'vi' : 'en'; }

  function apply(lang) {
    root.dataset.lang = lang;
    root.setAttribute('lang', lang);

    var d = DICT[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var v = d[node.getAttribute('data-i18n')];
      if (v !== undefined) node.textContent = v;
    });

    // <title> has no second copy to hide, so it comes from a meta tag.
    var vi = document.querySelector('meta[name="title-vi"]');
    var en = document.querySelector('meta[name="title-en"]');
    if (vi && en) document.title = (lang === 'vi' ? vi : en).getAttribute('content');

    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'en' ? 'VI' : 'EN';
      btn.setAttribute('aria-label', lang === 'en'
        ? 'Chuyển sang tiếng Việt' : 'Switch to English');
    }

    // Everything that renders its own text (theme button, quiz feedback,
    // the agent builder) listens for this instead of being reached into.
    document.dispatchEvent(new CustomEvent('agentws:lang', { detail: lang }));
  }

  function initLang() {
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = current() === 'en' ? 'vi' : 'en';
        try { localStorage.setItem(STORE, next); } catch (e) {}
        apply(next);
      });
    }
    apply(current());
  }

  window.agentwsLang = current;
  document.addEventListener('DOMContentLoaded', initLang);
})();
