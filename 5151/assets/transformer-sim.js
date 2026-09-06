/* CO5151 — a real, tiny (≈720-parameter) decoder-only Transformer, trained
   live in the browser via numerical-gradient descent (finite differences,
   not backprop pseudo-code — every number here is a genuine forward pass).
   Toy corpus: two 6-word sentences, so training visibly converges in a
   handful of steps and inference visibly completes them correctly. */
(function () {
  'use strict';

  var VOCAB = ["the", "cat", "dog", "sat", "ran", "on", "mat", "road"];
  var V = VOCAB.length;
  var tok2id = {};
  VOCAB.forEach(function (w, i) { tok2id[w] = i; });
  var SENTS_TXT = ["the cat sat on the mat", "the dog ran on the road"];
  var SENTS = SENTS_TXT.map(function (s) { return s.split(" ").map(function (w) { return tok2id[w]; }); });
  var SEQ = SENTS[0].length; // 6
  var D = 8, H = 2, HD = D / H, FF = 16;

  function randMat(r, c, scale) {
    var m = [];
    for (var i = 0; i < r; i++) {
      var row = [];
      for (var j = 0; j < c; j++) row.push((Math.random() * 2 - 1) * scale);
      m.push(row);
    }
    return m;
  }
  function zeros(n) { var a = []; for (var i = 0; i < n; i++) a.push(0); return a; }
  function addv(a, b) { var r = []; for (var i = 0; i < a.length; i++) r.push(a[i] + b[i]); return r; }
  function relu(v) { return v.map(function (x) { return Math.max(0, x); }); }
  function softmax(v) {
    var m = Math.max.apply(null, v);
    var ex = v.map(function (x) { return Math.exp(x - m); });
    var s = ex.reduce(function (a, b) { return a + b; }, 0);
    return ex.map(function (x) { return x / s; });
  }
  function matvec(M, v) {
    var out = zeros(M[0].length);
    for (var i = 0; i < M.length; i++) {
      var vi = v[i];
      if (vi === 0) continue;
      var mi = M[i];
      for (var j = 0; j < mi.length; j++) out[j] += vi * mi[j];
    }
    return out;
  }

  function initParams() {
    return {
      E: randMat(V, D, 0.3), P: randMat(SEQ, D, 0.3),
      Wq: randMat(D, D, 0.3), Wk: randMat(D, D, 0.3), Wv: randMat(D, D, 0.3), Wo: randMat(D, D, 0.3),
      W1: randMat(D, FF, 0.3), b1: zeros(FF), W2: randMat(FF, D, 0.3), b2: zeros(D),
      Wout: randMat(D, V, 0.3), bout: zeros(V),
    };
  }

  // Returns { logits: [seq][V], attn: [head][i] -> weights array of length i+1 }
  function forward(p, ids, wantAttn) {
    var seq = ids.length;
    var x = ids.map(function (id, t) { return addv(p.E[id], p.P[t]); });
    var Q = x.map(function (xt) { return matvec(p.Wq, xt); });
    var K = x.map(function (xt) { return matvec(p.Wk, xt); });
    var Val = x.map(function (xt) { return matvec(p.Wv, xt); });
    var attnOut = x.map(function () { return zeros(D); });
    var attnWeights = wantAttn ? [] : null;
    for (var h = 0; h < H; h++) {
      var off = h * HD;
      var headAttn = wantAttn ? [] : null;
      for (var i = 0; i < seq; i++) {
        var scores = [];
        for (var j = 0; j <= i; j++) {
          var s = 0;
          for (var d = 0; d < HD; d++) s += Q[i][off + d] * K[j][off + d];
          scores.push(s / Math.sqrt(HD));
        }
        var w = softmax(scores);
        if (wantAttn) headAttn.push(w);
        for (var d2 = 0; d2 < HD; d2++) {
          var acc = 0;
          for (var j2 = 0; j2 <= i; j2++) acc += w[j2] * Val[j2][off + d2];
          attnOut[i][off + d2] = acc;
        }
      }
      if (wantAttn) attnWeights.push(headAttn);
    }
    var attnProj = attnOut.map(function (a) { return matvec(p.Wo, a); });
    var x2 = x.map(function (xt, t) { return addv(xt, attnProj[t]); });
    var ffOut = x2.map(function (xt) { return addv(matvec(p.W2, relu(addv(matvec(p.W1, xt), p.b1))), p.b2); });
    var x3 = x2.map(function (xt, t) { return addv(xt, ffOut[t]); });
    var logits = x3.map(function (xt) { return addv(matvec(p.Wout, xt), p.bout); });
    return { logits: logits, attn: attnWeights };
  }

  function seqLoss(p, ids) {
    var logits = forward(p, ids, false).logits;
    var loss = 0, n = 0;
    for (var t = 0; t < ids.length - 1; t++) {
      var probs = softmax(logits[t]);
      loss += -Math.log(Math.max(probs[ids[t + 1]], 1e-9));
      n++;
    }
    return loss / n;
  }
  function batchLoss(p, sents) {
    var tot = 0;
    for (var i = 0; i < sents.length; i++) tot += seqLoss(p, sents[i]);
    return tot / sents.length;
  }

  function flatten(p) {
    var keys = Object.keys(p), arr = [], shapes = {};
    keys.forEach(function (k) {
      var v = p[k];
      if (Array.isArray(v[0])) { shapes[k] = [v.length, v[0].length]; v.forEach(function (row) { arr.push.apply(arr, row); }); }
      else { shapes[k] = [v.length]; arr.push.apply(arr, v); }
    });
    return { arr: arr, shapes: shapes, keys: keys };
  }
  function unflatten(arr, shapes, keys) {
    var p = {}, idx = 0;
    keys.forEach(function (k) {
      var shape = shapes[k];
      if (shape.length === 2) {
        var r = shape[0], c = shape[1], m = [];
        for (var i = 0; i < r; i++) { m.push(arr.slice(idx, idx + c)); idx += c; }
        p[k] = m;
      } else { p[k] = arr.slice(idx, idx + shape[0]); idx += shape[0]; }
    });
    return p;
  }

  function trainStep(p, sents, lr, eps) {
    var f = flatten(p), arr = f.arr, shapes = f.shapes, keys = f.keys;
    var base = arr.slice(), grad = zeros(arr.length);
    for (var i = 0; i < arr.length; i++) {
      var orig = base[i];
      base[i] = orig + eps;
      var lp = batchLoss(unflatten(base, shapes, keys), sents);
      base[i] = orig - eps;
      var lm = batchLoss(unflatten(base, shapes, keys), sents);
      base[i] = orig;
      grad[i] = (lp - lm) / (2 * eps);
    }
    var newArr = arr.map(function (v, i) { return v - lr * grad[i]; });
    return unflatten(newArr, shapes, keys);
  }

  // ---------------- UI wiring ----------------
  function initTransformerSim() {
    var root = document.querySelector('.tf-sim');
    if (!root) return;

    var params = initParams();
    var step = 0;
    var lossHistory = [];

    var stepEl = root.querySelector('#tf-step');
    var lossEl = root.querySelector('#tf-loss');
    var chartPath = root.querySelector('#tf-loss-path');
    var chartWrap = root.querySelector('#tf-loss-chart');
    var attnBars = root.querySelector('#tf-attn-bars');
    var genSeqEl = root.querySelector('#tf-sequence');
    var genProbsEl = root.querySelector('#tf-probs');
    var genAttnEl = root.querySelector('#tf-gen-attn-bars');
    var vocabButtonsEl = root.querySelector('#tf-vocab-buttons');

    var PEEK_WORDS = "the cat sat on the".split(" ").map(function (w) { return tok2id[w]; });
    var genIds = [tok2id.the];

    function renderBarRow(container, label, value, maxLabelWidth) {
      var row = document.createElement('div');
      row.className = 'tf-bar-row';
      var lab = document.createElement('span');
      lab.className = 'tf-bar-label';
      lab.textContent = label;
      var track = document.createElement('div');
      track.className = 'tf-bar-track';
      var fill = document.createElement('div');
      fill.className = 'tf-bar-fill';
      fill.style.width = Math.max(2, Math.round(value * 100)) + '%';
      var pct = document.createElement('span');
      pct.className = 'tf-bar-pct';
      pct.textContent = Math.round(value * 100) + '%';
      track.appendChild(fill);
      row.appendChild(lab);
      row.appendChild(track);
      row.appendChild(pct);
      container.appendChild(row);
    }

    function renderLossChart() {
      if (!chartPath) return;
      var n = lossHistory.length;
      if (n < 2) { chartPath.setAttribute('d', ''); return; }
      var maxLoss = Math.max.apply(null, lossHistory.concat([0.1]));
      var w = 400, h = 100, pad = 6;
      var pts = lossHistory.map(function (l, i) {
        var x = pad + (i / (n - 1)) * (w - 2 * pad);
        var y = pad + (1 - l / maxLoss) * (h - 2 * pad);
        return x.toFixed(1) + ',' + y.toFixed(1);
      });
      chartPath.setAttribute('d', 'M' + pts.join(' L'));
    }

    function renderAttnPeek() {
      if (!attnBars) return;
      attnBars.innerHTML = '';
      var res = forward(params, PEEK_WORDS, true);
      var lastIdx = PEEK_WORDS.length - 1; // predicting the word after "the cat sat on the"
      // average the two heads for a single readable bar per position
      var n = lastIdx + 1;
      var avg = [];
      for (var j = 0; j < n; j++) {
        var s = 0;
        for (var h = 0; h < H; h++) s += res.attn[h][lastIdx][j];
        avg.push(s / H);
      }
      PEEK_WORDS.forEach(function (id, j) {
        renderBarRow(attnBars, VOCAB[id] + ' (pos ' + j + ')', avg[j]);
      });
    }

    function renderStats() {
      stepEl.textContent = String(step);
      var loss = batchLoss(params, SENTS);
      lossEl.textContent = loss.toFixed(3);
    }

    function refreshTrainPanel() {
      renderStats();
      renderLossChart();
      renderAttnPeek();
    }

    function doTrainSteps(n) {
      var btns = root.querySelectorAll('.tf-controls button');
      btns.forEach(function (b) { b.disabled = true; });
      // run synchronously in small chunks via setTimeout so the UI can paint "training…"
      var i = 0;
      var stepsBar = root.querySelector('#tf-training-flag');
      if (stepsBar) stepsBar.hidden = false;
      function chunk() {
        var end = Math.min(i + 1, n);
        for (; i < end; i++) {
          params = trainStep(params, SENTS, 0.5, 1e-3);
          step++;
          lossHistory.push(batchLoss(params, SENTS));
          if (lossHistory.length > 200) lossHistory.shift();
        }
        refreshTrainPanel();
        if (i < n) {
          setTimeout(chunk, 0);
        } else {
          btns.forEach(function (b) { b.disabled = false; });
          if (stepsBar) stepsBar.hidden = true;
        }
      }
      chunk();
    }

    root.querySelector('#tf-train-1').addEventListener('click', function () { doTrainSteps(1); });
    root.querySelector('#tf-train-20').addEventListener('click', function () { doTrainSteps(20); });
    root.querySelector('#tf-reset').addEventListener('click', function () {
      params = initParams();
      step = 0;
      lossHistory = [];
      genIds = [tok2id.the];
      refreshTrainPanel();
      renderGenerate();
    });

    // ---- Generate tab ----
    function renderGenerate() {
      genSeqEl.innerHTML = '';
      genIds.forEach(function (id) {
        var chip = document.createElement('span');
        chip.className = 'tf-seq-chip';
        chip.textContent = VOCAB[id];
        genSeqEl.appendChild(chip);
      });
      genProbsEl.innerHTML = '';
      genAttnEl.innerHTML = '';
      var canContinue = genIds.length < SEQ;
      root.querySelector('#tf-gen-step').disabled = !canContinue;
      root.querySelector('#tf-gen-full').disabled = !canContinue;
      if (!canContinue) return;
      var res = forward(params, genIds, true);
      var lastIdx = genIds.length - 1;
      var probs = softmax(res.logits[lastIdx]);
      var order = VOCAB.map(function (_, i) { return i; }).sort(function (a, b) { return probs[b] - probs[a]; });
      order.forEach(function (id) { renderBarRow(genProbsEl, VOCAB[id], probs[id]); });
      var avg = [];
      for (var j = 0; j <= lastIdx; j++) {
        var s = 0;
        for (var h = 0; h < H; h++) s += res.attn[h][lastIdx][j];
        avg.push(s / H);
      }
      genIds.forEach(function (id, j) { renderBarRow(genAttnEl, VOCAB[id] + ' (pos ' + j + ')', avg[j]); });
    }
    function genStepOnce() {
      if (genIds.length >= SEQ) return;
      var res = forward(params, genIds, false);
      var probs = softmax(res.logits[genIds.length - 1]);
      var best = 0;
      for (var i = 1; i < probs.length; i++) if (probs[i] > probs[best]) best = i;
      genIds.push(best);
      renderGenerate();
    }
    root.querySelector('#tf-gen-step').addEventListener('click', genStepOnce);
    root.querySelector('#tf-gen-full').addEventListener('click', function () {
      function loop() {
        if (genIds.length >= SEQ) return;
        genStepOnce();
        setTimeout(loop, 350);
      }
      loop();
    });
    root.querySelector('#tf-gen-reset').addEventListener('click', function () {
      genIds = [tok2id.the];
      renderGenerate();
    });
    VOCAB.forEach(function (w) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn ghost tf-vocab-btn';
      b.textContent = w;
      b.addEventListener('click', function () {
        if (genIds.length >= SEQ) return;
        genIds.push(tok2id[w]);
        renderGenerate();
      });
      vocabButtonsEl.appendChild(b);
    });

    // ---- tabs ----
    var tabs = root.querySelectorAll('.tf-tab');
    var panels = root.querySelectorAll('.tf-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var name = tab.getAttribute('data-tab');
        panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== name; });
      });
    });

    refreshTrainPanel();
    renderGenerate();
  }

  document.addEventListener('DOMContentLoaded', initTransformerSim);
})();
