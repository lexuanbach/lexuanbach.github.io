/* CO5151 — Agent Skills playground: a small, deterministic simulation of
   progressive disclosure across a 4-skill library and several tasks, so
   students can see which tier loads (and which doesn't) per task, and what
   it costs. Scripted, not a live model — the mechanism itself is real. */
(function () {
  'use strict';

  var L1_COST = 80; // per skill, always resident

  var SKILLS = [
    { id: 'excel', name: 'Excel Formatter', desc: 'Creates and formats Excel spreadsheets following company conventions (currency columns, header styling, frozen panes).', l2Cost: 2000,
      l3: [{ file: 'chart_templates.json', cost: 600 }, { file: 'column_width_rules.md', cost: 300 }] },
    { id: 'brand', name: 'Brand Voice', desc: 'Rewrites text to match the company’s brand voice guide (tone, banned words, sentence length).', l2Cost: 1200,
      l3: [{ file: 'banned_words_list.txt', cost: 250 }] },
    { id: 'pdf', name: 'PDF Report Builder', desc: 'Assembles a formatted PDF report from data tables and charts, using the company’s cover-page template.', l2Cost: 1800,
      l3: [{ file: 'cover_page_template.html', cost: 500 }, { file: 'chart_style.css', cost: 200 }] },
    { id: 'review', name: 'Code Review Checklist', desc: 'Applies the team’s code-review checklist (security, style, test coverage) when reviewing a pull request.', l2Cost: 1500,
      l3: [{ file: 'security_checklist.md', cost: 700 }] },
  ];

  var TASKS = [
    { id: 'budget', label: 'Build a Q3 budget spreadsheet with a chart', text: '“Build me a Q3 budget spreadsheet with a chart.”', skill: 'excel', uses: ['chart_templates.json'] },
    { id: 'announce', label: 'Rewrite an announcement in brand voice', text: '“Rewrite this product announcement in our brand voice.”', skill: 'brand', uses: ['banned_words_list.txt'] },
    { id: 'pr', label: 'Review a pull request for security issues', text: '“Review this pull request for security issues.”', skill: 'review', uses: ['security_checklist.md'] },
    { id: 'report', label: 'Assemble a PDF report with a cover page', text: '“Turn this data into a PDF report with our cover page.”', skill: 'pdf', uses: ['cover_page_template.html'] },
    { id: 'trivia', label: 'Answer a general-knowledge question', text: '“What’s the capital of France?”', skill: null, uses: [] },
  ];

  function skillById(id) { for (var i = 0; i < SKILLS.length; i++) if (SKILLS[i].id === id) return SKILLS[i]; return null; }

  function initAgentSkillsSim() {
    var root = document.querySelector('.ask-sim');
    if (!root) return;

    var select = root.querySelector('#ask-task-select');
    var runBtn = root.querySelector('#ask-run');
    var resetBtn = root.querySelector('#ask-reset');
    var logEl = root.querySelector('#ask-log');
    var costEl = root.querySelector('#ask-cost');
    var compareEl = root.querySelector('#ask-compare');

    // populate task dropdown
    TASKS.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.label;
      select.appendChild(opt);
    });

    function cardEls(skillId) {
      return {
        card: root.querySelector('.ask-card[data-skill="' + skillId + '"]'),
        l2: root.querySelector('.ask-card[data-skill="' + skillId + '"] .ask-tier.l2'),
        l3wrap: root.querySelector('.ask-card[data-skill="' + skillId + '"] .ask-l3-files'),
      };
    }

    function resetDiagram() {
      SKILLS.forEach(function (s) {
        var els = cardEls(s.id);
        if (els.card) els.card.classList.remove('matched');
        if (els.l2) els.l2.classList.remove('active');
        if (els.l3wrap) els.l3wrap.innerHTML = '';
      });
    }

    function logLine(role, text) {
      var line = document.createElement('span');
      line.className = 'trace-line enter';
      var roleEl = document.createElement('span');
      roleEl.className = 'trace-role ' + role;
      roleEl.textContent = { task: 'Task', scan: 'Scan', match: 'Match', load2: 'Level 2', load3: 'Level 3', none: 'No match', done: 'Done' }[role] || role;
      line.appendChild(roleEl);
      line.appendChild(document.createTextNode(text));
      logEl.appendChild(line);
    }

    function run() {
      var task = null;
      for (var i = 0; i < TASKS.length; i++) if (TASKS[i].id === select.value) task = TASKS[i];
      if (!task) return;

      resetDiagram();
      logEl.innerHTML = '';
      runBtn.disabled = true;

      var baseline = SKILLS.length * L1_COST;
      var spent = baseline;
      var allL2 = SKILLS.reduce(function (a, s) { return a + s.l2Cost; }, 0);

      var steps = [];
      steps.push(function () { logLine('task', task.text); });
      steps.push(function () {
        logLine('scan', SKILLS.length + ' installed skills’ metadata are already in context (' + baseline + ' tokens — paid every turn, regardless of this task).');
      });

      if (task.skill) {
        var skill = skillById(task.skill);
        steps.push(function () {
          logLine('match', '“' + skill.name + '”’s description matches this task.');
        });
        steps.push(function () {
          var els = cardEls(skill.id);
          if (els.card) els.card.classList.add('matched');
          if (els.l2) els.l2.classList.add('active');
          spent += skill.l2Cost;
          logLine('load2', 'Loading the full SKILL.md for “' + skill.name + '” — +' + skill.l2Cost + ' tokens.');
          costEl.textContent = String(spent);
        });
        task.uses.forEach(function (fname) {
          var fileMeta = null;
          skill.l3.forEach(function (f) { if (f.file === fname) fileMeta = f; });
          if (!fileMeta) return;
          steps.push(function () {
            var els = cardEls(skill.id);
            if (els.l3wrap) {
              var chip = document.createElement('span');
              chip.className = 'ask-l3-chip active';
              chip.textContent = fileMeta.file;
              els.l3wrap.appendChild(chip);
            }
            spent += fileMeta.cost;
            logLine('load3', 'Execution needs it — reading ' + fileMeta.file + ' — +' + fileMeta.cost + ' tokens.');
            costEl.textContent = String(spent);
          });
        });
      } else {
        steps.push(function () {
          logLine('none', 'No installed skill’s description matches — answered from general capability, no Level 2 or 3 load.');
        });
      }

      steps.push(function () {
        var line = 'Total this task: ' + spent + ' tokens.';
        logLine('done', line);
        var diff = allL2 + baseline - spent;
        if (task.skill) {
          compareEl.textContent = 'If all ' + SKILLS.length + ' skills’ full instructions had been pre-loaded up front regardless of relevance, this turn would have cost ' + (baseline + allL2) + ' tokens instead of ' + spent + ' — ' + diff + ' tokens saved by only loading what matched.';
        } else {
          compareEl.textContent = 'No skill loaded at all beyond the always-resident metadata — the cheapest possible outcome, and correctly so: nothing here needed specialized instructions.';
        }
      });

      var i2 = 0;
      function tick() {
        if (i2 >= steps.length) { runBtn.disabled = false; return; }
        steps[i2]();
        i2++;
        setTimeout(tick, 420);
      }
      tick();
    }

    runBtn.addEventListener('click', run);
    resetBtn.addEventListener('click', function () {
      resetDiagram();
      logEl.innerHTML = '';
      costEl.textContent = String(SKILLS.length * L1_COST);
      compareEl.textContent = '';
    });

    costEl.textContent = String(SKILLS.length * L1_COST);
  }

  document.addEventListener('DOMContentLoaded', initAgentSkillsSim);
})();
