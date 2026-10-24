// Aperçu d'une zone plantée, dessiné sur la photo du jardin par un modèle d'image Gemini (Google).
// Variables d'environnement à définir dans Vercel :
//   GEMINI_API_KEY      clé créée dans Google AI Studio
//   GEMINI_IMAGE_MODEL  facultatif, "gemini-nano-banana-2.1" par défaut

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-nano-banana-2.1";
const MAX_PHOTO_BYTES = 1_500_000;

const FORMS = {
  boule: "rounded bushy shrub", conifere: "compact dark green conifer", epi: "upright flower spikes", torche: "upright torch-like flower spikes above grassy leaves",
  marguerite: "daisy-like flowers on a leafy clump", ombelle: "flat flower heads on upright stems", globe: "round flower heads", nuage: "airy, see-through haze of tiny flowers",
  raide: "stiff upright ornamental grass", plumet: "arching ornamental grass with fluffy plumes", touffe: "low tufted grass", fougere: "fern fronds",
  feuillage: "broad-leaved foliage clump", tapis: "low spreading ground cover", grimpe: "climbing plant trained on the wall or fence", arbre: "small ornamental tree"
};
const BLOOM = { chaud: "warm yellow, orange or red flowers", froid: "blue to violet flowers", rose: "pink flowers", blanc: "white flowers", vert: "green flowers or foliage effect" };
const LAYERS = {
  arbre: "Tree, planted in line with the view to screen", ecran: "Hedge along the boundary, at the back", grimpante: "On the wall or fence",
  back: "Back of the bed", mid: "Middle of the bed", front: "Front edge of the bed", bulb: "Bulbs scattered between the perennials"
};
const GRASS = { chaud: "golden-blond plumes", rose: "pink plumes", blanc: "pale cream plumes", froid: "blue-grey foliage", vert: "fresh green foliage" };
const AGES = {
  "0": "just planted, as small young plants with bare mulch between them",
  "1": "one year after planting, filled out but with some gaps",
  "3": "three years after planting, established and well filled",
  "5": "five years after planting, dense and mature-looking",
  adulte: "at mature size"
};

function clean(s, n) { return String(s || "").replace(/[\u0000-\u001f]/g, " ").slice(0, n).trim(); }
function ratio(w, h) {
  const r = w && h ? w / h : 4 / 3;
  const opts = [["1:1", 1], ["4:3", 4 / 3], ["3:4", 3 / 4], ["16:9", 16 / 9], ["9:16", 9 / 16], ["3:2", 1.5], ["2:3", 2 / 3]];
  return opts.reduce((best, o) => (Math.abs(o[1] - r) < Math.abs(best[1] - r) ? o : best))[0];
}

function buildPrompt(b) {
  const plants = (Array.isArray(b.plantes) ? b.plantes : []).slice(0, 14);
  const byLayer = {};
  plants.forEach(p => {
    const layer = LAYERS[p.couche] ? p.couche : "mid";
    const h = Math.max(5, Math.min(1200, parseInt(p.hauteur, 10) || 50));
    const size = h >= 100 ? `about ${(h / 100).toFixed(1)} m tall` : `about ${h} cm tall`;
    const grass = p.type === "graminee";
    const colour = grass ? (GRASS[p.fleur] && `with ${GRASS[p.fleur]}`) : (p.fleur && BLOOM[p.fleur] ? `with ${BLOOM[p.fleur]}` : "grown for its foliage");
    const bits = [FORMS[p.forme] || "garden plant", colour,
      p.argente ? "silvery-grey leaves" : "", p.persistant ? "evergreen" : "", size, p.quantite ? `${Math.min(99, parseInt(p.quantite, 10) || 1)} plants` : ""].filter(Boolean);
    (byLayer[layer] = byLayer[layer] || []).push(`${clean(p.latin, 60)} (${clean(p.nom, 50)}): ${bits.join(", ")}`);
  });
  const order = ["arbre", "ecran", "grimpante", "back", "mid", "front", "bulb"];
  const list = order.filter(l => byLayer[l]).map(l => `- ${LAYERS[l]}: ${byLayer[l].join("; ")}`).join("\n");
  const keep = (Array.isArray(b.a_garder) ? b.a_garder : []).map(x => clean(x, 60)).filter(Boolean).slice(0, 6);
  const depth = parseInt(b.profondeur, 10) || 100;
  return [
    "Edit this photo of a private garden to show a new planting scheme in one area. The result must look like the same photo taken after the work was done.",
    `Area to plant: ${clean(b.emplacement, 400) || "the main bed visible in the photo"}. The planted bed is about ${(depth / 100).toFixed(1)} m deep, measured from the boundary towards the viewer.`,
    "Keep everything else exactly as it is: same camera position, angle and framing, same light, weather and season, same house, walls, fences, gates, paths, paving, sky and neighbouring buildings" + (keep.length ? `, and keep these existing elements: ${keep.join(", ")}` : "") + ".",
    `Plants, shown ${AGES[b.age] || AGES["3"]}:`,
    list || "- A mixed bed of hardy shrubs, perennials and ornamental grasses.",
    "Arrange plants in natural repeated drifts, tallest at the back, with the soil covered by natural wood-chip mulch. Show flowering plants in bloom as in early summer.",
    "Photorealistic, natural colours, realistic plant sizes for a domestic garden. Do not add people, animals, furniture, text, labels or new structures."
  ].join("\n\n");
}

// Cherche l'image dans la réponse, quelle que soit la forme exacte (API Interactions ou generateContent).
function findImage(node, depth = 0) {
  if (!node || typeof node !== "object" || depth > 8) return null;
  if (node.type === "image" && typeof node.data === "string" && node.data.length > 100) return { data: node.data, mime: node.mime_type || "image/png" };
  const inline = node.inlineData || node.inline_data;
  if (inline && typeof inline.data === "string" && inline.data.length > 100) return { data: inline.data, mime: inline.mimeType || inline.mime_type || "image/png" };
  for (const v of Array.isArray(node) ? node : Object.values(node)) {
    const f = findImage(v, depth + 1);
    if (f) return f;
  }
  return null;
}
function findText(node, depth = 0) {
  if (!node || typeof node !== "object" || depth > 8) return "";
  if (node.type === "text" && typeof node.text === "string") return node.text;
  for (const v of Array.isArray(node) ? node : Object.values(node)) { const t = findText(v, depth + 1); if (t) return t; }
  return "";
}

async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ erreur: "Méthode non autorisée." });
  const key = (process.env.GEMINI_API_KEY || "").trim();
  const body = typeof req.body === "string" ? (() => { try { return JSON.parse(req.body); } catch (e) { return {}; } })() : (req.body || {});
  if (!key) return res.status(503).json({ erreur: "L'aperçu n'est pas encore configuré : ajoute GEMINI_API_KEY dans Vercel, puis redéploie." });

  const photo = String(body.photo || "");
  if (!photo || !/^[A-Za-z0-9+/=]+$/.test(photo.slice(0, 200))) return res.status(400).json({ erreur: "La photo de la zone est illisible." });
  if (photo.length * 0.75 > MAX_PHOTO_BYTES) return res.status(413).json({ erreur: "La photo est trop lourde pour l'aperçu." });

  const prompt = buildPrompt(body);
  const call = withFormat => fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "x-goog-api-key": key, "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      store: false,
      input: [{ type: "text", text: prompt }, { type: "image", mime_type: "image/jpeg", data: photo }],
      ...(withFormat ? { response_format: { type: "image", aspect_ratio: ratio(body.largeur, body.hauteurPhoto), image_size: "1K" } } : {})
    })
  });

  let r, data;
  try {
    r = await call(true);
    data = await r.json().catch(() => ({}));
    if (r.status === 400 && /response_format|aspect|image_size/i.test(JSON.stringify(data))) { r = await call(false); data = await r.json().catch(() => ({})); }
  } catch (e) {
    return res.status(502).json({ erreur: "Le service d'image ne répond pas. Réessaie dans quelques minutes.", detail: String(e && e.message || e).slice(0, 200) });
  }
  const err = data && (data.error || (Array.isArray(data.errors) && data.errors[0]));
  const detail = `Gemini ${r.status}${err ? ` : ${String(err.message || err.status || JSON.stringify(err)).slice(0, 220)}` : ""}`;
  if (!r.ok) {
    console.error(detail);
    const msg = r.status === 400 && /api key|API_KEY/i.test(detail) ? "La clé Gemini configurée dans Vercel est refusée."
      : r.status === 403 ? "La clé Gemini n'a pas accès à ce modèle d'image."
      : r.status === 404 ? "Le modèle d'image demandé n'existe pas pour cette clé."
      : r.status === 429 ? "Le quota d'images Gemini est atteint. Réessaie plus tard ou vérifie la facturation dans Google AI Studio."
      : "La création de l'aperçu a échoué.";
    return res.status(502).json({ erreur: msg, detail });
  }
  const img = findImage(data.steps || data.outputs || data.candidates || data);
  if (!img) {
    const said = clean(findText(data), 200);
    console.error("Pas d'image", data.status, said);
    return res.status(422).json({ erreur: "Gemini n'a pas renvoyé d'image pour cette photo. Réessaie, ou essaie avec une autre photo.", detail: `statut ${data.status || "?"}${said ? ` : ${said}` : ""}` });
  }
  return res.status(200).json({ image: img.data, mime: img.mime, modele: MODEL });
}

// Pour mettre l'aperçu en pause sans toucher au code : APERCU_PAUSE = 1 dans les variables d'environnement Vercel.
module.exports = async (req, res) => {
  if (process.env.APERCU_PAUSE === "1") return res.status(503).json({ erreur: "L'aperçu sur photo est en pause pour le moment." });
  try { return await handler(req, res); }
  catch (e) {
    console.error("Erreur inattendue", e);
    return res.status(500).json({ erreur: "Erreur inattendue pendant la création de l'aperçu.", detail: String(e && e.message || e).slice(0, 200) });
  }
};
module.exports.buildPrompt = buildPrompt;
