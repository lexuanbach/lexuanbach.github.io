/* CO5151 Week 1 — Agent Loop Simulator.
   Fully scripted (non-LLM) state machines that replay preset scenarios step
   by step, highlighting the active node in the agent-anatomy diagram and
   building a Thought/Action/Observation trace log. No network calls, no cost.
   Three tasks, each with three technique scenarios (9 traces total). */
(function () {
  'use strict';

  // Each step: { role: 'thought'|'action'|'observation'|'memory'|'outcome',
  //   node: 'llm'|'tool'|'env'|'mem' (which diagram box lights up),
  //   text: string,
  //   llmCall / toolCall: true (increments the matching counter),
  //   tag: 'success'|'fail'|'warn' (outcome steps only — updates the outcome box),
  //   terminal: false (outcome steps only — true by default; false = scenario continues) }
  var TASKS = {
    'oscars': {
      label: 'Oscars director (fact lookup)',
      question: 'Who directed the film that won Best Picture at the 2023 Oscars?',
      scenarios: {
        'no-tools': {
          label: 'No tools — parametric guess',
          blurb: 'A single LLM call with no loop at all: the model answers straight from whatever it memorized during training. Fast and cheap — but there is no way to tell a lucky guess from a confident hallucination.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true,
              text: 'Thinking without any tool: recalling from training data… "Everything Everywhere All at Once" won Best Picture in 2023, directed by the Daniels.' },
            { role: 'outcome', node: 'llm', tag: 'warn',
              text: '<strong>Answer:</strong> Daniel Kwan and Daniel Scheinert. Correct here — but only because this fact happened to be in the training data. Ask about something after the model\'s training cutoff and this exact same process fails silently, with no lower confidence and no warning.' }
          ]
        },
        'react': {
          label: 'ReAct — reason + act',
          blurb: 'Every claim is grounded in an actual tool call before the agent answers.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true, text: 'I need to find out who directed the film that won Best Picture in 2023.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["2023 Best Picture Oscar winner"]' },
            { role: 'observation', node: 'env', text: '"Everything Everywhere All at Once" won Best Picture at the 95th Academy Awards.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'Now I need to find the director(s) of that film.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["Everything Everywhere All at Once director"]' },
            { role: 'observation', node: 'env', text: 'Directed by Daniel Kwan and Daniel Scheinert.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'I have the answer, grounded in two real lookups.' },
            { role: 'outcome', node: 'llm', tag: 'success',
              text: '<strong>Finish["Daniel Kwan and Daniel Scheinert"]</strong> — every fact came from a tool call, not a guess.' }
          ]
        },
        'reflexion': {
          label: 'ReAct + reflection — retry after failure',
          blurb: 'The first attempt uses a vague search and fails. The agent reflects on why, writes that reflection to memory, and the second attempt succeeds — Reflexion\'s core mechanism.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true, text: 'I need to find who directed the 2023 Best Picture winner.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["2023 movie awards director"]' },
            { role: 'observation', node: 'env', text: 'No single clear result — many unrelated 2023 award ceremonies came back.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'That search was too vague; I could not find the answer.' },
            { role: 'outcome', node: 'llm', tag: 'fail', terminal: false,
              text: '<strong>Attempt 1 failed.</strong> The query didn\'t name the specific award and year — an external evaluator flags this as unresolved, not the model judging itself.' },
            { role: 'memory', node: 'mem',
              text: 'Reflection: always include both the award name and the year together in the search query, not generic terms.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'Retrying with the reflection from memory in context.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["95th Academy Awards Best Picture winner 2023"]' },
            { role: 'observation', node: 'env', text: '"Everything Everywhere All at Once" won Best Picture at the 95th Academy Awards (2023).' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'Now searching for the director specifically.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["Everything Everywhere All at Once director"]' },
            { role: 'observation', node: 'env', text: 'Directed by Daniel Kwan and Daniel Scheinert.' },
            { role: 'outcome', node: 'llm', tag: 'success',
              text: '<strong>Finish["Daniel Kwan and Daniel Scheinert"]</strong> — succeeded on the second attempt using the stored reflection, without any weights changing.' }
          ]
        }
      }
    },
    'ceo': {
      label: 'Current CEO (staleness risk)',
      question: 'Who is the current CEO of OpenAI?',
      scenarios: {
        'no-tools': {
          label: 'No tools — parametric guess',
          blurb: 'This kind of fact — "who currently holds role X" — is exactly where a frozen model\'s memory is most likely to be stale or internally conflicted, since leadership can change after training and the model has no way to know how old its own knowledge is.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true,
              text: 'Thinking without any tool: recalling from training data… Sam Altman is CEO of OpenAI, though I also recall unclear or conflicting reports around a brief leadership change in November 2023.' },
            { role: 'outcome', node: 'llm', tag: 'warn',
              text: '<strong>Answer:</strong> Sam Altman — probably right, but the model cannot tell you whether this has changed since training, or resolve its own conflicting memory of the Nov 2023 event. No tool call, no way to check "current."' }
          ]
        },
        'react': {
          label: 'ReAct — reason + act',
          blurb: '"Current" facts age the moment training data is frozen — ReAct\'s tool call sidesteps that entirely by checking now, not recalling from training.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true, text: 'Leadership can change after my training cutoff — I should check rather than rely on memory.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["OpenAI CEO current"]' },
            { role: 'observation', node: 'env', text: 'Current sources confirm Sam Altman holds the CEO position.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'This is grounded in a live lookup, not potentially stale memory.' },
            { role: 'outcome', node: 'llm', tag: 'success',
              text: '<strong>Finish["Sam Altman"]</strong> — confirmed via live search rather than training-data recall.' }
          ]
        },
        'reflexion': {
          label: 'ReAct + reflection — retry after failure',
          blurb: 'The first search surfaces real but outdated news, and the agent almost reports it as current. Reflection catches the ambiguity and fixes the query — a subtler failure than a vague search.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true, text: "I'll search for OpenAI's leadership." },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["OpenAI leadership news"]' },
            { role: 'observation', node: 'env', text: 'Results are mostly about a November 2023 boardroom dispute and a temporary removal of the CEO.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'This describes a past event, not necessarily today\'s status — I should not report this as the current answer.' },
            { role: 'outcome', node: 'llm', tag: 'fail', terminal: false,
              text: '<strong>Attempt 1 inconclusive.</strong> The search surfaced real but historical news, not confirmed current status — a harder failure to catch than an empty result.' },
            { role: 'memory', node: 'mem',
              text: 'Reflection: when a role can change over time, phrase searches with "current" and a recent date to avoid retrieving outdated news as if it were today\'s status.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'Retrying with a query aimed at current status specifically.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Search["OpenAI CEO current status 2026"]' },
            { role: 'observation', node: 'env', text: 'Latest sources confirm Sam Altman holds the CEO position as of 2026.' },
            { role: 'outcome', node: 'llm', tag: 'success',
              text: '<strong>Finish["Sam Altman"]</strong> — resolved after refining the query to target current status, not just recent news.' }
          ]
        }
      }
    },
    'train': {
      label: 'Train arrival (arithmetic)',
      question: 'A train leaves at 2:00 PM traveling 60 mph and must cover 150 miles. The destination station closes at 5:30 PM. Will the train arrive before it closes?',
      scenarios: {
        'no-tools': {
          label: 'No tools — reasoning alone',
          blurb: 'Not every task needs a tool. This is pure arithmetic — a case where reasoning without any tool call is actually the appropriate choice, not a shortcut.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true,
              text: '150 miles at 60 mph takes 150 ÷ 60 = 2.5 hours. Departure 2:00 PM + 2.5 hours = 4:30 PM.' },
            { role: 'outcome', node: 'llm', tag: 'success',
              text: '<strong>Answer:</strong> Yes — arrives at 4:30 PM, one hour before the 5:30 PM closing. Exact arithmetic; no tool was needed for this task.' }
          ]
        },
        'react': {
          label: 'ReAct — reason + act',
          blurb: 'ReAct\'s loop works with any tool, not just search — here a calculator removes the risk of a mental-arithmetic slip on the one step that matters.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true, text: 'I\'ll compute the travel time with a calculator to avoid a mental-arithmetic error.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Calculator[150 / 60]' },
            { role: 'observation', node: 'env', text: 'Result: 2.5' },
            { role: 'thought', node: 'llm', llmCall: true, text: '2.5 hours after 2:00 PM is 4:30 PM, which is before the 5:30 PM closing.' },
            { role: 'outcome', node: 'llm', tag: 'success',
              text: '<strong>Finish["Yes — arrives 4:30 PM, one hour before closing"]</strong> — the one arithmetic step that matters was offloaded to a tool instead of estimated.' }
          ]
        },
        'reflexion': {
          label: 'ReAct + reflection — retry after failure',
          blurb: 'The first attempt estimates instead of calculating and gets the arithmetic wrong. Reflection identifies exactly that mistake and switches to a calculator on retry.',
          steps: [
            { role: 'thought', node: 'llm', llmCall: true, text: '150 miles at 60 mph… roughly 3 hours, so arriving around 5:00 PM.' },
            { role: 'outcome', node: 'llm', tag: 'fail', terminal: false,
              text: '<strong>Attempt 1 wrong.</strong> An evaluator checks the arithmetic and flags it: 150 ÷ 60 is 2.5, not "roughly 3" — mental estimation introduced an error the agent didn\'t catch itself.' },
            { role: 'memory', node: 'mem',
              text: 'Reflection: for exact arithmetic, always use a calculator tool instead of estimating mentally.' },
            { role: 'thought', node: 'llm', llmCall: true, text: 'Retrying with a calculator instead of estimating.' },
            { role: 'action', node: 'tool', toolCall: true, text: 'Calculator[150 / 60]' },
            { role: 'observation', node: 'env', text: 'Result: 2.5' },
            { role: 'outcome', node: 'llm', tag: 'success',
              text: '<strong>Finish["Yes — arrives 4:30 PM"]</strong> — corrected after reflecting on the earlier estimation error.' }
          ]
        }
      }
    }
  };

  var ROLE_LABEL = { thought: 'Thought', action: 'Action', observation: 'Observation', memory: 'Memory write' };
  var ROLE_CLASS = { thought: 'thought', action: 'action', observation: 'obs', memory: 'mem' };
  var SCENARIO_ORDER = ['no-tools', 'react', 'reflexion'];

  function initSim(root) {
    var svg = root.querySelector('.sim-diagram svg');
    var taskSelect = root.querySelector('.sim-task-select');
    var scenarioSelect = root.querySelector('.sim-select');
    var stepBtn = root.querySelector('.sim-step');
    var playBtn = root.querySelector('.sim-play');
    var resetBtn = root.querySelector('.sim-reset');
    var blurbEl = root.querySelector('.sim-blurb');
    var logEl = root.querySelector('.sim-log');
    var finalEl = root.querySelector('.sim-final');
    var memWrap = root.querySelector('.sim-memory');
    var memList = root.querySelector('.sim-memory ul');
    var stepStat = root.querySelector('.sim-stat-step');
    var llmStat = root.querySelector('.sim-stat-llm');
    var toolStat = root.querySelector('.sim-stat-tool');
    var taskText = root.querySelector('.sim-task span');
    if (!svg || !taskSelect || !scenarioSelect) return;

    var state = { steps: [], i: 0, timer: null, llmCalls: 0, toolCalls: 0 };

    function setActive(node) {
      ['llm', 'mem', 'tool', 'env'].forEach(function (n) {
        var el = svg.querySelector('.al-' + n);
        if (el) el.classList.toggle('active', n === node);
      });
    }

    function paintStats() {
      stepStat.textContent = state.i + ' / ' + state.steps.length;
      llmStat.textContent = state.llmCalls;
      toolStat.textContent = state.toolCalls;
    }

    function currentScenario() {
      var task = TASKS[taskSelect.value];
      return task.scenarios[scenarioSelect.value];
    }

    function load() {
      stop();
      var task = TASKS[taskSelect.value];
      var sc = currentScenario();
      taskText.textContent = task.question;
      state.steps = sc.steps;
      state.i = 0;
      state.llmCalls = 0;
      state.toolCalls = 0;
      blurbEl.textContent = sc.blurb;
      logEl.innerHTML = '';
      finalEl.innerHTML = '';
      finalEl.className = 'sim-final';
      memList.innerHTML = '';
      memWrap.hidden = true;
      setActive(null);
      paintStats();
      playBtn.textContent = '▶ Play';
      stepBtn.disabled = false;
      playBtn.disabled = false;
    }

    function renderStep(s) {
      if (s.llmCall) state.llmCalls++;
      if (s.toolCall) state.toolCalls++;
      setActive(s.node);

      if (s.role === 'outcome') {
        finalEl.innerHTML = s.text;
        finalEl.className = 'sim-final ' + s.tag;
      } else {
        var line = document.createElement('span');
        line.className = 'trace-line enter';
        var role = document.createElement('span');
        role.className = 'trace-role ' + ROLE_CLASS[s.role];
        role.textContent = ROLE_LABEL[s.role];
        line.appendChild(role);
        line.appendChild(document.createTextNode(s.text));
        logEl.appendChild(line);
        logEl.scrollTop = logEl.scrollHeight;
      }

      if (s.role === 'memory') {
        memWrap.hidden = false;
        var li = document.createElement('li');
        li.textContent = s.text.replace(/^Reflection:\s*/, '');
        memList.appendChild(li);
      }
    }

    function step() {
      if (state.i >= state.steps.length) { stop(); return; }
      renderStep(state.steps[state.i]);
      state.i++;
      paintStats();
      if (state.i >= state.steps.length) {
        stop();
        stepBtn.disabled = true;
        playBtn.disabled = true;
      }
    }

    function stop() {
      if (state.timer) { clearInterval(state.timer); state.timer = null; }
      playBtn.textContent = '▶ Play';
    }

    function play() {
      if (state.timer) { stop(); return; }
      playBtn.textContent = '⏸ Pause';
      state.timer = setInterval(function () {
        if (state.i >= state.steps.length) { stop(); return; }
        step();
      }, 1300);
    }

    function rebuildScenarioOptions() {
      var task = TASKS[taskSelect.value];
      var prevValue = scenarioSelect.value;
      scenarioSelect.innerHTML = '';
      SCENARIO_ORDER.forEach(function (key) {
        var sc = task.scenarios[key];
        if (!sc) return;
        var opt = document.createElement('option');
        opt.value = key;
        opt.textContent = sc.label;
        scenarioSelect.appendChild(opt);
      });
      if (task.scenarios[prevValue]) scenarioSelect.value = prevValue;
    }

    stepBtn.addEventListener('click', step);
    playBtn.addEventListener('click', play);
    resetBtn.addEventListener('click', load);
    scenarioSelect.addEventListener('change', load);
    taskSelect.addEventListener('change', function () { rebuildScenarioOptions(); load(); });

    rebuildScenarioOptions();
    load();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-agent-sim]').forEach(initSim);
  });
})();
