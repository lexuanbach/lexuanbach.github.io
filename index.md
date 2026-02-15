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

/* Abstract Toggle */
.abstract-toggle {
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

.abstract-toggle .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
}

.abstract-toggle.active .arrow {
    transform: rotate(180deg);
}

.abstract-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, margin-top 0.4s ease, opacity 0.4s ease;
    opacity: 0;
    margin-top: 0;
}

.abstract-content.show {
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

<div class="publication" data-number="[11]">
    <div class="publication-authors">With Phong Chung, Kha Le-Minh & Tho Quan</div>
    <div class="publication-title">VSLIM: A Vietnamese Explicit Slot-Intent Mapping for Joint Multi-Intent Detection and Slot Filling</div>
    <div class="publication-venue">
  <strong>
    <a href="https://aciids.pwr.edu.pl/2026/" target="_blank">
      ACIIDS 2026
    </a>
  </strong>, Kaohsiung, Taiwan (April 2026)
</div>
    <div class="publication-tags">
        <span class="pub-tag nlp">NLP</span>
        <span class="pub-tag nlp">Intent Detection</span>
        <span class="pub-tag nlp">Slot Filling</span>
    </div>
    <div class="publication-links">
        <a href="/publication/ACIIDS2026b.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <span class="abstract-toggle" id="toggle-11" onclick="toggleAbstract('11')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
<div class="abstract-content" id="abstract-11">
    <div class="abstract-text">
        <strong>Abstract:</strong><br><br>
        Multi-intent detection and slot filling are fundamental tasks of natural language understanding in task-oriented dialog systems. Early approaches treated them as separate tasks, which undermines the direct connection between intents and their associated slots. This limitation becomes more pronounced when multiple intents are expressed within a single utterance.
        <br><br>
        In the Vietnamese language landscape, research on this topic remains limited, largely due to its low-resource status. To address this gap, we introduce <strong>VSLIM</strong>, a joint model designed for multi-intent detection and slot filling in Vietnamese. Inspired by the SLIM framework, VSLIM builds on its foundation with a biaffine classifier that more directly captures the relationship between intents and slots. This design allows the model to better understand and represent the dependencies across sequence labels in multi-intent settings.
        <br><br>
        Experiments on the Vietnamese <strong>PhoATIS</strong> dataset and our newly introduced <strong>VPED</strong> corpus show that VSLIM outperforms strong NLU baselines, highlighting its potential for improving Vietnamese task-oriented dialog systems. Code & Data: <a href="https://github.com/dongphong543/VSLIM" target="_blank" style="color: var(--accent);">https://github.com/dongphong543/VSLIM</a>
        <br><br>
        <strong>Keywords:</strong> Multi-intent detection, Slot filling, Vietnamese language understanding, Joint learning, Explicit mapping
    </div>
</div>
</div>

<div class="publication" data-number="[10]">
    <div class="publication-authors">With Khoa Phan & Tho Quan</div>
    <div class="publication-title">SBV-LawGraph: A Hybrid RAG Approach Integrating Knowledge Graph for the State Bank of Vietnam Legal Documents</div>
    <div class="publication-venue">
        <strong>
            <a href="https://aciids.pwr.edu.pl/2026/" target="_blank">
                ACIIDS 2026 (Oral)
            </a>
        </strong>, Kaohsiung, Taiwan (April 2026)
    </div>
    <div class="publication-tags">
        <span class="pub-tag rag">RAG</span>
        <span class="pub-tag rag">Knowledge Graph</span>
        <span class="pub-tag nlp">LLM</span>
    </div>
    <div class="publication-links">
        <a href="/publication/ACIIDS2026a.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <span class="abstract-toggle" id="toggle-10" onclick="toggleAbstract('10')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-10">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            While Retrieval-Augmented Generation (RAG) pipelines often demonstrate strong performance in general settings, they struggle with legal texts, where interpreting structure and relationships between laws is crucial. To address this, we introduce <strong>SBV-LawGraph</strong> – a dual-retrieval framework designed specifically for Vietnamese legal documents.
            <br><br>
            It combines semantic retrieval with graph-based reasoning by integrating two modules: a <strong>Legal Retrieval</strong> module using sparse–dense reranking for textual accuracy, and a <strong>Relationship Retrieval</strong> module that traverses a curated Legal Knowledge Graph to capture links such as amendments, citations, and definitions.
            <br><br>
            This design enables SBV-LawGraph to generate responses that are not only relevant but also structurally grounded, addressing limitations of standard RAG systems. Evaluations on the <strong>ALQAC2025</strong> and <strong>SBV Legal Questions</strong> datasets show it consistently outperforms strong baselines, highlighting its effectiveness for precise and explainable legal QA.
            <br><br>
            <strong>Keywords:</strong> Retrieval-Augmented Generation, Knowledge Graph, Natural Language Processing, Question-Answering Systems
        </div>
    </div>
</div>

<div class="publication" data-number="[9]">
    <div class="publication-authors">With Dominik, Leon, Alexander & Luke Ong</div>
    <div class="publication-title">
        Reinforcement Learning with LTL and Omega-Regular Objectives via Optimality-Preserving Translation to Average Rewards
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://neurips.cc/Conferences/2024" target="_blank">
                NeurIPS 2024
            </a>
        </strong>, Vancouver, Canada (December 2024)
    </div>
    <div class="publication-tags">
        <span class="pub-tag rl">Reinforcement Learning</span>
        <span class="pub-tag logic">LTL</span>
        <span class="pub-tag logic">Omega-Regular</span>
    </div>
    <div class="publication-links">
        <a href="/publication/rl24.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/irl24-poster.png" class="pub-link" target="_blank">📊 Poster</a>
        <span class="abstract-toggle" id="toggle-9" onclick="toggleAbstract('9')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-9">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Linear Temporal Logic (LTL) and, more generally, ω-regular objectives are alternatives to traditional discount-sum and average-reward objectives in reinforcement learning (RL), offering improved comprehensibility and explainability.
            <br><br>
            In this work, we study the relationship between these objectives. Our main result shows that each RL problem with ω-regular objectives can be reduced to a limit-average reward problem in an optimality-preserving manner via finite-memory reward machines.
            <br><br>
            Furthermore, we demonstrate the efficacy of this approach by showing that optimal policies for limit-average problems can be found asymptotically by solving a sequence of discount-sum problems approximately. Consequently, we resolve an open problem: optimal policies for LTL and ω-regular objectives can be learned asymptotically.
        </div>
    </div>
</div>

<div class="publication" data-number="[8]">
    <div class="publication-authors">With Shang-Wei Lin, Sun Jun & David Sanan</div>
    <div class="publication-title">
        A Quantum Interpretation of Separating Conjunction for Local Reasoning of Quantum Programs Based on Separation Logic
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://popl22.sigplan.org/" target="_blank">
                POPL 2022
            </a>
        </strong>, Philadelphia, USA (January 2022)
    </div>
    <div class="publication-tags">
        <span class="pub-tag quantum">Quantum Computing</span>
        <span class="pub-tag verification">Separation Logic</span>
        <span class="pub-tag verification">Program Verification</span>
    </div>
    <div class="publication-links">
        <a href="/publication/POPL2022.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/POPL2022_slides.pdf" class="pub-link" target="_blank">📊 Slides</a>
        <span class="abstract-toggle" id="toggle-8" onclick="toggleAbstract('8')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-8">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Quantum programs are not only complicated to design but also challenging to verify, as quantum states can have exponential size and require sophisticated mathematics to encode and manipulate. To address the state-space explosion problem in quantum reasoning, we propose a Hoare-style inference framework that supports local reasoning for quantum programs.
            <br><br>
            By providing a quantum interpretation of the separating conjunction, we integrate separation logic into our framework and enable local reasoning via a quantum frame rule analogous to the classical frame rule.
            <br><br>
            For evaluation, we apply our framework to verify representative quantum programs, including Deutsch–Jozsa’s algorithm and Grover’s algorithm.
        </div>
    </div>
</div>

<div class="publication" data-number="[7]">
    <div class="publication-authors">With David Sanan, Sun Jun & Shang-Wei Lin</div>
    <div class="publication-title">
        Automatic Verification of Multi-threaded Programs by Inference of Rely-Guarantee Specifications
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://formal-analysis.com/iceccs/2020/" target="_blank">
                ICECCS 2020
            </a>
        </strong>, Singapore (March 2021)
    </div>
    <div class="publication-tags">
        <span class="pub-tag verification">Program Verification</span>
        <span class="pub-tag verification">Concurrency</span>
        <span class="pub-tag verification">Rely-Guarantee</span>
    </div>
    <div class="publication-links">
        <a href="/publication/ICECCS2021.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/ICECCS2021_slides.pdf" class="pub-link" target="_blank">📊 Slides</a>
        <span class="abstract-toggle" id="toggle-7" onclick="toggleAbstract('7')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-7">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Rely-Guarantee is a comprehensive technique that supports compositional reasoning for concurrent programs. However, specifying the <em>Rely</em> condition—environment interference—and the <em>Guarantee</em> condition—local transformation of thread state—remains challenging, making their construction a major bottleneck in automation.
            <br><br>
            To address this problem, we propose a verification framework that constructs correctness proofs for concurrent programs by automatically inferring suitable Rely-Guarantee conditions. Our framework first builds a Hoare-style sequential proof for each thread, and then applies abstraction refinement to lift these proofs into concurrent ones with appropriate Rely-Guarantee relations.
            <br><br>
            Experimental results demonstrate that our approach efficiently proves the correctness of multi-threaded programs.
            <br><br>
            <strong>Keywords:</strong> Rely-Guarantee, Concurrency, CEGAR
        </div>
    </div>
</div>

<div class="publication" data-number="[6]">
    <div class="publication-authors">With Pablo Barceló, Chih-Duo Hong, Anthony W. Lin & Reino Niskanen (alphabetical)</div>
    <div class="publication-title">
        Monadic Decomposability of Regular Relations
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://icalp2019.upatras.gr/" target="_blank">
                ICALP 2019
            </a>
        </strong>, Patras, Greece (July 2019)
    </div>
    <div class="publication-tags">
        <span class="pub-tag theory">Automata Theory</span>
        <span class="pub-tag logic">Logic</span>
        <span class="pub-tag theory">Complexity</span>
    </div>
    <div class="publication-links">
        <a href="/publication/ICALP2019.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <span class="abstract-toggle" id="toggle-6" onclick="toggleAbstract('6')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-6">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Monadic decomposability — the ability to determine whether a formula in a given logical theory can be decomposed into a Boolean combination of monadic formulas — is a powerful tool for devising decision procedures. In this paper, we revisit a classical decision problem in automata theory: given a regular (synchronized rational) relation, determine whether it is recognizable, i.e., whether it admits a monadic decomposition as a Boolean combination of Cartesian products of regular languages.
            <br><br>
            Regular relations are highly expressive and, under suitable encodings, capture relations definable in Presburger Arithmetic. Their expressive power coincides with relations definable in universal automatic structures, equivalently those definable by finite set interpretations in WS1S (Weak Second Order Theory of One Successor).
            <br><br>
            While decidability of this problem was known (and exponential time for binary relations), its exact complexity remained open. Our main contribution is to fully settle the complexity of this decision problem by developing new techniques based on infinite Ramsey theory. We show that the problem is <strong>NLOGSPACE-complete</strong> for DFA representations and <strong>PSPACE-complete</strong> for NFA representations of regular relations.
        </div>
    </div>
</div>

<div class="publication" data-number="[5]">
    <div class="publication-authors">With Aquinas Hobor & Anthony W. Lin</div>
    <div class="publication-title">
        Complexity Analysis of Tree Share Structure
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://link.springer.com/book/10.1007/978-3-030-02768-1" target="_blank">
                APLAS 2018
            </a>
        </strong>, Wellington, New Zealand (December 2018)
    </div>
    <div class="publication-tags">
        <span class="pub-tag verification">Separation Logic</span>
        <span class="pub-tag theory">Complexity</span>
        <span class="pub-tag verification">Fractional Permissions</span>
    </div>
    <div class="publication-links">
        <a href="/publication/aplas18.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/aplas18_slides.pdf" class="pub-link" target="_blank">📊 Slides</a>
        <span class="abstract-toggle" id="toggle-5" onclick="toggleAbstract('5')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-5">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            The tree share structure proposed by Dockins et al. provides an elegant model for tracking disjoint ownership in concurrent separation logic. However, decision procedures for tree shares are difficult to implement due to the lack of a systematic theoretical study.
            <br><br>
            We show that the first-order theory of the full Boolean algebra of tree shares (with all tree-share constants) is decidable and has the same complexity as the first-order theory of Countable Atomless Boolean Algebras.
            <br><br>
            We further prove that combining this additive structure with a constant-restricted unary multiplicative “relativization” operator yields a non-elementary lower bound. We analyze the source of this lower bound and demonstrate that it arises from the interaction between the two theories, by establishing an upper bound for a generalization of the restricted multiplicative theory in isolation.
        </div>
    </div>
</div>

<div class="publication" data-number="[4]">
    <div class="publication-authors">With Aquinas Hobor</div>
    <div class="publication-title">
        Logical Reasoning for Disjoint Permissions
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://www.etaps.org/2018/esop.html" target="_blank">
                ESOP 2018
            </a>
        </strong>, Thessaloniki, Greece (April 2018)
    </div>
    <div class="publication-tags">
        <span class="pub-tag verification">Separation Logic</span>
        <span class="pub-tag verification">Fractional Permissions</span>
        <span class="pub-tag logic">Decision Procedures</span>
    </div>
    <div class="publication-links">
        <a href="/publication/esop18full.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/esop18_slides.pdf" class="pub-link" target="_blank">📊 Slides</a>
        <a href="https://github.com/lexuanbach/share-infer" class="pub-link" target="_blank">🔧 Tool</a>
        <span class="abstract-toggle" id="toggle-4" onclick="toggleAbstract('4')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-4">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Resource sharing is a fundamental phenomenon in concurrent programming, where multiple threads hold permissions to access a common resource. Verification logics must therefore capture permission ownership and transfer.
            <br><br>
            A common approach is to use rational numbers in $(0,1]$ as permissions, where 1 represents full permission and fractional values represent partial ownership. However, rational permissions are not a natural fit for separation logic, as they weaken its essential notion of disjointness.
            <br><br>
            We propose a general logical framework that supports permission reasoning in separation logic while preserving disjointness. Our framework enables sophisticated verification tasks such as induction over heap finiteness within the object logic, biabductive inference, and proofs of precision for recursive predicates within the object logic.
            <br><br>
            We introduce <strong>scaling separation algebras</strong>, a compositional extension of separation algebras, to model our logic and construct a concrete semantic model. We also developed the <strong>ShareInfer</strong> tool to benchmark our techniques.
        </div>
    </div>
</div>

<div class="publication" data-number="[3]">
    <div class="publication-authors">With Thanh-Toan Nguyen, Wei-Ngan Chin & Aquinas Hobor</div>
    <div class="publication-title">
        A Certified Decision Procedure for Tree Shares
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://link.springer.com/book/10.1007/978-3-319-68690-5" target="_blank">
                ICFEM 2017
            </a>
        </strong>, Xi'an, China (November 2017)
    </div>
    <div class="publication-tags">
        <span class="pub-tag verification">Separation Logic</span>
        <span class="pub-tag logic">Decision Procedures</span>
        <span class="pub-tag verification">Coq</span>
    </div>
    <div class="publication-links">
        <a href="/publication/icfem17full.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/icfem17_slides.pdf" class="pub-link" target="_blank">📊 Slides</a>
        <a href="https://github.com/lexuanbach/certified-permission-procedure" class="pub-link" target="_blank">🔧 Tool</a>
        <span class="abstract-toggle" id="toggle-3" onclick="toggleAbstract('3')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-3">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            [Abstract to be added]
        </div>
    </div>
</div>

<div class="publication" data-number="[2]">
    <div class="publication-authors">With Aquinas Hobor & Anthony W. Lin</div>
    <div class="publication-title">
        Decidability and Complexity of Tree Share Formulas
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://www.fsttcs.org.in/archives/2016/" target="_blank">
                FSTTCS 2016
            </a>
        </strong>, Chennai, India (December 2016)
    </div>
    <div class="publication-tags">
        <span class="pub-tag theory">Decidability</span>
        <span class="pub-tag theory">Complexity</span>
        <span class="pub-tag verification">Tree Shares</span>
    </div>
    <div class="publication-links">
        <a href="/publication/fsttcs16.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/fsttcs16_slides.pdf" class="pub-link" target="_blank">📊 Slides</a>
        <span class="abstract-toggle" id="toggle-2" onclick="toggleAbstract('2')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-2">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Fractional share models are used to reason about how multiple actors share ownership of resources. We study the decidability and complexity of reasoning over the <em>tree share</em> model of Dockins et al. using first-order logic and its fragments.
            <br><br>
            We identify a connection between the basic Boolean operations on trees — union (t), intersection (u), and complement — and countable atomless Boolean algebras. This connection allows us to establish decidability results with precise complexity bounds for both the full first-order theory and its existential fragment over the tree share model with these operations.
            <br><br>
            We further relate the multiplication operation (bowtie) on trees to the theory of word equations, deriving decidability for its existential theory and undecidability for its full first-order theory.
            <br><br>
            Finally, we show that the full first-order theory over the model combining Boolean operations with restricted multiplication (./ with constants on the right-hand side) remains decidable via an embedding into tree-automatic structures.
        </div>
    </div>
</div>

<div class="publication" data-number="[1]">
    <div class="publication-authors">With Cristian Gherghina & Aquinas Hobor</div>
    <div class="publication-title">
        Decision Procedures Over Sophisticated Fractional Permissions
    </div>
    <div class="publication-venue">
        <strong>
            <a href="https://link.springer.com/book/10.1007/978-3-642-35182-2" target="_blank">
                APLAS 2012
            </a>
        </strong>, Kyoto, Japan (December 2012)
    </div>
    <div class="publication-tags">
        <span class="pub-tag verification">Separation Logic</span>
        <span class="pub-tag logic">Decision Procedures</span>
        <span class="pub-tag verification">Fractional Permissions</span>
    </div>
    <div class="publication-links">
        <a href="/publication/aplas12.pdf" class="pub-link" target="_blank">📄 Paper</a>
        <a href="/slides/aplas12_slides.pdf" class="pub-link" target="_blank">📊 Slides</a>
        <span class="abstract-toggle" id="toggle-1" onclick="toggleAbstract('1')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-1">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Fractional permissions enable sophisticated management of resource access in both sequential and concurrent programs. Entailment checkers for separation logic formulas containing fractional permissions must therefore reason precisely about such permissions.
            <br><br>
            We show how entailment checkers for separation logic with fractional permissions can extract equation systems over fractional shares. We develop a set of decision procedures for equations arising from the sophisticated Boolean binary tree fractional permission model of Dockins et al.
            <br><br>
            We prove that our procedures are sound and complete and analyze their computational complexity. We describe our implementation, provide performance benchmarks, and detail its integration into the <strong>HIP/SLEEK</strong> verification toolset. Our results are supported by machine-checked proofs in <strong>Coq</strong>.
        </div>
    </div>
</div>

<div class="publication thesis-publication" data-number="[PhD]">
    <div class="publication-title">
        Disjoint Fractional Permissions in Verification: Applications, Systems and Theory
    </div>
    <div class="publication-venue">
        PhD Thesis, submitted September 2017
    </div>
    <div class="publication-tags">
        <span class="pub-tag verification">Separation Logic</span>
        <span class="pub-tag verification">Program Verification</span>
        <span class="pub-tag theory">Theory</span>
    </div>
    <div class="publication-links">
        <a href="/publication/thesis.pdf" class="pub-link" target="_blank">📄 Thesis</a>
        <span class="abstract-toggle" id="toggle-phd" onclick="toggleAbstract('phd')">
            📖 Abstract <span class="arrow">▼</span>
        </span>
    </div>
    <div class="abstract-content" id="abstract-phd">
        <div class="abstract-text">
            <strong>Abstract:</strong><br><br>
            Fractional permissions are widely used to reason about shared resource ownership in concurrent program verification. Traditional rational models, however, weaken the disjointness principle central to Separation Logic.
            <br><br>
            This thesis investigates the <strong>tree share</strong> model, a canonical Boolean binary tree structure equipped with a join operator (⊕) and a multiplication-like operator (./), as a principled alternative that preserves disjointness while supporting infinite split-ability and scalable permission manipulation.
            <br><br>
            The work develops three pillars. First, we embed tree shares into Separation Logic to support advanced verification tasks such as bi-abduction, inductive predicates, and precision reasoning. Second, we design sound and complete decision procedures for tree-share constraints and integrate them into the HIP/SLEEK verification toolset. Third, we establish precise decidability and complexity results for fragments of the tree-share structure, revealing connections to Boolean algebras and string concatenation.
            <br><br>
            Together, these contributions provide a rigorous theoretical and practical foundation for disjoint fractional permissions in concurrent program verification.
        </div>
    </div>
</div>
