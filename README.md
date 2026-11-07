# VOLTEX — Démonstration locale de vidéos

VOLTEX est un **prototype frontend** de galerie vidéo, et non une plateforme publique prête à accueillir des utilisateurs.

## Essayer

Ouvrez `index.html` dans un navigateur récent. Pour un serveur local :

```sh
python -m http.server 8000
```

Puis ouvrez http://localhost:8000.

## Fonctionnement et limites

- La sélection et le glisser-déposer de vidéos permettent de les lire **dans le navigateur courant**.
- Le chargement affiché dans l'interface est **simulé** : `app.js` utilise `simulateUpload()`. Il n'existe pas de serveur de réception de vidéos.
- Les fichiers lus via `URL.createObjectURL()` restent locaux. Ils ne sont ni transférés vers un serveur, ni partagés avec d'autres visiteurs.
- Les données éventuellement enregistrées dans `localStorage` restent propres au navigateur et à l'appareil ; cela ne fournit pas de synchronisation multi-appareils.
- Les écrans d'inscription/connexion sont uniquement une **démonstration d'interface**, pas une authentification sécurisée côté serveur. **N'utilisez pas votre vrai mot de passe ni des données personnelles** pour tester.
- Les statistiques visibles sont locales et ne mesurent pas des visites ou téléchargements réels.
- Les vidéos volumineuses ou les formats non pris en charge par le navigateur peuvent ne pas fonctionner ; l'extension du fichier ne garantit pas sa lecture.

## Structure

- `index.html` — interface principale, avec du style et du JavaScript intégrés.
- `style.css` — variante de styles séparée.
- `app.js` — démonstration de sélection, de lecture et de progression locale.
- `README.md` — documentation.

**Attention :** avant de présenter VOLTEX comme un vrai service public, il faudrait un backend, un stockage de fichiers avec quotas, une authentification sécurisée, des règles d'accès, des contrôles de sécurité et une politique de confidentialité. Ce dépôt ne fournit pas ces éléments.

## Formats

Le navigateur peut prendre en charge notamment MP4, WebM et OGV selon les codecs. D'autres conteneurs comme MOV, AVI, MKV ou 3GP ne sont pas garantis.

## Vérifications manuelles

1. Ouvrir le site sur mobile et sur ordinateur.
2. Choisir une petite vidéo de test et vérifier la lecture locale.
3. Recharger : ne pas s'attendre à retrouver un fichier vidéo stocké sur un serveur.
4. Ouvrir le site sur un autre appareil : les vidéos sélectionnées ne doivent pas être présentées comme partagées.
5. Ne jamais tester le formulaire de démonstration avec un mot de passe réel.
