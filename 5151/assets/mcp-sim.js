/* CO5151 — MCP playground: a scripted, deterministic step-through of a
   real MCP message exchange (initialize -> tools/list -> tools/call),
   with the actual JSON-RPC-shaped payloads shown at each step. */
(function () {
  'use strict';

  function tool(name, description, params) {
    return { name: name, description: description, inputSchema: { type: 'object', properties: params, required: Object.keys(params) } };
  }

  var SCENARIOS = {
    database: {
      label: 'Database server — "Show me last week\'s top 3 orders by revenue"',
      serverName: 'orders-db',
      tool: tool('query_database', 'Run a read-only SQL query against the orders database.', { sql: { type: 'string' } }),
      callArgs: { sql: "SELECT id, revenue FROM orders WHERE date > now() - interval '7 days' ORDER BY revenue DESC LIMIT 3" },
      result: { rows: [{ id: 'ORD-4471', revenue: 8420 }, { id: 'ORD-4409', revenue: 7115 }, { id: 'ORD-4502', revenue: 6890 }] },
      decideText: 'The user asked for top orders by revenue — that matches query_database\'s description. The LLM writes the SQL itself.',
    },
    weather: {
      label: 'Weather server — "Will it rain in Hanoi this weekend?"',
      serverName: 'weather-api',
      tool: tool('get_forecast', 'Get a multi-day weather forecast for a city.', { city: { type: 'string' }, days: { type: 'integer' } }),
      callArgs: { city: 'Hanoi', days: 3 },
      result: { city: 'Hanoi', forecast: [{ day: 'Sat', condition: 'light rain', tempC: 27 }, { day: 'Sun', condition: 'showers', tempC: 26 }, { day: 'Mon', condition: 'partly cloudy', tempC: 29 }] },
      decideText: 'The user asked about rain this weekend — get_forecast\'s description is the only match among this server\'s tools.',
    },
  };

  function pretty(obj) { return JSON.stringify(obj, null, 2); }

  function buildSteps(sc) {
    return [
      {
        from: 'client', title: 'initialize',
        desc: 'The client opens a session and declares what it supports.',
        json: { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'host-app', version: '1.0' } } },
      },
      {
        from: 'server', title: 'initialize response',
        desc: 'The server confirms the protocol version and its own capabilities.',
        json: { jsonrpc: '2.0', id: 1, result: { protocolVersion: '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: sc.serverName, version: '1.0' } } },
      },
      {
        from: 'client', title: 'tools/list',
        desc: 'The client asks what tools this server exposes.',
        json: { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} },
      },
      {
        from: 'server', title: 'tools/list response',
        desc: 'The server returns its tool list — this description is the ONLY thing the host\'s LLM sees before deciding whether to use it.',
        json: { jsonrpc: '2.0', id: 2, result: { tools: [sc.tool] } },
      },
      {
        from: 'host', title: 'Host\'s LLM decides', internal: true,
        desc: sc.decideText,
      },
      {
        from: 'client', title: 'tools/call',
        desc: 'The client sends the actual invocation, with concrete arguments the model chose.',
        json: { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: sc.tool.name, arguments: sc.callArgs } },
      },
      {
        from: 'server', title: 'tools/call response',
        desc: 'The server executes the call for real and returns a result.',
        json: { jsonrpc: '2.0', id: 3, result: { content: [{ type: 'text', text: pretty(sc.result) }] } },
      },
    ];
  }

  function initMcpSim() {
    var root = document.querySelector('.mcp-sim');
    if (!root) return;

    var select = root.querySelector('#mcp-scenario-select');
    var stepBtn = root.querySelector('#mcp-step');
    var playBtn = root.querySelector('#mcp-play');
    var resetBtn = root.querySelector('#mcp-reset');
    var clientBox = root.querySelector('.mcp-node.client');
    var serverBox = root.querySelector('.mcp-node.server');
    var log = root.querySelector('#mcp-log');
    var stepCountEl = root.querySelector('#mcp-step-count');
    var msgCountEl = root.querySelector('#mcp-msg-count');

    Object.keys(SCENARIOS).forEach(function (key) {
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = SCENARIOS[key].label;
      select.appendChild(opt);
    });

    var steps = [];
    var idx = 0;
    var msgCount = 0;
    var playing = false;

    function load() {
      steps = buildSteps(SCENARIOS[select.value]);
      idx = 0;
      msgCount = 0;
      playing = false;
      log.innerHTML = '';
      clientBox.classList.remove('active');
      serverBox.classList.remove('active');
      updateStats();
      stepBtn.disabled = false;
    }

    function updateStats() {
      stepCountEl.textContent = idx + ' / ' + steps.length;
      msgCountEl.textContent = String(msgCount);
    }

    function renderStep(s) {
      clientBox.classList.toggle('active', s.from === 'client');
      serverBox.classList.toggle('active', s.from === 'server');
      if (s.from === 'host') { clientBox.classList.remove('active'); serverBox.classList.remove('active'); }

      var wrap = document.createElement('div');
      wrap.className = 'mcp-msg enter ' + (s.internal ? 'internal' : s.from);
      var head = document.createElement('div');
      head.className = 'mcp-msg-head';
      var roleLabel = s.internal ? 'Host (internal)' : (s.from === 'client' ? 'Client → Server' : 'Server → Client');
      head.innerHTML = '<span class="mcp-msg-role">' + roleLabel + '</span><span class="mcp-msg-title">' + s.title + '</span>';
      wrap.appendChild(head);
      var desc = document.createElement('p');
      desc.className = 'mcp-msg-desc';
      desc.textContent = s.desc;
      wrap.appendChild(desc);
      if (s.json) {
        var pre = document.createElement('pre');
        pre.className = 'codeblock mcp-msg-json';
        var code = document.createElement('code');
        code.className = 'language-json';
        code.textContent = pretty(s.json);
        pre.appendChild(code);
        wrap.appendChild(pre);
        if (window.hljs) window.hljs.highlightElement(code);
        msgCount++;
      }
      log.appendChild(wrap);
      log.scrollTop = log.scrollHeight;
    }

    function step() {
      if (idx >= steps.length) return;
      renderStep(steps[idx]);
      idx++;
      updateStats();
      if (idx >= steps.length) {
        stepBtn.disabled = true;
        clientBox.classList.remove('active');
        serverBox.classList.remove('active');
        playing = false;
        playBtn.textContent = '▶ Play';
      }
    }

    function playLoop() {
      if (!playing) return;
      if (idx >= steps.length) { playing = false; playBtn.textContent = '▶ Play'; return; }
      step();
      setTimeout(playLoop, 900);
    }

    select.addEventListener('change', load);
    stepBtn.addEventListener('click', step);
    resetBtn.addEventListener('click', load);
    playBtn.addEventListener('click', function () {
      playing = !playing;
      playBtn.textContent = playing ? '⏸ Pause' : '▶ Play';
      if (playing) playLoop();
    });

    load();
  }

  document.addEventListener('DOMContentLoaded', initMcpSim);
})();
