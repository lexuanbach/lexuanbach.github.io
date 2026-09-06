/* CO5151 — hover tooltip for .dag-node elements. The node's name comes
   from its aria-label (not a <title> child — an SVG <title> triggers the
   browser's own native tooltip too, which then overlaps this one). Two
   content modes, chosen per-node by which data attributes are present:
     - paper nodes:     data-summary / data-novelty / data-weakness
     - mechanism nodes: data-functionality / data-intuition / data-example
   Shows a small floating panel near the cursor. Purely presentational —
   the <a> itself still works as a normal link (click/keyboard) without JS. */
(function () {
  'use strict';

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function initDagTooltips() {
    var nodes = document.querySelectorAll('.dag-node[data-summary], .dag-node[data-functionality]');
    if (!nodes.length) return;

    var tip = document.createElement('div');
    tip.className = 'dag-tip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);

    function contentFor(node) {
      var name = node.getAttribute('aria-label') || '';
      var html = '<h5>' + escapeHtml(name) + '</h5>';
      if (node.hasAttribute('data-functionality')) {
        var func = node.getAttribute('data-functionality') || '';
        var intuition = node.getAttribute('data-intuition') || '';
        var example = node.getAttribute('data-example') || '';
        html += '<p><span class="lbl">Functionality</span>' + escapeHtml(func) + '</p>';
        html += '<p><span class="lbl">Intuition</span>' + escapeHtml(intuition) + '</p>';
        html += '<p><span class="lbl">Example</span>' + escapeHtml(example) + '</p>';
      } else {
        var summary = node.getAttribute('data-summary') || '';
        var novelty = node.getAttribute('data-novelty') || '';
        var weakness = node.getAttribute('data-weakness') || '';
        html += '<p><span class="lbl">Summary</span>' + escapeHtml(summary) + '</p>';
        html += '<p><span class="lbl">Novelty</span>' + escapeHtml(novelty) + '</p>';
        html += '<p><span class="lbl">Weakness</span>' + escapeHtml(weakness) + '</p>';
      }
      return html;
    }

    function place(x, y) {
      var margin = 14;
      var vw = window.innerWidth, vh = window.innerHeight;
      var rect = tip.getBoundingClientRect();
      var left = x + margin;
      var top = y + margin;
      if (left + rect.width > vw - margin) left = x - rect.width - margin;
      if (top + rect.height > vh - margin) top = y - rect.height - margin;
      if (left < margin) left = margin;
      if (top < margin) top = margin;
      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
    }

    function show(node, x, y) {
      tip.innerHTML = contentFor(node);
      tip.classList.add('show');
      place(x, y);
    }
    function hide() { tip.classList.remove('show'); }

    nodes.forEach(function (node) {
      node.addEventListener('mouseenter', function (e) { show(node, e.clientX, e.clientY); });
      node.addEventListener('mousemove', function (e) { place(e.clientX, e.clientY); });
      node.addEventListener('mouseleave', hide);
      node.addEventListener('focus', function () {
        var r = node.getBoundingClientRect();
        show(node, r.left + r.width / 2, r.bottom);
      });
      node.addEventListener('blur', hide);
    });
  }

  document.addEventListener('DOMContentLoaded', initDagTooltips);
})();
