// Reconnaissance d'une plante à partir d'une photo, avec Claude (API Anthropic).
// Renvoie 1 à 3 plantes possibles et leurs besoins ; l'app compare ensuite avec le jardin de la personne.
// Mêmes variables d'environnement que /api/analyse : ANTHROPIC_API_KEY, CLAUDE_MODEL, ANTHROPIC_WORKSPACE_ID.

const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5-5";
const WORKSPACE = (process.env.ANTHROPIC_WORKSPACE_ID || "").trim();
const MAX_PHOTO_BYTES = 1_500_000;
const TYPES = ["arbre", "arbuste", "graminee", "vivace", "couvre-sol", "bulbe", "aromatique", "grimpante"];
const FAMS = ["chaud", "froid", "rose", "blanc", "vert"];

const str = { type: "string" };
const int = { type: "integer" };
const CANDIDAT = {
  type: "object", additionalProperties: false,
  required: ["nom", "latin", "confiance", "type", "expo", "sol", "eau", "rusticite", "chaleur", "hauteur", "largeur", "arrosage", "floraison_debut", "floraison_fin", "famille", "envahissante", "envahissante_pourquoi", "note"],
  properties: {
    nom: str, latin: str,
    confiance: { enum: ["haute", "moyenne", "faible"] },
    type: { enum: TYPES },
    expo: { type: "array", items: { enum: ["s", "m", "o"] } },
    sol: { type: "array", items: { enum: ["a", "c", "s", "h"] } },
    eau: { type: "array", items: { enum: ["d", "f", "w"] } },
    rusticite: int, chaleur: { type: "boolean" },
    hauteur: int, largeur: int,
    arrosage: int,
    floraison_debut: int, floraison_fin: int,
    famille: { enum: FAMS },
    envahissante: { type: "boolean" }, envahissante_pourquoi: str,
    note: str
  }
};
const SCHEMA = {
  type: "object", additionalProperties: false,
  required: ["plante", "candidats"],
  properties: { plante: { type: "boolean" }, candidats: { type: "array", items: CANDIDAT } }
};

const SYSTEM = `Tu es jardinier-botaniste. On te montre la photo d'une plante qu'une personne a repérée (chez une voisine, en jardinerie, en promenade). Tu la reconnais et tu décris ses besoins pour un jardin en France, afin qu'un outil vérifie si elle conviendrait au jardin de la personne.

Règles :
- "plante" : false si la photo ne montre pas de plante reconnaissable (flou, objet, personne, paysage trop large). Dans ce cas, "candidats" est vide.
- "candidats" : 1 à 3 plantes, de la plus probable à la moins probable. Une seule si tu es sûr. Ne propose que des plantes cultivables en pleine terre ou en pot dans un jardin.
- "nom" : le nom courant en français, tel qu'en jardinerie, 1 à 3 mots, sans cultivar ("Anémone du Japon", "Hortensia", "Herbe de la pampa"). "latin" : genre et espèce ("Anemone × hybrida").
- "confiance" : "haute" si les fleurs ou les feuilles ne laissent pas de doute, sinon "moyenne" ou "faible".
- "type" : arbre, arbuste, graminee, vivace, couvre-sol, bulbe, aromatique ou grimpante.
- "expo" : expositions où elle pousse bien. "s" plein soleil, "m" mi-ombre, "o" ombre.
- "sol" : terres qui lui conviennent. "a" argileuse, "c" calcaire, "s" sableuse ou caillouteuse, "h" humifère. Ne mets pas "c" si elle craint le calcaire.
- "eau" : humidité du sol en été qu'elle supporte. "d" sec, "f" frais, "w" humide.
- "rusticite" : température minimale supportée en °C, entier négatif (-15). "chaleur" : true si elle supporte les étés chauds et secs du sud de la France.
- "hauteur" et "largeur" : taille adulte en cm.
- "arrosage" une fois installée : 1 presque jamais, 2 pendant les canicules, 3 régulièrement l'été.
- "floraison_debut" et "floraison_fin" : mois de 1 à 12, ou 0 et 0 si sa floraison n'a pas d'intérêt.
- "famille" : couleur dominante. "chaud" (jaune, orange, rouge), "froid" (bleu, violet), "rose", "blanc", ou "vert" si on la plante pour son feuillage.
- "envahissante" : true seulement si elle est reconnue comme espèce exotique envahissante en France, ou si elle drageonne ou se ressème au point d'envahir le jardin (bambou traçant, renouée du Japon, herbe de la pampa, buddleia, ailante, sumac). "envahissante_pourquoi" : une phrase courte qui dit pourquoi, sinon une chaîne vide.
- "note" : une phrase de 90 caractères au plus sur ce qui la rend belle ou utile ("Fleurit de la fin de l'été aux gelées, même à l'ombre.").
- Écris en français, en tutoyant, avec des mots simples. N'invente pas : si tu hésites, baisse la confiance.`;

function clean(s, n) { return String(s || "").replace(/[\u0000-\u001f]/g, " ").slice(0, n).trim(); }
const clamp = (v, a, b, d) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.min(Math.max(n, a), b) : d; };
const letters = (a, ok, d) => { const s = [...new Set((Array.isArray(a) ? a : []).map(x => String(x).toLowerCase()).filter(x => ok.includes(x)))].join(""); return s || d; };

function sanitize(r) {
  const cands = (Array.isArray(r.candidats) ? r.candidats : []).slice(0, 3).map(c => {
    const d = clamp(c.floraison_debut, 0, 12, 0), f = clamp(c.floraison_fin, 0, 12, 0);
    return {
      nom: clean(c.nom, 40), latin: clean(c.latin, 60),
      confiance: ["haute", "moyenne", "faible"].includes(c.confiance) ? c.confiance : "moyenne",
      type: TYPES.includes(c.type) ? c.type : "vivace",
      expo: letters(c.expo, ["s", "m", "o"], "s"), sol: letters(c.sol, ["a", "c", "s", "h"], "ach"), eau: letters(c.eau, ["d", "f", "w"], "f"),
      rust: clamp(c.rusticite, -40, 15, -10), heat: c.chaleur === false ? 0 : 1,
      h: clamp(c.hauteur, 5, 3000, 60), l: clamp(c.largeur, 5, 3000, 60),
      arrosage: clamp(c.arrosage, 1, 3, 2),
      bloom: d && f ? [d, f] : null,
      fam: FAMS.includes(c.famille) ? c.famille : "vert",
      envahissante: c.envahissante === true, envahissante_pourquoi: clean(c.envahissante_pourquoi, 200),
      note: clean(c.note, 140)
    };
  }).filter(c => c.nom && c.latin);
  return { plante: r.plante !== false && cands.length > 0, candidats: cands };
}

async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ erreur: "Méthode non autorisée." });
  const key = (process.env.ANTHROPIC_API_KEY || "").trim();
  if (!key) return res.status(503).json({ erreur: "La reconnaissance n'est pas encore configurée : il manque ANTHROPIC_API_KEY dans Vercel." });

  const body = typeof req.body === "string" ? (() => { try { return JSON.parse(req.body); } catch (e) { return {}; } })() : (req.body || {});
  const data = body.photo;
  if (typeof data !== "string" || !/^[A-Za-z0-9+/=]+$/.test(data.slice(0, 200))) return res.status(400).json({ erreur: "La photo est illisible. Réessaie avec une autre photo." });
  if (data.length * 0.75 > MAX_PHOTO_BYTES) return res.status(413).json({ erreur: "La photo est trop lourde. Réessaie avec une photo plus petite." });

  const content = [
    { type: "image", source: { type: "base64", media_type: "image/jpeg", data } },
    { type: "text", text: "Quelle est cette plante ? Renvoie les candidats et leurs besoins selon les règles." }
  ];
  const call = structured => fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json",
      ...(WORKSPACE ? { "anthropic-workspace-id": WORKSPACE } : {}) },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      system: structured ? SYSTEM : SYSTEM + "\n\nRéponds uniquement par un objet JSON valide, sans texte autour, conforme à ce schéma JSON : " + JSON.stringify(SCHEMA),
      messages: [{ role: "user", content }],
      ...(structured ? { output_config: { format: { type: "json_schema", schema: SCHEMA } } } : {})
    })
  });

  let r, out;
  try {
    r = await call(true);
    out = await r.json().catch(() => ({}));
    if (r.status === 400 && /output_config|json_schema|schema|format/i.test(JSON.stringify(out.error || {}))) {
      r = await call(false);
      out = await r.json().catch(() => ({}));
    }
  } catch (e) {
    return res.status(502).json({ erreur: "Le service ne répond pas. Réessaie dans quelques minutes." });
  }
  if (!r.ok) {
    console.error("Anthropic", r.status, out && out.error && out.error.message);
    const msg = r.status === 429 ? "Trop de demandes en même temps. Réessaie dans une minute."
      : r.status === 529 || r.status === 503 ? "Le service est surchargé. Réessaie dans quelques minutes."
      : "On n'a pas pu regarder ta photo. Réessaie.";
    return res.status(502).json({ erreur: msg });
  }
  if (out.stop_reason === "refusal") return res.status(422).json({ erreur: "Cette photo n'a pas pu être regardée. Essaie avec une autre." });

  const text = (out.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  let report;
  try {
    const i = text.indexOf("{"), j = text.lastIndexOf("}");
    report = JSON.parse(i >= 0 && j > i ? text.slice(i, j + 1) : text);
  } catch (e) {
    return res.status(502).json({ erreur: "La réponse est illisible. Réessaie." });
  }
  return res.status(200).json(sanitize(report));
}

module.exports = async (req, res) => {
  try { return await handler(req, res); }
  catch (e) {
    console.error("Erreur inattendue", e);
    return res.status(500).json({ erreur: "Erreur inattendue. Réessaie." });
  }
};
