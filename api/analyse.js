// Analyse d'un jardin à partir de photos, avec Claude (API Anthropic).
// Variables d'environnement à définir dans Vercel :
//   ANTHROPIC_API_KEY  clé API créée dans la Console Anthropic
//   CLAUDE_MODEL       facultatif, "claude-sonnet-5-5" par défaut
//   ANTHROPIC_WORKSPACE_ID  facultatif, identifiant wrkspc_… à fournir si la clé n'est rattachée à aucun espace de travail

const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5-5";
const WORKSPACE = (process.env.ANTHROPIC_WORKSPACE_ID || "").trim();
const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 1_500_000; // une photo redimensionnée côté app pèse ~200 à 400 Ko
const DIRS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
const DIR_NAMES = { N: "nord", NE: "nord-est", E: "est", SE: "sud-est", S: "sud", SO: "sud-ouest", O: "ouest", NO: "nord-ouest" };
const SOLS = { a: "argileux", ac: "argilo-calcaire", c: "calcaire", s: "sableux", h: "humifère", inconnu: "inconnu" };
const OBJS = { massif: "habiller le jardin", isoler: "s'isoler du voisinage", pollin: "attirer abeilles et papillons", mur: "habiller un mur ou une clôture", refuge: "créer un refuge pour la biodiversité" };
const STYLES = { libre: "sans style imposé", med: "méditerranéen sec", nat: "naturaliste", anglais: "jardin anglais", contemporain: "contemporain épuré", sauvage: "refuge pour la biodiversité" };
const ARRO = { "1": "aucun arrosage une fois les plantes installées", "2": "arrosage occasionnel pendant les canicules", "3": "arrosage régulier en été" };

const str = { type: "string" };
const strArr = { type: "array", items: { type: "string" } };
const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["resume", "climat", "sol", "observations", "zones"],
  properties: {
    resume: str,
    climat: {
      type: "object", additionalProperties: false, required: ["zone", "explication"],
      properties: { zone: { enum: ["med", "so", "oc", "co", "mo"] }, explication: str }
    },
    sol: {
      type: "object", additionalProperties: false, required: ["type", "explication"],
      properties: { type: { enum: ["a", "ac", "c", "s", "h"] }, explication: str }
    },
    observations: strArr,
    zones: {
      type: "array",
      items: {
        type: "object", additionalProperties: false,
        required: ["nom", "photo", "emplacement", "description", "orientation", "exposition", "ensoleillement", "humidite", "profondeur", "longueur", "objectifs", "hauteur_masquer", "a_garder", "attention"],
        properties: {
          nom: str,
          photo: { type: "integer" },
          emplacement: str,
          description: str,
          orientation: { enum: DIRS },
          exposition: { enum: ["s", "m", "o"] },
          ensoleillement: str,
          humidite: { enum: ["d", "f", "w"] },
          profondeur: { enum: ["60", "100", "150", "200"] },
          longueur: { enum: ["p", "m", "g"] },
          objectifs: { type: "array", items: { enum: Object.keys(OBJS) } },
          hauteur_masquer: { enum: ["aucune", "2", "3", "4"] },
          a_garder: strArr,
          attention: strArr
        }
      }
    }
  }
};

const SYSTEM = `Tu es paysagiste-conseil. À partir de photos d'un jardin, tu identifies les zones à planter et leurs conditions de culture, pour qu'un outil compose ensuite des associations de plantes. Tu ne proposes pas de plantes toi-même.

Règles :
- Hémisphère nord. Une bande de terre plantée au pied d'une limite (clôture, mur, haie) située dans la direction X est tournée vers la direction opposée à X. Exemple : la photo regarde vers le nord-est et la clôture du fond est au nord-est ; la bande au pied de cette clôture est tournée vers le sud-ouest, donc en plein soleil l'après-midi.
- Exposition : "s" plein soleil (6 h ou plus de soleil direct), "m" mi-ombre (soleil du matin seulement, ou ombre légère), "o" ombre. Tiens compte des arbres, de la maison et des bâtiments visibles qui font de l'ombre.
- Humidité du sol en été : "d" sec, "f" frais, "w" humide. Une pelouse grillée, des plantes méditerranéennes en forme ou un sol craquelé indiquent un sol sec ; la proximité de racines d'arbres assèche aussi le sol.
- Profondeur : largeur de terre plantable que la zone peut raisonnablement recevoir sans supprimer d'élément à garder, en cm : "60", "100", "150" ou "200" (200 et plus). Sois réaliste : allées et passages restent libres.
- Longueur : "p" environ 3 à 5 m, "m" environ 4 à 10 m, "g" plus de 10 m.
- Objectifs : choisis parmi les envies de la personne celles qui ont du sens pour la zone. "isoler" seulement s'il y a un vis-à-vis réel (rue, fenêtre, balcon, jardin voisin visible). Hauteur à masquer : "4" si la vue vient d'un étage ou d'un balcon, sinon "2" ou "3" ; "aucune" si la zone n'a pas besoin d'écran.
- Climat : déduis la zone de la ville indiquée. "med" méditerranéen, "so" Sud-Ouest (Toulouse, Bordeaux, Pau...), "oc" océanique (Bretagne, Normandie, Nantes...), "co" continental (Strasbourg, Lyon, Dijon), "mo" montagnard. Paris et le centre de la France sont "oc".
- Sol : si la personne l'indique, garde son choix ; sinon déduis-le de la région et des indices visibles, et dis que c'est une estimation.
- 1 à 6 zones au total. Chaque zone correspond à une bande ou un massif précis, visible sur une photo (numéro de photo à partir de 1). La personne photographie en général un seul coin à la fois : avec une seule photo, rends une seule zone, sauf si la photo montre clairement des coins séparés (par exemple les deux côtés d'une allée), et alors trois au plus.
- "emplacement" : où se trouve exactement la zone sur la photo, en anglais, pour un logiciel de retouche d'image qui devra y dessiner les plantations. Donne la position dans le cadre (left, right, background, foreground, centre), les repères visibles (fence, palm tree, house wall, gate…) et l'étendue ("the strip of lawn along the reed fence in the background, from the white gate pillar on the left to the right edge of the photo, in front of the palm tree"). Une phrase, 40 mots au plus.
- "a_garder" : arbres, arbustes ou éléments existants à conserver. "attention" : points à traiter avant de planter (plante envahissante comme le bambou traçant ou le liseron, racines, réseaux, ombre d'un grand arbre, sol tassé).
- Écris en français, en tutoyant, avec des phrases courtes et concrètes. Le nom d'une zone fait 1 à 3 mots, sans virgule, et se repère facilement ("Côté rue", "Pied du mur", "Haie du fond").
- N'invente rien que les photos ne montrent pas. Si un élément est incertain, dis-le simplement.`;

function opposite(d) { return DIRS[(DIRS.indexOf(d) + 4) % 8]; }
function rot(d, n) { return DIRS[(DIRS.indexOf(d) + n + 8) % 8]; }
function clean(s, n) { return String(s || "").replace(/[\u0000-\u001f]/g, " ").slice(0, n).trim(); }

const PROJETS = { ville: "jardin de ville (cour ou petit jardin entouré de murs)", terrain: "terrain (jardin plus vaste autour d'une maison)", balcon: "balcon ou terrasse : uniquement des plantes en pots et jardinières, propose des contenants plutôt que des massifs en pleine terre" };

function buildContent(body) {
  const objectifs = (body.objectifs || []).filter(o => OBJS[o]).map(o => OBJS[o]);
  const intro = [
    `Ville : ${clean(body.ville, 80) || "non précisée"}.`,
    `Type de projet : ${PROJETS[body.projet] || "jardin"}.`,
    `Type de sol indiqué : ${SOLS[body.sol] || "inconnu"}.`,
    `Arrosage possible en été : ${ARRO[body.arrosage] || ARRO["1"]}.`,
    `Envies : ${objectifs.length ? objectifs.join(", ") : "habiller le jardin"}.`,
    `Style souhaité : ${STYLES[body.style] || STYLES.libre}.`,
    `Voici ${body.photos.length} photo${body.photos.length > 1 ? "s" : ""} du jardin.`
  ].join("\n");
  const content = [{ type: "text", text: intro }];
  body.photos.forEach((ph, i) => {
    const d = DIRS.includes(ph.direction) ? ph.direction : null;
    let label = `Photo ${i + 1}`;
    if (d) label += ` : on regarde vers le ${DIR_NAMES[d]}. À gauche se trouve le ${DIR_NAMES[rot(d, -2)]}, à droite le ${DIR_NAMES[rot(d, 2)]}, derrière le photographe le ${DIR_NAMES[opposite(d)]}.`;
    else label += " : direction inconnue, estime l'orientation si possible et signale l'incertitude.";
    const note = clean(ph.note, 300);
    if (note) label += ` Précision de la personne : « ${note} »`;
    content.push({ type: "text", text: label });
    content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: ph.data } });
  });
  content.push({ type: "text", text: "Analyse ce jardin selon les règles et renvoie le rapport." });
  return content;
}

function sanitize(r, nPhotos) {
  const low = v => String(v || "").toLowerCase();
  const pick = (v, list, def) => (list.includes(low(v)) ? low(v) : def);
  const arr = (a, n) => (Array.isArray(a) ? a.map(x => clean(x, 240)).filter(Boolean).slice(0, n) : []);
  const zones = (Array.isArray(r.zones) ? r.zones : []).slice(0, 6).map((z, i) => ({
    id: "z" + (i + 1),
    nom: clean(z.nom, 60) || `Zone ${i + 1}`,
    photo: Math.min(Math.max(parseInt(z.photo, 10) || 1, 1), nPhotos),
    emplacement: clean(z.emplacement, 400),
    description: clean(z.description, 500),
    orientation: DIRS.includes(String(z.orientation).toUpperCase()) ? String(z.orientation).toUpperCase() : null,
    exposition: pick(z.exposition, ["s", "m", "o"], "s"),
    ensoleillement: clean(z.ensoleillement, 200),
    humidite: pick(z.humidite, ["d", "f", "w"], "d"),
    profondeur: ["60", "100", "150", "200"].includes(String(z.profondeur)) ? String(z.profondeur) : "100",
    longueur: pick(z.longueur, ["p", "m", "g"], "m"),
    objectifs: [...new Set((z.objectifs || []).map(low).filter(o => OBJS[o]))],
    hauteur_masquer: ["2", "3", "4"].includes(String(z.hauteur_masquer)) ? String(z.hauteur_masquer) : null,
    a_garder: arr(z.a_garder, 6),
    attention: arr(z.attention, 6)
  }));
  zones.forEach(z => { if (!z.objectifs.length) z.objectifs = ["massif"]; if (z.hauteur_masquer && !z.objectifs.includes("isoler")) z.objectifs.push("isoler"); });
  return {
    resume: clean(r.resume, 800),
    climat: { zone: pick(r.climat && r.climat.zone, ["med", "so", "oc", "co", "mo"], "oc"), explication: clean(r.climat && r.climat.explication, 300) },
    sol: { type: pick(r.sol && r.sol.type, ["a", "ac", "c", "s", "h"], "ac"), explication: clean(r.sol && r.sol.explication, 300) },
    observations: arr(r.observations, 8),
    zones
  };
}

async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ erreur: "Méthode non autorisée." });

  const key = (process.env.ANTHROPIC_API_KEY || "").trim();
  if (!key) {
    // Seuls les noms des variables manquantes sont indiqués, jamais leurs valeurs.
    const missing = ["ANTHROPIC_API_KEY"];
    // Repère une faute de frappe sur le nom (espace, tiret, minuscules) en comparant les noms simplifiés.
    const norm = k => k.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const targets = missing.map(norm);
    const similar = Object.keys(process.env)
      .filter(k => !missing.includes(k) && !/^(VERCEL|AWS|NOW|LAMBDA|NODE)_/i.test(k) && targets.some(t => norm(k) === t || norm(k).includes(t)))
      .slice(0, 3);
    console.error("Variables manquantes :", missing.join(", "), "| noms proches trouvés :", similar.join(", ") || "aucun");
    return res.status(503).json({ erreur: `L'analyse n'est pas encore configurée : Vercel ne transmet pas ${missing.join(" ni ")}. ` +
      (similar.length ? `Variable${similar.length > 1 ? "s" : ""} au nom proche trouvée${similar.length > 1 ? "s" : ""} : ${similar.join(", ")}. Vérifie l'orthographe exacte.` : "Vérifie qu'elle est enregistrée pour l'environnement Production, puis redéploie la production.") });
  }

  const body = typeof req.body === "string" ? (() => { try { return JSON.parse(req.body); } catch (e) { return {}; } })() : (req.body || {});

  const photos = Array.isArray(body.photos) ? body.photos : [];
  if (!photos.length) return res.status(400).json({ erreur: "Ajoute au moins une photo de ton jardin." });
  if (photos.length > MAX_PHOTOS) return res.status(400).json({ erreur: `${MAX_PHOTOS} photos au maximum.` });
  for (const ph of photos) {
    if (typeof ph.data !== "string" || !/^[A-Za-z0-9+/=]+$/.test(ph.data.slice(0, 200))) return res.status(400).json({ erreur: "Une photo est illisible. Réessaie avec une photo JPEG ou PNG." });
    if (ph.data.length * 0.75 > MAX_PHOTO_BYTES) return res.status(413).json({ erreur: "Une photo est trop lourde. Réessaie avec une photo plus petite." });
  }

  const content = buildContent({ ...body, photos });
  // Premier essai avec la sortie JSON garantie par schéma ; si l'API refuse ce format, second essai en JSON libre.
  const call = structured => fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json",
      ...(WORKSPACE ? { "anthropic-workspace-id": WORKSPACE } : {}) },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 3500,
      system: structured ? SYSTEM : SYSTEM + "\n\nRéponds uniquement par un objet JSON valide, sans texte autour, conforme à ce schéma JSON : " + JSON.stringify(SCHEMA),
      messages: [{ role: "user", content }],
      ...(structured ? { output_config: { format: { type: "json_schema", schema: SCHEMA } } } : {})
    })
  });
  const detail = (r, data) => `API ${r.status}${data && data.error ? ` ${data.error.type || ""} : ${String(data.error.message || "").slice(0, 220)}` : ""}`;

  let r, data;
  try {
    r = await call(true);
    data = await r.json().catch(() => ({}));
    if (r.status === 400 && !/credit|billing/i.test(JSON.stringify(data)) && /output_config|json_schema|schema|format/i.test(JSON.stringify(data.error || {}))) {
      console.warn("Format JSON par schéma refusé, second essai :", detail(r, data));
      r = await call(false);
      data = await r.json().catch(() => ({}));
    }
  } catch (e) {
    return res.status(502).json({ erreur: "Le service d'analyse ne répond pas. Réessaie dans quelques minutes.", detail: String(e && e.message || e).slice(0, 200) });
  }

  if (!r.ok) {
    console.error("Anthropic", detail(r, data));
    const msg = r.status === 429 ? "Trop d'analyses en même temps. Réessaie dans une minute."
      : r.status === 401 ? "La clé API configurée dans Vercel est refusée. Vérifie-la dans la Console Anthropic."
      : r.status === 403 ? "La clé API n'a pas accès à ce modèle."
      : r.status === 404 ? "Le modèle demandé n'existe pas pour cette clé API."
      : r.status === 529 || r.status === 503 ? "Le service d'analyse est surchargé. Réessaie dans quelques minutes."
      : r.status === 400 && /credit|billing/i.test(JSON.stringify(data)) ? "Le crédit du compte Anthropic est épuisé. Ajoute du crédit dans la Console Anthropic."
      : /workspace/i.test(JSON.stringify(data.error || {})) ? (WORKSPACE
          ? "L'espace de travail indiqué dans ANTHROPIC_WORKSPACE_ID est introuvable ou la clé n'y a pas accès. Vérifie l'identifiant wrkspc_… dans la Console Anthropic."
          : "Ta clé API n'est rattachée à aucun espace de travail. Ajoute dans Vercel la variable ANTHROPIC_WORKSPACE_ID avec l'identifiant wrkspc_… de ton espace de travail, ou crée une clé rattachée à un espace de travail.")
      : r.status === 413 ? "Les photos sont trop lourdes pour l'analyse. Réessaie avec moins de photos."
      : "L'analyse a échoué.";
    return res.status(502).json({ erreur: msg, detail: detail(r, data) });
  }
  if (data.stop_reason === "refusal") return res.status(422).json({ erreur: "Ces photos n'ont pas pu être analysées. Essaie avec d'autres photos du jardin." });

  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  let report;
  try {
    const i = text.indexOf("{"), j = text.lastIndexOf("}");
    report = JSON.parse(i >= 0 && j > i ? text.slice(i, j + 1) : text);
  } catch (e) {
    return res.status(502).json({ erreur: data.stop_reason === "max_tokens" ? "L'analyse était trop longue. Réessaie avec moins de photos." : "La réponse de l'analyse est illisible. Réessaie.", detail: `stop_reason ${data.stop_reason}` });
  }
  const out = sanitize(report, photos.length);
  if (!out.zones.length) return res.status(422).json({ erreur: "Aucune zone à planter n'a été repérée. Essaie avec des photos plus larges du jardin." });
  return res.status(200).json({ ...out, modele: MODEL });
}

module.exports = async (req, res) => {
  try { return await handler(req, res); }
  catch (e) {
    console.error("Erreur inattendue", e);
    return res.status(500).json({ erreur: "Erreur inattendue pendant l'analyse.", detail: String(e && e.message || e).slice(0, 200) });
  }
};
