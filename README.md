# VOLTEX — démonstration vidéo locale

Interface de profils locaux, import de vidéos, lecteur, suppression et statistiques. Les fichiers vidéo restent sur cet appareil : aucun serveur ne reçoit les vidéos, et elles ne sont pas conservées après rechargement ou déconnexion.

## Lancer

Depuis le dossier du projet :

```sh
python -m http.server 8000
```

Ouvrir `http://localhost:8000`. Utiliser HTTPS en hébergement. Web Crypto est nécessaire pour les mots de passe locaux ; le lancement par double-clic ne fonctionne pas uniformément selon les navigateurs.

`index.html` contient les styles et le script de l'application complète et charge `accounts.js`. `app.js` et `style.css` sont un ancien exemple séparé de galerie vidéo ; ils ne constituent pas une deuxième application complète avec comptes.

## Comptes et confidentialité

Il s'agit d'une **démonstration**, pas d'une authentification serveur. Ne pas utiliser de vrai mot de passe ni de données sensibles. Les profils et empreintes de mots de passe sont dans le stockage du navigateur, modifiable par toute personne ayant accès à ce navigateur. Les anciens mots de passe en clair sont migrés vers PBKDF2-SHA-256 avec sel aléatoire. Le profil actif ne conserve aucun secret. La migration ne peut remplacer les anciennes valeurs si le stockage est bloqué : voir [AUDIT.md](AUDIT.md).

Les vidéos importées sont lues via des URLs locales temporaires. Leur décodage dépend des codecs du navigateur, même si le fichier porte une extension vidéo. Les avatars acceptent PNG, JPEG et WebP jusqu'à 2 Mo. Le glisser-déposer et le sélecteur acceptent les fichiers reconnus comme `video/*`.

## Vérifier

```sh
node --test tests/*.test.js
```

Trois tests couvrent les mots de passe salés, la migration des anciens profils et le stockage indisponible. Les limites de vérification visuelle et les contrôles complémentaires sont documentés dans [AUDIT.md](AUDIT.md).
