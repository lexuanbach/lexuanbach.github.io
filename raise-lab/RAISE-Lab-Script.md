# RAISE Lab — Speaking Script

Full narrative for the 12-slide introduction deck. Roughly 16 minutes at a normal speaking pace.

The same text is in the PowerPoint speaker notes, so you can read it from Presenter View instead of this file.

---

## Slide 1 — Title

Thanks for having me. I'm Xuan-Bach Le. I teach at Ho Chi Minh City University of Technology, and I run a small research lab there called RAISE, which stands for Reasoning in Artificial Intelligence and Software Engineering.

That is a long name for a simple idea. AI systems now produce a great deal of software. They write patches, they rank security alerts, they draft answers that people act on. Almost none of that output arrives with any evidence that it is correct. We build the layer that checks it.

I will keep this to about fifteen minutes. I want to tell you why the problem matters, walk you through the three pillars we work across, show you four projects we published this year, and then spend a little time on what we are doing right now, because that is usually where a collaboration starts.

[Delivery: warm and unhurried. Do not rush the opening; this is the only moment people decide whether to listen.]

---

## Slide 2 — Research Motivation

Let me start with the problem, because everything else follows from it.

Two years ago AI suggested things to us. Now it ships them. It writes the patch that goes into your repository. It ranks the security alerts your team works through on Monday morning. It drafts the answer somebody acts on without ever opening the source.

So ask the obvious question. How do you know it was right?

Most of the time the honest answer is a benchmark score. Something like: this model scores seventy-two percent on a public test set. That is a genuinely useful thing to know. But look at what it actually tells you. It summarises what happened, on somebody else's data, at some point in the past. It is not a reason to trust the next answer, and the next answer is the only one you actually care about.

That gap is the entire research programme. We build the things missing from that picture. Tests written specifically to break a candidate patch. Models that report their own error bars instead of a single number. Audits that say plainly where the evidence stops and the guessing begins.

[Delivery: slow down on "how do you know it was right?" and let it sit for a beat before answering.]

---

## Slide 3 — Guiding Principles

Before the research itself, three commitments. These shape how we work, and honestly they are what students actually learn in the lab.

The first is evidence over confidence. A model sounding certain proves nothing at all. Language models are fluent by construction, and fluency reads to us as confidence. So we make every claim answer to something outside the model. A test that tries to break it. A solver. A statistical check. Something with the power to say no.

The second is measurement that means something. Before we report a number we ask what it measures and whether the data supports it. An evaluation is a measuring instrument, and instruments get calibrated. A surprising amount of our work is just taking that seriously.

The third is being honest about limits. We build systems that can answer "inconclusive". That sounds like a weakness and it is the opposite. Knowing where your evidence runs out is far more useful to whoever depends on you than a confident guess. Reviewers respect it. Users can act on it.

If you take one thing from this talk, take the third one.

---

## Slide 4 — Research Programme

Here is the shape of the lab before I go into any detail.

Three pillars. Software engineering is the largest, covering agents across the development lifecycle, static analysis, and reliability. Artificial intelligence and machine learning is the methods layer underneath it, where the evaluation, uncertainty and vision work lives. Security is where both of those meet somebody who is actively trying to break them.

Fourteen active directions across the three. I will not walk through all fourteen. What I would rather you take away is that these are not three separate labs sharing a corridor. The same question runs through all of them, which is how do you know this thing is right, and the pillars are simply three places where that question gets asked.

There is a fourth strand at the bottom that does not fit the pattern as neatly. That is decision-making under uncertainty, where a forecast feeds a real optimisation step. Two examples published this year: cash management for ATM networks, and examination room allocation at our own university. It is our most applied work, and it is often the fastest way into a conversation with industry.

---

## Slide 5 — Pillar I / Software Engineering

Pillar one, and our largest. I will not read all five, so let me take two.

AI governance is the easiest to grasp without a software background. When a system accepts AI-written code, someone should be able to ask why. Not "the model was confident", but an actual record of what justified the decision. And here is the part people find surprising: a patch that passes the tests you already had has proved almost nothing, because those tests were written before the patch existed. So we generate new ones whose entire job is to break the candidate, and we let the result decide instead of the model.

Agent reliability is the second. An agent is a stochastic system. It retries, it wanders, sometimes it succeeds on the fourth attempt. So we model it as one. Fitting execution traces to a Markov chain gives you error bars and a goodness-of-fit test. A single benchmark score gives you neither.

The quantum line at the bottom usually surprises people. It is the oldest thread here, going back to POPL and ICALP. You cannot debug a quantum program by running it and printing values, so correctness has to come from the type system and the logic. That is the tradition this lab reasons from.

---

## Slide 6 — Pillar II / Artificial Intelligence and Machine Learning

Pillar two is the methods layer. These are the techniques that make the software engineering work possible.

The one I would point a general audience to is uncertainty and selective prediction. The idea is simple: some questions a system should decline to answer. Building that well is harder than it sounds. You want the refusal to rest on a guarantee that holds on a finite sample, not on a threshold somebody tuned by hand until the demo looked good. We also set those thresholds per group, because a system that becomes more cautious for only some populations has quietly traded away fairness.

The efficiency line is a good question to put to anyone running AI in production. Five small models or one large one? People argue about this constantly and almost nobody fixes the budget first. Once you compare at equal cost the answer changes, and it changes by task.

The evaluation work at the top is the one I would flag for researchers. The moment you use a model as a judge, you have turned it into a measuring instrument, and instruments need calibrating against something you can verify.

---

## Slide 7 — Pillar III / Security

Pillar three is where our work meets an actual adversary. This is the pillar that lands hardest with industry.

Start with privacy in AI agents, because it is concrete and slightly alarming. Persistent memory is the least audited part of any agent deployment. Everyone scrutinises the model and the prompt. Almost nobody audits the memory. And what one user's session writes into a shared memory, another user's session can read back. We built a benchmark and an audit suite so that this gets measured instead of argued about in a meeting.

Vulnerability detection is where I would point your security team. Every hypothesis is checked against what the repository actually shows, and then marked Verified, Rejected, or Inconclusive. Notice the philosophy. We would rather report ten real bugs than a hundred maybes. We tune for a low false-discovery rate, not maximal recall, because a ranked queue should mean what it says. Once your engineers stop trusting the queue, the tool is worthless no matter how good its recall number looks.

---

## Slide 8 — Representative Work

Four projects from this year, to make all of that concrete.

TraceToChain takes agent execution traces and turns them into an absorbing Markov chain. The interesting part is not the model, it is that the system refuses to report any number the statistics do not support. We tested it on 2,459 real agent episodes drawn from SWE-bench and tau-bench.

GraphLedger finds vulnerabilities across a whole repository and makes every finding show its work against real dependency and taint structure.

GraphMemShield is the memory leakage work I just mentioned. It measures what leaks between users in an agent's shared memory, so privacy stops being an argument and becomes a number.

LTM-RAG treats poisoning of retrieval systems as something that happens over time rather than one query at a time, which is how these attacks actually work. That reframing is worth a number: answer-level attack success falls from ninety-five percent to fourteen.

Pick whichever of these is closest to what you do and I am happy to go deeper afterwards.

---

## Slide 9 — Current Directions

This is the part I am most interested in talking about. There are no project names on this slide on purpose, because most of it is under review.

Here is the framing. The first wave of agent research asked what these systems can do. That question is largely settled; they can do a great deal. What interests us now is second-order. Not whether an agent can act, but when it should, and on whose evidence.

Five questions. When should it search? Treat retrieval as a decision with a cost, and look something up only while the next lookup is worth more than it costs. Sometimes the right move is to ask the user instead of guessing.

Whom should it trust? This is my favourite. Ten sources that copied one another are not ten pieces of evidence. So we weigh evidence by independence, and we stop untrusted content from ever carrying authority.

What should it remember? Facts expire, and memory ought to know that.

How does it survive change? Interfaces move, distributions shift, benchmarks go stale. A system should notice when it is running outside the conditions it was validated on.

And can it show its work? Provenance you could hand to an auditor.

---

## Slide 10 — Publication Record

Briefly, so you know the lab delivers.

Twenty-eight publications, nineteen of them this year. The recent work sits at A and A-star venues in software engineering and data mining: ICDM, CIKM, ASE, ISSRE.

The bottom row is the part I would draw your attention to. POPL, ICALP, ESOP, FSTTCS, NeurIPS. That is program verification, logic and complexity, and it is older work.

The point is this. The lab is new. The methods are not. Everything I have shown you today rests on roughly a decade of program verification, and that is why we reach for a proof or a statistical certificate before we reach for a leaderboard. It is an unusual foundation for a group working on LLM agents, and I think it is our main advantage.

---

## Slide 11 — Laboratory Team

A word about who actually does this work.

My own background is program verification. PhD at the National University of Singapore under Aquinas Hobor, with mentorship from Anthony Lin, then a postdoc at NTU Singapore with Luke Ong. That is where the instinct for proof and measurement comes from.

The names on the right are a selection of students with published work, and I want to be clear that it is a selection. The lab supervises others who are not on this slide.

What I would rather you notice is the range. Vulnerability detection, agent reliability, retrieval security, computer vision, optimisation. These are master's and undergraduate students, and they are first authors.

That is deliberate, and it is the promise I make when somebody joins. You get a problem of your own, you run it, and you publish it. I do not hand out subtasks. It is a slower way to run a lab and I believe it produces better researchers.

---

## Slide 12 — Collaboration and Admissions

Three ways to work with us, and then I will take questions.

If you are a student, or you teach students who might fit: I am looking for people who want to do careful work. The line at the top of this slide is the actual standard. Careful, honest about its limits, and worth publishing. Projects are open across all three pillars. Email me and tell me what you find interesting.

If you are an academic collaborator, here is my concrete ask. We need real agent traces and real static-analysis alert queues. Our methods are only worth as much as the data they meet, and that data mostly sits inside companies rather than universities. If you have it, or you know who does, that is the most useful thing you could offer us.

And for industry: reliability audits, leakage assessments, evaluation design. Measurement you could put in front of a regulator.

My email is on the slide. Thank you, and I am happy to take questions.

[Delivery: leave this slide up for the whole Q&A.]

---

*2154 words total.*