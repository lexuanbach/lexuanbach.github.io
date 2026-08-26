---
layout: default
---

<style>
:root {
    --primary: #1a1a2e;
    --secondary: #16213e;
    --accent: #e94560;
    --accent-soft: #f39c6b;
    --text: #2d2d2d;
    --text-light: #666;
    --border: #e0e0e0;
}

body {
    font-family: 'Crimson Pro', serif;
    line-height: 1.7;
    color: var(--text);
}

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

/* Header Section */
.header-section {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 40px;
    margin-bottom: 60px;
    align-items: start;
    animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.profile-picture {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent);
    box-shadow: 0 8px 24px rgba(233, 69, 96, 0.15);
    transition: transform 0.3s ease;
}

.profile-picture:hover {
    transform: scale(1.05);
}

.header-content h1 {
    font-size: 2.8em;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
}

.title-line {
    font-size: 1.1em;
    color: var(--text-light);
    margin-bottom: 20px;
    font-weight: 400;
}

.header-content p {
    margin-bottom: 16px;
    color: var(--text);
}

.header-content a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
}

.header-content a:hover {
    border-bottom-color: var(--accent);
}

/* Section Styling */
section {
    margin-bottom: 70px;
    animation: fadeIn 0.8s ease-out;
    animation-fill-mode: both;
}

section:nth-child(2) { animation-delay: 0.1s; }
section:nth-child(3) { animation-delay: 0.2s; }

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h2 {
    font-size: 1.8em;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 3px solid var(--accent);
    display: inline-block;
    letter-spacing: -0.01em;
}

/* Research Interests */
.research-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.tag {
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9em;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: transform 0.2s, box-shadow 0.2s;
}

.tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
}

/* Publications */
.publication {
    margin-bottom: 28px;
    padding-left: 36px;
    position: relative;
    transition: transform 0.2s;
}

.publication:hover {
    transform: translateX(4px);
}

.publication::before {
    content: attr(data-number);
    position: absolute;
    left: 0;
    top: 2px;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    color: var(--accent);
    font-size: 0.95em;
}

.publication-authors {
    color: var(--text);
    margin-bottom: 4px;
}

.publication-title {
    font-weight: 600;
    color: var(--primary);
    font-style: italic;
    margin-bottom: 4px;
}

.publication-venue {
    color: var(--text-light);
    font-size: 0.95em;
    margin-bottom: 8px;
}

.publication-venue strong {
    color: var(--text);
}

/* Publication Tags */
.publication-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 8px;
}

.pub-award {
    display: inline-block;
    background: rgba(241, 196, 15, 0.12);
    color: #b7950b;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.75em;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    letter-spacing: 0.02em;
    border: 1px solid rgba(241, 196, 15, 0.4);
    margin-bottom: 8px;
}

.pub-tag {
    background: rgba(26, 26, 46, 0.06);
    color: var(--primary);
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.75em;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    letter-spacing: 0.02em;
    border: 1px solid rgba(26, 26, 46, 0.1);
    transition: all 0.2s;
}

.pub-tag:hover {
    background: rgba(233, 69, 96, 0.1);
    border-color: var(--accent);
    color: var(--accent);
}

/* Specific tag colors by category */
.pub-tag.nlp { 
    background: rgba(52, 152, 219, 0.1); 
    border-color: rgba(52, 152, 219, 0.3);
    color: #2980b9;
}

.pub-tag.rag { 
    background: rgba(155, 89, 182, 0.1); 
    border-color: rgba(155, 89, 182, 0.3);
    color: #8e44ad;
}

.pub-tag.rl { 
    background: rgba(46, 204, 113, 0.1); 
    border-color: rgba(46, 204, 113, 0.3);
    color: #27ae60;
}

.pub-tag.quantum { 
    background: rgba(230, 126, 34, 0.1); 
    border-color: rgba(230, 126, 34, 0.3);
    color: #d35400;
}

.pub-tag.verification { 
    background: rgba(231, 76, 60, 0.1); 
    border-color: rgba(231, 76, 60, 0.3);
    color: #c0392b;
}

.pub-tag.theory { 
    background: rgba(149, 165, 166, 0.1); 
    border-color: rgba(149, 165, 166, 0.3);
    color: #7f8c8d;
}

.pub-tag.logic { 
    background: rgba(52, 73, 94, 0.1); 
    border-color: rgba(52, 73, 94, 0.3);
    color: #34495e;
}

.publication-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.pub-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    background: #fafafa;
    border: 1px solid var(--border);
    border-radius: 6px;
    text-decoration: none;
    color: var(--text);
    font-size: 0.85em;
    font-family: 'IBM Plex Mono', monospace;
    transition: all 0.2s;
}

.pub-link:hover {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
    transform: translateY(-1px);
}

/* Abstract & BibTeX Toggle */
.abstract-toggle,
.bibtex-toggle,
.award-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    background: #fafafa;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-size: 0.85em;
    font-family: 'IBM Plex Mono', monospace;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
}

.abstract-toggle:hover {
    background: var(--secondary);
    color: white;
    border-color: var(--secondary);
    transform: translateY(-1px);
}

.bibtex-toggle:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    transform: translateY(-1px);
}

.award-toggle:hover {
    background: #b7950b;
    color: white;
    border-color: #b7950b;
    transform: translateY(-1px);
}

.abstract-toggle .arrow,
.bibtex-toggle .arrow,
.award-toggle .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
}

.abstract-toggle.active .arrow,
.bibtex-toggle.active .arrow,
.award-toggle.active .arrow {
    transform: rotate(180deg);
}

.abstract-content,
.bibtex-content,
.award-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, margin-top 0.4s ease, opacity 0.4s ease;
    opacity: 0;
    margin-top: 0;
}

.abstract-content.show,
.bibtex-content.show,
.award-content.show {
    opacity: 1;
    margin-top: 12px;
}

.award-photo img {
    display: block;
    max-width: 100%;
    max-height: 420px;
    width: auto;
    height: auto;
    border-radius: 8px;
    border: 1px solid rgba(241, 196, 15, 0.4);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    transition: transform 0.2s, box-shadow 0.2s;
}

.award-photo img:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
}

.abstract-text {
    background: rgba(26, 26, 46, 0.03);
    padding: 16px;
    border-radius: 8px;
    border-left: 3px solid var(--accent);
    font-size: 0.95em;
    line-height: 1.6;
    color: var(--text);
}

.bibtex-text {
    background: rgba(26, 26, 46, 0.95);
    color: #f8f8f2;
    padding: 16px;
    border-radius: 8px;
    font-size: 0.85em;
    line-height: 1.5;
    font-family: 'IBM Plex Mono', monospace;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    position: relative;
}

.bibtex-copy {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    color: white;
    font-size: 0.75em;
    cursor: pointer;
    transition: all 0.2s;
}

.bibtex-copy:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
}

.bibtex-copy.copied {
    background: rgba(46, 204, 113, 0.3);
    border-color: rgba(46, 204, 113, 0.5);
}

/* Featured publication */
.publication.featured {
    background: linear-gradient(to right, rgba(233, 69, 96, 0.05), transparent);
    padding: 20px;
    padding-left: 56px;
    margin-left: -20px;
    margin-right: -20px;
    border-left: 4px solid var(--accent);
    border-radius: 0 8px 8px 0;
}

/* Thesis styling */
.thesis-publication {
    margin-top: 40px;
    border-top: 2px solid var(--border);
    padding-top: 30px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .header-section {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 20px;
    }

    .profile-picture {
        margin: 0 auto;
    }

    .header-content h1 {
        font-size: 2.2em;
    }

    h2 {
        font-size: 1.5em;
    }

    .publication {
        padding-left: 28px;
    }

    .publication.featured {
        padding-left: 48px;
    }

    .pillars {
        grid-template-columns: 1fr;
    }

    .vision-statement {
        font-size: 1.15em;
    }
}

/* Header honours */
.header-honor {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding: 6px 14px;
    background: rgba(241, 196, 15, 0.10);
    border: 1px solid rgba(241, 196, 15, 0.45);
    border-radius: 20px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78em;
    line-height: 1.5;
    color: #9a7d0a;
}

/* ===== Research Vision & Pillars ===== */
.vision-brand {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78em;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 14px;
}

.vision-statement {
    font-size: 1.32em;
    line-height: 1.55;
    color: var(--primary);
    max-width: 44em;
    margin-bottom: 16px;
}

.vision-statement strong {
    font-weight: 600;
    color: var(--accent);
}

.vision-note {
    color: var(--text-light);
    max-width: 46em;
}

.pillars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-top: 32px;
}

.pillar {
    display: block;
    text-align: left;
    font-family: inherit;
    color: inherit;
    text-decoration: none;
    background: #fff;
    padding: 20px 20px 16px;
    border: 1px solid var(--border);
    border-top: 3px solid var(--p-color);
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.pillar:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    border-color: var(--p-color);
    border-top-color: var(--p-color);
}

.pillar-index {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75em;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--p-color);
}

.pillar h3 {
    font-size: 1.15em;
    font-weight: 600;
    color: var(--primary);
    margin: 6px 0 10px;
    letter-spacing: -0.01em;
}

.pillar-sub {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.74em;
    line-height: 1.6;
    color: var(--p-color);
    margin-bottom: 10px;
}

.pillar-desc {
    font-size: 0.92em;
    line-height: 1.55;
    color: var(--text-light);
    margin-bottom: 14px;
}

.pillar-count {
    display: block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.74em;
    color: var(--text-light);
    border-top: 1px solid var(--border);
    padding-top: 10px;
}

.pillar-verified { --p-color: #c0392b; }
.pillar-agents   { --p-color: #8e44ad; }
.pillar-autonomy { --p-color: #27ae60; }
.pillar-applied  { --p-color: #7f8c8d; }

/* Publication filter bar */
.pub-filter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: -8px 0 32px;
}

.filter-btn {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8em;
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: #fafafa;
    color: var(--text);
    cursor: pointer;
    transition: all 0.2s;
}

.filter-btn:hover {
    border-color: var(--p-color, var(--accent));
    color: var(--p-color, var(--accent));
}

.filter-btn.active {
    background: var(--p-color, var(--primary));
    border-color: var(--p-color, var(--primary));
    color: #fff;
}

.filter-count {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78em;
    color: var(--text-light);
    margin-left: 4px;
}

/* Per-publication pillar label */
.pub-pillar {
    display: inline-block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7em;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--p-color);
    margin-bottom: 6px;
    padding-left: 10px;
    border-left: 3px solid var(--p-color);
}

.pub-status {
    display: inline-block;
    background: rgba(52, 152, 219, 0.10);
    color: #2471a3;
    border: 1px solid rgba(52, 152, 219, 0.35);
    padding: 1px 8px;
    border-radius: 10px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78em;
    letter-spacing: 0.02em;
    margin-left: 6px;
}

/* Recruiting callout */
.recruiting {
    margin-top: 28px;
    padding: 18px 22px;
    background: rgba(233, 69, 96, 0.05);
    border-left: 3px solid var(--accent);
    border-radius: 0 8px 8px 0;
}

.recruiting p {
    margin: 0;
}

.recruiting p + p {
    margin-top: 8px;
}

.recruiting-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8em;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px !important;
}

.recruiting a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
}

.recruiting a:hover {
    border-bottom-color: var(--accent);
}
</style>

<script>
function toggleContent(toggle, content) {
    toggle.classList.toggle('active');
    const isOpen = content.classList.toggle('show');
    content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0';
}

function toggleAbstract(id) {
    const toggle = document.getElementById('toggle-' + id);
    const content = document.getElementById('abstract-' + id);
    toggleContent(toggle, content);
}

function toggleBibtex(id) {
    const toggle = document.getElementById('bibtex-toggle-' + id);
    const content = document.getElementById('bibtex-' + id);
    toggleContent(toggle, content);
}

function toggleAward(id) {
    const toggle = document.getElementById('award-toggle-' + id);
    const content = document.getElementById('award-' + id);
    toggleContent(toggle, content);
    const img = content.querySelector('img');
    if (img && !img.complete) {
        img.addEventListener('load', function() {
            if (content.classList.contains('show')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        }, { once: true });
    }
}

function filterPillar(pillar, scroll) {
    var shown = 0;
    document.querySelectorAll('.publication').forEach(function (p) {
        var match = (pillar === 'all' || p.dataset.pillar === pillar);
        p.style.display = match ? '' : 'none';
        if (match) { shown++; }
    });
    document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.pillar === pillar);
    });
    var counter = document.getElementById('filter-count');
    if (counter) {
        counter.textContent = shown + (shown === 1 ? ' paper' : ' papers');
    }
    if (scroll) {
        document.getElementById('publications').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function copyBibtex(id) {
    const bibtexText = document.getElementById('bibtex-text-' + id).textContent;
    const button = document.getElementById('bibtex-copy-' + id);
    
    navigator.clipboard.writeText(bibtexText).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}
</script>

<div class="header-section">
    <img class="profile-picture" src="me.jpg" alt="Xuan-Bach Le">
    <div class="header-content">
        <h1>Xuan-Bach Le</h1>
        <p class="title-line">Lecturer, Ho Chi Minh City University of Technology, Vietnam &middot; Head of the RAISE Lab</p>
        <p class="header-honor">🎖 VNU350 Programme 2025 &mdash; Outstanding Young Scientist, VNU-HCM</p>
        <p>I am a Lecturer at Ho Chi Minh City University of Technology, Vietnam, where I head the <a href="https://raise-website.vercel.app/" target="_blank">RAISE lab</a> &mdash; Reasoning in Artificial Intelligence and Software Engineering. I joined HCMUT through the <strong>VNU350 Programme</strong> in 2025, Vietnam National University Ho Chi Minh City&rsquo;s scheme for recruiting outstanding young scientists. Previously, I was a postdoctoral researcher at NTU Singapore under Professor <a href="https://www3.ntu.edu.sg/home/luke.ong/" target="_blank">Luke Ong</a>. Additional information about my background can be found in my <a href="cv.pdf" target="_blank">CV</a>.</p>
        <p>I studied a Double-Degree Program in Computer Science and Pure Mathematics (<a href="courses.html" target="_blank">courses taken</a>) at NUS (2007-2012), then obtained my PhD in Computer Science from NUS (2013-2017) under <a href="https://www.comp.nus.edu.sg/~hobor/" target="_blank">Aquinas Hobor</a> with mentorship from <a href="https://anthonywlin.github.io/" target="_blank">Anthony W. Lin</a>.</p>
    </div>
</div>

## Research Vision

<p class="vision-brand">Formal &amp; Reliable AI &middot; Verified AI Agents</p>

<p class="vision-statement">I develop methods for building AI systems that can <strong>reason</strong>, <strong>verify</strong> what they produce, and <strong>know when they are uncertain</strong>.</p>

<p class="vision-note">My work sits at the intersection of formal methods, large language models, and software reliability: I use logic and verification to give evidence for what learned systems claim, and I use learned systems to reach problems that classical verification cannot. Three pillars carry that agenda, and every paper below is labelled with the one it belongs to &mdash; click a pillar to see only its papers.</p>

<div class="pillars">
    <a class="pillar pillar-verified" href="#publications" onclick="filterPillar('verified', true); return false;">
        <span class="pillar-index">01</span>
        <h3>Verified AI</h3>
        <p class="pillar-sub">Formal reasoning &middot; program synthesis &middot; verification</p>
        <p class="pillar-desc">Logics, decision procedures and proof techniques that certify what a program &mdash; or a model &mdash; is claimed to do, from separation logic and fractional permissions to LLM-driven program analysis.</p>
        <span class="pillar-count">{{ site.data.publications | where: "pillar", "verified" | size }} papers &rarr;</span>
    </a>
    <a class="pillar pillar-agents" href="#publications" onclick="filterPillar('agents', true); return false;">
        <span class="pillar-index">02</span>
        <h3>Auditable AI Agents</h3>
        <p class="pillar-sub">LLM agents &middot; RAG &middot; reliability &middot; security</p>
        <p class="pillar-desc">Making LLM agents and retrieval pipelines accountable: auditing their traces, defending their memories and retrieval corpora, and deciding which of their outputs have earned the right to be trusted.</p>
        <span class="pillar-count">{{ site.data.publications | where: "pillar", "agents" | size }} papers &rarr;</span>
    </a>
    <a class="pillar pillar-autonomy" href="#publications" onclick="filterPillar('autonomy', true); return false;">
        <span class="pillar-index">03</span>
        <h3>Safe Autonomous Systems</h3>
        <p class="pillar-sub">RL &middot; robotics &middot; anomaly detection &middot; risk-aware control</p>
        <p class="pillar-desc">Autonomy that respects a specification: reinforcement learning under temporal-logic objectives, and detecting and recovering from anomalies before an autonomous system acts on them.</p>
        <span class="pillar-count">{{ site.data.publications | where: "pillar", "autonomy" | size }} papers &rarr;</span>
    </a>
</div>

<div class="recruiting">
    <p class="recruiting-title">Looking for motivated students</p>
    <p>The <a href="https://raise-website.vercel.app/" target="_blank">RAISE lab</a> works on LLMs for software engineering, formal reasoning and verification, secure and trustworthy AI systems, and multilingual and responsible AI. I am looking for motivated students who want to do good research in these areas &mdash; work that is careful, honest about its limits, and worth publishing.</p>
    <p>If that sounds like you, please <a href="contact">get in touch</a>. You can see what my <a href="students">current and former students</a> work on.</p>
</div>


<h2 id="publications">Publications</h2>

<div class="pub-filter">
    <button class="filter-btn active" data-pillar="all" onclick="filterPillar('all', false)">All</button>
    <button class="filter-btn pillar-verified" data-pillar="verified" onclick="filterPillar('verified', false)">Verified AI</button>
    <button class="filter-btn pillar-agents" data-pillar="agents" onclick="filterPillar('agents', false)">Auditable AI Agents</button>
    <button class="filter-btn pillar-autonomy" data-pillar="autonomy" onclick="filterPillar('autonomy', false)">Safe Autonomous Systems</button>
    <button class="filter-btn pillar-applied" data-pillar="applied" onclick="filterPillar('applied', false)">Applied &amp; Collaborative</button>
    <span class="filter-count" id="filter-count">{{ site.data.publications | size }} papers</span>
</div>

{% for pub in site.data.publications %}
{% case pub.pillar %}{% when 'verified' %}{% assign pillar_name = 'Verified AI' %}{% when 'agents' %}{% assign pillar_name = 'Auditable AI Agents' %}{% when 'autonomy' %}{% assign pillar_name = 'Safe Autonomous Systems' %}{% else %}{% assign pillar_name = 'Applied &amp; Collaborative' %}{% endcase %}
<div class="publication pillar-{{ pub.pillar }}{% if pub.is_thesis %} thesis-publication{% endif %}" data-number="{{ pub.number }}" data-pillar="{{ pub.pillar }}">
    <div><span class="pub-pillar">{{ pillar_name }}</span></div>
    {% if pub.authors != "" %}
    <div class="publication-authors">{{ pub.authors }}</div>
    {% endif %}
    <div class="publication-title">{{ pub.title }}</div>
    <div class="publication-venue">
        {% if pub.venue.url != "" %}
        <strong>
            <a href="{{ pub.venue.url }}" target="_blank">{{ pub.venue.name }}</a>
        </strong>
        {% else %}
        <strong>{{ pub.venue.name }}</strong>
        {% endif %}
        {% if pub.venue.location != "" %}
        , {{ pub.venue.location }}
        {% endif %}
        {% if pub.venue.date != "" %}
        ({{ pub.venue.date }})
        {% endif %}
        {% if pub.status != "" and pub.status %}
        <span class="pub-status">{{ pub.status }}</span>
        {% endif %}
    </div>
    {% if pub.award != "" and pub.award %}
    <div><span class="pub-award">🏆 {{ pub.award }}</span></div>
    {% endif %}
    <div class="publication-tags">
        {% for tag in pub.tags %}
        <span class="pub-tag {{ tag.class }}">{{ tag.text }}</span>
        {% endfor %}
    </div>
    <div class="publication-links">
        {% for link in pub.links %}
        <a href="{{ link.url }}" class="pub-link" target="_blank">{{ link.icon }} {{ link.type | capitalize }}</a>
        {% endfor %}
        <span class="abstract-toggle" id="toggle-{{ pub.id }}" onclick="toggleAbstract('{{ pub.id }}')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
        <span class="bibtex-toggle" id="bibtex-toggle-{{ pub.id }}" onclick="toggleBibtex('{{ pub.id }}')">
            📋 BibTeX <span class="arrow">▼</span>
        </span>
        {% if pub.award_image != "" and pub.award_image %}
        <span class="award-toggle" id="award-toggle-{{ pub.id }}" onclick="toggleAward('{{ pub.id }}')">
            🏆 Award Photo <span class="arrow">▼</span>
        </span>
        {% endif %}
    </div>
    {% if pub.award_image != "" and pub.award_image %}
    <div class="award-content" id="award-{{ pub.id }}">
        <div class="award-photo">
            <a href="{{ pub.award_image }}" target="_blank">
                <img src="{{ pub.award_image }}" alt="{{ pub.award }} — {{ pub.title }}" loading="lazy">
            </a>
        </div>
    </div>
    {% endif %}
    <div class="abstract-content" id="abstract-{{ pub.id }}">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            {{ pub.abstract }}
        </div>
    </div>
    <div class="bibtex-content" id="bibtex-{{ pub.id }}">
        <div class="bibtex-text">
            <button class="bibtex-copy" id="bibtex-copy-{{ pub.id }}" onclick="copyBibtex('{{ pub.id }}')">📋 Copy</button>
            <pre id="bibtex-text-{{ pub.id }}">{{ pub.bibtex }}</pre>
        </div>
    </div>
</div>
{% endfor %}
