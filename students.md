---
layout: default
title: "Students — Xuan-Bach Le"
description: "Master's and undergraduate students supervised by Xuan-Bach Le."
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
    --primary: #1a1a2e;
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

.students-intro {
    margin-bottom: 50px;
    animation: fadeIn 0.8s ease-out;
}

.students-intro h1 {
    font-size: 2.4em;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
}

.students-intro p {
    color: var(--text);
    margin-bottom: 10px;
}

.students-intro a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
}

.students-intro a:hover {
    border-bottom-color: var(--accent);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.student-section {
    margin-bottom: 60px;
    animation: fadeIn 0.8s ease-out;
    animation-fill-mode: both;
}

.student-section h2 {
    font-size: 1.7em;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 8px;
    padding-bottom: 12px;
    border-bottom: 3px solid var(--accent);
    display: inline-block;
    letter-spacing: -0.01em;
}

.student-group {
    margin-top: 28px;
}

.student-group-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8em;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.student-group-label::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
}

.student-count {
    background: rgba(26, 26, 46, 0.06);
    border: 1px solid rgba(26, 26, 46, 0.1);
    border-radius: 12px;
    padding: 1px 9px;
    font-size: 0.95em;
}

.student {
    margin-bottom: 24px;
    padding-left: 20px;
    border-left: 3px solid var(--border);
    transition: border-color 0.2s, transform 0.2s;
}

.student:hover {
    border-left-color: var(--accent);
    transform: translateX(3px);
}

.student-head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 12px;
}

.student-name {
    font-weight: 600;
    font-size: 1.15em;
    color: var(--primary);
}

.student-period {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8em;
    color: var(--text-light);
}

.student-affiliation {
    color: var(--text-light);
    font-size: 0.95em;
}

.student-cosupervisor {
    color: var(--text-light);
    font-size: 0.9em;
    font-style: normal;
}

.student-topic {
    margin-top: 4px;
    font-style: italic;
    color: var(--text);
}

.student-outcome {
    margin-top: 4px;
    font-size: 0.95em;
    color: var(--text-light);
}

.student-pubs {
    list-style: none;
    padding-left: 0;
    margin: 10px 0 0 0;
}

.student-pubs li {
    position: relative;
    padding-left: 18px;
    margin-bottom: 4px;
    font-size: 0.95em;
}

.student-pubs li::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: var(--accent);
}

.student-pubs a {
    color: var(--text);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
}

.student-pubs a:hover {
    color: var(--accent);
    border-bottom-color: var(--accent);
}

.student-pub-venue {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78em;
    color: var(--text-light);
    margin-left: 6px;
    white-space: nowrap;
}

.student-links {
    margin-top: 8px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.student-links a {
    display: inline-flex;
    align-items: center;
    padding: 3px 11px;
    background: #fafafa;
    border: 1px solid var(--border);
    border-radius: 6px;
    text-decoration: none;
    color: var(--text);
    font-size: 0.82em;
    font-family: 'IBM Plex Mono', monospace;
    transition: all 0.2s;
}

.student-links a:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
}

@media (max-width: 600px) {
    .student-pub-venue { white-space: normal; }
}
</style>

<div class="students-intro">
    <h1>Students</h1>
    <p>I head the <a href="https://raise-website.vercel.app/" target="_blank">RAISE lab</a> — Reasoning in Artificial Intelligence and Software Engineering — and supervise master's and undergraduate students at the Faculty of Computer Science and Engineering, Ho Chi Minh City University of Technology (HCMUT), VNU-HCM. Their work spans LLM agents and program analysis, retrieval-augmented generation, computer vision, and optimization — see the <a href="{{ site.baseurl }}">publication list</a> for the full record.</p>
    <p><strong>I am looking for motivated students to do good research</strong> on LLMs for software engineering, formal reasoning and verification, secure and trustworthy AI systems, and multilingual and responsible AI. If you want to work on hard problems carefully and see the result through to publication, please <a href="contact">get in touch</a>.</p>
</div>

{% assign masters = site.data.students | where: "level", "master" %}
{% assign undergrads = site.data.students | where: "level", "undergraduate" %}

<div class="student-section">
    <h2>Master's Students</h2>

    {% assign group = masters | where: "status", "current" %}
    {% if group.size > 0 %}
    <div class="student-group">
        <div class="student-group-label">Current <span class="student-count">{{ group.size }}</span></div>
        {% for st in group %}{% include student-card.html student=st %}{% endfor %}
    </div>
    {% endif %}

    {% assign group = masters | where: "status", "former" %}
    {% if group.size > 0 %}
    <div class="student-group">
        <div class="student-group-label">Former <span class="student-count">{{ group.size }}</span></div>
        {% for st in group %}{% include student-card.html student=st %}{% endfor %}
    </div>
    {% endif %}
</div>

<div class="student-section">
    <h2>Undergraduate Students</h2>

    {% assign group = undergrads | where: "status", "current" %}
    {% if group.size > 0 %}
    <div class="student-group">
        <div class="student-group-label">Current <span class="student-count">{{ group.size }}</span></div>
        {% for st in group %}{% include student-card.html student=st %}{% endfor %}
    </div>
    {% endif %}

    {% assign group = undergrads | where: "status", "former" %}
    {% if group.size > 0 %}
    <div class="student-group">
        <div class="student-group-label">Former <span class="student-count">{{ group.size }}</span></div>
        {% for st in group %}{% include student-card.html student=st %}{% endfor %}
    </div>
    {% endif %}
</div>
