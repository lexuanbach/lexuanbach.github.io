/* CO5151 — generic self-check quiz engine. Scans for .quiz-q blocks
   (data-correct = index of the right .quiz-opt) and wires click-to-check
   feedback. Works identically on every lecture page; all content lives
   in the page's own HTML via data attributes. */
(function () {
  'use strict';

  function initQuiz() {
    var questions = document.querySelectorAll('.quiz-q');
    questions.forEach(function (q) {
      var correct = parseInt(q.getAttribute('data-correct'), 10);
      var opts = q.querySelectorAll('.quiz-opt');
      var feedback = q.querySelector('.quiz-feedback');
      var answered = false;

      opts.forEach(function (opt, idx) {
        opt.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          opts.forEach(function (o, i) {
            o.disabled = true;
            if (i === correct) o.classList.add('quiz-correct');
            else o.classList.add('quiz-dim');
          });
          if (idx !== correct) opt.classList.add('quiz-wrong');
          if (feedback) {
            feedback.hidden = false;
            feedback.classList.add(idx === correct ? 'quiz-fb-right' : 'quiz-fb-wrong');
            var prefix = idx === correct ? '✓ Correct. ' : '✗ Not quite. ';
            feedback.textContent = prefix + (feedback.getAttribute('data-explain') || '');
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initQuiz);
})();
