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
// L'entretien prévu ; le moteur s'en sert comme besoin en arrosage des plantes.
const ARRO_OPT = [["1","Très peu","Des plantes qui se débrouillent seules, une fois bien installées (compte un an)."],["2","Un peu","Un arrosage de temps en temps pendant l’été."],["3","Volontiers","Arroser régulièrement l’été ne te fait pas peur."],["nsp","Je ne sais pas encore","On part sur des plantes peu exigeantes ; tu pourras changer plus tard."]];
const ARRO_LBL = {"1":"entretien minimal","2":"un peu d’entretien","3":"entretien régulier","nsp":"entretien à préciser"};
// « Je ne sais pas encore » : le moteur part sur des plantes sans arrosage.
const arroOf = a => a === "nsp" ? "1" : (a || "1");
const OBJ_OPT = [["massif","Habiller mon jardin"],["isoler","M’isoler du voisinage"],["pollin","Attirer abeilles et papillons"],["mur","Habiller un mur ou une clôture"],["refuge","Accueillir oiseaux et insectes"]];
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
const SCREENS = ["s-ouverture","s-login","s-prenom","s-conseils","s-liste","s-compte","s-photo","s-envies","s-garden","s-analyse","s-espace","s-jardin"];
function show(id, push = true){
  SCREENS.forEach(s => { $(s).hidden = s !== id; });
  closeSheet();
  window.scrollTo(0, 0);
  if(push && id !== "s-analyse"){ try{ history.pushState({s:id}, ""); }catch(e){} }
  if(id === "s-espace") requestAnimationFrame(() => { if(typeof drawAll === "function") drawAll(); });
  const f = $(id).querySelector("h1, h2"); if(f){ f.setAttribute("tabindex", "-1"); }
  drawCoach(id);
  drawTabbar(id);
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
function homeScreen(){ return store.get("app-out", false) ? "s-login" : demo || espaces().length ? "s-jardin" : "s-login"; }

// ---------- Aide du premier coin ----------
// Une carte par étape (jardin, photo, envies, diagnostic), affichée une fois, le temps du premier coin d'un nouveau compte.
const COACH = {
  "s-garden": [1, "Décris <em>ton jardin</em>", "Ton projet, ton climat, ton sol et l’entretien que tu veux prévoir orientent le choix des plantes.", `<svg class="illu" aria-hidden="true" width="24" height="32" viewBox="0 0 27.5 36.6667" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4167 23.8333C22.9855 23.8333 27.5 19.3189 27.5 13.75C27.5 8.18113 22.9855 3.66667 17.4167 3.66667C11.8478 3.66667 7.33333 8.18113 7.33333 13.75C7.33333 19.3189 11.8478 23.8333 17.4167 23.8333Z" fill="#D5E3CF"/><path d="M13.75 35.75C4.58333 24.75 0.916667 19.25 0.916667 13.75C0.916667 10.3464 2.26875 7.08218 4.67546 4.67546C7.08218 2.26875 10.3464 0.916667 13.75 0.916667C17.1536 0.916667 20.4178 2.26875 22.8245 4.67546C25.2313 7.08218 26.5833 10.3464 26.5833 13.75C26.5833 19.25 22.9167 24.75 13.75 35.75Z" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M8.25 15.5833C10.0833 8.25 17.4167 6.41667 20.1667 8.25C20.1667 13.75 13.75 19.25 8.25 15.5833ZM8.25 15.5833L16.5 10.0833" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`],
  "s-photo": [2, "Ajoute <em>une photo</em>", "Prends de face le coin à planter. On y repère le soleil qu’il reçoit et la place disponible.", `<svg class="illu" aria-hidden="true" width="44" height="32" viewBox="0 0 40.3333 29.3333" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.6667 24.75C30.7293 24.75 34.8333 20.6459 34.8333 15.5833C34.8333 10.5207 30.7293 6.41667 25.6667 6.41667C20.6041 6.41667 16.5 10.5207 16.5 15.5833C16.5 20.6459 20.6041 24.75 25.6667 24.75Z" fill="#F3D35B"/><path d="M3.66667 6.41667H11L14.6667 0.916667H25.6667L29.3333 6.41667H36.6667C37.396 6.41667 38.0955 6.7064 38.6112 7.22212C39.1269 7.73785 39.4167 8.43732 39.4167 9.16667V25.6667C39.4167 26.396 39.1269 27.0955 38.6112 27.6112C38.0955 28.1269 37.396 28.4167 36.6667 28.4167H3.66667C2.93732 28.4167 2.23785 28.1269 1.72212 27.6112C1.2064 27.0955 0.916667 26.396 0.916667 25.6667V9.16667C0.916667 8.43732 1.2064 7.73785 1.72212 7.22212C2.23785 6.7064 2.93732 6.41667 3.66667 6.41667Z" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M26.5833 16.5C26.5833 20.0438 23.7105 22.9167 20.1667 22.9167C16.6228 22.9167 13.75 20.0438 13.75 16.5C13.75 12.9562 16.6228 10.0833 20.1667 10.0833C23.7105 10.0833 26.5833 12.9562 26.5833 16.5Z" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M33 10.0833H33.9167" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`],
  "s-envies": [3, "Donne <em>tes critères</em>", "Dis-nous ce dont tu rêves pour ce coin : des fleurs, de l’intimité, des abeilles… On choisit les plantes en fonction.", `<svg class="illu" aria-hidden="true" width="32" height="32" viewBox="0 0 18.6 18.6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.05 17.55C1.05 7.05 8.55 1.05 17.55 1.05C17.55 11.55 11.55 17.55 1.05 17.55Z" fill="#D5E3CF" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M1.05 17.55L11.55 7.05" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`],
  "s-espace": [4, "Consulte <em>ton diagnostic</em>", "Voici tes plantes, où les planter et ce que ça coûte. Une plante ne te plaît pas ? Remplace-la d’un geste.", `<svg class="illu" aria-hidden="true" width="26" height="32" viewBox="0 0 28.4167 34.8333" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.5833 4.58333H8.25C7.23748 4.58333 6.41667 5.40414 6.41667 6.41667V30.25C6.41667 31.2625 7.23748 32.0833 8.25 32.0833H26.5833C27.5959 32.0833 28.4167 31.2625 28.4167 30.25V6.41667C28.4167 5.40414 27.5959 4.58333 26.5833 4.58333Z" fill="#F5CDB0"/><path d="M26.5833 6.41667L21.0833 0.916667H0.916667V33.9167H26.5833V6.41667ZM21.0833 0.916667V6.41667H26.5833" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M6.41667 15.5833H13.75M6.41667 21.0833H19.25M6.41667 26.5833H15.5833" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/><path d="M18.3333 17.4167C19.8521 17.4167 21.0833 16.1854 21.0833 14.6667C21.0833 13.1479 19.8521 11.9167 18.3333 11.9167C16.8146 11.9167 15.5833 13.1479 15.5833 14.6667C15.5833 16.1854 16.8146 17.4167 18.3333 17.4167Z" fill="#F2C4C4" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`]
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
  el.innerHTML = `${picto}<div><p class="eyebrow">Ton premier coin · ${n} sur ${Object.keys(COACH).length}</p><h3>${title}</h3><p>${text}</p><button class="link" type="button">J’ai compris</button></div>`;
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
let signup = true;
// Prénom : le narrateur s'en sert pour saluer et accompagner (facultatif, gardé sur le téléphone).
let prenom = store.get("app-prenom", "");
const avec = (debut, fin = "") => prenom ? `${debut}${prenom}${fin}` : "";
// Appareil déjà connu (une connexion passée) : accueil « Te revoilà », e-mail prérempli. Sinon : « Bienvenue », création de compte en avant.
let known = store.get("app-known", null);
const loginErr = msg => { $("login-err").textContent = msg; $("login-err").hidden = !msg; };
function setLoginMode(isSignup){
  signup = isSignup;
  $("login-eyebrow").textContent = signup ? "Bienvenue" : "Bon retour";
  $("login-title").innerHTML = signup ? "Ton jardin,<br><em>planté</em> sur mesure." : `Te <em>revoilà</em>${prenom ? ", " + esc(prenom) : ""} !`;
  $("login-lede").textContent = signup ? "Prends ton jardin en photo. On te propose des plantes qui s’y plairont, et on t’aide à les planter." : "Connecte-toi pour retrouver ton jardin.";
  $("login-google-lbl").textContent = signup ? "Créer mon compte avec Google" : "Continuer avec Google";
  $("login-email-go").textContent = signup ? "Commencer avec mon e-mail" : "Se connecter avec un e-mail";
  $("login-submit").textContent = signup ? "Créer mon compte" : "Se connecter";
  $("login-pass").autocomplete = signup ? "new-password" : "current-password";
  $("login-pass").placeholder = signup ? "Choisis un mot de passe" : "Ton mot de passe";
  $("login-pass-help").hidden = !signup;
  $("login-forgot").hidden = signup;
  $("login-switch-q").textContent = signup ? "Tu as déjà un compte ?" : "Pas encore de compte ?";
  $("login-switch").textContent = signup ? "Se connecter" : "Créer un compte";
  if(!signup && known && known !== "google" && !$("login-email").value) $("login-email").value = known;
  loginErr("");
}
// Deux choix d'abord (Google, e-mail) ; le formulaire ne s'ouvre qu'au choix de l'e-mail.
function loginForm(open){
  $("login-form").hidden = !open;
  $("login-google").hidden = open; $("login-email-go").hidden = open;
  loginErr("");
  if(open) ($("login-email").value ? $("login-pass") : $("login-email")).focus(); else $("login-email-go").focus();
}
$("login-email-go").addEventListener("click", () => loginForm(true));
$("login-back").addEventListener("click", () => loginForm(false));
$("login-switch").addEventListener("click", () => setLoginMode(!signup));
setLoginMode(!known);
if(known && known !== "google") loginForm(true);
$("login-show").addEventListener("click", () => {
  const on = $("login-pass").type === "password";
  $("login-pass").type = on ? "text" : "password";
  $("login-show").textContent = on ? "Masquer" : "Afficher";
  $("login-show").setAttribute("aria-pressed", on);
});
// Compte existant : sa page Ton jardin, même vide. Nouveau compte : son premier coin, guidé par les cartes d'aide.
function afterLogin(isNew, who){
  loginErr("");
  known = who || "google"; store.set("app-known", known); store.del("app-out");
  if(isNew){ startCoach(); openPrenom(false); } else { renderJardin(); show("s-jardin"); }
}
// Maquette : sans service branché, le mode de l'écran (inscription ou retour) décide.
$("login-google").addEventListener("click", () => afterLogin(signup, "google"));
$("login-forgot").addEventListener("click", () => {
  const ok = /^\S+@\S+\.\S+$/.test($("login-email").value.trim());
  loginErr(ok ? "" : "Saisis ton e-mail, on t’enverra un lien pour choisir un nouveau mot de passe.");
  if(!ok) $("login-email").focus();
});
$("login-form").addEventListener("submit", e => {
  e.preventDefault();
  if(LOGIN_LIBRE) return afterLogin(signup, $("login-email").value.trim() || "google");
  const email = $("login-email").value.trim(), pass = $("login-pass").value;
  $("login-email").removeAttribute("aria-invalid"); $("login-pass").removeAttribute("aria-invalid");
  if(!/^\S+@\S+\.\S+$/.test(email)){ loginErr("Saisis une adresse e-mail valide, par exemple toi@exemple.fr."); $("login-email").setAttribute("aria-invalid", "true"); $("login-email").focus(); return; }
  if(signup ? pass.length < 8 : !pass){ loginErr(signup ? "Choisis un mot de passe d’au moins 8 caractères." : "Saisis ton mot de passe."); $("login-pass").setAttribute("aria-invalid", "true"); $("login-pass").focus(); return; }
  afterLogin(signup, email);
});

// 01 · Ton prénom : après la création du compte, ou depuis Mon compte pour le changer.
let prenomEdit = false;
function openPrenom(edit){
  prenomEdit = edit;
  $("prenom").value = prenom; $("prenom-next").disabled = !prenom;
  $("prenom-next").textContent = edit ? "Enregistrer" : "Continuer";
  $("prenom-skip").hidden = edit; $("prenom-back").hidden = !edit;
  show("s-prenom");
}
function afterPrenom(){ if(prenomEdit){ renderCompte(); show("s-compte"); } else startSpace(); }
$("prenom").addEventListener("input", () => { $("prenom-next").disabled = !$("prenom").value.trim(); });
$("prenom-form").addEventListener("submit", e => {
  e.preventDefault();
  const v = $("prenom").value.trim(); if(!v) return;
  prenom = v.charAt(0).toUpperCase() + v.slice(1); store.set("app-prenom", prenom); afterPrenom();
});
$("prenom-skip").addEventListener("click", afterPrenom);
$("prenom-back").addEventListener("click", afterPrenom);

// ---------- Parcours : projet (la première fois) → photo → envies → terrain (la première fois) → analyse ----------
// Type de projet, choisi une fois pour tout le jardin ; le moteur réserve le balcon aux plantes en pot.
const PROJET_OPT = [["ville","Un jardin de ville","Une cour ou un petit jardin, entouré de murs et de voisins."],["terrain","Un terrain","Un jardin plus vaste, autour d’une maison ou à la campagne."],["balcon","Un balcon ou une terrasse","Des plantes en pots et en jardinières."]];
const PROJET_LBL = {ville:"jardin de ville", terrain:"terrain", balcon:"balcon ou terrasse"};
let projet = store.get("app-projet", null);
let flowGarden = false;    // l'étape Ton jardin ouvre le parcours en cours (premier coin)
// Étapes nommées : faites (coche), en cours, à venir, puis « Tes plantes », où mène le parcours.
// Ton jardin (projet, climat, sol, entretien) ouvre le premier coin ; les espaces suivants commencent à la photo.
const stepNames = () => [...(flowGarden ? ["Ton jardin"] : []), "Ta photo", "Tes envies"];
const STEP_DONE = `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 19.3333 19.3333" fill="none"><path d="M9.66667 18.5556C14.5759 18.5556 18.5556 14.5759 18.5556 9.66667C18.5556 4.75747 14.5759 0.777778 9.66667 0.777778C4.75747 0.777778 0.777778 4.75747 0.777778 9.66667C0.777778 14.5759 4.75747 18.5556 9.66667 18.5556Z" fill="#D5E3CF" stroke-width="1.55556" stroke="#1C1C1A"/><path d="M5.77778 9.88889L8.55556 12.5556L13.6667 7" stroke-width="1.77778" stroke-linecap="round" stroke-linejoin="round" stroke="#1C1C1A"/></svg>`;
function setProgress(id, cur){
  const names = stepNames(), n = names.indexOf(cur) + 1;
  $(id).innerHTML = names.map((name, i) => {
    const st = i < n - 1 ? "done" : i === n - 1 ? "cur" : "todo";
    return `<li class="${st}"${st === "cur" ? ' aria-current="step"' : ""}>${st === "done" ? STEP_DONE : '<i aria-hidden="true"></i>'}${name}${st === "done" ? '<span class="sr"> (faite)</span>' : ""}</li>`;
  }).join("") + `<li class="goal"><i aria-hidden="true"></i>Tes plantes</li>`;
}
function startSpace(){
  demo = false; photo = null; flowGarden = !garden || !projet;
  const home = espaces().length ? ["s-jardin", "Ton jardin"] : ["s-login", "Accueil"];
  $("photo-back").dataset.go = flowGarden ? "s-garden" : home[0];
  $("photo-back").querySelector("span").textContent = flowGarden ? "Ton jardin" : home[1];
  renderPhoto();
  if(flowGarden){ gardenEdit = false; renderGarden(); show("s-garden"); } else show("s-photo");
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
  setProgress("pg-photo", "Ta photo");
  const canMeasure = "DeviceOrientationEvent" in window;
  const p = photo;
  $("ph-card").innerHTML = p ? `<article class="ph">
    <div class="ph-top"><img src="${p.thumb}" alt="Ta photo du coin à planter">
      <div class="ph-side">
        <label class="ph-q" for="dir">Ton coin regarde vers…</label><span class="ph-hint">Le nord, le sud… Cela change le soleil qu’il reçoit.</span>
        <select id="dir">
          <option value="" ${!p.direction ? "selected" : ""}>Je ne sais pas</option>
          ${DIRS.map(d => `<option value="${d}" ${p.direction === d ? "selected" : ""}>${DIR_LONG[d].charAt(0).toUpperCase() + DIR_LONG[d].slice(1)}</option>`).join("")}
        </select>
      </div>
      <button class="ph-del" type="button" id="ph-del" aria-label="Retirer la photo">×</button>
    </div>
    <div class="ph-name"><label class="ph-q" for="ph-nom">Son nom</label>
      <input id="ph-nom" type="text" maxlength="40" autocomplete="off" placeholder="Par exemple : le long de la clôture" value="${esc(p.nom || "")}" aria-describedby="ph-nom-hint">
      <span class="ph-hint" id="ph-nom-hint">Facultatif : si tu laisses vide, on lui en trouve un.</span></div>
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
$("ph-card").addEventListener("input", e => { if(e.target.id === "note") photo.note = e.target.value; if(e.target.id === "ph-nom") photo.nom = e.target.value; });
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
      try{ if(await DeviceOrientationEvent.requestPermission() !== "granted") return noCompass("Pas de souci, choisis simplement dans la liste. Si tu ne sais pas, laisse « Je ne sais pas » : on l’estimera sur la photo."); }
      catch(e){ return noCompass("Pas de souci, choisis simplement dans la liste. Si tu ne sais pas, laisse « Je ne sais pas » : on l’estimera sur la photo."); }
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
  const t = setTimeout(() => { if(!dir) noCompass("Ce téléphone n’a pas de boussole. Choisis dans la liste, ou laisse « Je ne sais pas » : on l’estimera sur la photo."); }, 4000);
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
  box.innerHTML = `<b>Tes autres coins sont en ${esc(name)}.</b> Garder la même ambiance donne un jardin harmonieux, mais c’est toi qui choisis. <button class="linkish" type="button" id="a-style-back">Revenir au ${esc(name)}</button>`;
  $("a-style-back").addEventListener("click", () => { envies.style = ref; store.set("app-envies", envies); drawStyle(); styleHint(); });
}
styleHint();
function renderEnvies(){
  setProgress("pg-envies", "Tes envies");
  $("env-err").hidden = true;
  styleWarn();
}
$("env-next").addEventListener("click", () => runAnalyse("env-err", "s-envies"));

// 01 · Ton jardin : projet, climat, sol, entretien, donnés une fois. Le code postal aide à trouver le climat.
let gdraft = {};
// « Je ne sais pas » (nsp) est une réponse à part entière : climat déduit à l'analyse, sol estimé, entretien minimal.
const NSP = ["nsp", "Je ne sais pas"];
const CLIM_OPT = [...Object.entries(CLIM_LBL), NSP];
const drawClim = appChips("a-clim", CLIM_OPT, "single", () => gdraft.clim, v => { gdraft.clim = v; gardenReady(); });
const drawSol = appChips("a-sol", [...SOL_OPT, NSP], "single", () => gdraft.sol || "nsp", v => { gdraft.sol = v === "nsp" ? null : v; });
function drawArro(){
  $("a-arro").innerHTML = ARRO_OPT.map(([v, t, d]) => `<label class="choice"><input type="radio" name="a-arro" value="${v}" ${gdraft.arrosage === v ? "checked" : ""}><span><b>${esc(t)}</b><small>${esc(d)}</small></span></label>`).join("");
}
$("a-arro").addEventListener("change", e => { gdraft.arrosage = e.target.value; });
// Code postal → département (Corse : 200-201 Corse-du-Sud, 202-206 Haute-Corse) → climat.
function deptFromCp(cp){
  if(!/^\d{5}$/.test(cp)) return null;
  const code = cp.startsWith("20") ? (+cp.slice(0, 3) <= 201 ? "2A" : "2B") : cp.slice(0, 2);
  return DEPTS.find(x => x[0] === code) || null;
}
function cpHelp(){
  const cp = $("cp").value.trim(), d = deptFromCp(cp);
  $("cp-help").textContent = d ? `${d[1]} · ${CLIM_LBL[d[2]]}` : cp.length === 5 ? "Code inconnu" : "";
  return d;
}
$("cp").addEventListener("input", () => {
  const d = cpHelp();
  if(d){ Object.assign(gdraft, {clim: d[2], dept: d[0], label: d[1], cp: $("cp").value.trim()}); drawClim(); gardenReady(); }
});
function drawProjet(){
  $("a-projet").innerHTML = PROJET_OPT.map(([v, t, d]) => `<label class="choice"><input type="radio" name="a-projet" value="${v}" ${gdraft.projet === v ? "checked" : ""}><span><b>${esc(t)}</b><small>${esc(d)}</small></span></label>`).join("");
}
$("a-projet").addEventListener("change", e => { gdraft.projet = e.target.value; $("garden-sol").hidden = gdraft.projet === "balcon"; gardenReady(); });
// Bouton inactif tant que le projet et le climat (les deux choix obligatoires) ne sont pas donnés.
const gardenReady = () => { $("garden-next").disabled = !gdraft.clim || !gdraft.projet; };
function renderGarden(){
  gdraft = Object.assign({sol: null, arrosage: "1"}, garden || {});
  if(garden && !garden.clim) gdraft.clim = "nsp";
  $("cp").value = gdraft.cp || "";
  gdraft.projet = projet;
  cpHelp(); drawProjet(); drawClim(); drawSol(); drawArro();
  $("garden-sol").hidden = gdraft.projet === "balcon";
  $("step-garden").hidden = !gardenEdit;
  $("pg-garden").hidden = gardenEdit; if(!gardenEdit) setProgress("pg-garden", "Ton jardin");
  const home = gardenEdit || espaces().length ? ["s-jardin", "Ton jardin"] : ["s-login", "Accueil"];
  $("garden-back").dataset.go = home[0];
  $("garden-back").querySelector("span").textContent = home[1];
  $("garden-lede").textContent = gardenEdit ? "Ces réglages servent aux prochains coins que tu ajouteras." : `${avec("Bienvenue, ", ". ")}Quelques questions sur ton jardin, une seule fois. Elles nous aident à choisir des plantes qui vivront longtemps chez toi.`;
  $("garden-privacy").hidden = true;
  $("garden-next").textContent = gardenEdit ? "Enregistrer" : "Continuer";
  $("gar-err").hidden = true;
  gardenReady();
}
$("garden-next").addEventListener("click", () => {
  if(!gdraft.clim || !gdraft.projet) return;
  // Le département n'est gardé que s'il correspond au climat retenu.
  const clim = gdraft.clim === "nsp" ? null : gdraft.clim;
  const d = gdraft.dept && clim ? DEPTS.find(x => x[0] === gdraft.dept && x[2] === clim) : null;
  garden = {label: d ? d[1] : clim ? `Climat ${CLIM_LBL[clim].toLowerCase()}` : "Ton jardin", dept: d ? d[0] : null, cp: d ? gdraft.cp : null, clim, sol: gdraft.sol || null, arrosage: gdraft.arrosage || "1"};
  store.set("app-garden", garden);
  projet = gdraft.projet; store.set("app-projet", projet);
  if(gardenEdit){ renderJardin(); show("s-jardin"); return; }
  renderPhoto(); show("s-photo");
});

// ---------- 04 · Analyse ----------
const STEPS = ["Lecture de la photo","On repère les coins à planter","On mesure le soleil que reçoit chaque coin","Estimation de la place disponible","On choisit tes plantes"];
function drawSteps(k){ $("an-steps").innerHTML = STEPS.map((s, i) => `<li class="${i < k ? "done" : i === k ? "now" : ""}"><i></i>${s}</li>`).join(""); }
async function runAnalyse(errId, back){
  const err = msg => { $(errId).textContent = msg; $(errId).hidden = !msg; };
  err("");
  if(!photo){ show("s-photo"); return; }
  show("s-analyse");
  $("an-wait").textContent = `On regarde ta photo avec attention${avec(", ")}. Compte une demi-minute, tu peux poser ton téléphone.`;
  let k = 0; drawSteps(0);
  const tick = setInterval(() => { k = Math.min(k + 1, STEPS.length - 1); drawSteps(k); }, 7000);
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 90000);
  const objectifs = [...new Set(envies.objectifs)];
  const ville = garden.dept ? `${garden.label} (${garden.dept})` : garden.clim ? garden.label : "";
  try{
    const r = await fetch("/api/analyse", {method:"POST", headers:{"content-type":"application/json"}, signal: ctrl.signal,
      body: JSON.stringify({ville, projet, sol: garden.sol || "inconnu", arrosage: arroOf(garden.arrosage), objectifs, style: envies.style,
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
    const rec = {id: Date.now().toString(36), date: new Date().toISOString(), ville, prefs: {projet: projet || "jardin", sol: garden.sol || "inconnu", arrosage: arroOf(garden.arrosage), objectifs, style: envies.style}, analysis: d, thumbs: [photo.thumb], removed: []};
    if(!garden.clim && d.climat){ garden.clim = d.climat.zone; store.set("app-garden", garden); }
    // Le nom donné par la personne prime sur celui de l'analyse ; une photo découpée en plusieurs coins les numérote.
    const nom = (photo.nom || "").trim();
    if(nom) d.zones.forEach((z, i) => { z.nom = d.zones.length > 1 ? `${nom} · ${i + 1}` : nom; });
    records.push(rec);
    while(records.length > 24){ dropRecord(records[0]); }
    await idb.set(`photo-${rec.id}-0`, {data: photo.data, w: photo.w, h: photo.h});
    saveRecords();
    photo = null; demo = false;
    openEspace(rec, d.zones[0].id);
  }catch(e){
    show(back);
    err(e.name === "AbortError" ? "L’analyse a été plus longue que prévu. Ta photo est toujours là : réessaie dans un instant." : "La connexion semble coupée. Rien n’est perdu : réessaie quand le réseau revient.");
  }finally{ clearInterval(tick); clearTimeout(to); }
}
function dropRecord(r){
  records = records.filter(x => x !== r);
  store.del("app-zones-" + r.id); idb.delPrefix("photo-" + r.id + "-"); idb.delPrefix("apercu-" + r.id + "-");
}

// Renommer le coin ouvert, depuis sa fiche.
function renameOpen(open){
  $("esp-rename-form").hidden = !open; $("esp-rename").hidden = open; $("esp-title").hidden = open;
  if(open){ $("esp-nom").value = (curZoneObj() || {}).label || ""; $("esp-nom").focus(); $("esp-nom").select(); }
  else $("esp-rename").focus();
}
$("esp-rename").addEventListener("click", () => renameOpen(true));
$("esp-rename-cancel").addEventListener("click", () => renameOpen(false));
$("esp-rename-form").addEventListener("submit", e => {
  e.preventDefault();
  const nom = $("esp-nom").value.trim(), zo = curZoneObj(); if(!nom || !zo || !current) return renameOpen(false);
  const z = current.analysis.zones.find(x => x.id === zo.id); if(z) z.nom = nom;
  zo.label = nom; saveRecords();
  renderZoneDetail(zo); renameOpen(false); showToast("C’est noté, ton coin s’appelle maintenant « " + nom + " ».");
});

// ---------- 06 · Un espace ----------
function zoneState(z, rec){
  const p = rec.prefs || {}, a = rec.analysis;
  let obj = (z.objectifs && z.objectifs.length ? z.objectifs : ["massif"]).map(o => o === "refuge" ? "pollin" : o).filter(o => ["massif","isoler","pollin","mur"].includes(o));
  if(!obj.length) obj = ["massif"];
  return {obj: [...new Set(obj)], haut: z.hauteur_masquer || "2", vite: obj.includes("isoler") ? "rapide" : "tout", prof: z.profondeur, expo: z.exposition,
    sol: p.sol && p.sol !== "inconnu" ? p.sol : a.sol.type, eau: z.humidite, clim: a.climat.zone, taille: z.longueur,
    pal: "all", types: BASE_TYPES, arro: p.arrosage || "1", style: p.style || "libre", age: "3", projet: p.projet || "jardin"};
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
  $("esp-num").textContent = idx >= 0 ? `Coin ${idx + 1} sur ${list.length}` : "";
  $("esp-demo").hidden = !rec.demo;
  $("esp-rename").hidden = !!rec.demo; $("esp-rename-form").hidden = true;
  $("esp-back").dataset.go = "s-jardin";
  $("crit-grid").hidden = true; $("crit-toggle").setAttribute("aria-expanded", "false"); $("crit-toggle").textContent = "Modifier mes critères"; listOpen = false;
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
  const before = z.thumb ? `<img class="ba-before" id="ba-before" src="${z.thumb}" alt="Ta photo de ce coin">` : `<div class="ba-empty">Pas de photo pour ce coin</div>`;
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
  $("esp-rule").innerHTML = combo.length ? `<div class="rule"><span>La proposition</span><i>↕</i><span>${combo.length} plante${combo.length > 1 ? "s" : ""} · ${pieds} plant${pieds > 1 ? "s" : ""}</span></div>` : "";
  if(!combo.length){
    $("esp-plants").innerHTML = `<p class="empty">Ce coin est exigeant : aucune plante ne coche toutes les cases. Assouplis un critère, on trouvera.</p>`;
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
        ${ph ? `<small class="credit">${creditHTML(ph)}</small>` : ""}
        <p class="plinks"><a href="${photoUrl(p)}" target="_blank" rel="noopener">Photos ↗</a><a href="${shopUrl(p)}" target="_blank" rel="noopener">Où l’acheter ↗</a></p>
        ${c.locked ? "" : `<button class="linkish" type="button" data-rep="${i}">Remplacer cette plante</button>`}
      </div></article>`;
  }).join("") + glossary(combo.map(c => c.plant.type));
  const b = lastBudget;
  $("esp-budget").hidden = !b;
  if(b) $("esp-budget").innerHTML = `<div class="bh"><div><span class="eyebrow">Budget estimé</span><strong>${eur0(b.min)} – ${eur0(b.max)}</strong></div>
      <button class="link" type="button" id="buy-toggle" aria-expanded="${listOpen}">${listOpen ? "Masquer la liste" : "Ma liste pour la jardinerie"}</button></div>
    ${listOpen ? `<ul>${b.rows.map(([nom, r, q]) => { const p = PLANTS.find(x => x.nom === nom); const [x, y] = p ? unitPrice(p, r) : [0, 0];
      return `<li><span>${p ? `<a href="${shopUrl(p)}" target="_blank" rel="noopener">${esc(nom)} ↗</a>` : esc(nom)}<small>${r === "bulbe" ? q + " bulbes" : q + (q > 1 ? " plants" : " plant")}</small></span><span>${eur0(x * q)} – ${eur0(y * q)}</span></li>`; }).join("")}</ul>
      <p class="bnote">Prix indicatifs de jardinerie et de pépinière, en ${FMT_DESC[state.fmt]}. Hors terre, paillage, livraison et main-d’œuvre.</p>` : ""}`;
}
// Les mots du jardin : une explication courte des types de plantes présents dans la proposition.
const GLOSSAIRE = [["vivace", "Vivace", "une plante qui repousse chaque année, sans la replanter"], ["graminee", "Graminée", "une touffe de fines feuilles, comme une herbe haute, qui bouge au vent"], ["couvre-sol", "Couvre-sol", "une plante basse qui s’étale et limite les mauvaises herbes"], ["bulbe", "Bulbe", "un oignon à planter en automne, qui fleurit au printemps"], ["grimpante", "Grimpante", "une plante qui monte le long d’un mur ou d’une clôture"]];
function glossary(types){
  const items = GLOSSAIRE.filter(([t]) => types.includes(t)).map(([, w, d]) => `<li><b>${w}</b> : ${d}.</li>`);
  return `<div class="glossary"><p><b>Fond, milieu, devant</b> : où planter chaque plante, les plus hautes au fond, les plus basses devant.</p>${items.length ? `<ul>${items.join("")}</ul>` : ""}</div>`;
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
    <p class="hint">Chaque rond, c’est la place d’une plante une fois grande. En haut : le fond (mur, clôture). En bas : le côté où tu passes.</p>`;
}
$("esp-plants").addEventListener("click", e => { const r = e.target.closest("[data-rep]"); if(r) replace(+r.dataset.rep); });
$("esp-budget").addEventListener("click", e => { if(e.target.closest("#buy-toggle")){ listOpen = !listOpen; renderProposal(); } });
$("crit-toggle").addEventListener("click", () => {
  const g = $("crit-grid"), open = g.hidden;
  g.hidden = !open;
  $("crit-toggle").setAttribute("aria-expanded", open);
  $("crit-toggle").textContent = open ? "Masquer mes critères" : "Modifier mes critères";
  if(open) requestAnimationFrame(() => { if(typeof drawAll === "function") drawAll(); });
});

// ---------- Aperçu sur la photo (Gemini) ----------
// true : aucune image n'est demandée à Gemini, l'espace montre seulement la photo d'origine.
const APERCU_PAUSE = false;
let apTok = 0, apTimer = null, apBusy = false;
const AP_NOTE = "Image créée par IA (Gemini, de Google) à partir de ta photo : l’aspect réel variera. Ta photo est envoyée à Google le temps de créer l’image.";
function curZoneObj(){ return ZONES.find(z => z.id === curZone); }
function sigOf(){ return combo.map(c => c.plant.nom).sort().join("|") + "#" + state.age + "#" + state.prof; }
function scheduleApercu(){ clearTimeout(apTimer); apTimer = setTimeout(refreshApercu, 60); }
function baHTML(before, after, illus){
  const b = illus ? `<div class="ba-ill">${ILLU.avant}</div>` : `<img class="ba-before" src="${before}" alt="Ta photo avant les plantations">`;
  const a = illus ? `<div class="ba-after ba-ill" role="img" aria-label="Le même coin une fois planté">${ILLU.apres}</div>` : `<img class="ba-after" src="${after}" alt="Aperçu du coin planté">`;
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
// Photo d'un coin : celle prise par la personne, sinon celle de sa première plante.
function spacePhoto(e){
  const thumb = e.rec.thumbs && e.rec.thumbs[(e.z.photo || 1) - 1];
  if(thumb) return thumb;
  const zd = store.get("app-zones-" + e.rec.id, {})[e.z.id];
  for(const [nom] of (zd && zd.ids) || []){ const p = PLANTS.find(x => x.nom === nom), ph = p && photoOf(p); if(ph) return ph.src; }
  return null;
}
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
  const lbls = [g.label, `${list.length} coin${list.length > 1 ? "s" : ""}`];
  if(dt){ const d = `Mis à jour le ${dt.getDate()} ${MOIS_COURT[dt.getMonth()]}`; if((lbls.join("") + d).length <= 34) lbls.push(d); }
  $("j-rule").innerHTML = `<div class="rule">${lbls.map(l => `<span>${esc(l)}</span>`).join("<i>↕</i>")}</div>`;
  $("j-demo").hidden = !demo;
  $("edit-toggle").hidden = demo || !list.length;
  if(!list.length) editing = false;
  $("s-jardin").classList.toggle("editing", editing);
  $("edit-toggle").textContent = editing ? "Terminer" : "Modifier";
  $("edit-toggle").classList.toggle("done", editing);
  $("j-hello").textContent = avec("Bonjour "); $("j-hello").hidden = !prenom || editing || demo;
  // Carte du jardin : la photo du dernier coin (ou d'une de ses plantes) ; un jardin vide montre un exemple à remplacer.
  const heroPic = [...list].reverse().map(spacePhoto).find(Boolean);
  $("j-ill").innerHTML = heroPic ? `<img src="${heroPic}" alt="Ton jardin" referrerpolicy="no-referrer">`
    : `<img src="/photos/style-nat.jpg" alt=""><div class="ill-veil"><button class="btn cream sm" type="button" id="j-add-photo">Ajoute ta propre photo</button></div>`;
  $("j-title").innerHTML = editing ? "Modifier <em>tes coins</em>" : "Ton <em>jardin</em>";
  $("j-edit-lede").hidden = !editing;
  let nPlants = 0, bmin = 0, bmax = 0, nb = 0;
  const cards = list.map((e, i) => {
    const s = spaceStats(e.rec, e.z), z = e.z;
    if(s.plants) nPlants += s.plants;
    if(s.budget){ bmin += s.budget.min; bmax += s.budget.max; nb++; }
    const ex = EXPO[z.exposition];
    const tags = [ex ? `<span class="tag ${ex[1]}">${ex[0]}</span>` : "", z.hauteur_masquer ? `<span class="tag sauge">Écran ${z.hauteur_masquer} m</span>` : z.profondeur ? `<span class="tag">${(+z.profondeur / 100).toLocaleString("fr-FR")} m</span>` : ""].join("");
    const pic = spacePhoto(e);
    const vig = `<img src="${pic || "/photos/style-nat.jpg"}" alt="" loading="lazy" referrerpolicy="no-referrer">`;
    const meta = s.plants ? `${s.plants} plante${s.plants > 1 ? "s" : ""}${s.budget ? ` · ${eur0(s.budget.min)} – ${eur0(s.budget.max)}` : ""}` : "Proposition à découvrir";
    return `<div class="space-wrap"><button class="space" type="button" data-open="${e.key}" ${editing ? 'tabindex="-1" aria-disabled="true"' : ""}>
        <span class="st"><span class="num">Coin ${i + 1}</span><h4>${esc(z.nom)}</h4><span class="tags">${tags}</span><span class="meta">${meta}</span></span>
        <span class="vig">${vig}</span>
      </button>${editing ? `<button class="rm" type="button" data-rm="${e.key}" aria-label="Retirer le coin ${esc(z.nom)}">×</button>` : ""}</div>`;
  });
  $("j-spaces").innerHTML = cards.length ? cards.join("") : `<p class="empty">Ton jardin attend son premier coin. Commence par une photo, on s’occupe du reste.</p>`;
  $("j-sec").hidden = !list.length;
  $("j-count").textContent = list.length;
  $("j-facts").innerHTML = `<div><small>Coins</small><b>${list.length}</b></div><div><small>Plantes</small><b>${nPlants || "–"}</b></div><div><small>Budget</small><b>${nb ? `${eur0(bmin)} – ${eur0(bmax)}`.replace(/\s?€/, "") : "–"}</b></div>`;
  const cond = [!demo && projet ? PROJET_LBL[projet].charAt(0).toUpperCase() + PROJET_LBL[projet].slice(1) : null, g.clim ? CLIM_LBL[g.clim] : null, g.sol ? `terre ${SOL_LBL[g.sol].toLowerCase()}` : "terre estimée à l’analyse", ARRO_LBL[g.arrosage || "1"]].filter(Boolean).join(" · ");
  $("j-cond").innerHTML = esc(cond) + (demo ? "" : ` · <button class="link" type="button" id="garden-edit">Changer</button>`);
  $("j-add").querySelector("b").textContent = demo ? "Créer ton jardin" : "Ajouter un coin";
  $("j-add").querySelector("small").textContent = "Une photo du coin à planter suffit";
}
$("j-ill").addEventListener("click", e => { if(e.target.closest("#j-add-photo")){ if(demo){ demo = false; show("s-login"); } else startSpace(); } });
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

// ---------- Menu : Mon jardin, Mes conseils, Ma liste, Mon compte ----------
const TABS = ["s-jardin", "s-conseils", "s-liste", "s-compte"];
function drawTabbar(id){
  const on = TABS.includes(id) && !demo;
  $("tabbar").hidden = !on; document.body.classList.toggle("has-tabbar", on);
  for(const b of $("tabbar").querySelectorAll("[data-tab]")){ if(b.dataset.tab === id) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); }
}
$("tabbar").addEventListener("click", e => {
  const b = e.target.closest("[data-tab]"); if(!b) return;
  editing = false;
  ({"s-jardin": renderJardin, "s-conseils": renderConseils, "s-liste": renderListe, "s-compte": renderCompte})[b.dataset.tab]();
  show(b.dataset.tab);
});
// Compose en silence les coins jamais ouverts, pour que la liste et les conseils comptent toutes leurs plantes.
function composeAll(){
  const saveZ = ZONES, saveK = ZKEY, saveD = zoneData, saveCur = curZone, saveCombo = combo, saveState = JSON.parse(JSON.stringify(state));
  window.__quiet = true;
  for(const rec of records){
    const key = "app-zones-" + rec.id, have = store.get(key, {});
    const todo = rec.analysis.zones.filter(z => !(rec.removed || []).includes(z.id) && !have[z.id]);
    if(!todo.length) continue;
    ZONES = todo.map(z => ({id: z.id, label: z.nom, note: z.description, z, thumb: null, st: zoneState(z, rec)}));
    ZKEY = key; zoneData = have;
    for(const z of ZONES) setZone(z.id);
  }
  window.__quiet = false;
  ZONES = saveZ; ZKEY = saveK; zoneData = saveD; curZone = saveCur; combo = saveCombo; Object.assign(state, saveState);
}
// Toutes les plantes du jardin, regroupées : quantité totale et coins où elles sont prévues.
function gardenPlants(){
  if(!demo) composeAll();
  const out = new Map();
  for(const e of espaces()){
    const zd = store.get((demo ? "app-zones-demo" : "app-zones-" + e.rec.id), {})[e.z.id];
    if(!zd || !zd.budget) continue;
    for(const [nom, r, q] of zd.budget.rows){
      const p = PLANTS.find(x => x.nom === nom); if(!p) continue;
      const o = out.get(nom) || {p, role: r, q: 0, coins: []};
      o.q += q; if(!o.coins.includes(e.z.nom)) o.coins.push(e.z.nom); out.set(nom, o);
    }
  }
  return [...out.values()];
}

// 10 · Mes conseils : ce qu'il y a à faire ce mois-ci, d'après les plantes du jardin.
const MOIS_NOM = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
function renderConseils(){
  const m = new Date().getMonth() + 1;
  $("c-mois").textContent = `En ${MOIS_NOM[m - 1]}`;
  $("c-lede").textContent = `${avec("", ", voici ce")}${prenom ? "" : "Ce"} qu’il y a à faire ce mois-ci, pour les plantes de ton jardin.`;
  const P = gardenPlants().map(o => o.p);
  if(!P.length){ $("c-list").innerHTML = `<p class="empty">Ajoute un premier coin : chaque mois, on te dira simplement quoi faire pour tes plantes.</p>`; return; }
  const names = ps => ps.slice(0, 4).map(p => p.nom).join(", ") + (ps.length > 4 ? "…" : "");
  const of = t => P.filter(p => p.type === t), tips = [];
  const flo = P.filter(p => months(p).includes(m));
  if(flo.length) tips.push(["En fleur ce mois-ci", `Profite-en : ${names(flo)}.`]);
  if([3, 4, 10, 11].includes(m)) tips.push(["C’est le moment de planter", m >= 10 ? "La terre est encore tiède : les racines s’installent pendant l’hiver, et tes plantes partiront plus fort au printemps." : "La terre se réchauffe : plante avant les grosses chaleurs, et arrose bien la première fois."]);
  if([9, 10, 11].includes(m) && of("bulbe").length) tips.push(["Plante tes bulbes", `Avant les premiers froids, enterre-les à deux ou trois fois leur hauteur, pointe vers le haut : ${names(of("bulbe"))}.`]);
  if([2, 3].includes(m) && of("graminee").length) tips.push(["Coupe tes graminées", `Rabats-les à 10 cm du sol, juste avant que les nouvelles pousses sortent : ${names(of("graminee"))}.`]);
  if([2, 3].includes(m) && of("vivace").length) tips.push(["Fais place aux nouvelles pousses", `Coupe au ras les tiges sèches de tes vivaces : ${names(of("vivace"))}.`]);
  const apres = P.filter(p => p.bloom && p.bloom[1] === (m === 1 ? 12 : m - 1) && /taill/i.test(p.note || ""));
  if(apres.length) tips.push(["Une petite taille", `Leur floraison vient de finir : raccourcis-les d’un tiers, elles repartiront plus touffues. ${names(apres)}.`]);
  if([6, 7, 8].includes(m)) tips.push(["Arrose malin", "Pour les plantes de moins d’un an : une fois par semaine, en une fois et généreusement, plutôt qu’un peu tous les jours. Le soir, de préférence."]);
  if([4, 5, 10, 11].includes(m)) tips.push(["Couvre la terre", "Étale du paillage (copeaux, feuilles mortes) au pied des plantes : il garde l’humidité et limite les mauvaises herbes."]);
  if([12, 1].includes(m)) tips.push(["Le jardin se repose", "Laisse les tiges sèches en place : elles abritent les insectes l’hiver, et sont jolies sous le givre. Rien d’autre à faire, profite."]);
  $("c-list").innerHTML = tips.map(([t, d]) => `<article class="tip"><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join("");
}

// 11 · Ma liste : les plantes de tous les coins, à cocher une fois achetées.
let achats = new Set(store.get("app-achats", []));
function renderListe(focusNom){
  const items = gardenPlants().sort((a, b) => a.p.nom.localeCompare(b.p.nom, "fr"));
  if(!items.length){ $("l-body").innerHTML = `<p class="empty">Ta liste se remplira avec les plantes de tes coins. Commence par ajouter un coin.</p>`; return; }
  let min = 0, max = 0; items.forEach(o => { const [a, b] = unitPrice(o.p, o.role); min += a * o.q; max += b * o.q; });
  const left = items.filter(o => !achats.has(o.p.nom)).length;
  $("l-body").innerHTML = `<div class="budget-card"><div class="bh"><div><span class="eyebrow">Budget estimé</span><strong>${eur0(min)} – ${eur0(max)}</strong></div><span class="l-left">${left ? `${left} à acheter` : "Tout est acheté"}</span></div></div>
    <ul class="shop">${items.map(o => `<li><label class="shop-item"><input type="checkbox" data-nom="${esc(o.p.nom)}" ${achats.has(o.p.nom) ? "checked" : ""}><span><b>${esc(o.p.nom)}</b><small>${o.role === "bulbe" ? o.q + " bulbes" : o.q + (o.q > 1 ? " plants" : " plant")} · ${esc(o.coins.join(", "))}</small></span></label><a href="${shopUrl(o.p)}" target="_blank" rel="noopener">Où l’acheter ↗</a></li>`).join("")}</ul>
    <p class="hint">Prix indicatifs pour de jeunes plantes en petits pots, hors terre, paillage et livraison.</p>`;
  if(focusNom){ const c = [...$("l-body").querySelectorAll("input[data-nom]")].find(i => i.dataset.nom === focusNom); if(c) c.focus(); }
}
$("l-body").addEventListener("change", e => {
  const c = e.target.closest("input[data-nom]"); if(!c) return;
  if(c.checked) achats.add(c.dataset.nom); else achats.delete(c.dataset.nom);
  store.set("app-achats", [...achats]); renderListe(c.dataset.nom);
});

// 12 · Mon compte
function renderCompte(){
  const g = garden || {};
  const cond = [projet ? PROJET_LBL[projet].charAt(0).toUpperCase() + PROJET_LBL[projet].slice(1) : null, g.clim ? `climat ${CLIM_LBL[g.clim].toLowerCase()}` : null, g.sol ? `terre ${SOL_LBL[g.sol].toLowerCase()}` : "terre estimée à l’analyse", ARRO_LBL[g.arrosage || "1"]].filter(Boolean).join(" · ");
  $("a-body").innerHTML = `
    <section class="acct-sec"><h3>Ton prénom</h3><p>${prenom ? esc(prenom) : "Pas encore renseigné"}</p><button class="link" type="button" data-act="prenom">${prenom ? "Changer ton prénom" : "Ajouter ton prénom"}</button></section>
    <section class="acct-sec"><h3>Connexion</h3><p>${known === "google" ? "Connexion avec Google" : esc(known || "")}</p></section>
    <section class="acct-sec"><h3>Ton jardin</h3><p>${esc(cond)}</p><button class="btn secondary sm" type="button" data-act="reglages">Modifier les réglages du jardin</button></section>
    <section class="acct-sec"><h3>Besoin d’aide ?</h3><p>Les cartes d’aide t’accompagnent pas à pas quand tu ajoutes un coin.</p><button class="link" type="button" data-act="aide">Revoir les cartes d’aide</button></section>
    <section class="acct-sec"><h3>Tes données</h3><p>Ton jardin et tes coins sont gardés sur ce téléphone. Tes photos servent juste à l’analyse, puis ne sont gardées nulle part.</p></section>
    <button class="btn secondary" type="button" data-act="logout">Se déconnecter</button>`;
}
$("a-body").addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if(!b) return;
  if(b.dataset.act === "reglages"){ gardenEdit = true; renderGarden(); show("s-garden"); }
  if(b.dataset.act === "prenom") openPrenom(true);
  if(b.dataset.act === "aide"){ startCoach(); showToast("Les cartes d’aide reviendront quand tu ajouteras un coin."); }
  if(b.dataset.act === "logout"){ store.set("app-out", true); setLoginMode(false); loginForm(true); show("s-login"); }
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
