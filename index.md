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
.bibtex-toggle {
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

.abstract-toggle .arrow,
.bibtex-toggle .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
}

.abstract-toggle.active .arrow,
.bibtex-toggle.active .arrow {
    transform: rotate(180deg);
}

.abstract-content,
.bibtex-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, margin-top 0.4s ease, opacity 0.4s ease;
    opacity: 0;
    margin-top: 0;
}

.abstract-content.show,
.bibtex-content.show {
    max-height: 500px;
    opacity: 1;
    margin-top: 12px;
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
}
</style>

<script>
function toggleAbstract(id) {
    const toggle = document.getElementById('toggle-' + id);
    const content = document.getElementById('abstract-' + id);
    
    toggle.classList.toggle('active');
    content.classList.toggle('show');
}

function toggleBibtex(id) {
    const toggle = document.getElementById('bibtex-toggle-' + id);
    const content = document.getElementById('bibtex-' + id);
    
    toggle.classList.toggle('active');
    content.classList.toggle('show');
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
        <p class="title-line">Lecturer, Ho Chi Minh City University of Technology, Vietnam</p>
        <p>I am a Lecturer at Ho Chi Minh City University of Technology, Vietnam. Previously, I was a postdoctoral researcher at NTU Singapore under Professor <a href="https://www3.ntu.edu.sg/home/luke.ong/" target="_blank">Luke Ong</a>. Additional information about my background can be found in my <a href="cv.pdf" target="_blank">CV</a>.</p>
        <p>I studied a Double-Degree Program in Computer Science and Pure Mathematics (<a href="courses.html" target="_blank">courses taken</a>) at NUS (2007-2012), then obtained my PhD in Computer Science from NUS (2013-2017) under <a href="https://www.comp.nus.edu.sg/~hobor/" target="_blank">Aquinas Hobor</a> with mentorship from <a href="https://anthonywlin.github.io/" target="_blank">Anthony W. Lin</a>.</p>
    </div>
</div>

## Research Interest

<p>
I am interested in both the practical applications and theoretical foundations of Computer Science. My research spans the development of logical frameworks and certified decision procedures for program verification, the study of decidability and computational complexity of underlying logics, and, more recently, the integration of formal methods with modern AI systems. In particular, I explore Retrieval-Augmented Generation (RAG), large language models (LLMs), and program synthesis for reliable software engineering, as well as reinforcement learning under formal specifications.
</p>

<div class="research-tags">
    <span class="tag">LLM agent</span>
    <span class="tag">Program Synthesis</span>
    <span class="tag">RAG</span>
    <span class="tag">Program Verification</span>
    <span class="tag">Formal Logic</span>
    <span class="tag">Computational Complexity</span>
    <span class="tag">Reinforcement Learning</span>
    <span class="tag">Quantum Programming</span>
</div>


## Publications

{% for pub in site.data.publications %}
<div class="publication{% if pub.is_thesis %} thesis-publication{% endif %}" data-number="{{ pub.number }}">
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
    </div>
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
    </div>
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
