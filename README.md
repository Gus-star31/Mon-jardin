# Atelier des massifs

Deux outils pour composer les massifs et les haies d'un jardin selon l'exposition, le sol, le climat, l'arrosage et la place disponible : plan de plantation, vue de face selon l'âge du jardin, photos, calendrier de floraison et budget estimé.

## L'atelier (`/`)

- `index.html` : l'outil complet en un seul fichier, réglé sur un jardin précis à Toulouse.
- `photos/` : photos libres de droits issues de Wikimedia Commons. Chaque fiche renvoie vers la page source de sa photo (auteur et licence).

## L'app (`/app/`)

Web app installable sur téléphone. La personne prend 1 à 4 photos de son jardin, indique la direction de chaque prise de vue, sa ville, son sol, l'arrosage possible, ses envies et son style. Claude analyse les photos et repère les zones à planter ; l'app compose ensuite une proposition par zone avec le moteur de l'atelier.

- `api/analyse.js` : fonction serveur Vercel qui vérifie le code d'accès et appelle l'API Claude.
- `app/app.js`, `app/app.css` : le parcours de l'app.
- `app/engine.js`, `app/atelier.css`, `app/index.html` : générés à partir de l'atelier par `python3 tools/build_app.py`. Après une modification de `index.html` ou de `tools/app_template.html`, relancer ce script.
- `app/manifest.webmanifest`, `app/sw.js`, `app/icons/` : installation sur l'écran d'accueil et fonctionnement hors connexion (sauf l'analyse).

### Réglages Vercel

Dans *Settings > Environment Variables* du projet :

| Variable | Valeur |
|---|---|
| `ANTHROPIC_API_KEY` | clé API créée dans la Console Anthropic |
| `ACCESS_CODE` | code à partager avec les proches (majuscules indifférentes) |
| `CLAUDE_MODEL` | facultatif, `claude-sonnet-5-5` par défaut |

Redéployer après avoir ajouté les variables. Fixer une limite de dépense mensuelle dans la Console Anthropic.

Une analyse de 4 photos coûte environ 4 centimes avec Claude Sonnet 5.5. Les photos sont envoyées à l'API Claude le temps de l'analyse ; l'app ne les enregistre sur aucun serveur.

Les données sur les plantes (rusticité, besoins en eau, croissance, prix) sont des ordres de grandeur indicatifs.

Déploiement : Vercel publie automatiquement chaque modification poussée sur `main`.
