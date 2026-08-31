/* AI Agents for Lecturers — workshop page engine.
   Three independent features, each a no-op if its markup is absent:
     1. copy buttons on template blocks (.tpl / .bld-preview)
     2. self-check tick lists, remembered per participant in localStorage
     3. the agent builder: form fields -> a ready-to-paste agent prompt
   All three follow the active language (see assets/i18n.js). Loaded
   alongside assets/course.js (theme + folds), never instead of it. */
(function () {
  'use strict';

  function lang() { return document.documentElement.dataset.lang === 'vi' ? 'vi' : 'en'; }

  /* ── 1. Copy to clipboard ───────────────────────────────────────────── */

  function copyText(text, btn) {
    var label = btn.textContent;           // read at click time, so the
    var vi = lang() === 'vi';              // label follows the language
    function ok() {
      btn.textContent = vi ? '✓ Đã chép' : '✓ Copied';
      btn.classList.add('done');
      setTimeout(function () { btn.textContent = label; btn.classList.remove('done'); }, 1800);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(ok, function () { fallback(text, ok); });
    } else {
      fallback(text, ok);
    }
  }

  // file:// pages have no clipboard API — participants opening the site
  // locally still need the button to work.
  function fallback(text, ok) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); ok(); } catch (e) {}
    document.body.removeChild(ta);
  }

  function initCopy() {
    document.querySelectorAll('.tpl').forEach(function (tpl) {
      var btn = tpl.querySelector('.copy-btn');
      var pre = tpl.querySelector('pre');
      if (!btn || !pre) return;
      btn.addEventListener('click', function () {
        // Only the visible language's template is copied.
        var active = tpl.querySelectorAll('pre');
        var target = pre;
        for (var i = 0; i < active.length; i++) {
          if (active[i].offsetParent !== null) { target = active[i]; break; }
        }
        copyText(target.innerText, btn);
      });
    });
  }

  /* ── 2. Self-check tick lists ───────────────────────────────────────── */

  function initTicks() {
    document.querySelectorAll('.ticklist').forEach(function (list) {
      var key = 'agentws-ticks-' + (list.id || 'default');
      var state = {};
      try { state = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}

      var boxes = list.querySelectorAll('input[type="checkbox"]');
      boxes.forEach(function (box, i) {
        var id = box.getAttribute('data-k') || String(i);
        if (state[id]) box.checked = true;
        box.addEventListener('change', function () {
          state[id] = box.checked;
          try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
        });
      });

      var reset = document.querySelector('[data-reset="' + list.id + '"]');
      if (reset) {
        reset.addEventListener('click', function () {
          boxes.forEach(function (b) { b.checked = false; });
          try { localStorage.removeItem(key); } catch (e) {}
        });
      }
    });
  }

  /* ── 3. Agent builder ───────────────────────────────────────────────── */

  // Section headings of the assembled prompt, and the red placeholders that
  // stand in for whatever the participant has not supplied yet.
  var L = {
    en: {
      you: function (role, course) { return 'You are ' + role + ' for ' + course + '.\n\n'; },
      course: '[COURSE]',
      students: 'STUDENT PROFILE',
      students_ph: '[Year level, prior knowledge, class size, language, relevant needs]',
      materials_ph: '[Paste the syllabus section, notes, or marking guidance]',
      constraints: 'CONSTRAINTS',
      constraints_ph: '[Time, class size, technology, format]',
      goal_ph: '[What the agent must produce]',
      workflow: 'WORKFLOW',
      workflow_ph: '[Numbered steps, including at least one check step]',
      output: 'OUTPUT',
      output_ph: '[The exact sections you want back]',
      guardrails: 'GUARDRAILS',
      guardrails_ph: '[What it must not do, and what it must escalate]',
      count: function (n, missing) {
        return n + ' characters · ' + (missing
          ? missing + ' section' + (missing > 1 ? 's' : '') + ' still a placeholder'
          : 'complete');
      }
    },
    vi: {
      you: function (role, course) { return 'Bạn là ' + role + ' cho môn ' + course + '.\n\n'; },
      course: '[TÊN MÔN HỌC]',
      students: 'HỒ SƠ SINH VIÊN',
      students_ph: '[Năm học, kiến thức nền, sĩ số, ngôn ngữ, nhu cầu đặc biệt]',
      materials_ph: '[Dán phần đề cương, ghi chú bài giảng, hoặc hướng dẫn chấm]',
      constraints: 'RÀNG BUỘC',
      constraints_ph: '[Thời lượng, sĩ số, thiết bị, hình thức lớp học]',
      goal_ph: '[Kết quả cụ thể mà agent phải tạo ra]',
      workflow: 'QUY TRÌNH',
      workflow_ph: '[Các bước được đánh số, trong đó có ít nhất một bước tự kiểm tra]',
      output: 'KẾT QUẢ ĐẦU RA',
      output_ph: '[Chính xác các mục bạn muốn nhận lại]',
      guardrails: 'RÀO CHẮN AN TOÀN',
      guardrails_ph: '[Điều agent không được làm, và điều phải chuyển lại cho giảng viên]',
      count: function (n, missing) {
        return n + ' ký tự · ' + (missing
          ? 'còn ' + missing + ' mục là chỗ trống'
          : 'đã đầy đủ');
      }
    }
  };

  // Defaults for each exercise, in both languages. The workflow / output /
  // guardrail blocks are pre-filled rather than hard-coded: editing them is
  // the exercise.
  var PRESETS = {
    lesson: {
      en: {
        role: 'a teaching-design agent',
        focusLabel: 'LESSON TOPIC', focus_missing: '[Lesson topic]',
        materialsLabel: 'AVAILABLE MATERIALS',
        goalLabel: 'GOAL',
        focus_ph: 'Unit testing and test-case design',
        goal_ph: 'Create a lesson that enables students to:\n1. …\n2. …\n3. …',
        constraints_ph: 'Class size: 45\nAvailable technology: projector, student laptops\nTeaching format: in-person lecture hall, fixed seating\nOther limitations: …',
        workflow: '1. Analyse the topic, student profile, and learning outcomes.\n2. Identify prerequisite knowledge.\n3. Create a timed lesson plan.\n4. Include at least one active-learning exercise.\n5. Include a formative assessment.\n6. Check the alignment among outcomes, activities, and assessment.\n7. Check whether the workload fits the available time.\n8. Revise any weak or misaligned component.',
        output: '- Learning outcomes\n- Preparation requirements\n- Timed lesson plan\n- Explanation and examples\n- Student activity\n- Formative assessment with answers\n- Outcome–activity–assessment alignment table\n- Risks, assumptions, and lecturer decisions required',
        guardrails: '- Do not invent facts that are absent from the materials.\n- Label uncertain content.\n- Do not invent citations.\n- Do not make final decisions on behalf of the lecturer.'
      },
      vi: {
        role: 'một agent thiết kế bài giảng',
        focusLabel: 'CHỦ ĐỀ BÀI HỌC', focus_missing: '[Chủ đề bài học]',
        materialsLabel: 'TÀI LIỆU SẴN CÓ',
        goalLabel: 'MỤC TIÊU',
        focus_ph: 'Kiểm thử đơn vị và thiết kế ca kiểm thử',
        goal_ph: 'Tạo một bài học giúp sinh viên có thể:\n1. …\n2. …\n3. …',
        constraints_ph: 'Sĩ số: 45\nThiết bị sẵn có: máy chiếu, laptop của sinh viên\nHình thức: giảng đường trực tiếp, bàn ghế cố định\nGiới hạn khác: …',
        workflow: '1. Phân tích chủ đề, hồ sơ sinh viên và chuẩn đầu ra.\n2. Xác định kiến thức tiên quyết.\n3. Xây dựng kế hoạch bài giảng có phân bổ thời gian.\n4. Đưa vào ít nhất một hoạt động học tập chủ động.\n5. Đưa vào một bài đánh giá quá trình.\n6. Kiểm tra sự tương thích giữa chuẩn đầu ra, hoạt động và đánh giá.\n7. Kiểm tra khối lượng công việc có vừa với thời lượng hay không.\n8. Chỉnh sửa mọi thành phần còn yếu hoặc chưa tương thích.',
        output: '- Chuẩn đầu ra của bài học\n- Yêu cầu chuẩn bị\n- Kế hoạch bài giảng theo thời gian\n- Phần giảng giải và ví dụ\n- Hoạt động cho sinh viên\n- Bài đánh giá quá trình kèm đáp án\n- Bảng đối chiếu chuẩn đầu ra – hoạt động – đánh giá\n- Rủi ro, giả định và những quyết định cần giảng viên đưa ra',
        guardrails: '- Không bịa ra dữ kiện không có trong tài liệu được cung cấp.\n- Ghi rõ những nội dung chưa chắc chắn.\n- Không bịa trích dẫn tài liệu.\n- Không quyết định thay giảng viên.'
      }
    },
    assessment: {
      en: {
        role: 'an assessment-design and feedback-support agent',
        focusLabel: 'ASSESSMENT TASK', focus_missing: '[Assessment task]',
        materialsLabel: 'REFERENCE MATERIAL',
        goalLabel: 'LEARNING OUTCOMES AND GOAL',
        focus_ph: 'Paste the assessment task here…',
        goal_ph: 'Create a transparent rubric and provide evidence-based formative feedback on the supplied student response.',
        constraints_ph: 'Response length: ~800 words\nMarking time available: 10 minutes per script\nOther limitations: …',
        workflow: '1. Analyse the assessment task and learning outcomes.\n2. Identify the knowledge and skills that should be assessed.\n3. Create an analytic rubric with four performance levels.\n4. Check whether every criterion is observable and relevant.\n5. Analyse the student response criterion by criterion.\n6. Quote or point to evidence from the response.\n7. Separate strengths, weaknesses, and recommended next actions.\n8. Identify any uncertain judgement requiring lecturer review.\n9. Do not calculate or assign the final official grade.',
        output: 'A. Assessment interpretation\nB. Analytic rubric\nC. Criterion-by-criterion analysis\nD. Two specific strengths\nE. Two priority improvements\nF. Actionable revision advice\nG. Uncertain issues requiring lecturer judgement',
        guardrails: '- Use only anonymized student work.\n- Do not infer personal characteristics.\n- Do not make disciplinary or misconduct decisions.\n- Do not assign the official grade.\n- Do not criticize the student personally.\n- Base feedback on visible evidence from the response.'
      },
      vi: {
        role: 'một agent hỗ trợ thiết kế đánh giá và phản hồi',
        focusLabel: 'NHIỆM VỤ ĐÁNH GIÁ', focus_missing: '[Nhiệm vụ đánh giá]',
        materialsLabel: 'TÀI LIỆU THAM CHIẾU',
        goalLabel: 'CHUẨN ĐẦU RA VÀ MỤC TIÊU',
        focus_ph: 'Dán đề bài đánh giá vào đây…',
        goal_ph: 'Xây dựng một rubric minh bạch và đưa ra phản hồi quá trình dựa trên bằng chứng cho bài làm được cung cấp.',
        constraints_ph: 'Độ dài bài làm: khoảng 800 từ\nThời gian chấm: 10 phút mỗi bài\nGiới hạn khác: …',
        workflow: '1. Phân tích nhiệm vụ đánh giá và chuẩn đầu ra.\n2. Xác định kiến thức và kỹ năng cần được đánh giá.\n3. Xây dựng rubric phân tích với bốn mức năng lực.\n4. Kiểm tra xem mọi tiêu chí có quan sát được và có liên quan hay không.\n5. Phân tích bài làm của sinh viên theo từng tiêu chí.\n6. Trích dẫn hoặc chỉ ra bằng chứng trong bài làm.\n7. Tách riêng điểm mạnh, điểm yếu và hành động nên làm tiếp theo.\n8. Nêu rõ những nhận định chưa chắc chắn cần giảng viên xem lại.\n9. Không tính hay đưa ra điểm số chính thức.',
        output: 'A. Cách hiểu về nhiệm vụ đánh giá\nB. Rubric phân tích\nC. Phân tích theo từng tiêu chí\nD. Hai điểm mạnh cụ thể\nE. Hai điểm cần cải thiện ưu tiên\nF. Lời khuyên chỉnh sửa có thể hành động được\nG. Những vấn đề chưa chắc chắn cần giảng viên quyết định',
        guardrails: '- Chỉ dùng bài làm đã được ẩn danh.\n- Không suy đoán đặc điểm cá nhân của người viết.\n- Không đưa ra kết luận về kỷ luật hay gian lận học thuật.\n- Không chấm điểm chính thức.\n- Không phê phán cá nhân sinh viên.\n- Chỉ phản hồi dựa trên bằng chứng nhìn thấy được trong bài làm.'
      }
    },
    support: {
      en: {
        role: 'a course-support agent',
        focusLabel: 'AUTHORIZED SOURCES', focus_missing: '[Authorized sources]',
        materialsLabel: 'ADDITIONAL COURSE INFORMATION',
        goalLabel: 'YOUR RESPONSIBILITIES',
        focus_ph: 'Attendance policy: …\nAssessment deadlines: …\nLate-submission rules: …\nConsultation hours: …',
        goal_ph: '- Answer routine questions about the course.\n- Explain policies in clear and supportive language.\n- Refer students to the relevant section of the supplied information.\n- Escalate ambiguous, personal, or exceptional cases to the lecturer.',
        constraints_ph: 'Audience: first-year students\nTone: supportive, plain language\nOther limitations: …',
        workflow: "1. Identify the student's question.\n2. Search the supplied course information for relevant evidence.\n3. If the answer is explicitly supported, respond and identify the relevant section.\n4. If the information is incomplete or ambiguous, state that clearly.\n5. If the question involves an exception, dispute, personal circumstance, grade appeal, or academic misconduct, refer it to the lecturer.\n6. Before responding, check that no unsupported policy has been invented.",
        output: '- Direct answer\n- Supporting course information\n- Required student action\n- Whether lecturer follow-up is needed',
        guardrails: '- Never invent deadlines or policies.\n- Never promise an exception.\n- Never reveal information about another student.\n- Never make decisions about grades, appeals, or misconduct.\n- State "This information is not specified in the supplied course materials" when the answer is unavailable.'
      },
      vi: {
        role: 'một agent hỗ trợ môn học',
        focusLabel: 'NGUỒN ĐƯỢC PHÉP SỬ DỤNG', focus_missing: '[Nguồn được phép sử dụng]',
        materialsLabel: 'THÔNG TIN BỔ SUNG VỀ MÔN HỌC',
        goalLabel: 'TRÁCH NHIỆM CỦA BẠN',
        focus_ph: 'Quy định điểm danh: …\nHạn nộp các bài đánh giá: …\nQuy định nộp trễ: …\nGiờ tiếp sinh viên: …',
        goal_ph: '- Trả lời các câu hỏi thường gặp về môn học.\n- Giải thích quy định bằng ngôn ngữ rõ ràng và thiện chí.\n- Chỉ cho sinh viên phần thông tin tương ứng trong tài liệu được cung cấp.\n- Chuyển các trường hợp mơ hồ, cá nhân hoặc ngoại lệ cho giảng viên.',
        constraints_ph: 'Đối tượng: sinh viên năm nhất\nGiọng điệu: thiện chí, ngôn ngữ đơn giản\nGiới hạn khác: …',
        workflow: '1. Xác định câu hỏi của sinh viên.\n2. Tìm bằng chứng liên quan trong thông tin môn học được cung cấp.\n3. Nếu câu trả lời được nêu rõ trong tài liệu, hãy trả lời và chỉ ra phần tương ứng.\n4. Nếu thông tin thiếu hoặc mơ hồ, hãy nói rõ điều đó.\n5. Nếu câu hỏi liên quan đến ngoại lệ, tranh chấp, hoàn cảnh cá nhân, phúc khảo điểm hoặc gian lận học thuật, hãy chuyển cho giảng viên.\n6. Trước khi trả lời, kiểm tra lại rằng không có quy định nào bị bịa ra.',
        output: '- Câu trả lời trực tiếp\n- Phần thông tin môn học làm căn cứ\n- Việc sinh viên cần làm tiếp theo\n- Có cần giảng viên xử lý tiếp hay không',
        guardrails: '- Tuyệt đối không bịa ra hạn nộp hay quy định.\n- Tuyệt đối không hứa hẹn một ngoại lệ.\n- Tuyệt đối không tiết lộ thông tin về sinh viên khác.\n- Tuyệt đối không quyết định về điểm số, phúc khảo hay gian lận học thuật.\n- Khi không có câu trả lời, hãy nói: "Thông tin này không được nêu trong tài liệu môn học được cung cấp."'
      }
    }
  };

  var FIELDS = ['role', 'course', 'students', 'focus', 'materials', 'constraints', 'goal', 'workflow', 'output', 'guardrails'];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function initBuilder() {
    var root = document.getElementById('builder');
    if (!root) return;

    var preset = root.getAttribute('data-preset') || 'lesson';
    var lg = lang();
    var out = root.querySelector('.bld-out');
    var count = root.querySelector('.bld-count');
    var inputs = {};
    FIELDS.forEach(function (f) { inputs[f] = root.querySelector('[name="' + f + '"]'); });

    // Each language keeps its own draft: switching to Vietnamese must not
    // overwrite the English one a participant may come back to.
    function storeKey() { return 'agentws-builder-' + preset + '-' + lg; }
    function P() { return PRESETS[preset][lg]; }

    function fill(fromPreset) {
      var p = P();
      var saved = {};
      if (!fromPreset) {
        try { saved = JSON.parse(localStorage.getItem(storeKey()) || '{}'); } catch (e) {}
      }
      FIELDS.forEach(function (f) {
        if (!inputs[f]) return;
        if (saved[f] !== undefined) inputs[f].value = saved[f];
        else if (p[f] !== undefined) inputs[f].value = p[f];
        else inputs[f].value = '';
        if (p[f + '_ph']) inputs[f].placeholder = p[f + '_ph'];
      });
    }

    // A field the participant has not filled in shows as a red placeholder in
    // the preview — the missing-context problem made visible before they run it.
    function val(f, ph) {
      var el = inputs[f];
      var v = el && el.value.trim();
      if (v) return { text: v, missing: false };
      return { text: ph, missing: true };
    }

    function assemble() {
      var p = P(), t = L[lg], parts = [];
      var role = val('role', p.role);
      var course = val('course', t.course);
      parts.push({ t: t.you(role.text, course.text), missing: course.missing });

      function block(title, f, ph) {
        var v = val(f, ph);
        parts.push({ t: title + ':\n', missing: false });
        parts.push({ t: v.text + '\n\n', missing: v.missing });
      }
      block(t.students, 'students', t.students_ph);
      block(p.focusLabel, 'focus', p.focus_missing);
      block(p.materialsLabel, 'materials', t.materials_ph);
      block(t.constraints, 'constraints', t.constraints_ph);
      block(p.goalLabel, 'goal', t.goal_ph);
      block(t.workflow, 'workflow', t.workflow_ph);
      block(t.output, 'output', t.output_ph);
      block(t.guardrails, 'guardrails', t.guardrails_ph);
      return parts;
    }

    function render() {
      var parts = assemble(), html = '', plain = '';
      parts.forEach(function (p) {
        html += p.missing ? '<span class="ph">' + esc(p.t) + '</span>' : esc(p.t);
        plain += p.t;
      });
      out.innerHTML = html;
      out.__plain = plain.trimEnd() + '\n';
      var missing = parts.filter(function (p) { return p.missing; }).length;
      count.textContent = L[lg].count(out.__plain.length, missing);
    }

    function save() {
      var data = {};
      FIELDS.forEach(function (f) { if (inputs[f]) data[f] = inputs[f].value; });
      try { localStorage.setItem(storeKey(), JSON.stringify(data)); } catch (e) {}
    }

    FIELDS.forEach(function (f) {
      if (!inputs[f]) return;
      inputs[f].addEventListener('input', function () { render(); save(); });
    });

    var copyBtn = root.querySelector('.bld-copy');
    if (copyBtn) copyBtn.addEventListener('click', function () { copyText(out.__plain, copyBtn); });

    var resetBtn = root.querySelector('.bld-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        try { localStorage.removeItem(storeKey()); } catch (e) {}
        fill(true);
        render();
      });
    }

    document.addEventListener('agentws:lang', function (e) {
      save();                       // keep the draft under the old language
      lg = e.detail === 'vi' ? 'vi' : 'en';
      fill(false);                  // then load that language's draft/defaults
      render();
    });

    fill(false);
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCopy();
    initTicks();
    initBuilder();
  });
})();
