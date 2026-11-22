/* Dently — dental clinic app (vanilla JS, localStorage persistence) */
(() => {
  "use strict";

  const STORE_KEY = "dently.v1";
  const CURRENCY = "₹";

  /* ---------------- Icons ---------------- */
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    calplus: '<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M12 13v5M9.5 15.5h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    list: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.2.6 3.5 2.9 3.5 6"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    userplus: '<circle cx="10" cy="8" r="4"/><path d="M3 21c0-4 3.1-7 7-7 1.6 0 3 .4 4.2 1.2M18 14v6M15 17h6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    tooth: '<path d="M12 5.5C10.5 4 8.8 3.5 7.2 3.6 4.6 3.8 3 6 3.2 8.8c.2 2.4 1.3 3.7 1.8 6 .5 2.5.8 6.2 2.6 6.2 1.6 0 1.6-3.6 2.4-5.4.4-.9 1.1-1.4 2-1.4s1.6.5 2 1.4c.8 1.8.8 5.4 2.4 5.4 1.8 0 2.1-3.7 2.6-6.2.5-2.3 1.6-3.6 1.8-6C21 6 19.4 3.8 16.8 3.6c-1.6-.1-3.3.4-4.8 1.9z"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    phone: '<path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.6 6.6l1.4-2.3 4.5 1.8V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    map: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4"/>',
    drop: '<path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/>',
    cake: '<path d="M4 21V13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8M2.5 21h19M4 15.5c1.3 0 1.3 1 2.7 1s1.3-1 2.6-1 1.4 1 2.7 1 1.3-1 2.7-1 1.3 1 2.6 1 1.4-1 2.7-1M12 11V7.5"/><path d="M12 3.5c.8.8 1 1.6 0 2.5-1-.9-.8-1.7 0-2.5z"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2M6 6l9-3 1.5 3"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.5 2.4 2.2 4 2.2s3-.7 4-2.2M9 9.5h.01M15 9.5h.01"/>',
    braces: '<rect x="3" y="8" width="5" height="8" rx="1.5"/><rect x="9.5" y="8" width="5" height="8" rx="1.5"/><rect x="16" y="8" width="5" height="8" rx="1.5"/><path d="M2 12h20"/>',
    implant: '<path d="M8 3h8l-1 6H9zM10 9v3l1 1v2l-1 1v2l1 1v2h2v-2l1-1v-2l-1-1v-2l1-1V9"/>',
    xray: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h8M9 12h6M10 16h4M12 6v12"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m14 6 4 4"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    stetho: '<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  };
  const ic = (n, s = 20, w = 1.8) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${P[n] || ""}</svg>`;

  /* ---------------- Helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const uid = (p) => p + Math.random().toString(36).slice(2, 9);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => iso(new Date());
  const addDays = (n, from = new Date()) => { const d = new Date(from); d.setDate(d.getDate() + n); return iso(d); };
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (s) => { const d = parse(s); return `${DOW[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`; };
  const fmtTime = (t) => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return `${h}:${pad(m)} ${ap}`; };
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
  const money = (n) => CURRENCY + Number(n || 0).toLocaleString("en-IN");
  const initials = (n) => n.replace(/^Dr\.?\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const GRADS = [
    ["#0fa3a3", "#0b8484"], ["#0b1f3a", "#1e4472"], ["#3b6fe0", "#2851b3"],
    ["#14b8a6", "#0f766e"], ["#6366f1", "#4338ca"], ["#e9a23b", "#c27b14"],
  ];
  const grad = (id) => { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; const g = GRADS[h % GRADS.length]; return `background:linear-gradient(135deg,${g[0]},${g[1]})`; };
  const avatar = (id, name, cls = "") => `<div class="avatar ${cls}" style="${grad(id)}">${esc(initials(name))}</div>`;

  /* ---------------- Data ---------------- */
  function seed() {
    const doctors = [
      { id: "d1", name: "Dr. Ananya Rao", specialization: "Orthodontist", experience: 12, fees: 800, start: "09:00", end: "17:00", days: [1, 2, 3, 4, 5, 6], rating: 4.9 },
      { id: "d2", name: "Dr. Vikram Mehta", specialization: "Endodontist", experience: 9, fees: 700, start: "10:00", end: "18:00", days: [1, 2, 3, 4, 5], rating: 4.8 },
      { id: "d3", name: "Dr. Sara Thomas", specialization: "Cosmetic Dentist", experience: 7, fees: 900, start: "11:00", end: "19:00", days: [2, 3, 4, 5, 6], rating: 4.7 },
      { id: "d4", name: "Dr. Arjun Nair", specialization: "Pediatric Dentist", experience: 6, fees: 600, start: "09:30", end: "15:30", days: [1, 3, 5, 6], rating: 4.8 },
    ];
    const patients = [
      { id: "p1", name: "Rahul Sharma", age: 29, gender: "Male", bloodGroup: "B+", phone: "+91 98765 43210", email: "rahul.sharma@mail.com", address: "Indiranagar, Bengaluru" },
      { id: "p2", name: "Priya Iyer", age: 34, gender: "Female", bloodGroup: "O+", phone: "+91 99001 22334", email: "priya.iyer@mail.com", address: "Koramangala, Bengaluru" },
      { id: "p3", name: "Karan Singh", age: 41, gender: "Male", bloodGroup: "A-", phone: "+91 90080 55667", email: "karan.s@mail.com", address: "HSR Layout, Bengaluru" },
      { id: "p4", name: "Meera Kapoor", age: 23, gender: "Female", bloodGroup: "AB+", phone: "+91 97411 88990", email: "meera.k@mail.com", address: "Whitefield, Bengaluru" },
      { id: "p5", name: "Aditya Verma", age: 9, gender: "Male", bloodGroup: "O-", phone: "+91 96320 11223", email: "verma.family@mail.com", address: "Jayanagar, Bengaluru" },
    ];
    const t = today();
    const A = (id, p, d, date, time, reason, status, reminder = true) => ({ id, patientId: p, doctorId: d, date, time, reason, status, reminder, createdAt: Date.now() });
    const appointments = [
      A("a1", "p1", "d1", addDays(2), "10:30", "Braces consultation", "confirmed"),
      A("a2", "p1", "d2", addDays(6), "15:00", "Tooth sensitivity", "pending"),
      A("a3", "p1", "d3", addDays(-20), "12:00", "Teeth whitening", "completed"),
      A("a4", "p1", "d2", addDays(-48), "11:00", "Root canal – session 1", "completed"),
      A("a5", "p2", "d1", t, "09:30", "Aligner check-up", "confirmed"),
      A("a6", "p3", "d2", t, "11:00", "Severe toothache", "pending"),
      A("a7", "p4", "d3", t, "13:30", "Smile design consult", "confirmed"),
      A("a8", "p5", "d4", t, "10:00", "Routine cleaning", "completed"),
      A("a9", "p2", "d3", t, "16:00", "Veneers follow-up", "pending"),
      A("a10", "p3", "d1", addDays(1), "12:30", "Bite correction", "pending"),
      A("a11", "p4", "d2", addDays(-1), "14:00", "Filling", "completed"),
      A("a12", "p2", "d4", addDays(-3), "10:30", "Scaling & polishing", "completed"),
      A("a13", "p5", "d1", addDays(-5), "11:30", "Space maintainer", "completed"),
    ];
    const R = (id, p, d, appt, date, diagnosis, treatment, prescription, notes) => ({ id, patientId: p, doctorId: d, appointmentId: appt, date, diagnosis, treatment, prescription, notes });
    const records = [
      R("r1", "p1", "d3", "a3", addDays(-20), "Extrinsic tooth staining", "In-office whitening (2 shades lighter)", "Sensodyne Repair toothpaste", "Avoid coffee/tea for 48 hrs."),
      R("r2", "p1", "d2", "a4", addDays(-48), "Irreversible pulpitis – #36", "Root canal, session 1 – access & cleaning", "Amoxicillin 500mg TID × 5 days; Ibuprofen 400mg SOS", "Crown recommended after RCT."),
      R("r3", "p5", "d4", "a8", t, "Mild plaque build-up", "Scaling & fluoride varnish", "Kids fluoride toothpaste", "Recall in 6 months."),
      R("r4", "p4", "d2", "a11", addDays(-1), "Dental caries – #14", "Composite filling", "—", "Review if sensitivity persists."),
      R("r5", "p2", "d4", "a12", addDays(-3), "Gingivitis", "Full mouth scaling & polishing", "Chlorhexidine mouthwash BD × 14 days", ""),
      R("r6", "p5", "d1", "a13", addDays(-5), "Premature loss of #74", "Band & loop space maintainer", "—", "Monitor eruption."),
    ];
    return { doctors, patients, appointments, records, session: null };
  }

  let db;
  try { db = JSON.parse(localStorage.getItem(STORE_KEY)) || seed(); } catch { db = seed(); }
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); } catch {} };
  save();

  const ui = {
    tab: "home",
    apptTab: "upcoming",
    filter: "all",
    q: "",
    rq: "",
    book: { doctorId: null, date: null, time: null, reason: "" },
    newDoc: { days: [1, 2, 3, 4, 5] },
  };

  const doctor = (id) => db.doctors.find((d) => d.id === id) || { id, name: "Former doctor", specialization: "—", fees: 0 };
  const patient = (id) => db.patients.find((p) => p.id === id) || { id, name: "Unknown", age: "—", bloodGroup: "—" };
  const me = () => patient(db.session?.patientId);
  const sortAsc = (a, b) => (a.date + a.time).localeCompare(b.date + b.time);
  const isUpcoming = (a) => (a.status === "pending" || a.status === "confirmed") && (a.date > today() || (a.date === today() && toMin(a.time) >= nowMin() - 30));

  /* ---------------- UI primitives ---------------- */
  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = ic("check", 18, 2.4) + esc(msg);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }
  function sheet(html) {
    $("#layer").innerHTML = `<div class="overlay" data-action="close-sheet"><div class="sheet" onclick="event.stopPropagation()"><div class="grab"></div>${html}</div></div>`;
  }
  const closeSheet = () => { $("#layer").innerHTML = ""; };
  const badge = (s) => `<span class="badge ${s}">${s}</span>`;
  const empty = (icon, title, text) => `<div class="empty"><div class="ic">${ic(icon, 28)}</div><b>${title}</b>${text}</div>`;

  function nav(items) {
    return `<nav class="bottom-nav">${items
      .map(([key, icon, label]) => `<button class="nav-btn ${ui.tab === key ? "active" : ""}" data-action="tab" data-tab="${key}"><span class="pill">${ic(icon, 21)}</span>${label}</button>`)
      .join("")}</nav>`;
  }

  /* ---------------- Login ---------------- */
  let loginRole = "patient";
  function Login() {
    return `<div class="login">
      <div class="login-art">
        <div class="brand"><div class="logo">${ic("tooth", 30, 1.9)}</div><span>Dently</span></div>
        <p>Premium dental care, beautifully simple.</p>
      </div>
      <h3>Continue as</h3>
      <button class="role ${loginRole === "patient" ? "active" : ""}" data-action="pick-role" data-role="patient">
        <div class="ic" style="background:var(--teal-soft);color:var(--teal-dark)">${ic("user", 24)}</div>
        <div class="grow"><b>Patient</b><span class="muted">Book visits, track appointments & records</span></div>
      </button>
      <button class="role ${loginRole === "doctor" ? "active" : ""}" data-action="pick-role" data-role="doctor">
        <div class="ic" style="background:#e8ecf3;color:var(--navy)">${ic("stetho", 24)}</div>
        <div class="grow"><b>Doctor · Admin</b><span class="muted">Manage clinic, doctors, patients & revenue</span></div>
      </button>
      <div style="flex:1;min-height:20px"></div>
      <button class="btn btn-primary btn-block" data-action="login">Get Started</button>
      <p class="muted tiny" style="text-align:center;margin-top:14px">Demo mode · data is stored on this device</p>
    </div>`;
  }

  /* ================= PATIENT ================= */
  const SERVICES = [
    ["sparkle", "Whitening"], ["braces", "Braces"], ["implant", "Implants"], ["tooth", "Root Canal"],
    ["smile", "Cosmetic"], ["shield", "Cleaning"], ["xray", "X-Ray"], ["users", "Kids Care"],
  ];

  function PatientHome() {
    const p = me();
    const next = db.appointments.filter((a) => a.patientId === p.id && isUpcoming(a)).sort(sortAsc)[0];
    const docs = [...db.doctors].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return `<div class="screen">
      <div class="topbar">
        <div><div class="sub">Good ${greet()},</div><h1>${esc(p.name.split(" ")[0])} 👋</h1></div>
        <button class="icon-btn" data-action="reminders">${ic("bell")}${next ? '<span class="dot"></span>' : ""}</button>
      </div>

      <div class="hero">
        <h2>Your brightest smile starts here</h2>
        <p>Expert dentists, painless treatments and modern care.</p>
        <button class="btn btn-primary btn-sm" data-action="tab" data-tab="book">${ic("calplus", 16)} Book Appointment</button>
        <div class="tooth">${ic("tooth", 74, 1.2)}</div>
      </div>

      ${next ? `<div class="section">${reminderCard(next)}</div>` : ""}

      <div class="section">
        <div class="section-head"><h3>Dental Services</h3></div>
        <div class="services">${SERVICES.map(([i, l]) => `<button class="service" data-action="tab" data-tab="book"><div class="ic">${ic(i, 22)}</div>${l}</button>`).join("")}</div>
      </div>

      <div class="section">
        <div class="section-head"><h3>Featured Doctors</h3><button class="link" data-action="tab" data-tab="book">See all</button></div>
        <div class="h-scroll">${docs.map(docCard).join("") || '<p class="muted">No doctors yet.</p>'}</div>
      </div>

      <div class="section">
        <div class="section-head"><h3>Clinic Info</h3></div>
        <div class="card">
          <div class="info-row"><div class="ic">${ic("map", 18)}</div><div><b>Dently Dental Studio</b><span class="muted">12, 100 Ft Road, Indiranagar, Bengaluru 560038</span></div></div>
          <div class="info-row"><div class="ic">${ic("clock", 18)}</div><div><b>Mon – Sat · 9:00 AM – 7:00 PM</b><span class="muted">Sunday: emergencies only</span></div></div>
          <div class="info-row"><div class="ic">${ic("phone", 18)}</div><div><b>+91 80 4000 1234</b><span class="muted">hello@dently.care</span></div></div>
        </div>
      </div>
    </div>`;
  }

  function docCard(d) {
    return `<div class="doc-card">
      <div class="row between">${avatar(d.id, d.name)}<span class="rating">${ic("star", 14)} ${(d.rating || 4.5).toFixed(1)}</span></div>
      <h4>${esc(d.name)}</h4>
      <div class="muted">${esc(d.specialization)} · ${esc(d.experience || 1)} yrs</div>
      <div class="muted tiny row" style="margin-top:6px;gap:5px">${ic("clock", 12)} ${fmtTime(d.start)} – ${fmtTime(d.end)}</div>
      <div class="doc-meta"><span class="price">${money(d.fees)}</span><button class="btn btn-ghost btn-sm" data-action="book-doc" data-id="${d.id}">Book</button></div>
    </div>`;
  }

  function reminderCard(a) {
    const d = doctor(a.doctorId);
    const days = Math.round((parse(a.date) - parse(today())) / 864e5);
    const when = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;
    return `<div class="reminder">
      <div class="ic">${ic("bell", 20)}</div>
      <div class="grow"><b>${when} · ${fmtTime(a.time)}</b><p>${esc(a.reason)} with ${esc(d.name)}</p></div>
      ${badge(a.status).replace('class="badge', 'style="background:rgba(255,255,255,.2);color:#fff" class="badge')}
    </div>`;
  }

  const greet = () => { const h = new Date().getHours(); return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening"; };

  /* ----- Book ----- */
  function slotsFor(d, date) {
    const out = [];
    for (let m = toMin(d.start); m + 30 <= toMin(d.end); m += 30) out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
    const taken = new Set(db.appointments.filter((a) => a.doctorId === d.id && a.date === date && a.status !== "cancelled").map((a) => a.time));
    return out.map((t) => ({ t, disabled: taken.has(t) || (date === today() && toMin(t) <= nowMin()) }));
  }

  function PatientBook() {
    const b = ui.book;
    const d = b.doctorId ? db.doctors.find((x) => x.id === b.doctorId) : null;
    const dates = Array.from({ length: 14 }, (_, i) => addDays(i));
    const slots = d && b.date ? slotsFor(d, b.date) : [];
    const ready = d && b.date && b.time && b.reason.trim();
    const REASONS = ["Check-up", "Cleaning", "Toothache", "Whitening", "Braces", "Root canal"];
    return `<div class="screen">
      <div class="topbar"><div><div class="sub">New visit</div><h1>Book Appointment</h1></div></div>

      <div class="field"><label>1 · Choose doctor</label>
        <div class="pick-list">${db.doctors.map((x) => `
          <button class="pick ${b.doctorId === x.id ? "active" : ""}" data-action="pick-doc" data-id="${x.id}">
            ${avatar(x.id, x.name, "sm")}
            <div class="grow"><b style="font-size:14px">${esc(x.name)}</b><div class="muted tiny">${esc(x.specialization)} · ${fmtTime(x.start)}–${fmtTime(x.end)}</div></div>
            <span class="price" style="font-size:13px">${money(x.fees)}</span>
            <span class="check">${ic("check", 13, 3)}</span>
          </button>`).join("") || '<p class="muted">No doctors available.</p>'}
        </div>
      </div>

      ${d ? `<div class="field"><label>2 · Select date</label>
        <div class="dates">${dates.map((ds) => {
          const dt = parse(ds); const off = !(d.days || [0,1,2,3,4,5,6]).includes(dt.getDay());
          return `<button class="date-chip ${b.date === ds ? "active" : ""}" data-action="pick-date" data-date="${ds}" ${off ? "disabled style='opacity:.35'" : ""}>
            <div class="d">${DOW[dt.getDay()]}</div><div class="n">${dt.getDate()}</div></button>`; }).join("")}
        </div></div>` : ""}

      ${d && b.date ? `<div class="field"><label>3 · Pick a time</label>
        ${slots.length ? `<div class="slots">${slots.map((s) => `<button class="slot ${b.time === s.t ? "active" : ""}" data-action="pick-time" data-time="${s.t}" ${s.disabled ? "disabled" : ""}>${fmtTime(s.t).replace(" ", "<br><small>").concat("</small>")}</button>`).join("")}</div>` : '<p class="muted">No slots available.</p>'}
      </div>` : ""}

      ${d && b.date && b.time ? `<div class="field"><label>4 · Reason for visit</label>
        <div class="chips" style="margin-bottom:10px">${REASONS.map((r) => `<button class="chip ${b.reason === r ? "active" : ""}" data-action="pick-reason" data-r="${r}">${r}</button>`).join("")}</div>
        <textarea class="input" id="reason" placeholder="Describe your concern…">${esc(b.reason)}</textarea>
      </div>` : ""}

      ${d && b.date && b.time ? `<div class="summary">
        <div class="row between"><span class="muted">Doctor</span><b>${esc(d.name)}</b></div>
        <div class="row between"><span class="muted">When</span><b>${fmtDate(b.date)} · ${fmtTime(b.time)}</b></div>
        <div class="row between"><span class="muted">Consultation fee</span><b>${money(d.fees)}</b></div>
      </div>
      <button class="btn btn-primary btn-block" data-action="confirm-book" ${ready ? "" : "disabled"} id="bookBtn">Confirm Booking</button>` : ""}
    </div>`;
  }

  /* ----- My Appointments ----- */
  function apptCard(a, mode) {
    const d = doctor(a.doctorId);
    const p = patient(a.patientId);
    const who = mode === "doctor" ? p : d;
    const sub = mode === "doctor" ? `${esc(p.age)} yrs · ${esc(p.bloodGroup)} · ${esc(d.name)}` : esc(d.specialization);
    let actions = "";
    if (mode === "patient" && isUpcoming(a)) {
      actions = `<div class="row between" style="margin-top:12px">
        <span class="row" style="gap:8px;font-size:13px;font-weight:600">${ic("bell", 16)} Reminder</span>
        <button class="toggle ${a.reminder ? "on" : ""}" data-action="toggle-rem" data-id="${a.id}" aria-label="Toggle reminder"></button>
      </div>
      ${a.status === "pending" ? `<div class="appt-actions"><button class="btn btn-danger btn-sm" data-action="cancel" data-id="${a.id}">Cancel</button></div>` : ""}`;
    }
    if (mode === "doctor") {
      if (a.status === "pending")
        actions = `<div class="appt-actions"><button class="btn btn-outline btn-sm" data-action="cancel" data-id="${a.id}">Decline</button><button class="btn btn-navy btn-sm" data-action="confirm" data-id="${a.id}">${ic("check", 16, 2.4)} Confirm</button></div>`;
      else if (a.status === "confirmed")
        actions = `<div class="appt-actions"><button class="btn btn-primary btn-sm" data-action="complete" data-id="${a.id}">${ic("check", 16, 2.4)} Mark Complete</button></div>`;
      else if (a.status === "completed")
        actions = `<div class="appt-actions"><button class="btn btn-ghost btn-sm" data-action="view-patient" data-id="${a.patientId}">${ic("file", 16)} View Record</button></div>`;
    }
    return `<div class="appt">
      <div class="row">${avatar(who.id, who.name, "sm")}
        <div class="grow"><b style="font-size:15px">${esc(who.name)}</b><div class="muted tiny">${sub}</div></div>${badge(a.status)}</div>
      <div class="appt-when"><span>${ic("calendar", 15)} ${fmtDate(a.date)}</span><span>${ic("clock", 15)} ${fmtTime(a.time)}</span>${mode === "doctor" ? `<span style="margin-left:auto">${money(d.fees)}</span>` : ""}</div>
      <div class="appt-reason">${esc(a.reason)}</div>
      ${actions}
    </div>`;
  }

  function recordCard(r, showPatient = false) {
    const d = doctor(r.doctorId);
    return `<div class="record">
      <div class="row between"><h4>${esc(r.diagnosis)}</h4><span class="muted tiny">${fmtDate(r.date)}</span></div>
      <div class="muted tiny" style="margin-top:2px">${showPatient ? esc(patient(r.patientId).name) + " · " : ""}${esc(d.name)}</div>
      <dl class="kv">
        <dt>Treatment</dt><dd>${esc(r.treatment || "—")}</dd>
        <dt>Prescription</dt><dd>${esc(r.prescription || "—")}</dd>
        ${r.notes ? `<dt>Notes</dt><dd>${esc(r.notes)}</dd>` : ""}
      </dl>
    </div>`;
  }

  function PatientAppointments() {
    const p = me();
    const mine = db.appointments.filter((a) => a.patientId === p.id);
    const up = mine.filter(isUpcoming).sort(sortAsc);
    const past = mine.filter((a) => !isUpcoming(a)).sort((a, b) => sortAsc(b, a));
    const recs = db.records.filter((r) => r.patientId === p.id).sort((a, b) => b.date.localeCompare(a.date));
    const next = up.find((a) => a.reminder);
    let body;
    if (ui.apptTab === "upcoming")
      body = up.length ? up.map((a) => apptCard(a, "patient")).join("") : empty("calendar", "No upcoming visits", `<div style="margin-top:14px"><button class="btn btn-primary btn-sm" data-action="tab" data-tab="book">Book now</button></div>`);
    else if (ui.apptTab === "past")
      body = past.length ? past.map((a) => apptCard(a, "patient")).join("") : empty("clock", "No history yet", "Completed visits will show here.");
    else
      body = recs.length ? recs.map((r) => recordCard(r)).join("") : empty("file", "No records yet", "Treatment records appear after your visit.");

    return `<div class="screen">
      <div class="topbar"><div><div class="sub">${up.length} upcoming</div><h1>My Appointments</h1></div>
        <button class="icon-btn" data-action="tab" data-tab="book">${ic("plus")}</button></div>
      ${next && ui.apptTab === "upcoming" ? `<div style="margin-bottom:16px">${reminderCard(next)}</div>` : ""}
      <div class="tabs">
        ${[["upcoming", "Upcoming"], ["past", "History"], ["records", "Records"]].map(([k, l]) => `<button class="tab ${ui.apptTab === k ? "active" : ""}" data-action="appt-tab" data-k="${k}">${l}</button>`).join("")}
      </div>
      <div class="stack">${body}</div>
    </div>`;
  }

  /* ----- Profile ----- */
  function PatientProfile() {
    const p = me();
    const mine = db.appointments.filter((a) => a.patientId === p.id);
    const rows = [
      ["user", "Full name", p.name], ["cake", "Age", `${p.age} years`], ["drop", "Blood group", p.bloodGroup],
      ["phone", "Phone", p.phone], ["mail", "Email", p.email], ["map", "Address", p.address],
    ];
    return `<div class="screen">
      <div class="topbar"><h1>Profile</h1><button class="icon-btn" data-action="edit-profile">${ic("edit")}</button></div>
      <div class="profile-head">
        ${avatar(p.id, p.name, "lg")}
        <h2>${esc(p.name)}</h2>
        <div class="muted">Patient ID · DN-${p.id.toUpperCase()}</div>
        <div class="stats-3">
          <div class="stat-mini"><b>${mine.length}</b><span>Visits</span></div>
          <div class="stat-mini"><b>${esc(p.bloodGroup)}</b><span>Blood</span></div>
          <div class="stat-mini"><b>${esc(p.age)}</b><span>Age</span></div>
        </div>
      </div>
      <div class="section"><div class="section-head"><h3>Personal Details</h3></div>
        <div class="card" style="padding:4px 16px">${rows.map(([i, l, v]) => `<div class="list-item"><div class="ic">${ic(i, 18)}</div><div class="grow"><div class="lbl">${l}</div><div class="val">${esc(v || "—")}</div></div></div>`).join("")}</div>
      </div>
      <div class="section"><button class="btn btn-outline btn-block" data-action="logout">${ic("logout", 18)} Log out</button></div>
    </div>`;
  }

  function editProfile() {
    const p = me();
    const BG = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    sheet(`<h3>Edit Profile</h3>
      <form id="profileForm">
        <div class="field"><label>Full name</label><input class="input" name="name" required value="${esc(p.name)}"></div>
        <div class="grid-2">
          <div class="field"><label>Age</label><input class="input" name="age" type="number" min="1" max="120" required value="${esc(p.age)}"></div>
          <div class="field"><label>Blood group</label><select class="input" name="bloodGroup">${BG.map((b) => `<option ${b === p.bloodGroup ? "selected" : ""}>${b}</option>`).join("")}</select></div>
        </div>
        <div class="field"><label>Phone</label><input class="input" name="phone" type="tel" required value="${esc(p.phone)}"></div>
        <div class="field"><label>Email</label><input class="input" name="email" type="email" value="${esc(p.email)}"></div>
        <div class="field"><label>Address</label><input class="input" name="address" value="${esc(p.address)}"></div>
        <button class="btn btn-primary btn-block">Save changes</button>
      </form>`);
    $("#profileForm").onsubmit = (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      Object.assign(p, { ...f, age: Number(f.age) });
      save(); closeSheet(); render(); toast("Profile updated");
    };
  }

  function showReminders() {
    const p = me();
    const up = db.appointments.filter((a) => a.patientId === p.id && isUpcoming(a) && a.reminder).sort(sortAsc);
    sheet(`<h3>Reminders</h3><div class="stack">${up.length ? up.map(reminderCard).join("") : empty("bell", "You're all caught up", "No upcoming reminders.")}</div>`);
  }

  /* ================= DOCTOR ================= */
  function DoctorDashboard() {
    const t = today();
    const todays = db.appointments.filter((a) => a.date === t && a.status !== "cancelled").sort(sortAsc);
    const feeOf = (a) => doctor(a.doctorId).fees || 0;
    const done = (date) => db.appointments.filter((a) => a.date === date && a.status === "completed");
    const revToday = done(t).reduce((s, a) => s + feeOf(a), 0);
    const week = Array.from({ length: 7 }, (_, i) => done(addDays(i - 6)).reduce((s, a) => s + feeOf(a), 0));
    const max = Math.max(...week, 1);
    const pending = db.appointments.filter((a) => a.status === "pending").length;
    const monthKey = t.slice(0, 7);
    const revMonth = db.appointments.filter((a) => a.status === "completed" && a.date.startsWith(monthKey)).reduce((s, a) => s + feeOf(a), 0);
    const d = new Date();
    return `<div class="screen">
      <div class="topbar">
        <div><div class="sub">${DOW[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}</div><h1>Clinic Dashboard</h1></div>
        <button class="icon-btn" data-action="logout" title="Log out">${ic("logout")}</button>
      </div>

      <div class="stats">
        <div class="stat feature">
          <div><span>Revenue today</span><b>${money(revToday)}</b><span>${money(revMonth)} this month</span></div>
          <div class="bars">${week.map((v, i) => `<i class="${i === 6 ? "on" : ""}" style="height:${Math.max(8, (v / max) * 56)}px" title="${money(v)}"></i>`).join("")}</div>
        </div>
        <div class="stat"><div class="ic" style="background:var(--teal-soft);color:var(--teal-dark)">${ic("calendar", 19)}</div><b>${todays.length}</b><span>Today's appointments</span></div>
        <div class="stat"><div class="ic" style="background:var(--blue-soft);color:var(--blue)">${ic("users", 19)}</div><b>${db.patients.length}</b><span>Total patients</span></div>
        <div class="stat"><div class="ic" style="background:var(--amber-soft);color:#b87a1c">${ic("clock", 19)}</div><b>${pending}</b><span>Pending requests</span></div>
        <div class="stat"><div class="ic" style="background:#e8ecf3;color:var(--navy)">${ic("stetho", 19)}</div><b>${db.doctors.length}</b><span>Active doctors</span></div>
      </div>

      <div class="section">
        <div class="section-head"><h3>Today's Schedule</h3><button class="link" data-action="tab" data-tab="manage">Manage</button></div>
        <div class="stack">${todays.length ? todays.map((a) => `<div class="timeline-item"><div class="time">${fmtTime(a.time).replace(" ", "<br><span class='muted tiny'>")}</span></div>${apptCard(a, "doctor")}</div>`).join("") : empty("calendar", "No appointments today", "Enjoy a quiet day.")}</div>
      </div>
    </div>`;
  }

  function DoctorManage() {
    const q = ui.q.toLowerCase();
    let list = db.appointments.filter((a) => ui.filter === "all" || a.status === ui.filter);
    if (q) list = list.filter((a) => (patient(a.patientId).name + " " + doctor(a.doctorId).name + " " + a.reason).toLowerCase().includes(q));
    const rank = { pending: 0, confirmed: 1, completed: 2, cancelled: 3 };
    list.sort((a, b) => rank[a.status] - rank[b.status] || (a.status === "completed" || a.status === "cancelled" ? sortAsc(b, a) : sortAsc(a, b)));
    const count = (s) => db.appointments.filter((a) => s === "all" || a.status === s).length;
    return `<div class="screen">
      <div class="topbar"><div><div class="sub">${count("pending")} awaiting confirmation</div><h1>Appointments</h1></div></div>
      <div class="search">${ic("search", 18)}<input id="q" placeholder="Search patient, doctor or reason" value="${esc(ui.q)}"></div>
      <div class="chips" style="margin-bottom:16px">${["all", "pending", "confirmed", "completed", "cancelled"].map((s) => `<button class="chip ${ui.filter === s ? "active" : ""}" data-action="filter" data-s="${s}" style="text-transform:capitalize">${s} · ${count(s)}</button>`).join("")}</div>
      <div class="stack">${list.length ? list.map((a) => apptCard(a, "doctor")).join("") : empty("list", "Nothing here", "No appointments match this filter.")}</div>
    </div>`;
  }

  function DoctorAdd() {
    const days = ui.newDoc.days;
    return `<div class="screen">
      <div class="topbar"><div><div class="sub">Grow your team</div><h1>Add Doctor</h1></div></div>
      <form id="docForm" class="card" style="padding:18px">
        <div class="field"><label>Full name</label><input class="input" name="name" placeholder="Dr. Jane Doe" required></div>
        <div class="field"><label>Specialization</label>
          <select class="input" name="specialization" required>
            ${["General Dentist", "Orthodontist", "Endodontist", "Periodontist", "Prosthodontist", "Oral Surgeon", "Pediatric Dentist", "Cosmetic Dentist"].map((s) => `<option>${s}</option>`).join("")}
          </select></div>
        <div class="grid-2">
          <div class="field"><label>Start time</label><input class="input" name="start" type="time" value="09:00" required></div>
          <div class="field"><label>End time</label><input class="input" name="end" type="time" value="17:00" required></div>
        </div>
        <div class="field"><label>Working days</label>
          <div class="chips">${DOW.map((d, i) => `<button type="button" class="chip ${days.includes(i) ? "active" : ""}" data-action="toggle-day" data-i="${i}">${d}</button>`).join("")}</div></div>
        <div class="grid-2">
          <div class="field"><label>Consultation fee (${CURRENCY})</label><input class="input" name="fees" type="number" min="0" step="50" placeholder="700" required></div>
          <div class="field"><label>Experience (yrs)</label><input class="input" name="experience" type="number" min="0" placeholder="5" required></div>
        </div>
        <button class="btn btn-primary btn-block">${ic("userplus", 18)} Add Doctor</button>
      </form>
      <div class="section"><div class="section-head"><h3>Our Doctors · ${db.doctors.length}</h3></div>
        <div class="stack">${db.doctors.map((d) => `<div class="card row">${avatar(d.id, d.name, "sm")}
          <div class="grow"><b style="font-size:14px">${esc(d.name)}</b><div class="muted tiny">${esc(d.specialization)} · ${fmtTime(d.start)}–${fmtTime(d.end)} · ${(d.days || []).map((x) => DOW[x][0]).join(" ")}</div></div>
          <span class="price" style="font-size:13px">${money(d.fees)}</span>
          <button class="icon-btn" style="width:34px;height:34px;box-shadow:none;background:var(--red-soft);color:var(--red)" data-action="remove-doc" data-id="${d.id}" aria-label="Remove">${ic("trash", 16)}</button>
        </div>`).join("")}</div>
      </div>
    </div>`;
  }

  function DoctorRecords() {
    const q = ui.rq.toLowerCase();
    const list = db.patients.filter((p) => !q || (p.name + p.phone + p.bloodGroup).toLowerCase().includes(q));
    return `<div class="screen">
      <div class="topbar"><div><div class="sub">${db.records.length} treatment records</div><h1>Patient Records</h1></div></div>
      <div class="search">${ic("search", 18)}<input id="rq" placeholder="Search by name, phone or blood group" value="${esc(ui.rq)}"></div>
      <div class="stack">${list.length ? list.map((p) => {
        const recs = db.records.filter((r) => r.patientId === p.id).sort((a, b) => b.date.localeCompare(a.date));
        return `<button class="card row" style="width:100%;text-align:left" data-action="view-patient" data-id="${p.id}">
          ${avatar(p.id, p.name, "sm")}
          <div class="grow"><b style="font-size:14px">${esc(p.name)}</b><div class="muted tiny">${esc(p.age)} yrs · ${esc(p.gender || "")} · ${esc(p.bloodGroup)}</div>
          <div class="muted tiny" style="margin-top:3px">${recs[0] ? "Last: " + esc(recs[0].diagnosis) : "No records yet"}</div></div>
          <span class="badge confirmed" style="text-transform:none">${recs.length} rec</span>
        </button>`; }).join("") : empty("users", "No patients found", "Try a different search.")}</div>
    </div>`;
  }

  function viewPatient(id) {
    const p = patient(id);
    const recs = db.records.filter((r) => r.patientId === id).sort((a, b) => b.date.localeCompare(a.date));
    const visits = db.appointments.filter((a) => a.patientId === id);
    sheet(`<div class="row" style="margin-bottom:16px">${avatar(p.id, p.name)}
        <div class="grow"><h3 style="margin:0">${esc(p.name)}</h3><div class="muted tiny">DN-${esc(p.id.toUpperCase())}</div></div></div>
      <div class="stats-3" style="margin:0 0 14px">
        <div class="stat-mini" style="text-align:center"><b>${esc(p.age)}</b><span>Age</span></div>
        <div class="stat-mini" style="text-align:center"><b>${esc(p.bloodGroup)}</b><span>Blood</span></div>
        <div class="stat-mini" style="text-align:center"><b>${visits.length}</b><span>Visits</span></div>
      </div>
      <div class="summary">
        <div class="row" style="gap:8px">${ic("phone", 16)}<span>${esc(p.phone)}</span></div>
        <div class="row" style="gap:8px">${ic("mail", 16)}<span>${esc(p.email || "—")}</span></div>
        <div class="row" style="gap:8px">${ic("map", 16)}<span>${esc(p.address || "—")}</span></div>
      </div>
      <div class="section-head"><h3>Treatment History</h3><button class="link" data-action="add-record" data-id="${p.id}">+ Add record</button></div>
      <div class="stack">${recs.length ? recs.map((r) => recordCard(r)).join("") : empty("file", "No records", "Add the first treatment record.")}</div>`);
  }

  function recordForm({ patientId, appointment }) {
    const p = patient(patientId);
    const docOpts = db.doctors.map((d) => `<option value="${d.id}" ${appointment?.doctorId === d.id ? "selected" : ""}>${esc(d.name)}</option>`).join("");
    sheet(`<h3>${appointment ? "Complete Appointment" : "New Record"}</h3>
      <div class="summary"><div class="row between"><span class="muted">Patient</span><b>${esc(p.name)}</b></div>
      ${appointment ? `<div class="row between"><span class="muted">Visit</span><b>${fmtDate(appointment.date)} · ${fmtTime(appointment.time)}</b></div>
      <div class="row between"><span class="muted">Fee collected</span><b>${money(doctor(appointment.doctorId).fees)}</b></div>` : ""}</div>
      <form id="recForm">
        ${appointment ? "" : `<div class="field"><label>Doctor</label><select class="input" name="doctorId">${docOpts}</select></div>`}
        <div class="field"><label>Diagnosis</label><input class="input" name="diagnosis" required placeholder="e.g. Dental caries – #26"></div>
        <div class="field"><label>Treatment</label><input class="input" name="treatment" required placeholder="e.g. Composite filling"></div>
        <div class="field"><label>Prescription</label><input class="input" name="prescription" placeholder="Medicines & dosage"></div>
        <div class="field"><label>Notes</label><textarea class="input" name="notes" placeholder="Follow-up instructions"></textarea></div>
        <button class="btn btn-primary btn-block">${ic("check", 18, 2.4)} ${appointment ? "Complete & Save Record" : "Save Record"}</button>
      </form>`);
    $("#recForm").onsubmit = (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      db.records.push({
        id: uid("r"), patientId, doctorId: appointment?.doctorId || f.doctorId, appointmentId: appointment?.id || null,
        date: appointment?.date || today(), diagnosis: f.diagnosis, treatment: f.treatment, prescription: f.prescription, notes: f.notes,
      });
      if (appointment) appointment.status = "completed";
      save(); closeSheet(); render();
      toast(appointment ? "Appointment completed" : "Record saved");
      if (!appointment) viewPatient(patientId);
    };
  }

  /* ---------------- Render ---------------- */
  const PATIENT_TABS = [["home", "home", "Home"], ["book", "calplus", "Book"], ["appts", "list", "Visits"], ["profile", "user", "Profile"]];
  const DOCTOR_TABS = [["dash", "grid", "Dashboard"], ["manage", "calendar", "Appts"], ["add", "userplus", "Doctors"], ["records", "file", "Records"]];

  function render() {
    const app = $("#app");
    const s = db.session;
    if (!s) { app.innerHTML = Login(); return; }
    let page;
    if (s.role === "patient") {
      page = { home: PatientHome, book: PatientBook, appts: PatientAppointments, profile: PatientProfile }[ui.tab] || PatientHome;
      app.innerHTML = page() + nav(PATIENT_TABS);
    } else {
      page = { dash: DoctorDashboard, manage: DoctorManage, add: DoctorAdd, records: DoctorRecords }[ui.tab] || DoctorDashboard;
      app.innerHTML = page() + nav(DOCTOR_TABS);
    }
  }

  function go(tab) { ui.tab = tab; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }

  /* ---------------- Events ---------------- */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const { action, id } = el.dataset;
    const appt = id ? db.appointments.find((a) => a.id === id) : null;
    switch (action) {
      case "pick-role": loginRole = el.dataset.role; render(); break;
      case "login":
        db.session = loginRole === "patient" ? { role: "patient", patientId: "p1" } : { role: "doctor" };
        ui.tab = loginRole === "patient" ? "home" : "dash"; save(); render(); break;
      case "logout": db.session = null; closeSheet(); save(); render(); break;
      case "tab": closeSheet(); go(el.dataset.tab); break;
      case "close-sheet": if (e.target === el) closeSheet(); break;

      case "book-doc": ui.book = { doctorId: id, date: null, time: null, reason: "" }; go("book"); break;
      case "pick-doc": ui.book = { ...ui.book, doctorId: id, date: null, time: null }; render(); break;
      case "pick-date": ui.book.date = el.dataset.date; ui.book.time = null; render(); break;
      case "pick-time": ui.book.time = el.dataset.time; render(); break;
      case "pick-reason": ui.book.reason = el.dataset.r; render(); break;
      case "confirm-book": {
        const b = ui.book;
        db.appointments.push({ id: uid("a"), patientId: db.session.patientId, doctorId: b.doctorId, date: b.date, time: b.time, reason: b.reason.trim(), status: "pending", reminder: true, createdAt: Date.now() });
        ui.book = { doctorId: null, date: null, time: null, reason: "" };
        ui.apptTab = "upcoming"; save(); go("appts"); toast("Appointment requested");
        break;
      }
      case "appt-tab": ui.apptTab = el.dataset.k; render(); break;
      case "toggle-rem": appt.reminder = !appt.reminder; save(); render(); toast(appt.reminder ? "Reminder on" : "Reminder off"); break;
      case "cancel": if (confirm("Cancel this appointment?")) { appt.status = "cancelled"; save(); render(); toast("Appointment cancelled"); } break;
      case "reminders": showReminders(); break;
      case "edit-profile": editProfile(); break;

      case "confirm": appt.status = "confirmed"; save(); render(); toast("Appointment confirmed"); break;
      case "complete": recordForm({ patientId: appt.patientId, appointment: appt }); break;
      case "filter": ui.filter = el.dataset.s; render(); break;
      case "view-patient": viewPatient(id); break;
      case "add-record": recordForm({ patientId: id }); break;
      case "toggle-day": {
        const i = Number(el.dataset.i); const d = ui.newDoc.days;
        ui.newDoc.days = d.includes(i) ? d.filter((x) => x !== i) : [...d, i].sort();
        el.classList.toggle("active"); break;
      }
      case "remove-doc": {
        const d = doctor(id);
        if (confirm(`Remove ${d.name}?`)) { db.doctors = db.doctors.filter((x) => x.id !== id); save(); render(); toast("Doctor removed"); }
        break;
      }
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "reason") {
      ui.book.reason = e.target.value;
      const btn = $("#bookBtn"); if (btn) btn.disabled = !ui.book.reason.trim();
      document.querySelectorAll('[data-action="pick-reason"]').forEach((c) => c.classList.toggle("active", c.dataset.r === ui.book.reason));
    }
    if (e.target.id === "q" || e.target.id === "rq") {
      ui[e.target.id] = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const inp = $("#" + e.target.id); inp.focus(); inp.setSelectionRange(pos, pos);
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id !== "docForm") return;
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (toMin(f.end) - toMin(f.start) < 30) return toast("End time must be after start time");
    if (!ui.newDoc.days.length) return toast("Select at least one working day");
    const name = /^dr\.?\s/i.test(f.name.trim()) ? f.name.trim() : "Dr. " + f.name.trim();
    db.doctors.push({ id: uid("d"), name, specialization: f.specialization, experience: Number(f.experience), fees: Number(f.fees), start: f.start, end: f.end, days: [...ui.newDoc.days], rating: 5.0 });
    ui.newDoc = { days: [1, 2, 3, 4, 5] };
    save(); render(); toast(`${name} added`);
  });

  render();
})();
