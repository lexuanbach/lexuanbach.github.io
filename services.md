---
layout: default
title: "Services — Xuan-Bach Le"
description: "Academic services of Xuan-Bach Le: program committee membership and reviewing for conferences in artificial intelligence, data mining, programming languages, and formal verification."
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

.services-intro {
    margin-bottom: 50px;
    animation: fadeIn 0.8s ease-out;
}

.services-intro h1 {
    font-size: 2.4em;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
}

.services-intro p {
    color: var(--text);
    margin-bottom: 10px;
}

.services-intro a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
}

.services-intro a:hover {
    border-bottom-color: var(--accent);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.service-section {
    margin-bottom: 60px;
    animation: fadeIn 0.8s ease-out;
    animation-fill-mode: both;
}

.service-section h2 {
    font-size: 1.7em;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 8px;
    padding-bottom: 12px;
    border-bottom: 3px solid var(--accent);
    display: inline-block;
    letter-spacing: -0.01em;
}

.service-group {
    margin-top: 28px;
}

.service-group-label {
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

.service-group-label::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
}

.service-count {
    background: rgba(26, 26, 46, 0.06);
    border: 1px solid rgba(26, 26, 46, 0.1);
    border-radius: 12px;
    padding: 1px 9px;
    font-size: 0.95em;
}

.service {
    margin-bottom: 20px;
    padding-left: 20px;
    border-left: 3px solid var(--border);
    transition: border-color 0.2s, transform 0.2s;
}

.service:hover {
    border-left-color: var(--accent);
    transform: translateX(3px);
}

.service-head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 12px;
}

.service-venue {
    font-weight: 600;
    font-size: 1.15em;
    color: var(--primary);
}

.service-role {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78em;
    color: var(--text-light);
}

.service-track {
    display: inline-block;
    padding: 1px 9px;
    background: rgba(233, 69, 96, 0.08);
    border: 1px solid rgba(233, 69, 96, 0.25);
    border-radius: 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72em;
    color: var(--accent);
    white-space: nowrap;
}

.service-name {
    color: var(--text-light);
    font-size: 0.95em;
}

.service-area {
    margin-top: 2px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75em;
    letter-spacing: 0.04em;
    color: var(--text-light);
}

@media (max-width: 600px) {
    .service-track { white-space: normal; }
}
</style>

<div class="services-intro">
    <h1>Academic Services</h1>
    <p>I serve on program committees and review for conferences in artificial intelligence, data mining, programming languages, and formal verification. Earlier reviewing was done during my PhD and postdoctoral years in programming-language theory and verification; recent service follows the shift of my <a href="{{ site.baseurl }}">research</a> toward safe and reliable AI systems.</p>
</div>

{% assign pc = site.data.services | where: "role", "pc" | sort: "year" | reverse %}
{% assign reviewers = site.data.services | where: "role", "reviewer" | sort: "year" | reverse %}
{% assign subreviewers = site.data.services | where: "role", "subreviewer" | sort: "year" | reverse %}

<div class="service-section">
    <h2>Program Committees</h2>

    {% if pc.size > 0 %}
    <div class="service-group">
        <div class="service-group-label">Program committee member <span class="service-count">{{ pc.size }}</span></div>
        {% for s in pc %}
        <div class="service">
            <div class="service-head">
                <span class="service-venue">{{ s.venue }}</span>
                {% if s.track and s.track != "" %}<span class="service-track">{{ s.track }}</span>{% endif %}
                <span class="service-role">{{ s.role_label }}</span>
            </div>
            <div class="service-name">{{ s.name }}</div>
            {% if s.area and s.area != "" %}<div class="service-area">{{ s.area }}</div>{% endif %}
        </div>
        {% endfor %}
    </div>
    {% endif %}
</div>

<div class="service-section">
    <h2>Reviewing</h2>

    {% if reviewers.size > 0 %}
    <div class="service-group">
        <div class="service-group-label">Reviewer <span class="service-count">{{ reviewers.size }}</span></div>
        {% for s in reviewers %}
        <div class="service">
            <div class="service-head">
                <span class="service-venue">{{ s.venue }}</span>
                {% if s.track and s.track != "" %}<span class="service-track">{{ s.track }}</span>{% endif %}
                <span class="service-role">{{ s.role_label }}</span>
            </div>
            <div class="service-name">{{ s.name }}</div>
            {% if s.area and s.area != "" %}<div class="service-area">{{ s.area }}</div>{% endif %}
        </div>
        {% endfor %}
    </div>
    {% endif %}

    {% if subreviewers.size > 0 %}
    <div class="service-group">
        <div class="service-group-label">Sub-reviewer and external reviewer <span class="service-count">{{ subreviewers.size }}</span></div>
        {% for s in subreviewers %}
        <div class="service">
            <div class="service-head">
                <span class="service-venue">{{ s.venue }}</span>
                {% if s.track and s.track != "" %}<span class="service-track">{{ s.track }}</span>{% endif %}
                <span class="service-role">{{ s.role_label }}</span>
            </div>
            <div class="service-name">{{ s.name }}</div>
            {% if s.area and s.area != "" %}<div class="service-area">{{ s.area }}</div>{% endif %}
        </div>
        {% endfor %}
    </div>
    {% endif %}
</div>
