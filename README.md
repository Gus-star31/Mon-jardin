# Green Thumb

Anciennement « Atelier des massifs ».

Une app pour composer les massifs et les haies d'un jardin selon l'exposition, le sol, le climat, l'arrosage et la place disponible : plan de plantation, vue de face selon l'âge du jardin, photos, calendrier de floraison et budget estimé.

## L'app (`/app/`)

L'adresse du site (`/`) renvoie vers l'app. L'ancienne version web n'est plus publiée.

Web app installable sur téléphone, en DA « Carnet d'atelier » (papier crème, trait d'encre, bleu de Prusse ; design system dans Figma). L'accueil « Ton jardin » liste les espaces analysés : on les consulte, on en ajoute ou on en retire. Pour ajouter un espace, la personne prend une photo du coin à planter et indique ses envies ; la première fois, elle donne aussi son département, son sol et l'arrosage possible. Claude analyse la photo ; l'app compose ensuite la proposition de l'espace avec le moteur de l'atelier : plantes, plan de plantation, aperçu avant / après et budget.

- `api/analyse.js` : fonction serveur Vercel qui appelle l'API Claude.
- `api/apercu.js` : fonction serveur qui dessine la zone plantée sur la photo avec un modèle d'image Gemini (Google). L'aperçu est créé à la demande, zone par zone, et gardé sur le téléphone.
- `app/app.js`, `app/app.css` : le parcours de l'app.
- `tools/atelier.html` : le moteur (base des 217 plantes, règles de composition, plan, budget). Ce n'est plus une page publiée : le dossier `tools/` est exclu du déploiement (`.vercelignore`).
- `app/engine.js`, `app/atelier.css`, `app/index.html` : générés à partir du moteur par `python3 tools/build_app.py`. Après une modification de `tools/atelier.html` ou de `tools/app_template.html`, relancer ce script.
- `photos/` : photos libres de droits issues de Wikimedia Commons, avec leur auteur et leur licence.
- `app/manifest.webmanifest`, `app/sw.js`, `app/icons/` : installation sur l'écran d'accueil et fonctionnement hors connexion (sauf l'analyse).

### Réglages Vercel

Dans *Settings > Environment Variables* du projet :

| Variable | Valeur |
|---|---|
| `ANTHROPIC_API_KEY` | clé API créée dans la Console Anthropic |
| `CLAUDE_MODEL` | facultatif, `claude-sonnet-5-5` par défaut |
| `GEMINI_API_KEY` | clé créée dans Google AI Studio, sur un projet avec la facturation activée (les modèles d'image n'ont pas d'offre gratuite) |
| `GEMINI_IMAGE_MODEL` | facultatif, `gemini-nano-banana-2.1` par défaut |
| `APERCU_PAUSE` | facultatif, `1` pour couper l’aperçu sur photo : Gemini n’est plus appelé |
| `ANTHROPIC_WORKSPACE_ID` | facultatif, identifiant `wrkspc_…` de l'espace de travail, nécessaire si la clé n'est rattachée à aucun espace de travail |

Redéployer après avoir ajouté les variables. Fixer une limite de dépense mensuelle dans la Console Anthropic.

Une analyse de 4 photos coûte environ 4 centimes avec Claude Sonnet 5.5, et un aperçu environ 3 centimes avec Gemini Nano Banana 2.1 en 1K. Les photos sont envoyées à l'API Claude le temps de l'analyse, puis à l'API Gemini pour chaque aperçu demandé ; l'app ne les enregistre sur aucun serveur.

La base compte 217 plantes. Les données (rusticité, besoins en eau, croissance, prix) sont des ordres de grandeur indicatifs.

Déploiement : Vercel publie automatiquement chaque modification poussée sur `main`.
