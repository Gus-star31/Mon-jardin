// Parcours de l'app : accueil, photos, jardin, envies, analyse par Claude, puis propositions par zone.
// Le moteur (plantes, composition, plan, budget) vient de engine.js, généré à partir de l'atelier.
(() => {
const $ = id => document.getElementById(id);
const store = {
  get(k, d){ try{ const v = JSON.parse(localStorage.getItem(k)); return v ?? d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(e){ return false; } },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} }
};
// Photos en taille d'analyse et aperçus : trop lourds pour localStorage, rangés dans IndexedDB.
const idb = (() => {
  let dbp = null;
  const db = () => dbp || (dbp = new Promise((res, rej) => {
    const r = indexedDB.open("atelier-massifs", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("kv");
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const op = async (mode, fn) => {
    const d = await db();
    return new Promise((res, rej) => { const tx = d.transaction("kv", mode); const rq = fn(tx.objectStore("kv")); tx.oncomplete = () => res(rq && rq.result); tx.onerror = () => rej(tx.error); });
  };
  return {
    get: k => op("readonly", st => st.get(k)).catch(() => null),
    set: (k, v) => op("readwrite", st => st.put(v, k)).then(() => true).catch(() => false),
    delPrefix: p => op("readwrite", st => { const rq = st.openCursor(); rq.onsuccess = () => { const c = rq.result; if(!c) return; if(String(c.key).startsWith(p)) c.delete(); c.continue(); }; return null; }).catch(() => null)
  };
})();
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const MAX_PHOTOS = 4;
const DIRS = ["N","NE","E","SE","S","SO","O","NO"];
const DIR_LONG = {N:"nord",NE:"nord-est",E:"est",SE:"sud-est",S:"sud",SO:"sud-ouest",O:"ouest",NO:"nord-ouest"};
const SOL_OPT = [["inconnu","Je ne sais pas"],["a","Argileux"],["ac","Argilo-calcaire"],["c","Calcaire"],["s","Sableux"],["h","Humifère"]];
const EXPO_LBL = {s:"Plein soleil", m:"Mi-ombre", o:"Ombre"};
const EAU_LBL = {d:"Sol sec en été", f:"Sol frais", w:"Sol humide"};

let prefs = Object.assign({ville:"", sol:"inconnu", arrosage:"1", objectifs:["massif"], style:"libre"}, store.get("app-prefs", {}));
let photos = [];
let current = null;

// ---------- Navigation ----------
const SCREENS = ["s-accueil","s-photos","s-jardin","s-analyse","s-resultats"];
function show(id, push = true){
  SCREENS.forEach(s => { $(s).hidden = s !== id; });
  $("restart").hidden = id !== "s-resultats";
  window.scrollTo(0, 0);
  if(push && id !== "s-analyse"){ try{ history.pushState({s:id}, ""); }catch(e){} }
  if(id === "s-resultats") requestAnimationFrame(() => { if(typeof drawAll === "function") drawAll(); });
}
window.addEventListener("popstate", e => {
  const s = e.state && e.state.s;
  if(s && SCREENS.includes(s) && s !== "s-analyse"){
    if(s === "s-resultats" && !current) return show("s-accueil", false);
    show(s, false);
  }
});
document.addEventListener("click", e => {
  const b = e.target.closest("[data-go]"); if(b) show(b.dataset.go);
});

// ---------- Pastilles de choix ----------
function appChips(boxId, options, multi, get, set){
  const box = $(boxId);
  const draw = () => {
    const val = get();
    box.innerHTML = options.map(([v, l]) => {
      const id = `ap-${boxId}-${v}`;
      const on = multi ? val.includes(v) : val === v;
      return `<label class="chip" for="${id}"><input id="${id}" type="${multi?"checkbox":"radio"}" name="${boxId}" value="${v}" ${on?"checked":""}><span>${esc(l)}</span></label>`;
    }).join("");
  };
  box.addEventListener("change", () => {
    if(multi){
      const vals = [...box.querySelectorAll("input:checked")].map(i => i.value);
      if(!vals.length){ draw(); return; }
      set(vals);
    } else set(box.querySelector("input:checked").value);
    savePrefs(); draw(); afterChip(boxId);
  });
  draw();
}
function savePrefs(){ store.set("app-prefs", prefs); }
function afterChip(boxId){ if(boxId === "a-style") $("a-style-hint").textContent = STYLES[prefs.style].hint; }

appChips("a-sol", SOL_OPT, false, () => prefs.sol, v => prefs.sol = v);
appChips("a-arro", OPT.arro, false, () => prefs.arrosage, v => prefs.arrosage = v);
appChips("a-obj", OPT.obj, true, () => prefs.objectifs, v => prefs.objectifs = v);
appChips("a-style", OPT.style, false, () => prefs.style, v => prefs.style = v);
afterChip("a-style");
$("ville").value = prefs.ville;
$("ville").addEventListener("input", e => { prefs.ville = e.target.value; savePrefs(); });

// ---------- Accueil et code d'accès ----------
$("code").value = store.get("app-code", "");
function codeErr(msg){ $("code-err").textContent = msg; $("code-err").hidden = !msg; }
$("start").addEventListener("click", async () => {
  const code = $("code").value.trim();
  if(!code){ codeErr("Saisis le code d'accès pour lancer une analyse. Tu peux aussi voir un exemple sans code."); $("code").focus(); return; }
  const btn = $("start"); btn.disabled = true; btn.textContent = "Vérification…";
  try{
    const r = await fetch("/api/analyse", {method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify({code, check:true})});
    const d = await r.json().catch(() => ({}));
    if(r.status === 401){ codeErr("Ce code ne fonctionne pas. Vérifie-le auprès de la personne qui te l'a donné."); return; }
    if(!r.ok){ codeErr(d.erreur || "Le service ne répond pas. Réessaie dans quelques minutes."); return; }
    store.set("app-code", code); codeErr(""); show("s-photos");
  }catch(e){
    codeErr("Pas de connexion. Vérifie ton réseau puis réessaie.");
  }finally{ btn.disabled = false; btn.textContent = "Commencer"; }
});
$("demo").addEventListener("click", () => openRecord(DEMO));
$("restart").addEventListener("click", () => { photos = []; renderPhotos(); show(store.get("app-code","") ? "s-photos" : "s-accueil"); });

function renderLast(){
  const list = store.get("app-analyses", []);
  const box = $("last");
  box.hidden = !list.length;
  if(!list.length) return;
  box.innerHTML = `<h2>Tes analyses</h2><ul>${list.map((r, i) => `<li><span>${esc(r.ville || "Mon jardin")}<small>${new Date(r.date).toLocaleDateString("fr-FR",{day:"numeric",month:"long"})} · ${r.analysis.zones.length} zones</small></span>
    <span class="ph-row"><button class="small" type="button" data-open="${i}">Ouvrir</button><button class="small" type="button" data-del="${i}" aria-label="Supprimer cette analyse">×</button></span></li>`).join("")}</ul>`;
}
$("last").addEventListener("click", e => {
  const list = store.get("app-analyses", []);
  const o = e.target.closest("[data-open]"), d = e.target.closest("[data-del]");
  if(o) openRecord(list[+o.dataset.open]);
  if(d){ const r = list.splice(+d.dataset.del, 1)[0]; store.set("app-analyses", list); if(r){ store.del("app-zones-" + r.id); idb.delPrefix("photo-" + r.id + "-"); idb.delPrefix("apercu-" + r.id + "-"); } renderLast(); }
});
renderLast();

// ---------- Photos ----------
function phErr(msg){ $("ph-err").textContent = msg; $("ph-err").hidden = !msg; }
async function loadImage(file){
  try{ return await createImageBitmap(file, {imageOrientation:"from-image"}); }catch(e){}
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => res(im); im.onerror = () => rej(new Error("format")); im.src = url;
  });
}
function toJpeg(img, max, q){
  const w = img.width || img.naturalWidth, h = img.height || img.naturalHeight;
  const k = Math.min(1, max / Math.max(w, h));
  const c = document.createElement("canvas"); c.width = Math.round(w*k); c.height = Math.round(h*k);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", q);
}
$("ph-input").addEventListener("change", async e => {
  const files = [...e.target.files]; e.target.value = "";
  phErr("");
  const room = MAX_PHOTOS - photos.length;
  if(files.length > room) phErr(`${MAX_PHOTOS} photos au maximum : seules les ${room} premières ont été ajoutées.`);
  for(const f of files.slice(0, room)){
    try{
      const img = await loadImage(f);
      const w0 = img.width || img.naturalWidth, h0 = img.height || img.naturalHeight, k = Math.min(1, 1024 / Math.max(w0, h0));
      photos.push({id: Math.random().toString(36).slice(2), data: toJpeg(img, 1024, .78).split(",")[1], w: Math.round(w0*k), h: Math.round(h0*k), thumb: toJpeg(img, 360, .7), direction: null, note: ""});
    }catch(err){
      phErr("Une photo n'a pas pu être lue. Choisis une photo au format JPEG ou PNG, ou fais une capture d'écran de la photo.");
    }
  }
  renderPhotos();
});
function renderPhotos(){
  const canMeasure = "DeviceOrientationEvent" in window;
  $("ph-list").innerHTML = photos.map((p, i) => `<article class="ph">
    <div class="ph-top"><img src="${p.thumb}" alt="Photo ${i+1} de ton jardin">
      <div class="ph-side">
        <label class="ph-q" for="dir-${i}">Tu regardes vers</label>
        <select id="dir-${i}" data-dir-sel="${i}">
          <option value="" ${!p.direction?"selected":""}>Je ne sais pas</option>
          ${DIRS.map(d => `<option value="${d}" ${p.direction===d?"selected":""}>${DIR_LONG[d].charAt(0).toUpperCase()+DIR_LONG[d].slice(1)}</option>`).join("")}
        </select>
        ${canMeasure ? `<button class="linkish" type="button" data-measure="${i}">Mesurer avec la boussole</button>` : ""}
        <span class="ph-live" id="live-${i}"></span>
      </div>
      <button class="ph-del" type="button" data-del-ph="${i}" aria-label="Retirer la photo ${i+1}">×</button>
    </div>
    ${p.note || p.showNote ? `<textarea id="note-${i}" data-note="${i}" maxlength="300" aria-label="Précision sur la photo ${i+1}" placeholder="Par exemple : je veux cacher le balcon du voisin">${esc(p.note)}</textarea>`
      : `<button class="linkish" type="button" data-add-note="${i}">Ajouter une précision</button>`}
  </article>`).join("");
  $("ph-add").hidden = photos.length >= MAX_PHOTOS;
  $("ph-add").querySelector("span").textContent = photos.length ? "Ajouter une autre photo" : "Prendre ou choisir des photos";
  $("to-jardin").disabled = !photos.length;
}
$("ph-list").addEventListener("click", e => {
  const n = e.target.closest("[data-add-note]");
  if(n){ photos[+n.dataset.addNote].showNote = true; renderPhotos(); const t = $("note-" + n.dataset.addNote); if(t) t.focus(); return; }
  const x = e.target.closest("[data-del-ph]");
  if(x){ photos.splice(+x.dataset.delPh, 1); renderPhotos(); return; }
  const m = e.target.closest("[data-measure]");
  if(m) measure(+m.dataset.measure, m);
});
$("ph-list").addEventListener("change", e => {
  const sel = e.target.closest("[data-dir-sel]"); if(sel) photos[+sel.dataset.dirSel].direction = sel.value || null;
});
$("ph-list").addEventListener("input", e => {
  const t = e.target.closest("[data-note]"); if(t) photos[+t.dataset.note].note = t.value;
});

// Boussole : téléphone à plat, le haut tourné vers la zone photographiée.
async function measure(i, btn){
  const live = $("live-" + i);
  try{
    if(typeof DeviceOrientationEvent.requestPermission === "function"){
      const r = await DeviceOrientationEvent.requestPermission();
      if(r !== "granted"){ live.textContent = "Accès à la boussole refusé : choisis la direction à la main."; return; }
    }
  }catch(e){ live.textContent = "Boussole indisponible : choisis la direction à la main."; return; }
  live.textContent = "Place-toi là où tu as pris la photo, téléphone à plat, le haut tourné vers le coin photographié.";
  let dir = null, got = false;
  const onOri = ev => {
    let h = typeof ev.webkitCompassHeading === "number" ? ev.webkitCompassHeading : (ev.absolute && ev.alpha != null ? (360 - ev.alpha) % 360 : null);
    if(h == null) return;
    got = true; dir = DIRS[Math.round(h / 45) % 8];
    live.textContent = `Direction mesurée : ${DIR_LONG[dir]} (${Math.round(h)}°)`;
  };
  window.addEventListener("deviceorientationabsolute", onOri);
  window.addEventListener("deviceorientation", onOri);
  btn.textContent = "Valider cette direction";
  const stop = () => { window.removeEventListener("deviceorientationabsolute", onOri); window.removeEventListener("deviceorientation", onOri); };
  setTimeout(() => { if(!got){ stop(); live.textContent = "Pas de boussole disponible sur cet appareil : choisis la direction à la main."; btn.textContent = "Mesurer avec la boussole"; } }, 4000);
  btn.addEventListener("click", function once(ev){
    ev.stopPropagation(); btn.removeEventListener("click", once, true); stop();
    if(dir){ photos[i].direction = dir; renderPhotos(); }
  }, {capture:true, once:true});
}

$("to-jardin").addEventListener("click", () => show("s-jardin"));
$("ville").addEventListener("input", () => { $("ville-err").hidden = true; $("ville").removeAttribute("aria-invalid"); });

// ---------- Analyse ----------
const STEPS = ["Lecture des photos…","Repérage des zones à planter…","Calcul de l'exposition de chaque zone…","Estimation de la place disponible…","Préparation des propositions…"];
function anErr(msg){ $("an-err").textContent = msg; $("an-err").hidden = !msg; }
$("analyse").addEventListener("click", async () => {
  anErr("");
  if(!$("ville").value.trim()){ $("ville-err").hidden = false; $("ville").setAttribute("aria-invalid","true"); $("ville").focus(); return; }
  const code = store.get("app-code", "");
  if(!code){ show("s-accueil"); codeErr("Saisis le code d'accès pour lancer l'analyse."); return; }
  show("s-analyse");
  let k = 0; $("an-step").textContent = STEPS[0];
  const tick = setInterval(() => { k = Math.min(k + 1, STEPS.length - 1); $("an-step").textContent = STEPS[k]; }, 7000);
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 90000);
  try{
    const r = await fetch("/api/analyse", {method:"POST", headers:{"content-type":"application/json"}, signal: ctrl.signal,
      body: JSON.stringify({code, ville: prefs.ville, sol: prefs.sol, arrosage: prefs.arrosage, objectifs: prefs.objectifs, style: prefs.style,
        photos: photos.map(p => ({data: p.data, direction: p.direction || null, note: p.note}))})});
    const raw = await r.text(); let d = {}; try{ d = JSON.parse(raw); }catch(e){}
    if(r.status === 401){ show("s-accueil"); codeErr("Ce code ne fonctionne plus. Vérifie-le auprès de la personne qui te l'a donné."); return; }
    if(!r.ok){
      // Erreurs renvoyées par Vercel lui-même (délai dépassé, envoi trop lourd) : pas de JSON de notre fonction.
      let msg = d.erreur;
      if(!msg){
        if(r.status === 504 || /TIMEOUT/i.test(raw)) msg = "L'analyse a pris trop de temps côté serveur. Réessaie avec 2 ou 3 photos.";
        else if(r.status === 413 || /PAYLOAD_TOO_LARGE/i.test(raw)) msg = "Les photos sont trop lourdes pour être envoyées ensemble. Réessaie avec moins de photos.";
        else msg = `L'analyse a échoué (erreur ${r.status}).`;
      }
      const code = (raw.match(/[A-Z_]{8,}/) || [""])[0];
      show("s-jardin"); anErr(msg + (d.detail ? ` Détail technique : ${d.detail}` : code ? ` Code Vercel : ${code}` : ""));
      return;
    }
    const rec = {id: Date.now().toString(36), date: new Date().toISOString(), ville: prefs.ville.trim(), prefs: {...prefs}, analysis: d, thumbs: photos.map(p => p.thumb)};
    const list = store.get("app-analyses", []);
    list.unshift(rec);
    while(list.length > 3){ const old = list.pop(); store.del("app-zones-" + old.id); idb.delPrefix("photo-" + old.id + "-"); idb.delPrefix("apercu-" + old.id + "-"); }
    await Promise.all(photos.map((p, i) => idb.set(`photo-${rec.id}-${i}`, {data: p.data, w: p.w, h: p.h})));
    if(!store.set("app-analyses", list)){ list.forEach(x => { if(x !== rec) x.thumbs = []; }); store.set("app-analyses", list); }
    renderLast();
    openRecord(rec);
  }catch(e){
    show("s-jardin");
    anErr(e.name === "AbortError" ? "L'analyse prend trop de temps. Réessaie avec moins de photos." : "Pas de connexion. Vérifie ton réseau puis réessaie.");
  }finally{ clearInterval(tick); clearTimeout(to); }
});

// ---------- Résultats ----------
function zoneState(z, rec){
  const p = rec.prefs, a = rec.analysis;
  const obj = z.objectifs && z.objectifs.length ? z.objectifs : ["massif"];
  return {obj, haut: z.hauteur_masquer || "2", vite: obj.includes("isoler") ? "rapide" : "tout", prof: z.profondeur, expo: z.exposition,
    sol: p.sol && p.sol !== "inconnu" ? p.sol : a.sol.type, eau: z.humidite, clim: a.climat.zone, taille: z.longueur,
    pal: "all", types: BASE_TYPES, arro: p.arrosage || "1", style: p.style || "libre", age: "3"};
}
function lbl2(key, v){ const o = OPT[key] && OPT[key].find(x => x[0] === v); return o ? o[1] : v; }
function reportHTML(rec){
  const a = rec.analysis, solGuess = !rec.prefs.sol || rec.prefs.sol === "inconnu";
  return `${rec.demo ? `<span class="demo-flag">Exemple</span>` : ""}
    <h1>${rec.ville ? `Ton jardin à ${esc(rec.ville)}` : "Ton jardin"}</h1>
    <p>${esc(a.resume)}</p>
    <div class="facts">
      <div class="fact"><small>Climat</small>${esc(lbl2("clim", a.climat.zone))}</div>
      <div class="fact"><small>Sol${solGuess ? " (estimé)" : ""}</small>${esc(lbl2("sol", solGuess ? a.sol.type : rec.prefs.sol))}</div>
      <div class="fact"><small>Arrosage en été</small>${esc(lbl2("arro", rec.prefs.arrosage || "1"))}</div>
      <div class="fact"><small>Style</small>${esc(lbl2("style", rec.prefs.style || "libre"))}</div>
    </div>
    ${a.climat.explication || a.sol.explication ? `<p class="hint">${esc([a.climat.explication, a.sol.explication].filter(Boolean).join(" "))}</p>` : ""}
    ${a.observations && a.observations.length ? `<ul>${a.observations.map(o => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}`;
}
window.renderZoneDetail = function(z){
  const box = $("znote");
  if(!z){ box.innerHTML = `<div class="zinfo"><p>Réglage libre : ajuste les critères à ta guise. Choisis une zone pour retrouver sa proposition.</p></div>`; return; }
  const d = z.z || {};
  const tags = [d.orientation ? `Tournée vers le ${DIR_LONG[d.orientation]}` : "", EXPO_LBL[d.exposition], EAU_LBL[d.humidite],
    d.profondeur ? `${(+d.profondeur/100).toLocaleString("fr-FR")} m de profondeur` : "", d.hauteur_masquer ? `Écran de ${d.hauteur_masquer} m${d.hauteur_masquer==="4"?" et plus":""}` : ""].filter(Boolean);
  box.innerHTML = `<div class="apercu">
      <div class="ba" id="ba">${z.thumb ? `<img class="ba-before" id="ba-before" src="${z.thumb}" alt="Ta photo de la zone ${esc(z.label)}">` : `<div class="ba-empty">Pas de photo pour cette zone</div>`}</div>
      <div class="ap-actions" id="ap-actions"></div>
      <p class="hint ap-note" id="ap-note"></p>
    </div>
    <div class="zinfo"><p>${esc(z.note)}</p>
      <div class="ztags">${tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
      ${d.ensoleillement ? `<p class="hint">${esc(d.ensoleillement)}</p>` : ""}
      ${d.a_garder && d.a_garder.length ? `<p><b>À garder :</b> ${esc(d.a_garder.join(", "))}</p>` : ""}
      ${d.attention && d.attention.length ? `<p class="warnl"><b>Avant de planter :</b> ${esc(d.attention.join(" "))}</p>` : ""}
    </div>`;
};
// ---------- Aperçu sur la photo (Gemini) ----------
let apTok = 0, apTimer = null, apBusy = false;
const AP_NOTE = "Image créée par IA (Gemini, de Google) à partir de ta photo et des plantes proposées : l'aspect réel variera. Ta photo est envoyée à Google le temps de créer l'image.";
function curZoneObj(){ return ZONES.find(z => z.id === curZone); }
function sigOf(){ return combo.map(c => c.plant.nom).sort().join("|") + "#" + state.age + "#" + state.prof; }
function scheduleApercu(){ clearTimeout(apTimer); apTimer = setTimeout(refreshApercu, 60); }
function baHTML(before, after){
  return `<img class="ba-before" src="${before}" alt="Ta photo avant les plantations">
    <img class="ba-after" src="${after}" alt="Aperçu de la zone plantée">
    <span class="ba-line" aria-hidden="true"></span>
    <span class="ba-lbl l">Avant</span><span class="ba-lbl r">Après</span>
    <input class="ba-range" type="range" min="0" max="100" value="12" aria-label="Faire glisser pour comparer avant et après">`;
}
async function refreshApercu(){
  const tk = ++apTok, z = curZoneObj(), rec = current;
  const actions = $("ap-actions"), note = $("ap-note"), ba = $("ba");
  if(!z || !rec || !actions || apBusy) return;
  const ph = z.z ? await idb.get(`photo-${rec.id}-${(z.z.photo || 1) - 1}`) : null;
  const cached = await idb.get(`apercu-${rec.id}-${z.id}`);
  if(tk !== apTok || !$("ap-actions")) return;
  const before = ph ? `data:image/jpeg;base64,${ph.data}` : z.thumb;
  if(cached && before){
    if(!ba.classList.contains("has-after") || ba.dataset.img !== cached.date){
      ba.innerHTML = baHTML(before, cached.image); ba.classList.add("has-after"); ba.dataset.img = cached.date; ba.style.setProperty("--pos", "12%");
    }
    const stale = cached.sig !== sigOf();
    actions.innerHTML = ph ? (stale
      ? `<button class="primary" type="button" id="ap-go">Mettre à jour l'image avec ces plantes</button>`
      : `<button class="ghost small" type="button" id="ap-go">Créer une autre version</button>`) : "";
    note.textContent = stale ? "Les plantes ont changé depuis cette image." : AP_NOTE;
    note.classList.remove("err");
  } else {
    if(ph && $("ba-before")) $("ba-before").src = before;
    actions.innerHTML = ph ? `<button class="primary" type="button" id="ap-go">Voir dans mon jardin</button>` : "";
    note.classList.remove("err");
    note.textContent = ph ? AP_NOTE : rec.demo ? "Dans l'exemple, il n'y a pas de photo : l'aperçu sur photo est disponible pour ton propre jardin." : "Refais une analyse pour voir les plantations dessinées sur tes photos.";
  }
  const go = $("ap-go"); if(go) go.addEventListener("click", () => generateApercu(z, rec, ph));
}
function shrinkImage(src){
  return new Promise(res => {
    const im = new Image();
    im.onload = () => { const k = Math.min(1, 1280 / Math.max(im.width, im.height)); const c = document.createElement("canvas");
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      res(c.toDataURL("image/jpeg", .85)); };
    im.onerror = () => res(src); im.src = src;
  });
}
async function generateApercu(z, rec, ph){
  const code = store.get("app-code", "");
  const note = $("ap-note"), actions = $("ap-actions"), ba = $("ba");
  if(!code){ note.textContent = "Saisis ton code d'accès sur l'écran d'accueil pour créer l'aperçu."; note.classList.add("err"); return; }
  const qty = {}; ((lastBudget && lastBudget.rows) || []).forEach(([nom, r, n]) => { qty[nom] = n; });
  const payload = {
    code, photo: ph.data, largeur: ph.w, hauteurPhoto: ph.h,
    emplacement: z.z.emplacement || `${z.z.nom}. ${z.z.description}`,
    profondeur: state.prof, age: state.age, a_garder: z.z.a_garder || [],
    plantes: combo.map(c => ({nom: c.plant.nom, latin: c.plant.latin, type: c.plant.type, couche: lay(c), hauteur: Math.round(heightAt(c.plant, state.age)),
      forme: form(c.plant), fleur: c.plant.bloom ? c.plant.fam : null, argente: leafCols(c.plant) === SILVER, persistant: EVERGREEN.test(c.plant.latin), quantite: qty[c.plant.nom] || 1}))
  };
  const sig = sigOf();
  apBusy = true; actions.innerHTML = ""; note.classList.remove("err"); note.textContent = "";
  const load = document.createElement("div"); load.className = "ba-load";
  load.innerHTML = `<div class="sprout" aria-hidden="true"><i></i><i></i><i></i></div><p>Création de l'image…</p><small>Compte 15 à 40 secondes.</small>`;
  ba.appendChild(load);
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 80000);
  try{
    const r = await fetch("/api/apercu", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(payload), signal: ctrl.signal});
    const raw = await r.text(); let d = {}; try{ d = JSON.parse(raw); }catch(e){}
    if(!r.ok || !d.image){
      let msg = d.erreur || (r.status === 504 || /TIMEOUT/i.test(raw) ? "La création de l'image a pris trop de temps. Réessaie." : `La création de l'image a échoué (erreur ${r.status}).`);
      throw new Error(msg + (d.detail ? ` Détail technique : ${d.detail}` : ""));
    }
    const image = await shrinkImage(`data:${d.mime || "image/png"};base64,${d.image}`);
    await idb.set(`apercu-${rec.id}-${z.id}`, {sig, image, date: new Date().toISOString()});
  }catch(e){
    apBusy = false; load.remove();
    await refreshApercu();
    const n = $("ap-note"); if(n){ n.textContent = e.name === "AbortError" ? "La création de l'image a pris trop de temps. Réessaie." : e.message === "Failed to fetch" ? "Pas de connexion. Vérifie ton réseau puis réessaie." : e.message; n.classList.add("err"); }
    return;
  }finally{ clearTimeout(to); }
  apBusy = false; load.remove();
  if(curZone === z.id) refreshApercu();
}
// Après chaque recomposition par le moteur, on met à jour l'état du bouton d'aperçu.
const _engineRender = window.render;
window.render = function(){ const out = _engineRender.apply(this, arguments); scheduleApercu(); return out; };
document.addEventListener("input", e => {
  const r = e.target.closest(".ba-range"); if(r) r.closest(".ba").style.setProperty("--pos", r.value + "%");
});

function openRecord(rec){
  if(!rec || !rec.analysis || !rec.analysis.zones.length) return;
  current = rec;
  ZKEY = "app-zones-" + rec.id;
  zoneData = store.get(ZKEY, {});
  ZONES = rec.analysis.zones.map(z => ({id: z.id, label: z.nom, note: z.description, z, thumb: rec.thumbs && rec.thumbs[z.photo - 1], st: zoneState(z, rec)}));
  $("report").innerHTML = reportHTML(rec);
  show("s-resultats");
  window.__quiet = true;
  ZONES.forEach(z => { if(!zoneData[z.id]) setZone(z.id); });
  window.__quiet = false;
  setZone(ZONES[0].id);
  window.scrollTo(0, 0);
}
$("crit-toggle").addEventListener("click", () => {
  const g = $("crit-grid"), open = !g.classList.contains("open");
  g.classList.toggle("open", open);
  $("crit-toggle").setAttribute("aria-expanded", open);
  $("crit-toggle").textContent = open ? "Masquer les critères" : "Ajuster les critères de cette zone";
});

// ---------- Installation ----------
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
let deferred = null;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault(); deferred = e;
  $("install").innerHTML = `<button class="ghost" type="button" id="do-install">Installer l'app sur cet appareil</button>`;
  $("install").hidden = false;
  $("do-install").addEventListener("click", async () => { deferred.prompt(); await deferred.userChoice.catch(() => {}); deferred = null; $("install").hidden = true; });
});
if(isIOS && !standalone){ $("install").textContent = "Pour l'installer sur iPhone : dans Safari, touche Partager puis « Sur l'écran d'accueil »."; $("install").hidden = false; }
if("serviceWorker" in navigator) navigator.serviceWorker.register("/app/sw.js", {scope: "/app/"}).catch(() => {});

try{ history.replaceState({s:"s-accueil"}, ""); }catch(e){}

// ---------- Exemple ----------
const DEMO = {id: "demo", demo: true, date: "2026-10-22T12:00:00Z", ville: "Toulouse",
  prefs: {sol: "inconnu", arrosage: "1", objectifs: ["massif","isoler"], style: "nat"},
  thumbs: [],
  analysis: {
    resume: "Jardin de ville en plein Sud-Ouest, ensoleillé et sec l'été : la pelouse grillée et le laurier-rose en pleine forme le montrent. Trois limites donnent sur des vis-à-vis, dont un balcon à l'étage. Les bandes au pied des clôtures sont étroites, il faut composer avec peu de profondeur.",
    climat: {zone: "so", explication: "À Toulouse, les étés sont chauds et secs, et les hivers descendent rarement sous −10 °C."},
    sol: {type: "ac", explication: "Le sol est estimé argilo-calcaire, comme souvent dans la région toulousaine : lourd quand il pleut, dur et craquelé l'été."},
    observations: ["La pelouse sèche en été : privilégie des plantes qui se passent d'arrosage une fois installées.", "Les canisses laissent voir la rue et les voitures : une haie vivante les remplacera durablement.", "Un bambou pousse au fond : vérifie qu'il n'est pas traçant avant de planter à côté."],
    zones: [
      {id:"z1", nom:"Côté rue, le long de la canisse", photo:1, description:"Bande de pelouse au pied de la canisse qui sépare le jardin de la rue, de part et d'autre d'un palmier.", orientation:"SO", exposition:"s", ensoleillement:"Soleil de la fin de matinée au soir. La haie fera son ombre sur le trottoir, pas sur le jardin.", humidite:"d", profondeur:"150", longueur:"m", objectifs:["isoler","massif"], hauteur_masquer:"2", a_garder:["Palmier"], attention:["Arracher le liseron au pied de la canisse avant de planter."]},
      {id:"z2", nom:"Allée, côté clôture", photo:2, description:"Étroite bande au pied de la clôture qui longe l'allée.", orientation:"SO", exposition:"s", ensoleillement:"La bande la plus chaude de l'allée, au soleil tout l'après-midi.", humidite:"d", profondeur:"60", longueur:"p", objectifs:["massif","mur"], hauteur_masquer:null, a_garder:[], attention:[]},
      {id:"z3", nom:"Allée, côté maison", photo:2, description:"Pied de mur le long de la maison, de l'autre côté de l'allée.", orientation:"NE", exposition:"m", ensoleillement:"Soleil du matin, puis ombre de la maison l'après-midi.", humidite:"f", profondeur:"60", longueur:"p", objectifs:["massif"], hauteur_masquer:null, a_garder:["Robinet"], attention:[]},
      {id:"z4", nom:"Fond, face au balcon", photo:3, description:"Limite du fond, dominée par le balcon d'une maison voisine, derrière un abricotier.", orientation:"SE", exposition:"s", ensoleillement:"Plein soleil presque toute la journée. L'ombre d'un écran haut tombera chez le voisin.", humidite:"d", profondeur:"150", longueur:"m", objectifs:["isoler","massif"], hauteur_masquer:"4", a_garder:["Abricotier","Composteur"], attention:["Contenir le bambou avec une barrière anti-rhizomes s'il est traçant."]}
    ]
  }
};
})();
