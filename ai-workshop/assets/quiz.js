/* Workshop — generic self-check quiz engine. Scans for .quiz-q blocks
   (data-correct = index of the right .quiz-opt) and wires click-to-check
   feedback. Works identically on every page; all content lives in the
   page's own HTML via data attributes.

   Bilingual: a question carries one .quiz-options group per language, and
   only the active one is visible. Answering marks BOTH groups, so switching
   language after answering shows the same result rather than a fresh
   question — and the explanation follows the language too. */
(function () {
  'use strict';

  function initQuiz() {
    var questions = document.querySelectorAll('.quiz-q');
    questions.forEach(function (q) {
      var correct = parseInt(q.getAttribute('data-correct'), 10);
      var groups = q.querySelectorAll('.quiz-options');
      var feedback = q.querySelector('.quiz-feedback');
      var answered = false;
      var chosen = -1;

      function paintFeedback() {
        if (!feedback || chosen < 0) return;
        var vi = document.documentElement.dataset.lang === 'vi';
        var prefix = chosen === correct
          ? (vi ? '✓ Chính xác. ' : '✓ Correct. ')
          : (vi ? '✗ Chưa đúng. ' : '✗ Not quite. ');
        var text = (vi && feedback.getAttribute('data-explain-vi'))
          || feedback.getAttribute('data-explain') || '';
        feedback.textContent = prefix + text;
      }
      document.addEventListener('agentws:lang', paintFeedback);

      function choose(idx) {
        if (answered) return;
        answered = true;
        chosen = idx;
        groups.forEach(function (g) {
          var opts = g.querySelectorAll('.quiz-opt');
          opts.forEach(function (o, i) {
            o.disabled = true;
            if (i === correct) o.classList.add('quiz-correct');
            else o.classList.add('quiz-dim');
            if (i === idx && idx !== correct) o.classList.add('quiz-wrong');
          });
        });
        if (feedback) {
          feedback.hidden = false;
          feedback.classList.add(idx === correct ? 'quiz-fb-right' : 'quiz-fb-wrong');
          paintFeedback();
        }
      }

      groups.forEach(function (g) {
        g.querySelectorAll('.quiz-opt').forEach(function (opt, idx) {
          opt.addEventListener('click', function () { choose(idx); });
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initQuiz);
})();
