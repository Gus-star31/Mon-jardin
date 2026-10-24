// Parcours de l'app : ouverture, accueil, photo d'un coin, envies, jardin (une seule fois), analyse par Claude,
// puis « Ton jardin » : la liste des espaces analysés, à consulter, ajouter ou retirer.
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
const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const DIRS = ["N","NE","E","SE","S","SO","O","NO"];
const DIR_LONG = {N:"nord",NE:"nord-est",E:"est",SE:"sud-est",S:"sud",SO:"sud-ouest",O:"ouest",NO:"nord-ouest"};
const EXPO = {s:["Plein soleil","soleil"], m:["Mi-ombre","ciel"], o:["Ombre","ciel"]};
const EAU_LBL = {d:"Sol sec en été", f:"Sol frais", w:"Sol humide"};
const SOL_OPT = [["a","Argileux"],["ac","Argilo-calcaire"],["c","Calcaire"],["s","Sableux"],["h","Humifère"]];
const SOL_LBL = Object.fromEntries(SOL_OPT);
const ARRO_OPT = [["1","Aucun"],["2","Occasionnel"],["3","Régulier"]];
const ARRO_LBL = {"1":"sans arrosage","2":"arrosage occasionnel","3":"arrosage régulier"};
const OBJ_OPT = [["massif","Habiller mon jardin"],["isoler","M’isoler du voisinage"],["pollin","Attirer abeilles et papillons"],["mur","Habiller un mur ou une clôture"],["refuge","Créer un refuge biodiversité"]];
const STYLE_OPT = [["libre","Sans style imposé"],["med","Méditerranéen sec"],["nat","Naturaliste"],["anglais","Jardin anglais"],["sauvage","Refuge biodiversité"]];
const CLIM_LBL = {med:"Méditerranéen", so:"Sud-Ouest", oc:"Océanique", co:"Continental", mo:"Montagnard"};
const ROLE_SHORT = {arbre:["Arbre","sauge"], ecran:["Haie","sauge"], grimpante:["Grimpante","sauge"], structure:["Fond","sauge"], graminee:["Graminée","peche"], vivace:["Milieu","peche"], bordure:["Devant","ciel"], bulbe:["Bulbe","ciel"]};
const MOIS_COURT = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];

// Départements de France métropolitaine et zone climatique de l'atelier (approximation régionale).
const DEPTS = [["01","Ain","co"],["02","Aisne","oc"],["03","Allier","co"],["04","Alpes-de-Haute-Provence","med"],["05","Hautes-Alpes","mo"],["06","Alpes-Maritimes","med"],["07","Ardèche","med"],["08","Ardennes","co"],["09","Ariège","so"],["10","Aube","co"],["11","Aude","med"],["12","Aveyron","so"],["13","Bouches-du-Rhône","med"],["14","Calvados","oc"],["15","Cantal","mo"],["16","Charente","oc"],["17","Charente-Maritime","oc"],["18","Cher","oc"],["19","Corrèze","oc"],["2A","Corse-du-Sud","med"],["2B","Haute-Corse","med"],["21","Côte-d’Or","co"],["22","Côtes-d’Armor","oc"],["23","Creuse","oc"],["24","Dordogne","so"],["25","Doubs","co"],["26","Drôme","med"],["27","Eure","oc"],["28","Eure-et-Loir","oc"],["29","Finistère","oc"],["30","Gard","med"],["31","Haute-Garonne","so"],["32","Gers","so"],["33","Gironde","so"],["34","Hérault","med"],["35","Ille-et-Vilaine","oc"],["36","Indre","oc"],["37","Indre-et-Loire","oc"],["38","Isère","co"],["39","Jura","co"],["40","Landes","so"],["41","Loir-et-Cher","oc"],["42","Loire","co"],["43","Haute-Loire","mo"],["44","Loire-Atlantique","oc"],["45","Loiret","oc"],["46","Lot","so"],["47","Lot-et-Garonne","so"],["48","Lozère","mo"],["49","Maine-et-Loire","oc"],["50","Manche","oc"],["51","Marne","co"],["52","Haute-Marne","co"],["53","Mayenne","oc"],["54","Meurthe-et-Moselle","co"],["55","Meuse","co"],["56","Morbihan","oc"],["57","Moselle","co"],["58","Nièvre","co"],["59","Nord","oc"],["60","Oise","oc"],["61","Orne","oc"],["62","Pas-de-Calais","oc"],["63","Puy-de-Dôme","co"],["64","Pyrénées-Atlantiques","so"],["65","Hautes-Pyrénées","so"],["66","Pyrénées-Orientales","med"],["67","Bas-Rhin","co"],["68","Haut-Rhin","co"],["69","Rhône","co"],["70","Haute-Saône","co"],["71","Saône-et-Loire","co"],["72","Sarthe","oc"],["73","Savoie","mo"],["74","Haute-Savoie","mo"],["75","Paris","oc"],["76","Seine-Maritime","oc"],["77","Seine-et-Marne","oc"],["78","Yvelines","oc"],["79","Deux-Sèvres","oc"],["80","Somme","oc"],["81","Tarn","so"],["82","Tarn-et-Garonne","so"],["83","Var","med"],["84","Vaucluse","med"],["85","Vendée","oc"],["86","Vienne","oc"],["87","Haute-Vienne","oc"],["88","Vosges","co"],["89","Yonne","co"],["90","Territoire de Belfort","co"],["91","Essonne","oc"],["92","Hauts-de-Seine","oc"],["93","Seine-Saint-Denis","oc"],["94","Val-de-Marne","oc"],["95","Val-d’Oise","oc"]];
function findDept(txt){
  const t = norm(txt); if(!t) return null;
  const num = t.match(/^(\d{2}|2a|2b)\b/) || t.match(/^(\d{2})\d{3}$/);
  if(num){ const c = num[1].toUpperCase(); const d = DEPTS.find(x => x[0] === c); if(d) return d; }
  const name = t.replace(/^(\d{2}|2a|2b)\s*/, "");
  return DEPTS.find(x => norm(x[1]) === name) || (name.length >= 4 ? DEPTS.find(x => norm(x[1]).startsWith(name)) : null) || null;
}

// ---------- Données ----------
let records = store.get("app-analyses", []);
let garden = store.get("app-garden", null);
let envies = Object.assign({objectifs:["massif"], style:"libre"}, store.get("app-envies", {}));
// Reprise des données de la version précédente : le jardin se déduit de la dernière analyse.
(() => {
  const old = store.get("app-prefs", null);
  if(!garden && records.length){
    const r = records[0], p = r.prefs || {};
    garden = {label: r.ville || "Ton jardin", dept: null, clim: r.analysis && r.analysis.climat ? r.analysis.climat.zone : "so", sol: p.sol && p.sol !== "inconnu" ? p.sol : null, arrosage: p.arrosage || "1"};
    store.set("app-garden", garden);
  }
  if(old && !store.get("app-envies", null)){ envies = {objectifs: old.objectifs || ["massif"], style: STYLE_OPT.some(o => o[0] === old.style) ? old.style : "libre"}; store.set("app-envies", envies); }
  records.forEach(r => { r.removed = r.removed || []; });
  records.sort((a, b) => String(a.date).localeCompare(String(b.date)));
})();
function saveRecords(){
  if(!store.set("app-analyses", records)){ records.forEach((r, i) => { if(i < records.length - 6) r.thumbs = []; }); store.set("app-analyses", records); }
}
let photo = null;          // photo du coin en cours : {data, w, h, thumb, direction, note}
let current = null;        // analyse ouverte dans l'écran espace
let demo = false;          // « Ton jardin » de l'exemple
let gardenEdit = false;    // écran jardin ouvert depuis l'accueil pour modifier les réglages
const espaces = () => {
  const src = demo ? [DEMO] : records;
  return src.flatMap(r => r.analysis.zones.filter(z => !(r.removed || []).includes(z.id)).map(z => ({rec: r, z, key: r.id + ":" + z.id})));
};

// ---------- Navigation ----------
const SCREENS = ["s-ouverture","s-login","s-photo","s-envies","s-garden","s-analyse","s-espace","s-jardin"];
function show(id, push = true){
  SCREENS.forEach(s => { $(s).hidden = s !== id; });
  closeSheet();
  window.scrollTo(0, 0);
  if(push && id !== "s-analyse"){ try{ history.pushState({s:id}, ""); }catch(e){} }
  if(id === "s-espace") requestAnimationFrame(() => { if(typeof drawAll === "function") drawAll(); });
  const f = $(id).querySelector("h1, h2"); if(f){ f.setAttribute("tabindex", "-1"); }
  drawCoach(id);
  if(id !== "s-photo") stopCompass();
}
window.addEventListener("popstate", e => {
  const s = e.state && e.state.s;
  if(s && SCREENS.includes(s) && s !== "s-analyse"){
    if(s === "s-espace" && !current) return show(homeScreen(), false);
    if(s === "s-jardin") renderJardin();
    show(s, false);
  }
});
document.addEventListener("click", e => {
  const b = e.target.closest("[data-go]"); if(!b) return;
  if(b.dataset.go === "s-jardin") renderJardin();
  show(b.dataset.go);
});
function homeScreen(){ return demo || espaces().length ? "s-jardin" : "s-login"; }

// ---------- Aide du premier coin ----------
// Une carte par étape (photo, envies, jardin, diagnostic), affichée une fois, le temps du premier coin d'un nouveau compte.
const COACH = {
  "s-photo": [1, "Ajoute <em>une photo</em>", "Prends de face le coin à planter. L’app y repère les zones, l’exposition et la place disponible.", `<svg class="illu" aria-hidden="true" width="44" height="32" viewBox="0 0 40.3333 29.3333" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.6667 24.75C30.7293 24.75 34.8333 20.6459 34.8333 15.5833C34.8333 10.5207 30.7293 6.41667 25.6667 6.41667C20.6041 6.41667 16.5 10.5207 16.5 15.5833C16.5 20.6459 20.6041 24.75 25.6667 24.75Z" fill="#F3D35B"/><path d="M3.66667 6.41667H11L14.6667 0.916667H25.6667L29.3333 6.41667H36.6667C37.396 6.41667 38.0955 6.7064 38.6112 7.22212C39.1269 7.73785 39.4167 8.43732 39.4167 9.16667V25.6667C39.4167 26.396 39.1269 27.0955 38.6112 27.6112C38.0955 28.1269 37.396 28.4167 36.6667 28.4167H3.66667C2.93732 28.4167 2.23785 28.1269 1.72212 27.6112C1.2064 27.0955 0.916667 26.396 0.916667 25.6667V9.16667C0.916667 8.43732 1.2064 7.73785 1.72212 7.22212C2.23785 6.7064 2.93732 6.41667 3.66667 6.41667Z" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M26.5833 16.5C26.5833 20.0438 23.7105 22.9167 20.1667 22.9167C16.6228 22.9167 13.75 20.0438 13.75 16.5C13.75 12.9562 16.6228 10.0833 20.1667 10.0833C23.7105 10.0833 26.5833 12.9562 26.5833 16.5Z" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M33 10.0833H33.9167" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`],
  "s-envies": [2, "Donne <em>tes critères</em>", "Massif fleuri, haie pour t’isoler, style de jardin : tes envies guident le choix des plantes.", `<svg class="illu" aria-hidden="true" width="32" height="32" viewBox="0 0 18.6 18.6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.05 17.55C1.05 7.05 8.55 1.05 17.55 1.05C17.55 11.55 11.55 17.55 1.05 17.55Z" fill="#D5E3CF" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M1.05 17.55L11.55 7.05" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`],
  "s-garden": [3, "Décris <em>ton jardin</em>", "Ton département donne le climat, le sol et l’arrosage affinent le choix des plantes.", `<svg class="illu" aria-hidden="true" width="24" height="32" viewBox="0 0 27.5 36.6667" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4167 23.8333C22.9855 23.8333 27.5 19.3189 27.5 13.75C27.5 8.18113 22.9855 3.66667 17.4167 3.66667C11.8478 3.66667 7.33333 8.18113 7.33333 13.75C7.33333 19.3189 11.8478 23.8333 17.4167 23.8333Z" fill="#D5E3CF"/><path d="M13.75 35.75C4.58333 24.75 0.916667 19.25 0.916667 13.75C0.916667 10.3464 2.26875 7.08218 4.67546 4.67546C7.08218 2.26875 10.3464 0.916667 13.75 0.916667C17.1536 0.916667 20.4178 2.26875 22.8245 4.67546C25.2313 7.08218 26.5833 10.3464 26.5833 13.75C26.5833 19.25 22.9167 24.75 13.75 35.75Z" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M8.25 15.5833C10.0833 8.25 17.4167 6.41667 20.1667 8.25C20.1667 13.75 13.75 19.25 8.25 15.5833ZM8.25 15.5833L16.5 10.0833" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`],
  "s-espace": [4, "Consulte <em>ton diagnostic</em>", "Les plantes adaptées à ce coin, leur plan de plantation et le budget. Remplace une plante ou ajuste les critères si besoin.", `<svg class="illu" aria-hidden="true" width="26" height="32" viewBox="0 0 28.4167 34.8333" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.5833 4.58333H8.25C7.23748 4.58333 6.41667 5.40414 6.41667 6.41667V30.25C6.41667 31.2625 7.23748 32.0833 8.25 32.0833H26.5833C27.5959 32.0833 28.4167 31.2625 28.4167 30.25V6.41667C28.4167 5.40414 27.5959 4.58333 26.5833 4.58333Z" fill="#F5CDB0"/><path d="M26.5833 6.41667L21.0833 0.916667H0.916667V33.9167H26.5833V6.41667ZM21.0833 0.916667V6.41667H26.5833" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M6.41667 15.5833H13.75M6.41667 21.0833H19.25M6.41667 26.5833H15.5833" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M18.3333 17.4167C19.8521 17.4167 21.0833 16.1854 21.0833 14.6667C21.0833 13.1479 19.8521 11.9167 18.3333 11.9167C16.8146 11.9167 15.5833 13.1479 15.5833 14.6667C15.5833 16.1854 16.8146 17.4167 18.3333 17.4167Z" fill="#F2C4C4" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`]
};
let coach = store.get("app-coach", null);
function startCoach(){ coach = {seen: []}; store.set("app-coach", coach); }
function drawCoach(id){
  document.querySelectorAll(".coach").forEach(c => c.remove());
  const c = COACH[id];
  if(!coach || !c || coach.seen.includes(id)) return;
  const [n, title, text, picto] = c;
  const el = document.createElement("div");
  el.className = "coach"; el.setAttribute("role", "note");
  el.innerHTML = `${picto}<div><p class="eyebrow">Ton premier coin · ${n} sur ${Object.keys(COACH).length}</p><h3>${title}</h3><p>${text}</p><button class="link" type="button">Compris</button></div>`;
  el.querySelector("button").addEventListener("click", () => el.remove());
  ($(id).querySelector(".head") || $("esp-title")).after(el);
  coach.seen.push(id);
  // Le diagnostic clôt l'aide, même si l'étape jardin a été sautée (réglages déjà connus).
  if(id === "s-espace" || coach.seen.length === Object.keys(COACH).length){ coach = null; store.del("app-coach"); } else store.set("app-coach", coach);
}

// ---------- Pastilles ----------
function appChips(boxId, options, mode, get, set){
  const box = $(boxId);
  const draw = () => {
    const val = get();
    box.innerHTML = options.map(([v, l]) => {
      const id = `ap-${boxId}-${v}`;
      const on = mode === "multi" ? val.includes(v) : val === v;
      return `<label class="chip" for="${id}"><input id="${id}" type="${mode === "multi" ? "checkbox" : mode === "toggle" ? "checkbox" : "radio"}" name="${boxId}" value="${v}" ${on ? "checked" : ""}><span>${esc(l)}</span></label>`;
    }).join("");
  };
  box.addEventListener("change", e => {
    if(mode === "multi"){
      const vals = [...box.querySelectorAll("input:checked")].map(i => i.value);
      if(!vals.length){ draw(); return; }
      set(vals);
    } else if(mode === "toggle"){ set(e.target.checked ? e.target.value : null); }
    else set(box.querySelector("input:checked").value);
    draw(); const i = $(`ap-${boxId}-${e.target.value}`); if(i) i.focus();
  });
  draw();
  return draw;
}

// ---------- 00 et 01 · Ouverture, accueil ----------
// Connexion : maquette de l'écran, sans service branché. Toute connexion valide mène à l'accueil.
// Le temps des tests : « Se connecter » laisse passer même avec les champs vides. Repasser à false pour retrouver les contrôles.
const LOGIN_LIBRE = true;
let signup = false;
const loginErr = msg => { $("login-err").textContent = msg; $("login-err").hidden = !msg; };
function drawLogin(){
  $("login-submit").textContent = signup ? "Créer mon compte" : "Se connecter";
  $("login-pass").autocomplete = signup ? "new-password" : "current-password";
  $("login-pass").placeholder = signup ? "Choisis un mot de passe" : "Ton mot de passe";
  $("login-pass-help").hidden = !signup;
  $("login-forgot").hidden = signup;
  $("login-switch-q").textContent = signup ? "Déjà un compte ?" : "Pas encore de compte ?";
  $("login-switch").textContent = signup ? "Se connecter" : "Créer un compte";
  loginErr("");
}
// Deux choix d'abord (Google, e-mail) ; le formulaire ne s'ouvre qu'au choix de l'e-mail.
function loginForm(open){
  $("login-form").hidden = !open;
  $("login-google").hidden = open; $("login-email-go").hidden = open;
  loginErr("");
  if(open) $("login-email").focus(); else $("login-email-go").focus();
}
$("login-email-go").addEventListener("click", () => loginForm(true));
$("login-back").addEventListener("click", () => loginForm(false));
$("login-switch").addEventListener("click", () => { signup = !signup; drawLogin(); if($("login-form").hidden) loginForm(true); });
$("login-show").addEventListener("click", () => {
  const on = $("login-pass").type === "password";
  $("login-pass").type = on ? "text" : "password";
  $("login-show").textContent = on ? "Masquer" : "Afficher";
  $("login-show").setAttribute("aria-pressed", on);
});
// Compte existant : sa page Ton jardin, même vide. Nouveau compte : son premier coin, guidé par les cartes d'aide.
function afterLogin(isNew){
  loginErr("");
  if(isNew){ startCoach(); startSpace(); } else { renderJardin(); show("s-jardin"); }
}
// Maquette : sans service branché, Google vaut création de compte tant qu'aucun espace n'existe.
$("login-google").addEventListener("click", () => afterLogin(!espaces().length));
$("login-forgot").addEventListener("click", () => {
  const ok = /^\S+@\S+\.\S+$/.test($("login-email").value.trim());
  loginErr(ok ? "" : "Saisis ton e-mail, on t’enverra un lien pour choisir un nouveau mot de passe.");
  if(!ok) $("login-email").focus();
});
$("login-form").addEventListener("submit", e => {
  e.preventDefault();
  if(LOGIN_LIBRE) return afterLogin(signup);
  const email = $("login-email").value.trim(), pass = $("login-pass").value;
  $("login-email").removeAttribute("aria-invalid"); $("login-pass").removeAttribute("aria-invalid");
  if(!/^\S+@\S+\.\S+$/.test(email)){ loginErr("Saisis une adresse e-mail valide, par exemple toi@exemple.fr."); $("login-email").setAttribute("aria-invalid", "true"); $("login-email").focus(); return; }
  if(signup ? pass.length < 8 : !pass){ loginErr(signup ? "Choisis un mot de passe d’au moins 8 caractères." : "Saisis ton mot de passe."); $("login-pass").setAttribute("aria-invalid", "true"); $("login-pass").focus(); return; }
  afterLogin(signup);
});

// ---------- Nouveau parcours : 02 photo → 03 envies → 03 jardin (la première fois) → 04 analyse ----------
const steps = () => garden ? 2 : 3;
// Étapes nommées : faites (coche), en cours, à venir. L'étape Jardin n'existe que la première fois.
const STEP_NAMES = ["Photo", "Envies", "Jardin"];
const STEP_DONE = `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 19.3333 19.3333" fill="none"><path d="M9.66667 18.5556C14.5759 18.5556 18.5556 14.5759 18.5556 9.66667C18.5556 4.75747 14.5759 0.777778 9.66667 0.777778C4.75747 0.777778 0.777778 4.75747 0.777778 9.66667C0.777778 14.5759 4.75747 18.5556 9.66667 18.5556Z" fill="#D5E3CF" stroke-width="1.55556" stroke="#1C1C1A"/><path d="M5.77778 9.88889L8.55556 12.5556L13.6667 7" stroke-width="1.77778" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`;
function setProgress(id, n){
  $(id).innerHTML = STEP_NAMES.slice(0, steps()).map((name, i) => {
    const st = i < n - 1 ? "done" : i === n - 1 ? "cur" : "todo";
    return `<li class="${st}"${st === "cur" ? ' aria-current="step"' : ""}>${st === "done" ? STEP_DONE : '<i aria-hidden="true"></i>'}${name}${st === "done" ? '<span class="sr"> (faite)</span>' : ""}</li>`;
  }).join("");
}
function startSpace(){
  demo = false; photo = null; renderPhoto();
  $("photo-back").dataset.go = espaces().length ? "s-jardin" : "s-login";
  $("photo-back").querySelector("span").textContent = espaces().length ? "Ton jardin" : "Accueil";
  show("s-photo");
}
$("photo-back2").addEventListener("click", () => $("photo-back").click());

// 02 · Photo
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
  const f = e.target.files[0]; e.target.value = ""; phErr("");
  if(!f) return;
  try{
    const img = await loadImage(f);
    const w0 = img.width || img.naturalWidth, h0 = img.height || img.naturalHeight, k = Math.min(1, 1024 / Math.max(w0, h0));
    photo = {data: toJpeg(img, 1024, .78).split(",")[1], w: Math.round(w0*k), h: Math.round(h0*k), thumb: toJpeg(img, 480, .72), direction: null, note: ""};
  }catch(err){
    phErr("Cette photo n’a pas pu être lue. Choisis une photo au format JPEG ou PNG, ou fais une capture d’écran de la photo.");
  }
  renderPhoto();
});
function renderPhoto(){
  setProgress("pg-photo", 1);
  const canMeasure = "DeviceOrientationEvent" in window;
  const p = photo;
  $("ph-card").innerHTML = p ? `<article class="ph">
    <div class="ph-top"><img src="${p.thumb}" alt="Ta photo du coin à planter">
      <div class="ph-side">
        <label class="ph-q" for="dir">Orientation</label>
        <select id="dir">
          <option value="" ${!p.direction ? "selected" : ""}>Je ne sais pas</option>
          ${DIRS.map(d => `<option value="${d}" ${p.direction === d ? "selected" : ""}>${DIR_LONG[d].charAt(0).toUpperCase() + DIR_LONG[d].slice(1)}</option>`).join("")}
        </select>
      </div>
      <button class="ph-del" type="button" id="ph-del" aria-label="Retirer la photo">×</button>
    </div>
    ${canMeasure ? `<div class="compass" id="compass" ${p.direction ? "hidden" : ""}>${COMPASS}<div class="cp-txt"><b>Utilise la boussole pour t’aider</b>
      <span class="ph-live" id="live">Mets-toi face au coin à planter, comme pour le prendre en photo.</span>
      <p class="cp-read" id="cp-read" aria-live="polite" hidden><span class="cp-dir" id="cp-dir"></span><span class="cp-deg" id="cp-deg"></span></p>
      <button class="linkish" type="button" id="measure" hidden></button></div></div>` : ""}
    ${p.note || p.showNote ? `<textarea id="note" maxlength="300" aria-label="Précision sur ce coin" placeholder="Par exemple : je veux cacher le balcon du voisin">${esc(p.note)}</textarea>`
      : `<button class="linkish add" type="button" id="add-note">+ Ajouter une précision</button>`}
  </article>` : "";
  $("ph-add").hidden = !!p;
  $("to-envies").disabled = !p;
  startCompass();
}
$("ph-card").addEventListener("click", e => {
  if(e.target.closest("#add-note")){ photo.showNote = true; renderPhoto(); $("note").focus(); return; }
  if(e.target.closest("#ph-del")){ photo = null; renderPhoto(); return; }
});
// La boussole ne sert que tant que l'orientation est « Je ne sais pas ».
$("ph-card").addEventListener("change", e => {
  if(e.target.id !== "dir") return;
  photo.direction = e.target.value || null;
  if($("compass")){ $("compass").hidden = !!photo.direction; startCompass(); }
});
$("ph-card").addEventListener("input", e => { if(e.target.id === "note") photo.note = e.target.value; });
// Boussole : téléphone à plat, le haut tourné vers le coin photographié. La rose tourne, le repère du haut montre l'orientation.
const COMPASS = `<svg class="dial" aria-hidden="true" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="rose" stroke="#1C1C1A" stroke-width="2" stroke-linecap="round"><circle cx="36" cy="38" r="27" fill="#FBF9F3"/><path d="M36 13 V17 M36 59 V63 M11 38 H15 M57 38 H61" stroke-width="1.5"/>
  <g fill="#1C1C1A" stroke="none" font-family="Instrument Sans, sans-serif" font-size="9" font-weight="600" text-anchor="middle"><text x="36" y="26">N</text><text x="36" y="56">S</text><text x="51" y="41">E</text><text x="21" y="41">O</text></g></g>
  <path d="M36 2 L41 10 H31 Z" fill="#1F3B78"/><circle cx="36" cy="38" r="3" fill="#F3D35B" stroke="#1C1C1A" stroke-width="1.5"/></svg>`;
// Elle démarre seule dès que l'orientation est « Je ne sais pas ». Sur iPhone, Safari n'ouvre la boussole qu'après un toucher.
let compassOff = null;
function stopCompass(){ if(compassOff){ compassOff(); compassOff = null; } }
function noCompass(msg){
  stopCompass();
  $("live").textContent = msg; $("cp-read").hidden = true; $("measure").hidden = true;
}
function startCompass(){
  stopCompass();
  if(!$("compass") || $("compass").hidden) return;
  if(typeof DeviceOrientationEvent.requestPermission === "function"){
    const b = $("measure"); b.textContent = "Activer la boussole"; b.hidden = false;
    b.onclick = async () => {
      try{ if(await DeviceOrientationEvent.requestPermission() !== "granted") return noCompass("Accès à la boussole refusé : choisis l’orientation dans la liste."); }
      catch(e){ return noCompass("Boussole indisponible : choisis l’orientation dans la liste."); }
      listenCompass();
    };
    return;
  }
  listenCompass();
}
function listenCompass(){
  const b = $("measure");
  let dir = null;
  b.hidden = true;
  b.onclick = () => { if(!dir) return; stopCompass(); photo.direction = dir; renderPhoto(); };
  const onOri = ev => {
    const h = typeof ev.webkitCompassHeading === "number" ? ev.webkitCompassHeading : (ev.absolute && ev.alpha != null ? (360 - ev.alpha) % 360 : null);
    if(h == null || !$("rose")) return;
    dir = DIRS[Math.round(h / 45) % 8];
    $("rose").style.transform = `rotate(${-h}deg)`;
    $("cp-dir").textContent = DIR_LONG[dir].charAt(0).toUpperCase() + DIR_LONG[dir].slice(1);
    $("cp-deg").textContent = `${Math.round(h)}°`;
    $("cp-read").hidden = false;
    b.textContent = `Choisir ${DIR_LONG[dir]}`; b.hidden = false;
  };
  window.addEventListener("deviceorientationabsolute", onOri);
  window.addEventListener("deviceorientation", onOri);
  const t = setTimeout(() => { if(!dir) noCompass("Pas de boussole sur cet appareil : choisis l’orientation dans la liste."); }, 4000);
  compassOff = () => { window.removeEventListener("deviceorientationabsolute", onOri); window.removeEventListener("deviceorientation", onOri); clearTimeout(t); };
}
$("to-envies").addEventListener("click", () => { renderEnvies(); show("s-envies"); });

// 03 · Envies
appChips("a-obj", OBJ_OPT, "multi", () => envies.objectifs, v => { envies.objectifs = v; store.set("app-envies", envies); });
const drawStyle = appChips("a-style", STYLE_OPT, "single", () => envies.style, v => { envies.style = v; store.set("app-envies", envies); styleHint(); });
function styleHint(){ $("a-style-hint").textContent = (STYLES[envies.style] || STYLES.libre).hint; $("a-style-ph").innerHTML = styleFigure(envies.style); styleWarn(); }
// Rappel de cohérence : le style du premier espace (hors « sans style ») fait référence pour les suivants.
function gardenStyle(){
  const r = records.find(r => r.prefs && r.prefs.style && r.prefs.style !== "libre" && r.analysis.zones.some(z => !(r.removed || []).includes(z.id)));
  return r ? r.prefs.style : null;
}
function styleWarn(){
  const ref = gardenStyle(), box = $("a-style-warn");
  box.hidden = !ref || ref === envies.style;
  if(box.hidden) return;
  const name = STYLE_OPT.find(o => o[0] === ref)[1].toLowerCase();
  box.innerHTML = `<b>Ton jardin a commencé en ${esc(name)}.</b> Pour un ensemble cohérent, garde le même style d’un espace à l’autre. <button class="linkish" type="button" id="a-style-back">Revenir au ${esc(name)}</button>`;
  $("a-style-back").addEventListener("click", () => { envies.style = ref; store.set("app-envies", envies); drawStyle(); styleHint(); });
}
styleHint();
function renderEnvies(){
  setProgress("pg-envies", 2);
  $("env-photo").hidden = !photo; if(photo) $("env-img").src = photo.thumb;
  $("env-next").textContent = garden ? "Voir mes propositions" : "Continuer";
  $("env-err").hidden = true;
  styleWarn();
}
$("env-next").addEventListener("click", () => {
  if(garden) return runAnalyse("env-err", "s-envies");
  gardenEdit = false; renderGarden(); show("s-garden");
});

// 03 · Ton jardin (département, sol, arrosage)
let gdraft = {};
$("depts").innerHTML = DEPTS.map(d => `<option value="${d[0]} · ${d[1]}"></option>`).join("");
const drawSol = appChips("a-sol", SOL_OPT, "toggle", () => gdraft.sol, v => { gdraft.sol = v; });
const drawArro = appChips("a-arro", ARRO_OPT, "single", () => gdraft.arrosage, v => { gdraft.arrosage = v; });
function deptHelp(){
  const d = findDept($("dept").value);
  $("dept-help").textContent = d ? `Climat : ${CLIM_LBL[d[2]]}` : "";
  return d;
}
// Bouton inactif tant que le département (seul champ obligatoire de l'étape) est vide.
const gardenReady = () => { $("garden-next").disabled = !$("dept").value.trim(); };
$("dept").addEventListener("input", () => { deptHelp(); gardenReady(); $("dept-err").hidden = true; $("dept").removeAttribute("aria-invalid"); });
$("dept").addEventListener("change", () => { const d = deptHelp(); if(d) $("dept").value = `${d[0]} · ${d[1]}`; });
function renderGarden(){
  gdraft = Object.assign({sol: null, arrosage: "1"}, garden || {});
  $("dept").value = garden ? (garden.dept ? `${garden.dept} · ${garden.label}` : garden.label) : "";
  deptHelp(); drawSol(); drawArro();
  $("step-garden").hidden = !gardenEdit;
  $("pg-garden").hidden = gardenEdit; if(!gardenEdit) setProgress("pg-garden", 3);
  $("garden-back").dataset.go = gardenEdit ? "s-jardin" : "s-envies";
  $("garden-back").querySelector("span").textContent = gardenEdit ? "Ton jardin" : "Tes envies";
  $("garden-lede").textContent = gardenEdit ? "Ces réglages servent aux prochains espaces que tu ajouteras." : "Ces réglages valent pour tout ton jardin. Tu ne les donnes qu’une fois.";
  $("garden-privacy").hidden = gardenEdit;
  $("garden-next").textContent = gardenEdit ? "Enregistrer" : "Voir mes propositions";
  $("dept-err").hidden = true; $("gar-err").hidden = true;
  gardenReady();
}
$("garden-next").addEventListener("click", () => {
  const raw = $("dept").value.trim(), d = findDept(raw);
  if(!raw){ $("dept-err").hidden = false; $("dept").setAttribute("aria-invalid", "true"); $("dept").focus(); return; }
  garden = {label: d ? d[1] : raw, dept: d ? d[0] : null, clim: d ? d[2] : null, sol: gdraft.sol || null, arrosage: gdraft.arrosage || "1"};
  store.set("app-garden", garden);
  if(gardenEdit){ renderJardin(); show("s-jardin"); return; }
  runAnalyse("gar-err", "s-garden");
});

// ---------- 04 · Analyse ----------
const STEPS = ["Lecture de la photo","Repérage des zones à planter","Calcul de l’exposition de chaque zone","Estimation de la place disponible","Préparation des propositions"];
function drawSteps(k){ $("an-steps").innerHTML = STEPS.map((s, i) => `<li class="${i < k ? "done" : i === k ? "now" : ""}"><i></i>${s}</li>`).join(""); }
async function runAnalyse(errId, back){
  const err = msg => { $(errId).textContent = msg; $(errId).hidden = !msg; };
  err("");
  if(!photo){ show("s-photo"); return; }
  show("s-analyse");
  let k = 0; drawSteps(0);
  const tick = setInterval(() => { k = Math.min(k + 1, STEPS.length - 1); drawSteps(k); }, 7000);
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 90000);
  const objectifs = [...new Set(envies.objectifs)];
  const ville = garden.dept ? `${garden.label} (${garden.dept})` : garden.label;
  try{
    const r = await fetch("/api/analyse", {method:"POST", headers:{"content-type":"application/json"}, signal: ctrl.signal,
      body: JSON.stringify({ville, sol: garden.sol || "inconnu", arrosage: garden.arrosage || "1", objectifs, style: envies.style,
        photos: [{data: photo.data, direction: photo.direction || null, note: photo.note}]})});
    const raw = await r.text(); let d = {}; try{ d = JSON.parse(raw); }catch(e){}
    if(!r.ok){
      let msg = d.erreur;
      if(!msg){
        if(r.status === 504 || /TIMEOUT/i.test(raw)) msg = "L’analyse a pris trop de temps côté serveur. Réessaie dans un instant.";
        else if(r.status === 413 || /PAYLOAD_TOO_LARGE/i.test(raw)) msg = "La photo est trop lourde pour être envoyée. Réessaie avec une autre photo.";
        else msg = `L’analyse a échoué (erreur ${r.status}).`;
      }
      const vcode = (raw.match(/[A-Z_]{8,}/) || [""])[0];
      show(back); err(msg + (d.detail ? ` Détail technique : ${d.detail}` : vcode ? ` Code Vercel : ${vcode}` : ""));
      return;
    }
    const rec = {id: Date.now().toString(36), date: new Date().toISOString(), ville, prefs: {sol: garden.sol || "inconnu", arrosage: garden.arrosage, objectifs, style: envies.style}, analysis: d, thumbs: [photo.thumb], removed: []};
    if(!garden.clim && d.climat){ garden.clim = d.climat.zone; store.set("app-garden", garden); }
    records.push(rec);
    while(records.length > 24){ dropRecord(records[0]); }
    await idb.set(`photo-${rec.id}-0`, {data: photo.data, w: photo.w, h: photo.h});
    saveRecords();
    photo = null; demo = false;
    openEspace(rec, d.zones[0].id);
  }catch(e){
    show(back);
    err(e.name === "AbortError" ? "L’analyse prend trop de temps. Réessaie dans un instant." : "Pas de connexion. Vérifie ton réseau puis réessaie.");
  }finally{ clearInterval(tick); clearTimeout(to); }
}
function dropRecord(r){
  records = records.filter(x => x !== r);
  store.del("app-zones-" + r.id); idb.delPrefix("photo-" + r.id + "-"); idb.delPrefix("apercu-" + r.id + "-");
}

// ---------- 06 · Un espace ----------
function zoneState(z, rec){
  const p = rec.prefs || {}, a = rec.analysis;
  let obj = (z.objectifs && z.objectifs.length ? z.objectifs : ["massif"]).map(o => o === "refuge" ? "pollin" : o).filter(o => ["massif","isoler","pollin","mur"].includes(o));
  if(!obj.length) obj = ["massif"];
  return {obj: [...new Set(obj)], haut: z.hauteur_masquer || "2", vite: obj.includes("isoler") ? "rapide" : "tout", prof: z.profondeur, expo: z.exposition,
    sol: p.sol && p.sol !== "inconnu" ? p.sol : a.sol.type, eau: z.humidite, clim: a.climat.zone, taille: z.longueur,
    pal: "all", types: BASE_TYPES, arro: p.arrosage || "1", style: p.style || "libre", age: "3"};
}
function titleHTML(t){
  const i = t.indexOf(",");
  return i > 0 ? `${esc(t.slice(0, i + 1))} <em>${esc(t.slice(i + 1).trim())}</em>` : esc(t);
}
function openEspace(rec, zoneId){
  current = rec;
  ZKEY = "app-zones-" + rec.id;
  zoneData = store.get(ZKEY, {});
  ZONES = rec.analysis.zones.filter(z => !(rec.removed || []).includes(z.id)).map(z => ({id: z.id, label: z.nom, note: z.description, z, thumb: rec.thumbs && rec.thumbs[(z.photo || 1) - 1], st: zoneState(z, rec)}));
  const list = espaces(), idx = list.findIndex(e => e.rec === rec && e.z.id === zoneId);
  $("esp-num").textContent = idx >= 0 ? `Espace ${idx + 1} sur ${list.length}` : "";
  $("esp-demo").hidden = !rec.demo;
  $("esp-back").dataset.go = "s-jardin";
  $("crit-grid").hidden = true; $("crit-toggle").setAttribute("aria-expanded", "false"); $("crit-toggle").textContent = "Ajuster les critères de cet espace"; listOpen = false;
  show("s-espace");
  window.__quiet = true;
  setZone(zoneId);
  window.__quiet = false;
  window.scrollTo(0, 0);
}
window.renderZoneDetail = function(z){
  if(!z){ $("esp-title").textContent = "Réglage libre"; $("esp-tags").innerHTML = ""; $("esp-warn").innerHTML = ""; $("esp-apercu").innerHTML = ""; return; }
  const d = z.z || {};
  $("esp-title").innerHTML = titleHTML(z.label);
  const tags = [EXPO[d.exposition] ? [EXPO[d.exposition][0], EXPO[d.exposition][1]] : null, d.orientation ? [`Tournée vers le ${DIR_LONG[d.orientation]}`, ""] : null, EAU_LBL[d.humidite] ? [EAU_LBL[d.humidite], ""] : null,
    d.profondeur ? [`${(+d.profondeur / 100).toLocaleString("fr-FR")} m de profondeur`, ""] : null, d.hauteur_masquer ? [`Écran de ${d.hauteur_masquer} m${d.hauteur_masquer === "4" ? " et plus" : ""}`, "sauge"] : null].filter(Boolean);
  $("esp-tags").innerHTML = tags.map(([t, c]) => `<span class="tag ${c}">${esc(t)}</span>`).join("");
  const warn = [d.attention && d.attention.length ? `<b>Avant de planter :</b> ${esc(d.attention.join(" "))}` : "", d.a_garder && d.a_garder.length ? `<b>À garder :</b> ${esc(d.a_garder.join(", "))}.` : ""].filter(Boolean).join(" ");
  $("esp-warn").innerHTML = warn ? `<p class="warnl">${warn}</p>` : "";
  const before = z.thumb ? `<img class="ba-before" id="ba-before" src="${z.thumb}" alt="Ta photo de cet espace">` : `<div class="ba-empty">Pas de photo pour cet espace</div>`;
  $("esp-apercu").innerHTML = `<div class="ba" id="ba">${before}</div><div class="ap-row"><p class="ap-note" id="ap-note"></p><div class="ap-actions" id="ap-actions"></div></div>`;
};
// Proposition : cartes plantes et budget, reconstruites après chaque composition du moteur.
const SPARK = `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5 C 9.6 6, 12 8.4, 16.5 9 C 12 9.6, 9.6 12, 9 16.5 C 8.4 12, 6 9.6, 1.5 9 C 6 8.4, 8.4 6, 9 1.5 Z" fill="#F3D35B" stroke="#FBF9F3" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
let listOpen = false;
const euro = n => new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", maximumFractionDigits: 0}).format(Math.max(1, Math.round(n)));
function renderProposal(){
  const order = ["arbre","ecran","grimpante","back","mid","front","bulb"];
  const items = combo.map((c, i) => [c, i]).sort((a, b) => order.indexOf(lay(a[0])) - order.indexOf(lay(b[0])));
  const qty = {}; ((lastBudget && lastBudget.rows) || []).forEach(([nom, r, n]) => { qty[nom] = n; });
  const pieds = Object.values(qty).reduce((s, n) => s + n, 0);
  $("esp-rule").innerHTML = combo.length ? `<div class="rule"><span>La proposition</span><i>↕</i><span>${combo.length} plante${combo.length > 1 ? "s" : ""} · ${pieds} pied${pieds > 1 ? "s" : ""}</span></div>` : "";
  if(!combo.length){
    $("esp-plants").innerHTML = `<p class="empty">Aucune plante ne correspond à ces conditions. Ouvre « Ajuster les critères » pour élargir le choix.</p>`;
    $("esp-budget").hidden = true; return;
  }
  renderPlan();
  $("esp-plants").innerHTML = items.map(([c, i]) => {
    const p = c.plant, ph = photoOf(p), [role, col] = ROLE_SHORT[c.role] || [ROLE_LABEL[c.role] || "", ""];
    const [a, b] = unitPrice(p, c.role), n = qty[p.nom] || 1;
    return `<article class="plant">
      ${ph ? `<figure><img src="${ph.src}" alt="${esc(p.nom)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></figure>` : ""}
      <div class="pt">
        <div class="row"><span class="tag ${col}">${esc(role)}</span><span class="qp">${n} × ${euro((a + b) / 2)}</span></div>
        <h4>${esc(p.nom)}</h4><i>${esc(p.latin)}</i>
        <p>${esc(p.note)}</p>
        <p class="plinks"><a href="${photoUrl(p)}" target="_blank" rel="noopener">Photos ↗</a><a href="${shopUrl(p)}" target="_blank" rel="noopener">Où l’acheter ↗</a></p>
        ${c.locked ? "" : `<button class="linkish" type="button" data-rep="${i}">Remplacer cette plante</button>`}
      </div></article>`;
  }).join("");
  const b = lastBudget;
  $("esp-budget").hidden = !b;
  if(b) $("esp-budget").innerHTML = `<div class="bh"><div><span class="eyebrow">Budget estimé</span><strong>${eur0(b.min)} – ${eur0(b.max)}</strong></div>
      <button class="link" type="button" id="buy-toggle" aria-expanded="${listOpen}">${listOpen ? "Masquer la liste" : "Ma liste d’achats"}</button></div>
    ${nurseriesHTML(combo.map(c => c.plant))}
    ${listOpen ? `<ul>${b.rows.map(([nom, r, q]) => { const p = PLANTS.find(x => x.nom === nom); const [x, y] = p ? unitPrice(p, r) : [0, 0];
      return `<li><span>${p ? `<a href="${shopUrl(p)}" target="_blank" rel="noopener">${esc(nom)} ↗</a>` : esc(nom)}<small>${r === "bulbe" ? q + " bulbes" : q + (q > 1 ? " pieds" : " pied")}</small></span><span>${eur0(x * q)} – ${eur0(y * q)}</span></li>`; }).join("")}</ul>
      <p class="bnote">Prix indicatifs de jardinerie et de pépinière, en ${FMT_DESC[state.fmt]}. Hors terre, paillage, livraison et main-d’œuvre.</p>` : ""}`;
}
// Plan de plantation : le plan vu de dessus du moteur, repris sous la proposition.
function renderPlan(){
  const sec = document.querySelector("#out .plan"), box = $("esp-plan");
  if(!sec){ box.innerHTML = ""; box.hidden = true; return; }
  const h = sec.querySelector("h2"), svg = sec.querySelector(".plansvg"), lg = sec.querySelector(".legend");
  const em = h && h.querySelector("em"), name = h ? h.firstChild.textContent.trim() : "Plan de plantation";
  const wide = svg && svg.querySelector("svg") ? (() => { const vb = (svg.querySelector("svg").getAttribute("viewBox") || "0 0 1 1").split(/\s+/).map(Number); return vb[2] / Math.max(1, vb[3]); })() : 1;
  box.hidden = false;
  box.innerHTML = `<div class="sec-head"><h3>${esc(name)}${em ? ` <em>${esc(em.textContent)}</em>` : ""}</h3></div>
    <div class="plan-card"><div class="plansvg" tabindex="0" aria-label="Plan vu de dessus"><div style="min-width:${Math.round(Math.min(1100, Math.max(300, wide * 150)))}px">${svg ? svg.innerHTML.replace(/bedclip/g, "bedclip-esp") : ""}</div></div>
    ${wide > 2.6 ? `<p class="hint">Fais glisser le plan pour le voir en entier.</p>` : ""}
    ${lg ? `<ul class="legend">${lg.innerHTML}</ul>` : ""}</div>
    <p class="hint">Chaque rond montre la place d’une plante adulte. Le fond du plan est la limite (clôture, mur), le bas est le côté allée ou pelouse.</p>`;
}
$("esp-plants").addEventListener("click", e => { const r = e.target.closest("[data-rep]"); if(r) replace(+r.dataset.rep); });
$("esp-budget").addEventListener("click", e => { if(e.target.closest("#buy-toggle")){ listOpen = !listOpen; renderProposal(); } });
$("crit-toggle").addEventListener("click", () => {
  const g = $("crit-grid"), open = g.hidden;
  g.hidden = !open;
  $("crit-toggle").setAttribute("aria-expanded", open);
  $("crit-toggle").textContent = open ? "Masquer les critères" : "Ajuster les critères de cet espace";
  if(open) requestAnimationFrame(() => { if(typeof drawAll === "function") drawAll(); });
});

// ---------- Aperçu sur la photo (Gemini) ----------
// En pause : aucune image n'est demandée à Gemini, l'espace montre seulement la photo d'origine.
const APERCU_PAUSE = true;
let apTok = 0, apTimer = null, apBusy = false;
const AP_NOTE = "Image créée par IA (Gemini, de Google) à partir de ta photo : l’aspect réel variera. Ta photo est envoyée à Google le temps de créer l’image.";
function curZoneObj(){ return ZONES.find(z => z.id === curZone); }
function sigOf(){ return combo.map(c => c.plant.nom).sort().join("|") + "#" + state.age + "#" + state.prof; }
function scheduleApercu(){ clearTimeout(apTimer); apTimer = setTimeout(refreshApercu, 60); }
function baHTML(before, after, illus){
  const b = illus ? `<div class="ba-ill">${ILLU.avant}</div>` : `<img class="ba-before" src="${before}" alt="Ta photo avant les plantations">`;
  const a = illus ? `<div class="ba-after ba-ill" role="img" aria-label="Le même coin une fois planté">${ILLU.apres}</div>` : `<img class="ba-after" src="${after}" alt="Aperçu de l’espace planté">`;
  return `${b}${a}
    <span class="ba-line" aria-hidden="true"></span>
    <span class="ba-lbl l">Avant</span><span class="ba-lbl r">Après</span>
    <input class="ba-range" type="range" min="0" max="100" value="${illus ? 45 : 12}" aria-label="Faire glisser pour comparer avant et après">`;
}
const apBtn = (label, cls) => `<button class="btn ${cls} sm" type="button" id="ap-go">${cls === "ink" ? SPARK : ""}${label}</button>`;
// L'image « après » se crée d'office à la première ouverture d'un espace qui a une photo, puis reste en cache.
const autoTried = new Set();
async function refreshApercu(){
  const tk = ++apTok, z = curZoneObj(), rec = current;
  const actions = $("ap-actions"), note = $("ap-note"), ba = $("ba");
  if(!z || !rec || !actions || apBusy) return;
  if(rec.demo){
    if(!ba.classList.contains("has-after")){ ba.innerHTML = baHTML(null, null, true); ba.classList.add("has-after"); ba.style.setProperty("--pos", "45%"); }
    actions.innerHTML = ""; note.classList.remove("err");
    note.textContent = "Exemple illustré. Avec ta photo, l’image « après » est créée par IA : l’aspect réel variera.";
    return;
  }
  const ph = z.z ? await idb.get(`photo-${rec.id}-${(z.z.photo || 1) - 1}`) : null;
  if(APERCU_PAUSE){
    if(tk !== apTok || !$("ap-actions")) return;
    if(ph && $("ba-before")) $("ba-before").src = `data:image/jpeg;base64,${ph.data}`;
    actions.innerHTML = ""; note.classList.remove("err"); note.textContent = "";
    return;
  }
  const cached = await idb.get(`apercu-${rec.id}-${z.id}`);
  if(tk !== apTok || !$("ap-actions")) return;
  const before = ph ? `data:image/jpeg;base64,${ph.data}` : z.thumb;
  note.classList.remove("err");
  if(cached && before){
    if(!ba.classList.contains("has-after") || ba.dataset.img !== cached.date){
      ba.innerHTML = baHTML(before, cached.image); ba.classList.add("has-after"); ba.dataset.img = cached.date; ba.style.setProperty("--pos", "12%");
    }
    const stale = cached.sig !== sigOf();
    actions.innerHTML = ph && stale ? `<button class="linkish" type="button" id="ap-go">Mettre à jour l’image</button>` : "";
    note.textContent = stale ? "Les plantes ont changé depuis cette image." : AP_NOTE;
  } else if(ph){
    if($("ba-before")) $("ba-before").src = before;
    const key = `${rec.id}-${z.id}`;
    if(!autoTried.has(key)){ autoTried.add(key); actions.innerHTML = ""; note.textContent = AP_NOTE; generateApercu(z, rec, ph); return; }
    actions.innerHTML = `<button class="linkish" type="button" id="ap-go">Créer l’image</button>`;
    note.textContent = AP_NOTE;
  } else {
    actions.innerHTML = "";
    note.textContent = "Refais une analyse de ce coin pour voir les plantations dessinées sur ta photo.";
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
  const note = $("ap-note"), actions = $("ap-actions"), ba = $("ba");
  const qty = {}; ((lastBudget && lastBudget.rows) || []).forEach(([nom, r, n]) => { qty[nom] = n; });
  const payload = {
    photo: ph.data, largeur: ph.w, hauteurPhoto: ph.h,
    emplacement: z.z.emplacement || `${z.z.nom}. ${z.z.description}`,
    profondeur: state.prof, age: state.age, a_garder: z.z.a_garder || [],
    plantes: combo.map(c => ({nom: c.plant.nom, latin: c.plant.latin, type: c.plant.type, couche: lay(c), hauteur: Math.round(heightAt(c.plant, state.age)),
      forme: form(c.plant), fleur: c.plant.bloom ? c.plant.fam : null, argente: leafCols(c.plant) === SILVER, persistant: evergreen(c.plant), quantite: qty[c.plant.nom] || 1}))
  };
  const sig = sigOf();
  apBusy = true; actions.innerHTML = ""; note.classList.remove("err"); note.textContent = "";
  const load = document.createElement("div"); load.className = "ba-load";
  load.innerHTML = `<div class="sprout" aria-hidden="true"><i></i><i></i><i></i></div><p>Création de l’image…</p><small>Compte 15 à 40 secondes.</small>`;
  ba.appendChild(load);
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 80000);
  try{
    const r = await fetch("/api/apercu", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(payload), signal: ctrl.signal});
    const raw = await r.text(); let d = {}; try{ d = JSON.parse(raw); }catch(e){}
    if(!r.ok || !d.image){
      const msg = d.erreur || (r.status === 504 || /TIMEOUT/i.test(raw) ? "La création de l’image a pris trop de temps. Réessaie." : `La création de l’image a échoué (erreur ${r.status}).`);
      throw new Error(msg + (d.detail ? ` Détail technique : ${d.detail}` : ""));
    }
    const image = await shrinkImage(`data:${d.mime || "image/png"};base64,${d.image}`);
    await idb.set(`apercu-${rec.id}-${z.id}`, {sig, image, date: new Date().toISOString()});
  }catch(e){
    apBusy = false; load.remove();
    await refreshApercu();
    const n = $("ap-note"); if(n){ n.textContent = e.name === "AbortError" ? "La création de l’image a pris trop de temps." : e.message === "Failed to fetch" ? "Pas de connexion : l’image n’a pas pu être créée." : e.message; n.classList.add("err"); }
    const a = $("ap-actions"); if(a && ph){ a.innerHTML = `<button class="linkish" type="button" id="ap-go">Réessayer</button>`; $("ap-go").addEventListener("click", () => generateApercu(z, rec, ph)); }
    return;
  }finally{ clearTimeout(to); }
  apBusy = false; load.remove();
  if(curZone === z.id) refreshApercu();
}
// Après chaque recomposition du moteur : proposition et bouton d'aperçu à jour.
const _engineRender = window.render;
window.render = function(){ const out = _engineRender.apply(this, arguments); renderProposal(); scheduleApercu(); return out; };
document.addEventListener("input", e => {
  const r = e.target.closest(".ba-range"); if(r) r.closest(".ba").style.setProperty("--pos", r.value + "%");
});

// ---------- 07 à 09 · Ton jardin ----------
let editing = false, pendingRemove = null;
function spaceStats(rec, z){
  const zd = store.get("app-zones-" + rec.id, {})[z.id];
  const b = zd ? zoneBudget(zd.budget) : null;
  return {plants: zd ? zd.ids.length : null, budget: b};
}
function renderJardin(){
  const list = espaces(), src = demo ? DEMO : null;
  const g = demo ? {label: "Toulouse", clim: "so", sol: "ac", arrosage: "1"} : (garden || {label: "Ton jardin", clim: null, sol: null, arrosage: "1"});
  const last = list.length ? list[list.length - 1].rec.date : null;
  const dt = last ? new Date(last) : null;
  const lbls = [g.label, `${list.length} espace${list.length > 1 ? "s" : ""}`];
  if(dt){ const d = `Mis à jour le ${dt.getDate()} ${MOIS_COURT[dt.getMonth()]}`; if((lbls.join("") + d).length <= 34) lbls.push(d); }
  $("j-rule").innerHTML = `<div class="rule">${lbls.map(l => `<span>${esc(l)}</span>`).join("<i>↕</i>")}</div>`;
  $("j-demo").hidden = !demo;
  $("edit-toggle").hidden = demo || !list.length;
  if(!list.length) editing = false;
  $("s-jardin").classList.toggle("editing", editing);
  $("edit-toggle").textContent = editing ? "Terminer" : "Modifier";
  $("edit-toggle").classList.toggle("done", editing);
  $("j-title").innerHTML = editing ? "Modifier <em>tes espaces</em>" : "Ton <em>jardin</em>";
  $("j-edit-lede").hidden = !editing;
  let nPlants = 0, bmin = 0, bmax = 0, nb = 0;
  const cards = list.map((e, i) => {
    const s = spaceStats(e.rec, e.z), z = e.z;
    if(s.plants) nPlants += s.plants;
    if(s.budget){ bmin += s.budget.min; bmax += s.budget.max; nb++; }
    const ex = EXPO[z.exposition];
    const tags = [ex ? `<span class="tag ${ex[1]}">${ex[0]}</span>` : "", z.hauteur_masquer ? `<span class="tag sauge">Écran ${z.hauteur_masquer} m</span>` : z.profondeur ? `<span class="tag">${(+z.profondeur / 100).toLocaleString("fr-FR")} m</span>` : ""].join("");
    const thumb = e.rec.thumbs && e.rec.thumbs[(z.photo || 1) - 1];
    const vig = thumb ? `<img src="${thumb}" alt="">` : ILLU.minis[i % ILLU.minis.length];
    const meta = s.plants ? `${s.plants} plante${s.plants > 1 ? "s" : ""}${s.budget ? ` · ${eur0(s.budget.min)} – ${eur0(s.budget.max)}` : ""}` : "Proposition à découvrir";
    return `<div class="space-wrap"><button class="space" type="button" data-open="${e.key}" ${editing ? 'tabindex="-1" aria-disabled="true"' : ""}>
        <span class="st"><span class="num">Espace ${i + 1}</span><h4>${esc(z.nom)}</h4><span class="tags">${tags}</span><span class="meta">${meta}</span></span>
        <span class="vig">${vig}</span>
      </button>${editing ? `<button class="rm" type="button" data-rm="${e.key}" aria-label="Retirer l’espace ${esc(z.nom)}">×</button>` : ""}</div>`;
  });
  $("j-spaces").innerHTML = cards.length ? cards.join("") : `<p class="empty">Ton jardin n’a pas encore d’espace. Ajoute un premier coin à planter : une photo suffit.</p>`;
  $("j-sec").hidden = !list.length;
  $("j-count").textContent = list.length;
  $("j-facts").innerHTML = `<div><small>Espaces</small><b>${list.length}</b></div><div><small>Plantes</small><b>${nPlants || "–"}</b></div><div><small>Budget</small><b>${nb ? `${eur0(bmin)} – ${eur0(bmax)}`.replace(/\s?€/, "") : "–"}</b></div>`;
  const cond = [g.clim ? CLIM_LBL[g.clim] : null, g.sol ? `sol ${SOL_LBL[g.sol].toLowerCase()}` : "sol estimé à l’analyse", ARRO_LBL[g.arrosage || "1"]].filter(Boolean).join(" · ");
  $("j-cond").innerHTML = esc(cond) + (demo ? "" : ` · <button class="link" type="button" id="garden-edit">Changer</button>`);
  $("j-add").querySelector("b").textContent = demo ? "Créer ton jardin" : "Ajouter un espace";
  $("j-add").querySelector("small").textContent = "Une photo du coin à planter suffit";
}
$("j-spaces").addEventListener("click", e => {
  const rm = e.target.closest("[data-rm]");
  if(rm){ openSheet(rm.dataset.rm, rm); return; }
  const o = e.target.closest("[data-open]");
  if(o && !editing){ const sp = espaces().find(x => x.key === o.dataset.open); if(sp) openEspace(sp.rec, sp.z.id); }
});
$("j-cond").addEventListener("click", e => { if(e.target.closest("#garden-edit")){ gardenEdit = true; renderGarden(); show("s-garden"); } });
$("edit-toggle").addEventListener("click", () => { editing = !editing; renderJardin(); const f = editing ? $("j-spaces").querySelector(".rm") : $("edit-toggle"); if(f) f.focus(); });
$("j-add").addEventListener("click", () => {
  if(demo){ demo = false; show("s-login"); return; }
  startSpace();
});
// Feuille de confirmation
let sheetReturn = null;
function openSheet(key, from){
  const sp = espaces().find(x => x.key === key); if(!sp) return;
  pendingRemove = sp; sheetReturn = from;
  $("sheet-t").innerHTML = `Retirer <em>${esc(sp.z.nom)}</em> ?`;
  $("sheet").hidden = false;
  $("sheet-ok").focus();
}
function closeSheet(){
  if($("sheet").hidden) return;
  $("sheet").hidden = true; pendingRemove = null;
  if(sheetReturn && document.contains(sheetReturn)) sheetReturn.focus();
}
$("sheet").addEventListener("click", e => { if(e.target.closest("[data-close]")) closeSheet(); });
document.addEventListener("keydown", e => { if(e.key === "Escape" && !$("sheet").hidden) closeSheet(); });
// Le retrait masque l'espace tout de suite ; ses données ne sont effacées qu'à la fermeture du toast, pour qu'« Annuler » rende tout.
let toastTimer = null, toastDone = null;
function hideToast(){ clearTimeout(toastTimer); $("toast").hidden = true; const d = toastDone; toastDone = null; if(d) d(); }
function showToast(msg, undo, done){
  hideToast();
  $("toast-msg").textContent = msg;
  $("toast-undo").hidden = !undo;
  $("toast-undo").onclick = () => { toastDone = null; hideToast(); undo(); };
  toastDone = done; $("toast").hidden = false;
  toastTimer = setTimeout(hideToast, 5000);
}
window.addEventListener("pagehide", () => { if(toastDone) hideToast(); });
$("sheet-ok").addEventListener("click", () => {
  const sp = pendingRemove; if(!sp) return;
  const r = sp.rec, zid = sp.z.id;
  r.removed = [...new Set([...(r.removed || []), zid])];
  saveRecords();
  sheetReturn = null; closeSheet();
  renderJardin();
  const f = $("j-spaces").querySelector(".rm") || $("edit-toggle"); if(f && !f.hidden) f.focus();
  showToast(`« ${sp.z.nom} » est retiré de ton jardin.`, () => {
    r.removed = r.removed.filter(id => id !== zid);
    saveRecords(); renderJardin();
  }, () => {
    const zd = store.get("app-zones-" + r.id, {}); delete zd[zid]; store.set("app-zones-" + r.id, zd);
    idb.delPrefix(`apercu-${r.id}-${zid}`);
    if(r.analysis.zones.every(z => r.removed.includes(z.id))){ dropRecord(r); saveRecords(); renderJardin(); }
  });
});

function openDemo(){
  warmDemo();
  demo = true; editing = false;
  renderJardin(); show("s-jardin");
}

// ---------- Installation ----------
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
let deferred = null;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault(); deferred = e;
  ["install", "install2"].forEach(id => {
    $(id).innerHTML = `<button class="btn secondary sm" type="button" data-install>Installer l’app sur cet appareil</button>`;
    $(id).hidden = false;
  });
});
document.addEventListener("click", async e => {
  if(!e.target.closest("[data-install]") || !deferred) return;
  deferred.prompt(); await deferred.userChoice.catch(() => {}); deferred = null;
  $("install").hidden = true; $("install2").hidden = true;
});
if(isIOS && !standalone){ ["install", "install2"].forEach(id => { $(id).textContent = "Pour l’installer sur iPhone : dans Safari, touche Partager puis « Sur l’écran d’accueil »."; $(id).hidden = false; }); }
if("serviceWorker" in navigator) navigator.serviceWorker.register("/app/sw.js", {scope: "/app/"}).catch(() => {});

// ---------- Exemple ----------
const DEMO = {id: "demo", demo: true, date: "2026-10-23T12:00:00Z", ville: "Toulouse",
  prefs: {sol: "inconnu", arrosage: "1", objectifs: ["massif","isoler"], style: "nat"},
  thumbs: [], removed: [],
  analysis: {
    resume: "Jardin de ville en plein Sud-Ouest, ensoleillé et sec l’été : la pelouse grillée et le laurier-rose en pleine forme le montrent.",
    climat: {zone: "so", explication: "À Toulouse, les étés sont chauds et secs, et les hivers descendent rarement sous −10 °C."},
    sol: {type: "ac", explication: "Le sol est estimé argilo-calcaire, comme souvent dans la région toulousaine."},
    observations: [],
    zones: [
      {id:"z1", nom:"Côté rue, le long de la canisse", photo:1, description:"Bande de pelouse au pied de la canisse qui sépare le jardin de la rue, de part et d’autre d’un palmier.", orientation:"SO", exposition:"s", ensoleillement:"Soleil de la fin de matinée au soir.", humidite:"d", profondeur:"150", longueur:"m", objectifs:["isoler","massif"], hauteur_masquer:"2", a_garder:["le palmier"], attention:["arracher le liseron au pied de la canisse."]},
      {id:"z2", nom:"Allée, côté clôture", photo:1, description:"Étroite bande au pied de la clôture qui longe l’allée.", orientation:"SO", exposition:"s", ensoleillement:"La bande la plus chaude de l’allée.", humidite:"d", profondeur:"60", longueur:"p", objectifs:["massif","mur"], hauteur_masquer:null, a_garder:[], attention:[]},
      {id:"z3", nom:"Allée, côté maison", photo:1, description:"Pied de mur le long de la maison, de l’autre côté de l’allée.", orientation:"NE", exposition:"m", ensoleillement:"Soleil du matin, puis ombre de la maison.", humidite:"f", profondeur:"60", longueur:"p", objectifs:["massif"], hauteur_masquer:null, a_garder:["le robinet"], attention:[]},
      {id:"z4", nom:"Fond, face au balcon", photo:1, description:"Limite du fond, dominée par le balcon d’une maison voisine, derrière un abricotier.", orientation:"SE", exposition:"s", ensoleillement:"Plein soleil presque toute la journée.", humidite:"d", profondeur:"150", longueur:"m", objectifs:["isoler","massif"], hauteur_masquer:"4", a_garder:["l’abricotier","le composteur"], attention:["contenir le bambou avec une barrière anti-rhizomes s’il est traçant."]}
    ]
  }
};
// L'exemple se compose une fois, puis se garde comme un vrai jardin (clé app-zones-demo).
function warmDemo(){
  const have = store.get("app-zones-demo", {});
  if(DEMO.analysis.zones.every(z => have[z.id])) return;
  const saveZ = ZONES, saveK = ZKEY, saveD = zoneData, saveCur = curZone, saveCombo = combo, saveState = JSON.parse(JSON.stringify(state));
  ZONES = DEMO.analysis.zones.map(z => ({id: z.id, label: z.nom, note: z.description, z, thumb: null, st: zoneState(z, DEMO)}));
  ZKEY = "app-zones-demo"; zoneData = have;
  window.__quiet = true;
  for(const z of ZONES) if(!have[z.id]) setZone(z.id);
  window.__quiet = false;
  ZONES = saveZ; ZKEY = saveK; zoneData = saveD; curZone = saveCur; combo = saveCombo; Object.assign(state, saveState);
}

// ---------- Démarrage ----------
// Splash à chaque ouverture, puis l'écran de départ. Un toucher le passe.
const first = homeScreen();
if(first === "s-jardin") renderJardin();
const splash = $("s-ouverture");
splash.querySelectorAll(".illu path, .illu circle").forEach((el, i, all) => {
  if(el.getAttribute("stroke") === "none") return;
  el.setAttribute("pathLength", "1");
  el.style.setProperty("--d", `${(.5 + i / all.length * .9).toFixed(2)}s`);
});
SCREENS.forEach(s => { $(s).hidden = s !== "s-ouverture"; });
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
let splashDone = false;
function endSplash(){
  if(splashDone) return; splashDone = true;
  const go = () => { splash.classList.remove("out"); show(first, false); try{ history.replaceState({s:first}, ""); }catch(e){} };
  if(still) return go();
  splash.classList.add("out"); setTimeout(go, 450);
}
const splashTimer = setTimeout(endSplash, still ? 900 : 2900);
splash.addEventListener("click", () => { clearTimeout(splashTimer); endSplash(); });
})();
