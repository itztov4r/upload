# VOLTEX — Site de Partage de Vidéos

## Fichiers
- `index.html` — Site complet avec système de comptes (fichier tout-en-un, fonctionne par double-clic)
- `style.css` — Feuille de styles séparée
- `app.js` — JavaScript séparé
- `README.md` — Ce fichier

## Comment utiliser

### Option 1 — La plus simple
Ouvrez `index.html` par double-clic dans votre navigateur.
Le système de comptes, l'upload et la lecture vidéo fonctionnent directement.

### Option 2 — Serveur local (pour style.css + app.js séparés)
```
python -m http.server 8000
```
Puis ouvrez : http://localhost:8000

## Fonctionnalités
- Inscription / Connexion avec photo de profil
- Upload par clic ou glisser-déposer
- Lecture vidéo en modal
- Suppression de vidéos
- Statistiques en temps réel
- Modification du profil utilisateur
- Données sauvegardées localement (localStorage)

## Formats acceptés
MP4, WebM, MOV, AVI, MKV, OGV, 3GP
