// Parcours de l'app : accueil, photos, jardin, envies, analyse par Claude, puis propositions par zone.
// Le moteur (plantes, composition, plan, budget) vient de engine.js, généré à partir de l'atelier.
(() => {
const $ = id => document.getElementById(id);
const store = {
  get(k, d){ try{ const v = JSON.parse(localStorage.getItem(k)); return v ?? d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(e){ return false; } },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} }
};
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
const SCREENS = ["s-accueil","s-photos","s-jardin","s-envies","s-analyse","s-resultats"];
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
  if(d){ const r = list.splice(+d.dataset.del, 1)[0]; store.set("app-analyses", list); if(r) store.del("app-zones-" + r.id); renderLast(); }
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
      photos.push({id: Math.random().toString(36).slice(2), data: toJpeg(img, 1024, .78).split(",")[1], thumb: toJpeg(img, 360, .7), direction: null, note: ""});
    }catch(err){
      phErr("Une photo n'a pas pu être lue. Choisis une photo au format JPEG ou PNG, ou fais une capture d'écran de la photo.");
    }
  }
  renderPhotos();
});
function compassHTML(p, i){
  const order = ["NO","N","NE","O",null,"E","SO","S","SE"];
  return `<div class="compass" role="group" aria-label="Direction de la photo ${i+1}">${order.map(d => d
    ? `<button type="button" data-dir="${d}" data-ph="${i}" aria-pressed="${p.direction===d}" aria-label="${DIR_LONG[d]}">${d}</button>`
    : `<button type="button" class="c" data-dir="" data-ph="${i}" aria-pressed="${p.direction===""}">Je ne sais pas</button>`).join("")}</div>`;
}
function renderPhotos(){
  $("ph-list").innerHTML = photos.map((p, i) => `<article class="ph">
    <div class="ph-top"><img src="${p.thumb}" alt="Photo ${i+1} de ton jardin">
      <div><b>Photo ${i+1}</b><span class="ph-q">Sur cette photo, tu regardes vers :</span>
      <span class="ph-live" id="live-${i}">${p.direction ? DIR_LONG[p.direction] : p.direction === "" ? "direction inconnue" : "choisis une direction"}</span></div></div>
    ${compassHTML(p, i)}
    <div class="ph-row">${"DeviceOrientationEvent" in window ? `<button class="small" type="button" data-measure="${i}">Je suis sur place : mesurer</button>` : ""}
      <button class="small" type="button" data-del-ph="${i}">Retirer la photo</button></div>
    <div class="field"><label for="note-${i}">Précision (facultatif)</label>
      <textarea id="note-${i}" data-note="${i}" maxlength="300" placeholder="Par exemple : je veux cacher le balcon du voisin">${esc(p.note)}</textarea></div>
  </article>`).join("");
  $("ph-add").hidden = photos.length >= MAX_PHOTOS;
  $("to-jardin").disabled = !photos.length;
}
$("ph-list").addEventListener("click", e => {
  const d = e.target.closest("[data-dir]");
  if(d){ photos[+d.dataset.ph].direction = d.dataset.dir; renderPhotos(); return; }
  const x = e.target.closest("[data-del-ph]");
  if(x){ photos.splice(+x.dataset.delPh, 1); renderPhotos(); return; }
  const m = e.target.closest("[data-measure]");
  if(m) measure(+m.dataset.measure, m);
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
  live.textContent = "Tiens le téléphone à plat, le haut tourné vers la zone photographiée…";
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
  setTimeout(() => { if(!got){ stop(); live.textContent = "Pas de boussole disponible sur cet appareil : choisis la direction à la main."; btn.textContent = "Je suis sur place : mesurer"; } }, 4000);
  btn.addEventListener("click", function once(ev){
    ev.stopPropagation(); btn.removeEventListener("click", once, true); stop();
    if(dir){ photos[i].direction = dir; renderPhotos(); }
  }, {capture:true, once:true});
}

$("to-jardin").addEventListener("click", () => show("s-jardin"));
$("to-envies").addEventListener("click", () => {
  if(!$("ville").value.trim()){ $("ville").focus(); $("ville").setAttribute("aria-invalid","true"); $("ville").placeholder = "Indique ta ville pour connaître le climat"; return; }
  $("ville").removeAttribute("aria-invalid"); show("s-envies");
});

// ---------- Analyse ----------
const STEPS = ["Lecture des photos…","Repérage des zones à planter…","Calcul de l'exposition de chaque zone…","Estimation de la place disponible…","Préparation des propositions…"];
function anErr(msg){ $("an-err").textContent = msg; $("an-err").hidden = !msg; }
$("analyse").addEventListener("click", async () => {
  anErr("");
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
      show("s-envies"); anErr(msg + (d.detail ? ` Détail technique : ${d.detail}` : code ? ` Code Vercel : ${code}` : ""));
      return;
    }
    const rec = {id: Date.now().toString(36), date: new Date().toISOString(), ville: prefs.ville.trim(), prefs: {...prefs}, analysis: d, thumbs: photos.map(p => p.thumb)};
    const list = store.get("app-analyses", []);
    list.unshift(rec);
    while(list.length > 3){ const old = list.pop(); store.del("app-zones-" + old.id); }
    if(!store.set("app-analyses", list)){ list.forEach(x => { if(x !== rec) x.thumbs = []; }); store.set("app-analyses", list); }
    renderLast();
    openRecord(rec);
  }catch(e){
    show("s-envies");
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
  box.innerHTML = `${z.thumb ? `<img src="${z.thumb}" alt="Photo de la zone ${esc(z.label)}">` : ""}
    <div class="zinfo"><p>${esc(z.note)}</p>
      <div class="ztags">${tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
      ${d.ensoleillement ? `<p class="hint">${esc(d.ensoleillement)}</p>` : ""}
      ${d.a_garder && d.a_garder.length ? `<p><b>À garder :</b> ${esc(d.a_garder.join(", "))}</p>` : ""}
      ${d.attention && d.attention.length ? `<p class="warnl"><b>Avant de planter :</b> ${esc(d.attention.join(" "))}</p>` : ""}
    </div>`;
};
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
