/* ====== KONFIGURASI (edit di sini) ====== */
const CHANNEL = "https://whatsapp.com/channel/0029VbBcV5dKQuJRzdj0UX07";
const ADMINS = [{ name: "ADMIN 1", show: "085183188938", wa: "6285183188938" },
                { name: "ADMIN 2", show: "085311963767", wa: "6285311963767" }];
const GREETING = "Halo Admin ZXUAN × DIZI, saya ingin order. Boleh minta informasi produk?";
const CATALOG = [
  { cat: "AIMLOCK SERIES (VIP)", items: [["AIMLOCK V1",10],["AIMLOCK 100% V1",15],["AIMLOCK 100% V2",25],["AIMLOCK DRAG HEAD V3",25]] },
  { cat: "AIMLOCK BODY", items: [["AIMLOCK BODY V1",10],["AIMLOCK BODY V2",20]] },
  { cat: "STABILIZER", items: [["STABILIZER HEAD",15],["STABILIZER × REGE × AIMLOCK",15],["STABILIZER × FIXLAG",5]] },
  { cat: "AIMBOT", items: [["AIMBOT LEGIT 1.1",5],["AIMBOT × AIMLOCK SUPER",15],["AIMBOT 70% V3",25]] },
  { cat: "FILE ECONOMY", items: [["AIMLOCK EASY DRAG",5],["AIMBOT SUPER",5],["FFV7A NOXXA (NEW UPDATE)",10]] },
  { cat: "SUPER BRUTAL MODE", items: [["BODY HS (ANDROID ONLY)",100],["DADA HS (MIUI ONLY)",75]] },
  { cat: "HOLOGRAM SERIES", items: [["HOLOGRAM BLUE ALL BUNDLE SKIN",15]] },
  { cat: "iOS EXCLUSIVE", items: [["LOCKHEAD VIP (iOS)",25],["AIMBOT 50% VIP (iOS)",125]] },
  { cat: "GOODSETTINGS VIP", items: [["GOODSETTINGS 65%",10],["GOODSETTINGS 75%",15],["GOODSETTINGS 80%",20],["GOODSETTINGS 90%",25],["GOODSETTINGS 98%",35],["GOODSETTINGS 100%",45]] },
  { cat: "DATA SETTING VIP", items: [["DATA SETTING 70%",10],["DATA SETTING 80%",15],["DATA SETTING 90%",25],["DATA SETTING 98%",30],["DATA SETTING 100%",40]] }
];
/* ========================================= */

const $ = s => document.querySelector(s);
const WA_ICON = '<svg viewBox="0 0 24 24"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5-1.6A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.4 1.3-1.95 1.35-.5.05-1.1.07-1.8-.12a14 14 0 0 1-5.3-3.2 6.1 6.1 0 0 1-1.6-3.2c-.1-.9.4-1.7.9-2.1.2-.2.5-.2.7-.2h.5c.15 0 .35 0 .5.4l.8 1.9c.1.2.1.35 0 .5l-.4.6c-.15.15-.3.3-.15.6a7.6 7.6 0 0 0 3.5 3c.3.15.45.1.6-.1l.7-.9c.2-.25.4-.2.65-.1l1.8.9c.25.1.4.2.45.3.05.2.05.7-.2 1.4Z"/></svg>';
const waLink = (n, msg) => `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const price = k => "Rp" + k + ".000";

let activeCat = "ALL", query = "";

function renderChips() {
  const cats = ["ALL", ...CATALOG.map(c => c.cat)];
  $("#chips").innerHTML = cats.map(c => `<button class="chip${c === activeCat ? " on" : ""}" data-cat="${esc(c)}">${c === "ALL" ? "Semua" : esc(c)}</button>`).join("");
}

function renderCatalog() {
  const q = query.trim().toLowerCase();
  let html = "", total = 0;
  CATALOG.forEach(g => {
    if (activeCat !== "ALL" && g.cat !== activeCat) return;
    const items = g.items.filter(i => !q || i[0].toLowerCase().includes(q) || g.cat.toLowerCase().includes(q));
    if (!items.length) return;
    total += items.length;
    const open = (q || activeCat !== "ALL") ? " open" : "";
    html += `<details${open}><summary><span>${esc(g.cat)}<small>(${items.length})</small></span></summary><div class="items">` +
      items.map(([n, p]) => `<div class="item"><div><span>${esc(n)}</span><em>${price(p)}</em></div>
        <a class="btn sm" target="_blank" rel="noopener" href="${waLink(ADMINS[0].wa, `Halo Admin ZXUAN × DIZI, saya ingin order *${n}* (${price(p)}). Apakah masih tersedia?`)}">ORDER NOW</a></div>`).join("") +
      `</div></details>`;
  });
  $("#catalog").innerHTML = html;
  $("#empty").hidden = total > 0;
}

function toast(t) {
  const el = $("#toast"); el.textContent = t; el.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 1800);
}

async function copyNum(n) {
  try { await navigator.clipboard.writeText(n); }
  catch { const t = document.createElement("textarea"); t.value = n; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
  toast("Nomor disalin: " + n);
}

function init() {
  renderChips(); renderCatalog();
  $("#admins").innerHTML = ADMINS.map((a, i) => `<div class="card adm"><h3>${a.name}</h3><div class="num">${a.show}</div>
    <div class="row"><a class="btn sm" target="_blank" rel="noopener" href="${waLink(a.wa, GREETING)}">CHAT WHATSAPP</a>
    <button class="btn sm ghost" data-copy="${a.show}">SALIN NOMOR</button></div></div>`).join("");
  document.querySelectorAll("[data-ico]").forEach(e => e.innerHTML = WA_ICON);
  document.querySelectorAll("[data-wa]").forEach(e => e.insertAdjacentHTML("afterbegin", WA_ICON.replace("<svg", '<svg style="width:22px;height:22px;fill:#fff"')));
  const fab = $("#fab"); fab.href = waLink(ADMINS[0].wa, GREETING); fab.innerHTML = WA_ICON;
  $("#yr").textContent = new Date().getFullYear();

  $("#search").addEventListener("input", e => { query = e.target.value; renderCatalog(); });
  $("#chips").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    activeCat = b.dataset.cat; renderChips(); renderCatalog();
  });
  document.addEventListener("click", e => { const c = e.target.closest("[data-copy]"); if (c) copyNum(c.dataset.copy); });

  const burger = $("#burger"), menu = $("#menu");
  burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

  const topBtn = $("#top-btn");
  addEventListener("scroll", () => topBtn.classList.toggle("show", scrollY > 500), { passive: true });
  topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .08 }) : null;
  document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));
}

init();
addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), 400));
